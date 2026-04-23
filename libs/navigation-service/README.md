# Navigation service

Service contains util functions, components, hooks for navigation

## FAQ

### How query-string helpers should work with arrays?

To be compatible with the platform we want to parse/stringify query params in
the same way as the platform. If we want to set
`cumulative_statuses: ['applied', 'paused']` to query-string we should do it
only this way:

- `?cumulative_statuses[]=applied&cumulative_statuses[]=pausedBecause`

methods below don’t work for the platform:

- `?cumulative_statuses=applied,paused`
- `?cumulative_statuses=applied&cumulative_statuses=paused`

You can play around with these query options on the platform's talents page
using checkbox filters.
