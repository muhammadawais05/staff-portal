import { CardValidationContext } from './validateCard'

interface VerticalContextConfiguration {
  [key: string]: CardValidationContext
}

const verticalContext: VerticalContextConfiguration = {
  Developer: {
    portfolioRequired: false,
    careerHighlightRequired: true,
    highlightFields: ['items'],
    itemTypes: [
      'employment',
      'mentorship',
      'portfolio',
      'publication',
      'education'
    ]
  },
  Designer: {
    portfolioRequired: true,
    careerHighlightRequired: false,
    highlightFields: ['items', 'portfolio'],
    itemTypes: ['employment', 'education']
  },
  FinanceExpert: {
    portfolioRequired: false,
    careerHighlightRequired: true,
    highlightFields: ['items', 'portfolio'],
    itemTypes: ['employment', 'education']
  },
  ProjectManager: {
    portfolioRequired: false,
    careerHighlightRequired: true,
    highlightFields: ['items'],
    itemTypes: [
      'employment',
      'mentorship',
      'portfolio',
      'publication',
      'education'
    ]
  },
  ProductManager: {
    portfolioRequired: false,
    careerHighlightRequired: true,
    highlightFields: ['items'],
    itemTypes: [
      'employment',
      'mentorship',
      'portfolio',
      'publication',
      'education'
    ]
  },
  default: {
    portfolioRequired: false,
    careerHighlightRequired: false,
    highlightFields: ['items', 'portfolio'],
    itemTypes: ['employment', 'education']
  }
}

export const getVerticalSpecificContext = (name: string) => {
  return verticalContext[name] ?? verticalContext.default
}
