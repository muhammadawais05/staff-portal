# Feature Flags

We have a simple implementation of a feature flags, which allows us to develop
main features without creating an isolated feature branch.

## Lifecycle

### Introducing a feature flag

Before starting to implement a new feature, declare an ENUM value of the flag
and set its default value to `false`.
[FeatureFlagEnum](../src/@types/types.ts#L264)
[Default Setting](../src/featureFlags.ts#L4)

On your feature code, you can read the state of the flag by using the
FeatureFlags context api:

```ts
const { yourFeatureEnabled } = useFeatureFlagContext()
```

...so you can conditionally render components, or switch any other logic
relevant to the feature. (Note: you need to be contained on the `<App />`
component for the context to be available)

### During development

In local development you can switch the flag to `true` by the following methods:

- [Override with an object, `props.featureFlags`, on the Widget](./src/components/StaffApp/StaffApp.tsx#L34)
- In the URL like this: ?flag=extraExpenses&flag=placementFee

### End of life

With a release of a particular feature, the flag becomes obsolete and should be
removed along with any dead code related to it.
