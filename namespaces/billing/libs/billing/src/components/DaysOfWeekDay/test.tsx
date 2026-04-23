import React, { ComponentProps, ReactNode } from 'react'

import DaysOfWeekDay from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof DaysOfWeekDay>
) => renderComponent(<DaysOfWeekDay {...props}>{children}</DaysOfWeekDay>)

describe('DaysOfWeekDay', () => {
  it('default render', () => {
    const { container } = render(null, {
      day: 'Sudnay',
      index: 7,
      isLastDayOfWeek: true,
      isWeekend: true
    })

    expect(container).toMatchSnapshot()
  })
})
