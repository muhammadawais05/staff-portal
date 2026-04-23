import { CallDirection } from '@staff-portal/graphql/staff'

import { CallsListItemFragment } from '../components/CallTablePage/data/get-calls-list/calls-list-item-fragment.staff.gql.types'
import formatCallType from './format-call-type'

describe('format-call-type', () => {
  describe('when isMissed is false', () => {
    describe('when direction is is INBOUND', () => {
      it('returns "Incoming"', () => {
        const result = formatCallType({
          isMissed: false,
          direction: CallDirection.INBOUND
        } as CallsListItemFragment)

        expect(result).toBe('Incoming')
      })
    })

    describe('when direction is is OUTBOUND', () => {
      it('returns "Outgoing"', () => {
        const result = formatCallType({
          isMissed: false,
          direction: CallDirection.OUTBOUND
        } as CallsListItemFragment)

        expect(result).toBe('Outgoing')
      })
    })
  })

  describe('when isMissed is true', () => {
    describe('when direction is is INBOUND', () => {
      it('returns "Missed"', () => {
        const result = formatCallType({
          isMissed: true,
          direction: CallDirection.INBOUND
        } as CallsListItemFragment)

        expect(result).toBe('Missed')
      })
    })

    describe('when direction is is OUTBOUND', () => {
      it('returns "Missed"', () => {
        const result = formatCallType({
          isMissed: true,
          direction: CallDirection.OUTBOUND
        } as CallsListItemFragment)

        expect(result).toBe('Missed')
      })
    })
  })
})
