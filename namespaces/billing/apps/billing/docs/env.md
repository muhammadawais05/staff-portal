<!-- markdownlint-disable MD024 -->

# Environment variables

## .envrc file

In order to use `.envrc` file you would need to have direnv installed. You can
find more on how to install it [here](https://direnv.net/)

`NPM_TOKEN` - company-wide npm token, to be able to access & publish `toptal`
packages. To generate it, go to npm, login with the credentials stored in
LastPass, and generate a token for you.

`GH_TOKEN` & `GITHUB_TOKEN` - personal token with access permissions to the
repo, to be able to fetch & install packages thru git reference

### Example file

```bash
.envrc.example
```

_(create a new file without `.example` part and copy its content)_

## .env file

Holds API configuration variables.

Naming pattern:

```bash
GQL_${endpoint variation}_API_${endpoint or auth method /cookie or token/}
```

### Example file

```bash
.env.example
```

_(create a new file without `.example` part and copy its content)_

## Related Documents

1. [Setting up API](./api_authentication.md)
