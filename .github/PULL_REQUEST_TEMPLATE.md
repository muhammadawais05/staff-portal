[SP-NNNN]

_Describe_the_changes_unless_they_are_evident_from_the_PR_title_

### How to test

1. …

### Merge checklist

- [ ] Author [tested the PR manually](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/1638301705/Testing+checklist)
- [ ] Reviewer [tested the PR manually](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/1638301705/Testing+checklist)
- [ ] Add new or missing [tests](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/2201124921/How+to+create+unit+tests) for touched code
- [ ] Update [CODEOWNERS file](https://github.com/toptal/staff-portal/blob/master/.github/CODEOWNERS) and [Sentry issue ownership](https://sentry.io/settings/toptal/projects/staff-portal/ownership/)
- [ ] Make sure to follow [Commit and PR title conventions](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/2241659738/PR+guidelines#Commit-and-PR-title-conventions)
- [ ] Run feature tests when necessary (if unsure - run them)

### Screenshots

| Before                                    | After                                     |
| ----------------------------------------- | ----------------------------------------- |
| _Insert_screenshots_or_screen_recordings_ | _Insert_screenshots_or_screen_recordings_ |

### PR guidelines

Use [these guidelines](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/2244083779/Pull+request+lifecycle) for your PR or code review.

### PR commands

- Use `@toptal-anvil ping reviewers` command to ping reviewers on Slack.
- Use `@toptal-bot run required` command to run Jest, Cypress, Pact and Lint.

<details>
<summary>Other PR Commands</summary>
<br />

List of available commands:

- `@toptal-anvil ping reviewers` will ping reviewers on slack
- `@toptal-bot run required` - Runs Jest, Cypress, Pact and Lint
- `@toptal-bot run lint` - Runs Lint (including types check)
- `@toptal-bot run jest` - Runs Jest tests
- `@toptal-bot run cypress` - Runs Cypress tests
- `@toptal-bot run pact` - Runs Pact tests
- `@toptal-bot run check:updates` - Runs Required Updates check
- `@toptal-bot run package:billing:alpha-release` will create an alpha release package for billing in legacy platform
- `@toptal-bot run jenkins features` - Run features using old Jenkins job
- `@toptal-bot run features` - Runs features vs Platform master

If you want to run features against custom platform branch please follow instructions [these guidelines.](https://toptal-core.atlassian.net/wiki/spaces/FR/pages/2695463425/Feature+tests+Cucumber+scenarios+in+Staff+Portal)

**Note**: We don't support yet the ability to trigger temploy creation via a comment,
but this happens automatically for you on each commit.

If you encounter failures and you need to re-run temploy generation,
scroll to **Checks section**, click on the `Build image` details link
and use `Re-run jobs` button on the right.

</details>
