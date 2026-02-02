document.addEventListener("DOMContentLoaded", () => {
    /* Initializes the necessary DOM elements and state variables required for the animation loop.
    This section fetches button references, sets up coordinate trackers for the physics engine,
    and defines the collection of phrases used for the dynamic text feedback.
    It also initializes the state flags that determine when the button should detach from the layout.
    */
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const questionBox = document.getElementById("question-box");
    const successBox = document.getElementById("success-box");

    let mouseX = 0;
    let mouseY = 0;
    let btnX = 0;
    let btnY = 0;
    let velX = 0;
    let velY = 0;
    let isFloating = false;

    const recentPhrases = [];
    let lastPhraseTime = 0;

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

    /* Establishes event listeners to handle user interactions.
    The 'yes' button listener transitions the UI to the success state upon activation.
    Global mouse movement is tracked continuously to update the coordinates used by the repulsion logic,
    ensuring the physics engine always has the latest cursor position.
    */
    btnYes.addEventListener("click", () => {
        questionBox.classList.add("hidden");
        successBox.classList.remove("hidden");
    });

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* Manages the creation and lifecycle of floating text elements.
    This function handles the selection of non-repeating phrases, positions the element based on the button's current location,
    and handles the cleanup of DOM nodes after their animation completes. 
    A cooldown timer is implemented here to prevent excessive DOM updates during rapid movement.
    */
    const spawnPhrase = () => {
        const now = Date.now();
        if (now - lastPhraseTime < 500) return;
        lastPhraseTime = now;

        const rect = btnNo.getBoundingClientRect();
        
        const availablePhrases = phrases.filter(p => !recentPhrases.includes(p));
        const randomPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];

        recentPhrases.push(randomPhrase);
        if (recentPhrases.length > 4) recentPhrases.shift();

        const text = document.createElement("span");
        text.innerText = randomPhrase;
        text.classList.add("shoo-text");
        text.style.left = `${rect.left}px`;
        text.style.top = `${rect.top}px`;
        document.body.appendChild(text);

        setTimeout(() => text.remove(), 1000);
    };

    /* Executes the main physics calculation loop for the button's movement.
    This routine calculates the vector distance between the cursor and the button to determine repulsion force.
    It applies velocity, friction, and boundary constraints to ensure smooth movement within the viewport,
    updating the DOM position only when the "floating" state is active to avoid layout thrashing.
    */
    const updatePhysics = () => {
        const rect = btnNo.getBoundingClientRect();
        const btnWidth = rect.width;
        const btnHeight = rect.height;

        if (!isFloating) {
            btnX = rect.left;
            btnY = rect.top;
        }

        const centerX = btnX + btnWidth / 2;
        const centerY = btnY + btnHeight / 2;

        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const activationRadius = 200;
        
        if (distance < activationRadius) {
            if (!isFloating) {
                isFloating = true;
                btnNo.style.position = "fixed";
                btnNo.style.width = `${btnWidth}px`;
                btnNo.style.height = `${btnHeight}px`;
            }

            const force = (activationRadius - distance) / activationRadius;
            const angle = Math.atan2(dy, dx);
            
            const speed = force * 15;
            velX += Math.cos(angle) * speed;
            velY += Math.sin(angle) * speed;

            if (distance < 80) spawnPhrase();
        }

        velX *= 0.9;
        velY *= 0.9;

        btnX += velX;
        btnY += velY;

        const padding = 20;
        if (btnX < padding) { btnX = padding; velX *= -0.5; }
        if (btnY < padding) { btnY = padding; velY *= -0.5; }
        if (btnX + btnWidth > window.innerWidth - padding) { 
            btnX = window.innerWidth - btnWidth - padding; 
            velX *= -0.5; 
        }
        if (btnY + btnHeight > window.innerHeight - padding) { 
            btnY = window.innerHeight - btnHeight - padding; 
            velY *= -0.5; 
        }

        if (isFloating) {
            btnNo.style.left = `${btnX}px`;
            btnNo.style.top = `${btnY}px`;
        }

        requestAnimationFrame(updatePhysics);
    };

    requestAnimationFrame(updatePhysics);
});