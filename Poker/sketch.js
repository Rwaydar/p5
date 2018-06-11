/*function preload() {
  TonyG = loadImage('Cards/TonyG.png');
}
*/
var arr;
var cardsInPlay;
var playerCards;
var botCards;
var table;
var CARD_WIDTH = 225;
var CARD_HEIGHT = 325;
var buttonPresses = 0;
var botStack = 100;
var playerStack = 100;
var input1;

var botCardsImg;

var playerCardsImg;

var riverCards;

var playerBet = 0;
var botBet = 0;

var BIG_BLIND = 10;

var playerBlind = 0;
var botBlind = 0;

var roundNo = 1;

var pot = 0;


function setup() {
  arr = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', 'TS', 'TC', 'TD', 'TH', 'TS', 'JC', 'JD', 'JH', 'JS', 'QC', 'QD', 'QH', 'QS', 'KC', 'KD', 'KH', 'KS', 'AC', 'AD', 'AH', 'AS'];

  //Show River Button
  Button1 = createButton('Draw');
  Button1.position(800 - Button1.width - 10, CARD_HEIGHT + 65);
  Button1.mousePressed(drawCards);

  //Show Opponent Cards Button
  Button2 = createButton('Show Opponent Cards');
  Button2.position(800 - Button2.width - 10, CARD_HEIGHT + 70 + Button2.height);
  Button2.mousePressed(showBotCards);

  Button3 = createButton('See Your Cards');
  Button3.position(800- Button3.width - 10, CARD_HEIGHT + 75 + Button3.height*2);
  Button3.mousePressed(seeCards);

  Button4 = createButton('Next Round');
  Button4.position(800- Button4.width - 10, CARD_HEIGHT + 80 + Button4.height*3);
  Button4.mousePressed(nextRound);

  Button5 = createButton('Bet');
  Button5.position(800 - Button5.width - 10, CARD_HEIGHT + 85 + Button5.height*4);
  Button5.mousePressed(bet);

  Button6 = createButton('Restart');
  Button6.position(400 - Button6.width, 300 + Button5.height);
  Button6.mousePressed(restart);

  input1 = createInput();
  input1.position(800 - input1.width - 10 - Button5.width, CARD_HEIGHT +  85 + Button5.height*4);

}

function draw() {
  drawBackground();
  noLoop();
}

function bet() {
  var playerBet = input1.value();
  if ((playerBet <= playerStack) && (playerBet % 1 === 0) && (playerBet > 0)) {
    playerStack -= playerBet;
    pot += input1.value();
    console.log(pot);
  } else {
    input1.value('Invalid Input');
  }
  noStroke();
  fill(50);
  rect(25, 55, 170, 32);
  rect(25, 55 + CARD_HEIGHT + 20, 170, 32);
  stroke(0);
  rect(25, 55 + CARD_HEIGHT * 1.7 + 20, 170, 32);

  fill(200);

  text('Stack: ' + botStack, 30, 83);
  text('Stack: ' + playerStack, 30, CARD_HEIGHT + 103);
  text('Pot:' + pot, 30, CARD_HEIGHT*1.7);

  for (i = 0; i < pot; i++) {
    console.log(i);
  }

}

function drawBackground() {
  input1.hide();
  Button6.hide();
  Button5.hide();
  Button4.hide();
  Button3.hide();
  Button2.hide();
  Button1.show();
  createCanvas(800, 600);
  background(50);
  textSize(30);
  fill(255);

  //Shuffle Cards and return Array
  arr = shuffleCards(arr);
  console.log(arr);

  //Deal the Cards
  cardsInPlay = deal(arr);
  playerCards = cardsInPlay[0];
  botCards = cardsInPlay[1];
  table = cardsInPlay[2];

  playerStack += pot;
  pot = 0;

  //Blinds
  blinds();

  botCardsImg = [loadImage('Cards/' + botCards[0] + '.png'), loadImage('Cards/' + botCards[1] + '.png')];

  playerCardsImg = [loadImage('Cards/' + playerCards[0] + '.png'), loadImage('Cards/' + playerCards[1] + '.png')];

  riverCards = [loadImage('Cards/' + table[0] + '.png'), loadImage('Cards/' + table[1] + '.png'), loadImage('Cards/' + table[2] + '.png'), loadImage('Cards/' + table[3] + '.png'), loadImage('Cards/' + table[4] + '.png')];

  fill(255);
  text('Opponent', 30, 53);
  text('Player', 30, CARD_HEIGHT + 73);
  input1.value(0);

  input1.show();
  Button5.show();

  handValue();

  //Tony G
  image(TonyG, 2*CARD_WIDTH - 50, 55, TonyG.width/2, TonyG.height/2);
}


function shuffleCards(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function deal(array) {
  var playerCards = [array[0], array[2]];
  var botCards = [array[1], array [3]];
  console.log(playerCards);
  console.log(botCards);
  var table = [array[5], array[6], array[7], array[9], array[11]]
  console.log(table);
  var cArray = [playerCards, botCards, table];
  return cArray
}

function blinds() {

  if ((roundNo % 2) === 0){
    playerBlind = 1;
    botBlind = 0;
  } else if ((roundNo % 2)!== 0){
    playerBlind = 0;
    botBlind = 1;
  }

  if ((roundNo % 5) === 0) {
    BIG_BLIND += 10;
  }

  roundNo += 1;

  if (botBlind == 1) {
    fill(255);
    ellipse(100, 120, 40, 40);
    fill(150);
    ellipse(100, 120 + CARD_HEIGHT + 20, 40, 40);

    if (botStack >= BIG_BLIND) {
      botStack -= BIG_BLIND;
      pot += BIG_BLIND;
    } else {
      pot += botStack;
      botStack -= botStack;
    }

    if (playerStack >= BIG_BLIND/2){
      playerStack -= BIG_BLIND/2;
      pot += BIG_BLIND/2;
    } else {
      pot += playerStack;
      playerStack -= playerStack;
    }
    console.log(roundNo);
  } else if (playerBlind == 1) {
    fill(150);
    ellipse(100, 120, 40, 40);
    fill(255);
    ellipse(100, 120 + CARD_HEIGHT + 20, 40, 40);

    if (botStack >= BIG_BLIND/2) {
      botStack -= BIG_BLIND/2;
      pot += BIG_BLIND/2;
    } else {
      pot += botStack;
      botStack -= botStack;
    }

    if (playerStack >= BIG_BLIND){
      playerStack -= BIG_BLIND;
      pot += BIG_BLIND;
    } else {
      pot += playerStack;
      playerStack -= playerStack;
    }
    console.log(roundNo);
  }

  fill(200);
  text('Stack: ' + botStack, 30, 83);
  text('Stack: ' + playerStack, 30, CARD_HEIGHT + 103);
  text('Pot:' + pot, 30, CARD_HEIGHT*1.7);

}

function drawCards() {
  fill(255);

  stroke(0);
  if (buttonPresses === 0) {
  // Draw Base for Opponent Cards
    rect(200, 30, CARD_WIDTH/2, CARD_HEIGHT/2, 10);
    rect(120 + CARD_WIDTH/2 + 25, 30, CARD_WIDTH/2, CARD_HEIGHT/2, 10);
    input1.value(0);

  // Draw Base for Your Cards
    rect(200, CARD_HEIGHT + 50, CARD_WIDTH/2, CARD_HEIGHT/2, 10);
    rect(120 + CARD_WIDTH/2 + 25, CARD_HEIGHT + 50, CARD_WIDTH/2, CARD_HEIGHT/2, 10);
    Button3.show();
    Button2.show();
    buttonPresses += 1;
  } else if (buttonPresses == 1) {
    rect(23, CARD_HEIGHT/2 + 40 + 3 , CARD_WIDTH/2, CARD_HEIGHT/2, 10);
    for (i = 0; i < 3; i++){
      rect(i*(CARD_WIDTH/2 + 5)+20, CARD_HEIGHT/2 + 40 , CARD_WIDTH/2, CARD_HEIGHT/2, 10);
      image(riverCards[i], (i*(CARD_WIDTH/2 + 5)+ 20), CARD_HEIGHT/2 + 40, riverCards[i].width/2, riverCards[i].height/2);
    }
    input1.value(0);
    buttonPresses += 1;
  } else if (buttonPresses == 2) {
      rect(3*(CARD_WIDTH/2 + 5) + 20 + 3, CARD_HEIGHT/2 + 40 + 3 , CARD_WIDTH/2, CARD_HEIGHT/2, 10);
      rect(3*(CARD_WIDTH/2 + 5) + 20, CARD_HEIGHT/2 + 40 , CARD_WIDTH/2, CARD_HEIGHT/2, 10);
      image(riverCards[3], (3 * (CARD_WIDTH/2 + 5)+ 20), CARD_HEIGHT/2 + 40, riverCards[3].width/2, riverCards[3].height/2);
      input1.value(0);
      buttonPresses += 1;
  } else if (buttonPresses == 3) {
      rect(4*(CARD_WIDTH/2 + 5) + 20 + 3, CARD_HEIGHT/2 + 40 + 3 , CARD_WIDTH/2, CARD_HEIGHT/2, 10);
      rect(4*(CARD_WIDTH/2 + 5) + 20, CARD_HEIGHT/2 + 40 , CARD_WIDTH/2, CARD_HEIGHT/2, 10);
      image(riverCards[4], (4*(CARD_WIDTH/2 + 5)+20), CARD_HEIGHT/2 + 40, riverCards[4].width/2, riverCards[4].height/2);
      input1.value(0);
      buttonPresses = 0;
      Button1.hide();
      Button4.show();
  }
}

function nextRound(){

  if (playerStack > 0) {
    drawBackground();
    Button1.show();
  } else if (botStack == 0) {
    input1.hide();
    Button5.hide();
    Button4.hide();
    Button3.hide();
    Button2.hide();
    createCanvas(800, 600);
    background(50);
    textSize(30);
    fill(255);
    text('You Win!', width/2 - 50, height/2);
    Button6.show();
  } else {
    input1.hide();
    Button5.hide();
    Button4.hide();
    Button3.hide();
    Button2.hide();
    createCanvas(800, 600);
    background(50);
    textSize(30);
    fill(255);
    text('You Lose!', width/2 - 50, height/2);
    Button6.show();
  }
}

function handValue() {
  var playerHand = playerCards[0] + playerCards[1] + table[0] + table[1] + table[2] + table[3] + table[4];
  var botHand = botCards[0] + botCards[1] + table[0] + table[1] + table[2] + table[3] + table[4];

  var playerHandTally = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , ['Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'Sevens', 'Eights', 'Nines', 'Tens', 'Jacks', 'Queens', 'Kings', 'Aces']];

  var playerHandCounter;

  var handChart = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', 'TS', 'TC', 'TD', 'TH', '10S', 'JC', 'JD', 'JH', 'JS', 'QC', 'QD', 'QH', 'QS', 'KC', 'KD', 'KH', 'KS', 'AC', 'AD', 'AH', 'AS'];

  for (i = 0; i < playerHand.length; i++) {

  }

  console.log("Meme");
  console.log(playerHandCounter);

}

function seeCards(){
  fill(255);
  //Draw Your Cards
  image(playerCardsImg[0], 200, CARD_HEIGHT + 50, playerCardsImg[0].width/2, playerCardsImg[0].height/2);
  rect(120 + CARD_WIDTH/2 + 25, CARD_HEIGHT + 50, CARD_WIDTH/2, CARD_HEIGHT/2, 10);
  image(playerCardsImg[1], 120 + CARD_WIDTH/2 + 25, CARD_HEIGHT + 50, playerCardsImg[1].width/2, playerCardsImg[1].height/2);
  Button3.hide();
}

function showBotCards(){
  fill(255);
  //Draw Opponent Cards
  image(botCardsImg[0], 200, 30, botCardsImg[0].width/2, botCardsImg[0].height/2);
  rect(120 + CARD_WIDTH/2 + 25, 30, CARD_WIDTH/2, CARD_HEIGHT/2, 10);
  image(botCardsImg[1], 120 + CARD_WIDTH/2 + 25, 30, botCardsImg[1].width/2, botCardsImg[1].height/2);
  Button2.hide();
}

function restart() {
  roundNo = 1;
  pot = 0;
  playerStack = 100;
  botStack = 100;
  drawBackground();
}
