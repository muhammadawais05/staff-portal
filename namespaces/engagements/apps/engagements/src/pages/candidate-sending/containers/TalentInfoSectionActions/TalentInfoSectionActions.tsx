import React, { useCallback } from 'react'
import { NodeType } from '@staff-portal/graphql'
import { Button, Container } from '@toptal/picasso'
import { PublicLink } from '@staff-portal/talents'
import { Operation } from '@staff-portal/operations'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import { GetTalentInfoDataQuery } from '../../data/get-talent-info-data/get-talent-info-data.staff.gql.types'
import * as S from './styles'

type Props = {
  talent: NonNullable<GetTalentInfoDataQuery['node']>
}

const TalentInfoSectionActions = ({ talent }: Props) => {
  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: talent.id,
    operationVariables: {
      nodeId: talent.emailMessaging?.id ?? '',
      nodeType: NodeType.EMAIL_MESSAGING_ROLE,
      operationName: 'sendEmailTo'
    }
  })

  const handleOnSendEmail = useCallback(
    () => showSendEmailModal(),
    [showSendEmailModal]
  )

  return (
    <Container css={S.alignButtons}>
      {talent.resumeUrl && (
        <Container as='span' right='xsmall'>
          <PublicLink url={talent.resumeUrl}>Public Profile</PublicLink>
        </Container>
      )}

      <Operation
        inline={false}
        operation={talent.emailMessaging?.operations?.sendEmailTo}
        render={operationDisabled => (
          <Container as='span'>
            <Button
              size='small'
              variant='secondary'
              disabled={operationDisabled}
              onClick={handleOnSendEmail}
              data-testid='send-talent-email'
            >
              Send Email
            </Button>
          </Container>
        )}
      />
    </Container>
  )
}

export default TalentInfoSectionActions
