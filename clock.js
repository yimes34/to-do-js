const clockContainer = document.querySelector(".clock"),
    dateContainer = clockContainer.querySelector(".js-date"),
    timeContainer = clockContainer.querySelector(".js-time");

function getDate() {
    const date = new Date();
    const yr = date.getFullYear();
    const mo = date.getMonth();
    const d = date.getDate();
    const da = date.getDay();
    function selectDay(num) {
        const day = {
            1: "Monday",
            2: "Tuesday",
            3: "Wedsenday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            0: "Sunday",
        }
        return day[num];
    }
    day = selectDay(da);
    dateContainer.innerText = `${yr}/${mo}/${d} ${day}`;
}

function getTime() {
    const date = new Date();
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hr = date.getHours();
    timeContainer.innerText = `${hr < 10 ? `0${hr}` : hr}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

function init() {
    getDate();
    getTime();
    setInterval(getTime, 1000);
}

init();