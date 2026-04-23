import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import useEnableTopscreenModal from '../../../topscreen-tab/components/EnableTopscreenModal/hooks/use-enable-topscreen-modal/use-enable-topscreen-modal'

type Props = {
  companyId: string
  operation?: OperationType
}

const EnableTopscreenButton = ({ companyId, operation }: Props) => {
  const { showModal: showEnableTopscreenModal } = useEnableTopscreenModal({
    clientId: companyId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          disabled={disabled}
          onClick={showEnableTopscreenModal}
          data-testid='open-enable-topcreen-modal-button'
        >
          Enable TopScreen
        </Button>
      )}
    />
  )
}

export default EnableTopscreenButton
