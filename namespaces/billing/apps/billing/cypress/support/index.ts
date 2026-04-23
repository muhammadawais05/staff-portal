import '@cypress/code-coverage/support'
import 'cypress-react-selector'
require('./commands') // for some reason ES import doesn't work here, file content is stripped out

/// <reference types="cypress" />
// Cypress does not stub "fetch" yet, only XHR
// here we delete window.fetch on every page load
