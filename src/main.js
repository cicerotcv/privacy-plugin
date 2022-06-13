const getAllExternalLinks = () => {
  var allExternalLinks = Array.prototype.map.call(
    document.querySelectorAll(
      'link, img, video, audio, script, iframe, source, embed'
    ),
    (HTMLtag) => {
      return HTMLtag.href || HTMLtag.src;
    }
  );

  const data = {
    links: allExternalLinks,
    numberOfLinks: allExternalLinks.length
  };

  return data;
};

// COOKIES --------------------------------------------------

class DOM {
  static textElement(tag, content) {
    const element = document.createElement(tag);
    const textNode = document.createTextNode(content);
    element.appendChild(textNode);
    return element;
  }
}

class Cookies {
  static async getAll(url) {
    return browser.cookies.getAll({ url });
  }

  static createListItem(cookie) {
    const listItem = document.createElement('li');
    const content = document.createTextNode(`${cookie.name}: ${cookie.value}`);
    listItem.appendChild(content);
    return listItem;
  }

  static updateCookiesList(cookies) {
    const cookiesList = document.getElementById('cookie-list');
    const cookiesCount = document.getElementById('number-cookies');
    const cookiesTextElement = document.createElement('p');

    if (!cookies.length) {
      const cookiesTextNode = document.createTextNode(
        'No cookies in this tab.'
      );
      const parentNode = cookiesList.parentNode;
      cookiesTextElement.appendChild(cookiesTextNode);
      parent.appendChild(parentNode);
      return;
    }

    // atualiza a lista de cookies
    for (const cookie of cookies) {
      const listItem = Cookies.createListItem(cookie);
      cookiesList.appendChild(listItem);
    }

    // atualiza o contador de cookies
    const cookiesTextNode = document.createTextNode(
      `Number of cookies: ${cookies.length}`
    );
    cookiesTextElement.appendChild(cookiesTextNode);
    cookiesCount.appendChild(cookiesTextElement);
  }

  static updateCookiesRisk(cookies) {
    const percentageOfCookies = document.getElementById('percentage-cookies');
    const websiteSecurity = document.getElementById('cookies-security-status');
    const cookiesSecurity = document.getElementById('cookies-status');

    function createRiskElement(riskLevel) {
      const cookiesRiskText = document.createElement('p');
      const cookiesPercentage = document.createTextNode(`Risk: ${riskLevel}`);
      cookiesRiskText.appendChild(cookiesPercentage);
      return cookiesRiskText;
    }

    const riskCategories = {
      LOW: {
        name: 'LOW',
        color: '#19a319'
      },
      MEDIUM: {
        name: 'MEDIUM',
        color: '#ffff00'
      },
      HIGH: {
        name: 'HIGH',
        color: '#ff2000'
      }
    };

    if (cookies.length >= 100) {
      websiteSecurity.style.color = riskCategories.HIGH.color;
      const cookiesRiskText = createRiskElement(riskCategories.HIGH.name);
      percentageOfCookies.appendChild(cookiesRiskText);
      cookiesSecurity.setAttribute('value', 100);
    } else if (cookies.length > 50 && cookies.length < 100) {
      websiteSecurity.style.color = riskCategories.MEDIUM.color;
      const cookiesRiskText = createRiskElement(riskCategories.MEDIUM.name);
      percentageOfCookies.appendChild(cookiesRiskText);
      cookiesSecurity.setAttribute('value', cookies.length);
    } else {
      websiteSecurity.style.color = riskCategories.LOW.color;
      const cookiesRiskText = createRiskElement(riskCategories.LOW.name);
      percentageOfCookies.appendChild(cookiesRiskText);
      cookiesSecurity.setAttribute('value', cookies.length);
    }
  }
}

const showCookiesForTab = async (activeTab) => {
  //get the first tab object in the array
  const cookies = await Cookies.getAll(activeTab.url);
  Cookies.updateCookiesList(cookies);
  Cookies.updateCookiesRisk(cookies);
};

// STORAGE ----------------------------------------

const showAllLocalStorage = async (activeTab) => {
  const listHTML = document.getElementById('local-storage-list');
  const sizeHTML = document.getElementById('size-local-storage');
  const localStorageLength = 0;

  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'localStorageData'
  });

  var websiteSecurity = document.getElementById(
    'local-storage-security-status'
  );
  var localStorageSecurity = document.getElementById('local-storage-status');

  if (response.data.length > 0) {
    for (let item of response.data) {
      if (item) {
        localStorageLength++;
        let li = document.createElement('li');
        let content = document.createTextNode(item);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode(
      'Number of items: ' + localStorageLength
    );
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
    let noLocalStorageTag = document.createElement('h4');
    let noLocalStorageData = document.createTextNode('No storage in this tab.');

    noLocalStorageTag.appendChild(noLocalStorageData);
    listHTML.appendChild(noLocalStorageTag);
  }
};

// SCORE DE SEGURANÇA
const calculateScore = () => {
  var websiteSecurity = document.getElementById('website-security-status');
  var scoreTag = document.getElementById('score');
  var cookiesData = document
    .getElementById('cookies-status')
    .getAttribute('value');

  var cookiesScore = parseInt(cookiesData);

  var scoreProgressBar = document.getElementById('score-progress-bar');

  var score = cookiesScore;
  let cookiesText = document.createElement('p');
  // dando erro aqui ???????
  let cookiesContent = document.createTextNode('score: ' + score);
  cookiesText.appendChild(cookiesContent);
  scoreTag.appendChild(cookiesText);

  if (score > 150) {
    websiteSecurity.innerHTML = 'Website is insecure';
    websiteSecurity.style.color = '#FF0000';
  } else if (score <= 150 && score > 50) {
    websiteSecurity.innerHTML = 'Website is suspect';
    websiteSecurity.style.color = '#FFFF00';
  } else {
    websiteSecurity.innerHTML = 'Website is secure';
    websiteSecurity.style.color = '#19a319';
  }
};

// GERAL
async function getActiveTab() {
  if (!browser.tabs) return;
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  return tabs[0];
}

function onSuccess(activeTab) {
  if (!activeTab) return;
  showCookiesForTab(activeTab);
  showAllLocalStorage(activeTab);
}

function onError(error) {
  console.log(error);
}

getActiveTab().then(onSuccess, onError);
