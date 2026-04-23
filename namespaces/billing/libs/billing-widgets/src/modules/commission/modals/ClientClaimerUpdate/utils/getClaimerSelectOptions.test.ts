import getClaimerSelectOptions from './getClaimerSelectOptions'

describe('getClaimerSelectOptions', () => {
  describe('when an array with staff members is passed', () => {
    it('return an array of options', () => {
      const options = getClaimerSelectOptions([
        { id: '1', fullName: 'John Johnson', type: 'Staff' },
        { id: '2', fullName: 'Adam Adams', type: 'Staff' }
      ])

      expect(options).toEqual(
        expect.arrayContaining([
          { text: 'John Johnson (Staff)', value: '1' },
          { text: 'Adam Adams (Staff)', value: '2' }
        ])
      )
    })
  })
})
