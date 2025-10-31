// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import * as poseDetection from "@tensorflow-models/pose-detection";
import Webcam from "react-webcam";
import { drawMesh, drawPose } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load models
  const runDetection = async () => {
    try {
      // Initialize TensorFlow.js backend
      await tf.setBackend('webgl');
      await tf.ready();
      
      // Load face mesh model
      const faceNet = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
      
      // Load pose detection model (BlazePose with 33 keypoints using TensorFlow.js runtime)
      const poseNet = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, {
        runtime: 'tfjs',
        modelType: 'full'
      });
      
      setInterval(() => {
        detect(faceNet, poseNet);
      }, 10);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const detect = async (faceNet, poseNet) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await faceNet.estimateFaces({input:video});
      const poses = await poseNet.estimatePoses(video);
      
      console.log("Face:", face);
      console.log("Poses:", poses);

      // Get canvas context and clear canvas
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      
      // Draw face mesh and body pose
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
        drawPose(poses, ctx);
      });
    }
  };

  useEffect(()=>{runDetection()}, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
