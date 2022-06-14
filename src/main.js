// COOKIES --------------------------------------------------

const showCookies = async (activeTab) => {
  const cookies = await Cookies.getAll(activeTab.url);
  Cookies.updateCookiesList(cookies);
  Cookies.updateCookiesRisk(cookies);
  return cookies.length;
};

// EXTERNAL LINKS -------------------------------------------
const showExternalLinks = async (activeTab) => {
  const response = await browser.tabs.sendMessage(activeTab.id, {
    method: 'EXTERNAL_LINKS'
  });
  const domains = response.data;
  const domainsLength = domains.amount;

  console.log(domains);

  // var Domains = response.data.links;
  // var numberOfLinks = response.data.numberOfLinks;
  const domainsUsage = document.getElementById('domains-usage');
  const ddText = document.createTextNode(String(domainsLength));
  domainsUsage.appendChild(ddText);

  const websiteSecurity = document.getElementById('domains-security-status');
  if (domainsLength > 0) {
    const percentageOfdomains = document.getElementById('percentage-domains');

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
  return domainsLength;
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
  return sessionStorageLength;
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
  return localStorageLength;
};

// SCORE DE SEGURANÇA
const calculateScore = (
  cookiesAmount,
  localStorageUsage,
  sessionStorageUsage,
  externalLinksUsage
) => {
  const websiteSecurity = document.getElementById('website-security-status');
  const scoreTag = document.getElementById('score');

  const score =
    cookiesAmount +
    localStorageUsage +
    sessionStorageUsage +
    externalLinksUsage;

  console.log('Score:', score);

  let cookiesText = document.createElement('p');

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
async function onSuccess(activeTab) {
  if (!activeTab) return;
  const cookiesAmount = await showCookies(activeTab);
  const externalLinksUsage = await showExternalLinks(activeTab);
  const localStorageUsage = await showLocalStorage(activeTab);
  const sessionStorageUsage = await showSessionStorage(activeTab);
  calculateScore(
    cookiesAmount,
    localStorageUsage,
    sessionStorageUsage,
    externalLinksUsage
  );
}

// em caso de erro
function onError(error) {
  console.log(error);
}

getActiveTab().then(onSuccess, onError);
