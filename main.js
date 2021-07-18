song = "";
wristrightX = 0;
songleftwrist = 0;
wristrightY = 0;

wristleftX = 0;

wristleftY = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
video = createCapture(VIDEO);
video.hide();
posenet = ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}


function  modelLoaded(){
    console.log("PoseNet is intialized");
}

function draw(){
    image(video,0,0,600,500);
    fill("red")
    stroke("blue")

    if (songleftwrist > 0.2){
        circle(wristleftX,wristleftY,30);
        numberwrist = Number(wristleftY);
remove_decimals = floor(numberwrist);
volume = remove_decimals/500;
document.getElementById("vol").innerHTML = "Volume ="+volume   ;
song.setVolume(volume)     
    }

    if (scorewristRight > 0.2){
        circle(wristrightX,wristrightY,20)
if (wristrightY >0 && wristrightY<=100){
document.getElementById("speed").innerHTML = "Speed = 0.5x";
song.rate(0.5);
}
else if (wristrightY >100 && wristrightY<=200){
    document.getElementById("speed").innerHTML = "Speed = 1x";
    song.rate(1);
    }
    else if (wristrightY >200 && wristrightY<=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
        }
        else if (wristrightY >300 && wristrightY<=400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
            }
            else if (wristrightY>400){
                document.getElementById("speed").innerHTML = "Speed = 2.5x";
                song.rate(2.5);
                }
    }
}

function gotPoses(results){
if (results.length > 0){
    console.log(results);
    scorewristRight = results[0].pose.keypoints[10].score;
    console.log(scorewristRight);
    songleftwrist = results[0].pose.keypoints[0].score;
    console.log("songleftwrist ="+songleftwrist);

wristrightX = results[0].pose.rightWrist.x;
wristrightY = results[0].pose.rightWrist.y;
wristleftX = results[0].pose.leftWrist.x;
wristleftY = results[0].pose.leftWrist.y;

console.log("Right wrist X = "+wristrightX+" Left Wrist X ="+wristleftX+" Right Wrist Y"+wristrightY+"Left Wrist Y"+wristleftY);

}

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}
