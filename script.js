let player;
let isPlaying = false;

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
    loadYouTubeAPI();
});

function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'R6_3OchvW_c',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        document.getElementById('playPauseBtn').textContent = 'Pause';
        isPlaying = true;
    } else {
        document.getElementById('playPauseBtn').textContent = 'Play';
        isPlaying = false;
    }
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
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
