import 'dart:async';

const Duration delay = const Duration(milliseconds: 2000);

// This function doesn't use async / await; just the
// standard Future API
Future<String> loadLastName(String firstName) {
  return new Future.delayed(delay).then((_) {
    return firstName + 'son';
  });
}

// Marking a function with 'async' will return a future
// that completes with the returned value.
// This function is equivalent to [loadLastName]
Future<String> loadLastName2(String firstName) async {
  await new Future.delayed(delay);

  return firstName + 'son';
}

main() async {
  // 'await' will suspend execution of the function until the
  // future completes:
  var gregsLastName = await loadLastName('greg');
  var stevesLastName = await loadLastName2('steve');

  print('greg $gregsLastName');
  print('steve $stevesLastName');
}
