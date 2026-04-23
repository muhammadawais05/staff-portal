import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { getOpportunityValueHook } from './get-opportunity-value-hook'
import { GetOpportunityAttributionDocument } from '../data/get-opportunity-attribution.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getOpportunityValueHook', () => {
  it('returns partner', () => {
    when(mockUseLazyQuery)
      .calledWith(GetOpportunityAttributionDocument, {
        variables: { opportunityId: 'testOpportunityId' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { partner: `test partner` } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() =>
      getOpportunityValueHook('testOpportunityId', 'partner')
    )

    expect(current().data).toBe(`test partner`)
  })

  it('returns offering', () => {
    when(mockUseLazyQuery)
      .calledWith(GetOpportunityAttributionDocument, {
        variables: { opportunityId: 'testOpportunityId' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { offering: `test offering` } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() =>
      getOpportunityValueHook('testOpportunityId', 'offering')
    )

    expect(current().data).toBe(`test offering`)
  })

  it('returns source', () => {
    when(mockUseLazyQuery)
      .calledWith(GetOpportunityAttributionDocument, {
        variables: { opportunityId: 'testOpportunityId' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { source: `test source` } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getOpportunityValueHook('testOpportunityId', 'source'))

    expect(current().data).toBe(`test source`)
  })

  it('returns event', () => {
    when(mockUseLazyQuery)
      .calledWith(GetOpportunityAttributionDocument, {
        variables: { opportunityId: 'testOpportunityId' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { event: `test event` } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getOpportunityValueHook('testOpportunityId', 'event'))

    expect(current().data).toBe(`test event`)
  })

  it('returns marketingCampaign', () => {
    when(mockUseLazyQuery)
      .calledWith(GetOpportunityAttributionDocument, {
        variables: { opportunityId: 'testOpportunityId' }
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: { node: { marketingCampaign: `test marketingCampaign` } },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() =>
      getOpportunityValueHook('testOpportunityId', 'marketingCampaign')
    )

    expect(current().data).toBe(`test marketingCampaign`)
  })
})
