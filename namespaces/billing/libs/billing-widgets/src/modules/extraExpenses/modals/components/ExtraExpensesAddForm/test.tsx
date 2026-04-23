import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { PurchaseOrderFragment } from '../../../../__fragments__/purchaseOrderFragment.graphql.types'
import ExtraExpensesAddForm from '.'

jest.mock(
  '@staff-portal/billing/src/_lib/context/externalIntegratorContext',
  () => ({
    useExternalIntegratorContext: () => ({ modalContainer: 'exampleContainer' })
  })
)

jest.mock('@staff-portal/billing/src/_lib/form/fieldValidators')
jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock(
  '@staff-portal/billing/src/data/getExperiments.graphql.types',
  () => ({
    useGetExperimentsQuery: () => [jest.fn()]
  })
)

const initialValues = {
  engagementId: fixtures.MockEngagement.id,
  companyAmount: '105',
  description: 'MY DESCRIPTION',
  purchaseOrderId: '123456',
  talentAmount: '15'
}

const { displayName } = ExtraExpensesAddForm

const render = (props: ComponentProps<typeof ExtraExpensesAddForm>) =>
  renderComponent(
    // eslint-disable-next-line react/jsx-handler-names
    <Form initialValues={initialValues} onSubmit={jest.fn}>
      <ExtraExpensesAddForm {...props} />
    </Form>
  )

describe('ExtraExpensesAddForm', () => {
  it('default render', () => {
    const { getByTestId, getByRole } = render({
      purchaseOrders: [
        {
          budgetSpent: false,
          id: '123457',
          poNumber: '1234'
        } as PurchaseOrderFragment
      ],
      purchaseOrderLines: {},
      jobTitle: 'JOB TITLE',
      talentName: 'TALENT NAME'
    })

    expect(getByRole('button')).toHaveAttribute('type', 'submit')
    expect(getByTestId('companyAmount')).toHaveValue('105')
    expect(getByTestId('talentAmount')).toHaveValue('15')
    expect(getByTestId('description')).toHaveValue('MY DESCRIPTION')
    expect(getByTestId(`${displayName}-title`)).toBeInTheDocument()
    expect(getByTestId('description')).toHaveAttribute(
      'placeholder',
      'Extra expenses from TALENT NAME for JOB TITLE'
    )
  })
  it('renders as inline form', () => {
    const { queryByRole, queryByTestId } = render({
      purchaseOrders: [
        {
          budgetSpent: false,
          id: '123457',
          poNumber: '1234'
        } as PurchaseOrderFragment
      ],
      purchaseOrderLines: {},
      isInline: true,
      jobTitle: 'JOB TITLE',
      talentName: 'TALENT NAME'
    })

    expect(queryByTestId(`${displayName}-title`)).not.toBeInTheDocument()
    expect(queryByRole('button')).not.toBeInTheDocument()
  })
})
