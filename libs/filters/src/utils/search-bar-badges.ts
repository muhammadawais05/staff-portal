import { SearchBarCategory, FilterObject } from '../components/SearchBar/types'

const getCategory = <T extends SearchBarCategory>(
  categories: T[],
  categoryName: string
) => {
  const category = categories.find(({ name }) => name === categoryName)

  return category as T
}

export const getBadgesWithCategories = (
  filterValue: Record<string, FilterObject[]>,
  categories: SearchBarCategory[]
) =>
  Object.entries(filterValue)
    .map(([categoryName, options]) => {
      const category = getCategory(categories, categoryName)

      return options.map(value => ({ value, category }))
    })
    .flat()
