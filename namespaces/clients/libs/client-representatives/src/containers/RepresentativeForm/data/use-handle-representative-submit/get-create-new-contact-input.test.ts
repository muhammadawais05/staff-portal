import { CreateRepresentativeFormValues } from '../../RepresentativeForm'
import {
  createPayloadForExistingUser,
  createPayloadForNewUser
} from './get-create-new-contact-input'

const MOCK_ADJUSTED_LANGUAGES = Symbol('adjusted-languages')

jest.mock('./adjust-language-ids', () => ({
  ...jest.requireActual('./adjust-language-ids'),
  adjustLanguageIds: () => MOCK_ADJUSTED_LANGUAGES
}))

const CLIENT_ID = Symbol('client-id') as unknown as string

const getFormData = (portalEnabled: 'true' | 'false') =>
  ({
    about: Symbol('about'),
    billingCommunication: Symbol('billingCommunication'),
    communication: Symbol('communication'),
    creationMethod: Symbol('createMethod'),
    email: Symbol('email'),
    fullName: Symbol('fullName'),
    languageIds: [{ value: 'language-id' }],
    linkedin: Symbol('linkedin'),
    location: Symbol('location'),
    password: Symbol('password'),
    passwordConfirmation: Symbol('passwordConfirmation'),
    phoneNumber: Symbol('phoneNumber'),
    portalEnabled: portalEnabled,
    inviteToLogin: Symbol('inviteToLogin'),
    position: Symbol('position'),
    skype: Symbol('skype'),
    timeZoneName: Symbol('timeZoneName'),
    twitter: Symbol('twitter'),
    website: Symbol('website'),
    jobId: Symbol('jobId')
  } as unknown as CreateRepresentativeFormValues)

describe('createPayloadForExistingUser', () => {
  it.each([
    { formData: getFormData('true'), expectedPortalEnabled: true },
    { formData: getFormData('false'), expectedPortalEnabled: false }
  ])('returns expected payload', ({ formData, expectedPortalEnabled }) => {
    const payload = createPayloadForExistingUser(CLIENT_ID, formData)

    expect(payload).toEqual({
      clientId: CLIENT_ID,
      creationMethod: formData.creationMethod,
      email: formData.email,
      position: formData.position,
      portalEnabled: expectedPortalEnabled,
      inviteToLogin: formData.inviteToLogin,
      billingCommunication: formData.billingCommunication,
      communication: formData.communication,
      jobId: formData.jobId
    })
  })
})

describe('createPayloadForNewUser', () => {
  it.each([
    { formData: getFormData('true'), expectedPortalEnabled: true },
    { formData: getFormData('false'), expectedPortalEnabled: false }
  ])('returns expected payload', ({ formData, expectedPortalEnabled }) => {
    const payload = createPayloadForNewUser(CLIENT_ID, formData)

    expect(payload).toEqual({
      clientId: CLIENT_ID,
      languageIds: MOCK_ADJUSTED_LANGUAGES,
      portalEnabled: expectedPortalEnabled,
      inviteToLogin: formData.inviteToLogin,
      about: formData.about,
      billingCommunication: formData.billingCommunication,
      communication: formData.communication,
      creationMethod: formData.creationMethod,
      email: formData.email,
      fullName: formData.fullName,
      linkedin: formData.linkedin,
      location: formData.location,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation,
      phoneNumber: formData.phoneNumber,
      position: formData.position,
      skype: formData.skype,
      timeZoneName: formData.timeZoneName,
      twitter: formData.twitter,
      website: formData.website,
      jobId: formData.jobId
    })
  })
})
