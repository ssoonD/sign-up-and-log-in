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
    document.querySelector(".login-username-error").innerText = "";
    document.querySelector(".login-password-error").innerText = "";
    document.querySelector(".join-username-error").innerText = "";
    document.querySelector(".join-password-error").innerText = "";
    document.querySelector(".join-nickname-error").innerText = "";
}

function onLogoutClick() {
    const greeting = document.querySelector(".greeting");
    greeting.innerText = "";
    greeting.classList.add("hide");
    loginForm.classList.remove("hide");
}

function fideNickname(user, name, pass) {
    const found = user.data.find((u) => u.username === name && u.password === pass);
    if (found === undefined) return false;
    else return found.nickname;
}

// 중복 확인 
// username이 존재하지 않으면 true
// username이 존재하면 false
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
    const errorUsername = document.querySelector(".login-username-error");
    const errorPassword = document.querySelector(".login-password-error");

    // 입력하지 않았을 때 
    if (username.value === "") {
        errorUsername.innerText = `Username is required`;
        errorUsername.classList.remove("hide");
    } else {
        errorUsername.classList.add("hide");
    }
    if (password.value === "") {
        errorPassword.innerText = `Password is required`;
        errorPassword.classList.remove("hide");
    } else {
        errorPassword.classList.add("hide");
    }

    if (username.value !== "" && password.value !== "") {
        if (nickname) {
            loginForm.classList.add("hide");
            greeting.classList.remove("hide");
            greeting.innerText = `Hello ${nickname} 🤗`;
            greeting.addEventListener("click", onLogoutClick);
            resetInput();
        } else {
            errorUsername.innerText = `The account does not exist`;
            errorUsername.classList.remove("hide");
        }
    }
}

function onJoinClick(user) {
    const username = document.querySelector(".join-username");
    const password = document.querySelector(".join-password");
    const nickname = document.querySelector(".join-nickname");
    const errorUsername = document.querySelector(".join-username-error");
    const errorPassword = document.querySelector(".join-password-error");
    const errorNickname = document.querySelector(".join-nickname-error");

    // 입력하지 않았을 때 
    if (username.value === "") {
        errorUsername.innerText = `Username is required`;
        errorUsername.classList.remove("hide");
    } else {
        errorUsername.classList.add("hide");
    }
    if (password.value === "") {
        errorPassword.innerText = `Password is required`;
        errorPassword.classList.remove("hide");
    } else {
        errorPassword.classList.add("hide");
    }
    if (nickname.value === "") {
        errorNickname.innerText = `Nickname is required`;
        errorNickname.classList.remove("hide");
    } else {
        errorNickname.classList.add("hide");
    }

    if (username.value !== "" && password.value !== "" && nickname.value !== "") {
        if (checkUsername(user, username.value)) {
            // username이 존재하지 않을 때 
            const itemObj = {
                username: username.value,
                password: password.value,
                nickname: nickname.value
            };
            user.data.push(itemObj);
            onCloseClick();
        } else {
            // username이 존재할 때 
            errorUsername.innerText = `Account exists`;
            errorUsername.classList.remove("hide");
        }
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