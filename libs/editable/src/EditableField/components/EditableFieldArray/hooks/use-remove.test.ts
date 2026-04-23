import { renderHook } from '@testing-library/react-hooks'
import { FieldArrayRenderProps, useForm } from '@toptal/picasso-forms'

import useRemove from './use-remove'

type FieldsType = FieldArrayRenderProps<{
  destroy: boolean,
  primary: boolean,
  id: string
}, HTMLElement>['fields']

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn()
}))

const mockedUseForm = useForm as jest.Mock

describe('useRemove', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockedUseForm.mockReturnValue({
      change: mockOnChange
    })
  })

  describe('primary item remove', () => {
    describe('when remove from the collection of not destroyed items', () => {
      it('changes nearest not destroyed to the primary', async () => {
        const formName = 'formName'
        const itemIndex = 0
        const item = {
          destroy: true,
          primary: true,
          id: 'test'
        }
        const mockedUpdate = jest.fn()
        const mockedRemove = jest.fn()
        const fields = {
          value: [item, {
            primary: false,
            destroy: false,
            id: 'test2'
          }],
          update: mockedUpdate,
          remove: mockedRemove
        } as unknown as FieldsType

        const {
          result: { current }
        } = renderHook(() => useRemove(formName))

        current.remove({
          itemIndex,
          fields
        })

        expect(mockOnChange).toHaveBeenCalledTimes(1)
        expect(mockOnChange).toHaveBeenCalledWith(`${formName}.1.primary`, true)
      })
    })

    describe('when remove from the collection of destroyed items', () => {
      it('should not change other item to primary', async () => {
        const formName = 'formName'
        const itemIndex = 0
        const item = {
          destroy: true,
          primary: true,
          id: 'test'
        }
        const mockedUpdate = jest.fn()
        const mockedRemove = jest.fn()
        const fields = {
          value: [item, {
            primary: false,
            destroy: true,
            id: 'test2'
          }],
          update: mockedUpdate,
          remove: mockedRemove
        } as unknown as FieldsType

        const {
          result: { current }
        } = renderHook(() => useRemove(formName))

        current.remove({
          itemIndex,
          fields
        })

        expect(mockOnChange).toHaveBeenCalledTimes(0)
        expect(mockedRemove).toHaveBeenCalledTimes(0)
        expect(mockedUpdate).toHaveBeenCalledTimes(1)
        expect(mockedUpdate).toHaveBeenCalledWith(itemIndex, {
          ...item,
          primary: false,
          destroy: true
        })
      })
    })
  })

  describe('when remove not primary item', () => {
    it('should not change other item to primary', async () => {
      const formName = 'formName'
      const itemIndex = 0
      const item = {
        destroy: true,
        primary: false,
        id: 'test'
      }
      const fields = {
        value: [item, {
          primary: false,
          destroy: false,
          id: 'test2'
        }],
        update: () => undefined,
        remove: () => item
      } as unknown as FieldsType

      const {
        result: { current }
      } = renderHook(() => useRemove(formName))

      current.remove({
        itemIndex,
        fields
      })

      expect(mockOnChange).toHaveBeenCalledTimes(0)
    })
  })

  describe('when remove newly added item', () => {
    it('removes item from the collection', async () => {
      const formName = 'formName'
      const itemIndex = 0
      const item = {
        destroy: true,
        primary: true
      }
      const mockedUpdate = jest.fn()
      const mockedRemove = jest.fn()
      const fields = {
        value: [item],
        update: mockedUpdate,
        remove: mockedRemove
      } as unknown as FieldsType

      const {
        result: { current }
      } = renderHook(() => useRemove(formName))

      current.remove({
        itemIndex,
        fields
      })

      expect(mockOnChange).toHaveBeenCalledTimes(0)
      expect(mockedRemove).toHaveBeenCalledTimes(1)
      expect(mockedRemove).toHaveBeenCalledWith(itemIndex)
      expect(mockOnChange).toHaveBeenCalledTimes(0)
    })
  })
})
