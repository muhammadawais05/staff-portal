import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ExpandButton, { Props } from './ExpandButton'

const arrangeTest = (props: Props) => {
  const { expanded, onClick } = props

  return render(
    <TestWrapper>
      <ExpandButton expanded={expanded} onClick={onClick} />
    </TestWrapper>
  )
}

describe('ExpandButton', () => {
  describe('when button has `expanded: true` state', () => {
    it('renders component', () => {
      arrangeTest({
        expanded: true,
        onClick: jest.fn()
      })

      expect(screen.queryByTestId('ExpandButton-arrow-up')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ExpandButton-arrow-down')
      ).not.toBeInTheDocument()
    })
  })

  describe('when button has `expanded: false` state', () => {
    it('renders component', () => {
      arrangeTest({
        expanded: false,
        onClick: jest.fn()
      })

      expect(
        screen.queryByTestId('ExpandButton-arrow-down')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ExpandButton-arrow-up')
      ).not.toBeInTheDocument()
    })
  })

  describe('when click on button', () => {
    it.each([
      {
        prevExpanded: true,
        nextExpanded: false
      },
      {
        prevExpanded: false,
        nextExpanded: true
      }
    ])(
      'passes updated `expanded` flag to the `onChange` handler',
      ({ prevExpanded, nextExpanded }) => {
        const onClickMock = jest.fn()

        arrangeTest({
          expanded: prevExpanded,
          onClick: onClickMock
        })

        fireEvent.click(screen.getByTestId('ExpandButton'))

        expect(onClickMock).toHaveBeenCalledWith(nextExpanded)
      }
    )
  })
})
