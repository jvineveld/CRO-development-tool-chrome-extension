const docCommunicator = {
  async fetchCurrentTabUrl() {
    return new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval('document.location.href', (resp) =>
        resolve(resp)
      );
    });
  },
  async fetchActiveTests() {
    return new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(
        "sessionStorage.getItem('active_test')",
        (resp) => {
          let val = resp ? JSON.parse(resp) : [];
          resolve(val);
        }
      );
    });
  },
  async activateTest(testInfo) {
    return new Promise((resolve) => {
      const injectedJS =
        'document.dispatchEvent(new CustomEvent("CRODevtools_ActivateTest", { detail: ' +
        JSON.stringify(testInfo) +
        ' }));';

      chrome.devtools.inspectedWindow.eval(injectedJS, (resp) => resolve(resp));
    });
  },
  async disableTest(testInfo) {
    return new Promise((resolve) => {
      const injectedJS =
        'document.dispatchEvent(new CustomEvent("CRODevtools_DisableTest", { detail: ' +
        JSON.stringify(testInfo) +
        ' }));';

      chrome.devtools.inspectedWindow.eval(injectedJS, (resp) => resolve(resp));
    });
  },
};

export default docCommunicator;
