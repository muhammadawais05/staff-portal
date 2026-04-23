import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import MinimumCommitmentModalForm from '.'

const render = (props: ComponentProps<typeof MinimumCommitmentModalForm>) =>
  renderComponent(<MinimumCommitmentModalForm {...props} />)

jest.mock('@staff-portal/billing/src/_lib/context/externalIntegratorContext')

describe('MinimumCommitmentModalForm', () => {
  it('default render', () => {
    ;(useExternalIntegratorContext as jest.Mock).mockReturnValue({
      modalContainer: 'a'
    })
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: { minimumHours: 4, comment: 'Comment' },
      title: 'Title of the modal'
    })

    expect(getByTestId('Tooltip-content')).toHaveTextContent(
      'Minimum Commitment is a fee charged to the client when a billing cycle has less than 5 hrs/week logged for an hourly engagement. It’s different from the Estimated Weekly Hours, which is an estimate for the weekly workload.'
    )
    expect(
      getByTestId(`${MinimumCommitmentModalForm.displayName}-title`)
    ).toHaveTextContent('Title of the modal')
    expect(
      getByTestId(`${MinimumCommitmentModalForm.displayName}-minimum-hours`)
    ).toHaveTextContent('Minimum Commitment')
    expect(
      getByTestId(`${MinimumCommitmentModalForm.displayName}-comment`)
    ).toHaveTextContent('Comment')
    expect(
      getByTestId(
        `${MinimumCommitmentModalForm.displayName}-minimum-hours-addon`
      )
    ).toHaveTextContent('hours per week')
    expect(getByTestId('submit')).toHaveTextContent('Update Minimum Commitment')
  })
})
