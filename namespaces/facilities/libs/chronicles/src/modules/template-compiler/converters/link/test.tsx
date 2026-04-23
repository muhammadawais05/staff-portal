import { cleanup } from '@testing-library/react'

import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import { LINK_TYPE_PAYLOAD_TEMPLATE, MODEL_DESCRIPTION } from './fixture'

afterEach(cleanup)

describe('link payload', () => {
  it('from PerformedAction payload, accessible, with path, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_PAYLOAD_ACCESSIBLE_WITH_PATH,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITH_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from PerformedAction payload, accessible, with path, with options, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_PAYLOAD_ACCESSIBLE_WITH_PATH_WITH_OPTIONS,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITH_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from PerformedAction payload, not accessible, with path, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_PAYLOAD_NOT_ACCESSIBLE_WITH_PATH,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITH_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from PerformedAction payload, accessible, without path, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_PAYLOAD_ACCESSIBLE_WITHOUT_PATH,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITH_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from Model Description object, accessible, with path, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_MODEL_DESCRIPTION,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITH_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from Model Description object, accessible, with path, with options, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_MODEL_DESCRIPTION,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITH_PATH_WITH_OPTIONS]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from Model Description object, not accessible, with path, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_MODEL_DESCRIPTION,
      [MODEL_DESCRIPTION.NOT_ACCESSIBLE_WITH_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })

  it('from Model Description object, accessible, without path, should be rendered from template', () => {
    const result = renderPerformedAction(
      LINK_TYPE_PAYLOAD_TEMPLATE.FROM_MODEL_DESCRIPTION,
      [MODEL_DESCRIPTION.ACCESSIBLE_WITHOUT_PATH]
    )

    const { container } = renderWithProviders(result)

    expect(container).toMatchSnapshot()
  })
})
