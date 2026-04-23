import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import { CHANGE_NO_LABEL_TEMPLATE, MODEL_DESCRIPTIONS } from './fixture'

describe('nolabel modifier for change payload type', () => {
  it('should render change template without a label', () => {
    const result = renderPerformedAction(
      CHANGE_NO_LABEL_TEMPLATE,
      MODEL_DESCRIPTIONS
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
