import { cleanup } from '@testing-library/react'

import renderWithProviders from './__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from './compiler'
import { ModelDescription } from './types'
import {
  NO_PAYLOAD_TEMPLATE,
  MODEL_DESCRIPTIONS as NO_PAYLOAD_MODEL_DESCRIPTIONS
} from './fixtures/no-payload-template'
import {
  SIMPLE_OBJECT_PAYLOAD_TEMPLATE,
  MODEL_DESCRIPTIONS as SIMPLE_OBJECT_PAYLOAD_MODEL_DESCRIPTIONS
} from './fixtures/simple-object-payload'

afterEach(cleanup)

describe('no payload fixture', () => {
  it('should replace subject and performer in template', () => {
    const result = renderPerformedAction(
      NO_PAYLOAD_TEMPLATE,
      NO_PAYLOAD_MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})

describe('no payload fixture without model descriptions', () => {
  it('should render template without fields filled', () => {
    const emptyModelDescriptions: ModelDescription[] = []
    const result = renderPerformedAction(
      NO_PAYLOAD_TEMPLATE,
      emptyModelDescriptions
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})

describe('simple object payload with designation field used from model description', () => {
  it('should return subject, performer ids and 1 id from the payload', () => {
    const result = renderPerformedAction(
      SIMPLE_OBJECT_PAYLOAD_TEMPLATE,
      SIMPLE_OBJECT_PAYLOAD_MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
