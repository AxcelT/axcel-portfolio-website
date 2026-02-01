document.addEventListener("DOMContentLoaded", () => {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const questionBox = document.getElementById("question-box");
    const successBox = document.getElementById("success-box");

    // Swaps the question view for the success view upon acceptance
    btnYes.addEventListener("click", () => {
        questionBox.classList.add("hidden");
        successBox.classList.remove("hidden");
    });

    // Relocates the button to a random position on hover or touch
    // Prevents the user from easily clicking the negative option
    const moveButton = () => {
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
        
        btnNo.style.position = "absolute";
        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;
    };

    btnNo.addEventListener("mouseover", moveButton);
    btnNo.addEventListener("touchstart", moveButton);
});