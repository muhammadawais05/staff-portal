import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ClientClaimerUpdateModalForm from '.'

const render = (props: ComponentProps<typeof ClientClaimerUpdateModalForm>) =>
  renderComponent(<ClientClaimerUpdateModalForm {...props} />)

describe('ClientClaimerUpdateModalForm', () => {
  it('renders static elements', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      title: 'Change Claimer',
      roles: fixtures.MockGetClientClaimerUpdate.roles.nodes
    })

    expect(
      getByTestId(`${ClientClaimerUpdateModalForm.displayName}-title`)
    ).toHaveTextContent('Change Claimer')
    expect(
      getByTestId(`${ClientClaimerUpdateModalForm.displayName}-claimerId`)
    ).toHaveTextContent('Claimer')
    expect(
      getByTestId(`${ClientClaimerUpdateModalForm.displayName}-comment`)
    ).toHaveTextContent('Comment (optional)')
    expect(getByTestId('submit')).toHaveTextContent('Change Claimer')
  })
})
