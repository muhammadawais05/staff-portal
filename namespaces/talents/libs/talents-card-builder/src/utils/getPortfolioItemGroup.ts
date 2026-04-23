export enum PortfolioItemGroup {
  UNKNOWN,
  EXPERIENCE,
  DESIGN
}

/**
 * We treat classic portfolio items differently, they are about visual presentation and deserve a separate section.
 * The rest of known kinds are grouped under Experience
 * @param kind
 */
export const getPortfolioItemGroup = ({ kind }: { kind: string }) => {
  switch (kind) {
    case 'basic':
    case 'accomplishment':
    case 'code_base':
    case 'other_amazing_things':
      return PortfolioItemGroup.EXPERIENCE

    case 'classic':
      return PortfolioItemGroup.DESIGN
  }

  return PortfolioItemGroup.UNKNOWN
}
