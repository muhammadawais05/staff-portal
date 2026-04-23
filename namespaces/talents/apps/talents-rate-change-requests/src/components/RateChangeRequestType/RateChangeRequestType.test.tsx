import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'

import RateChangeRequestType from './RateChangeRequestType'

const arrangeTest = ({
  requestTypeEnumValue,
  engagementLink
}: {
  requestTypeEnumValue: string
  engagementLink?: string
}) =>
  render(
    <TestWrapper>
      <RateChangeRequestType
        engagementLink={engagementLink}
        requestTypeEnumValue={requestTypeEnumValue}
      />
    </TestWrapper>
  )

describe('RateChangeRequestType', () => {
  describe('when requestTypeEnumValue is "consultation"', () => {
    it('renders label', () => {
      arrangeTest({
        requestTypeEnumValue: RateChangeRequestTypeEnum.CONSULTATION
      })

      expect(screen.getByText('Consultation')).toBeInTheDocument()
    })
  })

  describe('when requestTypeEnumValue is "future_engagements"', () => {
    it('renders label', () => {
      arrangeTest({
        requestTypeEnumValue: RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS
      })

      expect(
        screen.getByText('Future engagement rate change')
      ).toBeInTheDocument()
    })
  })

  describe('when requestTypeEnumValue is "current_engagement"', () => {
    it('renders label with link to engagement', () => {
      arrangeTest({
        requestTypeEnumValue: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT,
        engagementLink: 'https://test.com'
      })

      expect(screen.getByText('Active engagement')).toHaveAttribute(
        'href',
        'https://test.com'
      )
    })
  })
})
