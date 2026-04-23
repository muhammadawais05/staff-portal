import { getRateMethodOptions } from './utils'

describe('CommitmentChangeModalForm utils', () => {
  it('rate method options does not include legacy if rate method is not legacy', () => {
    const options = getRateMethodOptions(false)
    const justLegacy = options.filter(obj => obj.value === 'LEGACY')

    expect(justLegacy).toHaveLength(0)
  })

  it('rate method options does include legacy as an option if rate method is legacy', () => {
    const options = getRateMethodOptions(true)
    const justLegacy = options.filter(obj => obj.value === 'LEGACY')

    expect(justLegacy).toHaveLength(1)
  })
})
