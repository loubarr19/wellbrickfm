let player;
let isPlaying = false;
let isPlayerReady = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');
const clickSound = document.getElementById('clickSound');
let soundPlayed = false;
let isLocked = false; // Interaction lock
const volumeSlider = document.getElementById('volumeSlider');

function logMessage(message) {
    const logDiv = document.getElementById('log');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    logDiv.appendChild(newMessage);
    logDiv.scrollTop = logDiv.scrollHeight; // Auto scroll to bottom
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100',
        width: '100',
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
    volumeSlider.addEventListener('input', handleVolumeChange);
}

function handlePlayPause() {
    if (!isPlayerReady || isLocked) return;

    if (!soundPlayed) {
        clickSound.play().then(() => {
            clickSound.onended = () => {
                setTimeout(startVideoPlayback, 4000);
            };
        }).catch(error => {
            alert("Playback failed: " + error.message);
        });

        soundPlayed = true;
        isLocked = true;
        setTimeout(() => {
            isLocked = false;
        }, 4000);
    } else {
        startVideoPlayback();
    }
}

function startVideoPlayback() {
    alert("Attempting to start video playback...");
    logMessage("Attempting to start video playback...");

    if (isPlaying) {
        player.pauseVideo();
        stopVinyl();
        stopArm();
        playPauseButton.textContent = 'Play';
        alert("Paused video playback.");
        logMessage("Paused video playback.");
    } else {
        player.playVideo().then(() => {
            alert("Video playback started.");
            logMessage("Video playback started.");
        }).catch(err => {
            alert("Video playback failed: " + err);
            logMessage("Video playback failed: " + err);
        });
        startVinyl();
        moveArm();
        playPauseButton.textContent = 'Pause';
    }

    isPlaying = !isPlaying; // Toggle playing state
}

function handleVolumeChange() {
    if (isPlayerReady) {
        const volume = volumeSlider.value;
        player.setVolume(volume);
        logMessage("Volume set to: " + volume);
    }
}

function onPlayerError(event) {
    console.error("Error: " + event.data);
    logMessage("Error: " + event.data);
}

function moveArm() {
    arm.classList.add('move');
}

function stopArm() {
    arm.classList.remove('move');
}

function startVinyl() {
    vinyl.style.animation = 'spin 7s linear infinite';
}

function stopVinyl() {
    vinyl.style.animation = 'none';
}
