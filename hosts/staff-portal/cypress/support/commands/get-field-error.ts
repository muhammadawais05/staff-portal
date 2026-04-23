/// <reference types="cypress" />

export const getFieldError = (testId: string) => {
  /**
   * Usage of cy.getByTestId(testId).find('[class*="PicassoFormField-error"]') sometimes causes flaky tests
   * Can be reproduced in:
   * Path: `integration/pages/company/tabs/internal-data/sections/system-information.spec.ts`
   * Test case: shows an error when invalid URL is supplied`
   */
  return cy.get(`[data-testid*="${testId}"] [class*="PicassoFormField-error"]`)
}
