import 'dart:collection';

class Graph {
  HashMap graph = new HashMap<int, List<dynamic>>();
  var number_of_nodes;
  List<int> nodes;

  Graph(this.nodes) {
    for (int i = 0; i < this.nodes.length; i++) this.graph[nodes[i]] = [];
    this.number_of_nodes = this.nodes.length;
  }

  HashMap get graph_map => this.graph;

  int get size => this.number_of_nodes;

  void node_append(int new_node) {
    this.nodes.add(new_node);
    this.graph[new_node] = [];
  }

  // using for directional graph
  void edge_append_directional(int n1, int n2) {
    this.graph[n1].add(n2);
  }

  // using for undirectional graph
  void edge_append_normal(int n1, int n2) {
    this.graph[n1].add(n2);
    this.graph[n2].add(n1);
  }
}

List<int> BFS(Graph graph, int numberOfNodes, int startNode) {
  List<int> visited = new List<int>.filled(numberOfNodes, 0);
  visited[0] = 1;
  Queue queue = new Queue<int>();
  List<int> answer = [];
  queue.add(startNode);
  while (queue.isNotEmpty) {
    int node = queue.removeFirst();
    answer.add(node);
    for (int child in graph.graph[node]) {
      if (visited[child] == 0) {
        visited[child] = 1;
        queue.add(child);
      }
    }
  }
  return answer;
}

void main() {
  // starting from 0 and step equals to 1
  List<int> nodes = [0, 1, 2, 3, 4];

  int numberOfEdges = 4;
  List<List<int>> edges = [
    [0, 2],
    [2, 1],
    [2, 3],
    [4, 1]
  ];
  Graph graph = Graph(nodes);

  for (int i = 0; i < numberOfEdges; i++)
    graph.edge_append_normal(edges[i][0], edges[i][1]);

  int starting_node = 0;
  List<int> route = BFS(graph, graph.size, starting_node);
  print(route);
}
