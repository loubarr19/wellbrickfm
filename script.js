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
        if (firstPlay) {
            playIntroAudioAndVideo();
        } else {
            player.playVideo();
        }
    }
}

function playIntroAudioAndVideo() {
    const introAudio = document.getElementById('introAudio');
    introAudio.play();
    player.setVolume(0);
    player.playVideo();
    setTimeout(() => {
        player.setVolume(100);
    }, 4000);
    firstPlay = false;
}
