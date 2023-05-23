let speech;
let said;
let word = [];
var directionX;

let video;
let poseNet;
let poses = [];

let pkeyHandX, pkeyHandY, keyHandX, keyHandY;
let pkeyHandX1, pkeyHandY1, keyHandX1, keyHandY1;
let img;
function preload() {
  img=loadImage('1.jpg');
}

function setup() {
  createCanvas(640, 360);
  directionX = 1;
  textSize(25);
  speechRec = new p5.SpeechRec("ko-KR", gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      said = speechRec.resultString;
      word = said.split("");
      console.log(said);
    }
  }

  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Ai Activated!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let keypoint = pose.keypoints[9];
    let keypoint1 = pose.keypoints[10];
    if (keypoint.score > 0.2) {
      keyHandX = pkeyHandX;
      keyHandY = pkeyHandY;
      pkeyHandX = keypoint.position.x;
      pkeyHandY = keypoint.position.y;

      // if (keyHandX < keyHandX) {
        if(keyHandX > width/2){
        directionX = -1;
      }
      if(keyHandX < width/2){
      // if (keyHandX >= keyHandX) {
        directionX = 1;
      }
      if (keypoint.score > 0.2) {
        keyHandX1 = pkeyHandX1;
        keyHandY1 = pkeyHandY1;
        pkeyHandX1 = keypoint.position.x;
        pkeyHandY1 = keypoint.position.y;
  
        // if (keyHandX < keyHandX) {
          if(keyHandX1 > width/2){
          directionX = -1;
        }
        if(keyHandX1 < width/2){
        // if (keyHandX >= keyHandX) {
          directionX = 1;
        }
      for (var j = 0; j < word.length; j++) {
        text(word[j], keyHandX + directionX * j * 10, random(keyHandY - 3, keyHandY + 3));
        text(word[j], keyHandX1 + directionX * j * 10, random(keyHandY1 - 3, keyHandY1 + 3));
        console.log(word[j]);
      }}
    }
  }
}