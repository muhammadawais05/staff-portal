# Jenkins Jobs

Our `Jenkins`
[Billing Dashboard](https://jenkins-build.toptal.net/view/Billing/).

## Build image job

Compiles the `Dockerfile` and uploads it to a CDN.

You need to provide:

- TAG _(which will be referenced on jobs)_
- Branch _(where the `Dockerfile` located)_

Triggered:

- manually

Link:

- [Build image job](https://jenkins-build.toptal.net/view/Billing/job/billing-build-image/build)

## Master release job

Generates a new bundle js file with source file and creates a new release _(if
it's not a dry run)_. Also notifies `Slack` channel, `-billing-frontend`.

You need to provide:

- RELEASE*AND_PUBLISH*(1 - True, 0 - Dry run, not triggers a new release)\_

Triggered:

- automatically on every commit to `master`
- manually

Link:

- [Master release job](https://jenkins-build.toptal.net/view/Billing/job/billing-master-release/build)

## PR Specs job

On PR each commit triggers this job to execute Jest, lint, Cypress, etc. against
the codebase.

Triggered:

- automatically on every PR, on each commit

Link:

- [PR Specs job](https://jenkins-build.toptal.net/view/Billing/job/billing-pr-specs/)
