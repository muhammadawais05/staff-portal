import { toggleEmployment, toggleEmploymentDescription } from './toggle'
import { HighlightItem } from '../../types'

const toggleAllEmployments = (state: HighlightItem[], items: string[]) => {
  return items.reduce((currentState, item) => {
    return toggleEmployment(currentState.slice(), item)
  }, state)
}

const toggleAllEmploymentDescriptions = (
  state: HighlightItem[],
  items: [string, string][]
) => {
  return items.reduce((currentState, [item, description]) => {
    return toggleEmploymentDescription(currentState.slice(), item, description)
  }, state)
}

describe('toggle', () => {
  describe('toggle employment', () => {
    it('allows to select item', () => {
      const result = toggleAllEmployments([], ['employment1', 'employment2'])

      expect(result).toEqual([
        { id: 'employment1', description_items: [], type: 'employment' },
        { id: 'employment2', description_items: [], type: 'employment' }
      ])
    })

    it('allows to deselect item', () => {
      const result = toggleAllEmployments(
        [],
        ['employment1', 'employment2', 'employment1']
      )

      expect(result).toEqual([
        { id: 'employment2', description_items: [], type: 'employment' }
      ])
    })
  })

  describe('toggle employment description item', () => {
    it('allows to select item', () => {
      const result = toggleAllEmploymentDescriptions(
        [],
        [['employment1', 'This is a paragraph.']]
      )

      expect(result).toEqual([
        {
          id: 'employment1',
          description_items: ['This is a paragraph.'],
          type: 'employment'
        }
      ])
    })

    it('merges descriptions of the same employment', () => {
      const result = toggleAllEmploymentDescriptions(
        [],
        [
          ['employment1', 'This is a paragraph.'],
          ['employment1', 'This is another paragraph.']
        ]
      )

      expect(result).toEqual([
        {
          id: 'employment1',
          description_items: [
            'This is a paragraph.',
            'This is another paragraph.'
          ],
          type: 'employment'
        }
      ])
    })

    it('separates descriptions of different employments', () => {
      const result = toggleAllEmploymentDescriptions(
        [],
        [
          ['employment1', 'This is a paragraph.'],
          ['employment2', 'This is another paragraph.']
        ]
      )

      expect(result).toEqual([
        {
          id: 'employment1',
          description_items: ['This is a paragraph.'],
          type: 'employment'
        },
        {
          id: 'employment2',
          description_items: ['This is another paragraph.'],
          type: 'employment'
        }
      ])
    })

    it('allows to deselect description', () => {
      const result = toggleAllEmploymentDescriptions(
        [],
        [
          ['employment1', 'This is a paragraph.'],
          ['employment2', 'This is another paragraph.'],
          ['employment1', 'This is a paragraph.']
        ]
      )

      expect(result).toEqual([
        {
          id: 'employment2',
          description_items: ['This is another paragraph.'],
          type: 'employment'
        }
      ])
    })

    it('allows to deselect description keeping the employment', () => {
      const result = toggleAllEmploymentDescriptions(
        [],
        [
          ['employment1', 'This is a paragraph.'],
          ['employment1', 'This is another paragraph.'],
          ['employment1', 'This is a paragraph.']
        ]
      )

      expect(result).toEqual([
        {
          id: 'employment1',
          description_items: ['This is another paragraph.'],
          type: 'employment'
        }
      ])
    })
  })
})
