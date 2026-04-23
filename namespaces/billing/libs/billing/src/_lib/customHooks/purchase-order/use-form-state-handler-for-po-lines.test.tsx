import { renderHook } from '@testing-library/react-hooks'

import { useFormStateHandlerForPOLines } from './use-form-state-handler-for-po-lines'

describe('#useFormStateHandlerForPOLines', () => {
  it('return visible po line field when a PO is already selected', () => {
    const mockChange = jest.fn()
    const values = { purchaseOrderId: '123' }
    const { result } = renderHook(() =>
      useFormStateHandlerForPOLines({
        change: mockChange,
        initialPurchaseOrderId: '123',
        values,
        purchaseOrderLines: []
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(true)
  })

  it('hide po line field when PO is not selected', () => {
    const mockChange = jest.fn()
    const values = {}
    const { result } = renderHook(() =>
      useFormStateHandlerForPOLines({
        change: mockChange,
        initialPurchaseOrderId: '123',
        values,
        purchaseOrderLines: []
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(false)
    expect(mockChange).toHaveBeenCalledWith('purchaseOrderLineId', undefined)
  })

  it('hide po line field when PO gets resetted to empty value', () => {
    const mockChange = jest.fn()
    const values = { purchaseOrderId: '' }
    const { result } = renderHook(() =>
      useFormStateHandlerForPOLines({
        change: mockChange,
        initialPurchaseOrderId: '123',
        values,
        purchaseOrderLines: []
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(false)
    expect(mockChange).toHaveBeenCalledWith('purchaseOrderLineId', undefined)
  })

  it('accepts field name', () => {
    const mockChange = jest.fn()
    const values = { mockPOId: '' }
    const { result } = renderHook(() =>
      useFormStateHandlerForPOLines({
        change: mockChange,
        initialPurchaseOrderId: '123',
        purchaseOrderLines: [],
        values,
        purchaseOrderFieldName: 'mockPOId',
        purchaseOrderLineFieldName: 'mockPOLineId'
      })
    )

    expect(result.current.visiblePurchaseOrderLines).toBe(false)
    expect(mockChange).toHaveBeenCalledWith('mockPOLineId', undefined)
  })
})
