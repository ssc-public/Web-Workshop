//
class FoodSpoiledError extends StateError {
  FoodSpoiledError(String msg) : super(msg);
}

class Potato {
  int age;

  Potato(this.age);

  String peel() {
    if (age > 4) {
      throw new FoodSpoiledError('your potato is spoiled');
    }
    return "peeled";
  }
}

main() {
  var p = new Potato(7);

  try {
    p.peel();
  } on FoodSpoiledError catch(_) {
    print("nope nope nope");
  }

  // any non-null object can be thrown:
  try {
    throw("potato");
  } catch(_) {
    print("caught a flying potato");
  }

  // exceptions halt excecution
  p.peel();
  print('not reached');
}
