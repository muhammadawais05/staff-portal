import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { ClientCollectionSpeed } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CollectionSpeedForm from '.'

const render = (props: ComponentProps<typeof CollectionSpeedForm>) =>
  renderComponent(
    <Form onSubmit={() => {}}>
      <CollectionSpeedForm {...props} />
    </Form>
  )

describe('CollectionSpeedForm', () => {
  it('displays a form', () => {
    const { getByTestId } = render({
      submitting: false,
      initialValue: ClientCollectionSpeed.SLOW_PAY
    })

    expect(
      getByTestId('CollectionSpeedForm-collectionSpeed-select')
    ).toBeInTheDocument()
  })
})
