import React, { ComponentProps } from 'react'
import { BusinessTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ClientBusinessTypeUpdateModalForm from '.'

const render = (
  props: ComponentProps<typeof ClientBusinessTypeUpdateModalForm>
) => renderComponent(<ClientBusinessTypeUpdateModalForm {...props} />)

describe('ClientBusinessTypeUpdateModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: { businessType: BusinessTypes.SMALL_BUSINESS },
      title: 'Title of the modal'
    })

    expect(
      getByTestId('ClientBusinessTypeUpdateModalForm-title')
    ).toHaveTextContent('Title of the modal')
    expect(
      getByTestId('ClientBusinessTypeUpdateModalForm-businessType')
    ).toHaveTextContent('Business Type')
    expect(getByTestId('submit')).toHaveTextContent('Change Business Type')
  })
})
