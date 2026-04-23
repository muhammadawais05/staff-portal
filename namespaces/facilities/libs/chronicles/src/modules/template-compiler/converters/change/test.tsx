import { cleanup } from '@testing-library/react'

import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import {
  CHANGE_TYPE_PAYLOAD_TEMPLATE_PLAIN,
  CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_NAME_AND_LABEL,
  MODEL_DESCRIPTIONS as CHANGE_TYPE_MODEL_DESCRIPTIONS,
  CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_USING_KEY,
  CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_USING_KEY_MODEL_DESCRIPTIONS
} from './fixture'

afterEach(cleanup)

describe('change payload type', () => {
  it('should render template with change payload', () => {
    const result = renderPerformedAction(
      CHANGE_TYPE_PAYLOAD_TEMPLATE_PLAIN,
      CHANGE_TYPE_MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('should render template with change payload containing label and name', () => {
    const result = renderPerformedAction(
      CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_NAME_AND_LABEL,
      CHANGE_TYPE_MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('should render template with change payload containing kay as a label', () => {
    const result = renderPerformedAction(
      CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_USING_KEY,
      CHANGE_TYPE_PAYLOAD_TEMPLATE_WITH_USING_KEY_MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
