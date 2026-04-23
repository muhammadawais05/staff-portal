import {
  CompanyRepresentativePhoneInput,
  UpdateCompanyRepresentativePhoneNumbersInput
} from '@staff-portal/graphql/staff'
import { ValuesToAdjust } from '@staff-portal/editable'

export const adjustValues =
  (companyRepresentativeId: string) =>
  (
    values: ValuesToAdjust<
      UpdateCompanyRepresentativePhoneNumbersInput,
      'phones',
      CompanyRepresentativePhoneInput[]
    >
  ): Omit<
    UpdateCompanyRepresentativePhoneNumbersInput,
    'clientMutationId'
  > => ({
    phones:
      values?.phones?.map(({ id, phoneCategory, destroy, primary, value }) => ({
        id: id || undefined,
        phoneCategory,
        destroy,
        primary,
        value
      })) ?? [],
    companyRepresentativeId
  })
