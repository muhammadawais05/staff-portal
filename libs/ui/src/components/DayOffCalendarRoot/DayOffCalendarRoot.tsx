import React from 'react'
import { Container } from '@toptal/picasso'
import { CalendarProps } from '@toptal/picasso/Calendar/types'

const DayOffCalendarRoot = ({ children }: CalendarProps) =>
  <Container
    direction='column'
    flex
  >{children}
  </Container>

export default DayOffCalendarRoot
