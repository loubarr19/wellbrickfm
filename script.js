let player;
let isPlaying = false;
let isPlayerReady = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');
const clickSound = document.getElementById('clickSound');
let soundPlayed = false; // New variable to track if sound has been played

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'R6_3OchvW_c', // Your YouTube video ID
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
    playPauseButton.addEventListener('click', handlePlayPause);
}

function handlePlayPause() {
    if (!isPlayerReady) return;

     // Play the click sound only on the first play
    if (!soundPlayed) {
        clickSound.play();
        soundPlayed = true; // Set to true to prevent replaying

         // Lock interaction for 5 seconds
        isLocked = true;
        setTimeout(() => {
            isLocked = false; // Unlock after 5 seconds
        }, 5000); // 5 seconds
    }

    // Play the video or pause based on the current state
    if (isPlaying) {
        player.pauseVideo();
        stopVinyl();
        stopArm();
        playPauseButton.textContent = 'Play';
    } else {
        player.playVideo();
        startVinyl();
        moveArm();
        playPauseButton.textContent = 'Pause';
    }

    isPlaying = !isPlaying;
}

function onPlayerError(event) {
    console.error("Error: " + event.data);
}

function moveArm() {
    arm.classList.add('move'); // Animate the arm to the vinyl
}

function stopArm() {
    arm.classList.remove('move'); // Reset the arm position
}

function startVinyl() {
    vinyl.style.animation = 'spin 3s linear infinite'; // Vinyl spinning
}

function stopVinyl() {
    vinyl.style.animation = 'none';
}

function startEqualizer() {
    animateEqualizer();
}

function stopEqualizer() {
    bars.forEach(bar => bar.style.height = '50px'); // Reset equalizer bars
}

