import React, { useState, ReactElement } from 'react'
import { Section, Button } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import OperationWrapper from '../OperationWrapper'
import { OperationItemFragment } from '../../__fragments__/operationItemFragment.graphql.types'

const displayName = 'InlineSection'

export interface formElementProps {
  isOpenForm: boolean
  onCloseForm: () => void
}

interface InlineSectionProps {
  headerTitle: string
  revealText: string
  showRevealButton: boolean
  'data-testid'?: string
  operation?: OperationItemFragment
  formElement: (data: formElementProps) => ReactElement
  children?: ReactElement
}

const InlineSection = ({
  children,
  headerTitle,
  revealText,
  formElement,
  operation = { callable: OperationCallableTypes.ENABLED, messages: [] },
  showRevealButton,
  'data-testid': dataTestId = displayName
}: InlineSectionProps) => {
  const [isOpenInlineForm, setIsOpenInlineForm] = useState(false)

  const onCloseForm = () => setIsOpenInlineForm(false)

  return (
    <Section
      variant='withHeaderBar'
      title={headerTitle}
      actions={
        showRevealButton && (
          <OperationWrapper operation={operation}>
            <Button
              data-testid='edit'
              onClick={() => setIsOpenInlineForm(true)}
              size='small'
            >
              {revealText}
            </Button>
          </OperationWrapper>
        )
      }
      data-testid={dataTestId}
    >
      {formElement({ isOpenForm: isOpenInlineForm, onCloseForm })}
      {children}
    </Section>
  )
}

export default InlineSection
