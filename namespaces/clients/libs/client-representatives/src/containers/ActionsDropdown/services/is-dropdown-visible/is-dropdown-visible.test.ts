import { ActionsList, DropdownActionType } from '@staff-portal/facilities'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { isDropdownVisible } from './is-dropdown-visible'

type ActionItem = ActionsList[0]

describe('isDropdownVisible', () => {
  describe('when contains non-operation related action item', () => {
    it.each([
      ['link', [{ type: DropdownActionType.LINK } as ActionItem]],
      [
        'static action',
        [{ type: DropdownActionType.STATIC, action: () => {} } as ActionItem]
      ],
      [
        'static action and hidden operation',
        [
          { type: DropdownActionType.STATIC, action: () => {} } as ActionItem,
          {
            type: DropdownActionType.OPERATION,
            operation: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['']
            }
          } as ActionItem
        ]
      ],
      ['item in development', [{ type: undefined } as ActionItem]]
    ])('returns true for %s', (_actionTypes, actionItems) => {
      const visible = isDropdownVisible(actionItems)

      expect(visible).toBeTruthy()
    })
  })

  describe('when contains non-hidden operation', () => {
    it.each([
      [
        'enabled operation',
        [
          {
            type: DropdownActionType.OPERATION,
            operation: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['']
            }
          } as ActionItem
        ]
      ],
      [
        'disabled operation',
        [
          {
            type: DropdownActionType.LAZY_OPERATION,
            operation: {
              callable: OperationCallableTypes.DISABLED,
              messages: ['']
            }
          } as ActionItem
        ]
      ]
    ])('returns true for %s', (_actionTypes, actionItems) => {
      const visible = isDropdownVisible(actionItems)

      expect(visible).toBeTruthy()
    })
  })

  describe('when contains only hidden operations', () => {
    it('returns false', () => {
      const visible = isDropdownVisible([
        {
          type: DropdownActionType.OPERATION,
          operation: {
            callable: OperationCallableTypes.HIDDEN,
            messages: ['']
          }
        } as ActionItem,
        {
          type: DropdownActionType.LAZY_OPERATION,
          operation: {
            callable: OperationCallableTypes.HIDDEN,
            messages: ['']
          }
        } as ActionItem
      ])

      expect(visible).toBeFalsy()
    })
  })

  describe('when has no items', () => {
    it('returns false', () => {
      const visible = isDropdownVisible([])

      expect(visible).toBeFalsy()
    })
  })
})
