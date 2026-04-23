# Timeline module

This sub-module belongs to `Tasks` module. It bootstraps Timeline modal and
button to open it.
[chronicles-frontned](https://github.com/toptal/chronicles-frontend) is used to
show the main timeline component inside this module.

Data in this module will be fetched from 3 different sources: `staff`, `lens`
and `chronicles`.

## TimelineButton

It accepts only the `nodeId` which is the graphQL encoded ID e.g.
`'VjEtQ2xpZW50LTI0OTg3NA'`

```tsx
import { TimelineButton } from '@staff-portal/tasks'

...

<TimelineButton nodeId={company.id} />
```

## TimelineModal

It is used under the hood in `TimelineButton` like so.

```tsx
import { TimelineModal } from '@staff-portal/tasks'

...

const [loading, setLoading] = useState(false)
const { showModal, hideModal, isOpen } = useModal()

return (
  <>
    <Button
      loading={loading}
      onClick={() => {
        showModal()
        setLoading(true)
      }}
    >
      Timeline
    </Button>
    {isOpen && (
      <TimelineModal
        nodeId={nodeId}
        onClose={hideModal}
        onOpen={() => setLoading(false)}
      />
    )}
  </>
)
```
