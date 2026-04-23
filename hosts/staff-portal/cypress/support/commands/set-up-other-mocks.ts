/* global cy */

export const setUpOtherMocks = () => {
  cy.intercept(
    { hostname: 'maps.googleapis.com' },
    { statusCode: 200, body: undefined }
  ).as('googleMaps')

  cy.intercept(
    { hostname: 'use.typekit.net' },
    {
      statusCode: 200,
      body: undefined,
      headers: { 'Content-Type': 'text/css' }
    }
  ).as('typekit')

  cy.intercept(
    { hostname: 'cdn.lr-ingest.io' },
    { statusCode: 200, body: 'class LRLogger {}; window._LRLogger = LRLogger' }
  ).as('logrocket')
}
