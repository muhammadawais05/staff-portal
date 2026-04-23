import { isValueChanged } from '.'

describe('isValueChanged', () => {
  describe('when "resetTotalFunding" is set as "true"', () => {
    describe('when initial value on totalFunding key is null or undefined', () => {
      it.each([null, undefined])(
        'considers updated value as not changed',
        initialValue => {
          const isChanged = isValueChanged(
            'totalFunding',
            { totalFunding: initialValue },
            { resetTotalFunding: true }
          )

          expect(isChanged).toBeFalsy()
        }
      )
    })

    describe('when initial has value on totalFunding key', () => {
      it('considers updated value as changed', () => {
        const isChanged = isValueChanged(
          'totalFunding',
          { totalFunding: '1000' },
          { resetTotalFunding: true }
        )

        expect(isChanged).toBeTruthy()
      })
    })
  })

  it.each([
    [null, undefined],
    [undefined, null]
  ])(
    'considers null and undefined as the same values',
    (oldValue, newValue) => {
      const isChanged = isValueChanged(
        'acquiredBy',
        { acquiredBy: oldValue },
        { acquiredBy: newValue }
      )

      expect(isChanged).toBeFalsy()
    }
  )

  describe('when comparing values are arrays', () => {
    describe('when arrays have different length', () => {
      it.each([[[]], [['a']], [['a', 'b', 'c']]])(
        'considers updated value as changed',
        updatedValue => {
          const isChanged = isValueChanged(
            'acquiredCompanies',
            { acquiredCompanies: ['a', 'b'] },
            { acquiredCompanies: updatedValue }
          )

          expect(isChanged).toBeTruthy()
        }
      )
    })

    it.each([
      [[], []],
      [
        ['a', 'b'],
        ['a', 'b']
      ]
    ])('compares arrays by elements', (oldValue, newValue) => {
      const isChanged = isValueChanged(
        'acquiredCompanies',
        { acquiredCompanies: oldValue },
        { acquiredCompanies: newValue }
      )

      expect(isChanged).toBeFalsy()
    })

    describe('when updated value has the same elements but different order', () => {
      it('considers updated value as changed', () => {
        const isChanged = isValueChanged(
          'acquiredCompanies',
          { acquiredCompanies: ['a', 'b'] },
          { acquiredCompanies: ['b', 'a'] }
        )

        expect(isChanged).toBeTruthy()
      })
    })
  })

  it.each([
    [0, '0'],
    [0, false],
    [false, ''],
    [false, undefined],
    [false, null],
    [true, 'true'],
    [true, 1]
  ])('considers values of different types as changed', (oldValue, newValue) => {
    const isChanged = isValueChanged(
      'email',
      { email: (oldValue as unknown) as string },
      { email: (newValue as unknown) as string }
    )

    expect(isChanged).toBeTruthy()
  })
})
