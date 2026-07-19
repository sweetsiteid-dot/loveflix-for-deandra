// =========================
// CONFIG
// =========================

const CORRECT_PIN = "1111";

let heartsCollected = 0;
let totalHearts = 5;

let achievements = {
    login: false,
    letter: false,
    quiz: false,
    memory: false,
    hearts: false,
    secret: false
};

let completedAchievements = 0;

// =========================
// LOADING SCREEN
// =========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document
        .getElementById("loadingScreen")
        .classList.add("hidden");

        document
        .getElementById("pinScreen")
        .classList.remove("hidden");

    }, 2500);

});

// =========================
// PIN LOGIN
// =========================

function checkPin(){

    const pinInput =
    document.getElementById("pinInput");

    const error =
    document.getElementById("pinError");

    if(pinInput.value === CORRECT_PIN){

        document
        .getElementById("pinScreen")
        .classList.add("hidden");

        document
        .getElementById("profileScreen")
        .classList.remove("hidden");

        unlockAchievement(
            "login",
            "🏆 First Login"
        );

    }else{

        error.innerHTML =
        "Wrong PIN 😭";

        pinInput.value = "";

    }

}

// =========================
// ENTER LOVEFLIX
// =========================

function enterLoveflix(){

    document
    .getElementById("profileScreen")
    .classList.add("hidden");

    document
    .getElementById("mainApp")
    .classList.remove("hidden");

    const music =
    document.getElementById("bgMusic");

    music.play().catch(() => {});

}

// =========================
// SCROLL HELPER
// =========================

function scrollToSection(id){

    document
    .getElementById(id)
    .scrollIntoView({
        behavior:"smooth"
    });

}

// =========================
// ACHIEVEMENT SYSTEM
// =========================

function unlockAchievement(key, title){

    if(achievements[key]) return;

    achievements[key] = true;

    completedAchievements++;

    showAchievementPopup(title);

    updateAchievementUI();

    updateProgress();

}

function updateAchievementUI(){

    if(achievements.login){

        document
        .getElementById("ach1")
        .classList.add("done");

        document
        .getElementById("ach1")
        .innerHTML =
        "✅ First Login";

    }

    if(achievements.letter){

        document
        .getElementById("ach2")
        .classList.add("done");

        document
        .getElementById("ach2")
        .innerHTML =
        "✅ Read The Letter";

    }

    if(achievements.quiz){

        document
        .getElementById("ach3")
        .classList.add("done");

        document
        .getElementById("ach3")
        .innerHTML =
        "✅ Quiz Master";

    }

    if(achievements.memory){

        document
        .getElementById("ach4")
        .classList.add("done");

        document
        .getElementById("ach4")
        .innerHTML =
        "✅ Memory Hunter";

    }

    if(achievements.hearts){

        document
        .getElementById("ach5")
        .classList.add("done");

        document
        .getElementById("ach5")
        .innerHTML =
        "✅ Hidden Heart Finder";

    }

    if(achievements.secret){

        document
        .getElementById("ach6")
        .classList.add("done");

        document
        .getElementById("ach6")
        .innerHTML =
        "✅ Secret Episode";

    }

}

// =========================
// POPUP
// =========================

function showAchievementPopup(text){

    const popup =
    document.getElementById(
        "achievementPopup"
    );

    popup.innerHTML = text;

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

    }, 2500);

}

// =========================
// PROGRESS BAR
// =========================

function updateProgress(){

    const percent =
    (completedAchievements / 6) * 100;

    document
    .getElementById("seasonProgress")
    .style.width =
    percent + "%";

    document
    .getElementById("progressText")
    .innerHTML =
    completedAchievements +
    " / 6 Achievements Completed";

    if(completedAchievements >= 6){

        document
        .getElementById("seasonBadge")
        .innerHTML =
        "🏆 Season 3 Completed";

        setTimeout(() => {

            document
            .getElementById(
            "seasonUnlocked"
            )
            .classList.remove("hidden");

        }, 1000);

    }

}

// =========================
// LETTER DETECTION
// =========================

window.addEventListener("scroll", () => {

    const letter =
    document.getElementById("letter");

    const position =
    letter.getBoundingClientRect().top;

    if(position < 250){

        unlockAchievement(
            "letter",
            "💌 Read The Letter"
        );

    }

});

// =========================
// HIDDEN HEARTS SYSTEM
// =========================

function collectHeart(element){

    if(element.classList.contains("found"))
    return;

    element.classList.add("found");

    element.style.opacity = "0.3";
    element.style.pointerEvents = "none";

    heartsCollected++;

    createConfetti();

    if(heartsCollected >= totalHearts){

        unlockAchievement(
            "hearts",
            "❤️ Hidden Heart Finder"
        );

        const unlockBtn =
        document.getElementById(
            "unlockBtn"
        );

        unlockBtn.disabled = false;

        unlockBtn.classList.add("active");

        unlockBtn.innerHTML =
        "Unlock Episode ❤️";

    }

}

// =========================
// SECRET EPISODE
// =========================

window.addEventListener("DOMContentLoaded", () => {

    const unlockBtn =
    document.getElementById("unlockBtn");

    if(unlockBtn){

        unlockBtn.addEventListener(
        "click",
        () => {

            document
            .getElementById("secretContent")
            .classList.remove("hidden");

            unlockAchievement(
                "secret",
                "🎁 Secret Episode"
            );

            createConfetti();

            document
            .getElementById("secretEpisode")
            .scrollIntoView({
                behavior:"smooth"
            });

        });

    }

});

// =========================
// QUIZ SYSTEM
// =========================

function correctAnswer(){

    const result =
    document.getElementById(
        "quizResult"
    );

    result.innerHTML =
    "Correct ❤️";

    result.style.color =
    "#4ade80";

    unlockAchievement(
        "quiz",
        "❓ Quiz Master"
    );

    createConfetti();

}

function wrongAnswer(){

    const result =
    document.getElementById(
        "quizResult"
    );

    result.innerHTML =
    "Try Again 😭";

    result.style.color =
    "#ff4d4d";

}

// =========================
// CONFETTI EFFECT
// =========================

function createConfetti(){

    const container =
    document.getElementById(
        "confettiContainer"
    );

    const icons = [
        "🎉",
        "❤️",
        "✨",
        "🎊",
        "💖"
    ];

    for(let i = 0; i < 30; i++){

        const confetti =
        document.createElement("span");

        confetti.classList.add(
            "confetti"
        );

        confetti.innerHTML =
        icons[
            Math.floor(
                Math.random() *
                icons.length
            )
        ];

        confetti.style.left =
        Math.random() * 100 + "%";

        confetti.style.animationDuration =
        (Math.random() * 2 + 2)
        + "s";

        container.appendChild(
            confetti
        );

        setTimeout(() => {

            confetti.remove();

        }, 4000);

    }

}

// =========================
// RENEW SEASON
// =========================

function renewSeason(){

    document
    .getElementById(
        "renewMessage"
    )
    .innerHTML =
    "Season 4 Coming Soon... ❤️";

    createConfetti();

}

// =========================
// CLOSE COMPLETED POPUP
// =========================

function closeSeasonUnlocked(){

    document
    .getElementById(
        "seasonUnlocked"
    )
    .classList.add("hidden");

}

// =========================
// AUTO PLAY CONFETTI
// =========================

setTimeout(() => {

    createConfetti();

}, 5000);

// =========================
// MEMORY MATCH GAME
// =========================

const memoryCards =
document.querySelectorAll(
".memory-card"
);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

memoryCards.forEach(card => {

    card.addEventListener(
    "click",
    flipCard
    );

});

function flipCard(){

    if(lockBoard) return;

    if(this === firstCard)
    return;

    this.classList.add("flip");

    if(!firstCard){

        firstCard = this;
        return;

    }

    secondCard = this;

    checkMatch();

}

function checkMatch(){

    const isMatch =
    firstCard.dataset.card ===
    secondCard.dataset.card;

    if(isMatch){

        disableCards();

    }else{

        unflipCards();

    }

}

function disableCards(){

    firstCard.removeEventListener(
        "click",
        flipCard
    );

    secondCard.removeEventListener(
        "click",
        flipCard
    );

    matchedPairs++;

    resetBoard();

    if(matchedPairs >= 6){

        document
        .getElementById(
            "memoryResult"
        )
        .innerHTML =
        "🏆 Memory Master Unlocked ❤️";

        unlockAchievement(
            "memory",
            "🧩 Memory Hunter"
        );

        createConfetti();

    }

}

function unflipCards(){

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove(
            "flip"
        );

        secondCard.classList.remove(
            "flip"
        );

        resetBoard();

    }, 900);

}

function resetBoard(){

    [firstCard, secondCard] =
    [null, null];

    lockBoard = false;

}

// =========================
// SHUFFLE MEMORY CARDS
// =========================

(function shuffleCards(){

    memoryCards.forEach(card => {

        let randomPos =
        Math.floor(
            Math.random() * 12
        );

        card.style.order =
        randomPos;

    });

})();

// =========================
// NETFLIX ENTRANCE EFFECT
// =========================

document.addEventListener(
"DOMContentLoaded",
() => {

    const sections =
    document.querySelectorAll(
    ".section"
    );

    const observer =
    new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                "translateY(0)";

            }

        });

    },{
        threshold:0.15
    });

    sections.forEach(section => {

        section.style.opacity = "0";
        section.style.transform =
        "translateY(50px)";
        section.style.transition =
        ".8s ease";

        observer.observe(section);

    });

});

// =========================
// HERO BUTTON EFFECT
// =========================

const playButton =
document.querySelector(
".play-btn"
);

if(playButton){

    playButton.addEventListener(
    "click",
    () => {

        createConfetti();

        document
        .getElementById(
            "continue"
        )
        .scrollIntoView({
            behavior:"smooth"
        });

    });

}

// =========================
// AUTO SEASON BADGE
// =========================

setInterval(() => {

    if(completedAchievements >= 6){

        document
        .getElementById(
            "seasonBadge"
        )
        .innerHTML =
        "🏆 Season 3 Completed ❤️";

    }

}, 1000);

// =========================
// FLOATING TITLE EFFECT
// =========================

const heroTitle =
document.querySelector(
".hero-content h1"
);

if(heroTitle){

    setInterval(() => {

        heroTitle.style.transform =
        "translateY(-3px)";

        setTimeout(() => {

            heroTitle.style.transform =
            "translateY(0)";

        }, 600);

    }, 2000);

}

// =========================
// END
// LOVEFLIX MENSIVE V1
// =========================
