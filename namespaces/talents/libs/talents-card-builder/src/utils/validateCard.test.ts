import { PitcherHighlights } from '../types'
import { emptyFormState } from './emptyFormState'
import {
  validateCard,
  CardValidationErrors,
  CardValidationContext
} from './validateCard'

const expectValidationErrors = (messages: string[]) => {
  return expect.objectContaining({
    inner: messages.map(message =>
      expect.objectContaining({
        message
      })
    )
  })
}

const testValidate = (
  state: Partial<PitcherHighlights>,
  context: CardValidationContext
) => {
  return validateCard(
    {
      ...emptyFormState.highlights,
      skills: ['skill1', 'skill2'],
      ...state
    },
    context
  )
}

describe('validate', () => {
  describe('requires 2 skills', () => {
    const context = {
      highlightFields: [],
      itemTypes: [],
      portfolioRequired: false,
      careerHighlightRequired: false
    }

    it('rejects just 1 skill', () => {
      const result = testValidate({ skills: ['skill1'] }, context)

      expect(result).toEqual(
        expectValidationErrors([CardValidationErrors.REQUIRE_MIN_SKILLS])
      )
    })

    it('accepts 2 skills', () => {
      expect(testValidate({ skills: ['skill1', 'skill2'] }, context)).toBeNull()
    })
  })

  describe('requires a portfolio item', () => {
    const context = {
      highlightFields: [],
      portfolioRequired: true,
      careerHighlightRequired: false,
      itemTypes: []
    }

    it('rejects no portfolio items', () => {
      const result = testValidate({ portfolio: [] }, context)

      expect(result).toEqual(
        expectValidationErrors([
          CardValidationErrors.REQUIRE_MIN_PORTFOLIO_ITEMS
        ])
      )
    })

    it('accepts 1 portfolio item', () => {
      expect(testValidate({ portfolio: ['item1'] }, context)).toBeNull()
    })
  })

  describe('does not require a portfolio item', () => {
    const context = {
      highlightFields: [],
      portfolioRequired: false,
      careerHighlightRequired: false,
      itemTypes: []
    }

    it('accepts no portfolio items', () => {
      expect(testValidate({ portfolio: [] }, context)).toBeNull()
    })
  })

  describe('requires career highlights', () => {
    describe('requires certifications', () => {
      const context: CardValidationContext = {
        highlightFields: ['items' as const],
        portfolioRequired: false,
        careerHighlightRequired: true,
        itemTypes: ['certification']
      }

      it('rejects 2 career highlights', () => {
        const result = testValidate(
          {
            items: [
              { type: 'certification', id: 'cert1' },
              { type: 'certification', id: 'cert2' }
            ]
          },
          context
        )

        expect(result).toEqual(
          expectValidationErrors([
            CardValidationErrors.REQUIRE_MIN_VARIOUS_WORK_HIGHLIGHTS
          ])
        )
      })

      it('accepts 3 career highlights', () => {
        const result = testValidate(
          {
            items: [
              { type: 'certification', id: 'cert1' },
              { type: 'certification', id: 'cert2' },
              { type: 'certification', id: 'cert3' }
            ]
          },
          context
        )

        expect(result).toBeNull()
      })
    })

    describe('requires employments', () => {
      const context: CardValidationContext = {
        highlightFields: ['items' as const],
        portfolioRequired: false,
        careerHighlightRequired: true,
        itemTypes: ['employment']
      }

      it('rejects 2 description items', () => {
        const result = testValidate(
          {
            items: [
              {
                type: 'employment',
                id: 'employment1',
                description_items: ['item1', 'item2']
              }
            ]
          },
          context
        )

        expect(result).toEqual(
          expectValidationErrors([
            CardValidationErrors.REQUIRE_MIN_VARIOUS_WORK_HIGHLIGHTS
          ])
        )
      })

      it('accepts 3 description items', () => {
        const result = testValidate(
          {
            items: [
              {
                type: 'employment',
                id: 'employment1',
                description_items: ['item1', 'item2']
              },
              {
                type: 'employment',
                id: 'employment2',
                description_items: ['item1']
              }
            ]
          },
          context
        )

        expect(result).toBeNull()
      })
    })

    describe('requires different kind of highlights (certifications)', () => {
      const context: CardValidationContext = {
        highlightFields: ['items' as const],
        portfolioRequired: false,
        careerHighlightRequired: true,
        itemTypes: ['certification', 'employment']
      }

      it('rejects 2 career highlights', () => {
        const result = testValidate(
          {
            items: [
              { type: 'certification', id: 'cert1' },
              {
                type: 'employment',
                id: 'employment1',
                description_items: ['item1']
              }
            ]
          },
          context
        )

        expect(result).toEqual(
          expectValidationErrors([
            CardValidationErrors.REQUIRE_MIN_VARIOUS_WORK_HIGHLIGHTS
          ])
        )
      })

      it('accepts 3 career highlights', () => {
        const result = testValidate(
          {
            items: [
              { type: 'certification', id: 'cert1' },
              {
                type: 'employment',
                id: 'employment1',
                description_items: ['item1', 'item2']
              }
            ]
          },
          context
        )

        expect(result).toBeNull()
      })
    })

    describe('requires different kind of highlights (portfolio)', () => {
      const context: CardValidationContext = {
        highlightFields: ['portfolio' as const, 'items' as const],
        portfolioRequired: false,
        careerHighlightRequired: true,
        itemTypes: ['employment']
      }

      it('still requires at least one non-portfolio item', () => {
        const result = testValidate(
          {
            portfolio: ['item1', 'item2', 'item3']
          },
          context
        )

        expect(result).toEqual(
          expectValidationErrors([
            CardValidationErrors.REQUIRE_MIN_CAREER_HIGHLIGHTS
          ])
        )
      })

      it('accepts at least one non-portfolio item', () => {
        const result = testValidate(
          {
            portfolio: ['item1', 'item2', 'item3'],
            items: [
              {
                type: 'employment',
                id: 'employment1',
                description_items: ['item1', 'item2']
              }
            ]
          },
          context
        )

        expect(result).toBeNull()
      })
    })
  })
})
