import React, { useState } from 'react'
import {
  Button,
  Close16,
  Container,
  Menu,
  Time16,
  Typography
} from '@toptal/picasso'
import { FormSpy, useForm } from '@toptal/picasso-forms'
import { parseAndFormatDate, addDays } from '@staff-portal/date-time-utils'
import { DatePickerValue, DatePickerWrapper } from '@staff-portal/ui'
import { Scalars } from '@staff-portal/graphql/staff'

import { SendEmailFormValues } from '../SendEmailForm'
import * as S from './styles'

const MIN_RESTRICTION_DAYS = 1

type OnTimeFirmValue = SendEmailFormValues['onTime']

const getButtonText = (onTime: OnTimeFirmValue) =>
  onTime ? `Send email on ${parseAndFormatDate(onTime)}` : 'Send email'

const processDate = (date: DatePickerValue) => {
  return typeof date === 'string' ? date : undefined
}

const SendEmailScheduledSubmitButton = () => {
  const { submit, change } = useForm<SendEmailFormValues>()
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleScheduleClearMenuClick = () => {
    change('onTime', undefined)
    setShowDatePicker(false)
  }
  const handleScheduleSendMenuClick = () => {
    setShowDatePicker(true)
  }
  const handleDatePickerBlur = () => {
    setShowDatePicker(false)
  }
  const handleDatePickerChange = (value: DatePickerValue) => {
    // TODO: use helper to convert Scalars['Date'] to Scalars['Time']
    change('onTime', processDate(value) as Scalars['Time'])
    setShowDatePicker(false)
  }

  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = addDays(new Date(), MIN_RESTRICTION_DAYS)

  const renderMenu = (onTime: OnTimeFirmValue) => (
    <Menu>
      {onTime ? (
        <Menu.Item
          onClick={handleScheduleClearMenuClick}
          data-testid='send-email-scheduled-submit-button-menu-item-clear'
        >
          <Container as='span' right='xsmall'>
            <Close16 color='red' />
          </Container>
          <Typography size='medium'>Clear Schedule</Typography>
        </Menu.Item>
      ) : (
        <Menu.Item
          onClick={handleScheduleSendMenuClick}
          data-testid='send-email-scheduled-submit-button-menu-item-schedule'
        >
          <Container as='span' right='xsmall'>
            <Time16 color='blue' />
          </Container>
          <Typography size='medium'>Schedule Send</Typography>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <FormSpy<SendEmailFormValues>>
      {({ submitting, values: { onTime } }) => (
        <>
          {showDatePicker && (
            <Container css={S.datePickerWrap}>
              <DatePickerWrapper
                testIds={{
                  calendar: 'send-email-scheduled-submit-button-date-picker'
                }}
                minDate={minDate}
                // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
                value={onTime as Scalars['Date']}
                onChange={handleDatePickerChange}
                onBlur={handleDatePickerBlur}
                autoFocus
              />
            </Container>
          )}

          <Button.Split
            menu={renderMenu(onTime)}
            onClick={submit}
            disabled={submitting}
            testIds={{
              actionButton: 'send-email-scheduled-submit-button-submit-button',
              menuButton: 'send-email-scheduled-submit-button-menu-button'
            }}
          >
            {getButtonText(onTime)}
          </Button.Split>
        </>
      )}
    </FormSpy>
  )
}

export default SendEmailScheduledSubmitButton
