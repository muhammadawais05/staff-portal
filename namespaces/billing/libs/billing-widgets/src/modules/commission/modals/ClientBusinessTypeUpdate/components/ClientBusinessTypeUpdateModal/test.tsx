import React, { ComponentProps } from 'react'
import { pick } from 'lodash-es'
import { BusinessTypes } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  useGetClientBusinessTypeUpdateQuery,
  useSetUpdateClientBusinessTypeMutation
} from '../../data'
import ClientBusinessTypeUpdateModal from './'

jest.mock('../ClientBusinessTypeUpdateModalForm')
jest.mock('../../data')

const render = (props: ComponentProps<typeof ClientBusinessTypeUpdateModal>) =>
  renderComponent(<ClientBusinessTypeUpdateModal {...props} />)

describe('ClientBusinessTypeUpdateModal', () => {
  it('renders a form', () => {
    ;(useGetClientBusinessTypeUpdateQuery as jest.Mock).mockReturnValue({
      data: { node: fixtures.MockClient }
    })
    ;(useSetUpdateClientBusinessTypeMutation as jest.Mock).mockReturnValue([
      jest.fn()
    ])

    const { getByTestId } = render({
      options: {
        nodeId: pick(fixtures.MockClient.id, ['id', 'businessType']),
        nodeType: 'client'
      }
    })

    expect(getByTestId('ClientBusinessTypeUpdateModalForm')).toBeInTheDocument()
    expect(
      getByTestId('ClientBusinessTypeUpdateModalForm-title')
    ).toHaveTextContent('Change business type')
    expect(
      getByTestId(
        'ClientBusinessTypeUpdateModalForm-initialValues-businessType'
      )
    ).toHaveTextContent(BusinessTypes.SMALL_BUSINESS)
  })
})
