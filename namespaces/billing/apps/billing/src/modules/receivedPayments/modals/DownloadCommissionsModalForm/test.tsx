import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { screen } from '@toptal/picasso/test-utils'
import { CommissionStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DownloadCommissionsModalForm from '.'

jest.mock(
  '@staff-portal/billing/src/components/FormInputDatePicker/FormInputDatePicker'
)
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  props = {
    initialValues: { filter: { commissionStatus: CommissionStatus.PAID } }
  }
) =>
  renderComponent(
    <Form onSubmit={jest.fn()} {...props}>
      <DownloadCommissionsModalForm />
    </Form>
  )

describe('DownloadCommissionsModalForm', () => {
  it('renders date pickers', () => {
    render()

    expect(screen.getByTestId('startDate')).toBeInTheDocument()
    expect(screen.getByTestId('endDate')).toBeInTheDocument()
  })

  describe('when Outstanding button is selected', () => {
    it('hides date pickers', () => {
      render({
        initialValues: {
          filter: { commissionStatus: CommissionStatus.OUTSTANDING }
        }
      })
      expect(screen.queryByTestId('startDate')).not.toBeInTheDocument()
      expect(screen.queryByTestId('endDate')).not.toBeInTheDocument()
    })
  })
})
