// // // STORAGE ----------------------------------------

// const showAllLocalStorage = async (dict) => {
//     // let tab = dict.pop();
//     var listHTML = document.getElementById('local-storage-list');
//     var sizeHTML = document.getElementById('size-local-storage');
//     let localStorageLength = 0;

//     // const response = await browser.dict.sendMessage(tab.id, {
//     //   method: "localStorageData"
//     // });

//     var websiteSecurity = document.getElementById('local-storage-security-status');
//     var localStorageSecurity = document.getElementById('local-storage-status');

//     if (response.data.length > 0) {
//       for (let localStorageItem of response.data) {
//         if (localStorageItem) {
//           localStorageLength++;
//           let li = document.createElement("li");
//           let content = document.createTextNode(localStorageItem);
//           li.appendChild(content);
//           listHTML.appendChild(li);
//         }
//       }
//       let sizeContent = document.createTextNode("Number of items on Local Storage: " + localStorageLength);
//       sizeHTML.appendChild(sizeContent);

//       if(localStorageLength > 50){
//         websiteSecurity.style.color = "#F4364C";
//         localStorageSecurity.setAttribute("value", "50");
//       } else if (localStorageLength > 25 && localStorageLength < 50){
//         localStorageSecurity.setAttribute("value", localStorageLength.toString());
//         websiteSecurity.style.color = "#FDB44E";
//       } else {
//         localStorageSecurity.setAttribute("value", localStorageLength.toString());
//       }

//     } else {
//       let noLocalStorageTag = document.createElement("h4");
//       let noLocalStorageData = document.createTextNode("No local storage data in this tab.");

//       noLocalStorageTag.appendChild(noLocalStorageData);
//       listHTML.appendChild(noLocalStorageTag);
//     }
//   }

//   const showAllSessionStorage = async (tabs) => {
//     let tab = tabs.pop();
//     var listHTML = document.getElementById('session-storage-list');
//     var sizeHTML = document.getElementById('size-session-storage');
//     let sessionStorageLength = 0;

//     const response = await browser.tabs.sendMessage(tab.id, {
//       method: "sessionStorageData"
//     });

//     var websiteSecurity = document.getElementById('session-storage-security-status');
//     var sessionStorageSecurity = document.getElementById('session-storage-status');

//     if (response.data.length > 0) {
//       for (let sessionStorageItem of response.data) {
//         if (sessionStorageItem) {
//           sessionStorageLength++;
//           let li = document.createElement("li");
//           let content = document.createTextNode(sessionStorageItem);
//           li.appendChild(content);
//           listHTML.appendChild(li);
//         }
//       }
//       let sizeContent = document.createTextNode("Number of items on Session Storage: " + sessionStorageLength);
//       sizeHTML.appendChild(sizeContent);

//       if(sessionStorageLength > 20){
//         websiteSecurity.style.color = "#F4364C";
//         sessionStorageSecurity.setAttribute("value", "20");
//       } else if (sessionStorageLength > 10 && sessionStorageLength < 20){
//         websiteSecurity.style.color = "#FDB44E";
//         sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
//       } else {
//         sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
//       }
//     } else {
//       let noSessionStorageTag = document.createElement("h4");
//       let noSessionStorageData = document.createTextNode("No session storage data in this tab.");

//       noSessionStorageTag.appendChild(noSessionStorageData);
//       listHTML.appendChild(noSessionStorageTag);
//     }
//   }

// // getActiveTab().then(showAllLocalStorage);
// // getActiveTab().then(showAllSessionStorage);
