const SERVER_URL = "http://localhost:3000";

async function unsetContentScripts() {
    const scripts = await chrome.scripting.getRegisteredContentScripts();
    if (scripts != []) {
        let arr = [];
        scripts.forEach((script) => {
            arr.push(script.id);
        })
        await chrome.scripting.unregisterContentScripts({ ids: arr });
    }
}

async function setContentScripts() {
    await unsetContentScripts(); //To ensure scripts are not overwritten

    chrome.scripting.registerContentScripts([{
        id: 'sidebar-script',
        js: 'sidebar.js',
        matches: ["file:///C:/Users/aayus/Downloads/VTOP/*"]
    },
        {
        id: "test-script",
        js: ["test.js"],
        matches: ["file:///C:/Users/aayus/Downloads/VTOP/VTOP/VIT%20-%20VTOP%20REGISTRATION_start.html"],
    },

    {
        id: "getDB-script",
        js: ["getDB.js"],
        matches: ["https://ffcs.sarveshdakhore.in/*"]
    },

    {
        id: "modify-script",
        js: ["modify.js"],
        matches: ["file:///C:/Users/aayus/Downloads/VTOP/VTOP/VIT%20-%20VTOP%20REGISTRATION_actual%20page.html"],
    },

    {
        id: "regWithLab-script",
        js: ["regWithLab.js"],
        matches: ["file:///C:/Users/aayus/Downloads/VTOP/VTOP/VIT%20-%20VTOP%20REGISTRATION_withlab.html"],
    }])
        .catch((err) => console.error(err));
}

async function verifyTokenAndSetContentScripts() {
    chrome.storage.local.get("token", async (extensionData) => {
        if (extensionData.token) {
            const response = await fetch(SERVER_URL + "/verify", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + extensionData.token
                }
            });
            if (response.ok) {
                //Token verified - Set content-scripts
                setContentScripts();

            } else {
                //Token not verified
                unsetContentScripts(); //Remove content-scripts
                chrome.storage.local.remove("token", () => { console.log("Token Unset") }); //Remove token
                await chrome.action.openPopup(); //Ask to login again
            }
        }
    });
}


chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg == "Set-Content-Scripts") {
        verifyTokenAndSetContentScripts();
    } else if (msg == "Unset-Content-Scripts") {
        unsetContentScripts();
    }
})