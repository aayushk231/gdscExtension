//Retrives the first timetabke from the FFCS planner website

const dbName = "localforage";
const storeName = "keyvaluepairs";
const keyToGet = "timetableStoragePref";

function getIndexedDBData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event.target.errorCode);
      reject("Error opening database");
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      const getRequest = objectStore.get(keyToGet);

      getRequest.onerror = (event) => {
        console.error("Error getting data from object store:", event.target.errorCode);
        reject("Error retrieving data");
      };

      getRequest.onsuccess = (event) => {
        const value = event.target.result;
        //console.log(`Value for key "${keyToGet}" is:`, value);
        resolve(value);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
}

// Get the data
getIndexedDBData()
  .then(data => {
    // Save the retrieved data
    const timeVal = new Date();
    chrome.storage.local.set({ timeTable: data[0] });
    //console.log(data[0]);
    chrome.storage.local.set({ timeTableSyncTime: String(timeVal) });
    //console.log(String(timeVal));
    console.log("Data saved.");
  })
  .catch(error => {
    console.error("Failed to get IndexedDB data:", error);
  });