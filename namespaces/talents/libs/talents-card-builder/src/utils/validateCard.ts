import { array, object, ValidationError } from 'yup'

import { HighlightType, PitcherHighlights } from '../types'
import { emptyFormState } from '../utils/emptyFormState'
import { getHighlightItemTypeCount } from './get-highlight-item-type-count/get-highlight-item-type-count'

type PitchField = keyof PitcherHighlights

/**
 * Nomenclature:
 *
 *  Career highlight
 *    any highlight except for skills and portfolio
 *
 *  Portfolio work highlight
 *    portfolio highlight
 *
 *  Various work highlight
 *    any highlight except for skills
 */

enum CardValidationErrors {
  REQUIRE_MIN_SKILLS = 'Add at least 2 skills.',
  REQUIRE_MIN_PORTFOLIO_ITEMS = 'Add at least 1 portfolio project.',
  REQUIRE_MIN_VARIOUS_WORK_HIGHLIGHTS = 'Add at least 3 highlights from your work experience.',
  REQUIRE_MIN_PORTFOLIO_WORK_HIGHLIGHTS = 'Add at least 3 portfolio projects or work experience highlights.',
  REQUIRE_MIN_CAREER_HIGHLIGHTS = 'Add at least 1 career highlight.'
}

export interface CardValidationContext {
  portfolioRequired: boolean
  careerHighlightRequired: boolean
  highlightFields: PitchField[]
  itemTypes: HighlightType[]
}

interface SchemaWithPitcherContext {
  options: {
    context?: Partial<CardValidationContext>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WithIndexSignature<T> = T & { [key: string]: any }

const schema = object({
  skills: array().min(2, CardValidationErrors.REQUIRE_MIN_SKILLS),
  portfolio: array().when('$portfolioRequired', {
    is: true,
    then: array().min(1, CardValidationErrors.REQUIRE_MIN_PORTFOLIO_ITEMS)
  })
})
  .when(['$careerHighlightRequired', '$highlightFields'], {
    is: (careerHighlightRequired: boolean, highlightFields: PitchField[]) =>
      careerHighlightRequired && highlightFields.includes('portfolio' as const),
    then: object<WithIndexSignature<PitcherHighlights>>().test(
      'enoughCareerHighlights',
      CardValidationErrors.REQUIRE_MIN_CAREER_HIGHLIGHTS,
      hasEnoughCareerHighlights
    )
  })
  .when('$portfolioRequired', {
    is: true,
    then: object<WithIndexSignature<PitcherHighlights>>().test(
      'enoughWorkHighlights',
      CardValidationErrors.REQUIRE_MIN_PORTFOLIO_WORK_HIGHLIGHTS,
      hasEnoughWorkHighlights
    ),
    otherwise: object<WithIndexSignature<PitcherHighlights>>().test(
      'enoughWorkHighlights',
      CardValidationErrors.REQUIRE_MIN_VARIOUS_WORK_HIGHLIGHTS,
      hasEnoughWorkHighlights
    )
  })

const fieldsFetchers: {
  [F in PitchField]: (item: PitcherHighlights) => number
} = {
  skills: item => item.skills.length,
  industries: item => item.industries.length,
  portfolio: item => item.portfolio.length,
  items: item => item.items.length
}

// eslint-disable-next-line func-style
function hasEnoughCareerHighlights<T extends SchemaWithPitcherContext>(
  this: T,
  item?: PitcherHighlights | null
) {
  if (!item) {
    return false
  }

  // eslint-disable-next-line no-invalid-this
  const context = this.options.context as CardValidationContext
  const fields = context.highlightFields
  const itemTypes = context.itemTypes

  if (fields.length === 0) {
    return true
  }

  const total = totalCareerHighlights(
    item,
    fields.filter(field => field !== ('portfolio' as const)),
    itemTypes
  )

  return total > 0
}

// eslint-disable-next-line func-style
function hasEnoughWorkHighlights<T extends SchemaWithPitcherContext>(
  this: T,
  item?: PitcherHighlights | null
) {
  if (!item) {
    return false
  }

  // eslint-disable-next-line no-invalid-this
  const context = this.options.context as CardValidationContext
  const fields = context.highlightFields
  const itemTypes = context.itemTypes

  if (fields.length === 0) {
    return true
  }

  const total = totalCareerHighlights(item, fields, itemTypes)

  return total >= 3
}

const totalCareerHighlights = (
  state: PitcherHighlights,
  fields: PitchField[],
  itemTypes: HighlightType[]
) => {
  let total = 0

  for (const key in fieldsFetchers) {
    if (!fields.includes(key as PitchField)) {
      continue
    }

    const value =
      key === 'items'
        ? getHighlightItemTypeCount(state.items, itemTypes)
        : fieldsFetchers[key as PitchField](state)

    total = total + value
  }

  return total
}

const validateCard = (
  state: PitcherHighlights,
  context: CardValidationContext
): ValidationError | null => {
  try {
    schema.validateSync(state, { abortEarly: false, context })
  } catch (ex) {
    if (ex instanceof ValidationError) {
      return ex
    }

    throw ex
  }

  return null
}

const getCardPossibleErrors = (context: CardValidationContext) => {
  const result = validateCard(emptyFormState.highlights, context)

  if (result == null) {
    return []
  }

  return result.inner ?? []
}

export { validateCard, getCardPossibleErrors, CardValidationErrors }
