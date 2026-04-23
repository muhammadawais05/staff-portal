import React from 'react'
import {
  Button,
  Container,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import { NO_VALUE } from '@staff-portal/config'

import UpdateSourcingRequestSpecialistModal from '../UpdateSourcingRequestSpecialistModal/UpdateSourcingRequestSpecialistModal'

export interface Props {
  talentSpecialistFullName?: string | null
  talentSpecialistUrl?: string | null
  sourcingRequestId: string
  talentSpecialistId?: string | null
  jobId: string
  operation?: OperationType
}

const SourcingRequestSpecialistField = ({
  talentSpecialistFullName,
  talentSpecialistUrl,
  sourcingRequestId,
  talentSpecialistId,
  jobId,
  operation
}: Props) => {
  const { showModal } = useModal(UpdateSourcingRequestSpecialistModal, {
    jobId,
    talentSpecialistId,
    sourcingRequestId,
    talentSpecialistFullName
  })

  const hasTalentSpecialist = Boolean(talentSpecialistFullName)

  return (
    <Container>
      <Container data-testid='sourcing-request-specialist-root'>
        <Container flex justifyContent='space-between'>
          {!hasTalentSpecialist ? (
            <Typography size='medium'>{NO_VALUE}</Typography>
          ) : (
            <TypographyOverflow
              size='medium'
              tooltipContent={talentSpecialistFullName}
            >
              <LinkWrapper
                wrapWhen={Boolean(talentSpecialistUrl)}
                href={talentSpecialistUrl as string}
                target='_blank'
              >
                {talentSpecialistFullName}
              </LinkWrapper>
            </TypographyOverflow>
          )}
          <Container>
            <Operation
              operation={operation}
              render={disabled => (
                <Button
                  size='small'
                  variant='secondary'
                  onClick={showModal}
                  disabled={disabled}
                  data-testid='sourcing-request-specialist-edit-button'
                >
                  Edit
                </Button>
              )}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default SourcingRequestSpecialistField
