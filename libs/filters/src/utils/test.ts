import { QueryParams } from '@staff-portal/query-params-state'

import {
  BigDecimalRangeGqlParam,
  DateRangeGqlParam,
  TimeRangeGqlParam,
  RangeGqlParam,
  EnumToGqlParam,
  IdGqlParam,
  SearchBarGqlParam,
  badgesToGql
} from './gql-param'
import {
  dateRangeQueryParam,
  enumQueryParam,
  pageQueryParam
} from './query-param'
import {
  GqlParams,
  OffsetPagination,
  toGqlFilter,
  toGqlPagination
} from './gql-params-convert'
import {
  parseStringArray,
  parseString,
  parseBoolean,
  parseNumericString
} from './parse-and-format-url-params'

enum TestEnum {
  CHECK = 'CHECK',
  PAID = 'PAID',
  WRITTEN_OFF = 'WRITTEN_OFF'
}

type TestFilter = {
  kinds?: TestEnum[]
  statuses?: TestEnum[]
}

const GQL_PARAMS_CONFIG: GqlParams = {
  amount: [BigDecimalRangeGqlParam()],
  badges: [SearchBarGqlParam()],
  client_partner_id: [IdGqlParam(), 'clientPartnerId'],
  created_on: [DateRangeGqlParam(), 'createdOn'],
  kinds: [EnumToGqlParam(TestEnum)],
  paid_at: [DateRangeGqlParam(), 'paidAt'],
  range: [RangeGqlParam()],
  payment_methods: [EnumToGqlParam(TestEnum), 'paymentMethods'],
  statuses: [EnumToGqlParam(TestEnum)]
}

describe('Filters Utils', () => {
  describe('#gqlQueryParam', () => {
    it('badgesToGql', () => {
      expect(badgesToGql([['test', 1]])).toStrictEqual({
        0: ['test', 1],
        logic: 'AND'
      })
    })

    it('IdGqlParam', () => {
      expect(typeof IdGqlParam()).toBe('function')
      expect(IdGqlParam()(1)).toBe('1')
    })

    it('BigDecimalRangeGqlParam', () => {
      expect(typeof BigDecimalRangeGqlParam()).toBe('function')
      expect(BigDecimalRangeGqlParam()(1)).toBe(1)
    })

    it('SearchBarGqlParam', () => {
      const convertNode = ({ id }: { id: string }) => id

      expect(typeof SearchBarGqlParam()).toBe('function')
      expect(SearchBarGqlParam()({ test: ['1'] }, {})).toStrictEqual({
        logic: 'AND',
        test: ['1']
      })
      expect(
        SearchBarGqlParam(convertNode)({ test: [{ id: '123' }] }, {})
      ).toStrictEqual({
        logic: 'AND',
        test: ['123']
      })
    })

    it('DateRangeGqlParam', () => {
      expect(typeof DateRangeGqlParam()).toBe('function')
      expect(
        DateRangeGqlParam()({ from: '2020-07-05', till: '2020-05-05' })
      ).toStrictEqual({ from: '2020-07-05', till: '2020-05-05' })
      expect(DateRangeGqlParam()({ from: '2020-07-05' })).toStrictEqual({
        from: '2020-07-05'
      })
      expect(DateRangeGqlParam()({ till: '2020-07-05' })).toStrictEqual({
        till: '2020-07-05'
      })
    })

    it('TimeRangeGqlParam', () => {
      expect(typeof TimeRangeGqlParam()).toBe('function')
      expect(
        TimeRangeGqlParam()({
          from: '2005-07-05T18:31:42',
          till: '2005-05-05T18:31:42'
        })
      ).toStrictEqual({ from: '2005-07-05', till: '2005-05-05' })
      expect(
        TimeRangeGqlParam()({ from: '2005-07-05T18:31:42' })
      ).toStrictEqual({
        from: '2005-07-05'
      })
      expect(
        TimeRangeGqlParam()({ till: '2005-07-05T18:31:42' })
      ).toStrictEqual({
        till: '2005-07-05'
      })
    })

    it('RangeGqlParam', () => {
      expect(typeof RangeGqlParam()).toBe('function')
      expect(RangeGqlParam()({ from: '100', to: '200' })).toStrictEqual({
        from: '100',
        to: '200'
      })
      expect(RangeGqlParam()({ from: '100' })).toStrictEqual({
        from: '100'
      })
      expect(RangeGqlParam()({ to: '200' })).toStrictEqual({
        to: '200'
      })
      expect(RangeGqlParam()({ to: 0 })).toStrictEqual({
        to: 0
      })
      expect(RangeGqlParam()({ to: '' })).toStrictEqual({})
      expect(RangeGqlParam()({ to: undefined })).toStrictEqual({})
    })

    it('EnumToGqlParam', () => {
      expect(typeof EnumToGqlParam(TestEnum)).toBe('function')
      expect(EnumToGqlParam(TestEnum)(['CHECK'])).toStrictEqual([
        TestEnum.CHECK
      ])
      expect(EnumToGqlParam(TestEnum)(['A'])).toStrictEqual([])
    })
  })

  describe('#gqlParamsConvert', () => {
    it('toGqlFilter will skip invalid params', () => {
      expect(
        toGqlFilter<QueryParams, TestFilter>(GQL_PARAMS_CONFIG, {
          kinds: [],
          foo: [TestEnum.PAID],
          page: 2,
          statuses: [TestEnum.PAID, TestEnum.WRITTEN_OFF]
        })
      ).toStrictEqual({
        statuses: [TestEnum.PAID, TestEnum.WRITTEN_OFF]
      })
    })

    it('toGqlPagination will output OffsetPagination', () => {
      const pagination: OffsetPagination = {
        limit: 25,
        offset: 25
      }

      expect(toGqlPagination(25, 2)).toStrictEqual(pagination)
    })
  })

  describe('#enumQueryParam', () => {
    it('enumQueryParam', () => {
      expect(enumQueryParam.encode(['DEV_SHOP_OR_AGENCY'])).toStrictEqual([
        'dev_shop_or_agency'
      ])
      expect(
        enumQueryParam.decode(['dev_shop_or_agency'], {}, {})
      ).toStrictEqual(['DEV_SHOP_OR_AGENCY'])
    })
  })

  describe('#dateRangeQueryParam', () => {
    it('should parse valid ISO dates', () => {
      expect(
        dateRangeQueryParam.encode({ from: '2020-07-05', till: '2020-07-07' })
      ).toStrictEqual({ from: '2020-07-05', till: '2020-07-07' })
      expect(
        dateRangeQueryParam.decode(
          { from: '2020-07-05', till: '2020-07-07' },
          {},
          {}
        )
      ).toStrictEqual({ from: '2020-07-05', till: '2020-07-07' })
    })

    it('should not throw for invalid ISO dates', () => {
      expect(() => {
        dateRangeQueryParam.decode({ from: 'INVALID', till: 'INVALID' }, {}, {})
      }).not.toThrow()
    })

    it('should ignore invalid ISO dates', () => {
      expect(
        dateRangeQueryParam.decode({ from: 'INVALID', till: 'INVALID' }, {}, {})
      ).toStrictEqual({ from: undefined, till: undefined })
    })
  })

  describe('#pageQueryParam', () => {
    it('should encode page values', () => {
      expect(
        pageQueryParam({ itemsPerPage: 0, maxItems: 0 }).encode(1)
      ).toBe('1')
    })

    it('should decode valid page values', () => {
      expect(
        pageQueryParam({
          itemsPerPage: 10,
          maxItems: 1000
        }).decode('10', {}, {})
      ).toBe(10)
    })

    it('should fallback to 1 for invalid page values', () => {
      expect(
        pageQueryParam({
          itemsPerPage: 10,
          maxItems: 1000
        }).decode('invalid_page', {}, {})
      ).toBe(1)
    })

    it('should fallback to 1 for page values smaller than 1', () => {
      expect(
        pageQueryParam({
          itemsPerPage: 10,
          maxItems: 1000
        }).decode('-1', {}, {})
      ).toBe(1)
    })

    it('should fallback to max page for values bigger than max page', () => {
      expect(
        pageQueryParam({ itemsPerPage: 10, maxItems: 100 }).decode(
          '1000',
          {},
          {}
        )
      ).toBe(10)
    })
  })

  describe('parseStringArray', () => {
    it('should return an array of upperCase values', () => {
      expect(
        parseStringArray(['dev_shop_or_agency', 'small_business'], true)
      ).toStrictEqual(['DEV_SHOP_OR_AGENCY', 'SMALL_BUSINESS'])
    })

    it('should return an array of lowerCase values', () => {
      expect(
        parseStringArray(['dev_shop_or_agency', 'small_business'])
      ).toStrictEqual(['dev_shop_or_agency', 'small_business'])
    })

    it('should not return undefined if value is string', () => {
      expect(parseStringArray('dev_shop_or_agency')).toBeUndefined()
    })
  })

  describe('parseString', () => {
    it('should return an upperCase value', () => {
      expect(parseString('dev_shop_or_agency', true)).toBe(
        'DEV_SHOP_OR_AGENCY'
      )
    })

    it('should return an lowerCase value', () => {
      expect(parseString('dev_shop_or_agency')).toBe(
        'dev_shop_or_agency'
      )
    })

    it('should return undefined when value is not a string', () => {
      expect(parseString(0)).toBeUndefined()
    })

    it('should return undefined when value is an empty string', () => {
      expect(parseString('')).toBeUndefined()
    })
  })

  describe('parseNumericString', () => {
    describe('when `leadingDigitsOnly` is `true`', () => {
      it('should return an parsed value', () => {
        expect(
          parseNumericString('12345d..dsad#@#6a7..', {
            leadingDigitsOnly: true
          })
        ).toBe('12345')
      })

      it('should return undefined when parsed value is invalid numeric string', () => {
        expect(
          parseNumericString('....12345', {
            leadingDigitsOnly: true
          })
        ).toBeUndefined()
      })

      it('should return undefined when parsed value is an non-numeric string', () => {
        expect(
          parseNumericString('dasdasds', {
            leadingDigitsOnly: true
          })
        ).toBeUndefined()
      })
    })

    describe('when `leadingDigitsOnly` is `false`', () => {
      it('should return an parsed value', () => {
        expect(
          parseNumericString('ss,.dsa$#ad12345d..dsad#@#6a7..', {
            leadingDigitsOnly: false
          })
        ).toBe('1234567')
      })

      it('should return undefined when parsed value is non-numeric string', () => {
        expect(
          parseNumericString('dasdasds', {
            leadingDigitsOnly: false
          })
        ).toBeUndefined()
      })
    })

    it('should return undefined when value is not a string', () => {
      expect(parseNumericString(0)).toBeUndefined()
    })

    it('should return undefined when value is an empty string', () => {
      expect(parseNumericString('')).toBeUndefined()
    })
  })

  describe('parseBoolean', () => {
    it('should return true when parsing "true"', () => {
      expect(parseBoolean('true')).toBe(true)
    })

    it('should return true when parsing "yes"', () => {
      expect(parseBoolean('yes')).toBe(true)
    })

    it('should return true when parsing true', () => {
      expect(parseBoolean(true)).toBeUndefined()
    })

    it('should return false when parsing "false"', () => {
      expect(parseBoolean('false')).toBe(false)
    })

    it('should return true when parsing "no"', () => {
      expect(parseBoolean('no')).toBeUndefined()
    })

    it('should return false when parsing false', () => {
      expect(parseBoolean(false)).toBeUndefined()
    })

    it('should return false when parsing null', () => {
      expect(parseBoolean(null)).toBeUndefined()
    })

    it('should return false when parsing undefined', () => {
      expect(parseBoolean(undefined)).toBeUndefined()
    })

    it('should return false when parsing empty string', () => {
      expect(parseBoolean('')).toBeUndefined()
    })
  })
})
