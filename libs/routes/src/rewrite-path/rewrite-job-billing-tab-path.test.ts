import rewriteJobBillingTabPath from './rewrite-job-billing-tab-path'
import { JobTabUrlHash } from '../enums'

describe('rewriteJobBillingTabPath', () => {
  it('rewrites "/jobs/id#billing" path correctly', () => {
    expect(
      rewriteJobBillingTabPath({
        pathname: '/jobs/123',
        search: '',
        hash: `#${JobTabUrlHash.BILLING}`
      })
    ).toBe(`/jobs/123/${JobTabUrlHash.BILLING}`)

    expect(
      rewriteJobBillingTabPath({
        pathname: '/jobs/123',
        search: '',
        hash: '#other_tab'
      })
    ).toBeUndefined()
  })

  it('does not rewrite other paths', () => {
    expect(
      rewriteJobBillingTabPath({
        pathname: '/talents',
        search: '',
        hash: '#billing'
      })
    ).toBeUndefined()
  })
})
