import React, { PropsWithChildren, ReactNode } from 'react'
import { render } from '@testing-library/react'

import ApproveJobCategoriesSelect from './ApproveJobCategoriesSelect'

const CATEGORIES_FIELD_ID = 'categoryIds'
const CATEGORY_ID = 'CATEGORY_ID'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    CheckboxGroup: ({
      name,
      children
    }: PropsWithChildren<{ name: string }>) => (
      <div data-testid={name}>{children}</div>
    ),
    Checkbox: ({ label, value }: { label: ReactNode; value: string }) => (
      <div data-testid={`${CATEGORY_ID}-${value}`}>{label}</div>
    )
  }
}))

const arrangeTest = (
  availableCategories?: { id: string; name?: string | null }[]
) =>
  render(
    <ApproveJobCategoriesSelect availableCategories={availableCategories} />
  )

describe('ApproveJobCategoriesSelect', () => {
  describe('when `availableCategories` is not present', () => {
    it('does not render `categoryIds` field', () => {
      const { queryByTestId } = arrangeTest()

      expect(queryByTestId(CATEGORIES_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `availableCategories` is empty', () => {
    it('does not render `categoryIds` field', () => {
      const { queryByTestId } = arrangeTest([])

      expect(queryByTestId(CATEGORIES_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `availableCategories` is not empty', () => {
    it('renders `categoryIds` field', () => {
      const category1 = { id: '1', name: 'category1' }
      const category2 = { id: '2', name: 'category2' }
      const { getByTestId } = arrangeTest([category1, category2])

      expect(getByTestId(CATEGORIES_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(`${CATEGORY_ID}-${category1.id}`)).toBeInTheDocument()
      expect(getByTestId(`${CATEGORY_ID}-${category1.id}`)).toHaveTextContent(
        category1.name
      )
      expect(getByTestId(`${CATEGORY_ID}-${category2.id}`)).toBeInTheDocument()
      expect(getByTestId(`${CATEGORY_ID}-${category2.id}`)).toHaveTextContent(
        category2.name
      )
    })
  })
})
