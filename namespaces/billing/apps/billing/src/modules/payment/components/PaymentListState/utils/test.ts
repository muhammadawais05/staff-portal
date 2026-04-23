import {
  PayeeRolesQueryParam,
  PaymentListPresetQueryParam,
  PayeeRolesToGqlParam,
  PresetGqlParam
} from './filters'

describe('PaymentListState utils', () => {
  it('#PayeeRolesToGqlParam', () => {
    expect(PayeeRolesToGqlParam(['a', 'b', 'c'])).toEqual(['A', 'B', 'C'])
  })

  it('#PayeeRolesQueryParam', () => {
    expect(PayeeRolesQueryParam.encode(['a'])).toEqual(['a'])
    expect(PayeeRolesQueryParam.encode(['A'])).toEqual(['a'])
    expect(PayeeRolesQueryParam.decode(['B'])).toEqual(['B'])
    expect(PayeeRolesQueryParam.decode(['b'])).toEqual(['B'])
  })

  it('#PresetGqlParam', () => {
    expect(PresetGqlParam()('toptalPayments')).toBe('TOPTAL_PAYMENTS')
    expect(PresetGqlParam()('payoneer')).toBe('PAYONEER')
    expect(PresetGqlParam()('test_test')).toBe('TEST_TEST')
  })

  it('#PaymentListPresetQueryParam', () => {
    expect(PaymentListPresetQueryParam.encode('')).toBe(
      'filters.fields.radio.preset.'
    )
    expect(PaymentListPresetQueryParam.encode('foo')).toBe(
      'filters.fields.radio.preset.foo'
    )
    expect(PaymentListPresetQueryParam.encode('default')).toBe('Not Selected')
    expect(PaymentListPresetQueryParam.encode('payoneer')).toBe('Payoneer')
    expect(PaymentListPresetQueryParam.encode('staffCommissions')).toBe(
      'Staff commissions'
    )
    expect(PaymentListPresetQueryParam.encode('toptalPayments')).toBe(
      'Toptal payments'
    )
    expect(PaymentListPresetQueryParam.decode('Not Selected')).toBe('default')
    expect(PaymentListPresetQueryParam.decode('Payoneer')).toBe('payoneer')
    expect(PaymentListPresetQueryParam.decode('Staff commissions')).toBe(
      'staffCommissions'
    )
    expect(PaymentListPresetQueryParam.decode('Toptal payments')).toBe(
      'toptalPayments'
    )
    expect(PaymentListPresetQueryParam.decode('foo')).toBe('')
  })
})
