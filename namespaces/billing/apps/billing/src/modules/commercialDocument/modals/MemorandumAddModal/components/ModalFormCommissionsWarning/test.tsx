import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ModalFormCommissionsWarning from '.'

const render = (
  props: ComponentProps<typeof ModalFormCommissionsWarning> = {}
) => renderComponent(<ModalFormCommissionsWarning {...props} />)

describe('render', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
