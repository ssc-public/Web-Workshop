main() {
  // a typical switch statement
  var piece = 'knight';
  switch(piece) {
    case 'bishop':
      print('diagonal');
      break;
    case 'knight':
      print('L-shape');
      break;
    default:
      print('checkmate');
  }

  // cases can only fall through if they are empty:
  piece = 'queen';
  switch(piece) {
    case 'queen':
    case 'bishop':
      print('diagonal');
      break;
  }

}
