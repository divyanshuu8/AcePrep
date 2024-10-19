import Artyom from "artyom.js"; // Import Artyom.js

const useSpeechRecognition = (onResult) => {
  const artyom = new Artyom();

  // Function to start speech recognition
  const startRecognition = () => {
    artyom.fatality(); // Stop any running instances

    setTimeout(() => {
      // Start listening with the Artyom assistant
      artyom.initialize({
        lang: "en-US", // Language
        continuous: true, // Continuous listening
        listen: true, // Start the speech recognition
        debug: true, // Log everything in the console
        speed: 1 // Talk a little bit slow
      }).then(() => {
        console.log("Artyom has started listening...");
      }).catch((error) => {
        console.error("Error initializing Artyom:", error);
      });
    }, 250);
  };

  // Add command listener
  artyom.on(["*"], true).then((recognizedText) => {
    console.log("Recognized text:", recognizedText); // Log recognized text
    onResult(recognizedText); // Call the callback with the recognized text
  });

  // Stop the recognition
  const stopRecognition = () => {
    artyom.fatality(); // Stops all instances of artyom
    console.log("Artyom has stopped listening.");
  };

  return { startRecognition, stopRecognition };
};

export default useSpeechRecognition;
