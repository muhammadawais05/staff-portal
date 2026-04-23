import { camelCase } from 'lodash-es'

const getFieldNameTypes = (fieldName: string) => {
  const match = fieldName.match(
    /^(company|talent)(Hourly|FullTime|PartTime)Rate$/
  )
  const discountMatch = fieldName.match(/^(partTime|fullTime)Discount$/)

  if (match) {
    return {
      sourceType: match[1], // "talent" or "company"
      commitmentType: camelCase(match[2]) // "hourly", "partTime" or "fullTime"
    }
  }

  if (discountMatch) {
    return {
      sourceType: 'discount',
      commitmentType: discountMatch[1]
    }
  }

  return {}
}

export default getFieldNameTypes
