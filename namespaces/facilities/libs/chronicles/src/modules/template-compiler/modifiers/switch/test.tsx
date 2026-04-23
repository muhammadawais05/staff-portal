import { cleanup } from '@testing-library/react'

import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import {
  CHANGE_SWITCH_TEMPLATE,
  CHANGE_SWITCH_MODEL_DESCRIPTIONS
} from './fixture'

afterEach(cleanup)

describe('switch modifier for change payload type', () => {
  it('should render change template with disabled word', () => {
    const result = renderPerformedAction(
      CHANGE_SWITCH_TEMPLATE,
      CHANGE_SWITCH_MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
