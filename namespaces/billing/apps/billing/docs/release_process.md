# Release Process

_This process applies to new and extracted functionality._

## Technical Process

### `billing-frontend`

1. We use [feature flags](docs/feature_flags.md) to enable/disable functionality
   in `master` branch. We don't use feature branches when working on large
   change sets. Any code changes should be merged straight to `master` and
   hidden using a feature flag if necessary.

2. When all work on a larger change set is done and signed off (see _Sign off_
   section below), ideally there last PR should only contain a
   [feature flag](docs/feature_flags.md) adjustment.

3. In order to prevent any unintentional feature leak, a feature flag can be set
   to `true` and merged to `master` ONLY when all _Required Approvals_ (see
   section below) have been received.

4. After release (that is, setting a feature flag to `true` on `master`), a Jira
   card must be created to clean up code related to already released feature
   flag.

### `platform` _(legacy staff portal)_

1. Create a branch and use a `prop` to enable a particular feature
   ([example](https://github.com/toptal/platform/blob/master/app/assets/features/platform/billing/components/StaffEngagement/index.jsx#L38)).

   ```js
   <BillingFrontendStaffEngagementPage
     featureFlags={{ someFlagEnabled: true }}
   />
   ```

2. The branch can be merged to `master` ONLY when all _Required Approvals_ (see
   section below) have been received (to prevent any unintentional feature
   leak). As the very last step, don't forget to remove the prop (created in
   step 1 above) overriding a [feature flag](docs/feature_flags.md).
3. **For extraction only:** after release, make sure that a follow-up ticket has
   been created for cleanup of any Platform code that has become redundant, and
   that `@billing-x-team-be` team has been notified about that ticket.

## Sign-off Process

1. Prepare a short description of your changes along with a link to current
   functionality on staging environment (as a state before the extraction) and a
   link to your temploy (state after the extraction) and post all that
   information at
   [`#-billing-initiatives`](https://toptal-core.slack.com/archives/C2WRAU45R)
   and
   [`#billing-extraction-business-quality-assurance`](https://toptal-core.slack.com/archives/CNVNR9USW)
   Slack channels.

2. Create a short video recording demonstrating the new/updated feature and
   place the file in the
   _([billing/billing x frontend/releases](https://drive.google.com/drive/u/1/folders/1ZDX2mqyE4ejIocpdr73vpP40UqFvZhon))_
   Google Drive folder.

3. Demonstrate the changes on `Billing Stakeholder Sync-Up & Demos` Zoom
   meeting. Demo can be skipped if you provide a recorded video from step 2. The
   video will be presented on the next meeting.

## Required approvals

- Billing's Technical Product Manager
  [@Yanko Chamov](https://toptal-core.slack.com/archives/DSKJFH1H6)
- Billing team's Product Manager
  [@Michelle Au Yeung](https://toptal-core.slack.com/archives/DJNPZNJBW)
- Finance Team
  [@Kimberly Sommers](https://toptal-core.slack.com/archives/DQUCUU30B)

### Related documentations

- [Description how to release](docs/release_to_platform.md)
