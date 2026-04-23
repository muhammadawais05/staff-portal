import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { CompanyRepresentativePhoneInput } from '@staff-portal/graphql/staff'

import { phoneCategorySelect } from './styles'
import { getPhoneCategoryOptions } from '../../services'

type Props = {
  itemIndex: number
  disabled: boolean
  items?: CompanyRepresentativePhoneInput[]
  formName: string
  autoFocus?: boolean
}

const PhoneContactEditorItem = ({
  itemIndex,
  disabled,
  items = [],
  formName,
  autoFocus
}: Props) => (
  <Container flex>
    <Container right='small'>
      <Form.Select
        data-testid='phone-contact-editor-item-category'
        options={getPhoneCategoryOptions({
          items,
          itemIndex
        })}
        name={`${formName}.${itemIndex}.phoneCategory`}
        width='full'
        size='small'
        disabled={disabled}
        css={phoneCategorySelect}
      />
    </Container>
    <Container>
      <Form.Input
        data-testid='phone-contact-editor-item-phone'
        name={`${formName}.${itemIndex}.value`}
        disabled={disabled}
        size='small'
        width='shrink'
        autoFocus={autoFocus}
        required
      />
    </Container>
  </Container>
)

export default PhoneContactEditorItem
