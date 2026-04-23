import { searchBarQueryParam } from './search-bar-query-param'
import {
  SearchBarCategories,
  SearchBarCategory
} from '../../components/SearchBar/types'

const TEST_CATEGORIES: SearchBarCategories = [
  {
    name: 'names',
    label: 'user names',
    toQueryParam: name => `${name}-param`,
    fromQueryParam: nameParam => nameParam.replace('-param', ''),
    getKey: name => name,
    getBadgeLabel: name => name
  } as SearchBarCategory<string>,
  {
    name: 'skills',
    toQueryParams: skills =>
      skills.reduce((params, { name, rating }) => {
        const ratingLowCase = rating.toLowerCase()

        params[ratingLowCase] = params[ratingLowCase] ?? []
        params[ratingLowCase].push(name)

        return params
      }, {} as Record<string, string[]>),
    fromQueryParams: params => {
      if (typeof params === 'string') {
        return [{ name: params, rating: 'COMPETENT' }]
      }

      if (Array.isArray(params)) {
        return params.map(name => ({ name, rating: 'COMPETENT' }))
      }

      const skillBadges: { name: string; rating: string }[] = []
      const skillRatings = Object.keys(params)

      skillRatings.forEach(rating => {
        params[rating].forEach(name => {
          skillBadges.push({
            name,
            rating: rating.toUpperCase()
          })
        })
      })

      return skillBadges
    },
    getKey: value => value.name,
    getBadgeLabel: ({ name }) => name
  } as SearchBarCategory<{ name: string; rating: string }>
]

describe('searchBarQueryParam', () => {
  it('decodes search bar query params', async () => {
    const decodedFilters = await searchBarQueryParam(TEST_CATEGORIES).decode(
      {
        names: ['Alex-param', 'Michael-param'],
        skills: {
          competent: ['Javascript', 'PHP'],
          strong: ['CSS']
        }
      },
      {},
      {}
    )

    expect(decodedFilters).toStrictEqual({
      names: ['Alex', 'Michael'],
      skills: [
        { name: 'Javascript', rating: 'COMPETENT' },
        { name: 'PHP', rating: 'COMPETENT' },
        { name: 'CSS', rating: 'STRONG' }
      ]
    })
  })

  it('encodes search bar filters to query params', () => {
    const encodedFilters = searchBarQueryParam(TEST_CATEGORIES).encode({
      names: ['Alex', 'Michael'],
      skills: [
        { name: 'Javascript', rating: 'COMPETENT' },
        { name: 'PHP', rating: 'COMPETENT' },
        { name: 'CSS', rating: 'STRONG' }
      ]
    })

    expect(encodedFilters).toStrictEqual({
      names: ['Alex-param', 'Michael-param'],
      skills: {
        competent: ['Javascript', 'PHP'],
        strong: ['CSS']
      }
    })
  })

  it('throws if no decode setting provided for array type filter category', async () => {
    expect.assertions(1)

    await expect(
      searchBarQueryParam([
        {
          name: 'names',
          label: 'user names',
          toQueryParam: name => `${name}-param`,
          getKey: name => name,
          getBadgeLabel: name => name
        } as SearchBarCategory<string>
      ]).decode(
        {
          names: ['Alex-param', 'Michael-param']
        },
        {},
        {}
      )
    ).rejects.toThrow(
      'Please specify "fromQueryParam" or "fromQueryParams" or "queryByParams" setting for "names" search category'
    )
  })

  it('throws if no decode setting provided for record type query param', async () => {
    expect.assertions(1)

    await expect(
      searchBarQueryParam([
        {
          name: 'skills',
          toQueryParams: skills =>
            skills.reduce((params, { name, rating }) => {
              const ratingLowCase = rating.toLowerCase()

              params[ratingLowCase] = params[ratingLowCase] ?? []
              params[ratingLowCase].push(name)

              return params
            }, {} as Record<string, string[]>),
          getKey: value => value.name,
          getBadgeLabel: ({ name }) => name
        } as SearchBarCategory<{ name: string; rating: string }>
      ]).decode(
        {
          skills: {
            competent: ['Javascript', 'PHP'],
            strong: ['CSS']
          }
        },
        {},
        {}
      )
    ).rejects.toThrow(
      'Please specify "fromQueryParams" setting for "skills" search category'
    )
  })

  it('throws if no encode setting provided for filter category', () => {
    expect(() =>
      searchBarQueryParam([
        {
          name: 'names',
          label: 'user names',
          fromQueryParam: nameParam => nameParam.replace('-param', ''),
          getKey: name => name,
          getBadgeLabel: name => name
        } as SearchBarCategory<string>
      ]).encode({
        names: ['Alex', 'Michael']
      })
    ).toThrow(
      'Please specify "toQueryParam" or "toQueryParams" setting for "names" search category'
    )
  })
})
