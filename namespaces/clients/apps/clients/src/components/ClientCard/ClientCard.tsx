import { Section } from '@toptal/picasso'
import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ClientFragment, CLIENT_UPDATED } from '@staff-portal/clients'

import { useGetLazyClient } from './data/get-lazy-client'
import { ClientCardContent } from './components/ClientCardContent'
import { ClientCardType } from './utils/get-clients-configuration'
import { ClientCardActions } from './components/ClientCardActions'
import { ClientCardTitle } from './components/ClientCardTitle'
import { ClientCardHeader } from './components/ClientCardHeader'

export interface Props {
  client: ClientFragment
  type: ClientCardType
}

export const ClientCard = ({ client, type }: Props) => {
  const currentUser = useGetCurrentUser()
  const [refetchCompanyApplicant] = useGetLazyClient({
    id: client.id,
    isClientsList: type === 'client'
  })

  // TODO: remove message listener, once the problem would be investigated
  // https://toptal-core.atlassian.net/browse/SPB-2852
  useMessageListener(
    [CLIENT_UPDATED],
    ({ companyId }) => companyId === client.id && refetchCompanyApplicant()
  )

  return (
    <Section
      variant='withHeaderBar'
      title={<ClientCardTitle client={client} />}
      actions={<ClientCardActions client={client} type={type} />}
      data-testid='company-item'
    >
      <ClientCardHeader client={client} />
      <ClientCardContent
        client={client}
        type={type}
        timeZone={currentUser?.timeZone?.value}
      />
    </Section>
  )
}
