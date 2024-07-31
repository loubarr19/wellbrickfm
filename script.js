let isPlaying = false;
let player;
const body = document.body;
let rotation = 0; // Keep track of the rotation
const vinyl = document.getElementById('vinyl');
const liveBox = document.getElementById('liveBox');
const playPauseBtn = document.getElementById('playPauseBtn');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '1',
        width: '1',
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
        body.classList.remove('fade');
        player.pauseVideo();
        clearInterval(vinyl.spinInterval); // Stop spinning
        liveBox.style.display = 'none'; // Hide LIVE box
    } else {
        body.classList.add('fade');
        player.playVideo();
        vinyl.spinInterval = setInterval(() => {
            rotation += 1;
            vinyl.style.transform = `rotate(${rotation}deg)`;
        }, 10); // Spin every 10ms
        liveBox.style.display = 'block'; // Show LIVE box
    }
}

// function togglePlayPause() {
       body.classList.remove('fade');
//     const vinyl = document.getElementById('vinyl');
//     const liveBox = document.getElementById('liveBox');
//     const playPauseBtn = document.getElementById('playPauseBtn');

//     if (isPlaying) {
//         body.classList.remove('fade');
//         player.pauseVideo();
//         playPauseBtn.textContent = 'Play';
//         clearInterval(vinyl.spinInterval); // Stop spinning
//         liveBox.style.display = 'none'; // Hide LIVE box
//     } else {
//         body.classList.add('fade');
//         player.playVideo();
//         playPauseBtn.textContent = 'Pause';
//         vinyl.spinInterval = setInterval(() => {
//             rotation += 1;
//             vinyl.style.transform = `rotate(${rotation}deg)`;
//         }, 10); // Spin every 10ms
//         liveBox.style.display = 'block'; // Show LIVE box
//     }
//     isPlaying = !isPlaying;
// }

document.addEventListener('DOMContentLoaded', () => {
    // Ensure YouTube API is loaded before initializing the player
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Add a user interaction event listener to start the player on user interaction
    document.getElementById('playPauseBtn').addEventListener('click', () => {
        if (player && player.playVideo) {
            player.playVideo(); // Ensure playVideo is called once the player is ready
        }
    });

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

    typeWriterEffect("Welcome to Wellbrick FM", "typewriter1", () => {
        setTimeout(() => {
            typeWriterEffect("Your 24/7 groove station", "typewriter2", () => {
                setTimeout(() => {
                    typeWriterEffect("Hosted by Mark and Lou.", "typewriter3");
                }, 500);
            });
        }, 500);
    });
});
