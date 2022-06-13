const getAllExternalLinks = () => {
    var allExternalLinks = Array.prototype.map.call(
      document.querySelectorAll(
        "link, img, video, audio, script, iframe, source, embed"
      ),
      (HTMLtag) => { 
        return HTMLtag.href || HTMLtag.src; 
      }
    )
  
    const data = {
      links: allExternalLinks,
      numberOfLinks: allExternalLinks.length
    }
  
    return data;
}

// COOKIES --------------------------------------------------
const showCookiesForTab = (tabs) => {
    //get the first tab object in the array
    let tab = tabs.pop();
    let countCookies = 0;
    var gettingAllCookies = browser.cookies.getAll({
      url: tab.url
    });
  
    gettingAllCookies.then((cookies) => {
      var cookieList = document.getElementById('cookie-list');
      var numberOfCookies = document.getElementById('number-cookies');
      var percentageOfCookies = document.getElementById('percentage-cookies');
      
      if (cookies.length > 0) {
        // add an <li> item with the name and value of the cookie to the list
        for (let cookie of cookies) {
          let li = document.createElement("li");
          let content = document.createTextNode(cookie.name + ": "+ cookie.value);
          li.appendChild(content);
          cookieList.appendChild(li);
          countCookies++;
        }

        let cookiesText = document.createElement("p");
        let cookiesContent = document.createTextNode("Number of cookies: " + countCookies);
        cookiesText.appendChild(cookiesContent);
        numberOfCookies.appendChild(cookiesText);

      } else { // cookies.length == 0
        let p = document.createElement("p");
        let content = document.createTextNode("No cookies in this tab.");
        let parent = cookieList.parentNode;
  
        p.appendChild(content);
        parent.appendChild(p);
      }
  
      var websiteSecurity = document.getElementById('cookies-security-status');
      var cookiesSecurity = document.getElementById('cookies-status');
      
      if(countCookies >= 100){
        websiteSecurity.style.color = "#FF0000";
        let cookiesRiskText = document.createElement("p");
        let cookiesPercentage = document.createTextNode("Risk: HIGH");
        cookiesRiskText.appendChild(cookiesPercentage);
        percentageOfCookies.appendChild(cookiesRiskText);
        cookiesSecurity.setAttribute("value", 100);
      } else if (countCookies > 50 && countCookies < 100){
        let cookiesRiskText = document.createElement("p");
        let cookiesPercentage = document.createTextNode("Risk: MEDIUM");
        cookiesRiskText.appendChild(cookiesPercentage);
        percentageOfCookies.appendChild(cookiesRiskText);
        websiteSecurity.style.color = "#FFFF00";
        cookiesSecurity.setAttribute("value", countCookies);
      } else {
        let cookiesRiskText = document.createElement("p");
        let cookiesPercentage = document.createTextNode("Risk: LOW");
        cookiesRiskText.appendChild(cookiesPercentage);
        percentageOfCookies.appendChild(cookiesRiskText);
  
        websiteSecurity.style.color = "#19a319";
        cookiesSecurity.setAttribute("value", countCookies);
      }
    });
  }
// STORAGE ----------------------------------------

const showAllLocalStorage = async (tabs) => {
    
  let tab = tabs.pop();
  var listHTML = document.getElementById('local-storage-list');
  var sizeHTML = document.getElementById('size-local-storage');
  let localStorageLength = 0;

  const response = await browser.tabs.sendMessage(tab.id, { 
    method: "localStorageData"
  });

  var websiteSecurity = document.getElementById('local-storage-security-status');
  var localStorageSecurity = document.getElementById('local-storage-status');

  if (response.data.length > 0) {
    for (let item of response.data) {
      if (item) {
        localStorageLength++;
        let li = document.createElement("li");
        let content = document.createTextNode(item);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode("Number of items: " + localStorageLength);
    sizeHTML.appendChild(sizeContent);
    // if (localstoragelen > 50){
    //   websiteSecurity.style.color = "#FF0000";

    //   let localStorageRiskText = document.createElement("p");
    //   let localStoragePercentage = document.createTextNode("Risk: HIGH");
    //   localStorageRiskText.appendChild(localStoragePercentage);
    //   percentageOfLocalStorage.appendChild(localStorageRiskText);

    //   localStorageSecurity.setAttribute("value", "50");
    // } else if (localstoragelen > 25 && localstoragelen < 50){

    //   let localStorageRiskText = document.createElement("p");
    //   let localStoragePercentage = document.createTextNode("Risk: MEDIU");
    //   localStorageRiskText.appendChild(localStoragePercentage);
    //   percentageOfLocalStorage.appendChild(localStorageRiskText);

    //   localStorageSecurity.setAttribute("value", localstoragelen.toString());
    //   websiteSecurity.style.color = "#FFFF00";
    // } else {

    //   let localStorageRiskText = document.createElement("p");
    //   let localStoragePercentage = document.createTextNode("Risk: LOW");
    //   localStorageRiskText.appendChild(localStoragePercentage);
    //   percentageOfLocalStorage.appendChild(localStorageRiskText);

    //   localStorageSecurity.setAttribute("value", localstoragelen.toString());
    // }


  } else {
    let noLocalStorageTag = document.createElement("h4");
    let noLocalStorageData = document.createTextNode("No storage in this tab.");

    noLocalStorageTag.appendChild(noLocalStorageData);
    listHTML.appendChild(noLocalStorageTag);
  }

}

// SCORE DE SEGURANÇA 
const calculateScore = () => {
  var websiteSecurity = document.getElementById('website-security-status');
  var scoreTag = document.getElementById("score");
  var cookiesData = document.getElementById('cookies-status').getAttribute('value');

  var cookiesScore = parseInt(cookiesData);

  var scoreProgressBar = document.getElementById('score-progress-bar');

  var score = cookiesScore;
  let cookiesText = document.createElement("p");
  // dando erro aqui ???????
  let cookiesContent = document.createTextNode("score: " + score);
  cookiesText.appendChild(cookiesContent);
  scoreTag.appendChild(cookiesText);

  if(score > 150) {
    websiteSecurity.innerHTML = "Website is insecure";
    websiteSecurity.style.color = "#FF0000";
  }
  else if(score <= 150 && score > 50) {
    websiteSecurity.innerHTML = "Website is suspect";
    websiteSecurity.style.color = "#FFFF00";
  }
  else {
    websiteSecurity.innerHTML = "Website is secure";
    websiteSecurity.style.color = "#19a319";
  }
}

// GERAL
function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}

getActiveTab().then(showCookiesForTab);
getActiveTab().then(showAllLocalStorage);
// getActiveTab().then(calculateScore);
