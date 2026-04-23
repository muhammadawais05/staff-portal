import React from 'react'
import { Container } from '@toptal/picasso'
import { PhoneCategory } from '@staff-portal/graphql/staff'

import { RenderPhoneLink, Props } from '../RenderPhoneLink/RenderPhoneLink'
import {
  PHONE_CATEGORY_TITLES,
  ADDITIONAL_PHONE_CATEGORY_TITLES
} from '../../constants'
import { AdditionalPhoneCategory } from '../../types'

const PhoneContactViewItem = (props: Props) => {
  const { phoneCategory } = props

  return (
    <Container flex inline gap='xsmall'>
      <Container data-testid='PhoneContactViewItem-label'>
        {phoneCategory === AdditionalPhoneCategory.BILLING
          ? ADDITIONAL_PHONE_CATEGORY_TITLES[phoneCategory]
          : PHONE_CATEGORY_TITLES[phoneCategory || PhoneCategory.OTHER]}
        :
      </Container>
      <Container>
        <RenderPhoneLink {...props} />
      </Container>
    </Container>
  )
}

export default PhoneContactViewItem
