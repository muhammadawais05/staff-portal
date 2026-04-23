import getFormattedRoleTitle from './get-formatted-role-title'
import { GetVerticalsDataFragment } from '../../data/get-role-title-data'

describe('getFormattedRoleTitle', () => {
  describe('when there are is only `jobType` param', () => {
    it('returns `roleTitle`', () => {
      expect(getFormattedRoleTitle({ jobType: 'finance_expert' })).toBe(
        'Finance Expert'
      )
    })
  })

  describe('when `roleTitleLowerCased` is `true`', () => {
    it('returns formatted `roleTitle`', () => {
      expect(
        getFormattedRoleTitle({
          jobType: 'finance_expert',
          roleTitleLowerCased: true
        })
      ).toBe('finance expert')
    })
  })

  describe(`when 'roleTitleLowerCased' is 'true' & 'withSpecializationTitle' is 'true',
    but there is no 'verticalNodes'`, () => {
    it('returns `roleTitle`', () => {
      expect(
        getFormattedRoleTitle({
          jobType: 'finance_expert',
          roleTitleLowerCased: true,
          withSpecializationTitle: true,
          specializationTitle: 'Core'
        })
      ).toBe('finance expert')
    })
  })

  describe(`when 'withSpecializationTitle' is 'true' & 'specializationTitle' exists
    & 'verticalNodes' exists, but it does not meet certain conditions`, () => {
    it.each([
      [
        'product_manager',
        [
          {
            talentType: 'product_manager',
            specializations: {
              totalCount: 1
            }
          } as GetVerticalsDataFragment
        ]
      ],
      [
        'product_manager',
        [
          {
            talentType: 'developer',
            specializations: {
              totalCount: 2
            }
          } as GetVerticalsDataFragment
        ]
      ],
      [
        'product_manager',
        [
          {
            talentType: 'developer',
            specializations: {
              totalCount: 3
            }
          } as GetVerticalsDataFragment,
          {
            talentType: 'designer',
            specializations: {
              totalCount: 3
            }
          } as GetVerticalsDataFragment,
          {
            talentType: 'product_manager',
            specializations: {
              totalCount: 1
            }
          } as GetVerticalsDataFragment
        ]
      ]
    ])('returns `roleTitle`', (jobType, verticalNodes) => {
      expect(
        getFormattedRoleTitle({
          roleTitleLowerCased: true,
          withSpecializationTitle: true,
          jobType,
          verticalNodes,
          specializationTitle: 'Core'
        })
      ).toBe('product manager')
    })
  })

  describe(`when 'withSpecializationTitle' is 'true' & 'specializationTitle' exists
    & 'verticalNodes' exists and it meets certain conditions`, () => {
    it.each([
      [
        'product_manager',
        [
          {
            talentType: 'product_manager',
            specializations: {
              totalCount: 2
            }
          } as GetVerticalsDataFragment
        ]
      ],
      [
        'product_manager',
        [
          {
            talentType: 'product_manager',
            specializations: {
              totalCount: 3
            }
          } as GetVerticalsDataFragment
        ]
      ],
      [
        'product_manager',
        [
          {
            talentType: 'developer',
            specializations: {
              totalCount: 1
            }
          } as GetVerticalsDataFragment,
          {
            talentType: 'product_manager',
            specializations: {
              totalCount: 2
            }
          } as GetVerticalsDataFragment,
          {
            talentType: 'designer',
            specializations: {
              totalCount: 1
            }
          } as GetVerticalsDataFragment
        ]
      ]
    ])(
      'returns `roleTitle` with `specializationTitle`',
      (jobType, verticalNodes) => {
        expect(
          getFormattedRoleTitle({
            roleTitleLowerCased: true,
            withSpecializationTitle: true,
            jobType,
            verticalNodes,
            specializationTitle: 'Core'
          })
        ).toBe('Core product manager')
      }
    )
  })
})
