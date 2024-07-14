let player;
let isPlaying = false;
let firstPlay = true;

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
    // Automatically start playing the intro audio when the page loads
    playIntroAudio();
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

function playIntroAudio() {
    const introAudio = document.getElementById('introAudio');
    const playPromise = introAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Audio playback started
        }).catch(error => {
            // Auto-play was prevented
            alert("Intro audio auto-play was prevented:", error);
        });
    introAudio.addEventListener('ended', () => {
        firstPlay = false;
    });
}
