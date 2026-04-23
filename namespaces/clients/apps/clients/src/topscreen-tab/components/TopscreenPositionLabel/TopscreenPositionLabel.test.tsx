import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Tooltip, TypographyOverflow, QuestionMark16 } from '@toptal/picasso'

import { topscreenPositionFragmentMock } from '../TopscreenPositionsSection/data/get-topscreen-positions/topscreen-position-fragment.mock'
import TopscreenPositionLabelTooltipContent from '../TopscreenPositionLabelTooltipContent'
import TopscreenPositionLabel from './TopscreenPositionLabel'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn(),
  TypographyOverflow: jest.fn(),
  QuestionMark16: jest.fn()
}))

jest.mock('../TopscreenPositionLabelTooltipContent')

const mockTooltip = Tooltip as unknown as jest.Mock
const mockTypographyOverflow = TypographyOverflow as unknown as jest.Mock
const mockIcon = QuestionMark16 as unknown as jest.Mock

const arrangeTest = () => {
  mockTooltip.mockImplementation(({ children }) => <span>{children}</span>)
  mockTypographyOverflow.mockReturnValue(null)
  mockIcon.mockReturnValue(null)

  render(<TopscreenPositionLabel position={topscreenPositionFragmentMock} />)
}

describe('TopscreenPositionLabel', () => {
  it('renders component', () => {
    const context = {}

    arrangeTest()

    expect(mockTypographyOverflow).toHaveBeenCalledWith(
      {
        children: 'Mock Position',
        as: 'span',
        lines: 1,
        noWrap: true
      },
      context
    )
    expect(mockIcon).toHaveBeenCalledWith(
      {
        color: 'dark-grey'
      },
      context
    )
    expect(mockTooltip).toHaveBeenCalledWith(
      expect.objectContaining({
        interactive: true,
        content: expect.objectContaining({
          type: TopscreenPositionLabelTooltipContent,
          props: {
            nodes: topscreenPositionFragmentMock.stepTypes.nodes,
            jobUrl: topscreenPositionFragmentMock.jobUrl,
            programmingLanguage: topscreenPositionFragmentMock.description
          }
        })
      }),
      context
    )
  })
})
