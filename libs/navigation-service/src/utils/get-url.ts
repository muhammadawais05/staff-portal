/**
Returns current whole URL

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/href

@example
```
window.location.href = "http://my-site.com/?a=b"
getUrl() // => "http://my-site.com/?a=b"
```
*/
export const getUrl = () => window.location.href
