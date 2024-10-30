// main.js

// Get references to the DOM elements
const textInput = document.querySelector('textarea'); // Select the textarea for text input
const voiceSelect = document.querySelector('select'); // Select the dropdown for voices
const convertButton = document.querySelector('button'); // Select the button to convert text to speech

let voices = [];

// Function to populate the voice options
const populateVoiceList = () => {
    voices = speechSynthesis.getVoices(); // Get the list of available voices

    // Clear existing options in the select element
    voiceSelect.innerHTML = '';

    // Check if voices are loaded
    if (voices.length === 0) {
        console.warn('No voices found. Please check your browser settings.');
        return;
    }

    // Populate the select dropdown with voice options
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name; // Use voice name for better identification
        option.textContent = `${voice.name} (${voice.lang})`; // Show voice name and language
        voiceSelect.appendChild(option); // Add option to the dropdown
    });
};

// Function to handle voice loading
const loadVoices = () => {
    // Populate voices initially
    populateVoiceList();

    // Check for voice change event
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList; // Populate voices when available
    } else {
        // If no voices are loaded, set a timeout to try again
        setTimeout(populateVoiceList, 1000); // Retry after 1 second
    }
};

// Function to convert text to speech
const convertToSpeech = (e) => {
    e.preventDefault(); // Prevent the form from submitting

    const text = textInput.value.trim(); // Get the entered text and trim whitespace
    const selectedVoiceName = voiceSelect.value; // Get the selected voice name

    // Alert if no text is entered
    if (text === '') {
        alert('Please enter some text to convert to speech.');
        return;
    }

    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(text);
    // Set the selected voice
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

    if (selectedVoice) {
        utterance.voice = selectedVoice; // Assign selected voice to the utterance
    } else {
        alert('Selected voice is not available.'); // Alert if voice is not found
        return;
    }

    // Speak the text
    speechSynthesis.speak(utterance);
};

// Add event listener to the convert button
convertButton.addEventListener('click', convertToSpeech);

// Load voices when the page is loaded
loadVoices();
