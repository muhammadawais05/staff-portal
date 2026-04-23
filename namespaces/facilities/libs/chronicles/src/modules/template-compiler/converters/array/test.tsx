import { cleanup } from '@testing-library/react'

import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import { ARRAY_TYPE_PAYLOAD_TEMPLATE, MODEL_DESCRIPTIONS } from './fixture'

afterEach(cleanup)

describe('array payload type', () => {
  it('should render array of change payloads types with and separator', () => {
    const result = renderPerformedAction(
      ARRAY_TYPE_PAYLOAD_TEMPLATE.CHANGE_ITEMS,
      MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('should render array of change payloads types (second variant) with and separator', () => {
    const result = renderPerformedAction(
      ARRAY_TYPE_PAYLOAD_TEMPLATE.CHANGE_ITEMS_SECOND_VARIANT,
      MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('should render array of change payloads types with comma and and separator', () => {
    const result = renderPerformedAction(
      ARRAY_TYPE_PAYLOAD_TEMPLATE.CHANGE_ITEMS_MULTIPLE,
      MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('should render array of plain items', () => {
    const result = renderPerformedAction(
      ARRAY_TYPE_PAYLOAD_TEMPLATE.PLAIN_ITEMS,
      MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
