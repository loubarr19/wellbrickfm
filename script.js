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

// Add canplaythrough event listener
clickSound.addEventListener('canplaythrough', () => {
    alert("Click sound is ready to play.");
});

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
    volumeSlider.addEventListener('input', handleVolumeChange);
}

function handlePlayPause() {
    if (!isPlayerReady || isLocked) return;

    if (!soundPlayed) {
        clickSound.play().then(() => {
            startVideoPlayback();
        }).catch(error => {
            alert("Playback failed: " + error.message);
        });

        soundPlayed = true;

        // Lock interaction for 4 seconds
        isLocked = true;
        setTimeout(() => {
            isLocked = false; // Unlock after 4 seconds
        }, 4000);
    } else {
        startVideoPlayback(); // Only if the sound has already played
    }
}

function startVideoPlayback() {
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
    
    isPlaying = !isPlaying; // Toggle playing state
}

function handleVolumeChange() {
    if (isPlayerReady) {
        const volume = volumeSlider.value; // Get volume as percentage
        player.setVolume(volume); // Set YouTube player volume (0-100)
    }
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

