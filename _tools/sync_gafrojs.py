#!/usr/bin/env python3
"""Copy the gafrojs WASM build, the demo runtime and the scenes the CGA pages use
from a geometry-for-robotics checkout into assets/js/gafrojs/.

    python3 _tools/sync_gafrojs.py [path/to/geometry-for-robotics]

The layout mirrors geometry-for-robotics/demos (_lib/, runtime/, scenes/) so the
runtime's relative imports keep working unchanged. Scenes are embedded with
{% include gafro_scene.html slug="..." %}; add a slug to SCENES before using it.
"""

import re
import shutil
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DEST = REPO / "assets" / "js" / "gafrojs"
DEFAULT_SRC = Path.home() / "coding" / "geometry-for-robotics"

SCENES = [
    # 5.5.2 basics of geometric algebra
    "exterior-product",
    "geometric-product",
    "rotation-as-reflections",
    "reflection-composer",
    "signature-unit-sets",
    # 5.5.4 geometric primitives
    "primitive-ladder",
    "primitive-gallery",
    "intersections",
    # 5.5.5 transformation groups
    "rotor-sandwich",
    "conformal-versors",
    "motor-from-screw",
    "motor-interpolation",
    "interpolation-charts",
    # 5.5.6 twists and wrenches
    "screw-axis",
    "velocity-field-screw",
    "power-pairing-frames",
]
HELPERS = ["_book.js"]

# Scene subtitles end in their geometry-for-robotics module number ("... — 4.3",
# "... -- 5.1", "... — 3.4 / 4.2"), which means nothing in the course numbering.
MODULE_REF = re.compile(r"\s*(?:--|—)\s*\d+\.\d+(?:\s*/\s*\d+\.\d+)*'\)")

# Formulas that are too wide for the page column (the overlay allows 66% of 720px).
PATCHES = {
    "power-pairing-frames": [(r"\\twist$,   $\\wrench", r"\\twist$,\n$\\wrench")],
}


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SRC
    demos = src / "demos"
    if not (demos / "_lib" / "dist" / "gafrojs.wasm").exists():
        sys.exit(f"no gafrojs build in {demos}/_lib (run make_demos.py there first)")

    for sub in ("_lib", "runtime", "scenes"):
        shutil.rmtree(DEST / sub, ignore_errors=True)
    shutil.copytree(demos / "_lib", DEST / "_lib")
    shutil.copytree(demos / "runtime", DEST / "runtime")

    (DEST / "scenes").mkdir(parents=True)
    for name in HELPERS:
        shutil.copy2(demos / "scenes" / name, DEST / "scenes" / name)
    for slug in SCENES:
        text = MODULE_REF.sub("')", (demos / "scenes" / f"{slug}.js").read_text())
        for old, new in PATCHES.get(slug, []):
            if old not in text:
                sys.exit(f"patch for {slug} no longer applies: {old!r}")
            text = text.replace(old, new)
        (DEST / "scenes" / f"{slug}.js").write_text(text)

    print(f"synced {len(SCENES)} scenes from {demos} into {DEST.relative_to(REPO)}")


if __name__ == "__main__":
    main()
