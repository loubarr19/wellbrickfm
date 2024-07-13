let player;
let isPlaying = false;
let isPlayerReady = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');
const clickSound = document.getElementById('clickSound');
const equalizer = document.getElementById('equalizer');
const bars = document.querySelectorAll('.bar');

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

    // Play the click sound
    clickSound.play();

    // Play the video or pause based on the current state
    if (isPlaying) {
        player.pauseVideo();
        stopVinyl();
        stopArm();
        stopEqualizer();
        playPauseButton.textContent = 'Play';
    } else {
        player.playVideo();
        startVinyl();
        moveArm();
        startEqualizer();
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

