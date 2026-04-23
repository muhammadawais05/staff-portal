import { ExperienceSelectionItem } from '../../types'
import { toggleExperience } from './toggle'

const toggleAll = (
  state: ExperienceSelectionItem[],
  items: ExperienceSelectionItem[]
) => {
  return items.reduce((currentState, item) => {
    return toggleExperience(currentState.slice(), item)
  }, state)
}

describe('toggle', () => {
  describe('toggle publication', () => {
    it('allows to select item', () => {
      const result = toggleAll(
        [],
        [
          {
            id: 'publication1',
            type: 'publication'
          },
          {
            id: 'publication2',
            type: 'publication'
          }
        ]
      )

      expect(result).toEqual([
        {
          id: 'publication1',
          type: 'publication'
        },
        {
          id: 'publication2',
          type: 'publication'
        }
      ])
    })

    it('allows to deselect item', () => {
      const result = toggleAll(
        [],
        [
          {
            id: 'publication1',
            type: 'publication'
          },
          {
            id: 'publication2',
            type: 'publication'
          },
          {
            id: 'publication1',
            type: 'publication'
          }
        ]
      )

      expect(result).toEqual([
        {
          id: 'publication2',
          type: 'publication'
        }
      ])
    })
  })

  describe('toggle mentorship', () => {
    it('allows to mark mentorship', () => {
      const result = toggleAll(
        [],
        [
          {
            id: 'mentorship',
            type: 'mentorship'
          }
        ]
      )

      expect(result).toEqual([{ id: 'mentorship', type: 'mentorship' }])
    })

    it('allows to un-mark mentorship', () => {
      const result = toggleAll(
        [],
        [
          {
            id: 'mentorship',
            type: 'mentorship'
          },
          {
            id: 'mentorship',
            type: 'mentorship'
          }
        ]
      )

      expect(result).toEqual([])
    })
  })
})
