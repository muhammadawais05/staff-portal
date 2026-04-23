import {
  TalentPortfolioFileFragment,
  TalentPortfolioVoteFragment,
  TalentPortfolioFragment
} from './talent-portfolio-fragment.staff.gql.types'

export const createTalentPortfolioVote = (
  vote: Partial<TalentPortfolioVoteFragment> & { id: string }
) => ({
  comment: null,
  ...vote,
  voter: {
    fullName: vote.voter?.fullName || 'TEST_NAME',
    id: vote.voter?.id || '123'
  }
})

export const createTalentPortfolioFile = (
  file: Partial<TalentPortfolioFileFragment>
) =>
  ({
    id: file.id || '123',
    operations: {
      voteForTalentPortfolioFile: {
        callable:
          file.operations?.voteForTalentPortfolioFile.callable || 'ENABLED',
        messages: []
      }
    },
    specializationApplication: {
      id: '123',
      specialization: {
        id: '123',
        title:
          file.specializationApplication?.specialization?.title ||
          'Digital Design'
      }
    },
    webResource: {
      text: file.webResource?.text || 'Portfolio_example.pdf',
      url: file.webResource?.url || 'TEST_URL'
    },
    createdAt: file.createdAt || '2021-02-08T07:33:39-06:00',
    votes: {
      nodes: file.votes?.nodes.map(createTalentPortfolioVote) || []
    }
  } as TalentPortfolioFileFragment)

export const createTalentPortfolio = (
  portfolioData?: TalentPortfolioFragment
) => ({
  portfolio: portfolioData
    ? {
        files: {
          nodes: portfolioData?.portfolio?.files?.nodes.map(
            createTalentPortfolioFile
          )
        }
      }
    : null
})

export const createTalentPortfolioMock = (
  portfolioData?: TalentPortfolioFragment
) => ({
  portfolio: {
    ...createTalentPortfolio(portfolioData),
    files: {
      nodes:
        portfolioData?.portfolio?.files.nodes.map(file => ({
          ...file,
          operations: {
            voteForTalentPortfolioFile: {
              ...file.operations.voteForTalentPortfolioFile,
              __typename: 'Operation'
            },
            __typename: 'PortfolioFileOperations'
          },
          specializationApplication: {
            ...file.specializationApplication,
            specialization: {
              ...file?.specializationApplication?.specialization,
              __typename: 'Specialization'
            },
            __typename: 'SpecializationApplication'
          },
          webResource: {
            ...file.webResource,
            __typename: 'Link'
          },
          votes: {
            nodes: file?.votes?.nodes.map(vote => ({
              ...vote,
              voter: {
                ...vote.voter,
                __typename: 'Staff'
              },
              __typename: 'PortfolioVote'
            })),
            __typename: 'PortfolioVoteConnection'
          },
          __typename: 'PortfolioFile'
        })) || [],
      __typename: 'PortfolioFileConnection'
    },
    __typename: 'TalentPortfolio'
  }
})
