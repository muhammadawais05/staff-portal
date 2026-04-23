import { FinalForm } from '@toptal/picasso-forms'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommitmentChangeModalFormTable from '.'

jest.mock('../CommitmentChangeModalFormTableRow')

describe('CommitmentChangeModalFormTable', () => {
  it('default render', () => {
    const { container } = renderComponent(
      <FinalForm
        initialValues={{
          canBeDiscounted: true,
          changeDate: '2020-04-04',
          commitment: 'hourly',
          companyFullTimeRate: 240,
          companyHourlyRate: 50,
          companyPartTimeRate: 150,
          discountMultiplier: 1.2,
          engagementId: 'abc',
          notifyCompany: true,
          notifyTalent: true,
          talentFullTimeRate: 260,
          talentHourlyRate: 60,
          talentPartTimeRate: 160
        }}
        onSubmit={jest.fn()}
        render={() => <CommitmentChangeModalFormTable />}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
