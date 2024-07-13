let player;
let isPlaying = false;
let isPlayerReady = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');
const clickSound = document.getElementById('clickSound');
let soundPlayed = false;
let isLocked = false;
const volumeSlider = document.getElementById('volumeSlider');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'R6_3OchvW_c',
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
    playPauseButton.addEventListener('click', handlePlayPause);
    volumeSlider.addEventListener('input', handleVolumeChange); // Add event listener for volume control
}

function handlePlayPause() {
    if (!isPlayerReady || isLocked) return;

    if (!soundPlayed) {
        clickSound.play();
        soundPlayed = true;
        isLocked = true;
        setTimeout(() => {
            isLocked = false;
        }, 4000);
    }

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

function handleVolumeChange() {
    const volume = volumeSlider.value / 100; // Get volume between 0 and 1
    player.setVolume(volume * 100); // YouTube API requires volume as a percentage
}

function onPlayerError(event) {
    console.error("Error: " + event.data);
}

function moveArm() {
    arm.classList.add('move');
}

function stopArm() {
    arm.classList.remove('move');
}

function startVinyl() {
    vinyl.style.animation = 'spin 3s linear infinite';
}

function stopVinyl() {
    vinyl.style.animation = 'none';
}

