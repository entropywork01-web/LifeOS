export function useSpeechRecognition(setMessage, sendMessage) {
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setMessage(transcript);

      setTimeout(() => {
        sendMessage(transcript);
      }, 200);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      alert(`Speech Recognition Error: ${event.error}`);
    };
  }

  return { startListening };
}