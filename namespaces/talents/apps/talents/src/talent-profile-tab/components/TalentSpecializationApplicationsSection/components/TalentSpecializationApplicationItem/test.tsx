import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table } from '@toptal/picasso'
import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { formatDate } from '@staff-portal/date-time-utils'

import TalentSpecializationApplicationItem, {
  Props
} from './TalentSpecializationApplicationItem'
import { specializationApplicationsDefaultMocks } from '../../data/get-talent-specialization-applications/mocks'
import { TALENT_SPECIALIZATION_APPLICATION_STATUS_MAPPING } from '../TalentSpecializationApplicationItemStatus'

jest.mock('../RejectSpecializationApplicationButton', () => ({
  __esModule: true,
  default: () => null
}))

const arrangeTest = ({
  item,
  userTimezone
}: Pick<Props, 'item' | 'userTimezone'>) =>
  render(
    <TestWrapperWithMocks mocks={[]}>
      <Table>
        <Table.Body>
          <TalentSpecializationApplicationItem
            item={item}
            userTimezone={userTimezone}
            talentId='abc123'
            talentName='Test Talent Name'
            hasActions
          />
        </Table.Body>
      </Table>
    </TestWrapperWithMocks>
  )

describe('TalentSpecializationApplicationItem', () => {
  it('shows a specialization application item', () => {
    const itemMock = specializationApplicationsDefaultMocks[0]

    const props = {
      item: {
        ...itemMock,
        status: TalentSpecializationApplicationStatus.CANCELLED,
        startedAt: '2020-07-17T12:23:48+03:00',
        completedAt: '2020-07-20T15:47:16+03:00',
        specialization: {
          id: 'VjEtU3BlY2lhbGl6YXRpb24tMQ',
          title: 'Core'
        },
        performer: {
          id: 'test-id',
          webResource: {
            text: 'Juan Sanchez',
            url: 'https://staging.toptal.net/platform/staff/staff/498468'
          }
        }
      },
      userTimezone: 'Europe/Moscow',
      talentId: '123',
      talentName: 'John',
      hasActions: true
    } as const

    arrangeTest(props)

    expect(
      screen.getByText(props.item.specialization.title)
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        TALENT_SPECIALIZATION_APPLICATION_STATUS_MAPPING[props.item.status].text
      )
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('talent-specialization-application-item-started-by')
    ).toHaveAttribute('href', props.item.performer.webResource.url)

    expect(
      screen.getByTestId('talent-specialization-application-item-started-by')
    ).toHaveTextContent(props.item.performer.webResource.text)

    expect(
      screen.getByText(
        formatDate(new Date(props.item.startedAt), {
          timeZone: props.userTimezone
        })
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(formatDate(new Date(props.item.completedAt)))
    ).toBeInTheDocument()
  })

  describe('when the name is empty', () => {
    it('shows an empty value', () => {
      const itemMock = specializationApplicationsDefaultMocks[0]

      const props = {
        item: {
          ...itemMock,
          status: TalentSpecializationApplicationStatus.CANCELLED,
          startedAt: '2020-07-17T12:23:48+03:00',
          completedAt: '2020-07-20T15:47:16+03:00',
          specialization: null,
          performer: {
            id: 'test-id',
            webResource: {
              text: 'Juan Sanchez',
              url: 'https://staging.toptal.net/platform/staff/staff/498468'
            }
          }
        },
        userTimezone: 'Europe/Moscow',
        talentId: '123',
        talentName: 'John',
        hasActions: true
      } as const

      arrangeTest(props)

      expect(screen.getByTestId('empty-name')).toBeInTheDocument()
    })
  })

  describe('when the performer is empty', () => {
    it("shows 'System'", () => {
      const itemMock = specializationApplicationsDefaultMocks[0]

      const props = {
        item: {
          ...itemMock,
          status: TalentSpecializationApplicationStatus.CANCELLED,
          startedAt: '2020-07-17T12:23:48+03:00',
          completedAt: '2020-07-20T15:47:16+03:00',
          specialization: null,
          performer: null
        },
        userTimezone: 'Europe/Moscow',
        talentId: '123',
        talentName: 'John',
        hasActions: true
      } as const

      arrangeTest(props)

      expect(screen.getByText('System')).toBeInTheDocument()
    })
  })
})
