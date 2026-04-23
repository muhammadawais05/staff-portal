import { render } from '@testing-library/react'
import React from 'react'

import FormSpecializationSelect from './FormSpecializationSelect'

const SPECIALIZATION_FIELD_ID = 'specializationId'
const SPECIALIZATION_ITEM_ID = 'specialization'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Select: ({
      name,
      options
    }: {
      name: string
      options: { text: string; value: string }[]
    }) => (
      <div data-testid={name}>
        {options.map(({ text, value }) => (
          <div key={value} data-testid={`${SPECIALIZATION_ITEM_ID}-${value}`}>
            {text}
          </div>
        ))}
      </div>
    )
  }
}))

const arrangeTest = (
  availableSpecializations?: { id: string; title: string }[]
) =>
  render(
    <FormSpecializationSelect
      availableSpecializations={availableSpecializations}
    />
  )

describe('FormSpecializationSelect', () => {
  describe('when `availableSpecializations` is not present', () => {
    it('does not render `specializationId` field', () => {
      const { queryByTestId } = arrangeTest()

      expect(queryByTestId(SPECIALIZATION_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `availableSpecializations` is empty', () => {
    it('does not render `specializationId` field', () => {
      const { queryByTestId } = arrangeTest([])

      expect(queryByTestId(SPECIALIZATION_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `availableSpecializations` has only one item', () => {
    it('does not render `specializationId` field', () => {
      const { queryByTestId } = arrangeTest([{ id: '1', title: 'one' }])

      expect(queryByTestId(SPECIALIZATION_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `availableSpecializations` has more than one item', () => {
    it('renders `specializationId` field', () => {
      const specialization1 = { id: '1', title: 'specialization1' }
      const specialization2 = { id: '2', title: 'specialization2' }
      const { getByTestId } = arrangeTest([specialization1, specialization2])

      expect(getByTestId(SPECIALIZATION_FIELD_ID)).toBeInTheDocument()
      expect(
        getByTestId(`${SPECIALIZATION_ITEM_ID}-${specialization1.id}`)
      ).toBeInTheDocument()
      expect(
        getByTestId(`${SPECIALIZATION_ITEM_ID}-${specialization1.id}`)
      ).toHaveTextContent(specialization1.title)
      expect(
        getByTestId(`${SPECIALIZATION_ITEM_ID}-${specialization2.id}`)
      ).toBeInTheDocument()
      expect(
        getByTestId(`${SPECIALIZATION_ITEM_ID}-${specialization2.id}`)
      ).toHaveTextContent(specialization2.title)
    })
  })
})
