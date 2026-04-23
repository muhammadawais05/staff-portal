import { FormModal } from '~integration/modules/modals'

export default class PurchaseOrderEditModal extends FormModal {
  getPurchaseOrdersField() {
    return cy.getByTestId('purchase-order-edit-modal-orders').find('input:last')
  }

  getPurchaseOrderLinesField() {
    return cy
      .getByTestId('purchase-order-line-edit-modal-orders')
      .find('input:last')
  }
}
