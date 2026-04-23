import React from 'react'
import { render, screen } from '@testing-library/react'
import { TalentPortfolioFilePdfPrimaryContentType } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import DocumentThumbnail, { Props } from './DocumentThumbnail'

jest.mock('@toptal/picasso', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso'),
  Folder24: () => <div data-testid='Folder24' />,
  NumericalAnalysis24: () => <div data-testid='NumericalAnalysis24' />,
  Page24: () => <div data-testid='Page24' />,
  PieChart24: () => <div data-testid='PieChart24' />,
  WhitePaper24: () => <div data-testid='WhitePaper24' />
}))

const arrangeTest = (file: Props['file']) =>
  render(
    <TestWrapper>
      <DocumentThumbnail file={file} />
    </TestWrapper>
  )

describe('DocumentThumbnail', () => {
  describe('shows relative icon based on the file primary content type', () => {
    const filesList = [
      {
        primaryContentType:
          TalentPortfolioFilePdfPrimaryContentType.PRESENTATION,
        icon: 'PieChart24',
        title: 'Some title 1'
      },
      {
        primaryContentType:
          TalentPortfolioFilePdfPrimaryContentType.NUMERICAL_ANALYSIS,
        icon: 'NumericalAnalysis24',
        title: 'Some title 2'
      },
      {
        primaryContentType:
          TalentPortfolioFilePdfPrimaryContentType.WHITE_PAPER,
        icon: 'WhitePaper24',
        title: 'Some title 3'
      },
      {
        primaryContentType:
          TalentPortfolioFilePdfPrimaryContentType.PROJECT_PLAN,
        icon: 'Page24',
        title: 'Some title 4'
      },
      {
        primaryContentType: TalentPortfolioFilePdfPrimaryContentType.OTHER,
        icon: 'Folder24',
        title: 'Some title 5'
      }
    ].map(file => [file.icon, file.primaryContentType, file.title])

    it.each(filesList)(
      'shows %s icon when primaryContentType is %s',
      (icon, primaryContentType, title) => {
        const contentType =
          primaryContentType as TalentPortfolioFilePdfPrimaryContentType

        arrangeTest({ primaryContentType: contentType, title })

        expect(screen.getByTestId(icon)).toBeInTheDocument()
        expect(screen.getByText(title)).toBeInTheDocument()
      }
    )
  })
})
