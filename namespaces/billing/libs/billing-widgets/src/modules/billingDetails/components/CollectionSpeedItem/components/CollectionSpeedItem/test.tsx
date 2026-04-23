import React, { ComponentProps } from 'react'
import {
  ClientCollectionSpeed,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CollectionSpeedItem from '.'

jest.mock('../../../../data', () => ({
  useSetUpdateClientCollectionSpeedMutation: () => []
}))
const render = (props: ComponentProps<typeof CollectionSpeedItem>) =>
  renderComponent(<CollectionSpeedItem {...props} />)

describe('CollectionSpeedItem', () => {
  it('renders component toggler with a form', () => {
    const { getByTestId } = render({
      initialValues: {
        collectionSpeed: ClientCollectionSpeed.SLOW_PAY,
        clientId: 'clientId'
      },
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    })

    expect(getByTestId('CollectionSpeedItem')).toBeInTheDocument()
  })
})
