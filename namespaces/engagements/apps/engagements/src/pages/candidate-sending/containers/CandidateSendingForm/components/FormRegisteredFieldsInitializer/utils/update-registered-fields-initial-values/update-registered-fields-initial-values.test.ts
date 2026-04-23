import updateRegisteredFieldsInitialValues from './update-registered-fields-initial-values'

describe('updateRegisteredFieldsInitialValues', () => {
  describe('when field is not modified', () => {
    it('resets field state and updates field initial value', () => {
      const changeFieldValueMock = jest.fn()

      updateRegisteredFieldsInitialValues({
        initialValues: {
          foo: 'initial',
          bar: 'other'
        },
        modifiedFields: {
          foo: false,
          bar: true,
          baz: true
        },
        changeFieldValue: changeFieldValueMock
      })

      expect(changeFieldValueMock).toHaveBeenCalledWith('foo', 'initial')
    })

    describe('when no initial value', () => {
      it('ignores such field', () => {
        const changeFieldValueMock = jest.fn()

        updateRegisteredFieldsInitialValues({
          initialValues: {
            bar: 'other'
          },
          modifiedFields: {
            foo: false,
            bar: true,
            baz: true
          },
          changeFieldValue: changeFieldValueMock
        })

        expect(changeFieldValueMock).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when all fields are modified', () => {
    it('ignores these fields', () => {
      const changeFieldValueMock = jest.fn()

      updateRegisteredFieldsInitialValues({
        initialValues: {
          foo: 'initial',
          bar: 'other'
        },
        modifiedFields: {
          foo: true,
          bar: true,
          baz: true
        },
        changeFieldValue: changeFieldValueMock
      })

      expect(changeFieldValueMock).toHaveBeenCalledTimes(0)
    })
  })
})
