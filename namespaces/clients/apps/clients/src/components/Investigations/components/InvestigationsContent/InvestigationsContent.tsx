import React, { useState } from 'react'
import { Section, Tooltip } from '@toptal/picasso'
import { InlineActionsWrapper } from '@staff-portal/operations'

import {
  Investigation,
  Operations
} from '../../types'
import { InvestigationStartButton } from '../../components'
import InvestigationsList from '../InvestigationsList'
import InvestigationsToggleButton from '../InvestigationsToggleButton'
import * as S from './styles'

interface Props {
  operations?: Operations
  investigations: Investigation[]
  totalCount: number
  companyId: string
}

const InvestigationsContent = ({
  operations,
  totalCount,
  companyId,
  investigations
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSection = () =>
    setIsExpanded(currentIsExpanded => !currentIsExpanded)

  const toggleButton = (
    <InvestigationsToggleButton
      totalCount={totalCount}
      handleClick={toggleSection}
      isExpanded={isExpanded}
    />
  )

  return (
    <Section
      title='Investigations'
      variant='withHeaderBar'
      css={S.investigationsSection({ isExpanded, totalCount })}
      actions={
        <InlineActionsWrapper>
          <InvestigationStartButton
            operation={operations?.createClientInvestigation}
            clientId={companyId}
          />
          {totalCount ? (
            toggleButton
          ) : (
            <Tooltip
              content="This client hasn't had any investigations yet"
              placement='top'
            >
              <span>{toggleButton}</span>
            </Tooltip>
          )}
        </InlineActionsWrapper>
      }
    >
      <InvestigationsList
        isExpanded={isExpanded}
        investigations={investigations}
        companyId={companyId}
        operations={operations}
      />
    </Section>
  )
}

export default InvestigationsContent
