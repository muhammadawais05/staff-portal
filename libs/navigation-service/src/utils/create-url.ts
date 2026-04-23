/**
Returns a newly created URL object representing the URL defined by the parameters.

If the given base URL or the resulting URL are not valid URLs, the exception is thrown..

@param url - whole URL or pathname
@param base - base url string to combine with url param when it is a pathname

More info https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

@example
```

const url = createUrl('https://www.google.com/a/b/c');
console.log(url.href) //=> https://www.google.com/a/b/c
console.log(url.pathname) //=> /a/b/c

const url = createUrl('/a', 'https://www.google.com/');
console.log(url.href) //=> https://www.google.com/a
```
*/
export const createUrl = (url: string, base?: string | URL | undefined) => {
  try {
    // guard against https://bugs.webkit.org/show_bug.cgi?id=216841
    if (base !== undefined) {
      return new URL(url, base)
    }

    return new URL(url)
  } catch {
    throw Error(
      `Failed to construct an 'URL' with url = ${url} ${
        base ? ` and base = ${base}` : ''
      }`
    )
  }
}
