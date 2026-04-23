import getColumnWidth from './get-column-width'

describe('#getColumnWidth', () => {
  describe('when `labelWidth` value defined', () => {
    describe('when `isFullWidthLabel` is `false`', () => {
      it('returns aligned values', () => {
        expect(
          getColumnWidth({ labelWidth: 25, isFullWidthLabel: false })
        ).toEqual({
          adjustedLabelWidth: '25rem',
          adjustedValueWidth: 'calc(100% - 25rem)'
        })
      })
    })

    describe('when `isFullWidthLabel` is `true`', () => {
      it('returns full width values', () => {
        expect(
          getColumnWidth({ labelWidth: 25, isFullWidthLabel: true })
        ).toEqual({
          adjustedLabelWidth: '100%',
          adjustedValueWidth: '100%'
        })
      })
    })

    describe('when `hasHalfWidthItems` is `false`', () => {
      it('returns aligned values', () => {
        expect(
          getColumnWidth({ labelWidth: 25, hasHalfWidthItems: false })
        ).toEqual({
          adjustedLabelWidth: '25rem',
          adjustedValueWidth: 'calc(100% - 25rem)'
        })
      })
    })

    describe('when `hasHalfWidthItems` is `true`', () => {
      it('returns half width values', () => {
        expect(
          getColumnWidth({ labelWidth: 25, hasHalfWidthItems: true })
        ).toEqual({
          adjustedLabelWidth: '50%',
          adjustedValueWidth: '50%'
        })
      })
    })
  })

  describe('when `labelWidth` value undefined', () => {
    it('returns full width values', () => {
      expect(getColumnWidth({})).toEqual({
        adjustedLabelWidth: '100%',
        adjustedValueWidth: '100%'
      })
    })
  })
})
