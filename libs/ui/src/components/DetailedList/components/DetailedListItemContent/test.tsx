import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DetailedList from '../../DetailedList'
import type { DetailedListValueViewOptions } from '../../types'
import DetailedListRow from '../DetailedListRow'
import DetailedListItemContent from '.'

const renderComponent = (
  props: ComponentProps<typeof DetailedListItemContent>
) =>
  render(
    <TestWrapper>
      <DetailedList>
        <DetailedListRow>
          <DetailedListItemContent {...props} />
        </DetailedListRow>
      </DetailedList>
    </TestWrapper>
  )

const TestComponent = ({
  size,
  weight,
  color
}: DetailedListValueViewOptions) => (
  <>
    <div data-testid='size'>{size}</div>
    <div data-testid='weight'>{weight}</div>
    <div data-testid='color'>{color}</div>
  </>
)

describe('DetailedListItemContent', () => {
  describe('when its a label', () => {
    it('renders with label settings', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        isLabel: true,
        width: '100%',
        content: 'Example Label'
      })

      expect(queryByTestId('item-field-value')).toBeNull()

      expect(getByTestId('item-field-label')).toBeInTheDocument()
      expect(getByTestId('item-field-label')).not.toHaveAttribute(
        'Typography-semibold'
      )
      expect(getByTestId('item-field-typographyOverflow').textContent).toBe(
        'Example Label'
      )
    })
  })

  describe('when its a value', () => {
    describe('when value with string', () => {
      it('renders with label settings', () => {
        const { getByTestId, queryByTestId } = renderComponent({
          isLabel: false,
          width: '100%',
          content: 'Example string value'
        })

        expect(queryByTestId('item-field-label')).toBeNull()

        expect(getByTestId('item-field-value')).toBeInTheDocument()
        expect(getByTestId('item-field-value')).toHaveAttribute(
          '_css2',
          `
    &,
    & p {
      font-weight: 600;
    }, `
        )
      })
    })

    describe('when value is empty', () => {
      it('renders with label settings', () => {
        const EMPTY_VALUE = '–'
        const { getByTestId, queryByTestId } = renderComponent({
          isLabel: false,
          width: '100%',
          content: 'Example string value',
          defaultValue: EMPTY_VALUE
        })

        expect(queryByTestId('item-field-label')).toBeNull()

        expect(getByTestId('item-field-value')).toBeInTheDocument()
        expect(getByTestId('item-field-value')).toHaveAttribute(
          '_css2',
          expect.stringMatching(/content: '–'/)
        )
      })
    })

    describe('when value is a function', () => {
      it('renders with value with render props', () => {
        const { getByTestId, queryByTestId } = renderComponent({
          isLabel: false,
          width: '100%',
          content: props => <TestComponent {...props} />
        })

        expect(queryByTestId('item-field-label')).toBeNull()

        expect(getByTestId('item-field-value')).toBeInTheDocument()
        expect(getByTestId('size').textContent).toBe('medium')
        expect(getByTestId('weight').textContent).toBe('semibold')
      })
    })

    describe('when value is a component', () => {
      it('renders with value with clone element', () => {
        const { getByTestId, queryByTestId } = renderComponent({
          isLabel: false,
          width: '100%',
          // @ts-expect-error TestComponent
          content: <TestComponent />
        })

        expect(queryByTestId('item-field-label')).toBeNull()

        expect(getByTestId('item-field-value')).toBeInTheDocument()
        expect(getByTestId('size').textContent).toBe('medium')
        expect(getByTestId('weight').textContent).toBe('semibold')
      })
    })
  })
})
