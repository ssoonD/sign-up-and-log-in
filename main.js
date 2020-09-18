const loginForm = document.querySelector(".login-form"),
    joinForm = document.querySelector(".join-form");

const user = {
    data: []
};

function loadItems() {
    return fetch("data.json")
        .then((response) => response.json())
        .then((json) => json.users);
}

function resetInput() {
    document.querySelector(".login-username").value = "";
    document.querySelector(".login-password").value = "";
    document.querySelector(".join-username").value = "";
    document.querySelector(".join-password").value = "";
    document.querySelector(".join-nickname").value = "";
}

function fideNickname(user, name, pass) {
    const value = user.data.filter((u) => u.username === name && u.password === pass);
    return value[0].nickname;
}

function onLogoutClick() {
    const greeting = document.querySelector(".greeting");
    greeting.innerText = "";
    greeting.classList.add("hide");
    loginForm.classList.remove("hide");
}

// 중복 확인 
function checkUsername(user, username) {
    const found = user.data.find((u) => u.username === username);
    if (found === undefined) return true;
    else return false;
}

function onLoginClick(user) {
    const username = document.querySelector(".login-username");
    const password = document.querySelector(".login-password");
    const greeting = document.querySelector(".greeting");
    const nickname = fideNickname(user, username.value, password.value);


    loginForm.classList.add("hide");
    greeting.classList.remove("hide");
    greeting.innerText = `Hello ${nickname} 🤗`;
    greeting.addEventListener("click", onLogoutClick);
    resetInput();
}

function onJoinClick(user) {
    const username = document.querySelector(".join-username");
    const password = document.querySelector(".join-password");
    const nickname = document.querySelector(".join-nickname");
    const errorText = document.querySelector(".txtb-error");

    if (checkUsername(user, username.value)) {
        errorText.classList.add("hide");
        const itemObj = {
            username: username.value,
            password: password.value,
            nickname: nickname.value
        };
        user.data.push(itemObj);
        onCloseClick();
    } else {
        errorText.innerText = `Account exists`;
        errorText.classList.remove("hide");
    }
}

function onToJoinClick() {
    joinForm.classList.remove("hide");
    resetInput();
}

function onCloseClick() {
    joinForm.classList.add("hide");
    resetInput();
}

function setEventListreners(user) {
    const loginButton = document.querySelector(".logbtn");
    const toJoinButton = document.querySelector(".login-joinbtn");
    const joinButton = document.querySelector(".joinbtn");
    const closeButton = document.querySelector(".closebtn");
    loginButton.addEventListener("click", () => onLoginClick(user));
    toJoinButton.addEventListener("click", onToJoinClick);
    joinButton.addEventListener("click", () => onJoinClick(user));
    closeButton.addEventListener("click", onCloseClick);
}

function init() {
    loadItems()
        .then((items) => {
            user.data = items;
            setEventListreners(user);
        })
        .catch(console.log);
}

init();

// 기능 추가 
// 1. 중복 아이디 X - O
// 2. 로그아웃
// 3. 계정 삭제