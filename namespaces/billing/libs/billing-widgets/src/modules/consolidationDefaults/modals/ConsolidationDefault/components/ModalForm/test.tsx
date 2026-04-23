import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ConsolidationDefaultModalForm from './ConsolidationDefaultModalForm'

const render = (props: ComponentProps<typeof ConsolidationDefaultModalForm>) =>
  renderComponent(<ConsolidationDefaultModalForm {...props} />)

const engagements =
  fixtures.MockGetConsolidationDefaultsModal.data.node.hierarchy.engagements
    .nodes

describe('ConsolidationDefaultModalForm', () => {
  it('default render', () => {
    const title = 'Create Consolidation Default'
    const submitButtonText = 'Create'

    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      submitButtonText: submitButtonText,
      initialValues: {
        clientId: 'VjEtQ2xpZW50LTQ5MjgwNQ',
        engagementIds: []
      },
      title: title,
      engagements
    })

    expect(
      getByTestId('ConsolidationDefaultModalForm-title')
    ).toHaveTextContent(title)

    expect(getByTestId('ConsolidationDefaultModalForm-name')).toHaveTextContent(
      'Consolidation Default Name'
    )

    expect(getByTestId('ClientMultiSelector-container')).toBeInTheDocument()

    expect(getByTestId('ListTable-container')).toBeInTheDocument()

    expect(
      getByTestId('ConsolidationDefaultModalForm-submit')
    ).toHaveTextContent(submitButtonText)
  })
})
