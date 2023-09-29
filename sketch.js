let capture;
let posenet;
let singlePose, skeleton;
let actor_img;
let specs, smoke;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
    smoke = loadImage('images/cigar.png');
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    // Display video feed
    image(capture, 0, 0);

    if (singlePose) {
        // Iterate through keypoints and draw circles
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            const keypoint = singlePose.keypoints[i];
            if (keypoint.score > 0.2) { // Filter keypoints with low confidence
                fill(255, 0, 0);
                ellipse(keypoint.position.x, keypoint.position.y, 20);
            }
        }

        // Draw skeleton lines
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            const start = skeleton[j][0].position;
            const end = skeleton[j][1].position;
            line(start.x, start.y, end.x, end.y);
        }

        // Display images on specific keypoints (e.g., nose)
        if (singlePose.keypoints[0].score > 0.2) { // Check if nose keypoint is detected
            image(specs, singlePose.keypoints[0].position.x - 35, singlePose.keypoints[0].position.y - 50, 80, 80);
            image(smoke, singlePose.keypoints[0].position.x - 35, singlePose.keypoints[0].position.y + 10, 40, 40);
        }
    }
}

// ... (previous code) ...

function draw() {
    // Display video feed
    image(capture, 0, 0);

    if (singlePose) {
        // ... (previous code) ...
        let capture;
let posenet;
let singlePose, skeleton;
let actor_img;
let specs, smoke;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
    smoke = loadImage('images/cigar.png');
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    // Display video feed
    image(capture, 0, 0);

    if (singlePose) {
        // Iterate through keypoints and draw circles
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            const keypoint = singlePose.keypoints[i];
            if (keypoint.score > 0.2) { // Filter keypoints with low confidence
                fill(255, 0, 0);
                ellipse(keypoint.position.x, keypoint.position.y, 20);
            }
        }

        // Draw skeleton lines
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            const start = skeleton[j][0].position;
            const end = skeleton[j][1].position;
            line(start.x, start.y, end.x, end.y);
        }

        // Display images on specific keypoints (e.g., nose)
        if (singlePose.keypoints[0].score > 0.2) { // Check if nose keypoint is detected
            image(specs, singlePose.keypoints[0].position.x - 35, singlePose.keypoints[0].position.y - 50, 80, 80);
            image(smoke, singlePose.keypoints[0].position.x - 35, singlePose.keypoints[0].position.y + 10, 40, 40);
        }
    }
}

        // Detect slouching based on keypoint positions
        const leftShoulder = singlePose.keypoints[5];
        const rightShoulder = singlePose.keypoints[2];
        const nose = singlePose.keypoints[0];
        const leftHip = singlePose.keypoints[11];
        const rightHip = singlePose.keypoints[12];

        if (leftShoulder && rightShoulder && nose && leftHip && rightHip) {
            const shoulderDistance = dist(leftShoulder.position.x, leftShoulder.position.y, rightShoulder.position.x, rightShoulder.position.y);
            const hipDistance = dist(leftHip.position.x, leftHip.position.y, rightHip.position.x, rightHip.position.y);
            const noseToHipDistance = dist(nose.position.x, nose.position.y, (leftHip.position.x + rightHip.position.x) / 2, (leftHip.position.y + rightHip.position.y) / 2);

            // Calculate the angle formed by the shoulders and hips
            const angle = atan2(shoulderDistance - hipDistance, noseToHipDistance);

            // Define a threshold angle for slouching detection
            const slouchThreshold = radians(20); // You can adjust this value

            // Check if the person is slouching
            if (angle > slouchThreshold) {
                fill(255, 0, 0);
                textSize(24);
                text("Slouching Detected", 20, 50);
            }
        }
    }
}








// let capture;
// let posenet;
// let noseX,noseY;
// let reyeX,reyeY;
// let leyeX,leyeY;
// let singlePose,skeleton;
// let actor_img;
// let specs,smoke;

// function setup() {
//     createCanvas(800, 500);
//     capture = createCapture(VIDEO)
//     capture.hide();

//     posenet = ml5.poseNet(capture, modelLoaded);
//     posenet.on('pose',receivedPoses);

//     actor_img = loadImage('images/shahrukh.png');
//     specs = loadImage('images/spects.png');
//     smoke = loadImage('images/cigar.png');

// }

// function receivedPoses(poses){
//     console.log(poses);

//     if(poses.length > 0){
//         singlePose = poses[0].pose;
//         skeleton = poses[0].skeleton;
//     }
// }

// function modelLoaded() {
//     console.log('Model has loaded');
// }

// function draw() {

//     // images and videos(webcam)
//     image(capture, 0, 0);
//     fill(255,0,0);

//     if(singlePose){
//         for(let i=0; i<singlePose.keypoints.length; i++){
//             ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
//         }
//         stroke(255,255,255);
//         strokeWeight(5);
//         for(let j=0; j<skeleton.length; j++){
//             line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
//         }

//         //image(specs,singlePose.nose.x-35,singlePose.nose.y-50,80,80);
//         //image(smoke,singlePose.nose.x-35,singlePose.nose.y+10,40,40);

        
//     }

    

// }
