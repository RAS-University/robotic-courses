# dijkstra_animation_labels_weights.py
import matplotlib.pyplot as plt
import networkx as nx
import heapq
from matplotlib.animation import FuncAnimation, PillowWriter

# ---------- Build the graph ----------
G = nx.Graph()
G.add_edges_from([
    ("A", "B"), ("A", "C"),
    ("B", "C"), ("B", "D"),
    ("C", "D"), ("C", "E"),
    ("D", "E")
])
w = {
    ("A","B"): 2,
    ("A","C"): 5,
    ("B","C"): 2,
    ("B","D"): 6,
    ("C","D"): 1,
    ("C","E"): 6,
    ("D","E"): 1
}
nx.set_edge_attributes(G, w, "weight")

pos = {
    "A": (-1.0,  1.0),
    "B": (-1.0, -0.5),
    "C": ( 0.0,  0.0),
    "D": ( 1.0, -0.5),
    "E": ( 2.0, -1.0)
}

START = "A"
INF = 10**9

# ---------- Dijkstra with event logging ----------
dist = {v: INF for v in G.nodes()}
parent = {v: None for v in G.nodes()}
dist[START] = 0

pq = [(0, START)]
finalized = set()
events = []

def snapshot(event_type, **kwargs):
    ev = {
        "type": event_type,
        "dist": dist.copy(),
        "parent": parent.copy(),
        "finalized": finalized.copy()
    }
    ev.update(kwargs)
    events.append(ev)

snapshot("init")

while pq:
    du, u = heapq.heappop(pq)
    if u in finalized:
        continue

    snapshot("extract", u=u)

    for v in G.neighbors(u):
        w_uv = G[u][v]["weight"]
        new_d = dist[u] + w_uv
        improved = False
        if new_d < dist[v]:
            dist[v] = new_d
            parent[v] = u
            heapq.heappush(pq, (dist[v], v))
            improved = True
        snapshot("relax", u=u, v=v, improved=improved)

    finalized.add(u)
    snapshot("finalize", u=u)

if not events:
    snapshot("init")

# ---------- Animation ----------
NODE_SIZE = 1400
FPS = 2
INTERVAL = 600  # ms/frame (a touch slower)
DIST_OFFSET_PT = (0, 24)   # distance label offset in points (x,y)
EDGE_WEIGHT_FONTSIZE = 11
DIST_FONT_SIZE = 11

fig, ax = plt.subplots(figsize=(6.4, 4.4), dpi=150)
plt.axis('off')

# Limits
xs = [p[0] for p in pos.values()]
ys = [p[1] for p in pos.values()]
ax.set_xlim(min(xs)-0.6, max(xs)+0.6)
ax.set_ylim(min(ys)-0.8, max(ys)+0.6)

# Static base edges (thin grey)
nx.draw_networkx_edges(G, pos, width=1.4, edge_color='#777777', ax=ax)

# Static edge weights
edge_labels = nx.get_edge_attributes(G, "weight")
_ = nx.draw_networkx_edge_labels(
    G, pos, edge_labels=edge_labels, font_size=EDGE_WEIGHT_FONTSIZE,
    bbox=dict(facecolor='white', edgecolor='none', pad=1.0),
    font_color="#333", ax=ax
)

# Dynamic containers (we clear and redraw these each frame)
dyn_nodes, dyn_edges, dyn_texts = [], [], []

def clear_dynamic():
    for group in (dyn_nodes, dyn_edges, dyn_texts):
        while group:
            a = group.pop()
            if isinstance(a, list):
                for it in a:
                    if hasattr(it, "remove"): it.remove()
            elif hasattr(a, "remove"):
                a.remove()

def draw_frame(ev):
    # --- SPT edges for finalized nodes (red) ---
    par = ev["parent"]
    spt_edgelist = []
    for x in ev["finalized"]:
        px = par.get(x)
        if px and G.has_edge(x, px):
            spt_edgelist.append(tuple(sorted((x, px))))
    if spt_edgelist:
        lc = nx.draw_networkx_edges(G, pos, edgelist=spt_edgelist,
                                    width=3, edge_color='red', ax=ax)
        dyn_edges.append(lc)

    # --- Current relax edge (green), if any ---
    if ev["type"] == "relax":
        u, v = ev["u"], ev["v"]
        if G.has_edge(u, v):
            lc = nx.draw_networkx_edges(G, pos, edgelist=[(u, v)],
                                        width=3, edge_color='green', ax=ax)
            dyn_edges.append(lc)

    # --- Nodes (border-only) ---
    active = ev["u"] if ev["type"] in ("extract", "relax") else None
    finalized_nodes = list(ev["finalized"])
    other_nodes = [n for n in G.nodes() if n not in finalized_nodes and n != active]

    if finalized_nodes:
        coll = nx.draw_networkx_nodes(G, pos, nodelist=finalized_nodes,
                                      node_color="white", edgecolors="red",
                                      node_size=NODE_SIZE, linewidths=2.8, ax=ax)
        dyn_nodes.append(coll)
    if other_nodes:
        coll = nx.draw_networkx_nodes(G, pos, nodelist=other_nodes,
                                      node_color="white", edgecolors="black",
                                      node_size=NODE_SIZE, linewidths=2.2, ax=ax)
        dyn_nodes.append(coll)
    if active:
        coll = nx.draw_networkx_nodes(G, pos, nodelist=[active],
                                      node_color="white", edgecolors="green",
                                      node_size=NODE_SIZE, linewidths=3.8, ax=ax)
        dyn_nodes.append(coll)

    # --- Node letters (inside nodes) ---
    labels = nx.draw_networkx_labels(G, pos, font_size=14, font_weight="bold", ax=ax)
    dyn_texts.append(list(labels.values()))

    # --- Distance labels (offset upward; no overlap with border) ---
    for n, (x, y) in pos.items():
        dval = ev["dist"][n]
        text = "∞" if dval >= INF//2 else str(dval)
        t = ax.annotate(text, xy=(x, y), xycoords='data',
                        textcoords='offset points', xytext=DIST_OFFSET_PT,
                        ha='center', va='bottom', fontsize=DIST_FONT_SIZE,
                        color="#222",
                        bbox=dict(boxstyle="round,pad=0.25", facecolor='white',
                                  edgecolor='none', alpha=0.9))
        dyn_texts.append(t)

def init():
    clear_dynamic()
    draw_frame(events[0])
    return []

def animate(i):
    clear_dynamic()
    draw_frame(events[i])
    return []

anim = FuncAnimation(
    fig, animate, init_func=init,
    frames=len(events), interval=INTERVAL, blit=False, repeat=False
)

writer = PillowWriter(fps=FPS)
anim.save("dijkstra_animation.gif", writer=writer, dpi=150,
          savefig_kwargs={"facecolor": "white"})
print("Saved dijkstra_animation.gif")
