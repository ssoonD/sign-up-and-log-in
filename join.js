const form = document.getElementById("join-form");
const username = document.getElementById("join-username");
const password = document.getElementById("join-password");
const nickname = document.getElementById("join-nickname");

function saveUser(text) {

}

function onCloseClick() {
    const joinForm = document.querySelector(".join-form");
    joinForm.classList.add("hide");
}

function setEventListreners() {
    const closeButton = document.querySelector(".closebtn");
    const joinButton = document.querySelector(".joinbtn");
    closeButton.addEventListener("click", onCloseClick);
    joinButton.addEventListener("submit", () => onJoinClick);
}

function init() {
    setEventListreners();
}

init();