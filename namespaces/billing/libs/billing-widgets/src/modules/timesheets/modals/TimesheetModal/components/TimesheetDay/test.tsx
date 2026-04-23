import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetDay from '.'

jest.mock('../TimesheetDayEdit')

const render = (props: ComponentProps<typeof TimesheetDay>) =>
  renderComponent(
    <TimesheetDay {...props}>{JSON.stringify(props)}</TimesheetDay>
  )

const BASE_PROPS = {
  date: '2019-05-20',
  hours: 5
}

describe('TimesheetDay', () => {
  describe('default props', () => {
    it('default render', () => {
      const { container } = render(BASE_PROPS)

      expect(container).toMatchSnapshot()
    })
  })

  describe('props `isLastDayInWeek`', () => {
    it('default render', () => {
      const { container } = render({ isLastDayInWeek: true, ...BASE_PROPS })

      expect(container).toMatchSnapshot()
    })
  })

  describe('props `isLastWeek`', () => {
    it('default render', () => {
      const { container } = render({ isLastWeek: true, ...BASE_PROPS })

      expect(container).toMatchSnapshot()
    })
  })

  describe('props `isPartOfTimesheet`', () => {
    it('default render', () => {
      const { container } = render({ isPartOfTimesheet: true, ...BASE_PROPS })

      expect(container).toMatchSnapshot()
    })
  })

  describe('props `isBreak`', () => {
    it('default render', () => {
      const { container } = render({ isBreak: true, ...BASE_PROPS })

      expect(container).toMatchSnapshot()
    })

    describe('isPartOfTimesheet', () => {
      describe('when hours is 0', () => {
        it('default render', () => {
          const { container } = render({
            isBreak: true,
            ...BASE_PROPS,
            hours: 0,
            isEdit: true,
            isPartOfTimesheet: true
          })

          expect(container).toMatchSnapshot()
        })
      })

      describe('when hours is "0.0"', () => {
        it('default render', () => {
          const { container } = render({
            isBreak: true,
            ...BASE_PROPS,
            hours: '0.0',
            isEdit: true,
            isPartOfTimesheet: true
          })

          expect(container).toMatchSnapshot()
        })
      })

      describe('when hours is "0."', () => {
        it('default render', () => {
          const { container } = render({
            isBreak: true,
            ...BASE_PROPS,
            hours: '0.',
            isEdit: true,
            isPartOfTimesheet: true
          })

          expect(container).toMatchSnapshot()
        })
      })

      describe('when hours is ".0"', () => {
        it('default render', () => {
          const { container } = render({
            isBreak: true,
            ...BASE_PROPS,
            hours: '.0',
            isEdit: true,
            isPartOfTimesheet: true
          })

          expect(container).toMatchSnapshot()
        })
      })

      describe('when hours is ""', () => {
        it('default render', () => {
          const { container } = render({
            isBreak: true,
            ...BASE_PROPS,
            hours: '',
            isEdit: true,
            isPartOfTimesheet: true
          })

          expect(container).toMatchSnapshot()
        })
      })
    })
  })

  describe('props `isWeekend`', () => {
    it('default render', () => {
      const { container } = render({ isWeekend: true, ...BASE_PROPS })

      expect(container).toMatchSnapshot()
    })
  })
})
