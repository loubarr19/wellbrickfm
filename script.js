let isPlaying = false;
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'R6_3OchvW_c',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Initial play/pause button setup
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
        playPauseBtn.textContent = 'Play';
        vinyl.style.animationPlayState = 'paused'; // Pause spinning
    } else {
        player.playVideo();
        playPauseBtn.textContent = 'Pause';
        vinyl.style.animationPlayState = 'running'; // Resume spinning
    }
    isPlaying = !isPlaying;
}

function typeWriterEffect(text, elementId, callback) {
    const element = document.getElementById(elementId);
    let i = 0;
    const speed = 100; // Delay in milliseconds between each letter

    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else if (callback) {
            callback();
        }
    }

    typeWriter();
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect("Wellbrick FM presents the Gravy Train", "typewriter1", () => {
        setTimeout(() => {
            typeWriterEffect("Enjoy the ride!", "typewriter2", () => {
                setTimeout(() => {
                    typeWriterEffect("Let's get started!", "typewriter3");
                }, 500);
            });
        }, 1000);
    });
});
