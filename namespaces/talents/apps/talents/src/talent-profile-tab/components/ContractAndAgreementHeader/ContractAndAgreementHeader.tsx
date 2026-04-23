import React, { ReactNode } from 'react'
import { Container, Typography, Tooltip } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Link as LinkType } from '@staff-portal/graphql/staff'

interface Props {
  webResource: LinkType
  actions?: ReactNode
}

const isSemiMonthly = (text: string) =>
  text.toLowerCase().startsWith('semi-monthly')

const ContractAndAgreementHeader = ({ webResource, actions }: Props) => {
  return (
    <Container flex alignItems='center' justifyContent='space-between'>
      <Typography variant='heading' weight='semibold' size='small'>
        {webResource.url ? (
          <Tooltip
            disableListeners={!isSemiMonthly(webResource.text)}
            content='Warning: talent email might not be available due to delayed communication tracking processing.'
          >
            <Link href={webResource.url} data-testid='document-link'>
              {webResource.text}
            </Link>
          </Tooltip>
        ) : (
          webResource.text
        )}
      </Typography>
      {actions && <span>{actions}</span>}
    </Container>
  )
}

export default ContractAndAgreementHeader
