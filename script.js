
let player;
let isPlaying = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');

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
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            player.pauseVideo();
            stopVinyl();
            playPauseButton.textContent = 'Play';
        } else {
            player.playVideo();
            startVinyl();
            playPauseButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });
}

function onPlayerError(event) {
    console.error("Error: " + event.data);
}

function startVinyl() {
    vinyl.style.animation = 'spin 3s linear infinite'; // Adjust speed as needed
    arm.style.transform = 'rotate(-30deg)'; // Adjust arm angle as needed
}

function stopVinyl() {
    vinyl.style.animation = 'none';
    arm.style.transform = 'rotate(0deg)'; // Reset arm angle
}
