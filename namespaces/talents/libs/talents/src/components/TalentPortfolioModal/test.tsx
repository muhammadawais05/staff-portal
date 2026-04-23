import React from 'react'
import {
  render,
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { PortfolioItem } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentPortfolioModal, {
  Props
} from './components/TalentPortfolioModal/TalentPortfolioModal'
import { createGetTalentPortfolioItemsMock } from './components/TalentPortfolioModal/data/get-talent-portfolio-items/mocks'

const TALENT_ID = 'talent-id'
const TALENT_NAME = 'John Cool'

const defaultProps: Props = {
  hideModal: jest.fn(),
  talentName: TALENT_NAME,
  talentId: TALENT_ID
}

const arrangeTest = (mocks: MockedResponse[], props: Props = defaultProps) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentPortfolioModal {...props} />
    </TestWrapperWithMocks>
  )

// eslint-disable-next-line max-lines-per-function
describe('TalentPortfolioModal', () => {
  it('shows the modal title', () => {
    const MODAL_TITLE = `${TALENT_NAME}'s Portfolio`

    arrangeTest([], { ...defaultProps })

    expect(screen.getByText(MODAL_TITLE)).toBeInTheDocument()
  })

  it('shows the project title, description, link and skills', async () => {
    const PROJECT = {
      title: 'Project 1 title',
      description: 'Project 1 description',
      link: 'https://www.mywebsite.com',
      skills: {
        nodes: [
          {
            name: 'UI Design'
          },
          {
            name: 'Ideation'
          }
        ]
      }
    }

    const FORMATTED_SKILLS = `UI Design, Ideation`

    const mock = createGetTalentPortfolioItemsMock({
      talentId: TALENT_ID,
      portfolioItems: [
        {
          title: 'Project 1 title',
          description: 'Project 1 description',
          link: 'https://www.mywebsite.com',
          skills: {
            totalCount: 0,
            nodes: [
              {
                id: 'a',
                name: 'UI Design'
              },
              {
                id: 'b',
                name: 'Ideation'
              }
            ]
          }
        } as PortfolioItem
      ]
    })

    arrangeTest([mock], { ...defaultProps })
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

    expect(screen.getByText(PROJECT.title)).toBeInTheDocument()
    expect(screen.getByText(PROJECT.description)).toBeInTheDocument()
    expect(screen.getByText(PROJECT.link)).toBeInTheDocument()
    expect(screen.getByText(FORMATTED_SKILLS)).toBeInTheDocument()
  })

  it('shows the main image, thumbnails and image title/description', async () => {
    const FILE = {
      contentType: 'image/png',
      title: 'The context',
      description: 'File description',
      id: 'abc',
      image: {
        thumbUrl: 'https://thumb.png',
        optimizedUrl: 'https://optmized.jpg',
        originalUrl: 'https://original.png'
      }
    }

    const PROJECT = {
      title: 'Project 1 title',
      files: {
        nodes: [FILE]
      }
    }

    const mock = createGetTalentPortfolioItemsMock({
      talentId: TALENT_ID,
      portfolioItems: [PROJECT] as unknown as PortfolioItem[]
    })

    arrangeTest([mock], { ...defaultProps })
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

    const mainImage = screen.getByTestId('portfolio-main-image')

    expect(mainImage).toHaveAttribute('src', FILE.image.optimizedUrl)

    const activeThumbnail = screen.getByTestId('portfolio-thumbnail:active')

    expect(activeThumbnail).toBeInTheDocument()
    expect(screen.getByText(FILE.title)).toBeInTheDocument()
    expect(screen.getByText(FILE.description)).toBeInTheDocument()
  })

  it('navigates between project files (images/documents)', async () => {
    const FILE_1 = {
      contentType: 'image/png',
      title: 'File 1 title',
      description: 'File 1 description',
      id: 'abc',
      image: {
        thumbUrl: 'https://thumb1.png',
        optimizedUrl: 'https://optmized1.jpg',
        originalUrl: 'https://original1.png'
      }
    }

    const FILE_2 = {
      contentType: 'image/png',
      title: 'File 2 title',
      description: 'File 2 description',
      id: 'dfg',
      image: {
        thumbUrl: 'https://thumb2.png',
        optimizedUrl: 'https://optmized2.jpg',
        originalUrl: 'https://original2.png'
      }
    }

    const PROJECT = {
      title: 'Project 1 title',
      files: {
        nodes: [FILE_1, FILE_2]
      }
    }

    const mock = createGetTalentPortfolioItemsMock({
      talentId: TALENT_ID,
      portfolioItems: [PROJECT] as unknown as PortfolioItem[]
    })

    arrangeTest([mock], { ...defaultProps })
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

    expect(screen.getByTestId('portfolio-main-image')).toHaveAttribute(
      'src',
      FILE_1.image.optimizedUrl
    )

    const thumbnailImage1 = await within(
      screen.getByTestId('portfolio-thumbnail:active')
    ).findByTestId('portfolio-image-thumbnail')

    expect(thumbnailImage1).toHaveAttribute('src', FILE_1.image.thumbUrl)
    expect(screen.getByText(FILE_1.title)).toBeInTheDocument()
    expect(screen.getByText(FILE_1.description)).toBeInTheDocument()

    // there are only 2 files, one thumbnail is active and the other is not
    fireEvent.click(screen.getByTestId('portfolio-thumbnail'))

    expect(screen.getByTestId('portfolio-main-image')).toHaveAttribute(
      'src',
      FILE_2.image.optimizedUrl
    )

    const thumbnailImage2 = await within(
      screen.getByTestId('portfolio-thumbnail:active')
    ).findByTestId('portfolio-image-thumbnail')

    expect(thumbnailImage2).toHaveAttribute('src', FILE_2.image.thumbUrl)
    expect(screen.getByText(FILE_2.title)).toBeInTheDocument()
    expect(screen.getByText(FILE_2.description)).toBeInTheDocument()
  })

  it('hides project navigation when the talent has only 1 projects available', async () => {
    const PROJECT = {
      title: 'Project 1 title'
    }

    const mock = createGetTalentPortfolioItemsMock({
      talentId: TALENT_ID,
      portfolioItems: [PROJECT] as unknown as PortfolioItem[]
    })

    arrangeTest([mock], { ...defaultProps })
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))
    expect(screen.queryByTestId('navigation-previous')).not.toBeInTheDocument()
    expect(screen.queryByTestId('navigation-next')).not.toBeInTheDocument()
  })

  it('navigates between projects', async () => {
    const PROJECT_1 = {
      id: 'a',
      title: 'Project 1 title'
    }
    const PROJECT_2 = {
      id: 'b',
      title: 'Project 2 title'
    }

    const portfolioItems = [
      PROJECT_1,
      PROJECT_2
    ] as unknown as PortfolioItem[]

    const mock = createGetTalentPortfolioItemsMock({
      talentId: TALENT_ID,
      portfolioItems: portfolioItems as unknown as PortfolioItem[]
    })

    arrangeTest([mock], { ...defaultProps })
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

    expect(screen.getByText(PROJECT_1.title)).toBeInTheDocument()

    const nextButton = screen.getByTestId('navigation-next')

    fireEvent.click(nextButton)

    expect(screen.getByText(PROJECT_2.title)).toBeInTheDocument()

    const previousButton = screen.getByTestId('navigation-previous')

    fireEvent.click(previousButton)

    expect(screen.getByText(PROJECT_1.title)).toBeInTheDocument()
  })

  it('starts the portfolio with a specific project when the project id is provided', async () => {
    const PROJECT_1 = {
      id: 'ABC',
      title: 'Project 1 title'
    }
    const PROJECT_2 = {
      id: 'XYZ',
      title: 'Project 2 title'
    }

    const portfolioItems = [
      PROJECT_1,
      PROJECT_2
    ] as unknown as PortfolioItem[]

    const mock = createGetTalentPortfolioItemsMock({
      talentId: TALENT_ID,
      portfolioItems: portfolioItems as unknown as PortfolioItem[]
    })

    arrangeTest([mock], { ...defaultProps, startProjectId: PROJECT_2.id })
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

    expect(screen.getByText(PROJECT_2.title)).toBeInTheDocument()
  })
})
