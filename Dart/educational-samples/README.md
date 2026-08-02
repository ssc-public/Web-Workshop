<div dir="rtl">
در این تمرین با استفاده از داده‌ساختار های کتابخانه های پیشفرض دارت به حل مسئله جستجوی سطح-اول پرداختیم.

<div dir="ltr">

```dart
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

```

<div dir="rtl">

در کد بالا کلاس گراف را تعریف کردیم. همانطور که می‌بینیند استفاده از متدهای کانستراکتور و getter 
در دارت به شکلی ساده قابل انجام است. 

برای خوانایی بالاتر کد به عنوان نمونه متد زیر می توانست به شکل دیگری نیز پیاده شود که در ادامه آورده شده است.

<div dir="ltr">

```dart
HashMap get graph_map => this.graph;
```

<div dir="rtl">

به جای آن میشد نوشت:

<div dir="ltr">

```dart
HashMap get graph_map {
    return this.graph;
}
```

<div dir="rtl">
سپس به پیاده سازی تابع bfs پرداختیم.


<div dir="ltr">

```dart
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

```

<div dir="rtl">

خروجی تابعی لیستی از تایپ اعداد صحیح است ورودی آن نیز به ترتیب گراف و تعداد نود ها و نود آغازین است.
برای اینکه از پیمایش نودهای تکراری دوری شود از یک لیست به نام visited 
استفاده شده است و از مفهوم صف و  FIFO نیز برای پیاده سازی تابع استفاده شده است. در

در پایان در یک تابع main این تابع فراخوانی شده و تست اجرا می‌شود. 


