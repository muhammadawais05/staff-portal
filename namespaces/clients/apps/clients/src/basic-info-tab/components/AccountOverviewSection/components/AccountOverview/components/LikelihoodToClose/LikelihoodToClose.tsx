import React from 'react'
import { Container, Button, Pencil16, Typography } from '@toptal/picasso'
import { isNumber } from '@toptal/picasso/utils'
import { Operation } from '@staff-portal/operations'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../../../data'
import { useUpdateLikelihoodToCloseModal } from './hooks'

interface Props {
  operation: CompanyOverviewFragment['operations']['updateClientLikelihoodToClose']
  value: CompanyOverviewFragment['likelihoodToClose']
  clientId: string
}

const LikelihoodToClose = ({ operation, value, clientId }: Props) => {
  const { showModal } = useUpdateLikelihoodToCloseModal(clientId)

  /**
   * TODO extract this component as EditableField
   * https://toptal-core.atlassian.net/browse/SPB-2634
   */
  return (
    <Container flex alignItems='flex-start'>
      <Container right='xsmall'>
        <Typography
          weight='semibold'
          size='medium'
          data-testid='LikelihoodToClose-viewer'
        >
          {isNumber(value) ? `${value}%` : NO_VALUE}
        </Typography>
      </Container>
      <Operation
        inline={false}
        operation={operation}
        render={disabled => (
          <Button.Circular
            disabled={disabled}
            icon={<Pencil16 color='dark-grey' />}
            onClick={showModal}
            variant='transparent'
            data-testid='LikelihoodToClose-toggle-button'
          />
        )}
      />
    </Container>
  )
}

export default LikelihoodToClose
