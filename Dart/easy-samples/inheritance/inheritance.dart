/// Abstract classes can't be instantiated,
/// but can contain some implementation.
abstract class Animal {
  String name;
  Animal(this.name);
  String get noise;
}

/// Classes can be extended to share functionality
class Dog extends Animal {
  Dog(String name) : super(name);
  String get noise => 'bark!';
}

/// Classes can implement other classes if they
/// define all of the fields
class Pikachu implements Animal {
  String name = 'Pikachu';
  String get noise => 'pika!';
}

void releaseAnimals(Iterable<Animal> animals) {
  animals.forEach((a) => print('${a.name} has been released: ${a.noise}'));
}

main() {
  var barry = new Dog('Barry');
  var pika = new Pikachu();
  releaseAnimals([barry, pika]);
}
