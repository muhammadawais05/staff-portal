import { TargetValue } from '../types'

/**
Loads a URL in different target's types.

@param url - Is a DOMString containing the URL of the page to navigate to.
@param target - Is a DOMString specifying the name of the browsing context into which to load the specified resource.
@param features - Is a DOMString containing a comma-separated list of window features given with their corresponding values in the form "name=value".

More info https://developer.mozilla.org/en-US/docs/Web/API/Window/open
*/

export const windowOpen = (
  url: string,
  target?: TargetValue,
  features?: string
) => window.open(url, target, features)
