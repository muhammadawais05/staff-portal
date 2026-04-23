import React from 'react'
import {
  render,
  waitForElementToBeRemoved,
  screen,
  waitFor
} from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { useGetTalentPortfolioUrl } from './data/get-talent-portfolio-url'
import TalentPortfolioUrlField from './TalentPortfolioUrlField'
import {
  createGetTalentPortfolioUrlMock,
  createGetTalentPortfolioUrlFailedMock
} from './data/get-talent-portfolio-url/mocks'

const mockShowDevError = jest.fn()

jest.mock('@staff-portal/error-handling', () => ({
  useNotifications: () => ({
    showDevError: mockShowDevError
  })
}))

const TALENT_ID = '123'
const ERROR_MESSAGE = 'Failed fetching talent portfolio url.'

const TestComponent = () => {
  const { showError } = useNotifications()
  const { portfolioUrlData, loading } = useGetTalentPortfolioUrl({
    talentId: TALENT_ID,
    onError: () => showError(ERROR_MESSAGE)
  })

  if (loading) {
    return <>Loading...</>
  }

  return <TalentPortfolioUrlField portfolioUrlData={portfolioUrlData} />
}

const arrangeTest = async (mocks: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestComponent />
    </TestWrapperWithMocks>
  )

  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
}

describe('TalentPortfolioUrlField', () => {
  describe('when the portfolio url was sent by the talent', () => {
    it('renders the field with the portfolio url link', async () => {
      const URL = 'TEST_LINK'

      await arrangeTest([
        createGetTalentPortfolioUrlMock({
          talentId: TALENT_ID,
          portfolio: { url: URL }
        })
      ])

      const link = screen.getByTestId('profile-url')

      expect(link).toHaveAttribute('href', URL)
    })
  })
  describe('when the portfolio url was NOT sent by the talent', () => {
    it('renders no value result', async () => {
      await arrangeTest([
        createGetTalentPortfolioUrlMock({
          talentId: TALENT_ID,
          portfolio: { url: null }
        })
      ])

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })
  describe('when the query fails fetching the portfolio url', () => {
    it('shows an error message', async () => {
      await arrangeTest([
        createGetTalentPortfolioUrlFailedMock({
          talentId: TALENT_ID
        })
      ])

      await expect(() =>
        waitFor(() => {
          expect(mockShowDevError).toHaveBeenCalledWith(ERROR_MESSAGE)
        })
      ).rejects.toThrow()
    })
  })
})
