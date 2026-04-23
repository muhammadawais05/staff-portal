import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import EmailOptionsSection, { Props } from './EmailOptionsSection'

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <EmailOptionsSection {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('EmailOptionsSection', () => {
  it('renders `Do not send email` radio option', () => {
    arrangeTest({
      hasToptalProjects: false
    })

    expect(screen.getByText('Do not send email')).toBeInTheDocument()
  })

  describe('when `claimer` is set', () => {
    it('renders `Matcher` radio option', () => {
      arrangeTest({
        claimer: {
          id: '123',
          fullName: 'Timofei Kachalov'
        },
        hasToptalProjects: false
      })

      expect(screen.getByText('Matcher (Timofei Kachalov)')).toBeInTheDocument()
    })
  })

  describe('when `client partner` is set', () => {
    it('renders `Client Partner` radio option', () => {
      arrangeTest({
        clientPartner: {
          id: '123',
          fullName: 'Timofei Kachalov'
        },
        hasToptalProjects: false
      })

      expect(
        screen.getByText('Client Partner (Timofei Kachalov)')
      ).toBeInTheDocument()
    })
  })

  describe('when `isToptalProjects` is `true`', () => {
    it('renders error text', () => {
      arrangeTest({
        hasToptalProjects: true
      })

      expect(
        screen.getByText('You cannot send a Talent Pitch for a Projects Jobs')
      ).toBeInTheDocument()
    })
  })

  describe('when `isToptalProjects` is `false`', () => {
    it('does not render error text', () => {
      arrangeTest({
        hasToptalProjects: false
      })

      expect(
        screen.queryByText('You cannot send a Talent Pitch for a Projects Jobs')
      ).not.toBeInTheDocument()
    })
  })
})
