import { Form, useFormState } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import { noop } from 'lodash-es'
import { within } from '@testing-library/react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import FormEngagementList from '.'

const mockUseFormState = useFormState as jest.Mock

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useFormState: jest.fn()
}))

const mockClientWebResource = {
  text: '4150657198',
  url: 'https://staging.toptal.net/platform/staff/purchase_orders/2072'
}

const render = (props: ComponentProps<typeof FormEngagementList>) =>
  renderComponent(
    <Form onSubmit={noop}>
      <FormEngagementList {...props} />
    </Form>
  )

describe('FormEngagementList', () => {
  it('default render', () => {
    mockUseFormState.mockImplementation(() => {
      return { values: { engagementIds: ['engagement_id_4'] } }
    })

    const { queryAllByTestId } = render({
      engagements: [
        {
          id: 'engagement_id_1',
          isWorking: true,
          client: { id: 'client_id_1', webResource: mockClientWebResource }
        },
        {
          id: 'engagement_id_2',
          isWorking: true,
          client: { id: 'client_id_1', webResource: mockClientWebResource }
        },
        {
          id: 'engagement_id_3',
          isWorking: true,
          client: { id: 'client_id_2', webResource: mockClientWebResource }
        },
        {
          id: 'engagement_id_4',
          isWorking: true,
          client: { id: 'client_id_3', webResource: mockClientWebResource }
        }
      ],
      selectedClientIds: ['client_id_1']
    })

    const rows = queryAllByTestId('EngagementsTableRow')

    expect(rows).toHaveLength(3)

    expect(
      within(rows[0]).getByTestId('EngagementsTableRow-checkbox')
    ).toBeInTheDocument()

    expect(
      within(rows[1]).getByTestId('EngagementsTableRow-checkbox')
    ).toBeInTheDocument()

    expect(
      within(rows[2]).getByTestId('EngagementsTableRow-checkbox')
    ).toBeInTheDocument()
  })
})
