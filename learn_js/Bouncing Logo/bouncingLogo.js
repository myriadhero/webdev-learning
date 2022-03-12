// i made fixed aspect ratio 1080p, logo is 20% wide and 9% tall
// frame rate 60fps
// speed ~4 sec to traverse entire screen
// angle is 45 degrees

const logoDiv = document.getElementById("bl-div");
const logoSVG = document.getElementById("bl");
let direction = { left: 1, top: 2 };
const SPEED = 0.5;
const FPS = 60;
const REFRESHRATE = Math.floor(1000 / FPS);

setInterval(incrementPosition, REFRESHRATE);

function incrementPosition() {
    let [top, left] = [logoDiv.style.top, logoDiv.style.left]
        .map((val) => parseFloat(val));

    if (top > 85 || top < 0) {
        direction.top *= -1;
        changeColor();
    }

    if (left > 81 || left < 0) {
        direction.left *= -1;
        changeColor();
    }

    logoDiv.style.top = `${top + direction.top * SPEED}%`;
    logoDiv.style.left = `${left + direction.left * SPEED}%`;
}

function changeColor() {
    logoSVG.style.fill = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
