import { queryStringToObject } from './query-string-to-object'

describe('#queryStringToObject', () => {
  describe('parses values with different query prefixes', () => {
    it('with query prefix', () => {
      expect(queryStringToObject('?foo=bar')).toEqual({
        foo: 'bar'
      })
    })

    it('without query prefix', () => {
      expect(queryStringToObject('foo=bar')).toEqual({
        foo: 'bar'
      })
    })
  })

  describe('parses string values properly', () => {
    it('one param', () => {
      expect(queryStringToObject('a=b')).toEqual({
        a: 'b'
      })
    })

    it('multiple params', () => {
      expect(queryStringToObject('a=b&c=d')).toEqual({
        a: 'b',
        c: 'd'
      })
    })
  })

  describe('parses number values properly', () => {
    it('zero value', () => {
      expect(queryStringToObject('a=0')).toEqual({
        a: '0'
      })
    })

    it('negative value', () => {
      expect(queryStringToObject('a=-1')).toEqual({
        a: '-1'
      })
    })

    it('positive value', () => {
      expect(queryStringToObject('a=1')).toEqual({
        a: '1'
      })
    })

    it('multiple params', () => {
      expect(queryStringToObject('a=1&b=2')).toEqual({
        a: '1',
        b: '2'
      })
    })
  })

  describe('parses empty values properly', () => {
    it('array', () => {
      expect(queryStringToObject('a[]=')).toEqual({
        a: ['']
      })
      expect(queryStringToObject('a[]')).toEqual({
        a: ['']
      })
    })

    it('false', () => {
      expect(queryStringToObject('a=false')).toEqual({
        a: 'false'
      })
    })

    it('undefined', () => {
      expect(queryStringToObject('a=undefined')).toEqual({
        a: 'undefined'
      })
    })

    it('empty string', () => {
      expect(queryStringToObject('a=')).toEqual({
        a: ''
      })
      expect(queryStringToObject('a')).toEqual({
        a: ''
      })
    })

    it('null', () => {
      expect(queryStringToObject('a=null')).toEqual({
        a: 'null'
      })
    })
  })

  describe('parses array values properly', () => {
    it('indices format', () => {
      expect(queryStringToObject('a[0]=b&a[1]=c')).toEqual({
        a: ['b', 'c']
      })
    })

    it('brackets format', () => {
      expect(queryStringToObject('a[]=b&a[]=c')).toEqual({
        a: ['b', 'c']
      })
    })

    it('comma format', () => {
      expect(queryStringToObject('a=b,c')).toEqual({
        a: 'b,c'
      })
    })
  })

  // Example of filters from talents page
  describe('real life query params', () => {
    it('case 1', () => {
      expect(
        queryStringToObject(
          '?claimer_id=1221880&applied_on%5Bfrom%5D=2021-08-03&applied_on%5Btill%5D=2021-08-21&page=1'
        )
      ).toEqual({
        applied_on: {
          from: '2021-08-03',
          till: '2021-08-21'
        },
        claimer_id: '1221880',
        page: '1'
      })
    })

    it('case 2', () => {
      expect(
        queryStringToObject(
          '?claimer_id=1349614&applied_on%5Btill%5D=2021-08-21&sourcer_ids%5B%5D=2713055&sourcer_ids%5B%5D=2354841&sourcer_ids%5B%5D=2490709&sourcer_ids%5B%5D=2105700&badges%5Bskills%5D%5Bcompetent%5D%5B%5D=C%2B%2B&badges%5Bskills%5D%5Bcompetent%5D%5B%5D=JAI&page=1'
        )
      ).toEqual({
        applied_on: {
          till: '2021-08-21'
        },
        badges: {
          skills: {
            competent: ['C++', 'JAI']
          }
        },
        claimer_id: '1349614',
        page: '1',
        sourcer_ids: ['2713055', '2354841', '2490709', '2105700']
      })
    })

    it('case 3', () => {
      expect(
        queryStringToObject(
          '?claimer_id=1349614&sourcer_ids%5B%5D=2713055&timezones%5Bfrom%5D=-14400&source=partner&cumulative_statuses%5B%5D=applied&cumulative_statuses%5B%5D=removed&cumulative_statuses%5B%5D=paused&cumulative_statuses%5B%5D=active&custom_requirements%5B%5D=time_tracking_tools&supply_health_priority=medium&enterprise_experience=without+experience&specialization_ids%5B%5D=30007&specialization_ids%5B%5D=30004&specialization_ids%5B%5D=1&page=1'
        )
      ).toEqual({
        claimer_id: '1349614',
        cumulative_statuses: ['applied', 'removed', 'paused', 'active'],
        custom_requirements: ['time_tracking_tools'],
        enterprise_experience: 'without experience',
        page: '1',
        source: 'partner',
        sourcer_ids: ['2713055'],
        specialization_ids: ['30007', '30004', '1'],
        supply_health_priority: 'medium',
        timezones: {
          from: '-14400'
        }
      })
    })
  })
})
