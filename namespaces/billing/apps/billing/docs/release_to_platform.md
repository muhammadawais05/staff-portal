<!-- markdownlint-disable MD041 -->

### Create release on Billing Frontend Repo

Typically, new versions of the Billing Frontend are released on Platform, by
creating new releases via the
[`Semantic Release` tool](https://github.com/semantic-release/semantic-release).

We have a Jenkins job that takes care of creating a new release:
[Here](https://jenkins-build.toptal.net/view/Billing/job/billing-master-release)

Ideally, the job should be triggered automatically upon every merge to `master`.
But, if for whatever reason, it doesn't run, or a new release needs to forced,
it can be triggered manually by the developer on Jenkins
([Here](https://jenkins-build.toptal.net/view/Billing/job/billing-master-release/build))

`RELEASE_AND_PUBLISH=1` will execute the release, while `RELEASE_AND_PUBLISH=0`
will do a dry run (e.g. to test before running).

### Prepare a new PR on Platform

Once the release completes successfully, a new branch & PR needs to be prepared
on the `platform` repo.

1. Create a new release ticket on your tracking tool and a correspondent new
   branch on your local `platform` repo (up to date with latest master).

2. Edit `./package.json` and update entry
   `"dependencies" -> "@toptal/billing-frontend-legacy"` to point to the
   released Git tag (it should be something like v1.xx.yy, after the # symbol)

3. Run `yarn install` on the repo folder, to download the proper BF version.
   This will recreate the entry on `yarn.lock`, this time pointing to the new
   commit hash.

4. Run `LOCK=1 yarn build` on the repo folder. This will regenerate the build
   asset lock file (required by a custom validation step on the `platform`
   repo).

5. Commit the change, publish the branch, and open a new PR upon it.

6. On the new PR, request reviews from some of your peers, ideally including at
   least both someone from front-end and back-end (besides the mandatory
   reviewers as codeowners).

7. Post a message on the PR to run the default specs, so that the PR can become
   green and mergeable:

   ```comment
   @toptal-bot run mergecheck
   ```

   In addition, create a temploy and perform or request additional testing &
   validation, by running:

   ```comment
   @toptal-bot run temploy
   ```

8. Once the PR gets all the approvals, all the checks become green, and the
   required validations are completed successfully, proceed to merge it and
   close it. The changes should be shipped during the next deployment cycle.
