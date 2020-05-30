const body = document.querySelector("body");
const IMG_NUMBER = 5;

function handleImaLoad() {
    console.log("finished loading!");
}

function paintImage(imgNumber) {
    // //random으로 받은 숫자의 범위는 0~4이므로 1을 더해서 1~5까지 나오게 설정
    body.style.backgroundImage = `url(../images/${imgNumber + 1}.jpg)`;
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    //random은 곱해지는 범위내에서 실수가 나오므로 정수를 만들기 위에 floor로 소수점 버림
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();