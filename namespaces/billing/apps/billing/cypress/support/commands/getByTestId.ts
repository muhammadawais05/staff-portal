/// <reference types="cypress" />

export default (id: string, ...otherSelectors: string[]) => {
  const attribValue = id?.indexOf('=') === -1 ? '="' + id + '"' : id
  const otherSelectorString =
    (otherSelectors.length ? ' ' : '') + otherSelectors.join(' ')

  return cy.get(`[data-testid${attribValue}]${otherSelectorString}`)
}
