// Special credit goes to: The Coding Train / Daniel Shiffman
var picbutton;
// Make the video
let video;
// For displaying the label
let label = "Loading, please wait...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/69ZmzOwlh/';

// STEP 1: Load the model using the ML5 library!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
  createCanvas(650, 650);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  
  //Make and style the picture taking button
  picbutton = createButton("Take a Picture");
  picbutton.position(10, 500);
  picbutton.size(120, 100);
  picbutton.style('background-color: #6bffff');
  picbutton.style('color: #9900ff');
  picbutton.style('font-family: Cookie');
  picbutton.style('text-shadow: 1px 1px 1px');
  picbutton.style('font-size: 45px');
  picbutton.style('border-radius: 10px');
}

function draw() {
  background(0);
  //Program our button to take a picture when clicked
  picbutton.mousePressed(
    takePic
  )
  picbutton.mousePressed(
    classifyVideo
  )
  
  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  let emoji = "";
  if (label == "Fresh Apple") {
    emoji = "🍎";
  } else if (label == "Fresh Orange") {
    emoji = "🍊";
  } else if (label == "Fresh Banana") {
    emoji = "🍌";
  } else if (label == "Rotten Apple") {
    emoji = "🍏";
  } else if (label == "Rotten Orange") {
    emoji = "🔵";
  } else if (label == "Rotten Banana") {
    emoji = "🌙";
  }

  // Draw the emoji
  textSize(100);
  text(emoji, width / 2, height / 2);
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // In case something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  //classifyVideo();
}

//Make the function to take a picture
function takePic() {
  // Draw the video
  image(video, 0, 0);
}
