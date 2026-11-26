
const world = document.getElementById("world");
const viewport = document.getElementById("viewport");
const character = document.getElementById("character");

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

let playerX = 120;

const speed = 50;

function moveCharacter(direction) {

    const worldWidth = world.scrollWidth;
    const screenWidth = viewport.clientWidth;
    const characterWidth = character.offsetWidth;

    const maxPosition = worldWidth - characterWidth;

    playerX = playerX + (direction * speed);

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > maxPosition) {
        playerX = maxPosition;
    }

    character.style.left = playerX + "px";

    let cameraX = playerX - (screenWidth * 0.4);

    const maxCamera = worldWidth - screenWidth;

    if (cameraX < 0) {
        cameraX = 0;
    }

    if (cameraX > maxCamera) {
        cameraX = maxCamera;
    }

    world.style.transform = "translateX(-" + cameraX + "px)";
}

rightButton.addEventListener("click", function() {
    moveCharacter(1);
});

leftButton.addEventListener("click", function() {
    moveCharacter(-1);
});

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        event.preventDefault();
        moveCharacter(1);
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveCharacter(-1);
    }

});
