import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

type Props = {
  form: AnyObject
  calculatedRates: AnyObject
  modifiedFieldName?: string
}

const updateFormFields = ({
  form,
  calculatedRates,
  modifiedFieldName = ''
}: Props) => {
  const { talent, company } = calculatedRates
  const changeset: AnyObject = omit(
    {
      companyFullTimeRate: company.fullTime.toFixed(2),
      companyHourlyRate: company.hourly.toFixed(2),
      companyPartTimeRate: company.partTime.toFixed(2),
      talentFullTimeRate: talent.fullTime.toFixed(2),
      talentHourlyRate: talent.hourly.toFixed(2),
      talentPartTimeRate: talent.partTime.toFixed(2)
    },
    modifiedFieldName
  )

  const changesetKeys = Object.keys(changeset)

  changesetKeys.forEach((fieldName: string) => {
    form.change(fieldName, changeset[fieldName])
  })
}

export default updateFormFields
