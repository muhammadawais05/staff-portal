import { fireEvent } from '@toptal/picasso/test-utils'
import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetList from '.'

const render = (props: ComponentProps<typeof TimesheetList>) =>
  renderComponent(<TimesheetList {...props} />)

let mockedRefetch: unknown
const mockDispatch = jest.fn()

const mockModalState = () => ({
  modal: {
    modalName: 'timesheet',
    options: { billingCycleId: '333676', variant: 'all' }
  }
})

jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    dispatch: mockDispatch,
    state: mockModalState()
  })
}))
jest.mock('./useButtonNavigation')

describe('TimesheetList', () => {
  beforeEach(() => MockDate.set('2019/05/20 19:00'))

  afterEach(() => {
    MockDate.reset()
  })

  describe('calling useMessageListener', () => {
    beforeEach(() => {
      mockedRefetch = jest.fn()
    })

    it('calls useMessageListener properly', () => {
      render({
        limitElements: 1,
        refetch: mockedRefetch,
        timesheets: fixtures.MockBillingCyclesWithTimesheet
      })

      expect(useMessageListener).toHaveBeenCalledTimes(1)
      expect(useMessageListener).toHaveBeenCalledWith(
        [
          ApolloContextEvents.timesheetUpdate,
          ApolloContextEvents.timesheetSubmit,
          ApolloContextEvents.timesheetUnsubmit
        ],
        mockedRefetch
      )
    })
  })

  describe('click handlers for `Timesheet List Item`', () => {
    beforeEach(() => {
      mockDispatch.mockClear()
    })

    it('click on `Timesheet List Item` Label', () => {
      const { getByTestId } = render({
        limitElements: 1,
        timesheets: fixtures.MockBillingCyclesWithTimesheet
      })

      const itemLabel = getByTestId('item-label') as Element

      fireEvent.click(itemLabel)

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          modalName: 'timesheet',
          options: {
            billingCycleId: '333676',
            variant: 'normal'
          }
        },
        type: 'showModal'
      })
    })

    it('click on `Timesheet List Item` Edit Button', () => {
      const { getByTestId } = render({
        limitElements: 1,
        timesheets: fixtures.MockBillingCyclesWithTimesheet
      })

      const editButton = getByTestId('edit-button') as Element

      fireEvent.click(editButton)

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: {
          modalName: 'timesheet-edit',
          options: {
            billingCycleId: '333676',
            variant: 'normal'
          }
        },
        type: 'showModal'
      })
    })
  })

  describe('when list is empty', () => {
    it('render empty message', () => {
      const { queryByTestId } = render({
        limitElements: 1,
        timesheets: []
      })

      expect(queryByTestId('TimesheetList')).not.toBeInTheDocument()
    })
  })

  describe('when list is not empty', () => {
    describe('when `limitElements` has been set', () => {
      it('renders a single `TimesheetListItem`', () => {
        const { getByTestId, getAllByTestId } = render({
          limitElements: 1,
          timesheets: fixtures.MockBillingCyclesWithTimesheet
        })

        expect(getByTestId('Section-title')).toContainHTML('Timesheets')
        expect(getByTestId('TimesheetList')).toBeInTheDocument()
        expect(getAllByTestId('TimesheetListItem')).toHaveLength(1)

        fireEvent.click(getByTestId('button-showmore'))

        expect(getAllByTestId('TimesheetListItem')).toHaveLength(4)
      })
    })

    describe('when `limitElements` is undefined', () => {
      it('renders a 4 `TimesheetListItem`', () => {
        const { getByTestId, getAllByTestId } = render({
          timesheets: fixtures.MockBillingCyclesWithTimesheet
        })

        expect(getByTestId('Section-title')).toContainHTML('Timesheets')
        expect(getByTestId('TimesheetList')).toBeInTheDocument()
        expect(getAllByTestId('TimesheetListItem')).toHaveLength(4)
      })
    })
  })

  describe('#handleUseEffectFn', () => {
    // eslint-disable-next-line
    let mockHandleExternalListenOnEvent: any,
      // eslint-disable-next-line
      mockHandleExternalUnsubscribeOnEvent: any,
      // eslint-disable-next-line
      mockRefetch: any,
      // eslint-disable-next-line
      mockSetExpandedState: any

    beforeEach(() => {
      mockRefetch = jest.fn()
      mockHandleExternalListenOnEvent = jest.fn()
      mockHandleExternalUnsubscribeOnEvent = jest.fn()
      mockSetExpandedState = jest.fn()
    })

    describe('when `isTimesheetExtendedStoredUrl` is `true`', () => {
      it('called function properly', () => {
        // eslint-disable-next-line
        // @ts-ignore
        TimesheetList.effectFn({
          handleInboundEvent: mockHandleExternalListenOnEvent,
          handleInboundEventUnsubscribe: undefined,
          isTimesheetExtendedStoredUrl: true,
          refetch: mockRefetch,
          setExpandedState: mockSetExpandedState
        })()

        expect(mockSetExpandedState).toHaveBeenCalledTimes(1)
        expect(mockSetExpandedState).toHaveBeenCalledWith(true)
      })
    })

    describe('when `handleInboundEvent` is provided', () => {
      it('called function properly', () => {
        // eslint-disable-next-line
        // @ts-ignore
        TimesheetList.effectFn({
          handleInboundEvent: mockHandleExternalListenOnEvent,
          handleInboundEventUnsubscribe: undefined,
          refetch: mockRefetch
        })()

        expect(mockHandleExternalListenOnEvent).toHaveBeenCalledTimes(1)
        expect(mockHandleExternalListenOnEvent).toHaveBeenCalledWith(
          'refetch_query:billingCyclesWithTimesheets',
          {
            refetchQuery: mockRefetch
          }
        )
      })

      describe('when `handleInboundEventUnsubscribe` is provided', () => {
        it('called function properly', () => {
          // eslint-disable-next-line
          // @ts-ignore
          TimesheetList.effectFn({
            handleInboundEvent: mockHandleExternalListenOnEvent,
            handleInboundEventUnsubscribe: mockHandleExternalUnsubscribeOnEvent,
            refetch: mockRefetch
          })()()

          expect(mockHandleExternalListenOnEvent).toHaveBeenCalledTimes(1)
          expect(mockHandleExternalListenOnEvent).toHaveBeenCalledWith(
            'refetch_query:billingCyclesWithTimesheets',
            {
              refetchQuery: mockRefetch
            }
          )

          expect(mockHandleExternalUnsubscribeOnEvent).toHaveBeenCalledTimes(1)
          expect(mockHandleExternalUnsubscribeOnEvent).toHaveBeenCalledWith(
            'refetch_query:billingCyclesWithTimesheets'
          )
        })
      })
    })
  })

  describe('#handleUseEffectRestoreExpandedState', () => {
    // eslint-disable-next-line
    let mockSetExpandedState: any

    beforeEach(() => {
      mockSetExpandedState = jest.fn()
    })

    describe('when `expanded` is `true`', () => {
      it('called function properly', () => {
        // eslint-disable-next-line
        // @ts-ignore
        TimesheetList.effectFnRestoreExpanded({
          expanded: true,
          setExpandedState: mockSetExpandedState
        })()

        expect(mockSetExpandedState).toHaveBeenCalledTimes(1)
        expect(mockSetExpandedState).toHaveBeenCalledWith(true)
      })
    })

    describe('when `expanded` is `false`', () => {
      it('called function properly', () => {
        // eslint-disable-next-line
        // @ts-ignore
        TimesheetList.effectFnRestoreExpanded({
          expanded: false,
          setExpandedState: mockSetExpandedState
        })()

        expect(mockSetExpandedState).not.toHaveBeenCalled()
      })
    })
  })
})
