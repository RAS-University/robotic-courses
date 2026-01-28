# save as make_warehouse_graph.py (or run in a notebook cell)
import matplotlib.pyplot as plt
import networkx as nx

from typing import Optional, Dict, List, Tuple



def draw_graph(G, pos, fname, edge_labels=None, title=None):
    plt.figure(figsize=(7, 4.5), dpi=160)

    # nodes (simple, clean)
    nx.draw_networkx_nodes(
        G, pos,
        node_color="white",
        edgecolors="black",
        node_size=1500,
        linewidths=2
    )
    nx.draw_networkx_labels(G, pos, font_size=11, font_weight="bold", verticalalignment="center")

    # edges (undirected by default)
    nx.draw_networkx_edges(G, pos, width=2, edge_color="black")

    # optional edge labels (e.g., traversal time)
    if edge_labels:
        nx.draw_networkx_edge_labels(
            G, pos,
            edge_labels=edge_labels,
            font_size=10,
            bbox=dict(facecolor="white", edgecolor="none", pad=1.2)
        )

    if title:
        plt.title(title, fontsize=12)

    plt.axis("off")
    plt.tight_layout()
    plt.savefig(fname, bbox_inches="tight", pad_inches=0.1)
    plt.close()


# -----------------------------
# Warehouse "motivation" graph
# -----------------------------
# A very small warehouse-like layout:
# - Nodes are named descriptively (Start, Crossroad, Packing, etc.)
# - Edges are possible moves between nearby places
# - Optional weights = "travel time" (e.g., slow zone / congested aisle)

G = nx.Graph()

# Descriptive vertex names (no theory, just places)
nodes = [
    "Start (Charging)",
    "Aisle 1",
    "Aisle 2",
    "Crossroad",
    "Aisle 3",
    "Aisle 4",
    "Packing / Goal",
]

# Connections (robot can move along these segments)
edges = [
    ("Start (Charging)", "Aisle 1"),
    ("Aisle 1", "Aisle 2"),
    ("Aisle 2", "Crossroad"),
    ("Crossroad", "Aisle 3"),
    ("Aisle 3", "Aisle 4"),
    ("Aisle 4", "Packing / Goal"),
    # an alternative route (e.g., another corridor)
    ("Aisle 2", "Aisle 3"),
]

G.add_nodes_from(nodes)
G.add_edges_from(edges)

# Simple positions so it looks like a corridor map (you can tweak freely)
pos = {
    "Start (Charging)": (-3.0, 0.0),
    "Aisle 1":         (-2.0, 0.0),
    "Aisle 2":         (-1.0, 0.0),
    "Crossroad":       ( 0.0, 0.0),
    "Aisle 3":         ( 1.0, 0.0),
    "Aisle 4":         ( 2.0, 0.0),
    "Packing / Goal":  ( 3.0, 0.0),
}

# Optional weights: "time cost" of moving along an edge
# Most edges have cost 1, but one corridor is "slower" (e.g., narrow aisle / congestion)
w = {e: 1 for e in G.edges()}
w[("Aisle 2", "Aisle 3")] = 3  # slow zone / avoid if possible

# NetworkX edge label dict expects keys as (u,v) tuples exactly as in G.edges()
edge_labels = {e: w[e] for e in G.edges()}

draw_graph(
    G, pos,
    fname="warehouse_motivation_graph.png",
    edge_labels=edge_labels,
    title="Warehouse robot: intersections/places as nodes, corridors as edges (edge label = travel time)"
)

print("Saved: warehouse_motivation_graph.png")


# save as make_warehouse_motivation_graph.py
# A clean, non-overlapping “warehouse robot” motivation figure:
# - Nodes = places/intersections
# - Edges = corridors (possible moves)
# - Different node types use distinct colors (start/goal/crossroad/aisles)
# - Optional edge labels = travel time / “slow corridor”
# - Easy to extend later (directed edges, filtering, highlighting a path, etc.)

import matplotlib.pyplot as plt
import networkx as nx
from matplotlib.lines import Line2D
def draw_warehouse_graph(
    G: nx.Graph,
    pos: dict,
    node_types: dict,
    type_style: dict,
    fname: str,
    title: str = "Warehouse robot navigation (motivation)",
    edge_labels: Optional[Dict[Tuple[str, str], int]] = None,
    highlight_edges: Optional[List[Tuple[str, str]]] = None,
    directed: bool = False,
):

    fig, ax = plt.subplots(figsize=(9, 6.5), dpi=170)
    ax.margins(y=0.25)

    ax.set_aspect("equal")
    ax.set_title(title, fontsize=13, pad=12)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.axis("off")

    # --- Draw edges (base) ---
    base_edges = list(G.edges())
    nx.draw_networkx_edges(
        G, pos,
        edgelist=base_edges,
        ax=ax,
        width=2.2,
        edge_color="#222222",
        alpha=0.55,
        arrows=directed,
        arrowstyle="-|>" if directed else None,
        arrowsize=16 if directed else None,
        min_source_margin=18 if directed else None,
        min_target_margin=18 if directed else None,
        connectionstyle="arc3,rad=0.05" if directed else None,
    )

    # --- Highlight selected edges (optional) ---
    if highlight_edges:
        # normalize for undirected case
        hset = set()
        for (u, v) in highlight_edges:
            hset.add((u, v))
            if not directed:
                hset.add((v, u))
        hedges = [(u, v) for (u, v) in G.edges() if (u, v) in hset]
        nx.draw_networkx_edges(
            G, pos,
            edgelist=hedges,
            ax=ax,
            width=4.2,
            edge_color="#0f172a",
            alpha=0.9,
            arrows=directed,
            arrowstyle="-|>" if directed else None,
            arrowsize=18 if directed else None,
            min_source_margin=18 if directed else None,
            min_target_margin=18 if directed else None,
            connectionstyle="arc3,rad=0.05" if directed else None,
        )

    # --- Draw nodes by type (different colors/shapes) ---
    # We draw each type separately so shapes can differ cleanly.
    for t, style in type_style.items():
        nodelist = [n for n in G.nodes() if node_types.get(n) == t]
        if not nodelist:
            continue
        nx.draw_networkx_nodes(
            G, pos,
            nodelist=nodelist,
            node_color=style["color"],
            node_shape=style.get("shape", "o"),
            node_size=1700,
            edgecolors="#111111",
            linewidths=2.0,
            ax=ax,
        )

    # --- Labels (short labels only, so nothing overlaps) ---
    nx.draw_networkx_labels(
        G, pos,
        font_size=12,
        font_weight="bold",
        ax=ax
    )

    # --- Edge labels (optional) ---
    if edge_labels:
        nx.draw_networkx_edge_labels(
            G, pos,
            edge_labels=edge_labels,
            font_size=10,
            bbox=dict(facecolor="white", edgecolor="none", pad=0.8, alpha=0.9),
            ax=ax
        )

    # --- Legend ---
    legend_items = []
    for t, style in type_style.items():
        legend_items.append(
            Line2D(
                [0], [0],
                marker=style.get("shape", "o"),
                color="none",
                markerfacecolor=style["color"],
                markeredgecolor="#111111",
                markeredgewidth=1.8,
                markersize=10,
                label=style.get("label", t),
            )
        )
    ax.legend(
        handles=legend_items,
        loc="lower left",
        frameon=True,
        framealpha=0.95,
        borderpad=0.6,
        labelspacing=0.5,
        fontsize=10,
    )

    plt.tight_layout()
    plt.savefig(fname, bbox_inches="tight", pad_inches=0.12)
    plt.close(fig)


if __name__ == "__main__":
    # -----------------------------
    # Warehouse-like toy environment
    # -----------------------------
    # Keep it simple, readable, and clearly separated:
    # - A main corridor Start -> ... -> Goal
    # - A crossroad X (decision point)
    # - One detour edge that is "slow"
    #
    # Node names are short to avoid overlap in the figure.
    # You can explain in text that A1..A4 are aisle intersections.

    G = nx.Graph()
    nodes = ["Start", "A1", "A2", "X", "A3", "A4", "Goal", "Dock"]
    edges = [
        ("Start", "A1"),
        ("A1", "A2"),
        ("A2", "X"),
        ("X", "A3"),
        ("A3", "A4"),
        ("A4", "Goal"),
        ("X", "Dock"),     # side branch (e.g., loading dock)
        ("A2", "A3"),      # alternative corridor (slower / congested)
    ]
    G.add_nodes_from(nodes)
    G.add_edges_from(edges)

    # Positions: 2-row layout so everything is spaced and readable.
    pos = {
        "Start": (-4.2,  0.0),
        "A1":    (-2.8,  0.0),
        "A2":    (-1.4,  0.0),
        "X":      (0.0,  0.0),
        "A3":     (1.4,  0.0),
        "A4":     (2.8,  0.0),
        "Goal":   (4.2,  0.0),
        "Dock":   (0.0, -1.8),
    }

    # Node types for color/shape
    node_types = {
        "Start": "start",
        "Goal":  "goal",
        "X":     "crossroad",
        "Dock":  "station",
        "A1":    "aisle",
        "A2":    "aisle",
        "A3":    "aisle",
        "A4":    "aisle",
    }

    # Explicit, non-bland colors + distinct shapes
    type_style = {
        "start":     {"color": "#22c55e", "shape": "s", "label": "Start (charging)"},
        "goal":      {"color": "#f59e0b", "shape": "s", "label": "Goal (packing)"},
        "crossroad": {"color": "#60a5fa", "shape": "o", "label": "Crossroad / decision"},
        "station":   {"color": "#a78bfa", "shape": "D", "label": "Dock / station"},
        "aisle":     {"color": "#f3f4f6", "shape": "o", "label": "Aisle intersection"},
    }

    # Optional edge labels: simple “travel time”
    # Everything is 1 except the alternative corridor A2–A3 which is slower (3).
    edge_labels = {}
    for u, v in G.edges():
        if set((u, v)) == {"A1", "A2"}:
            edge_labels[(u, v)] = 3   # slower / congested aisle
        elif set((u, v)) == {"X", "A3"}:
            edge_labels[(u, v)] = 2
        else:
            edge_labels[(u, v)] = 1


    # Optional: highlight a “typical route” from Start to Goal
    highlight = [("Start", "A1"), ("A1", "A2"), ("A2", "X"), ("X", "A3"), ("A3", "A4"), ("A4", "Goal")]

    draw_warehouse_graph(
        G=G,
        pos=pos,
        node_types=node_types,
        type_style=type_style,
        fname="warehouse_motivation_graph.png",
        title="Warehouse robot: squares as nodes, corridors as edges (edge label = travel time)",
        edge_labels=edge_labels,
        highlight_edges=highlight,
        directed=False,
    )

    print("Saved: warehouse_motivation_graph.png")
