/**
Please give preference to useLocation() hook over this function whenever possible.
Returns the query string of the current URL containing a '?' followed by the parameters of the URL.

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/search

@example
```
window.location.href = "https://developer.mozilla.org/en-US/docs/Location.search?q=123"
getLocationSearch() => "?q=123"
```
*/

export const getLocationSearch = () => window.location.search
