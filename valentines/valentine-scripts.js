document.addEventListener("DOMContentLoaded", () => {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const questionBox = document.getElementById("question-box");
    const successBox = document.getElementById("success-box");

    // Tracks the last few phrases to avoid immediate repetition
    const recentPhrases = [];
    
    // Defines the pool of phrases to display
    const phrases = [
        "shoooo shoooo", 
        "waaaa nuuuuu", 
        "staaaaahpp", 
        "meee loaaaf stop joking", 
        "nuuuuuu shoooo shoooo", 
        "hmpf", 
        "kadate mo ba si purple?", 
        "may ka data kang opps? hmpf!"
    ];

    // Swaps the question view for the success view upon acceptance
    btnYes.addEventListener("click", () => {
        questionBox.classList.add("hidden");
        successBox.classList.remove("hidden");
    });

    // Relocates the button to a random position on hover or touch
    // Prevents the user from easily clicking the negative option
    const moveButton = () => {
        const rect = btnNo.getBoundingClientRect();

        // Filters out phrases that were shown recently
        const availablePhrases = phrases.filter(p => !recentPhrases.includes(p));

        // Selects a random phrase from the available options
        const randomPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];

        // Updates the history queue
        recentPhrases.push(randomPhrase);
        if (recentPhrases.length > 4) {
            recentPhrases.shift();
        }

        // Creates and positions the text element
        const text = document.createElement("span");
        text.innerText = randomPhrase;
        text.classList.add("shoo-text");
        text.style.left = `${rect.left}px`;
        text.style.top = `${rect.top}px`;
        
        document.body.appendChild(text);

        // Cleans up the DOM element after animation
        setTimeout(() => text.remove(), 1000);

        // Calculates new random coordinates within the viewport
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
        
        btnNo.style.position = "fixed";
        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;
    };

    btnNo.addEventListener("mouseover", moveButton);
    btnNo.addEventListener("touchstart", moveButton);
});