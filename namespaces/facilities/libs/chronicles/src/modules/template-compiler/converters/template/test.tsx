import { cleanup } from '@testing-library/react'

import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import {
  performedActionTemplateFixture,
  modelDescriptionTemplateFixture
} from './fixture'

afterEach(cleanup)

describe('template payload type', () => {
  it('should interpolate performed action template with variables', () => {
    const { payload, modelDescriptions } = performedActionTemplateFixture
    const result = renderPerformedAction(payload, modelDescriptions)

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('should interpolate model description template with variables', () => {
    const { payload, modelDescriptions } = modelDescriptionTemplateFixture
    const result = renderPerformedAction(payload, modelDescriptions)

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
