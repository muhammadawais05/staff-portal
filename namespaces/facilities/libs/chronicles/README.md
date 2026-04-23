# Chronicles

Chronicles is a set of visual data components to display Toptal business events.
The visual representation of the [chronicles service][1].

## Usage

### HistoryWidget

The basic list of the business events (history actions).

_Props:_
| Name | Type | Description |
|----------------|-----------------------|---|
| feeds | string[][] (required) | An array of arrays of feed tags (ex. `[['gid://platform/Talent/123', 'gid://platform/Talent/345'], ['screening']]`). More about feeds you can find [here][2] |
| actions | string[] | Array of action names to filter events (ex. `['rejected', 'rejected_inactive']`) |
| occurredAt | DateRange | Date filter for `occuredAt` event field (ex. `{from: '2018-02-01', till: '2018-02-01"'}`) |
| before | string | The ID of an event to retrieve events before (ex. `0005642d-b67c-434e-0000-000000f886e7`) |
| after | string | The ID of an event to retrieve events after (ex. `0005642d-b67c-434e-0000-000000f886e7`) |
| limit | number \| null | Limit of the number of events to query (default `25`) |
| subjectGids | string[] | Event subject filter in GID format (ex. `['gid://platform/Talent/409315']`) |
| performerGids | string[] | Event performer filter in GID format (ex. `['gid://platform/Staff/128917']`) |
| payload | PayloadFilter | Payload filter ([example][3]) |
| defaultExpanded | boolean | Whether to render initially all records expanded |
| loadMore | boolean | Whether to show the Load More button |
| pollInterval | number | API polling interval |
| dateFormat | string | Dates format (default 'MMM d, h:mm a') |
| timezone | string | Display time zone |

_Example:_

```ts
import { HistoryWidget } from '@staff-portal/chronicles'
;<HistoryWidget feeds={[[taskGID]]} />
```

### HistoryEntry

Displays a single table row for the given entry object (business event).
This component should be used only if `HistoryWidget` component
is not fulfilling your needs.

_Props:_
| Name | Type | Description |
|----------------|-----------------------|---|
| entry | Entry (required) | Entry object (business event) |
| stripeEven | boolean (required) | Whether to color background of the row |
| icon | JSX.Element | Icon to display before the entry content in the row |
| defaultExpanded | boolean | Whether to render initially record expanded |
| expanded | boolean | Whether to show record expanded (controlled state) |
| onClick | (id: string) => void | Expand click event handler |

_Example:_

```ts
import { Chronicles, HistoryEntry } from '@staff-portal/chronicles'
;<HistoryEntry entry={historyEntry} stripeEven={false} />
```

### usePerformedActionsQuery hook

If it's not enough for you the existing data components.
Chronicles provides a data hook to retrieve raw data of business actions.

_Props:_
| Name | Type | Description |
|----------------|-----------------------|---|
| variables | SearchChroniclesVariables (required) | Query variables (more you can find [here][2]) |
| queryOptions | BaseQueryOptions & ClientOptions (required) | Basic query option and the list of Chronicles configuration options |

_Example:_

```javascript
const { data, loading, error } = usePerformedActionsQuery(
  { feeds: [[nodeGID]], limit: 100 },
  {
    pollInterval: 1500,
    clientOptions: {
      platformUrl: 'https://staging.toptal.net',
      chroniclesUrl: 'https://chronicles-staging.toptal.net',
      mock: false,
      connectToDevTools: false
    }
  }
)
```

## Template compiler

Chronicles provides a template compiler for the
[Chronicles service][5] data.

It can convert this raw data provided by the Chronicles service:

```ts
// entry
const entry = {
  id: '00058d19-e6f9-44fc-0000-000001c9bf02',
  occurredAt: '2019-07-07T12:34:32-04:00',
  action: 'updated',
  subjectGID: 'gid://platform/Company/1493407',
  subjectName: null,
  performerGID: 'gid://platform/Staff/128917',
  comment: 'This part was obfuscated, some content was here.',
  payload: '{}',
  template: '%{performer} updated profile of %{subject}'
}

// model descriptions
const modelDescription = [
  {
    gid: 'gid://platform/Staff/128917',
    associationReferences: [],
    designation: 'advanced recruiter',
    reference: {
      text: 'Mahiara Pimentel',
      accessible: true,
      options: [],
      path: '/platform/staff/advanced_recruiters/128917'
    }
  },
  {
    gid: 'gid://platform/Company/1493407',
    associationReferences: [],
    designation: 'company',
    reference: {
      text: 'Schimmel-Weimann',
      accessible: true,
      options: [],
      path: '/platform/staff/companies/1493407'
    }
  }
]
```

into

```jsx
<div class='Picasso-root'>
  <a
    class='MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary'
    href='/platform/staff/advanced_recruiters/128917'
  >
    Mahiara Pimentel
  </a>
  updated profile of
  <a
    class='MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary'
    href='/platform/staff/companies/1493407'
  >
    Schimmel-Weimann
  </a>
</div>
```

More about the internal implementation of the template compiler you can find [here][6]
and in unit tests of services in this package

This is the low-level component and should not be used by the Frontend engineers.
Provided visual data components should be used instead.

## Additional Resources

[Chronicles data structure][6]

[1]: https://github.com/toptal/chronicles
[2]: https://toptal-core.atlassian.net/wiki/spaces/ROGUE/pages/405700803/How+to+search+for+Chronicles+entries
[3]: https://toptal-core.atlassian.net/wiki/spaces/FE/pages/377618677/Requests+to+Chronicles+API#RequeststoChroniclesAPI-SearchrequesttoChroniclesAPI
[5]: https://toptal-core.atlassian.net/wiki/spaces/ROGUE/pages/314245592/Chronicles+service
[6]: https://toptal-core.atlassian.net/wiki/spaces/FE/pages/378470591/Chronicles+JSON+scheme+and+payload+structure
