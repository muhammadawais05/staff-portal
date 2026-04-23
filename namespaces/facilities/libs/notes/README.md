# Notes Module

This module implements a generic note functionality used in `Talent Profile`,
`Company Profile` and `Task Timeline`.

## Module Structure

This module follows the folder structure described
[here](https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1210548601/Folder+Structure):

```bash
src/modules/notes
├── components
│   ├── GenericNoteItem
│   ├── CreateNoteForm
│   ├── EditNoteModal
│   ├── NoteForm...
│   ├── Note...
│   ├── Note
│   └── index.ts
├── data
│   ├── ...
│   └── index.ts
├── utils
│   ├── ...
│   └── index.ts
├── config.ts
├── types.ts
├── README.md
└── index.ts
```

`index.ts` file contains all exports for staff-portal usage.
`index.externals.ts` contains all exports to use Notes outside Staff Portal
(e.g. in billing-frontend).

## Module Usage

### Making a Query

An entity that you would like to fetch the Notes for may implement its own API,
so you should check it before making a query.

Pay attention to 3 main things:

- `ID` of an entity
- `Order` which will be applied to an entity
- `Operations` available to be performed on an entity

Good examples are provided for
[Talents](src/modules/talents/notes-tab/components/NotesTab/data) and
[CompanyApplicants](src/modules/companies/notes-tab/components/NoteSection/data).

It is very important to return `...restOptions` or just `refetch` method from
the query hook. It will be needed later for data refetching when a note list is
updated.

```ts
import { NOTE_FRAGMENT, NOTE_OPERATION_FRAGMENT } from '@staff-portal/notes'

export const GET_OBJECT_NOTES = gql`
  query GetObjectNotes($objectId: ID!) {
    object(id: $objectId) {
      ... on Object {
        notes(order: { field: UPDATED_AT, direction: DESC }) {
          operations {
            createNote {
              ...NoteOperationFragment
            }
          }
          nodes {
            ...NoteFragment
          }
        }
      }
    }
  }

  ${NOTE_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
`

export const useGetObjectNotes = variables => {
  const { data, error, ...restOptions } = useQuery(GET_OBJECT_NOTES, {
    variables
  })

  return {
    notes: data?.object?.notes?.nodes,
    error,
    ...restOptions
  }
}
```

### Building a Component

```jsx
import { NoteItem, NoteSkeletonLoader } from '@staff-portal/notes'

const {
  loading,
  error,
  notes,
  refetch: refetchNotes
} = useGetObjectNotes({
  ObjectId
})

if (loading) {
  return <NoteTabSkeletonLoader />
}

return (
  <>
    {data.notes.nodes.map(note => (
      <NoteItem note={note} onNoteDelete={refetchNotes} />
    ))}
  </>
)
```

### The Internal Structure

`NoteItem` is based on the `GenericNoteItem` and provides a complete
representation of a note:

```jsx
const NoteItem = ({ note, ...rest }) => (
  <GenericNoteItem note={note} {...rest}>
    <Note.Content note={note} />
  </GenericNoteItem>
)
```

`GenericNoteItem` provides the common representation of a note:

```tsx
const GenericNoteItem = ({ children, ...rest }) => (
  <Note>
    <Note.Header>
      <Note.Title />
      <Note.Actions>
        <Note.EditButton />
        <Note.DeleteButton />
      </Note.Actions>
    </Note.Header>

    <Note.Info />
    <Note.Body>{children}</Note.Body>
    <Note.Attachment />
  </Note>
)
```

In the `GenericNoteItem` we have `<Note.EditButton/>` and `<Note.DeleteButton/>`
components which provide a UI functionality to run the GQL mutation for the
specific action. Actions are based on `Modal` and `Operations` components, as
well as many actions in the project.

`<Note.Content>` which is actually `<NoteContent>` provides different
representation for different cases:

```tsx
const NoteContent: FunctionComponent<NoteContentProps> = ({ note }) => {
  const { newSalesCall } = note

  if (newSalesCall) {
    return <NoteNewSalesCallContent note={note} />
  }

  return <NoteQuestionsAndAnswersContent note={note} />
}
```

### Creating a New Note

To create a new note you have to pass:

Required params:

- `nodeId` an ID of a notable entity

Optional:

- `answers` - default values can be taken from API
- `softSkills`- default values can be taken from API
- `verticalId` an ID to pass to
  `useGetTalentSkillsAutocomplete({ ..., verticalId })`

```tsx
import { useGetDefaultNoteAnswers, useGetSoftSkills } from '@staff-portal/talents'

const talentId = useEncodedIdParam('Talent')
const { data: { vertical: { id: verticalId }} } = useGetTalentNotes(talentId)

const { answers } = useGetDefaultNoteAnswers({ talentId, noteType })
const { softSkills } = useGetSoftSkills()

<CreateNoteForm
  nodeId={talentId}
  answers={answers}
  softSkills={softSkills}
  verticalId={verticalId}
/>
```

### Editing a Note

For editing a note you need only an Id. All required data can be fetched from a
GQL query. Of course for some entities some additional variables may be needed,
for instance `verticalId` like in an example above.

```tsx
<EditNoteModal noteId={noteId} verticalId={verticalId} />
```

More details about the implementation can be learned from the lower-level
components.
