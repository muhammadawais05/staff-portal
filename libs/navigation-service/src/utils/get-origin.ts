/**
Returns the origin of the current URL

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/origin

@example
```
window.location.href = "https://developer.mozilla.org/en-US/docs/Web/API/Location/host"
getOrigin() => "https://developer.mozilla.org"
```
*/

export const getOrigin = () => window.location.origin
