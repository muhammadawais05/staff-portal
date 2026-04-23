import React, { ComponentProps, ReactNode } from 'react'
import { noop } from '@toptal/picasso/utils'

import ExternalIntegrator from '.'
import renderComponent from '../../utils/tests'

jest.mock('../../_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModalWithUrlSearch: jest.fn()
  })
}))
const render = (
  children: ReactNode,
  props: ComponentProps<typeof ExternalIntegrator>
) =>
  renderComponent(
    <ExternalIntegrator {...props}>{children}</ExternalIntegrator>
  )

describe('ExternalIntegrator', () => {
  it('default render', () => {
    const { container } = render(<div>ExampleApp</div>, {
      handleInboundEvent: noop,
      handleInboundEventUnsubscribe: noop
    })

    expect(container).toMatchSnapshot()
  })
})
