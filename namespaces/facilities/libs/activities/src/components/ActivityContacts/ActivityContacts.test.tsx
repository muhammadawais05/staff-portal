import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ActivityContacts, { Props } from './ActivityContacts'

const testContacts = [
  {
    webResource: {
      text: 'First Name',
      url: 'https://test1.link',
      __typename: 'Link'
    },
    __typename: 'CompanyRepresentative'
  },
  {
    webResource: {
      text: 'Second Name',
      url: 'https://test2.link',
      __typename: 'Link'
    },
    __typename: 'CompanyRepresentative'
  }
]

const renderTestActivityContacts = (props: Props) => {
  const { contacts } = props

  return render(
    <TestWrapper>
      <ActivityContacts contacts={contacts} />
    </TestWrapper>
  )
}

describe('ActivityContacts', () => {
  const PROPS = {
    contacts: testContacts
  }

  it('should render provided contacts', () => {
    const { getByText } = renderTestActivityContacts(PROPS)

    expect(getByText('First Name')).toBeInTheDocument()
    expect(getByText('Second Name')).toBeInTheDocument()
  })
})
