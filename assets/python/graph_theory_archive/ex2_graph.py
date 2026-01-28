# save as make_quiz_graphs.py (or run in a notebook cell)
import matplotlib.pyplot as plt
import networkx as nx

def draw_graph(G, pos, fname, edge_labels=None):
    plt.figure(figsize=(6,4), dpi=150)
    nx.draw_networkx_nodes(G, pos, node_color="white", edgecolors="black",
                           node_size=1400, linewidths=2)
    nx.draw_networkx_labels(G, pos, font_size=14, font_weight="bold", verticalalignment='center')
    # undirected edges (no arrows), keep gaps from node borders for clarity
    nx.draw_networkx_edges(
        G, pos, width=2, edge_color='black'
    )
    if edge_labels:
        nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels,
                                     font_size=12, bbox=dict(facecolor='white', edgecolor='none', pad=1.5))
    plt.axis('off')
    plt.tight_layout()
    plt.savefig(fname, bbox_inches="tight", pad_inches=0.1)
    plt.close()

# 1) Connected & weighted (undirected)
G1 = nx.Graph()
G1.add_edges_from([("A","B"),("A","C"),("B","D"),("C","D"),("C","E"),("D","E")])
pos1 = {"A":(-1,1), "B":(-2,0), "C":(0,0), "D":(-1,-1), "E":(1,-1)}
w = {("A","B"):2.0, ("A","C"):1.5, ("B","D"):3.0, ("C","D"):2.5, ("C","E"):1.0, ("D","E"):4.0}
draw_graph(G1, pos1, "graph_connected_weighted.png", edge_labels=w)

# 2) Disconnected & unweighted (two components)
G2 = nx.Graph()
G2.add_edges_from([("A","B"),("B","C")])   # component 1
G2.add_edges_from([("D","E")])             # component 2
pos2 = {"A":(-2,1), "B":(-1,0), "C":(0,1), "D":(1.5,0.2), "E":(2.8,-0.6)}
draw_graph(G2, pos2, "graph_disconnected_unweighted.png")
print("Saved: graph_connected_weighted.png, graph_disconnected_unweighted.png")

# Append to your image-generation script or run standalone
import matplotlib.pyplot as plt
import networkx as nx

def draw_directed_graph(G, pos, fname):
    plt.figure(figsize=(6,4), dpi=150)
    # nodes
    nx.draw_networkx_nodes(G, pos, node_color="white", edgecolors="black",
                           node_size=1400, linewidths=2)
    nx.draw_networkx_labels(G, pos, font_size=14, font_weight="bold", verticalalignment='center')

    # edges with clear arrowheads (avoid overlap with nodes)
    nx.draw_networkx_edges(
        G, pos,
        arrows=True,
        arrowstyle='-|>',    # clear triangular head
        arrowsize=18,
        width=2,
        connectionstyle='arc3,rad=0.08',  # slight curve so heads are visible
        min_source_margin=15,             # keep arrow tails off node border
        min_target_margin=15              # keep arrow heads off node border
    )

    plt.axis('off')
    plt.tight_layout()
    plt.savefig(fname, bbox_inches="tight", pad_inches=0.1)
    plt.close()

# A small directed example (connected)
DG = nx.DiGraph()
DG.add_edges_from([("A","B"),("B","C"),("C","A"),("B","D"),("D","E")])
pos = {"A":(-1,1), "B":(0,0.4), "C":(1,1), "D":(0,-0.3), "E":(1.2,-1.0)}
draw_directed_graph(DG, pos, "graph_directed.png")
print("Saved: graph_directed.png")


G2 = nx.Graph()
G2.add_edges_from([("A","B"), ("A","C"), ("B","C"), ("C","D")])
pos2 = {"A":(-1,1), "B":(-2,-0.2), "C":(0,0), "D":(1,-1)}
w2 = {("A","B"):1.0, ("A","C"):2.5, ("B","C"):1.8, ("C","D"):3.2}
draw_graph(G2, pos2, "graph_4node_weighted.png", edge_labels=w2)

G3 = nx.Graph()
G3.add_edges_from([
    ("A","B"), ("A","D"), ("B","C"), ("C","D"), ("C","E"), ("D","E")
])
pos3 = {"A":(-1,1), "B":(-2,-0.2), "C":(0,0), "D":(-1,-1), "E":(1,-1.2)}
w3 = {
    ("A","B"):2.2,
    ("C","D"):2.8,
    ("C","E"):1.5,
    ("D","E"):2.3,
    ("A","D"):3.1,
    ("B","C"):1.7,
    
}
# --- Replace your pos1/pos2/pos3 with these ---

# G1: connected & weighted (no crossings)
pos1 = {
    "A": (-2.0,  1.6),
    "B": (-2.4, -0.4),
    "C": (-0.4,  0.4),
    "D": (-1.6, -1.4),
    "E": ( 1.0, -1.2),
}
# Edges: A-B (left), A-C (diag), B-D (left-down), C-D (diag), C-E (right), D-E (bottom) → no crossings

# G2: 4-node weighted (no crossings)
pos2 = {
    "A": (-2.0,  1.2),
    "B": (-2.4, -0.2),
    "C": (-0.6,  0.2),
    "D": ( 1.2, -1.0),
}
# Edges: A-B, A-C, B-C form a small left triangle; C-D extends right-down → no crossings

# G3: 5-node weighted (no crossings)
pos3 = {
    "A": (-2.0,  1.6),
    "B": (-1.0,  2.0),
    "C": ( 0.0,  0.2),
    "D": (-2.0, -1.2),
    "E": ( 1.2, -1.2),
}
# Edges: A-B (top), A-D (left), B-C (down-right), C-D (down-left), C-E (right-down), D-E (bottom) → no crossings

draw_graph(G3, pos3, "graph_5node_weighted.png", edge_labels=w3)