class Handlers {
  static _storage(storageType) {
    const entries = Object.entries(storageType);
    // const parsed = entries.map(([key, storedValue]) => [
    //   key,
    //   // JSON.parse(storedValue.trim())
    // ]);
    return Object.fromEntries(entries);
  }

  static localStorage() {
    if (!localStorage) return {};
    return Handlers._storage(localStorage);
  }

  static sessionStorage() {
    if (!sessionStorage) return {};
    return Handlers._storage(sessionStorage);
  }

  static _domains(domainsType) {
    const entries = Object.entries(domainsType);
    return Object.fromEntries(entries);
  }

  static domains() {
    if (!domains) return {};
    return Handlers._domains(domains);
  }

  static externalLinks() {
    const tags = [
      'link',
      'img',
      'video',
      'audio',
      'script',
      'iframe',
      'source',
      'embed'
    ];
    const possibleHTMLTags = document.querySelectorAll(tags);
    const links = Object.values(possibleHTMLTags)
      .map((element) => element.href || element.src)
      .filter(Boolean); // remove tags que não possuem links
    return {
      links,
      amount: links.length
    };
  }

}

const MessageHandler = {
  LOCAL_STORAGE: Handlers.localStorage,
  SESSION_STORAGE: Handlers.sessionStorage,
  EXTERNAL_LINKS: Handlers.externalLinks,
  DOMAINS: Handlers.domains,
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const getData = MessageHandler[request.method];
  if (!getData) return;

  const data = getData();
  // console.log({ [request.method]: data });

  sendResponse({ data });
  // if (request.method == 'domains') {
  //   sendResponse({ data: ExternalLinks.getAll() });
  // } else if (request.method == 'localStorageData') {
  //   sendResponse({ data: Object.entries(localStorage) });
  // } else if (request.method == 'sessionStorageData') {
  //   sendResponse({ data: Object.entries(sessionStorage) });
  // } else if (request.method == 'ExternalLinks') {
  //   const externalLinks = ExternalLinks.getAll();
  //   sendResponse({ data: externalLinks });
  // } else if (request.method == "canvasFingerprintData"){
  //   sendResponse({data: canvasFingerprint()});
  // }
});
