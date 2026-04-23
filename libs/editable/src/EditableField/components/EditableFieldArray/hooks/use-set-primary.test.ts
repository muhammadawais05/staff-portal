import { renderHook } from '@testing-library/react-hooks'
import { FieldArrayRenderProps, useForm } from '@toptal/picasso-forms'

import useSetPrimary from './use-set-primary'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn()
}))

const mockedUseForm = useForm as jest.Mock

describe('useSetPrimary', () => {
  const mockBatch = jest.fn()

  beforeEach(() => {
    mockedUseForm.mockReturnValue({
      change: jest.fn(),
      batch: mockBatch
    })
  })

  describe('when set primary', () => {
    it('updates all the fields with primary false except the selected one', async () => {
      const formName = 'formName'
      const itemIndex = 0
      const mockedUpdate = jest.fn()
      const fields = {
        value: [{}, {}],
        update: mockedUpdate
      } as unknown as FieldArrayRenderProps<{}, HTMLElement>['fields']

      const {
        result: { current }
      } = renderHook(() => useSetPrimary(formName))

      current.setPrimary({
        itemIndex,
        fields
      })

      expect(mockBatch).toHaveBeenCalledTimes(1)
      expect(mockedUpdate).toHaveBeenCalledTimes(1)
      expect(mockedUpdate).toHaveBeenLastCalledWith(itemIndex, {
        ...fields.value[itemIndex],
        primary: true
      })
    })
  })
})
