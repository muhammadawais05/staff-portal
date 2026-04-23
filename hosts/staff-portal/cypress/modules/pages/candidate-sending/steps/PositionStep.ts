import { Autocomplete } from '~integration/modules/components'

class PositionStep {
  autocomplete = new Autocomplete()

  get clientAvailabilityRequestsSelectFieldInput() {
    return cy
      .getByTestId('client-availability-requests-select-field-select')
      .find('input:last')
  }
}

export default PositionStep
