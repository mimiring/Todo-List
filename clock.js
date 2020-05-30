const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date(); //현재 시간 불러오기
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours
                            }:${minutes < 10 ? `0${minutes}` : minutes
                            }:${seconds < 10 ? `0${seconds}` : seconds}`;
}
//10미만의 숫자가 오면 앞에 0 넣어주기
//~이면?~:아니면

function init() {
    getTime();
    setInterval(getTime, 1000); //1초마다 갱신하기
}
init();