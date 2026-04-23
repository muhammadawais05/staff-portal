import React, { PropsWithChildren } from 'react'
import { Info16, Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import SignOnBonusIcon from './SignOnBonusIcon'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Info16: jest.fn(),
  Tooltip: jest.fn()
}))
jest.mock('@staff-portal/date-time-utils', () => ({
  parseAndFormatDateTime: jest.fn()
}))

const Info16Mock = Info16 as unknown as jest.Mock
const TooltipMock = Tooltip as unknown as jest.Mock
const parseAndFormatDateTimeMock = parseAndFormatDateTime as jest.Mock

const componentImplementation = ({ children }: PropsWithChildren<unknown>) => (
  <>{children}</>
)

describe('SignOnBonusIcon', () => {
  it('renders as expected', () => {
    const date = 'date'
    const dateTime = 'dateTime'
    const predictedTimeZone = {
      value: 'predictedTimeZone.value',
      name: 'predictedTimeZone.name'
    }

    Info16Mock.mockReturnValue(null)
    TooltipMock.mockImplementation(componentImplementation)
    parseAndFormatDateTimeMock.mockReturnValue(dateTime)

    render(
      <TestWrapper>
        <SignOnBonusIcon date={date} predictedTimeZone={predictedTimeZone} />
      </TestWrapper>
    )

    expect(parseAndFormatDateTimeMock).toHaveBeenCalledWith('date', {
      timeZone: 'predictedTimeZone.value'
    })
    expect(Info16Mock).toHaveBeenCalledWith(
      {
        color: 'dark-grey'
      },
      {}
    )
    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: `At the talent time zone: ${dateTime} ${predictedTimeZone?.name}`
      }),
      {}
    )
  })
})
