# Staff Portal CI/CD

Continuous Integration & Delivery in SP is made up of
[PR checks + temploy](#pr-checks--temploy), and
[release image deployment](#release-image-deployment).

PS. Since Staff Portal is a Davinci app, it should be noted that if a CI job
Jenkinsfile can't be found in the Staff Portal repository, then it will be
present in the Davinci repository.

## PR checks + temploy

[PR checks flowchart](https://drive.google.com/file/d/1jBBPcRW4ivqcG--IzrNwKKWnY2maj0Rt/view?usp=sharing)

Jenkinsfile:
[`ci/jobs/pr-tests/Jenkinsfile`](https://github.com/toptal/staff-portal/blob/master/ci/jobs/pr-tests/Jenkinsfile)

PR checks are triggered automatically when a PR is created and for every
subsequent commit added to the PR.

### Build docker image

Before we can run PR checks, we need a docker image from which we can execute
them. If this stage fails, none of the subsequent stages will be executed. After
the image has been built, a build of SP is created by running `yarn build` found
in `package.json`. This command is
[implemented in Davinci](https://github.com/toptal/davinci/blob/master/packages/engine/src/commands/build.js)

It's worth noting that this stage triggers a
[child job](https://jenkins-build.toptal.net/job/Staff-portal/job/staff-portal-build-image/).

### Type check

Runs the `yarn typecheck` command found in `package.json` which checks types by
running `tsc`. This check is also executed before every push.

### Danger check

Checks the PR title and commit messages base on
[these guidelines](https://toptal-core.atlassian.net/l/c/tAkMfU6X). Danger check
is
[implemented in Davinci](https://github.com/toptal/davinci/blob/master/packages/ci/src/commands/danger.js).
If this stage fails, none of the subsequent stages will be executed.

### Linting check

Runs the `yarn lint` command found in `package.json`. This check is
[implemented in Davinci](https://github.com/toptal/davinci/tree/master/packages/syntax/src/commands)
and checks code quality and code styles. This check is also executed before
every commit.

### Bundle size check

Runs the `yarn size` command found in `package.json`. This check is
[implemented in Davinci](https://github.com/toptal/davinci/blob/master/packages/engine/src/commands/size.js)
and ensures the SP bundle size is not bigger than a given threshold.

### Jest tests

Runs the `yarn test:ci` command found in `package.json`. This check is
[implemented in Davinci](https://github.com/toptal/davinci/blob/master/packages/qa/src/commands/unitTests.js),
and executes unit and integrated tests implemented in Jest.

### Cypress tests

Runs the `yarn test:ui:ci` command found in `package.json`. This command starts
SP and runs the `Cypress` command. Cypress tests are executed last, and not in
parallel with the other checks because it makes these slow and flaky due to high
resource consumption

PS. This stage is currently optional. You can make a check optional or not in
the Github repository settings

### Contract tests - `disabled`

Jenkinsfile:
[`ci/jobs/contracts-verify/Jenkinsfile`](https://github.com/toptal/staff-portal/blob/master/ci/jobs/contracts-verify/Jenkinsfile)

Running them updates the contracts with the providers (currently, only
platform):

```bash
yarn test:pact
# or
yarn test:pact test_file_path
```

The contracts are stored in `./pacts/` and uploaded to [Pact Broker] from CI.

Contract tests are run together with unit tests on CI. If you want to trigger
them all on your PR, comment:

```bash
@toptal-bot run tests
```

If you want to force the contract verification on the Platform side, use
`with contract verification`:

```bash
@toptal-bot run tests with contract verification
```

[pact]: https://docs.pact.io/
[pact broker]: https://pact-broker.toptal.net/

To learn more about contract tests in SP, please read the
[contract testing guide for SP](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/941359366/Contract+testing+Staff+Portal)

### Cucumber tests - `not available`

While we do not have Cucumber tests ran on CI yet, the following description
will apply.

Ideally, business tests are run on each PR. Elements on the pages are located by
text and CSS class, so even small refactoring might break them. To run them on
your PR, leave a PR comment:

```bash
@toptal-bot run features
```

To run business tests on a specific branch from the Platform repo:

```bash
@toptal-bot run features for your-platform-branch-name
```

Cucumber E2E tests can be found at <http://jenkins-features.toptal.net>.

## Platform breaking changes type check

As backend platform GraphQL Staff schemas can be changed during the development
we have a
[GitHub Action](https://github.com/toptal/platform/actions/workflows/graphql-gateway-validation.yml)
that runs type check of staff-portal on an updated schema. Right now we only
check Staff schemas that are exposed via the gateway, so this check publishes
new gateway schema and just runs Staff-portal type check flow. This GHA prevents
BE developers from producing breaking changes.

For exact details please refer to source code of
[GitHub Action](https://github.com/toptal/platform/blob/master/.github/workflows/graphql-gateway-validation.yml)
and
[graphql_gateway_validation.sh](https://github.com/toptal/platform/blob/master/.github/actions/graphql_gateway_validation.sh)

### How to trigger PR type check manually?

> NOTE: It's backend only check

You can trigger this PR check manually by adding the following comment to the
**PLATFORM** PR:

```bash
@toptal-bot run graphql validation
```

## Temploy

Temploy, interpreted by some as temporary deployment is a great feature in our
CI that makes it possible for the reviewers of a PR to preview the changes in
the PR in a real environment. A temploy is generated for every PR. A link to the
temploy is added to the PR as a comment as soon as this temporary environment is
deployed. Temploys are deployed with the
[`.env.temploy`](https://github.com/toptal/staff-portal/blob/master/.env.temploy)
environment file.

It's worth noting that this stage triggers a
[child job](https://jenkins-build.toptal.net/job/Staff-portal/job/staff-portal-deploy-helm-run/).

### How to trigger PR checks manually?

You can trigger PR checks manually by adding the following comment to the PR:

```bash
@toptal-bot run tests
```

Warning: Due to a git hook issue on Jenkins, after tests are restarted by using
`run tests`, please delete the comment. Otherwise, builds are going to be
restarted endlessly after the PR is merged or closed.

### What to do if a PR check fails?

Go to the Jenkins job logs
([see how](#how-to-monitor-the-execution-of-pr-checks)), find the error within
the logs, fix the error locally, and push a new commit.

### How to monitor the execution of PR checks?

1. In Jenkins, the PR checks for SP can be found at
   [staff-portal-pr-tests](https://jenkins-build.toptal.net/view/Staff-portal/job/Staff-portal/job/staff-portal-pr-tests/).
   Once you get to this page, locate the job the has the number of the
   respective PR
   ![Jenkins PR jobs](https://user-images.githubusercontent.com/830217/94049250-1e6e4700-fdab-11ea-9847-9fc2954950f3.png)

2. Click on the job number
   ![Jenkins PR Job name](https://user-images.githubusercontent.com/830217/94049682-a9e7d800-fdab-11ea-857e-0a3058e58276.png)

3. Then, click on the "Console Output" menu item
   ![Jenkins PR Console Output](https://user-images.githubusercontent.com/830217/94050059-1e227b80-fdac-11ea-8065-d0d9a662e8a8.png)

### What happens during a PR check?

1. A pending `check` is added to the PR
2. The actual `check` is executed
3. The pending `check` is set to `success` or `error` based on the results of
   executing it

[View flowchart](https://drive.google.com/file/d/1iOByAVk8Uobi2lb1gS34eOuRZg0SgY1q/view?usp=sharing)

## Release image deployment

Jenkinsfile:
[`ci/jobs/deploy-release-image/Jenkinsfile`](https://github.com/toptal/staff-portal/blob/master/ci/jobs/pr-tests/Jenkinsfile)

SP deployment is done with Ansible scripts. In Jenkins, SP deployment can be
found at
[staff-portal-master-main](https://jenkins-build.toptal.net/view/Staff-portal/job/Staff-portal/job/staff-portal-master-main/).
