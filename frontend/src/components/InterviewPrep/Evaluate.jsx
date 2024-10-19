// src/components/Evaluate.js
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Gradient from "../partial/Gradient";

const Evaluate = () => {
  const videoRef = useRef(null); // Ref for the video element
  const [isStarted, setIsStarted] = useState(false);

  const handleNextClick = () => {
    toast.success("Assessment starting..."); // Triggering toast notification

    setIsStarted(true);

    // Example: Replace this with your actual WebSocket or API call
    fetch("http://localhost:5000/api/start-assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Process server messages (update state, UI, etc.)
        console.log("Message from server:", data);
      })
      .catch((error) => console.error("Error receiving messages:", error));
  };

  useEffect(() => {
    // Function to start the webcam
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set the video source to the webcam stream
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam(); // Start the webcam when the component mounts

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop()); // Stop all tracks when unmounting
        }
      }
    };
  }, []);

  return (
    <main className="flex flex-col flex-grow relative isolate px-6 pt-14 lg:px-8">
      <Gradient />
      <h1 className="text-3xl font-bold mb-4 mt-6">Evaluation Screen</h1>

      <div className="text-lg leading-8 text-gray-600">
        <p>Analyze your performance and receive feedback in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {" "}
        {/* Grid layout for columns */}
        {/* First Column: Video */}
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-lg rounded-lg shadow-lg" // Add styling for the video
          />
          <p className="mt-4 text-center">Webcam Feed</p>
        </div>
        {/* Second Column: Animation Instructions */}
        <div className="flex flex-col items-center p-4 bg-gray-900 bg-opacity-100 rounded-lg shadow-md">
          {/* Translucent dark background */}
          <h2 className="text-xl font-semibold mb-2 text-white">
            Instructions
          </h2>
          <p className="mb-4 text-gray-300">Follow these key guidelines:</p>

          {/* Conditionally render the list and button */}
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

          {/* You can add other content here that will display after the button is clicked */}
          {isStarted && (
            <p className="text-green-500 mt-4">
              The assessment has started. Please wait for further
              instructions...
            </p>
          )}
        </div>
        {/* Third Column: Feedback Form */}
        <div className="flex flex-col items-center p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
          {" "}
          {/* Translucent background */}
          <h2 className="text-xl font-semibold mb-2">Feedback Form</h2>
        </div>
      </div>
    </main>
  );
};

export default Evaluate;
