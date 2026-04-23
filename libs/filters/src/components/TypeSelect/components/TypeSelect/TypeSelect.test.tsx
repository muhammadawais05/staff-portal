import React from 'react'
import {
  act,
  render,
  screen,
  fireEvent,
  within,
  waitFor
} from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TypeSelect from './TypeSelect'

const OPTIONS = [
  {
    id: 'designer',
    label: 'Designer',
    children: [
      {
        id: '11',
        label: 'Digital Design'
      }
    ]
  },
  {
    id: 'developer',
    label: 'Developer',
    children: [
      {
        id: '21',
        label: 'Blockchain'
      },
      {
        id: '22',
        label: 'Drupal'
      },
      {
        id: '23',
        label: 'WordPress'
      }
    ]
  },
  {
    id: 'product_manager',
    label: 'Product Manager',
    children: [
      {
        id: '31',
        label: 'Core'
      },
      {
        id: '32',
        label: 'Product Owner / Business Analyst'
      }
    ]
  }
]

const onChangeMock = jest.fn()

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TypeSelect
        options={OPTIONS}
        onChange={onChangeMock}
        searchPlaceholder='Search Talent Types'
      />
    </TestWrapper>
  )

describe('TypeSelect', () => {
  describe('When search filtering types (categories & subcategories)', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('shows only related matches', async () => {
      const SEARCH_TERM = 'dev'

      arrangeTest()

      await act(async () => {
        fireEvent.click(screen.getByTestId('type-select-autocomplete'))
      })

      const input = screen.getByPlaceholderText('Search Talent Types')

      await act(async () => {
        fireEvent.change(input, { target: { value: SEARCH_TERM } })
      })
      jest.runAllTimers()

      await act(async () => {
        fireEvent.change(input, { target: { value: '' } })
      })

      await waitFor(() => {
        const categories = screen.queryAllByTestId(
          'type-select-category-option'
        )
        const subcategories = screen.queryAllByTestId(
          'type-select-subcategory-option'
        )

        expect(categories).toHaveLength(1)
        expect(categories[0]).toHaveTextContent(/Developer/i)
        expect(subcategories).toHaveLength(3)
        expect(subcategories[0]).toHaveTextContent(/Blockchain/i)
        expect(subcategories[1]).toHaveTextContent(/Drupal/i)
        expect(subcategories[2]).toHaveTextContent(/WordPress/i)
      })
    })

    it('shows empty state when there are no matches', async () => {
      const SEARCH_TERM = 'xx'

      arrangeTest()
      await act(async () => {
        fireEvent.click(screen.getByTestId('type-select-autocomplete'))
      })

      const input = screen.getByPlaceholderText('Search Talent Types')

      await act(async () => {
        fireEvent.change(input, { target: { value: SEARCH_TERM } })
      })
      jest.runAllTimers()

      await act(async () => {
        fireEvent.change(input, { target: { value: '' } })
      })

      await waitFor(() => {
        const categories = screen.queryAllByTestId(
          'type-select-category-option'
        )
        const subcategories = screen.queryAllByTestId(
          'type-select-subcategory-option'
        )

        expect(categories).toHaveLength(0)
        expect(subcategories).toHaveLength(0)
        expect(screen.queryByText(/No options/i)).toBeInTheDocument()
      })
    })
  })

  it('renders labels of all categories and subcategories', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-autocomplete'))
    })

    OPTIONS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })

    expect(screen.getByText(/Drupal/i)).toBeInTheDocument()
    expect(screen.getByText(/Blockchain/i)).toBeInTheDocument()
    expect(screen.getByText(/WordPress/i)).toBeInTheDocument()
  })

  it('not render subcategory label of category with only one child', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-autocomplete'))
    })

    expect(screen.queryByText(/Digital Design/i)).not.toBeInTheDocument()
  })

  it('select clicked item', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-autocomplete'))
    })

    await act(async () => {
      fireEvent.click(screen.getByText(/Drupal/i))
    })

    const autocomplete = screen.getByRole('combobox')

    expect(
      within(autocomplete).getByText(/Drupal Developer/i)
    ).toBeInTheDocument()
    expect(onChangeMock).toHaveBeenCalledWith([{ id: '22', label: 'Drupal' }])
  })

  it('select all items', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-autocomplete'))
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-select-all'))
    })

    OPTIONS.forEach(({ id }) => {
      expect(
        screen.getByTestId(`type-select-selected-tag-${id}`)
      ).toBeInTheDocument()
    })
  })

  it('deselect all items', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-autocomplete'))
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId('type-select-select-all'))
    })

    OPTIONS.forEach(({ id }) => {
      expect(
        screen.getByTestId(`type-select-selected-tag-${id}`)
      ).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('type-select-deselect-all'))

    OPTIONS.forEach(({ id }) => {
      expect(
        screen.queryByTestId(`type-select-selected-tag-${id}`)
      ).not.toBeInTheDocument()
    })
  })

  it('removes selected item from tags', () => {
    arrangeTest()

    fireEvent.click(screen.getByTestId('type-select-autocomplete'))
    fireEvent.click(screen.getByTestId('type-select-select-all'))

    expect(
      screen.getByTestId('type-select-selected-tag-designer')
    ).toBeInTheDocument()

    fireEvent.click(
      within(screen.getByTestId('type-select-selected-tag-designer')).getByRole(
        'button'
      )
    )

    expect(
      screen.queryByTestId('type-select-selected-tag-designer')
    ).not.toBeInTheDocument()
  })
})
