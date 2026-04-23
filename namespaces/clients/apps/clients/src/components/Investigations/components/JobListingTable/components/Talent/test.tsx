import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import Talent from '.'

const arrangeTest = (props: ComponentProps<typeof Talent>) =>
  render(
    <TestWrapper>
      <Talent {...props} />
    </TestWrapper>
  )

describe('Talent', () => {
  describe('when there are no talents passed', () => {
    it('returns placeholder', () => {
      arrangeTest({
        talentsCount: 0,
        talents: []
      })

      expect(screen.getByTestId('Talent-text')).toHaveTextContent(NO_VALUE)
    })
  })

  describe('when there is one talent', () => {
    it('returns link to talent profile page', () => {
      const talent = {
        id: 'VjEtVGFsZW50LTEyMDQwNzE',
        fullName: 'Rusty Predovic',
        webResource: {
          text: '123',
          url: 'https://staging.toptal.net/platform/staff/talents/1204071'
        }
      }

      arrangeTest({
        talentsCount: 1,
        talents: [talent]
      })

      const link = screen.getByTestId('Talent-link')

      expect(link).toHaveAttribute('href', talent.webResource.url)
      expect(link).toHaveTextContent(talent.fullName)
    })
  })

  describe('when there are multiple talents', () => {
    it("returns 'Multiple'", () => {
      arrangeTest({
        talentsCount: 2,
        talents: [
          {
            id: 'VjEtVGFsZW50LTEyMDQwNzE',
            fullName: 'Rusty Predovic',
            webResource: {
              text: '123',
              url: 'https://staging.toptal.net/platform/staff/talents/1204071'
            }
          },
          {
            id: 'VjEtVGFsZW50LTEyMDQwNzA',
            fullName: 'Bridgette Cormier',
            webResource: {
              text: '123',
              url: 'https://staging.toptal.net/platform/staff/talents/1649069'
            }
          }
        ]
      })

      expect(screen.getByTestId('Talent-text')).toHaveTextContent('Multiple')
    })
  })
})
