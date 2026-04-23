import React, { ReactNode } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { palette } from '@toptal/picasso/utils'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useGetServerTimeZone } from '@staff-portal/date-time-utils'
import { createGetServerTimeZoneMock } from '@staff-portal/date-time-utils/src/data/get-server-time-zone/mocks'

import ChartTooltip, { Props } from './ChartTooltip'

// We need user time zone data in cache
// `MockedProvider` does not work well with `cache` fetch policies yet
// So this is the best way to achieve it for now
const ChromeDataWrapper = ({ children }: { children: ReactNode }) => {
  const { data } = useGetServerTimeZone()

  return <>{data ? children : null}</>
}

const arrangeTest = ({
  mocks,
  props
}: {
  mocks: MockedResponse[]
  props: Props
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ChromeDataWrapper>
        <ChartTooltip {...props} />
      </ChromeDataWrapper>
    </TestWrapperWithMocks>
  )

describe('ChartTooltip', () => {
  it('always shows received dates as end of corresponding day in server time, and that moment transformed to user time zone', async () => {
    const RAW_DATE = '2020-05-19'
    const DISPLAYED_DATE = 'May 19, 2020 at 11:59 PM'
    const SERVER_TIME_ZONE_NAME = '(UTC-05:00) America - New York'
    const USER_TIME_ZONE_DISPLAYED_DATE = 'May 20, 2020 at 3:59 AM'

    const props = {
      active: true,
      values: { [RAW_DATE]: 0 },
      labels: { role: '', team: '' },
      units: { role: '', team: '' },
      payload: [
        { name: 'role', value: 0, color: palette.blue.main, payload: {} },
        { name: 'team', value: 0, color: palette.yellow.main, payload: {} }
      ]
    }

    const serverTimeZoneMock = createGetServerTimeZoneMock({
      timeZoneName: SERVER_TIME_ZONE_NAME
    })

    const { container } = arrangeTest({
      mocks: [serverTimeZoneMock],
      props
    })

    await waitFor(() => screen.findByText(DISPLAYED_DATE))

    expect(container).toHaveTextContent(
      `Time is displayed in ${serverTimeZoneMock.result.data.viewer.serverTimeZone.name}`
    )
    expect(container).toHaveTextContent(
      `${USER_TIME_ZONE_DISPLAYED_DATE} in your time zone`
    )
  })
})
