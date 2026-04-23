import { renderHook } from '@testing-library/react-hooks'

import useGetPurchaseOrderFormState from './useGetPurchaseOrderFormState'

jest.mock('../data')

describe('#useGetPurchaseOrderFormState', () => {
  it('return visible po line field when a PO is already selected', () => {
    const mockChange = jest.fn()
    const values = { purchaseOrderId: '123' }
    const { result } = renderHook(() =>
      useGetPurchaseOrderFormState({
        change: mockChange,
        currentPOid: '123',
        values
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(true)
  })

  it('hide po line field when PO is not selected', () => {
    const mockChange = jest.fn()
    const values = {}
    const { result } = renderHook(() =>
      useGetPurchaseOrderFormState({
        change: mockChange,
        currentPOid: '123',
        values
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(false)
    expect(mockChange).toHaveBeenCalledWith('purchaseOrderLineId', undefined)
  })

  it('hide po line field when PO gets resetted to empty value', () => {
    const mockChange = jest.fn()
    const values = { purchaseOrderId: '' }
    const { result } = renderHook(() =>
      useGetPurchaseOrderFormState({
        change: mockChange,
        currentPOid: '123',
        values
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(false)
    expect(mockChange).toHaveBeenCalledWith('purchaseOrderLineId', undefined)
  })

  it('accepts field name', () => {
    const mockChange = jest.fn()
    const values = { purchaseOrderId: '' }
    const { result } = renderHook(() =>
      useGetPurchaseOrderFormState({
        change: mockChange,
        currentPOid: '123',
        values,
        poLineFieldName: 'mockName'
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(false)
    expect(mockChange).toHaveBeenCalledWith('mockName', undefined)
  })
})
