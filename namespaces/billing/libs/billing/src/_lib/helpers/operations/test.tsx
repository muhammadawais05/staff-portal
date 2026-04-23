import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import * as OperationHelpers from '.'
import renderComponent from '../../../utils/tests'

const operations = {
  __typename: 'exampleOperations',
  createEmailContact: {
    callable: OperationCallableTypes.ENABLED,
    messages: ['test message', 'example message']
  },
  createGlobalTaskTag: {
    callable: OperationCallableTypes.DISABLED,
    messages: ['test message', 'example message']
  },
  createPersonalTaskTag: {
    callable: OperationCallableTypes.HIDDEN,
    messages: ['test message', 'example message']
  }
}

describe('#OperationHelper', () => {
  describe.each([
    [undefined, ''],
    [[], ''],
    [['example first'], 'example first']
  ])('#getOperationMessage', (arg, returnedValue) => {
    describe(`when operation messages is '${JSON.stringify(arg)}'`, () => {
      it(`returns message`, () => {
        expect(OperationHelpers.getOperationMessage(arg)).toEqual(returnedValue)
      })
    })
  })

  describe(`when operation has multiple messages`, () => {
    it('#getOperationMessage returns a component with list of messages', () => {
      const { getAllByTestId } = renderComponent(
        OperationHelpers.getOperationMessage([
          'example first',
          'example second'
        ])
      )

      expect(getAllByTestId('operation-message')).toHaveLength(2)
    })
  })

  describe('#isOperationEnabled', () => {
    describe('when its enabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationEnabled({
            key: 'createEmailContact',
            operations
          })
        ).toBe(true)
      })
    })

    describe('when its disabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationEnabled({
            key: 'createGlobalTaskTag',
            operations
          })
        ).toBe(false)
      })
    })

    describe('when its not exist', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationEnabled({ key: 'test', operations })
        ).toBe(false)
      })
    })
  })

  describe('#isOperationDisabled', () => {
    describe('when its disabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationDisabled({
            key: 'createGlobalTaskTag',
            operations
          })
        ).toBe(true)
      })
    })

    describe('when its enabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationDisabled({
            key: 'createEmailContact',
            operations
          })
        ).toBe(false)
      })
    })

    describe('when its not exist', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationDisabled({ key: 'test', operations })
        ).toBe(false)
      })
    })
  })

  describe('#isOperationHidden', () => {
    describe('when its hidden', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationHidden({
            key: 'createPersonalTaskTag',
            operations
          })
        ).toBe(true)
      })
    })

    describe('when its enabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationHidden({
            key: 'createEmailContact',
            operations
          })
        ).toBe(false)
      })
    })

    describe('when its not exist', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isOperationHidden({ key: 'test', operations })
        ).toBe(false)
      })
    })
  })

  describe('#isCallableEnabled', () => {
    describe('when its enabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isCallableEnabled(OperationCallableTypes.ENABLED)
        ).toBe(true)
      })
    })

    describe('when its hidden', () => {
      it('return false', () => {
        expect(
          OperationHelpers.isCallableEnabled(OperationCallableTypes.HIDDEN)
        ).toBe(false)
      })
    })

    describe('when its undefined', () => {
      it('return false', () => {
        expect(OperationHelpers.isCallableEnabled(undefined)).toBe(false)
      })
    })
  })

  describe('#isCallableDisabled', () => {
    describe('when its disabled', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isCallableDisabled(OperationCallableTypes.DISABLED)
        ).toBe(true)
      })
    })

    describe('when its hidden', () => {
      it('return false', () => {
        expect(
          OperationHelpers.isCallableDisabled(OperationCallableTypes.HIDDEN)
        ).toBe(false)
      })
    })

    describe('when its undefined', () => {
      it('return false', () => {
        expect(OperationHelpers.isCallableDisabled(undefined)).toBe(false)
      })
    })
  })

  describe('#isCallableHidden', () => {
    describe('when its hidden', () => {
      it('return true', () => {
        expect(
          OperationHelpers.isCallableHidden(OperationCallableTypes.HIDDEN)
        ).toBe(true)
      })
    })

    describe('when its disabled', () => {
      it('return false', () => {
        expect(
          OperationHelpers.isCallableHidden(OperationCallableTypes.DISABLED)
        ).toBe(false)
      })
    })

    describe('when its undefined', () => {
      it('return false', () => {
        expect(OperationHelpers.isCallableHidden(undefined)).toBe(false)
      })
    })
  })

  describe('#isAnyOperationIsNotHidden', () => {
    describe('when all operations are hidden', () => {
      it('return false', () => {
        expect(
          OperationHelpers.isAnyOperationIsNotHidden({
            __typename: 'exampleOperations',
            createEmailContact: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['test message', 'example message']
            },
            createGlobalTaskTag: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['test message', 'example message']
            },
            createPersonalTaskTag: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['test message', 'example message']
            }
          })
        ).toBe(false)
      })
    })

    describe('when some operations are visible', () => {
      it('return true', () => {
        expect(OperationHelpers.isAnyOperationIsNotHidden(operations)).toBe(
          true
        )
      })
    })
  })
})
