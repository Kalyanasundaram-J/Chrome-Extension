document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function () {
        // This line is used to get the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0]; // Store active tab detail in this variable
            // Create a scripting and execute it in active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: startSpeechRecognition
            });
        });
    });
    
    // Function that handle call speech to text and asign value to input
    function startSpeechRecognition() {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            if(transcript) {
                const chatInput = document.getElementById("prompt-textarea");
                if(chatInput) {
                    chatInput.value = transcript;
                    chatInput.dispatchEvent(new Event('input', { bubbles: true })); // Trigger an 'input' event

                    // Get the button element next to the Input element
                    const sendMessageButton = chatInput.nextElementSibling;
                    if (sendMessageButton && sendMessageButton.tagName === "BUTTON") {
                        sendMessageButton.click();
                    } else {
                        console.error("Unable to find the Send Message button!.");
                    }
                }
                else{console.error("Unable to find input field in this site.")}  
            }
            else {console.warn("There is no content was recognized!. Please try again.")}
        };

        recognition.start();
    }

});
