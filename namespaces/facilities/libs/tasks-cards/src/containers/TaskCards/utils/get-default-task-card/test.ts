import { TaskCardType } from '../../enums'
import { getDefaultTaskCard } from './get-default-task-card'

describe('getDefaultTaskCard', () => {
  describe('when there is no default type', () => {
    it('returns the first task card', () => {
      const FIRST_TASK_CARD_CONFIG = {
        type: TaskCardType.Activity,
        title: '1',
        entityId: '1'
      }

      expect(
        getDefaultTaskCard([
          FIRST_TASK_CARD_CONFIG,
          { type: TaskCardType.CommunityEvent, title: '2', entityId: '2' }
        ])
      ).toEqual(FIRST_TASK_CARD_CONFIG)
    })

    it('returns the first task card in the first group', () => {
      const FIRST_TASK_CARD_CONFIG = {
        type: TaskCardType.Activity,
        title: '1',
        entityId: '1'
      }

      const FIRST_TASK_CARD_GROUP_CONFIG = {
        type: TaskCardType.Activity,
        title: '1',
        taskCards: [FIRST_TASK_CARD_CONFIG]
      }

      expect(
        getDefaultTaskCard([
          FIRST_TASK_CARD_GROUP_CONFIG,
          {
            type: TaskCardType.CommunityEvent,
            title: '2',
            taskCards: [
              {
                type: TaskCardType.CommunityEvent,
                title: '2',
                entityId: '2'
              }
            ]
          }
        ])
      ).toEqual(FIRST_TASK_CARD_CONFIG)
    })
  })

  describe('when there is a default type', () => {
    it('returns the first task card', () => {
      const DEFAULT_TYPE = TaskCardType.Activity

      const TASK_CARD_CONFIG = {
        type: DEFAULT_TYPE,
        title: '1',
        entityId: '1'
      }

      expect(
        getDefaultTaskCard(
          [
            { type: TaskCardType.CommunityEvent, title: '2', entityId: '2' },
            TASK_CARD_CONFIG
          ],
          DEFAULT_TYPE
        )
      ).toEqual(TASK_CARD_CONFIG)
    })

    it('returns the first task card in the first group', () => {
      const DEFAULT_TYPE = TaskCardType.Activity

      const TASK_CARD_CONFIG = {
        type: DEFAULT_TYPE,
        title: '1',
        entityId: '1'
      }

      const TASK_CARD_GROUP_CONFIG = {
        type: DEFAULT_TYPE,
        title: '1',
        taskCards: [TASK_CARD_CONFIG]
      }

      expect(
        getDefaultTaskCard(
          [
            {
              type: TaskCardType.CommunityEvent,
              title: '2',
              taskCards: [
                {
                  type: TaskCardType.CommunityEvent,
                  title: '2',
                  entityId: '2'
                }
              ]
            },
            TASK_CARD_GROUP_CONFIG
          ],
          DEFAULT_TYPE
        )
      ).toEqual(TASK_CARD_CONFIG)
    })
  })
})
