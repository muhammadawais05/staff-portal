import React, { ComponentProps } from 'react'
import { within } from '@toptal/picasso/test-utils'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DetailedList from './DetailedList'
import { DetailedListValueViewOptions } from './types'

// TODO avoid using non-mocked component https://toptal-core.atlassian.net/browse/SPB-2314
jest.mock('@toptal/picasso/TypographyOverflow', () =>
  jest.requireActual('@toptal/picasso/TypographyOverflow')
)

const arrangeTest = (props: ComponentProps<typeof DetailedList>) =>
  render(
    <TestWrapper>
      <DetailedList {...props} />
    </TestWrapper>
  )

const MockItems = [
  {
    label: 'Name',
    value: <span data-testid='value'>Example name</span>,
    hidden: false
  },
  {
    label: 'Address',
    value: <span data-testid='value'>Example Address</span>,
    hidden: true
  },
  {
    label: 'Address Line 2',
    value: <span data-testid='value'>Example Address Line 2</span>,
    hidden: false
  },
  {
    label: 'Country',
    value: <span data-testid='value'>Example Country</span>,
    hidden: false
  },
  {
    label: 'Family Name',
    value: <span data-testid='value'>Example Family Name</span>,
    hidden: false
  },
  {
    label: 'Gender',
    value: <span data-testid='value'>Example Gender</span>,
    hidden: true
  },
  {
    label: 'Team',
    value: <span data-testid='value'>Example Team</span>,
    hidden: false
  }
]

describe('DetailedList', () => {
  describe('when `children` is being used', () => {
    it('render children as is', () => {
      const { queryByTestId } = arrangeTest({
        children: <div data-testid='test-child'>Example</div>
      })

      expect(queryByTestId('test-child')).toBeInTheDocument()
      expect(queryByTestId('row-item')).toBeNull()
    })
  })

  describe('when `items` is being used', () => {
    describe('when `columns` defined', () => {
      it('render formatted items into desired columns', () => {
        const { getAllByTestId, getByTestId } = arrangeTest({
          items: MockItems,
          columns: 2
        })

        // Fields render
        expect(getByTestId('item-field: Name')).toBeInTheDocument()
        expect(getByTestId('item-field: Address Line 2')).toBeInTheDocument()
        expect(getByTestId('item-field: Country')).toBeInTheDocument()
        expect(getByTestId('item-field: Family Name')).toBeInTheDocument()
        expect(getByTestId('item-field: Team')).toBeInTheDocument()

        // Filtering elements
        expect(getAllByTestId('value')?.length).toBe(5)

        // Row number
        expect(getAllByTestId('row-item')?.length).toBe(3)

        // Row structure
        expect(
          within(getAllByTestId('row-item')[0]).getByTestId('item-field: Name')
        ).toBeInTheDocument()
        expect(
          within(getAllByTestId('row-item')[0]).getByTestId(
            'item-field: Family Name'
          )
        ).toBeInTheDocument()
        expect(
          within(getAllByTestId('row-item')[0]).queryByTestId(
            'item-field: Address Line 2'
          )
        ).toBeNull()
        expect(
          within(getAllByTestId('row-item')[0]).queryByTestId(
            'item-field: Country'
          )
        ).toBeNull()

        expect(
          within(getAllByTestId('row-item')[1]).getByTestId(
            'item-field: Address Line 2'
          )
        ).toBeInTheDocument()
        expect(
          within(getAllByTestId('row-item')[1]).getByTestId('item-field: Team')
        ).toBeInTheDocument()
        expect(
          within(getAllByTestId('row-item')[1]).queryByTestId(
            'item-field: Name'
          )
        ).toBeNull()
        expect(
          within(getAllByTestId('row-item')[1]).queryByTestId(
            'item-field: Family Name'
          )
        ).toBeNull()

        expect(
          within(getAllByTestId('row-item')[2]).getByTestId(
            'item-field: Country'
          )
        ).toBeInTheDocument()
        expect(
          within(getAllByTestId('row-item')[2]).queryByTestId(
            'item-field: Address Line 2'
          )
        ).toBeNull()
        expect(
          within(getAllByTestId('row-item')[2]).queryByTestId(
            'item-field: Name'
          )
        ).toBeNull()
      })
    })

    describe('when `columns` is undefined', () => {
      it('render formatted items', () => {
        const { getAllByTestId, getByTestId } = arrangeTest({
          items: [MockItems]
        })

        // Fields render
        expect(getByTestId('item-field: Name')).toBeInTheDocument()
        expect(getByTestId('item-field: Address Line 2')).toBeInTheDocument()
        expect(getByTestId('item-field: Country')).toBeInTheDocument()
        expect(getByTestId('item-field: Family Name')).toBeInTheDocument()
        expect(getByTestId('item-field: Team')).toBeInTheDocument()

        // Filtering elements
        expect(getAllByTestId('value')?.length).toBe(5)

        // Row number
        expect(getAllByTestId('row-item')?.length).toBe(1)
      })
    })
  })

  describe('when `size`, `weight` and `color` (view options) properties are set', () => {
    const viewOptions = {
      typographySize: 'large' as const,
      typographyWeight: 'regular' as const,
      typographyColor: 'red' as const
    }

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

    describe('when list item is a string', () => {
      it('wraps the item in Typography with applied view options', () => {
        arrangeTest({
          items: [
            {
              label: 'Test item',
              value: 'Test value'
            }
          ],
          ...viewOptions
        })

        const valueNodeContainer = screen.getByTestId('item-field-value')

        expect(
          valueNodeContainer.querySelector('[class*="Typography-bodyLarge"]')
        ).toBeInTheDocument()
        expect(
          valueNodeContainer.querySelector('[class*="Typography-regular"]')
        ).toBeInTheDocument()
        expect(
          valueNodeContainer.querySelector('[class*="Typography-red"]')
        ).toBeInTheDocument()
      })
    })

    describe('when list item is a function', () => {
      it('passes view options to the function', () => {
        arrangeTest({
          items: [
            {
              label: 'Test item',
              value: ({ size, weight, color }) => (
                <TestComponent size={size} weight={weight} color={color} />
              )
            }
          ],
          ...viewOptions
        })

        const size = screen.getByTestId('size')

        expect(size.textContent).toEqual(viewOptions.typographySize)
        const weight = screen.getByTestId('weight')

        expect(weight.textContent).toEqual(viewOptions.typographyWeight)
        const color = screen.getByTestId('color')

        expect(color.textContent).toEqual(viewOptions.typographyColor)
      })
    })

    describe('when list item is an element', () => {
      it('clones the element with additional view options', () => {
        arrangeTest({
          items: [
            {
              label: 'Test item',
              // Checking if view options are passed by <DetailedList/>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value: <TestComponent />
            }
          ],
          ...viewOptions
        })

        const size = screen.getByTestId('size')

        expect(size.textContent).toEqual(viewOptions.typographySize)
        const weight = screen.getByTestId('weight')

        expect(weight.textContent).toEqual(viewOptions.typographyWeight)
        const color = screen.getByTestId('color')

        expect(color.textContent).toEqual(viewOptions.typographyColor)
      })
    })
  })
})
