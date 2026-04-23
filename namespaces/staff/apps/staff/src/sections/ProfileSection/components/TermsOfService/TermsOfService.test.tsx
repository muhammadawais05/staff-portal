import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useUserDateFormatter } from '@staff-portal/current-user'

import TermsOfService from './TermsOfService'

jest.mock('@staff-portal/current-user', () => ({
  useUserDateFormatter: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof TermsOfService>) =>
  render(<TermsOfService {...props} />)

const mockUseUserDateFormatter = useUserDateFormatter as jest.Mock

describe('TermsOfService', () => {
  describe('when tosAcceptedAt is not defined', () => {
    it('renders is not accepted message', () => {
      mockUseUserDateFormatter.mockReturnValueOnce(null)

      const { container } = renderComponent({})

      expect(container.innerHTML).toBe('Not accepted')
    })
  })

  describe('when tosAcceptedAt is defined', () => {
    it('renders accepted on message', () => {
      const text = 'text'
      const tosAcceptedAt = 'tosAcceptedAt'

      mockUseUserDateFormatter.mockReturnValueOnce(() => text)

      const { container } = renderComponent({
        tosAcceptedAt
      })

      expect(container.innerHTML).toBe(`Accepted on ${text}`)
    })
  })
})
