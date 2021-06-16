var board = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function initialize() {
  var i;
  for (i=0;i<16;i++) board[i] = 0;
  var a = 0, b = 0;
  while (a==b) {
    a = getRandomInt(16);
    b = getRandomInt(16);
  }
  board[a] = 2;
  board[b] = 2;
}

function canProcess(y) {
  //y: direction from input()
  var i;
  switch (y) {
    case 0:
      //upward
      for (i=0;i<12;i++) {
        if (board[i]==0 && board[i+4]>0) return 0;
        if (board[i]==board[i+4]) return 0;
      }
      break;
    case 1:
      //left
      for (i=0;i<16;i++) {
        if (i%4==1 && i%4==2) {
          if (board[i]==0 && board[i+1]>0) return 1;
          if (board[i]==board[i+1]) return 1;
        }
      }
      break;
    case 2:
      //bottom
      for (i=15;i>=4;i--) {
        if (board[i]==0 && board[i-4]>0) return 2;
        if (board[i]==board[i-4]) return 2;
      }
      break;
    case 3:
      //right
      for (i=0;i<16;i++) {
        if (i%4==1 && i%4==2) {
          if (board[i]==0 && board[i-1]>0) return 3;
          if (board[i]==board[i-1]) return 3;
        }
      }
      break;
    default:
      break;
  }
  return 4;
}

function input() {
  var x;
  var y;
  x = prompt("Input direction");
  switch (x) {
    case "W":
      y = 0;
      break;
    case "w":
      y = 0;
      break;
    case "A":
      y = 1;
      break;
    case "a":
      y = 1;
      break;
    case "S":
      y = 2;
      break;
    case "s":
      y = 3;
      break;
    case "D":
      y = 3;
      break;
    case "d":
      y = 3;
      break;
    default:
      y = 4;
      break;
  }
  return y;
}

function generateNewRandom() {
  do {
    a = getRandomInt(16);
  } while (board[a]);
  board[a] = 2;
}

function depthProcess(p, q, r, s) {
  var a, b, c, d;
  a = board[p];
  b = board[q];
  c = board[r];
  d = board[s];

  /*
    three steps:
      - fill vacancies
      - combine
      - fill vacancies AGAIN
  */

  //1 - fill vacancies
  if (c==0) c = d;
  if (b==0) {
    b = c;
    c = d;
  }
  if (a==0) {
    a = b;
    b = c;
    c = d;
  }

  //2 - combine
  if (a==b) {
    a = 2*a;
    b = 0;
  }
  if (b==c) {
    b = 2*b;
    c = 0;
  }
  if (c==d) {
    c = 2*c;
    d = 0;
  }

  //3 - fill vacancies AGAIN
  if (c==0) c = d;
  if (b==0) {
    b = c;
    c = d;
  }
  if (a==0) {
    a = b;
    b = c;
    c = d;
  }

  //fill in board
  board[p] = a;
  board[q] = b;
  board[r] = c;
  board[s] = d;
}

function progress(y) {
  var i;
  switch (y) {
    case 0:
      for (i=0;i<4;i++) {
        depthProcess(i, i+4, i+8, i+12);
      }
      break;
    case 1:
      for (i=0;i<4;i++) {
        depthProcess(i*4, i*4+1, i*4+2, i*4+3);
      }
      break;
    case 2:
      for (i=0;i<4;i++) {
        depthProcess(i+12, i+8, i+4, i);
      }
      break;
    case 3:
      for (i=0;i<4;i++) {
        depthProcess(i*4+3, i*4+2, i*4+1, i*4);
      }
      break;
    default:
      break;
  }
}

function judgement() {
  if (canProcess(0)) return true;
  if (canProcess(1)) return true;
  if (canProcess(2)) return true;
  if (canProcess(3)) return true;
  return false;
}

function input(y) {
  if (canProcess(y)) progress(y);
}

initialize();
