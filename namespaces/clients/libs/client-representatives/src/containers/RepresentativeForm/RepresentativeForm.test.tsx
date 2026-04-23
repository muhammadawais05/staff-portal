import React from 'react'
import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import {
  Client,
  CompanyRepresentativeBillingCommunicationOption as BillingCommOpts,
  CompanyRepresentativeCommunicationOption as CommOpts,
  CompanyRepresentativeCreationMethod,
  ContactType,
  CreateCompanyRepresentativeInput,
  Maybe,
  PhoneCategory
} from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { waitFor } from '@testing-library/react'

import RepresentativeForm, { Props } from './RepresentativeForm'
import { createRepresentativeFragmentMock as mockRep } from '../../data/representative-fragment/mocks'
import {
  RepresentativeJobFragment,
  RepresentativeFragment as Representative
} from '../../data'

const TIMEZONES = [
  { name: '(UTC+01:00) Europe - Sarajevo', value: 'Europe/Sarajevo' },
  { name: '(UTC+02:00) Europe - Kyiv', value: 'Europe/Kyiv' }
]
const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'ba', name: 'Bosnian' }
]

const mockUpdateProfile = jest.fn()
const mockCreateRepresentative = jest.fn()

jest.mock(
  '../../data/update-representative-profile/update-representative-profile.staff.gql',
  () => ({
    useUpdateCompanyRepresentativeProfile: () => [
      mockUpdateProfile,
      { loading: false }
    ]
  })
)

jest.mock(
  './data/create-company-representative/create-company-representative.staff.gql',
  () => ({
    useCreateCompanyRepresentative: () => [
      mockCreateRepresentative,
      { loading: false }
    ]
  })
)

// timezones & languages
jest.mock('@staff-portal/languages', () => ({
  ...jest.requireActual('@staff-portal/languages'),
  useGetLanguages: () => ({
    languages: LANGUAGES,
    loading: false
  })
}))

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  useGetAvailableTimeZones: () => ({
    timezones: TIMEZONES,
    loading: false
  })
}))

// citites
jest.mock(
  '@staff-portal/google-maps/src/services/load-gmaps-options/load-gmaps-options',
  () => ({
    getCityOptionsFromGoogleMaps: () =>
      Promise.resolve([
        {
          value: '1337',
          text: 'Sarajevo'
        }
      ])
  })
)

// phone numbers array input
jest.mock(
  '../../components/PhoneContactsEditor/PhoneContactsEditor',

  () => ({
    __esModule: true,
    default: () => null
  })
)

const onCloseMock = jest.fn()

const allFieldLabels = [
  'Full Name',
  'Email',
  'Position',
  'Phone Number',
  'Phone Numbers',
  'Phone Number Notes',
  'Skype',
  'Country',
  'City',
  'Time Zone',
  'About',
  'Languages',
  'LinkedIn',
  'Zoominfo',
  'Twitter',
  'Information',
  'Password',
  'Password Confirmation',
  'Contact Login',
  'Send Invitation email',
  'Billing Communication',
  'View and Download Billing Reporting',
  'Communication',
  'This Person Is New to Toptal',
  'This Person Is Already on Toptal',
  'Website'
] as const

const expectFieldLabels = (labels: typeof allFieldLabels[number][]) => {
  const unexpectedLabels = allFieldLabels.filter(
    label => !labels.includes(label)
  )

  labels.forEach(label =>
    expect(
      screen.getByText(new RegExp('^' + label + '$', 'i'))
    ).toBeInTheDocument()
  )

  unexpectedLabels.forEach(label =>
    expect(
      screen.queryByText(new RegExp('^' + label + '$', 'i'))
    ).not.toBeInTheDocument()
  )
}

// if client id is passed we're creating a new rep
// if partial rep is passed we're editing existing one
const arrangeTest = (
  clientIdOrPartialRep: string | Partial<Representative>,
  client?: Partial<Maybe<Client>> | undefined
) => {
  mockUpdateProfile.mockResolvedValue({
    data: {
      updateCompanyRepresentativeProfile: { success: true, errors: [] }
    }
  })

  mockCreateRepresentative.mockResolvedValue({
    data: {
      createCompanyRepresentative: { success: true, errors: [] }
    }
  })

  const clientIdOrRepresentative =
    typeof clientIdOrPartialRep === 'string'
      ? clientIdOrPartialRep
      : mockRep('123', clientIdOrPartialRep)

  const defaultProps: Props = {
    onClose: onCloseMock,
    clientIdOrRepresentative,
    client: {
      contactInvitable: true,
      ...client
    }
  }

  return render(
    <TestWrapperWithMocks addTypename={false}>
      <RepresentativeForm {...defaultProps} />
    </TestWrapperWithMocks>
  )
}

const byValue = (value: string) => screen.queryByDisplayValue(value)

describe('RepresentativeForm', () => {
  describe('when editing an existing representative', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders expected fields', () => {
      arrangeTest({})

      expectFieldLabels([
        'Full Name',
        'Email',
        'Position',
        'Phone Numbers',
        'Phone Number Notes',
        'Skype',
        'Country',
        'City',
        'Time Zone',
        'About',
        'Languages',
        'LinkedIn',
        'Zoominfo',
        'Twitter',
        'Information',
        'Password',
        'Password Confirmation',
        'Contact Login',
        'Billing Communication',
        'View and Download Billing Reporting',
        'Communication'
      ])
    })

    it('renders representative text props as values', () => {
      arrangeTest({
        fullName: 'Reppo McEditface',
        position: 'Senior McManagement',
        linkedin: 'linkedinno',
        information: 'doot doot free text',
        about: 'doot doot more free text',
        phoneNumberNotes: 'more free text phone number notes',
        twitter: 'twitteroo',
        skype: 'skyppo',
        zoominfoProfile: 'zoominfo_profile'
      })
      ;[
        (byValue('Reppo McEditface'),
        byValue('Senior McManagement'),
        byValue('linkedinno'),
        byValue('doot doot free text'),
        byValue('doot doot more free text'),
        byValue('more free text phone number notes'),
        byValue('twitteroo'),
        byValue('skyppo'),
        byValue('zoominfo_profile'))
      ].forEach(input => expect(input).toBeInTheDocument())
    })

    it('picks primary email from representative contacts', () => {
      arrangeTest({
        fullName: 'Email McSkypyface',
        contacts: {
          __typename: 'ContactConnection',
          nodes: [
            {
              id: 'email-id',
              primary: true,
              type: ContactType.EMAIL,
              value: 'email@mc.hostnameface',
              __typename: 'Contact'
            },
            {
              id: 'secondary-email-id',
              primary: false,
              type: ContactType.EMAIL,
              value: 'throw@away.email',
              __typename: 'Contact'
            }
          ]
        }
      })

      expect(byValue('Email McSkypyface')).toBeInTheDocument()
      expect(byValue('email@mc.hostnameface')).toBeInTheDocument()
      expect(byValue('throw@away.email')).not.toBeInTheDocument()
    })

    describe('Boolean radio groups', () => {
      const getInputs = (container: HTMLElement, name: string) =>
        container.querySelectorAll(`input[name="${name}"]`)

      it('renders `false` as checked `No`', () => {
        const { container } = arrangeTest({
          portalEnabled: false,
          readBillingReport: false
        })

        const [portalRadios, billingRadios] = [
          getInputs(container, 'portalEnabled'),
          getInputs(container, 'readBillingReport')
        ]

        // 0 is 'Yes', 1 is 'No'
        expect(portalRadios.item(0)).not.toBeChecked()
        expect(portalRadios.item(1)).toBeChecked()
        expect(billingRadios.item(0)).not.toBeChecked()
        expect(billingRadios.item(1)).toBeChecked()
      })

      it('renders `true` as checked `Yes`', () => {
        const { container } = arrangeTest({
          portalEnabled: true,
          readBillingReport: true
        })

        const [portalRadios, billingRadios] = [
          getInputs(container, 'portalEnabled'),
          getInputs(container, 'readBillingReport')
        ]

        // 0 is 'Yes', 1 is 'No'
        expect(portalRadios.item(0)).toBeChecked()
        expect(portalRadios.item(1)).not.toBeChecked()
        expect(billingRadios.item(0)).toBeChecked()
        expect(billingRadios.item(1)).not.toBeChecked()
      })
    })

    describe('Communication options', () => {
      it('explains disabled choices', () => {
        arrangeTest({
          disabledCommunicationOptions: [
            CommOpts.NOTIFY_TALENT_RECOMMENDATIONS,
            CommOpts.NOTIFY_JOBS
          ]
        })

        expect(
          screen.getByText(
            /You cannot disable Send Talent Recommendation Emails or Send Emails About All Jobs./
          )
        ).toBeInTheDocument()
      })
    })

    describe('Billing Communication options', () => {
      it('explains single choice', () => {
        arrangeTest({
          disabledBillingCommunicationOptions: [
            BillingCommOpts.NONE,
            BillingCommOpts.SELECTED_JOB_NOTICES
          ]
        })

        expect(
          screen.getByText(/You cannot disable Billing Communication/i)
        ).toBeInTheDocument()
      })

      describe('Job notices', () => {
        const JOB: RepresentativeJobFragment = {
          id: 'jobbo-id',
          webResource: {
            text: 'jobbo for subscribing',
            url: 'https://job.bo',
            __typename: 'Link'
          },
          __typename: 'Job'
        }

        beforeEach(() => {
          arrangeTest({
            jobs: {
              nodes: [JOB],
              __typename: 'CompanyRepresentativeJobsConnection'
            }
          })
        })

        it('renders available jobs when "job notices" billing communication is selected', () => {
          fireEvent.click(screen.getByLabelText('Selected Job Notices'))

          expect(screen.getByText(/Jobbo for subscribing/i)).toBeInTheDocument()

          fireEvent.click(screen.getByLabelText('All Notices'))

          expect(
            screen.queryByText(/Jobbo for subscribing/i)
          ).not.toBeInTheDocument()
        })

        it('submits selected job notices', async () => {
          // show job notices checkboxes
          fireEvent.click(screen.getByLabelText('Selected Job Notices'))
          // select job
          fireEvent.click(screen.getByLabelText(/Jobbo for subscribing/i))
          // submit
          fireEvent.click(screen.getByText('Save'))
          await act(() => Promise.resolve())

          expect(mockUpdateProfile).toHaveBeenCalledWith({
            variables: {
              input: expect.objectContaining({
                billingCommunicationJobIds: ['jobbo-id']
              })
            }
          })
        })

        it('does not submit selected job notices when they are selected but hidden afterwards', async () => {
          // show job notices checkboxes
          fireEvent.click(screen.getByLabelText('Selected Job Notices'))
          // select job
          fireEvent.click(screen.getByLabelText(/Jobbo for subscribing/i))
          // hide checkboxes
          fireEvent.click(screen.getByLabelText('All Notices'))
          // submit
          fireEvent.click(screen.getByText('Save'))
          await act(() => Promise.resolve())

          expect(mockUpdateProfile).toHaveBeenCalledWith({
            variables: {
              input: expect.not.objectContaining({
                billingCommunicationJobIds: ['jobbo-id']
              })
            }
          })
        })
      })
    })

    it('calls onClose on cancel click', () => {
      arrangeTest({})
      fireEvent.click(screen.getByText('Cancel'))

      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    describe('Mutation', () => {
      it('shows notification upon success and calls onClose', async () => {
        arrangeTest({ fullName: 'Reppo McEditface' })

        fireEvent.click(screen.getByText('Save'))
        await act(() => Promise.resolve())

        expect(onCloseMock).toHaveBeenCalledTimes(1)
        expect(
          await screen.findByText(/Contact information updated/i)
        ).toBeInTheDocument()
      })

      it('sends form values to the mutation when Save is clicked', async () => {
        arrangeTest({
          fullName: 'Reppo McEditface',
          twitter: 'twitteroo',
          zoominfoProfile: 'zoominfo_profile',
          contacts: {
            nodes: [
              {
                id: 'banana-id',
                primary: true,
                value: '+1-BANANA-PHONE',
                type: ContactType.PHONE,
                phoneCategory: PhoneCategory.OTHER,
                __typename: 'Contact'
              }
            ],
            __typename: 'ContactConnection'
          }
        })

        // email
        fireEvent.change(screen.getByLabelText(/\*.*Email/i), {
          target: { value: 'edited@ema.il' }
        })
        // communication
        fireEvent.click(
          screen.getByLabelText('Send Talent Recommendation Emails')
        )
        fireEvent.click(screen.getByLabelText('Send Other Company Emails'))
        // billing comms
        fireEvent.click(screen.getByLabelText('None'))
        // submit
        fireEvent.click(screen.getByText('Save'))
        await act(() => Promise.resolve())

        expect(mockUpdateProfile).toHaveBeenCalledWith({
          variables: {
            input: expect.objectContaining({
              email: 'edited@ema.il',
              fullName: 'Reppo McEditface',
              twitter: 'twitteroo',
              zoominfoProfile: 'zoominfo_profile',
              communication: [
                CommOpts.NOTIFY_TALENT_RECOMMENDATIONS,
                CommOpts.NOTIFY_OTHER
              ],
              phones: [
                {
                  id: 'banana-id',
                  phoneCategory: 'OTHER',
                  primary: true,
                  value: '+1-BANANA-PHONE'
                }
              ],
              billingCommunication: BillingCommOpts.NONE
            })
          }
        })
      })
    })

    describe('Login  invitation email checkbox', () => {
      it('renders when portalEnabled is set, contactInvitable is true and rep never logged in before', () => {
        arrangeTest({
          portalEnabled: true,
          currentSignInAt: null,
          contactInvitable: true
        })

        expect(screen.getByText(/^Send Invitation Email$/i)).toBeInTheDocument()
      })

      it('does not render when contact is not invitable', () => {
        const rep = mockRep('123', {
          portalEnabled: true,
          currentSignInAt: null,
          contactInvitable: false
        })

        arrangeTest(
          {
            ...rep
          },
          { contactInvitable: false }
        )

        expect(
          screen.queryByText(/^Send Invitation Email$/i)
        ).not.toBeInTheDocument()
      })

      it('does not render when portalEnabled is not set', () => {
        arrangeTest({
          portalEnabled: false,
          currentSignInAt: null
        })

        expect(
          screen.queryByText(/^Send Invitation Email$/i)
        ).not.toBeInTheDocument()
      })

      it('does not render when rep logged in before', () => {
        arrangeTest(
          {
            portalEnabled: true,
            currentSignInAt: '2021-09-02T08:08:03.292Z'
          },
          { contactInvitable: false }
        )

        expect(
          screen.queryByText(/^Send Invitation Email$/i)
        ).not.toBeInTheDocument()
      })

      it('does not render if portalEnabled radio button is switched to false at runtime', () => {
        arrangeTest({
          portalEnabled: true,
          currentSignInAt: null
        })

        fireEvent.click(screen.getByTestId('portalEnabled-no'))

        expect(
          screen.queryByText(/^Send Invitation Email$/i)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when creating a new representative', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders expected fields for creating a rep who is new to Toptal', () => {
      arrangeTest('clientId')

      expectFieldLabels([
        'This Person Is New to Toptal',
        'This Person Is Already on Toptal',
        'Full Name',
        'Phone Number',
        'Email',
        'Position',
        'Skype',
        'Country',
        'City',
        'Time Zone',
        'About',
        'Languages',
        'Twitter',
        'Website',
        'Password',
        'Password Confirmation',
        'Contact Login',
        'Billing Communication',
        'Communication'
      ])
    })

    // eslint-disable-next-line jest/expect-expect
    it('renders expected fields for creating a rep who is already on Toptal', () => {
      arrangeTest('clientId')

      fireEvent.click(screen.getByTestId('radio-existing-person'))

      expectFieldLabels([
        'This Person Is New to Toptal',
        'This Person Is Already on Toptal',
        'Email',
        'Position',
        'Contact Login',
        'Billing Communication',
        'Communication'
      ])
    })

    describe('Mutation', () => {
      it('shows notification upon success and calls onClose', async () => {
        arrangeTest('clientId')

        fireEvent.change(screen.getByLabelText(/\*.*Full Name$/i), {
          target: { value: 'Mister X' }
        })

        fireEvent.change(screen.getByLabelText(/\*.*Email$/i), {
          target: { value: 'mister@xxx.com' }
        })

        fireEvent.click(screen.getByTestId('portalEnabled-no'))

        fireEvent.click(screen.getByText('Save'))

        waitFor(() => {
          expect(onCloseMock).toHaveBeenCalledTimes(1)
          expect(screen.findByText(/Contact created/i)).toBeInTheDocument()
        })
      })

      describe('Sending form values', () => {
        beforeEach(() => {
          arrangeTest('clientId')

          // name - required
          fireEvent.change(screen.getByLabelText(/\*.*Full Name$/i), {
            target: { value: 'The Boss' }
          })

          // email - required
          fireEvent.change(screen.getByLabelText(/\*.*Email$/i), {
            target: { value: 'the@boss.com' }
          })

          // contact login - required
          fireEvent.click(screen.getByTestId('portalEnabled-no'))
        })

        it('sends form values to the mutation when Save is clicked: part one', async () => {
          fireEvent.change(screen.getByLabelText(/Position$/i), {
            target: { value: 'Boss' }
          })

          fireEvent.change(screen.getByLabelText(/Skype$/i), {
            target: { value: 'skype_of_the_boss' }
          })

          fireEvent.change(screen.getByLabelText(/Twitter$/i), {
            target: { value: 'twitter_of_the_boss' }
          })

          fireEvent.change(screen.getByLabelText(/Website$/i), {
            target: { value: 'https://the.boss.com' }
          })

          fireEvent.change(screen.getByLabelText(/Password$/i), {
            target: { value: 'mysecret' }
          })

          fireEvent.change(screen.getByLabelText(/Password Confirmation$/i), {
            target: { value: 'mysecret' }
          })

          fireEvent.click(
            screen.getByLabelText('Send Talent Recommendation Emails')
          )

          fireEvent.click(screen.getByLabelText('Send Other Company Emails'))

          fireEvent.click(screen.getByText('Save'))

          const expectedInput: CreateCompanyRepresentativeInput = {
            clientId: 'clientId',
            creationMethod: CompanyRepresentativeCreationMethod.NEW,
            fullName: 'The Boss',
            email: 'the@boss.com',
            position: 'Boss',
            skype: 'skype_of_the_boss',
            twitter: 'twitter_of_the_boss',
            website: 'https://the.boss.com',
            languageIds: [],
            password: 'mysecret',
            passwordConfirmation: 'mysecret',
            portalEnabled: false,
            billingCommunication: BillingCommOpts.NONE,
            communication: [
              CommOpts.NOTIFY_TALENT_RECOMMENDATIONS,
              CommOpts.NOTIFY_OTHER
            ]
          }

          waitFor(() => {
            expect(mockCreateRepresentative).toHaveBeenCalledWith({
              variables: { input: expectedInput }
            })
          })
        })

        it('sends form values to the mutation when Save is clicked: part two', async () => {
          // country
          fireEvent.change(screen.getByLabelText(/Country$/i), {
            target: { value: 'boss-nia.countryId' }
          })

          // city
          fireEvent.change(screen.getByLabelText(/City$/i), {
            target: { value: 'Sarajevo' }
          })
          fireEvent.click(await screen.findByText('Sarajevo'))

          // timezone
          fireEvent.click(screen.getByLabelText(/Time Zone$/i))
          fireEvent.click(screen.getByText(/Europe - Sarajevo$/i))

          // languages
          fireEvent.change(screen.getByLabelText(/Languages$/i), {
            target: { value: 'bosni' }
          })
          fireEvent.click(screen.getByText('Bosnian'))

          fireEvent.click(screen.getByText('Save'))

          const expectedInput: CreateCompanyRepresentativeInput = {
            clientId: 'clientId',
            creationMethod: CompanyRepresentativeCreationMethod.NEW,
            fullName: 'The Boss',
            email: 'the@boss.com',
            languageIds: ['ba'],
            location: {
              city: 'Sarajevo',
              countryId: 'boss-nia.countryId',
              placeId: '1337',
              cityName: 'Sarajevo'
            },
            timeZoneName: 'Europe/Sarajevo',
            billingCommunication: BillingCommOpts.NONE,
            portalEnabled: false
          }

          waitFor(() => {
            expect(mockCreateRepresentative).toHaveBeenCalledWith({
              variables: { input: expectedInput }
            })
          })
        })
      })
    })

    describe('Login  invitation email checkbox', () => {
      it('renders if portalEnabled radio button is switched to true at runtime', () => {
        arrangeTest('clientId')

        fireEvent.click(screen.getByTestId('portalEnabled-yes'))

        expect(screen.getByText(/^Send Invitation Email$/i)).toBeInTheDocument()
      })

      it('does not render if portalEnabled radio button is switched to false at runtime', () => {
        arrangeTest('clientId')

        fireEvent.click(screen.getByTestId('portalEnabled-no'))

        expect(
          screen.queryByText(/^Send Invitation Email$/i)
        ).not.toBeInTheDocument()
      })
    })
  })
})
