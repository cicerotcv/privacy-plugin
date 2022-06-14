// EXTERNAL LINKS -------------------------------------------
const showExternalLinks = async (activeTab) => {
  const { data } = await browser.tabs.sendMessage(activeTab.id, {
    method: 'EXTERNAL_LINKS'
  });
  console.log(data);
};

// COOKIES --------------------------------------------------

const showCookies = async (activeTab) => {
  const cookies = await Cookies.getAll(activeTab.url);
  console.log(cookies);
  Cookies.updateCookiesList(cookies);
  Cookies.updateCookiesRisk(cookies);
};

const showDomains = async (activeTab) => {
  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'DOMAINS'
  });
};

// SESSION STORAGE ----------------------------------------
const showSessionStorage = async (activeTab) => {
  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'SESSION_STORAGE'
  });
  const sessionStorage = response.data;
  console.log(sessionStorage);
};

// LOCAL STORAGE ------------------------------------------
const showLocalStorage = async (activeTab) => {
  const listHTML = document.getElementById('local-storage-list');
  const sizeHTML = document.getElementById('size-local-storage');
  const localStorageLength = 0;

  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'LOCAL_STORAGE'
  });
  const localStorage = response.data;

  //return;

  var websiteSecurity = document.getElementById( 'local-storage-security-status');
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
    let sizeContent = document.createTextNode( 'Number of items: ' + localStorageLength );
    sizeHTML.appendChild(sizeContent);
    if (localstoragelen > 50){
      websiteSecurity.style.color = "#FF0000";

      let localStorageRiskText = document.createElement("p");
      let localStoragePercentage = document.createTextNode("Risk: HIGH");
      localStorageRiskText.appendChild(localStoragePercentage);
      percentageOfLocalStorage.appendChild(localStorageRiskText);

      localStorageSecurity.setAttribute("value", "50");
    } else if (localstoragelen > 25 && localstoragelen < 50){

      let localStorageRiskText = document.createElement("p");
      let localStoragePercentage = document.createTextNode("Risk: MEDIU");
      localStorageRiskText.appendChild(localStoragePercentage);
      percentageOfLocalStorage.appendChild(localStorageRiskText);

      localStorageSecurity.setAttribute("value", localstoragelen.toString());
      websiteSecurity.style.color = "#FFFF00";
    } else {

      let localStorageRiskText = document.createElement("p");
      let localStoragePercentage = document.createTextNode("Risk: LOW");
      localStorageRiskText.appendChild(localStoragePercentage);
      percentageOfLocalStorage.appendChild(localStorageRiskText);

      localStorageSecurity.setAttribute("value", localstoragelen.toString());
    }
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

// GERAL - ativção do script
async function getActiveTab() {
  if (!browser.tabs) return;
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const currentTab = tabs[0];
  return currentTab;
}

// em caso de sucesso
function onSuccess(activeTab) {
  if (!activeTab) return;
  showExternalLinks(activeTab);
  showCookies(activeTab);
  showLocalStorage(activeTab);
  showSessionStorage(activeTab);
}

// em caso de erro
function onError(error) {
  console.log(error);
}

getActiveTab().then(onSuccess, onError);
