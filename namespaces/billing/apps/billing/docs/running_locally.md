<!-- markdownlint-disable MD024 -->

# Local development

> _⚠️ The following instructions are for billing-frontend developers. You do not
> need them if you are not going to work on billing-frontend project._

## Running directly on a host application

⚠️**NEW!!** You can now test your changes directly into any of the host apps
(`platform` or `staff-portal`), by using the new yarn commands:

- `$ yarn install:platform`
- `$ yarn install:staffportal`

The script will take care of everything for you. Since the build process is
static, you need to run it again after every change, to see them reflected on
the host app.

**Note**: the script assume that all three `billing-frontend`, `platform` and
`staff-portal` repositories sit side by side under the same parent dir.

## Billing Front-end App

The app can be used against a back-end API running either locally, remotely
(staging or temploy).

## Running against a local API

### Steps

1. Set up a local instance of Platform (see
   [Installation guide](https://github.com/toptal/platform/blob/master/docs/installation/README.md))
   and the GraphQL and API gateways (see
   [Installation guide](https://toptal-core.atlassian.net/wiki/spaces/ROGUE/pages/800850309/Local+setup+guide)).
2. Make sure you log in as your desired user on the Platform web app. via your
   browser (e.g. <http://localhost:3000>) first.
3. `$ yarn start:local`
   - The script will grab a valid `JWT_TOKEN` from the local Platform for you
     (admin role). To use an explicit token, prefix the command with
     `JWT_TOKEN=your-token`.
   - The script will set environment variable to point to
     <http://localhost:8082> for you. To override it manually, set your env.
     variable on an `.env.development.local` file.
4. Open <http://localhost:4015> in a browser.

## Running against a remote API (staging)

### Steps

1. Make sure you log in as your desired user on the staging Platform web app.
   via your browser (e.g. <https://staging.toptal.net/platform>) first.
2. Run:

   - `$ yarn start` (http port 4015) or `$ yarn start:https` (https port 443,
     allows communicating with CORS-enabled services like Kipper)

   - The script will grab a valid `JWT_TOKEN` from the local Platform for you
     (admin role). To use an explicit token, prefix the command with
     `JWT_TOKEN=your-token`.
   - The script will set environment variable to point to
     <https://staging.toptal.net> for you. To override it manually, set your
     env. variable on an `.env.development.local` file.

3. Open <http://local-development.staging.toptal.net:4015> in a browser.

### Manually

If for any reason the script is not an option, follow these steps for an
alternative approach:

1. Open dev tools in your browser, click on the **network** tab
2. Go to <https://staging.toptal.net/platform/staff/jobs>
3. Search for **active** jobs and visit a job's page, any will do
4. Look for a **graphql** request in the dev tools network tab
5. Click on any of the graphql requests and select the **headers** tab
6. Copy the authorization key (without the `Bearer` part) from **Request
   Headers**
7. Execute the following in your shell:
   `JWT_TOKEN=paste the authorization key here` (e.g.
   `JWT_TOKEN=eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2MDA0NTA5NTQsIm...`)
8. Run the app like this: `JWT_TOKEN=$JWT_TOKEN yarn start`
9. Make sure the platform is not running locally on your computer
10. Go to <http://local-development.staging.toptal.net:4015> and enjoy! :)

## Running against a remote API (temploy)

Follow the same steps as described for `staging`, except:

1. Prepend the start command with `API_HOST={temploy_host_name}` e.g.:

   - `$ API_HOST=my-temploy-instance.toptal.rocks yarn start:temploy`

## Important

> Make sure domain name in the URL you open in the browser matches the domain of
> the used API. This is a requirement for the session cookie (and CORS) to work
> properly:
>
> - for local API: <http://localhost:4015>
> - for staging API: <http://local-development.toptal.net:4015>
> - for temploy API: <http://local-development.toptal.rocks:4015>

### Extra details

> If you want to access `ChangeCommitmentModal` in standalone, you will need to
> manually update the url to the following pattern:
>
> - <http://local-development.staging.toptal.net:4015/JOB_ID?engagement_id=ENGAGEMENT_ID&modal=commitment-change>
