import { pick } from 'lodash-es'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { renderEngagementLinkOrEmpty } from './renderEngagementLinkOrEmpty'

describe('#renderEngagementLinkOrEmpty', () => {
  describe('when there is no engagement', () => {
    it('renders indicator of empty data', () => {
      expect(renderEngagementLinkOrEmpty()).toEqual(EMPTY_DATA)
    })
  })

  describe('when engagement exists', () => {
    it('renders a link to engagement', () => {
      const engagement = pick(fixtures.MockEngagement, ['id', 'webResource'])

      expect(renderEngagementLinkOrEmpty(engagement)).toMatchSnapshot()
    })
  })
})
