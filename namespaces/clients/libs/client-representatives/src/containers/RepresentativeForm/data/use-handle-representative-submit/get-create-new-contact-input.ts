import {
  CreateCompanyRepresentativeInput,
  CompanyRepresentativeCreationMethod
} from '@staff-portal/graphql/staff'

import { CreateRepresentativeFormValues } from '../../RepresentativeForm'
import { adjustLanguageIds } from './adjust-language-ids'

type ExistingUserPayload = Pick<
  CreateCompanyRepresentativeInput,
  | 'clientId'
  | 'creationMethod'
  | 'email'
  | 'position'
  | 'portalEnabled'
  | 'inviteToLogin'
  | 'billingCommunication'
  | 'communication'
  | 'jobId'
>

export const createPayloadForExistingUser = (
  clientId: string,
  {
    creationMethod,
    email,
    position,
    portalEnabled,
    inviteToLogin,
    billingCommunication,
    communication,
    jobId
  }: CreateRepresentativeFormValues
): ExistingUserPayload => ({
  clientId,
  creationMethod,
  email,
  position,
  portalEnabled: portalEnabled === 'true',
  inviteToLogin,
  billingCommunication,
  communication,
  jobId
})

export const createPayloadForNewUser = (
  clientId: string,
  { languageIds, portalEnabled, ...rest }: CreateRepresentativeFormValues
): CreateCompanyRepresentativeInput => ({
  clientId,
  languageIds: adjustLanguageIds(languageIds),
  portalEnabled: portalEnabled === 'true',
  ...rest
})

export const getCreateNewContactInput = (
  clientId: string,
  creationMethod: CompanyRepresentativeCreationMethod,
  values: CreateRepresentativeFormValues
) =>
  creationMethod === CompanyRepresentativeCreationMethod.NEW
    ? createPayloadForNewUser(clientId, values)
    : createPayloadForExistingUser(clientId, values)
