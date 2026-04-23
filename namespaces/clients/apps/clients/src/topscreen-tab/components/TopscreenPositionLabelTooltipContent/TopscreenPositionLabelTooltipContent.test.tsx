import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import {
  topscreenPositionFragmentMock,
  topscreenPositionSingleStepTypeFragmentMock
} from '../TopscreenPositionsSection/data/get-topscreen-positions/topscreen-position-fragment.mock'
import TopscreenPositionLabelTooltipContent from './TopscreenPositionLabelTooltipContent'

const defaultProps = {
  jobUrl: topscreenPositionFragmentMock.jobUrl,
  programmingLanguage: topscreenPositionFragmentMock.description,
  nodes: topscreenPositionFragmentMock.stepTypes.nodes
}

type TestProps = React.ComponentProps<
  typeof TopscreenPositionLabelTooltipContent
>

const arrangeTest = (props: TestProps = defaultProps) => {
  render(<TopscreenPositionLabelTooltipContent {...props} />)
}

describe('TopscreenPositionLabelTooltipContent', () => {
  describe('when there are several nodes', () => {
    it('does not render arrow for the first node', () => {
      arrangeTest()

      expect(
        screen.getByTestId('topscreen-position-label-tooltip-text-0')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('topscreen-position-label-tooltip-icon-0')
      ).not.toBeInTheDocument()
    })

    it('does render arrows for other nodes', () => {
      arrangeTest()

      expect(
        screen.getByTestId('topscreen-position-label-tooltip-text-1')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('topscreen-position-label-tooltip-icon-1')
      ).toBeInTheDocument()
    })
  })

  describe('when there is only one node', () => {
    it('renders component without any arrows', () => {
      arrangeTest({
        ...defaultProps,
        nodes: topscreenPositionSingleStepTypeFragmentMock.stepTypes.nodes
      })

      expect(
        screen.getByTestId('topscreen-position-label-tooltip-text-0')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('topscreen-position-label-tooltip-icon-0')
      ).not.toBeInTheDocument()
    })
  })

  it('shows the job URL', () => {
    arrangeTest()

    expect(screen.getByText('Job URL:')).toBeInTheDocument()
    expect(screen.getByText(defaultProps.jobUrl)).toBeInTheDocument()
  })

  it('shows the programming language', () => {
    arrangeTest()

    expect(screen.getByText('Programming Language:')).toBeInTheDocument()
    expect(
      screen.getByText(defaultProps.programmingLanguage!)
    ).toBeInTheDocument()
  })

  describe('when programming language is undefined', () => {
    it('does not show programming language', () => {
      arrangeTest({ ...defaultProps, programmingLanguage: undefined })

      expect(
        screen.queryByText('Programming Language:')
      ).not.toBeInTheDocument()
    })
  })

  describe('when programming language is null', () => {
    it('does not show programming language', () => {
      arrangeTest({ ...defaultProps, programmingLanguage: null })

      expect(
        screen.queryByText('Programming Language:')
      ).not.toBeInTheDocument()
    })
  })

  describe('when programming language is "UNDEFINED"', () => {
    it('does not show programming language', () => {
      arrangeTest({ ...defaultProps, programmingLanguage: 'UNDEFINED' })

      expect(
        screen.queryByText('Programming Language:')
      ).not.toBeInTheDocument()
    })
  })
})
