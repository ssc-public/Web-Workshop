main() {
  // Iterable is implemented by LinkedList,List, ListQueue, Queue, Runes,
  // Set, and more.
  var set = new Set()
    ..add('greg')
    ..add('steve');

  for (var name in set) {
    print(name);
  }
}
