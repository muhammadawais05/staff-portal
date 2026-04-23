import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { useField } from '@toptal/picasso-forms'

import ClientNetTermsItem from './ClientNetTermsItem'

const useFieldMock = useField as jest.Mock

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useField: jest.fn()
}))

const renderComponent = () =>
  render(
    <TestWrapper>
      <ClientNetTermsItem />
    </TestWrapper>
  )

describe('ClientNetTermsItem', () => {
  describe('when `companyNetTerms` is `undefined`', () => {
    it('renders component', () => {
      useFieldMock.mockReturnValue({ input: { value: undefined } })

      renderComponent()

      expect(screen.getByText('Upon Receipt')).toBeInTheDocument()
    })
  })

  describe('when `companyNetTerms` is `number`', () => {
    it('renders component', () => {
      useFieldMock.mockReturnValue({ input: { value: 10 } })

      renderComponent()

      expect(screen.getByText('Net 10')).toBeInTheDocument()
    })
  })
})
