import matplotlib.pyplot as plt
import networkx as nx

# Directed graph definition
G = nx.DiGraph()
edges = [("A","B"), ("A","C"), ("B","C"), ("C","A"), ("C","D"), ("D","E")]
G.add_edges_from(edges)

# Manual layout for readability
pos = {
    "A": (0, 1),
    "B": (-1, 0),
    "C": (1, 0),
    "D": (2, -1),
    "E": (3, -2)
}

# Start figure
plt.figure(figsize=(6,4), dpi=150)

# Draw nodes
nx.draw_networkx_nodes(G, pos, node_color="white", edgecolors="black",
                       node_size=1400, linewidths=2)
nx.draw_networkx_labels(G, pos, font_size=14, font_weight="bold")

# Custom edge drawing: curved for bidirectional edges
def curved_edges(G, pos, rad=0.15):
    curved = []
    straight = []
    seen = set()
    for u, v in G.edges():
        if (v, u) in seen:
            curved.append((u, v))
        else:
            straight.append((u, v))
        seen.add((u, v))
    return straight, curved

straight, curved = curved_edges(G, pos)

# Straight edges (normal arrows)
nx.draw_networkx_edges(
    G, pos,
    edgelist=straight,
    arrowstyle='-|>',
    arrowsize=16,
    width=2,
    edge_color='black',
    min_target_margin=15,  # keeps arrow outside node
    min_source_margin=15
)

# Curved edges (like A<->C)
nx.draw_networkx_edges(
    G, pos,
    edgelist=curved,
    arrowstyle='-|>',
    arrowsize=16,
    width=2,
    edge_color='black',
    connectionstyle='arc3,rad=0.25',  # curvature
    min_target_margin=15,
    min_source_margin=15
)

# Formatting
plt.axis("off")
plt.tight_layout()
plt.savefig("directed_graph_clean.png", bbox_inches="tight", pad_inches=0.1)
plt.show()

# Degree verification
for n in G.nodes():
    print(f"{n}: in={G.in_degree(n)}, out={G.out_degree(n)}")
