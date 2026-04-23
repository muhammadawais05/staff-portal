/**
Please give preference to useLocation() hook over this function whenever possible.
Returns the path name of the current URL.

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname

@example
```
window.location.hash = "https://developer.mozilla.org/en-US/docs/Location.pathname"
getLocationPathname() => "/en-US/docs/Location.pathname"
```
*/

export const getLocationPathname = () => window.location.pathname
