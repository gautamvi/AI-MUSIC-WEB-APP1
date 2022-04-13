song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status_song1 = "";
status_song2 = "";
function preload(){
    song2 = loadSound("harry_potter.mp3");
    song1 = loadSound("peter_pan.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('Posenet is initialized');
}

function draw(){
    image(video,0,0,700,600);
    status_song1 = song1.isPlaying("peter_pan.mp3");
    status_song2 = song2.isPlaying("harry_potter.mp3");
    fill("#C3B1E1");
    stroke("#C3B1E1");

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
         if(status_song2 == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Song Name "+"= Harry Potter";
         }
    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(status_song1 == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name "+"= Peter Pan";
        }
    }

}

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+scoreRightWrist+" scoreLeftWrist = "+scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}