import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Gradient from "../partial/Gradient";
import FaceDetection from "./facedetection"; // Import the FaceDetection module
import { FaCameraRetro } from "react-icons/fa";

const Evaluate = () => {
  const videoRef = useRef(null); // Ref for the video element
  const canvasRef = useRef(null); // Ref for the canvas element
  const [isStarted, setIsStarted] = useState(false);
  const [isStraight, setIsStraight] = useState(null); // State for isStraight
  const { loadModels, detectFaces } = FaceDetection(videoRef, canvasRef); // Create an instance of FaceDetection

  const handleNextClick = () => {
    toast.success("Assessment starting...");
    setIsStarted(true);
  };

  useEffect(() => {
    let intervalId; // Declare intervalId to hold the interval reference

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Start detecting faces at intervals (every second)
          intervalId = setInterval(async () => {
            const { isStraight: detectedIsStraight } = await detectFaces(); // Get isStraight from detectFaces
            setIsStraight(detectedIsStraight); // Update the isStraight state
          }, 1000);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    if (isStarted) {
      loadModels().then(startWebcam); // Load models only when the assessment starts
    }

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
      clearInterval(intervalId); // Clear the interval on cleanup
    };
  }, [isStarted, loadModels, detectFaces]); // Run effect only when isStarted changes

  return (
    <main className="flex flex-col flex-grow relative isolate px-6 pt-14 lg:px-8">
      <Gradient />
      <h1 className="text-3xl font-bold mb-4 mt-6">Evaluation Screen</h1>

      <div className="text-lg leading-8 text-gray-600">
        <p>Analyze your performance and receive feedback in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="flex flex-col items-center relative">
          {isStarted ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-lg rounded-lg shadow-lg"
                width={640}
                height={480}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0"
                width={640}
                height={480}
              />
              <p className="mt-4 text-center">Webcam Feed</p>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-60 bg-white border-2 border-dashed border-gray-400 rounded-lg">
              <FaCameraRetro className="text-gray-500 text-4xl" />
              <p className="mt-2 text-gray-500">No webcam feed available</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-900 bg-opacity-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-white">Instructions</h2>
          <p className="mb-4 text-gray-300">Follow these key guidelines:</p>

          {!isStarted && (
            <>
              <ul className="list-disc list-inside text-gray-200 space-y-2">
                <li>Maintain eye contact and use natural hand gestures.</li>
                <li>Show confidence through posture and voice tone.</li>
                <li>Control anxiety and manage nerves professionally.</li>
                <li>Use clear, concise language to express your thoughts.</li>
                <li>Display positive body language and stay engaged.</li>
                <li>Listen actively and respond thoughtfully to questions.</li>
                <li>Adapt quickly to unexpected questions or scenarios.</li>
                <li>Show enthusiasm and energy for the role.</li>
              </ul>
              <button
                onClick={handleNextClick}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
              >
                Next
              </button>
            </>
          )}

          {isStarted && (
            <p className="text-green-500 mt-4">
              The assessment has started. Please wait for further instructions...
            </p>
          )}
        </div>

        <div className="flex flex-col items-center p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Feedback Form</h2>
          {isStarted && isStraight !== null && ( // Show feedback based on isStraight
            <p className={`mt-4 text-${isStraight ? "green" : "red"}-500`}>
              You are{" "}
              {isStraight
                ? "looking straight at the camera."
                : "not looking straight at the camera."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Evaluate;
