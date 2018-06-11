function preload() {
  img0 = loadImage("Cards/0.png");
  img1 = loadImage("Cards/1.png");
  img2 = loadImage("Cards/2.png");
  img3 = loadImage("Cards/3.png");
  img4 = loadImage("Cards/4.png");
  img5 = loadImage("Cards/5.png");
  img6 = loadImage("Cards/6.png");
  img7 = loadImage("Cards/7.png");
  img8 = loadImage("Cards/8.png");
  img9 = loadImage("Cards/9.png");
  img10 = loadImage("Cards/10.png");
  img11 = loadImage("Cards/11.png");
  img12 = loadImage("Cards/12.png");
  img13 = loadImage("Cards/13.png");
  img14 = loadImage("Cards/14.png");
  img15 = loadImage("Cards/15.png");
  img16 = loadImage("Cards/16.png");
  img17 = loadImage("Cards/17.png");
  img18 = loadImage("Cards/18.png");
  img19 = loadImage("Cards/19.png");
  img20 = loadImage("Cards/20.png");
  img21 = loadImage("Cards/21.png");
  img22 = loadImage("Cards/22.png");
  img23 = loadImage("Cards/23.png");
  img24 = loadImage("Cards/24.png");
  img25 = loadImage("Cards/25.png");
  img26 = loadImage("Cards/26.png");
  img27 = loadImage("Cards/27.png");
  img28 = loadImage("Cards/28.png");
  img29 = loadImage("Cards/29.png");
  img30 = loadImage("Cards/30.png");
  img31 = loadImage("Cards/31.png");
  img32 = loadImage("Cards/32.png");
  img33 = loadImage("Cards/33.png");
  img34 = loadImage("Cards/34.png");
  img35 = loadImage("Cards/35.png");
  img36 = loadImage("Cards/36.png");
  img37 = loadImage("Cards/37.png");
  img38 = loadImage("Cards/38.png");
  img39 = loadImage("Cards/39.png");
  img40 = loadImage("Cards/40.png");
  img41 = loadImage("Cards/41.png");
  img42 = loadImage("Cards/42.png");
  img43 = loadImage("Cards/43.png");
  img44 = loadImage("Cards/44.png");
  img45 = loadImage("Cards/45.png");
  img46 = loadImage("Cards/46.png");
  img47 = loadImage("Cards/47.png");
  img48 = loadImage("Cards/48.png");
  img49 = loadImage("Cards/49.png");
  img50 = loadImage("Cards/50.png");
  img51 = loadImage("Cards/51.png");
  b = loadImage('Cards/' + 2 + '.png');
}


var arr;
var imgArr;
var cardsInPlay;
var playerCards;
var botCards;
var table;
var CARD_WIDTH = 225;
var CARD_HEIGHT = 325;
var buttonPresses = 0;
var b;

var botCard1;

function setup() {
  arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];  
  imgArr = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, img51];
  var combinedArr = shuffleCards(arr, imgArr);
  arr = shuffleCards(arr);
  imgArr = combinedArr[1];
  console.log(arr);
  console.log(imgArr);
  cardsInPlay = deal(arr);
  console.log(cardsInPlay);
  playerCards = cardsInPlay[0];
  botCards = cardsInPlay[1];
  table = cardsInPlay[2];
  
  Button1 = createButton('Show River');
  Button1.position(700 - Button1.width, 65);
  Button1.mousePressed(showRiver);
  
  botCard1 = loadImage('Cards/' + botCards[0] + '.png');
  
}

function draw() {
  createCanvas(700, 600);
  background(50);
  textSize(32);
  fill(255);
  text('Opponent', (CARD_WIDTH + 30), 46);
  image(b, 0, 0);
  
  // Draw Base for Opponent Cards
  rect(20, 30, CARD_WIDTH/2, CARD_HEIGHT/2);
  rect(CARD_WIDTH/2 + 25, 30, CARD_WIDTH/2, CARD_HEIGHT/2);
  for (i = 0; i < 5; i++){
    // Draw Backs of Table Cards
    rect(i*(CARD_WIDTH/2 + 5)+20, CARD_HEIGHT/2 + 40 , CARD_WIDTH/2, CARD_HEIGHT/2);
  }
  // Draw Base for Your Cards
  rect(20, CARD_HEIGHT + 50, CARD_WIDTH/2, CARD_HEIGHT/2);
  rect(CARD_WIDTH/2 + 25, CARD_HEIGHT + 50, CARD_WIDTH/2, CARD_HEIGHT/2);
  //Draw Opponent Cards
  image(botCard1, 0, 0);
  image(imgArr[botCards[0]], 20, 30, imgArr[botCards[0]].width/2, imgArr[botCards[0]].height/2);
  image(imgArr[botCards[1]], CARD_WIDTH/2 + 25, 30, imgArr[botCards[1]].width/2, imgArr[botCards[1]].height/2);
  
  //Draw Your Cards
  image(imgArr[playerCards[0]], 20, CARD_HEIGHT + 50, imgArr[playerCards[0]].width/2, imgArr[playerCards[0]].height/2);
  image(imgArr[playerCards[1]], CARD_WIDTH/2 + 25, CARD_HEIGHT + 50, imgArr[playerCards[1]].width/2, imgArr[playerCards[1]].height/2);
  noLoop();
}


function shuffleCards(array, imgArray) {
  var currentIndex = array.length, temporaryValue, temporaryValue2, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    temporaryValue2 = imgArray[currentIndex];
    array[currentIndex] = array[randomIndex];
    imgArray[currentIndex] = imgArray[randomIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    imgArray[randomIndex] = temporaryValue2;
  }
  
  combinedArray = [array, imgArray];

  return combinedArray;
}

function round() {
  
}

function deal(array) {
  var playerCards = [array[0], array[2]];
  var botCards = [array[1], array [3]];
  console.log(playerCards);
  console.log(botCards);
  var table = [array[5], array[6], array[7], array[9], array[11]]
  console.log(table);
  var cardsInPlay = [playerCards, botCards, table];
  return cardsInPlay
}

function showRiver() {
  if (buttonPresses == 0) {
    for (i = 0; i < 3; i++){
      image(imgArr[table[i]], (i*(CARD_WIDTH/2 + 5)+ 20), CARD_HEIGHT/2 + 40, imgArr[table[i]].width/2, imgArr[table[i]].height/2);
    }
    buttonPresses += 1;
  } else if (buttonPresses == 1) {
      image(imgArr[table[3]], (3*(CARD_WIDTH/2 + 5)+ 20), CARD_HEIGHT/2 + 40, imgArr[table[3]].width/2, imgArr[table[3]].height/2);
      buttonPresses += 1;
  } else if (buttonPresses == 2) {
      image(imgArr[table[4]], (4*(CARD_WIDTH/2 + 5)+20), CARD_HEIGHT/2 + 40, imgArr[table[4]].width/2, imgArr[table[4]].height/2);
      buttonPresses = 0;
      Button1.hide();
  }
}

function showBotCards(){
  
}
