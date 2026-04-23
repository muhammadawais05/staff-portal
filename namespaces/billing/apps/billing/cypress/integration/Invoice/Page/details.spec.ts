import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import i18n from '@staff-portal/billing/src/utils/i18n'
import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/invoiceDetailsDefault'
import { common } from '../../../support/i18n/common'
import * as writeOffInvoice from '../../../partials/invoice/writeOff.spec'

/// <reference types="cypress" />

const RED = Color(palette.red.main).toString()
const GREEN = Color(palette.green.dark).toString()
const YELLOW = Color(palette.yellow.main).toString()

// TODO: variants when necessary GraphQL fields are
// fully implemented
// table footer should not be rendered if description is empty

const confirmModal = () => cy.getByTestId('Confirmation')
const noteListItems = () => cy.getByTestId('NoteListItem')

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceDetailsPage'
      contentWindow.DATA_INVOICE_ID = fixtures.MockInvoice.documentNumber
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - Invoice Details', () => {
  describe('General flow', () => {
    before(() => {
      resetSetup()
    })

    it('Invoice Details Page', () => {
      // ----- revertCommercialDocumentMemorandumPrepayment ---- //
      cy.clock()
      cy.getByTestId('TableRowActions-button').first().click()
      cy.tick(100)
      cy.getByTestId('revertInvoicePrepayments').click()

      cy.getByTestId('comment').type('This is an example comment')
      cy.getByTestId('submit').click()

      cy.get('#react_notification').should(
        'contain',
        'Prepayment was successfully reverted to Invoice #414280'
      )
      cy.closeNotifications()

      // ----- DetailsTable ---- //
      cy.contains('Active').should('have.css', 'color', GREEN)
      cy.contains('—').should('have.css', 'color', 'rgb(69, 80, 101)')
      // cy.get(
      //   '[data-testid="InvoiceDetailsTableRow-content-balanceDue"] > span'
      // ).trigger('mouseover')

      // tooltip()
      //   .should('be.visible')
      //   .invoke('text')
      //   .should('contain', 'discount by switching')

      // -- purchaseOrderEditor - //
      cy.getByTestId('purchaseOrderEditorToggle').click()

      cy.get('[name="purchaseOrderId"]').select('Not Selected')

      cy.getByTestId('purchaseOrderEditorToggle').click()

      cy.get('[name="purchaseOrderId"]').select('VjEtUHVyY2hhc2VPcmRlci0xNzI0')

      cy.get('#react_notification').should(
        'contain',
        'Purchase order #PO-1724 was successfully assigned to the Invoice #377249.'
      )
      cy.closeNotifications()

      // -------- Add Invoice Note ------- //
      cy.getByTestId('DetailsHeader-more-actions-button').click()
      cy.getByTestId('addDocumentNote').click()
      cy.getByTestId('EditDocumentNoteForm-note').within(() => {
        cy.get('#note').type('This is an example Invoice Note')
      })

      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain',
        'Note for Invoice #377249 was successfully created.'
      )
      cy.closeNotifications()

      cy.getByTestId('InvoiceListRow-expand').click()
      cy.getByTestId('InvoiceListRow-description').should(
        'contain',
        'Hourly services from Hugh Wimberly for [Enterprise] Data Engineering Architect from December 29, 2019 to January 4, 2020. 15 hours of work billed.'
      )

      // ---- writeOff action --- //
      cy.getByTestId('DetailsHeader-more-actions-button').click()
      cy.getByTestId('writeOff').click()
      writeOffInvoice.successfulFlow()

      // ---- Update due date --- //
      cy.getByTestId('DetailsHeader-more-actions-button').click()
      cy.getByTestId('updateCommercialDocumentDueDate').click()

      cy.getByTestId('CommercialDocumentUpdateDueDateModalForm-title').should(
        'contain',
        'Update due date of Invoice #377249'
      )
      cy.getByTestId('dueDate').within(() => {
        cy.get('input').focused()
        cy.get('input').clear().type('2999-02-13').blur()
      })

      // TODO : restore after Picasso past date validation will be fixed https://github.com/toptal/picasso/issues/1458
      // cy.getByTestId('dueDate')
      //   .clear()
      //   .type('2020-02-11')
      //   .blur()
      // cy.getByTestId('dueDate-error').should('contain',
      //   i18n.t('common:validation.todayOrLater')
      // )

      cy.get('#comment').focus().blur()
      cy.getFieldError('comment').should('contain', common.validation.required)
      cy.get('#comment')
        .focus()
        .clear()
        .type('This is an example comment')
        .blur()
      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain',
        'The due date of Invoice #377249 was successfully updated.'
      )
      cy.closeNotifications()

      // -------- Transfers ------- //
      cy.get('[data-testid="invoice-transfer-table-row"]').should($rows => {
        expect($rows).to.have.length(3)

        expect($rows.first(), 'first row').to.contain('Paid')
        expect(
          $rows.first().find('[data-testid="status"]'),
          'and has'
        ).to.have.css('color', GREEN)

        expect($rows.eq(1), 'second row').to.contain('Pending')
        expect(
          $rows.eq(1).find('[data-testid="status"]'),
          'and has'
        ).to.have.css('color', YELLOW)

        assert.notExists(
          $rows.eq(1).find('[data-testid="claim-transfer-refund"]'),
          'does not include refund button'
        )

        expect($rows.eq(2), 'third row').to.contain('Failed')
        expect(
          $rows.eq(2).find('[data-testid="status"]'),
          'and has'
        ).to.have.css('color', RED)

        assert.notExists(
          $rows.eq(2).find('[data-testid="claim-transfer-refund"]'),
          'does not include refund button'
        )
      })

      // --------- Note --------- //
      cy.getByTestId('NotesContainer-addNote-button').should('exist')
      noteListItems().should('have.length', 4)
      noteListItems().should($notes => {
        assert.exists(
          $notes.first().find('[data-testid="NoteListItem-attachment"]')
        )
      })
      noteListItems().should($notes => {
        assert.notExists(
          $notes.eq(3).find('[data-testid="NoteListItem-attachment"]')
        )
      })

      noteListItems()
        .find('[data-testid="NoteListItem-delete"]')
        .first()
        .click()

      confirmModal().should('exist')

      cy.getByTestId('Confirmation-action').should(
        'contain',
        i18n.t('notes:modal.note.confirm')
      )

      cy.getByTestId('Confirmation-cancel').click()

      noteListItems().within(() => {
        cy.getByTestId('NoteListItem-delete-attachment').click({ force: true })
      })
      confirmModal().should('exist')

      cy.getByTestId('Confirmation-cancel').click()

      noteListItems()
        .first()
        .within(() => {
          cy.getByTestId('NoteListItem-edit').click({ force: true })
        })

      cy.url().should(
        'eq',
        'http://localhost:3032/?modal=note-edit&node_id=1053854'
      )

      cy.getByTestId('NoteEditModalFormAttachment-download-attachment').should(
        'exist'
      )
      cy.getByTestId('NoteEditModalFormAttachment-attachment-input').should(
        'not.exist'
      )

      cy.getByTestId('NoteEditModalFormAttachment-upload-attachment').click()

      cy.getByTestId('NoteEditModalFormAttachment-attachment-input').should(
        'exist'
      )
      cy.getByTestId('submit').click()
      cy.get('#react_notification').should(
        'contain',
        i18n.t('notes:notification.success.update')
      )
      cy.closeNotifications()

      // -------- AddNote ------- //
      cy.getByTestId('NotesContainer-addNote-button').click()
      cy.getByTestId('ModalsState-noteCreate').within(() => {
        cy.getByTestId('title').should('exist')
        cy.getByTestId('comment').should('exist')

        cy.getByTestId('NoteEditModalFormAttachment-attachment-input').should(
          'exist'
        )

        cy.getByTestId(
          'NoteEditModalFormAttachment-download-attachment'
        ).should('not.exist')
        cy.closeModal()
      })
    })
  })

  describe('Negative action cases', () => {
    it('Invoice Details Table', () => {
      resetSetup({
        SetWriteOffInvoice: {
          data: {
            writeOffInvoice: {
              __typename: 'WriteOffInvoicePayload',
              errors: [
                {
                  __typename: 'UserError',
                  code: 'base',
                  key: 'base',
                  message: 'Example form level error'
                },
                {
                  __typename: 'UserError',
                  code: 'comment',
                  key: 'comment',
                  message: 'Comment is not nice'
                }
              ],
              invoice: fixtures.MockInvoice,
              success: false,
              notice: ''
            }
          }
        },
        SetUpdateCommercialDocumentDueDate: {
          data: {
            updateCommercialDocumentDueDate: {
              __typename: 'UpdateCommercialDocumentDueDatePayload',
              errors: [
                {
                  __typename: 'UserError',
                  code: 'base',
                  key: 'base',
                  message: 'Example form level error'
                },
                {
                  __typename: 'UserError',
                  code: 'comment',
                  key: 'comment',
                  message: 'Comment is not nice'
                }
              ],
              commercialDocument: fixtures.MockInvoice,
              notice: '',
              success: false
            }
          }
        },
        RevertInvoicePrepayments: {
          data: {
            revertInvoicePrepayments: {
              __typename: 'RevertPrepaymentsPayload',
              errors: [
                {
                  __typename: 'UserError',
                  code: 'base',
                  key: 'base',
                  message: 'Example form level error'
                },
                {
                  __typename: 'UserError',
                  code: 'comment',
                  key: 'comment',
                  message: 'Comment is not nice'
                }
              ],
              notice: null,
              invoice: fixtures.MockInvoice,
              success: false
            }
          }
        }
      })

      // ----- revertCommercialDocumentMemorandumPrepayment ---- //
      cy.getByTestId('TableRowActions').first().click()
      cy.getByTestId('revertInvoicePrepayments').click()

      cy.getByTestId('comment').type('This is an example comment')
      cy.getByTestId('submit').click()

      cy.getByTestId('FormBaseErrorContainer-error').should(
        'contain',
        'Example form level error'
      )

      cy.getFieldError('comment').should('contain', 'Comment is not nice')
      cy.closeModal()

      // - Consolidated Invoices  //
      cy.getByTestId('InvoiceListRow-expand').click()
      cy.getByTestId('InvoiceListRow-description').should(
        'contain',
        'Hourly services from Hugh Wimberly for [Enterprise] Data Engineering Architect from December 29, 2019 to January 4, 2020. 15 hours of work billed.'
      )

      // ------- writeOff ------- //
      cy.getByTestId('DetailsHeader-more-actions-button').click()
      cy.getByTestId('writeOff').click()
      writeOffInvoice.failureFlow()

      // ----- updateCommercialDocumentDueDate ---- //
      cy.getByTestId('DetailsHeader-more-actions-button').click()
      cy.getByTestId('updateCommercialDocumentDueDate').click()
      cy.getByTestId('dueDate').within(() => {
        cy.get('input').focus().clear().type('2020-02-13').blur()
      })

      cy.getByTestId('comment').type('This is an example comment')
      cy.getByTestId('submit').click()

      cy.getByTestId('FormBaseErrorContainer-error').should(
        'contain',
        'Example form level error'
      )
      cy.getFieldError('comment').should('contain', 'Comment is not nice')
      cy.closeModal()
    })
  })

  describe('Assign a PO line', () => {
    before(() => {
      resetSetup({
        GetExperiments: {
          data: {
            experiments: {
              poLines: {
                enabled: true
              }
            }
          }
        }
      })
    })

    it('should display the currently assigned PO line', () => {
      cy.getByTestId('purchase-order-link').should('have.text', 'FAKEPO-1522')

      cy.getByTestId('purchase-order-line-link').should(
        'have.text',
        'FAKEPO-1522-L-1522 ($0.00 Left)'
      )
    })

    it('should display the modal to assign a PO line', () => {
      cy.getByTestId('purchase-order-edit-button').click()
      cy.get('[id="purchaseOrderId"]').should('have.value', 'FAKEPO-1522')

      cy.get('[id="purchaseOrderLineId"]').should(
        'have.value',
        'FAKEPO-1522-L-1522'
      )
    })

    it('should indicate the Current Job PO line', () => {
      cy.get('[id="purchaseOrderLineId"]').click()

      cy.getTooltip().within(() => {
        cy.get('li').first().should('have.text', 'Not Selected')
        cy.get('li').eq(1).should('have.text', 'FAKEPO-1522-L-1522')
        cy.get('li')
          .last()
          .should(
            'have.text',
            'FAKEPO-1522-Line-2 - $1,000.00 left - Current on Job'
          )
      })
    })

    it('should indicate the Next Job PO line', () => {
      cy.selectByValue({
        field: 'purchase-order-edit-select',
        value: 'VjEtUHVyY2hhc2VPcmRlci0xNTIz'
      })

      cy.get('[id="purchaseOrderLineId"]').click()

      cy.getTooltip().within(() => {
        cy.get('li').first().should('have.text', 'Not Selected')
        cy.get('li').eq(1).should('have.text', 'FAKEPO-1523-L-1523')

        cy.get('li')
          .eq(2)
          .should('have.text', 'FAKEPO-1523-L-2 - $3,000.00 left')

        cy.get('li')
          .last()
          .should(
            'have.text',
            'FAKEPO-1523-L-3 - $150,000.00 left - Next on Job'
          )
      })
    })
  })
})
