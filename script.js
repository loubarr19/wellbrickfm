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
    const vinyl = document.getElementById('vinyl');
    const liveBox = document.getElementById('liveBox');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (isPlaying) {
        player.pauseVideo();
        playPauseBtn.textContent = 'Play';
        vinyl.style.animationPlayState = 'paused'; // Pause spinning
        liveBox.style.display = 'none'; // Hide LIVE box
    } else {
        player.playVideo();
        playPauseBtn.textContent = 'Pause';
        vinyl.style.animationPlayState = 'running'; // Resume spinning
        liveBox.style.display = 'block'; // Show LIVE box
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
    typeWriterEffect("Welcome to Wellbrick FM", "typewriter1", () => {
        setTimeout(() => {
            typeWriterEffect("Your 24/7 gravy train", "typewriter2", () => {
                setTimeout(() => {
                    typeWriterEffect("By Mark and Louis", "typewriter3");
                }, 2000);
            });
        }, 1000);
    });
});
