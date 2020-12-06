const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `imgs/${imgNumber +1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER) ; 
    return number;
}


function initbg() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

initbg();