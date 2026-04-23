import { FinalForm } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommitmentChangeModalFormTableRow from '.'

const render = (
  props: ComponentProps<typeof CommitmentChangeModalFormTableRow>
) =>
  renderComponent(
    <table>
      <tbody>
        <FinalForm
          onSubmit={jest.fn()}
          render={() => <CommitmentChangeModalFormTableRow {...props} />}
        />
      </tbody>
    </table>
  )

describe('CommitmentChangeModalFormTableRow', () => {
  it('default render', () => {
    const { container } = render({
      type: 'hourly'
    })

    expect(container).toMatchSnapshot()
  })
})
