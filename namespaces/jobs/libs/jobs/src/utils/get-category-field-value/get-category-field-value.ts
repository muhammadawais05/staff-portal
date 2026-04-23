import { Maybe } from '@staff-portal/graphql/staff'

interface Category {
  id: string
  name?: Maybe<string>
}

export const getCategoryFieldValue = (categories?: Maybe<Category[]>) => {
  return categories?.length
    ? categories.map(category => category.name).join(', ')
    : ''
}
