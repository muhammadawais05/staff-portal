import React from 'react'
import { Container } from '@toptal/picasso'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { AddVerticalForm } from '../../components'

const AddVertical = () => {
  return (
    <ContentWrapper title='Create Vertical'>
      <Container bottom='large'>
        <AddVerticalForm />
      </Container>
    </ContentWrapper>
  )
}

export default AddVertical
