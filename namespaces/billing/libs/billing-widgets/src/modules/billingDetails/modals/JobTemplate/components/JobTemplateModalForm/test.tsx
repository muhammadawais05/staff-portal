import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobTemplateModalForm from './JobTemplateModalForm'
import JobTemplateWarning from '../JobTemplateWarning'

jest.mock('../JobTemplateWarning')

jest.mock('../BillCycleSelect')

const render = (props: ComponentProps<typeof JobTemplateModalForm>) =>
  renderComponent(<JobTemplateModalForm {...props} />)

describe('JobTemplateModalForm', () => {
  it('default render', () => {
    const title = 'Update Job Template'
    const submitButtonText = 'Update'
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      submitButtonText,
      initialValues: {},
      title,
      client: fixtures.MockClient
    })

    expect(getByTestId('JobTemplateModalForm-title')).toHaveTextContent(title)
    expect(getByTestId('JobTemplateModalForm-commitment')).toHaveTextContent(
      'Commitment'
    )
    expect(getByTestId('BillCycleSelect')).toBeInTheDocument()
    expect(getByTestId('JobTemplateModalForm-billDay')).toHaveTextContent(
      'Invoice Day of Week'
    )
    expect(getByTestId('JobTemplateModalForm-submit')).toHaveTextContent(
      submitButtonText
    )

    expect(JobTemplateWarning).toHaveBeenCalledWith(
      { client: fixtures.MockClient },
      {}
    )
  })
})
