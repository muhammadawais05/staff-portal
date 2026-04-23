import React from 'react'
import { render } from '@testing-library/react'

import RedirectToLegacyPage from './RedirectToLegacyPage'
import { useRedirectToLegacy } from '../../hooks'

const PAGE_LOADER_ID = 'page-loader'

jest.mock('@staff-portal/ui', () => ({
  PageLoader: () => <div data-testid={PAGE_LOADER_ID} />
}))

jest.mock('../../hooks', () => ({
  useRedirectToLegacy: jest.fn()
}))

const useRedirectToLegacyMock = useRedirectToLegacy as jest.Mock

const arrangeTest = () => render(<RedirectToLegacyPage />)

describe('RedirectToLegacyPage', () => {
  it('should redirect to legacy and render page loader', () => {
    const redirectToLegacy = jest.fn()

    useRedirectToLegacyMock.mockReturnValue({ redirectToLegacy })

    const { getByTestId } = arrangeTest()

    expect(useRedirectToLegacyMock).toHaveBeenCalled()
    expect(redirectToLegacy).toHaveBeenCalled()
    expect(getByTestId(PAGE_LOADER_ID)).toBeInTheDocument()
  })
})
