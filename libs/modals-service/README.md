# Modals Service

Modals service manages the modals stack so the developer can focus on the
content of the modal itself.

## How To Use

### Simple static modal

First of all, you have to wrap your application into a `ModalProvider`.

```ts
import { ModalProvider } from '@staff-portal/modals-service'

const MyApp = ({ children }) => {
  const modalRegistry = useModalRegistry()

  return <ModalProvider registry={modalRegistry}>{children}</ModalProvider>
}
```

Then you have to implement the modal component itself. It should specify
`hideModal` callback. This callback will delegate modal hiding to the modals
service, call it when you want the modal to be closed. **Important thing to
note**: `hideModal` should be called at the very end. Once called, the modal
will be disposed and it will no longer have access to any other provided
callbacks. This is done to avoid memory leaks and lapsed references.

```ts
import React, { FC } from 'react'
import { Modal } from '@staff-portal/modals-service'

interface Props {
  hideModal: () => void
}

export const MyModalComponent: FC<Props> = ({ hideModal, ...props }) => (
  <Modal {...props} onClose={hideModal} />
)
```

There is special `useModal` hook that integrates your modal component with the
modals service and it allows to trigger the modal you specified:

```ts
import { useModal } from '@staff-portal/modals-service'
import { MyModalComponent } from './modals'

const MyModalCaller = () => {
  const { showModal } = useModal(MyModalComponent)

  return <div onClick={showModal} />
}
```

### Modal with payload

You can pass payload (i.e. the props) to the modal with `useModal` hook in a
type-safe fashion:

```ts
import React, { FC } from 'react'
import { Modal } from '@staff-portal/modals-service'

interface Props {
  hideModal: () => void
  nodeId: string
  onAction: () => void
}

export const MyModalComponent: FC<Props> = ({
  hideModal,
  onAction,
  ...props
}) => <Modal {...props} onAction={onAction} onClose={hideModal} />
```

```ts
import React, { FC } from 'react'
import { useModal } from '@staff-portal/modals-service'
import { MyModalComponent } from './modals'

interface Props {
  nodeId: string
  onAction: () => void
}

const MyModalCaller: FC<Props> = ({ nodeId, onAction }) => {
  const { showModal } = useModal(MyModalComponent, { nodeId, onAction })

  return <div onClick={showModal} />
}
```

As you may have seen from example, you can pass the callbacks as well.

### Modal with query string integration

Modal service allows to automatically push the modal url to browser history. But
a little bit more boilerplate is required in this case since there are now two
entry-points to our modal, both of which should be type-safe.

That's why we use special modal identifiers which can hold type information. We
then will use this identifier in a `useModal` hook instead of using the modal
component directly.

We need to use `defineModalWithQueryParams` helper to specify such an
identifier. It requires type parameters both for the payload and for the query
params:

```ts
import { defineModalWithQueryParams } from '@staff-portal/modals-service'

const MY_MODAL = defineModalWithQueryParams<
  { nodeId: string },
  { node_id: string }
>('my_modal')
```

Now we need to register this identifier, associate it with the modal component,
and also specify query-string serialization logic. Modal service will guarantee
that type safety is preserved on every step of interaction.

```ts
import { ModalProvider, useModalRegistry } from '@staff-portal/modals-service'
import { MY_MODAL } from './modals'
import { MyModalComponent } from './components/MyModalComponent'
import {
  encodeEntityId,
  decodeEntityId
} from '@staff-portal/data-layer-service'

const MyApp = ({ children }) => {
  const modalRegistry = useModalRegistry()

  modalRegistry.set(MY_MODAL, {
    Component: MyModalComponent,
    queryParams: {
      to: payload => ({
        node_id: decodeEntityId(payload.nodeId)
      }),
      from: (params, { showWarning }) => {
        if (typeof params.node_id !== 'string') {
          return showWarning()
        }

        return {
          nodeId: encodeEntityId(params.node_id, 'NodeType')
        }
      }
    }
  })

  return <ModalProvider registry={modalRegistry}>{children}</ModalProvider>
}
```

As you see, we also specify the query params validation there because we are not
controlling the query params that are coming from the user. Here we can check
that all required params are present and use special `showWarning` helper to
show the warning in case something is missing.

Now we can navigate to any page with specified params (e.g.
`?modal=my_modal&node_id=10`) and the modal will be opened automatically.

But we can also make the service push the modal to history when actually
triggering the modal:

```ts
import { useModal } from '@staff-portal/modals-service'
import { MY_MODAL } from './modals'

const MyModalCaller = ({ nodeId }) => {
  const { showModalWithQueryParams } = useModal(MY_MODAL, { nodeId })

  return <div onClick={showModalWithQueryParams} />
}
```

### Preserving the modal in DOM

By default the modal will be automatically closed once the modal caller is
unmounted. You can change this behavior by providing `leaveOnCallerUnmount`
option to `useModal` hook:

```ts
import { useModalRegistry } from '@staff-portal/modals-service'
import { MyModalComponent } from './components/MyModalComponent'

const MyApp = ({ children }) => {
  const { showModal } = useModal(
    MyModalComponent,
    { nodeId },
    { leaveOnCallerUnmount: true }
  )

  // ...
}
```

This way even if the caller is destroyed for some reason – the modal will stay.

### Legacy hash modals `#modal=`

This approach is used with modals, which should be bound with old-fashioned
`#modal=...` url.

Let's consider an example of usage ClaimClientEnterpriseModal bound with
`#modal=/platform/staff/applicants/clients/${companyId}/claim_enterprise` url.

#### Step 1: Define a modal object

```ts
// modals.ts
import { defineLegacyHashModal } from '@staff-portal/modals-service'

export const CLAIM_CLIENT_ENTERPRISE_MODAL = defineLegacyHashModal<{
  clientId: string
}>('claim_client_enterprise_modal')
```

Generic type parameter must represent part of `ClaimClientEnterpriseModal` props
payload, which is reflected in url. In our case it is `clientId`.

```ts
export interface ClaimClientEnterpriseModalProps {
  clientId: string
  hideModal: () => void
}
```

#### Step 2: Modal registration

```ts
import { ModalProvider, useModalRegistry } from '@staff-portal/modals-service'
import { CLAIM_CLIENT_ENTERPRISE_MODAL } from './modals'
import { ClaimClientEnterpriseModal } from './components/ClaimClientEnterpriseModal'

const MyApp = ({ children }) => {
  const modalRegistry = useModalRegistry()

  registry.set(CLAIM_CLIENT_ENTERPRISE_MODAL, {
    Component: ClaimClientEnterpriseModal,
    pattern:
      /#modal=\/platform\/staff\/applicants\/clients\/(?<clientId>\d+)\/claim_enterprise\/?/,
    mapHashToPayload: ({ clientId }, { showWarning }) => {
      return showWarning()

      if (!clientId) {
        return showWarning()
      }

      return { clientId }
    },
    mapPayloadToHash: ({ clientId }) =>
      `#modal=/platform/staff/applicants/clients/${clientId}/claim_enterprise`
  })

  return <ModalProvider registry={modalRegistry}>{children}</ModalProvider>
}
```

Notes: `pattern` is an RegExp using named groups feature, and groups name
`(?<groupName>...)` much correspond to the payload properties defined on step 1.

⚠️ Avoid using `g` and `y` flags
([details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)).

#### Step 3: Access modal by url

You should be able to access modal now by url, e.g.
`.../clients/535429#modal=/platform/staff/applicants/clients/123/claim_enterprise`.

#### Step 4: Open modal programmatically

```ts
const { showLegacyHashModal } = useModal(CLAIM_CLIENT_ENTERPRISE_MODAL, {
  clientId: '123'
})

showLegacyHashModal()
```
