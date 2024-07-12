let player;
let isPlaying = false;
const arm = document.getElementById('arm');
const vinyl = document.getElementById('vinyl');
const playPauseButton = document.getElementById('playPauseButton');
const clickSound = document.getElementById('clickSound');

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
        clickSound.play(); // Play the sound effect
        if (isPlaying) {
            player.pauseVideo();
            stopVinyl();
            stopArm();
            playPauseButton.textContent = 'Play';
        } else {
            player.playVideo();
            startVinyl();
            moveArm(); // Move arm onto the vinyl
            playPauseButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });
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
    vinyl.style.animation = 'spin 8s linear infinite'; // Adjust speed as needed
}

function stopVinyl() {
    vinyl.style.animation = 'none';
}
