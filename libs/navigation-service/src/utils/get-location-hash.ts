/**
Please give preference to useLocation() hook over this function whenever possible.
Returns the hash of the current URL containing a '#' followed by the hash.

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/hash

@example
```
window.location.hash = "https://developer.mozilla.org/en-US/docs/Location.hash#hash"
getLocationSearch() => "#hash"
```
*/

export const getLocationHash = () => window.location.hash
