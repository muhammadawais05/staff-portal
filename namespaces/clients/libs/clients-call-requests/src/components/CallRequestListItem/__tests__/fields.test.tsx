import React from 'react'
import MockDate from 'mockdate'
import { render, screen } from '@testing-library/react'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  assertOnTooltipText,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'
import { Scalars } from '@staff-portal/graphql/staff'

import CallRequestListItem from '../CallRequestListItem'
import { createCallRequestMock } from '../../../data/call-request-fragment/mocks'
import { CallRequestFragment } from '../../../data/call-request-fragment'

const EXPECTED_START_TIME_TEST_ID = /item-field: Expected start time/i
const CREATED_AT_TEST_ID = /item-field: Created at/i
const COMPANY_COUNTRY_TEST_ID = /item-field: Company country/i
const CALL_CLAIMER_TEST_ID = /item-field: Call claimer/i
const CALL_TYPE_TEST_ID = /item-field: Call type/i
const COMPANY_APPLIED_AT_TEST_ID = /item-field: Company applied at/i
const CALL_CLAIMED_AT_TEST_ID = /item-field: Call claimed at/i
const STATUS_TEST_ID = /item-field: Status/i
const COMPANY_TEST_ID = /^item-field: Company$/i
const COMPANY_TIME_ZONE_TEST_ID = /item-field: Company time zone/i
const PURPOSE_TEST_ID = /item-field: Purpose/i
const JOB_TEST_ID = /item-field: Job/i

const arrangeTest = (data: CallRequestFragment) => {
  render(
    <TestWrapperWithMocks>
      <CallRequestListItem data={data} />
    </TestWrapperWithMocks>
  )
}

describe('Call Request List Item', () => {
  it('should display all of its regular fields when populated', async () => {
    const createdAt: Scalars['Time'] = '2020-03-03T10:30:00+02:00'
    const requestedStartTime: Scalars['Time'] = '2020-03-03T23:30:00+02:00'
    const claimedAt: Scalars['Time'] = '2020-02-03T22:30:00+02:00'
    const clientCreatedAt: Scalars['Time'] = '2020-03-02T13:30:00+02:00'

    const CALL_REQUEST_NAME = 'Rolando Brown'
    const CLAIMER_ID = '1001'
    const TYPE = 'instant'
    const STATUS = 'pending'
    const CLAIMER_NAME = 'John Hopkins'
    const COMPANY_NAME = 'Pfeffer-Murray SP'
    const COMPANY_PHOTO = 'https://uploads-staging.toptal.io/icon.png'
    const COMPANY_COUNTRY = 'Reunion'
    const COMPANY_COUNTRY_ID = '1001'
    const COMPANY_TIME_ZONE = '(UTC-05:00) America - New York'
    const PURPOSE = 'Development'
    const JOB_ID = '4000'
    const JOB_NAME = 'Test Job Name acv12k'

    const callRequestMock = createCallRequestMock()

    arrangeTest(
      createCallRequestMock({
        name: CALL_REQUEST_NAME,
        createdAt,
        requestedStartTime,
        type: TYPE,
        status: STATUS,
        claimer: {
          webResource: {
            text: CLAIMER_NAME
          },
          id: encodeEntityId(CLAIMER_ID, 'Staff'),
          __typename: 'Staff'
        },
        purpose: PURPOSE,
        claimedAt,
        job: {
          id: encodeEntityId(JOB_ID, 'Job'),
          webResource: {
            text: JOB_NAME
          },
          __typename: 'Job'
        },
        client: {
          ...(callRequestMock.client as NonNullable<
            CallRequestFragment['client']
          >),
          id: 'abc123',
          createdAt: clientCreatedAt,
          fullName: COMPANY_NAME,
          photo: {
            ...callRequestMock.client?.photo,
            icon: COMPANY_PHOTO
          },
          country: {
            id: COMPANY_COUNTRY_ID,
            name: COMPANY_COUNTRY,
            __typename: 'Country'
          },
          timeZone: {
            name: COMPANY_TIME_ZONE,
            __typename: 'TimeZone'
          },
          webResource: {}
        }
      })
    )

    expect(screen.getByAltText(COMPANY_NAME)).toHaveAttribute(
      'src',
      COMPANY_PHOTO
    )

    expect(screen.getByText(CALL_REQUEST_NAME)).toBeInTheDocument()
    expect(screen.getByTestId(CREATED_AT_TEST_ID)).toHaveTextContent(createdAt)
    expect(screen.getByTestId(CALL_TYPE_TEST_ID)).toHaveTextContent(
      new RegExp(TYPE, 'i')
    )
    expect(screen.getByTestId(CALL_CLAIMER_TEST_ID)).toHaveTextContent(
      CLAIMER_NAME
    )
    expect(screen.getByTestId(COMPANY_COUNTRY_TEST_ID)).toHaveTextContent(
      COMPANY_COUNTRY
    )
    expect(screen.getByTestId(COMPANY_APPLIED_AT_TEST_ID)).toHaveTextContent(
      clientCreatedAt
    )
    expect(screen.getByTestId(CALL_CLAIMED_AT_TEST_ID)).toHaveTextContent(
      claimedAt
    )
    expect(screen.getByTestId(EXPECTED_START_TIME_TEST_ID)).toHaveTextContent(
      requestedStartTime
    )
    expect(screen.getByTestId(STATUS_TEST_ID)).toHaveTextContent(
      new RegExp(STATUS, 'i')
    )
    expect(screen.getByTestId(COMPANY_TEST_ID)).toHaveTextContent(COMPANY_NAME)
    expect(screen.getByTestId(COMPANY_TIME_ZONE_TEST_ID)).toHaveTextContent(
      COMPANY_TIME_ZONE
    )
    expect(screen.getByTestId(PURPOSE_TEST_ID)).toHaveTextContent(PURPOSE)
    expect(screen.getByTestId(JOB_TEST_ID)).toHaveTextContent(JOB_NAME)
  })

  it('"Claimer", "Company" and "Job" fields should be links to their corresponding pages', async () => {
    const callRequestMock = createCallRequestMock()
    const claimerName = 'CLAIMER_NAME'
    const claimerId = '123'
    const companyName = 'COMPANY_NAME'
    const jobName = 'JOB_NAME'
    const jobId = '123'
    const JOB_URL = 'job_url'
    const COMPANY_URL = 'company_url'
    const CLAIMER_URL = 'claimer_url'

    arrangeTest(
      createCallRequestMock({
        claimer: {
          webResource: {
            url: CLAIMER_URL,
            text: claimerName
          },
          id: encodeEntityId(claimerId, 'Staff'),
          __typename: 'Staff'
        },
        client: {
          ...(callRequestMock.client as NonNullable<
            CallRequestFragment['client']
          >),
          fullName: companyName,
          webResource: {
            url: COMPANY_URL
          }
        },
        job: {
          id: encodeEntityId(jobId, 'Job'),
          webResource: {
            text: jobName,
            url: JOB_URL
          },
          __typename: 'Job'
        }
      })
    )

    const claimerLink = screen.getByText(
      (content, element) =>
        element?.textContent === claimerName && element?.tagName === 'A'
    )
    const companyLink = screen.getByText(
      (content, element) =>
        element?.textContent === companyName && element?.tagName === 'A'
    )
    const jobLink = screen.getByText(
      (content, element) =>
        element?.textContent === jobName && element?.tagName === 'A'
    )

    expect(claimerLink).toHaveAttribute('href', CLAIMER_URL)
    expect(companyLink).toHaveAttribute('href', COMPANY_URL)
    expect(jobLink).toHaveAttribute('href', JOB_URL)
  })

  it('"Call Claimed At" and "Job" fields should be hidden when empty', async () => {
    arrangeTest(
      createCallRequestMock({
        claimedAt: null,
        job: null
      })
    )

    expect(screen.queryByText('Call Claimed At')).not.toBeInTheDocument()
    expect(screen.queryByText('Job')).not.toBeInTheDocument()
  })

  it('"Created At" and "Expected Start Time" fields should display date distance tooltips when hovered', async () => {
    MockDate.set('2019-04-07T10:20:30')

    const createdAt: Scalars['Time'] = '2019-01-07T10:20:30+0000'
    const requestedStartTime: Scalars['Time'] = '2019-06-07T10:20:30+0000'

    arrangeTest(
      createCallRequestMock({
        createdAt,
        requestedStartTime
      })
    )

    const createdAtText = await screen.findByText(createdAt)

    assertOnTooltipText(createdAtText, '3 months ago')

    const requestedStartTimeText = screen.getByText(requestedStartTime)

    assertOnTooltipText(requestedStartTimeText, '2 months from now')
  })

  it('should show limited fields when obscure', async () => {
    const name = 'NAME'

    const callRequest = createCallRequestMock({
      name,
      client: null,
      obscureLead: true
    })

    arrangeTest(callRequest)

    expect(screen.queryByText(name)).not.toBeInTheDocument()
    expect(screen.getByText(/Hidden company/i)).toBeInTheDocument()
    expect(screen.getByText(/Created at/i)).toBeInTheDocument()
    expect(screen.queryByText(CALL_TYPE_TEST_ID)).not.toBeInTheDocument()
    expect(screen.queryByText(CALL_CLAIMER_TEST_ID)).not.toBeInTheDocument()
    expect(screen.queryByText(COMPANY_COUNTRY_TEST_ID)).not.toBeInTheDocument()
    expect(
      screen.queryByText(COMPANY_APPLIED_AT_TEST_ID)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(CALL_CLAIMED_AT_TEST_ID)).not.toBeInTheDocument()
    expect(screen.getByText(/Expected start time/i)).toBeInTheDocument()
    expect(screen.queryByText(STATUS_TEST_ID)).not.toBeInTheDocument()
    expect(screen.queryByText(COMPANY_TEST_ID)).not.toBeInTheDocument()
    expect(
      screen.queryByText(COMPANY_TIME_ZONE_TEST_ID)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(PURPOSE_TEST_ID)).not.toBeInTheDocument()
    expect(screen.queryByText(JOB_TEST_ID)).not.toBeInTheDocument()
  })
})
