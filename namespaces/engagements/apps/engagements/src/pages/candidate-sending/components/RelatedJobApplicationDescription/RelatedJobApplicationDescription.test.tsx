import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import RelatedJobApplicationDescription from './RelatedJobApplicationDescription'

jest.mock(
  '../RelatedJobApplicationSubject/RelatedJobApplicationSubject',
  () => ({
    __esModule: true,
    default: () => 'subject'
  })
)
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getDateDistanceFromNow: () => '1 day ago'
}))

const renderComponent = (
  props: ComponentProps<typeof RelatedJobApplicationDescription>
) =>
  render(
    <TestWrapper>
      <RelatedJobApplicationDescription {...props} />
    </TestWrapper>
  )

describe('RelatedJobApplicationSection', () => {
  describe('when `performer` type is `TalentPartner`', () => {
    it('renders text with talent `webResource`', () => {
      const { container } = renderComponent({
        relatedJobApplication: {
          performer: {
            __typename: 'TalentPartner',
            id: '111',
            webResource: {
              text: 'Victorina McGlynn',
              url: 'https://staging.toptal.net/platform/staff/talents/111'
            }
          },
          talent: {
            id: '222',
            webResource: {
              url: 'https://staging.toptal.net/platform/staff/talents/222',
              text: 'Victorina McGlynn'
            }
          },
          createdAt: '2022-03-06T07:07:10+03:00'
        } as unknown as RelatedJobApplicationFragment
      })

      expect(container.textContent).toContain(
        'subject suggested Victorina McGlynn to the job 1 day ago'
      )
    })
  })

  describe('when `performer` type is not `TalentPartner`', () => {
    it('renders text without talent `webResource`', () => {
      const { container } = renderComponent({
        relatedJobApplication: {
          performer: {
            __typename: 'Talent',
            id: '1342789',
            webResource: {
              text: 'Victorina McGlynn',
              url: 'https://staging.toptal.net/platform/staff/talents/1342789',
              __typename: 'Link'
            }
          },
          createdAt: '2022-03-06T07:07:10+03:00'
        } as unknown as RelatedJobApplicationFragment
      })

      expect(container.innerHTML).toContain(
        'subject applied to the job 1 day ago'
      )
    })
  })

  describe('when `hasComment` equals `true`', () => {
    it('renders text with comment suffix', () => {
      const { container } = renderComponent({
        hasComment: true,
        relatedJobApplication: {
          performer: {
            __typename: 'Talent',
            id: '1342789',
            webResource: {
              text: 'Victorina McGlynn',
              url: 'https://staging.toptal.net/platform/staff/talents/1342789',
              __typename: 'Link'
            }
          },
          createdAt: '2022-03-06T07:07:10+03:00'
        } as unknown as RelatedJobApplicationFragment
      })

      expect(container.innerHTML).toContain(
        'subject applied to the job 1 day ago with this comment:'
      )
    })
  })

  describe('when `hasComment` does not exist', () => {
    it('renders text without comment suffix', () => {
      const { container } = renderComponent({
        relatedJobApplication: {
          performer: {
            __typename: 'Talent',
            id: '1342789',
            webResource: {
              text: 'Victorina McGlynn',
              url: 'https://staging.toptal.net/platform/staff/talents/1342789',
              __typename: 'Link'
            }
          },
          createdAt: '2022-03-06T07:07:10+03:00'
        } as unknown as RelatedJobApplicationFragment
      })

      expect(container.innerHTML).toContain(
        'subject applied to the job 1 day ago'
      )
    })
  })
})
