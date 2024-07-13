let player;
let isPlaying = false;
let isPlayerReady = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');
const clickSound = document.getElementById('clickSound');
const equalizer = document.getElementById('equalizer');
const bars = document.querySelectorAll('.bar');
let audioContext, analyser, source, frequencyData;

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
    initializeAudioContext();
}

function handlePlayPause() {
    if (!isPlayerReady) return; // If the player is not ready, do nothing
    clickSound.play(); // Play the sound effect
    if (isPlaying) {
        player.pauseVideo();
        stopVinyl();
        stopArm();
        stopEqualizer();
        playPauseButton.textContent = 'Play';
    } else {
        player.playVideo();
        startVinyl();
        moveArm(); // Move arm onto the vinyl
        startEqualizer();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function onPlayerError(event) {
    console.error("Error: " + event.data);
}

function moveArm() {
    arm.classList.add('move'); // Add the move class to animate the arm
}

function stopArm() {
    arm.classList.remove('move'); // Remove the move class to reset
}

function startVinyl() {
    vinyl.style.animation = 'spin 3s linear infinite'; // Adjust speed as needed
}

function stopVinyl() {
    vinyl.style.animation = 'none';
}

function initializeAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
}

function startEqualizer() {
    if (player.getIframe()) {
        source = audioContext.createMediaElementSource(player.getIframe());
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        animateEqualizer();
    }
}

function stopEqualizer() {
    cancelAnimationFrame(animationId);
    bars.forEach(bar => bar.style.height = '50px'); // Reset bars height
}

let animationId;
function animateEqualizer() {
    analyser.getByteFrequencyData(frequencyData);
    bars.forEach((bar, index) => {
        const barHeight = frequencyData[index] / 2; // Scale the bar height
        bar.style.height = `${barHeight}px`;
    });
    animationId = requestAnimationFrame(animateEqual
