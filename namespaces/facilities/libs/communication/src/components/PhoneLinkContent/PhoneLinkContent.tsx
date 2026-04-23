import React, { ReactNode } from 'react'
import { Button } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  phoneContactValue?: string
  renderPhoneContact?: () => ReactNode
  'aria-label'?: string
  onClick?: () => void
  loading: boolean
}

/**
 *
 * @param phoneContactValue - it is always a string value that is also passed to the mutation
 * @param renderPhoneContact - it is a react node that will override string value to display to user
 * @param -
 */
const PhoneLinkContent = ({
  phoneContactValue,
  renderPhoneContact,
  'aria-label': ariaLabel,
  loading,
  onClick
}: Props) => (
  <Button.Action
    aria-label={ariaLabel}
    css={S.phoneLink}
    data-testid='PhoneLink'
    loading={loading}
    onClick={onClick}
  >
    {renderPhoneContact ? renderPhoneContact() : phoneContactValue}
  </Button.Action>
)

export default PhoneLinkContent
