main() {
  var i = 0;

  // while conditions are evaluated before the loop
  while(i++ < 2) {
    print("while $i");
  }

  var j = 0;

  // do-while conditions are evaluated after the loop
  do {
    print("dowhile $j");
  } while (j++ < 2);
}
