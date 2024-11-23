import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBRevo25FC46soCMAcAAakPGfH4eJG1aac");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const input = document.getElementById("inp");
const generateBtn = document.getElementById("btn");
const stopBtn = document.getElementById("btn1");
const mic = document.getElementById("micBtn");

async function callServer(prompt) {
   
    const shortPrompt = `Please provide a detailed answer (around 10-15 sentences) to the following question: ${prompt}`;

    try {
        const result = await model.generateContent(shortPrompt);

        const generatedText = result.response.text().replace(/\*/g, " ");
        document.getElementById("data").innerHTML = generatedText;

        const speech = new SpeechSynthesisUtterance(generatedText);
        window.speechSynthesis.speak(speech);
    } catch (error) {
        console.error("Error generating content:", error);
        document.getElementById("data").innerHTML = "An error occurred while generating content.";
    }
}

function handleMicInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        callServer(transcript);
    };    
        
    recognition.onerror = function(event) {
        console.error("Error occurred during recognition:", event.error);
    };
}

function handleTextInput() {
    const prompt = input.value;
    callServer(prompt);
}

generateBtn.onclick = handleTextInput;
mic.onclick = handleMicInput;

stopBtn.onclick = function() {
    window.speechSynthesis.cancel();
};
