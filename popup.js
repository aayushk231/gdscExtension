const SERVER_URL = "http://localhost:3000";

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-message");
const userView = document.getElementById("user-view");
const loginView = document.getElementById("login-view");
const logoutBtn = document.getElementById("logout-button");
const timeTableSyncStatus = document.getElementById("timeTableSyncStatus");
const timeTableSyncTime = document.getElementById("timeTableSyncTime");
const uploadBtn = document.getElementById("upload-button");


//Login function
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

        chrome.storage.local.set({ token: data.token }); //Store JWT
        chrome.runtime.sendMessage("Set-Content-Scripts"); //Set Content-scripts
    } else {
        errorMsg.innerHTML = data.msg;
    }
}

//Function to diplay the user-view
function displayUser(name) {
    loginView.style.display = 'none';
    userView.style.display = 'block';
    document.getElementById('user-name').innerHTML = name;
}

//Function to display the login-view
function displayLogin(err) {
    userView.style.display = 'none';
    loginView.style.display = 'block';
    if (err) {
        errorMsg.innerHTML = err;
    }
}

//Function to verify pre-existing tokens
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
                chrome.storage.local.remove("token", () => { console.log("Token Unset") }); //Remove JWT
                chrome.runtime.sendMessage("Unset-Content-Scripts");
                logout("Login Again Please");

            } else {
                logout("Error");
            }
        }
        else {
            logout();
        }
    });
}

//Function to logout user and do the necessary cleanup
function logout(loginMessage) {
    chrome.runtime.sendMessage("Unset-Content-Scripts");
    chrome.storage.local.remove("token", () => { console.log("Token Unset") });
    chrome.storage.local.remove("timeTable");
    chrome.storage.local.remove("timeTableSyncTime");
    timeTableSyncStatus.textContent = "Not Synced";
    timeTableSyncStatus.style.color = "red";
    timeTableSyncTime.textContent = "";
    displayLogin(loginMessage);
}

//Function to check if the timetable is synced
function checkTimeTable() {
    chrome.storage.local.get("timeTableSyncTime", (data) => {
        if (data.timeTableSyncTime) {
            timeTableSyncStatus.textContent = "Synced";
            timeTableSyncStatus.style.color = "green";
            timeTableSyncTime.textContent = "Sync Time: " + data.timeTableSyncTime;
        }
        else {
            timeTableSyncStatus.textContent = "Not Synced";
            timeTableSyncStatus.style.color = "red";
            timeTableSyncTime.textContent = "";
        }
    })
}

//Check token on page load; for logged in users
document.addEventListener("DOMContentLoaded", async function () {
    await verifyToken();
    checkTimeTable();
});

//Login the user
loginForm.onsubmit = async function (e) {
    e.preventDefault();
    const username = usernameField.value;
    const password = passwordField.value;

    await loginUser(username, password);
    passwordField.value = '';
}

//Logout the user
logoutBtn.addEventListener("click", () => {
    logout("Logged Out");
})

document.getElementById('addSidebarBtn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleSidebar'});
  });
});
