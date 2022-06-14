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

// DOMAINS -----------------------------------------------------
const showDomains = async (activeTab) => {
  // let tab = tabs.pop();
  // var DomainsList = document.getElementById('third-party-list');

  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: "DOMAINS"
  });
  const domains = response.data;
  console.log(domains);
  const domainsLength = Object.keys(domains).length;
  
  // var Domains = response.data.links;
  // var numberOfLinks = response.data.numberOfLinks;
  const domainsUsage = document.getElementById('domains-usage');
  const ddText = document.createTextNode(String(domainsLength));
  domainsUsage.appendChild(ddText);

  const websiteSecurity = document.getElementById('domains-security-status');
  if (domainsLength > 0) {
    const percentageOfdomains = document.getElementById(
      'percentage-session-storage'
    );

    if (domainsLength > 50) {
      websiteSecurity.style.color = '#FF0000';

      let domainsRiskText = document.createElement('p');
      let domainsPercentage = document.createTextNode('Risk: HIGH');

      domainsRiskText.appendChild(domainsPercentage);
      percentageOfdomains.appendChild(domainsRiskText);
    } else if (domainsLength > 25 && domainsLength < 50) {
      let domainsRiskText = document.createElement('p');
      let domainsPercentage = document.createTextNode('Risk: MEDIUM');
      domainsRiskText.appendChild(domainsPercentage);
      percentageOfdomains.appendChild(domainsRiskText);

      websiteSecurity.style.color = '#FFFF00';
    } else {
      let domainsRiskText = document.createElement('p');
      let domainsPercentage = document.createTextNode('Risk: LOW');
      domainsRiskText.appendChild(domainsPercentage);
      percentageOfdomains.appendChild(domainsRiskText);
      websiteSecurity.style.color = '#19a319';
    }
  } else {
    let noDomainsData = document.createElement('h4');
    let noDomainData = document.createTextNode('No domain in this tab.');
    noDomainsData.appendChild(noDomainData);
    listHTML.appendChild(noDomainsData);
  }

  // var sizeLinks = document.getElementById("size-third-party");
  // var sizeLinksText = document.createTextNode("Number of external links: " + numberOfLinks);
  // sizeLinks.appendChild(sizeLinksText);

  // Domains.map(domain => {
  //   var li = document.createElement('li');
  //   li.innerText = domain;
  //   DomainsList.appendChild(li);
  // });
};

// SESSION STORAGE ----------------------------------------
const showSessionStorage = async (activeTab) => {
  const listHTML = document.getElementById('session-storage-list');
  const sizeHTML = document.getElementById('size-session-storage');
  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'SESSION_STORAGE'
  });
  const sessionStorage = response.data;
  const sessionStorageLength = Object.keys(sessionStorage).length;
  console.log(sessionStorage);

  const sessionStorageUsage = document.getElementById('session-storage-usage');
  const ssText = document.createTextNode(String(sessionStorageLength));
  sessionStorageUsage.appendChild(ssText);

  const websiteSecurity = document.getElementById(
    'session-storage-security-status'
  );

  if (sessionStorageLength > 0) {
    // let sizeContent = document.createTextNode(
    //   'Number of items: ' + sessionStorageLength
    // );

    // sizeHTML.appendChild(sizeContent);

    const percentageOfLocalStorage = document.getElementById(
      'percentage-session-storage'
    );

    if (sessionStorageLength > 50) {
      websiteSecurity.style.color = '#FF0000';

      let sessionStorageRiskText = document.createElement('p');
      let sessionStoragePercentage = document.createTextNode('Risk: HIGH');

      sessionStorageRiskText.appendChild(sessionStoragePercentage);
      percentageOfLocalStorage.appendChild(sessionStorageRiskText);
    } else if (sessionStorageLength > 25 && sessionStorageLength < 50) {
      let sessionStorageRiskText = document.createElement('p');
      let sessionStoragePercentage = document.createTextNode('Risk: MEDIUM');
      sessionStorageRiskText.appendChild(sessionStoragePercentage);
      percentageOfLocalStorage.appendChild(sessionStorageRiskText);

      websiteSecurity.style.color = '#FFFF00';
    } else {
      let sessionStorageRiskText = document.createElement('p');
      let sessionStoragePercentage = document.createTextNode('Risk: LOW');
      sessionStorageRiskText.appendChild(sessionStoragePercentage);
      percentageOfLocalStorage.appendChild(sessionStorageRiskText);
      websiteSecurity.style.color = '#19a319';
    }
  } else {
    let noSessionStorageData = document.createElement('h4');
    let noLocalStorageData = document.createTextNode('No storage in this tab.');
    noSessionStorageData.appendChild(noLocalStorageData);
    listHTML.appendChild(noSessionStorageData);
  }
};

// LOCAL STORAGE ------------------------------------------
const showLocalStorage = async (activeTab) => {
  const listHTML = document.getElementById('local-storage-list');
  const sizeHTML = document.getElementById('size-local-storage');

  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'LOCAL_STORAGE'
  });

  const localStorage = response.data;
  const localStorageLength = Object.keys(localStorage).length;

  const localStorageUsage = document.getElementById('local-storage-usage');
  const lsText = document.createTextNode(String(localStorageLength));
  localStorageUsage.appendChild(lsText);

  const websiteSecurity = document.getElementById(
    'local-storage-security-status'
  );

  if (localStorageLength > 0) {
    // let sizeContent = document.createTextNode(
    //   'Number of items: ' + localStorageLength
    // );

    // sizeHTML.appendChild(sizeContent);

    const percentageOfLocalStorage = document.getElementById(
      'percentage-local-storage'
    );

    if (localStorageLength > 50) {
      websiteSecurity.style.color = '#FF0000';

      let localStorageRiskText = document.createElement('p');
      let localStoragePercentage = document.createTextNode('Risk: HIGH');

      localStorageRiskText.appendChild(localStoragePercentage);
      percentageOfLocalStorage.appendChild(localStorageRiskText);
    } else if (localStorageLength > 25 && localStorageLength < 50) {
      let localStorageRiskText = document.createElement('p');
      let localStoragePercentage = document.createTextNode('Risk: MEDIUM');
      localStorageRiskText.appendChild(localStoragePercentage);
      percentageOfLocalStorage.appendChild(localStorageRiskText);

      websiteSecurity.style.color = '#FFFF00';
    } else {
      let localStorageRiskText = document.createElement('p');
      let localStoragePercentage = document.createTextNode('Risk: LOW');
      localStorageRiskText.appendChild(localStoragePercentage);
      percentageOfLocalStorage.appendChild(localStorageRiskText);
      websiteSecurity.style.color = '#19a319';
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
  showDomains(activeTab); 
}

// em caso de erro
function onError(error) {
  console.log(error);
}

getActiveTab().then(onSuccess, onError);
