import { Form } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetDayEdit from '.'
import { handleOnSelect } from './TimesheetDayEdit'

const render = (props: ComponentProps<typeof TimesheetDayEdit>) =>
  renderComponent(
    <Form
      initialValues={{
        timesheetRecords: [
          { hours: '45', isBreak: false, minutes: '25' },
          { hours: '15', isBreak: true, minutes: '45' }
        ]
      }}
      onSubmit={noop}
      render={() => <TimesheetDayEdit {...props} />}
    />
  )

describe('TimesheetDayEdit', () => {
  describe('when edit is enabled', () => {
    it('default render', () => {
      const { getByTestId } = render({
        autoFocusHours: false,
        disabled: false,
        fieldName: 'timesheetRecords[0]',
        handleOnBlur: jest.fn(() => noop),
        handleOnChange: jest.fn(() => noop),
        handleOnFocus: jest.fn(() => noop)
      })

      expect(getByTestId('hours')).toBeInTheDocument()
      expect(getByTestId('minutes')).toBeInTheDocument()
    })
  })

  it('#handleOnSelect', () => {
    const selectMock = jest.fn()

    handleOnSelect({
      currentTarget: { select: selectMock }
    } as unknown as React.MouseEvent<HTMLInputElement>)

    expect(selectMock).toHaveBeenCalled()
  })
})
