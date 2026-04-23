import { JobPage } from '~integration/modules/pages/jobs'
import { updateJobEstimatedEndDateMocks } from '~integration/mocks/schema-updates/job'
import { JobInformation } from '~integration/modules/pages/jobs/components'

describe('Estimated End Date', () => {
  const page = new JobPage()
  const jobInformation = new JobInformation()

  const ISODate = '2022-11-02'

  describe('when updates Estimated End Date', () => {
    // unskip when SPC-1455 is fixed
    it.skip('gets updated right after selecting new date', () => {
      updateJobEstimatedEndDateMocks()

      page.visit()

      jobInformation.estimatedEndDateInput.should(
        'contain.text',
        'Oct 31, 2022'
      )

      jobInformation.estimatedEndDateEditButton.click()
      //TODO: extract
      jobInformation.estimatedEndDateInput
        .type('{backspace}'.repeat(10))
        .type(ISODate)
        .blur()
    })
  })
})
