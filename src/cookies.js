class Cookies {
  static async getAll(url) {
    return browser.cookies.getAll({ url });
  }

  static createListItem(cookie) {
    const listItem = document.createElement('li');
    // const content = document.createTextNode(`${cookie.name}: ${cookie.value}`);
    const cookieName = document.createElement('span');
    cookieName.innerText = cookie.name;
    cookieName.classList.add('cookie-name');

    const cookieValue = document.createElement('span');
    cookieValue.innerText = cookie.value;
    cookieName.classList.add('cookie-value');

    listItem.appendChild(cookieName);
    listItem.appendChild(cookieValue);

    // listItem.appendChild(content);
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
      parentNode.appendChild(cookiesTextElement);
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
