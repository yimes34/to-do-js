// LS에 저장된 이름이 없으면 이름 물어보기
const requestName = document.querySelector(".requestName")
    requestNameForm = requestName.querySelector(".requestNameForm"),
    inputName = requestNameForm.querySelector("input");

const greetingContainer = document.querySelector(".greeting"),
    greeting = greetingContainer.querySelector(".js-greeting"),
    name = greetingContainer.querySelector(".js-userName");

const USERNAME_LS = "userName",
    HIDDEN_CN = "hidden";

function saveName(name) {
    localStorage.setItem(USERNAME_LS, name);
}

function submitHandler(event) {
    event.preventDefault();
    const userName = inputName.value;
    saveName(userName);
    paintGreeting(userName);
}

function askForName() {
    requestNameForm.addEventListener("submit", submitHandler);
    requestName.classList.remove(HIDDEN_CN);
}

// LS에 저장된 이름이 있으면 가져와서 뿌려주기
function paintGreeting(userName) {
    requestName.classList.add(HIDDEN_CN);
    greetingContainer.classList.remove(HIDDEN_CN);
    const greetings = ["Good morning", "Good afternoon", "Good evening", "Check your task before going to bed", "something wrong"];
    const date = new Date();
    const hour = date.getHours();
    if(5 <= hour && hour < 12) {
        greetingNum = 0;
    } else if(12 <= hour && hour < 17) {
        greetingNum = 1;
    } else if(17 <= hour && hour < 22) {
        greetingNum = 2;
    } else if(22 <= hour < 24 || 0 <= hour < 5) {
        greetingNum = 3;
    }
    const greetingText = greetings[greetingNum];
    greeting.innerText = `${greetingText}, ${userName}`;
}

function callName() {
    const userName = localStorage.getItem(USERNAME_LS);
    if(userName === null) {
        askForName();
    } else {
        paintGreeting(userName);
    }
}


function initNameCaller() {
    //이름 불러오기 함수부터 시작
    callName();
}

initNameCaller();