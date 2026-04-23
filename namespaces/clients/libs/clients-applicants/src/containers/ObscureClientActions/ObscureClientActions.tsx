import React from 'react'
import { ClientFragment } from '@staff-portal/clients'

import CreateClaimerButton from '../CreateClaimerButton/CreateClaimerButton'

interface Props {
  company: ClientFragment
}

const ObscureClientActions = ({
  company: {
    id,
    operations: { createClientClaimer }
  }
}: Props) => (
  <CreateClaimerButton companyId={id} operation={createClientClaimer} />
)

export default ObscureClientActions
