import { ContactType, PhoneCategory } from '@staff-portal/graphql/staff'

import { getFirstAvailablePhoneCategory } from './get-first-available-phone-category'

describe('getFirstAvailablePhoneCategory', () => {
  describe('when no items or OTHER category is not taken', () => {
    it.each([
      [{ value: [] }],
      [
        {
          value: [
            {
              id: '',
              type: ContactType.PHONE,
              value: '',
              primary: false,
              phoneCategory: PhoneCategory.MOBILE
            }
          ]
        }
      ],
      [
        {
          value: [
            {
              id: '',
              type: ContactType.PHONE,
              value: '',
              primary: false,
              phoneCategory: PhoneCategory.MOBILE
            },
            {
              id: '',
              type: ContactType.PHONE,
              value: '',
              primary: false,
              phoneCategory: PhoneCategory.OFFICE
            }
          ]
        }
      ],
      [
        {
          value: [
            {
              id: '',
              type: ContactType.PHONE,
              value: '',
              primary: false,
              phoneCategory: PhoneCategory.MOBILE
            },
            {
              id: '',
              type: ContactType.PHONE,
              value: '',
              primary: false,
              phoneCategory: PhoneCategory.OFFICE
            },
            {
              id: '',
              type: ContactType.PHONE,
              value: '',
              primary: false,
              phoneCategory: PhoneCategory.HOME
            }
          ]
        }
      ]
    ])('should return OTHER category', ({ value }) => {
      expect(getFirstAvailablePhoneCategory(value).phoneCategory).toEqual(
        PhoneCategory.OTHER
      )
    })
  })

  describe('when OTHER category is taken', () => {
    describe('when OFFICE category is not taken', () => {
      it.each([
        [
          {
            value: [
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OTHER
              }
            ]
          }
        ],
        [
          {
            value: [
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OTHER
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.MOBILE
              }
            ]
          }
        ],
        [
          {
            value: [
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OTHER
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.MOBILE
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.HOME
              }
            ]
          }
        ]
      ])('should return OFFICE category', ({ value }) => {
        expect(getFirstAvailablePhoneCategory(value).phoneCategory).toEqual(
          PhoneCategory.OFFICE
        )
      })
    })
  })

  describe('when OTHER and OFFICE categories are taken', () => {
    describe('when MOBILE category is not taken', () => {
      it.each([
        [
          {
            value: [
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OTHER
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OFFICE
              }
            ]
          }
        ],
        [
          {
            value: [
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OTHER
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OFFICE
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.HOME
              }
            ]
          }
        ]
      ])('should return MOBILE category', ({ value }) => {
        expect(getFirstAvailablePhoneCategory(value).phoneCategory).toEqual(
          PhoneCategory.MOBILE
        )
      })
    })
  })

  describe('when all categories, but HOME are taken', () => {
    describe('when HOME category is not taken', () => {
      it.each([
        [
          {
            value: [
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OTHER
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.OFFICE
              },
              {
                id: '',
                type: ContactType.PHONE,
                value: '',
                primary: false,
                phoneCategory: PhoneCategory.MOBILE
              }
            ]
          }
        ]
      ])('should return HOME category', ({ value }) => {
        expect(getFirstAvailablePhoneCategory(value).phoneCategory).toEqual(
          PhoneCategory.HOME
        )
      })
    })
  })
})
