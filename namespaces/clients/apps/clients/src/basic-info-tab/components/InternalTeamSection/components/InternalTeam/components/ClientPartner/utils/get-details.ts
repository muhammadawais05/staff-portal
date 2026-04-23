import pluralize from 'pluralize'

export const getDetails = ({
  companies,
  opportunities
}: {
  companies?: number | null
  opportunities?: number | null
}) => {
  return [
    companies && `${companies} ${pluralize('company', companies)}`,
    opportunities &&
      `${opportunities} ${pluralize('opportunity', opportunities)}`
  ]
    .filter(Boolean)
    .join(' and ')
}
