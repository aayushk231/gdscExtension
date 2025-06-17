const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-message");
const userView = document.getElementById("user-view");
const loginView = document.getElementById("login-view");
const logoutBtn = document.getElementById("logout-button");
const SERVER_URL = "http://localhost:3000";


async function loginUser(username, password) {
    const response = await fetch(SERVER_URL + '/login', {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    const data = await response.json();

    if (response.ok) {
        displayUser(data.name);
        chrome.storage.local.set({ token: data.token });
    } else {
        errorMsg.innerHTML = data.msg;
    }
}

function displayUser(name) {
    loginView.style.display = 'none';
    userView.style.display = 'block';
    document.getElementById('user-name').innerHTML = name;
}

function displayLogin(err) {
    userView.style.display = 'none';
    loginView.style.display = 'block';
    if (err) {
        errorMsg.innerHTML = err;
    }
}

async function verifyToken() {
    chrome.storage.local.get("token", async (extensionData) => {
        if (extensionData.token) {
            const response = await fetch(SERVER_URL + "/verify", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + extensionData.token
                }
            });
            const data = await response.json();
            if (response.ok) {
                displayUser(data.name);
            } else if (response.status === 403) {
                chrome.storage.local.remove("token", () => { console.log("Token Unset") });
                displayLogin("Login Again Please");
            }
        }
    });
}



document.addEventListener("DOMContentLoaded", async function () {
    await verifyToken();
});

loginForm.onsubmit = async function (e) {
    e.preventDefault();
    const username = usernameField.value;
    const password = passwordField.value;

    await loginUser(username, password);
}