import { ReviewKind } from '@staff-portal/graphql/staff'

import { getIsReviewAttemptsSectionCollapsedByDefault } from './getIsReviewAttemptsSectionCollapsedByDefault'

describe('getIsReviewAttemptsSectionCollapsedByDefault', () => {
  describe('review attempts section is collapsed by default', () => {
    it('when review attempts are empty', () => {
      expect(getIsReviewAttemptsSectionCollapsedByDefault([])).toBeTruthy()
    })

    it('when there is any review attempt with a kind of success', () => {
      expect(
        getIsReviewAttemptsSectionCollapsedByDefault([
          {
            commentary: 'This part was obfuscated, some content was here.',
            createdAt: '2016-09-13T23:11:34+08:00',
            id: 'VjEtUmV2aWV3QXR0ZW1wdC0zMDM0Mg',
            kind: ReviewKind.SUCCESS,
            reviewLink: null
          }
        ])
      ).toBeTruthy()
    })
  })

  describe('review attempts section is expanded by default', () => {
    it('when there are no review attempts with kind of success', () => {
      expect(
        getIsReviewAttemptsSectionCollapsedByDefault([
          {
            commentary: 'This part was obfuscated, some content was here.',
            createdAt: '2016-09-13T23:11:34+08:00',
            id: 'VjEtUmV2aWV3QXR0ZW1wdC0zMDM0Mg',
            kind: ReviewKind.AWAITING,
            reviewLink: null
          },
          {
            commentary: 'This part was obfuscated, some content was here.',
            createdAt: '2017-09-13T23:11:34+08:00',
            id: 'VjEtUmV2aWV3QXR0ZW1wdC0zMDM0Md',
            kind: ReviewKind.NEGATIVE,
            reviewLink: null
          },
          {
            commentary: 'This part was obfuscated, some content was here.',
            createdAt: '2018-09-13T23:11:34+08:00',
            id: 'VjEtUmV2aWV3QXR0ZW1wdC0zMDM0Mc',
            kind: ReviewKind.LEFT_VM,
            reviewLink: null
          }
        ])
      ).toBe(false)
    })
  })
})
