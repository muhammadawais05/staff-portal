import {
  Typography,
  Tooltip,
  QuestionMark16,
  Container,
  Loader
} from '@toptal/picasso'
import React, { useState, ReactNode } from 'react'
import { Link } from '@staff-portal/navigation'
import { useModal } from '@staff-portal/modals-service'

import * as S from './styles'
import ApplicationInfoModal from '../ApplicationInfoModal'

export interface Props {
  entityId: string
  tooltipContent?: string
  icon?: ReactNode
}

const ApplicationInfoField = ({ entityId, tooltipContent, icon }: Props) => {
  const [loading, setLoading] = useState(false)
  const { showModal } = useModal(ApplicationInfoModal, {
    entityId,
    onModalOpen: () => setLoading(false)
  })

  const handleClick = () => {
    setLoading(true)
    showModal()
  }

  return (
    <Tooltip
      content={tooltipContent || 'Click for user application details'}
      interactive
    >
      <Container flex alignItems='center' inline>
        <Link data-testid='application-info-field-link' noUnderline>
          <Typography
            css={S.viewDetails}
            color='inherit'
            weight='semibold'
            onClick={handleClick}
            data-testid='application-info-field-text'
          >
            View Details
          </Typography>
        </Link>
        <Container flex left='xsmall'>
          {loading ? (
            <Loader size='small' />
          ) : (
            icon || (
              <QuestionMark16
                color='dark-grey'
                data-testid='application-info-field-question-mark-icon'
              />
            )
          )}
        </Container>
      </Container>
    </Tooltip>
  )
}

export default ApplicationInfoField
