import React from 'react'
import { render } from '@testing-library/react'
import { useScreenersSetting } from '@staff-portal/talents-profile'
import { TestWrapper } from '@staff-portal/test-utils'
import { reloadPage } from '@staff-portal/navigation'

import ScreenersViewMenuItem from './ScreenersViewMenuItem'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  reloadPage: jest.fn()
}))

const reloadPageMock = reloadPage as jest.Mock

jest.mock('@staff-portal/talents-profile/src/hooks', () => ({
  useScreenersSetting: jest.fn()
}))

const useScreenersSettingMock = useScreenersSetting as jest.Mock
const setScreenersSetting = jest.fn()

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ScreenersViewMenuItem />
    </TestWrapper>
  )

describe('ScreenersViewMenuItem', () => {
  it('label click sets value opposite to current', () => {
    useScreenersSettingMock.mockReturnValue({
      screenersSetting: true,
      setScreenersSetting
    })
    const { getByTestId } = arrangeTest()

    getByTestId('screener-view-label').click()

    expect(setScreenersSetting).toHaveBeenCalledWith(false)
  })

  it('switch click sets value opposite to current', () => {
    useScreenersSettingMock.mockReturnValue({
      screenersSetting: false,
      setScreenersSetting
    })
    const { getByTestId } = arrangeTest()

    getByTestId('screeners-view-switch').click()

    expect(setScreenersSetting).toHaveBeenCalledWith(true)
  })

  it('reloads page', () => {
    useScreenersSettingMock.mockReturnValue({
      screenersSetting: false,
      setScreenersSetting
    })
    const { getByTestId } = arrangeTest()

    getByTestId('screeners-view-switch').click()

    expect(reloadPageMock).toHaveBeenCalledTimes(1)
  })
})
