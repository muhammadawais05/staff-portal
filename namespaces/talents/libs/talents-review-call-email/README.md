# Communication send email library

This library contains data and components that helps to send an email to another
user (considered a "role" in code) or client.

- Entry point:
  [useSendEmailModal](./send-email-modal/hooks/use-send-email-modal.tsx)

## Example

```tsx
import { useSendEmailModal } from '@staff-portal/communication-send-email'

const SendEmailButton = ({ clientId }: Props) => {
  const { showModal, renderModal, loading } = useSendEmailModal()

  return (
    <>
      <Button loading={loading} onClick={() => showModal(clientId)}>
        Send Email
      </Button>
      {renderModal()}
    </>
  )
}
```

The initially selected template can be specified in `useSendEmailModal()` hook.
If the template with provided identifier is available for the recipient, the
**template** field will have the specified template pre-selected and **subject**
and **body** fields will be updated accordingly.

```tsx
import { useSendEmailModal } from '@staff-portal/communication-send-email'

const SendEmailButton = ({ clientId }: Props) => {
  const { showModal, renderModal, loading } = useSendEmailModal({
    preselectedEmailTemplateId: 'VjEtRW1haWxUZW1wbGF0ZS0xMjI3Mjc'
  })
  ...
}
```

## Variations

We have architected this functionality so that it is easy to create variations
of it. The default variation is built like this (within `useSendEmailModal`):

```tsx
<SendEmailModal
  onClose={hideModal}
  recipient={recipient}
  preselectedEmailTemplateId={preselectedEmailTemplateId}
>
  <EmailTemplatesField />
  <SubjectField />
  <ToField />
  <CCSuggestedField />
  <CCAdditionalField />
  <EmailBodyField />
  <SendEmailPendingTasks />
  <OfacStatusNotification />
  <GoogleAppsAuthNotification />
  <LatestEmailMessageSection />
</SendEmailModal>
```

We are using compound components pattern, where each child component (i.e.
`EmailTemplatesField`) corresponds to a part of the modal and can be used (and
configured) individually within `SendEmailModal`. This allows a high degree of
customization. You can easily create new variants where you exclude some
components or include new ones.

You can add props directly to child components instead of bloating
`SendEmailModal` props. The current exception is that, if it affects the initial
value rendered by the form (i.e. `preselectedEmailTemplateId`), it needs to be
passed to `SendEmailModal`. This is because splitting the calculation of the
initial form value in composable parts is complex. If this limitation becomes
inconvenient, we could further evolve the architecture (not trivial).

## List of current `SendEmailModal` compound components

### EmailTemplatesField

Allows selection for an email template that prefills subject and body fields.

### SubjectField

Input field for the email subject.

### ToField

Allows selection for the main recipient. Only useful in the context of clients
with several representatives.

### CCSuggestedField

Allows easy selection for relevant people to CC the email.

### CCAdditionalField

Allows selection for any staff member to CC.

### EmailBodyField

Input field to type the email body, and button to preview it.

### SendEmailPendingTasks

Section that displays a table of related pending communication tasks if
available, so that they can be finished by sending the email if selected.

### OfacStatusNotification

A notification about a special OFAC status of the recipient if it applies.

### GoogleAppsAuthNotification

A notification about being unauthenticated with Google, needed to send email via
Gmail.

### LatestEmailMessageSection

Displays the latest email with the corresponding recipient in a collapsible
section.
