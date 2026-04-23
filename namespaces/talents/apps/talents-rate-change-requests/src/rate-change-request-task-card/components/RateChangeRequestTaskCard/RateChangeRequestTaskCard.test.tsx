import { screen, render } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TaskCardConfig } from '@staff-portal/tasks-cards'
import { TaskWithOptionalMetadata } from '@staff-portal/tasks'
import { ColoredStatus, DescriptionFormatter } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import {
  RateChangeRequestItemActions,
  RateChangeRequestValue
} from '../../../components'
import { createRateChangeRequestMock } from '../../../data/rate-change-request-fragment/mocks'
import { useGetRateChangeRequest } from './data'
import RateChangeRequestTaskCard from '.'

jest.mock('./data', () => ({
  useGetRateChangeRequest: jest.fn()
}))
jest.mock('../../../components/RateChangeRequestItemActions')
jest.mock('../../../components/RateChangeRequestValue')
jest.mock('../../../utils', () => ({
  getRequestTypeLabel: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ColoredStatus: jest.fn(),
  DescriptionFormatter: jest.fn()
}))
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  parseAndFormatDate: jest.fn()
}))

const useGetRateChangeRequestMock = useGetRateChangeRequest as jest.Mock
const RateChangeRequestItemActionsMock =
  RateChangeRequestItemActions as jest.Mock
const RateChangeRequestValueMock = RateChangeRequestValue as jest.Mock
const ColoredStatusMock = ColoredStatus as jest.Mock
const parseAndFormatDateMock = parseAndFormatDate as jest.Mock
const DescriptionFormatterMock = DescriptionFormatter as unknown as jest.Mock

const arrangeTest = (props: ComponentProps<typeof RateChangeRequestTaskCard>) =>
  render(<RateChangeRequestTaskCard {...props} />)

describe('RateChangeRequestTaskCard', () => {
  const entityId = '1'
  const rateChangeRequest = createRateChangeRequestMock()

  beforeEach(() => {
    useGetRateChangeRequestMock.mockReturnValueOnce({
      data: rateChangeRequest,
      loading: false
    })
    RateChangeRequestItemActionsMock.mockReturnValueOnce(null)
    RateChangeRequestValueMock.mockReturnValueOnce(null)
    ColoredStatusMock.mockReturnValueOnce(null)
    DescriptionFormatterMock.mockReturnValue(null)

    arrangeTest({
      task: {} as TaskWithOptionalMetadata,
      taskCardConfig: {
        entityId
      } as TaskCardConfig
    })
  })

  it('renders header and actions', () => {
    expect(useGetRateChangeRequestMock).toHaveBeenCalledWith(entityId)
    expect(
      screen.getByTestId('rateChangeRequestTaskCardTitle')
    ).toHaveTextContent('Rate Change Request')
    expect(RateChangeRequestItemActionsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        ...rateChangeRequest,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts,
        completeRateChangeRequestOperation:
          rateChangeRequest.operations.completeRateChangeRequest
      }),
      {}
    )
  })

  it('renders "Rate Change Request" field with no rate recommendation', () => {
    expect(
      screen.getByTestId('item-field: Rate Change Request')
    ).toBeInTheDocument()
    expect(RateChangeRequestValueMock).toHaveBeenCalledWith(
      expect.objectContaining({
        currentRate: rateChangeRequest.currentRate,
        desiredRate: rateChangeRequest.desiredRate,
        outcomeRate: rateChangeRequest.outcomeRate,
        rateRecommendationUnauthorized: true
      }),
      {}
    )
  })

  it('renders "Request Type" field', () => {
    expect(screen.getByTestId('item-field: Request Type')).toBeInTheDocument()
    expect(screen.getByText('Consultation')).toBeInTheDocument()
  })

  it('renders "Status" field', () => {
    expect(screen.getByTestId('item-field: Status')).toBeInTheDocument()
    expect(ColoredStatusMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Completed',
        color: 'green'
      }),
      {}
    )
  })

  it('renders "Created at" field', () => {
    expect(screen.getByTestId('item-field: Created at')).toBeInTheDocument()
    expect(parseAndFormatDateMock).toHaveBeenCalledWith(
      rateChangeRequest.createdAt
    )
  })

  it('renders "Talent Contacted at" field', () => {
    expect(
      screen.getByTestId('item-field: Talent Contacted at')
    ).toBeInTheDocument()
    expect(parseAndFormatDateMock).toHaveBeenCalledWith(
      rateChangeRequest.claimedAt
    )
  })

  it('renders "Talent Comment" field', () => {
    expect(screen.getByTestId('item-field: Talent Comment')).toBeInTheDocument()
    expect(DescriptionFormatterMock).toHaveBeenCalledWith(
      expect.objectContaining({
        text: rateChangeRequest.talentComment
      }),
      {}
    )
  })

  it('renders "Reviewer Comment" field', () => {
    expect(
      screen.getByTestId('item-field: Reviewer Comment (internal)')
    ).toBeInTheDocument()
    expect(DescriptionFormatterMock).toHaveBeenCalledWith(
      expect.objectContaining({
        text: rateChangeRequest.claimerComment
      }),
      {}
    )
  })
})
