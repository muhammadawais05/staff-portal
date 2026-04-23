import { FinalForm } from '@toptal/picasso-forms'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommitmentChangeModalForm from './CommitmentChangeModalForm'

jest.mock('../CommitmentChangeModalFormTable')
jest.mock('@staff-portal/billing/src/components/FormInputCheckbox')
jest.mock('@staff-portal/billing/src/components/FormInputDatePicker')
jest.mock('@staff-portal/billing/src/components/FormInputSelect')
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = () =>
  renderComponent(
    <FinalForm
      initialValues={{
        canBeDiscounted: true,
        changeDate: '2020-04-04',
        commitment: 'hourly',
        companyFullTimeRate: 240,
        companyHourlyRate: 50,
        companyPartTimeRate: 150,
        defaultDiscount: true,
        discountMultiplier: 1.2,
        engagementId: 'abc',
        fullTimeDiscount: 10,
        markup: 10,
        notifyCompany: true,
        notifyTalent: true,
        partTimeDiscount: 5,
        rateMethod: 'default',
        talentFullTimeRate: 260,
        talentHourlyRate: 60,
        talentPartTimeRate: 160
      }}
      onSubmit={jest.fn()}
      render={finalFormProps => (
        <CommitmentChangeModalForm
          finalFormProps={finalFormProps}
          job={{ title: 'Facemoji Keyboard Designer' }}
        />
      )}
    />
  )

describe('CommitmentChangeModalFormTable', () => {
  it('default render', () => {
    const { container, queryByTestId } = render()

    expect(container).toMatchSnapshot()
    expect(queryByTestId('markup')).toBeInTheDocument()
    expect(queryByTestId('rateOverrideReason')).not.toBeInTheDocument()
  })
})
