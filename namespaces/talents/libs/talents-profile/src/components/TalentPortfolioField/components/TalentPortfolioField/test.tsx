import React from 'react'
import {
  render,
  waitForElementToBeRemoved,
  screen,
  within,
  waitFor
} from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, assertOnTooltip } from '@staff-portal/test-utils'

import { useGetTalentPortfolio } from '../../data/get-talent-portfolio'
import TalentPortfolioField from './TalentPortfolioField'
import {
  createGetTalentPortfolioMock,
  createGetTalentPortfolioEmptyMock,
  createGetTalentPortfolioFailedMock
} from '../../data/get-talent-portfolio/mocks'
import {
  createTalentPortfolioFile,
  createTalentPortfolioVote
} from '../../data/talent-portfolio-fragment/mocks'
import { createGetTalentStatusMock } from '../../../StatusField/data/get-talent-status/mocks'
import { createGetTalentProfileGeneralDataMock } from '../../../TalentGeneralSection/data/get-talent-profile-general-data/mocks'

const USER_ID = '789'
const TALENT_ID = '123'
const QUERY_ERROR_MESSAGE = 'Failed fetching talent portfolio.'
const mockShowDevError = jest.fn()

jest.mock('../VoteForTalentPortfolioButton', () => ({
  __esModule: true,
  default: () => <div data-testid='vote-button' />
}))

jest.mock('@staff-portal/error-handling', () => ({
  useNotifications: () => ({
    showDevError: mockShowDevError
  })
}))

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: () => ({ id: USER_ID })
}))

const refetchMocks = [
  createGetTalentStatusMock({ talentId: TALENT_ID }),
  createGetTalentProfileGeneralDataMock({ id: TALENT_ID })
]

const TestComponent = () => {
  const { showError } = useNotifications()
  const { portfolioData, loading } = useGetTalentPortfolio({
    talentId: TALENT_ID,
    onError: () => showError(QUERY_ERROR_MESSAGE)
  })

  if (loading) {
    return <>Loading...</>
  }

  return <TalentPortfolioField portfolioData={portfolioData} />
}

const arrangeTest = async (mocks: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={[...mocks, ...refetchMocks]}>
      <TestComponent data-testid='testing' />
    </TestWrapperWithMocks>
  )

  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
}

describe('TalentPortfolioField', () => {
  describe('when the portfolio was NOT sent by the talent', () => {
    it('renders no value as result', async () => {
      await arrangeTest([createGetTalentPortfolioMock({ talentId: TALENT_ID })])
      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })

  describe('when the portfolio field should not be displayed', () => {
    it('renders null as result', async () => {
      await arrangeTest([
        createGetTalentPortfolioEmptyMock({ talentId: TALENT_ID })
      ])
      expect(screen.queryByTestId('portfolio-field')).toBeNull()
    })
  })

  describe('when the portfolio was sent by the talent', () => {
    it('shows the portfolio description', async () => {
      const SPECIALIZATION_TITLE = 'Graphic Design'
      const PORTFOLIO_SENT_DATE = '2021-03-08T07:33:39-06:00'
      const PORTFOLIO_FILE_NAME = 'super-portfolio.pdf'
      const PORTFOLIO_FILE_URL = 'TEST_LINK'
      const PORTFOLIO_DESCRIPTION = `Mar 8, 2021 - ${PORTFOLIO_FILE_NAME}`

      await arrangeTest([
        createGetTalentPortfolioMock({
          talentId: TALENT_ID,
          portfolioData: {
            portfolio: {
              files: {
                nodes: [
                  createTalentPortfolioFile({
                    specializationApplication: {
                      id: '123',
                      specialization: {
                        id: '123',
                        title: SPECIALIZATION_TITLE
                      }
                    },
                    webResource: {
                      text: PORTFOLIO_FILE_NAME,
                      url: PORTFOLIO_FILE_URL
                    },
                    createdAt: PORTFOLIO_SENT_DATE
                  })
                ]
              }
            }
          }
        })
      ])

      expect(screen.getByText(SPECIALIZATION_TITLE)).toBeInTheDocument()
      expect(screen.getByText(PORTFOLIO_DESCRIPTION)).toBeInTheDocument()
      expect(screen.getByTestId('portfolio-url')).toHaveAttribute(
        'href',
        PORTFOLIO_FILE_URL
      )
    })

    it('shows the vote summary if the user is not able to vote', async () => {
      const votes = [
        createTalentPortfolioVote({ id: '1', vote: null }),
        createTalentPortfolioVote({ id: '2', vote: null }),
        createTalentPortfolioVote({ id: '3', vote: null })
      ]

      await arrangeTest([
        createGetTalentPortfolioMock({
          talentId: TALENT_ID,
          portfolioData: {
            portfolio: {
              files: {
                nodes: [
                  createTalentPortfolioFile({
                    votes: { nodes: votes },
                    operations: {
                      voteForTalentPortfolioFile: {
                        callable: OperationCallableTypes.HIDDEN,
                        messages: ['You cannot vote on this portfolio']
                      }
                    }
                  })
                ]
              }
            }
          }
        })
      ])

      expect(screen.getByTestId('vote-summary')).toBeInTheDocument()
      expect(screen.queryByTestId('vote-button')).not.toBeInTheDocument()
    })

    it('shows the vote button instead of the vote summary if the user is able to vote and has not voted yet', async () => {
      const votes = [
        createTalentPortfolioVote({ id: '1', vote: null }),
        createTalentPortfolioVote({
          id: '2',
          vote: null,
          voter: { id: USER_ID, fullName: 'TEST_NAME' }
        }),
        createTalentPortfolioVote({ id: '3', vote: false })
      ]

      await arrangeTest([
        createGetTalentPortfolioMock({
          talentId: TALENT_ID,
          portfolioData: {
            portfolio: {
              files: {
                nodes: [
                  createTalentPortfolioFile({
                    votes: { nodes: votes }
                  })
                ]
              }
            }
          }
        })
      ])

      expect(screen.getByTestId('vote-button')).toBeInTheDocument()
      expect(screen.queryByTestId('vote-summary')).not.toBeInTheDocument()
    })

    it('shows the vote summary if the user is able to vote and has already voted', async () => {
      const votes = [
        createTalentPortfolioVote({ id: '1', vote: null }),
        createTalentPortfolioVote({
          id: '2',
          vote: true,
          voter: { id: USER_ID, fullName: 'TEST_NAME' }
        }),
        createTalentPortfolioVote({ id: '3', vote: false })
      ]

      await arrangeTest([
        createGetTalentPortfolioMock({
          talentId: TALENT_ID,
          portfolioData: {
            portfolio: {
              files: {
                nodes: [
                  createTalentPortfolioFile({
                    votes: { nodes: votes }
                  })
                ]
              }
            }
          }
        })
      ])
      expect(screen.getByTestId('vote-summary')).toBeInTheDocument()
      expect(screen.queryByTestId('vote-button')).not.toBeInTheDocument()
    })

    it('shows the vote summary with the votes and comments from the voters', async () => {
      const VOTER_NAME = 'TEST_NAME'
      const VOTER_COMMENT = 'TEST_COMMENT'
      const NO_VOTE = '-'

      const votes = [
        createTalentPortfolioVote({ id: '1', vote: null }),
        createTalentPortfolioVote({
          id: '2',
          vote: true,
          comment: VOTER_COMMENT,
          voter: { id: USER_ID, fullName: VOTER_NAME }
        }),
        createTalentPortfolioVote({ id: '3', vote: null })
      ]

      await arrangeTest([
        createGetTalentPortfolioMock({
          talentId: TALENT_ID,
          portfolioData: {
            portfolio: {
              files: {
                nodes: [
                  createTalentPortfolioFile({
                    votes: { nodes: votes }
                  })
                ]
              }
            }
          }
        })
      ])

      const vote1 = screen.getByTestId('vote-1')
      const vote2 = screen.getByTestId('vote-2')
      const vote3 = screen.getByTestId('vote-3')

      expect(vote1).toHaveTextContent(NO_VOTE)
      expect(vote2).toHaveTextContent('Yes')
      expect(vote3).toHaveTextContent(NO_VOTE)

      assertOnTooltip(vote2, tooltip => {
        expect(within(tooltip).getByText(VOTER_COMMENT)).toBeInTheDocument()
        expect(within(tooltip).getByText(VOTER_NAME)).toBeInTheDocument()
      })
    })
  })

  describe('when the portfolio of a talent is rejected', () => {
    it('hides the vote summary and vote button', async () => {
      await arrangeTest([
        createGetTalentPortfolioMock({
          talentId: TALENT_ID,
          portfolioData: {
            portfolio: {
              files: {
                nodes: [
                  createTalentPortfolioFile({
                    // votes return empty from API when the talent is rejected
                    votes: { nodes: [] }
                  })
                ]
              }
            }
          }
        })
      ])

      expect(screen.queryByTestId('vote-summary')).not.toBeInTheDocument()
      expect(screen.queryByTestId('vote-button')).not.toBeInTheDocument()
    })
  })

  describe('when the query fails fetching the portfolio', () => {
    it('shows an error message', async () => {
      await arrangeTest([
        createGetTalentPortfolioFailedMock({ talentId: TALENT_ID })
      ])

      await expect(() =>
        waitFor(() => {
          expect(mockShowDevError).toHaveBeenCalledWith(QUERY_ERROR_MESSAGE)
        })
      ).rejects.toThrow()
    })
  })
})
