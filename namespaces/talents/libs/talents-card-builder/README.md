# Talents Card Builder

This library uses the `Talent Portal` talents card builder components
([link](https://github.com/toptal/talent-portal-frontend/tree/master/hosts/talent-portal/src/modules/application-card))
to build the talents card builder for the pitch step on the candidate sending page.

Slack channel - <https://toptal-core.slack.com/archives/C038NLE5517>

## Context

On the candidate sending pitch step page, in the compose email section,
you can build the talent card, which will be used later, inside the email.

The legacy platform uses an iframe to display the
[TopPitcher](https://github.com/toptal/top-pitcher) page.

We decided to drop this approach because accessing iframe content is not straightforward
and could introduce unknown security issues.
Also, the TopPitcher uses a legacy design that does not match the Staff Portal
base design.

Instead of the TopPitch page, we will extract the talent card builder
components from the `Talent Portal` and use them to create
the talents card builder inside the `Staff Portal`.

## Differences

The talent card builder, imported from the
[Talent Portal](https://github.com/toptal/talent-portal-frontend/blob/499c7b1ebaf8ee265f045fe3f6e21b9466f2ef65/hosts/talent-portal/src/modules/application-card/components/TalentCardBuilder/TalentCardBuilder.tsx#L44),
was modified to achieve a similar behavior to what the legacy platform has.

On the edit mode, the source dropdown menu was removed.
The application card values will be received from the BE.

- The backend returns the card created by talent during their job application process
- If the card on the previous step does not exist, the backend returns
  the card generated from overlapping skills

In the preview mode, the groups were reduced, and you can sort the items
inside the groups by dragging and dropping, similar to the legacy platform.
There will be four groups on the Staff Portal:

- Skills
- Industries
- Highlights
- Portfolio

The highlights will contain six types, allowing users to sort between types.

- Certification
- Education
- Employment
- Mentorship
- Portfolio (which is different from the portfolio from the root level)
- Publication

## Functionality

The talent card builder is used on the pitch step from the candidate sending page.
The preview mode is also used on the feedback step from the same page.
When the user clicks on the Build Talent Card button, the backend will
return the talent pitch and profile to create the card.
The talent profile will contain the available options for the user to pick.
The talent pitch represents the already selected or generated values.

- The backend returns the card created by talent during their job application process
- If the card on the previous step does not exist, the backend returns the card
  generated from overlapping skills

When the user presses the finish button, it will generate the
pitch data (TalentPitchInput) and trigger the generate email preview,
with the pitch data as a parameter.
Also, the pitch data will be passed when the user reopens the
talent card builder modal to get the previously selected values.

## Structure

The `Talent Portal` card builder components are located
[here](https://github.com/toptal/talent-portal-frontend/tree/master/hosts/talent-portal/src/modules/application-card).

In `Staff Portal`, we will place those components inside the talents namespace:
`namespaces/talents/libs/talents-card-builder`

```text
namespaces
└── talents
    └── libs
        └── talents-card-builder
            ├── src
            │   ├── assets
            │   ├── components
            │   ├── constants
            │   ├── data
            │   ├── hooks
            │   ├── mocks
            │   ├── types
            │   ├── utils
            │   └── index.ts
            ├── package.json
            └── README.md
```

## Library exports

- `TalentCardBuilder` - the main component
- `BasicInfo`, `Preview` and `PreviewTalentCardLoader` components
  to build talent pitch preview
- `useGetTalentCardBuilderOptions` used for getting data for the `TalentCardBuilder`
- `emptyFormState` - empty talent card builder state
- `getBuildTalentPitchInput` - utility for getting the `TalentPitchInput`
- `getTalentCardContent` - for creating
  the talent card builder content (available options)
- `getProfilePitch` - used to build the form initial values
- `revalidate` - form mutator
