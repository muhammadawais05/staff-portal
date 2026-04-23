/**
Returns the host name

More info https://developer.mozilla.org/en-US/docs/Web/API/Location/hostname

@example
```
window.location.href = "https://developer.mozilla.org/en-US/docs/Web/API/Location/host"
getHostName() => "developer.mozilla.org"
```
*/

export const getHostName = () => window.location.hostname
