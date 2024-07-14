let isPlaying = false;
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const vinyl = document.getElementById('vinyl');

document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect("Wellbrick FM presents the Gravy Train", "typewriter1", () => {
        setTimeout(() => {
            typeWriterEffect("Enjoy the ride!", "typewriter2", () => {
                setTimeout(() => {
                    typeWriterEffect("Let's get started!", "typewriter3");
                }, 000);
            });
        }, 2000);
    });
});

playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        vinyl.style.animationPlayState = 'paused'; // Pause spinning
    } else {
        audio.play();
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
