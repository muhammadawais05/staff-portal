/**
Causes the window to load and display the document at the URL specified.
After the navigation occurs, the user can navigate back to the page that
called navigateExternallyTo by pressing the "back" button if the `replaceHistory`
 param was not used.

@param url - Is a DOMString containing the URL of the page to navigate to.
@param replaceHistory - flag specifying if it should replace the current History entry

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/assign
More info https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
*/
export const navigateExternallyTo = (url: string, replaceHistory = false) =>
  window.location[replaceHistory ? 'replace' : 'assign'](url)
