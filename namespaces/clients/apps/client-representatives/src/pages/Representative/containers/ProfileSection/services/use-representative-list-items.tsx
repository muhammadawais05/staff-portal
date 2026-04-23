import React, { useMemo } from 'react'
import { DetailedListItems } from '@staff-portal/ui'
import { SkypeLink } from '@staff-portal/communication'
import { Container } from '@toptal/picasso'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import {
  RepresentativeContactFragment as Contact,
  RepresentativeFragment as Representative,
  CallRecording,
  ClientAndEmploymentStatus,
  Email,
  JobsLinks,
  JobsWithAssignButton,
  LastLogin,
  LinkOverflow,
  LoginStatus,
  NPSScore,
  TimeZone,
  TimeZonedDate,
  mapBillingOptsToNames,
  mapCommOptsToNames,
  PhoneContactsViewer,
  useRepresentativePhonesEmails
} from '@staff-portal/client-representatives'

export const useRepresentativeListItems = (
  representative: Representative
): DetailedListItems => {
  const [phones, emails] = useRepresentativePhonesEmails(representative)

  return useMemo(
    () => getItems(representative, [phones, emails]),
    [representative, phones, emails]
  )
}

type GetItems = (
  representative: Representative,
  phonesEmails: Contact[][]
) => DetailedListItems

// eslint-disable-next-line max-lines-per-function, complexity
const getItems: GetItems = (
  {
    id: companyRepresentativeId,
    client: { webResource: clientLink },
    position,
    linkedin,
    zoominfoProfile,
    phoneNumberNotes,
    skype,
    twitter,
    location,
    languages,
    jobs,
    noLongerPartOfCompany,
    operations: { assignCompanyRepresentativeToJob },
    timeZone,
    mergedInto,
    salesforceLink,
    createdAt,
    activatedAt,
    updatedAt,
    tosAcceptedAt,
    lastAnsweredPromotion: promotion,
    lastAnsweredPromotionUrl: promotionUrl,
    cumulativeStatus,
    currentSignInAt,
    currentSignInIp,
    ipLocation,
    communicationOptions: communications,
    billingCommunication,
    jobsWithBillingNotification,
    readBillingReport,
    callRecordingAccepted,
    ofacStatus,
    visualComplianceStatus
  },
  [phones, emails]
) => [
  {
    label: 'Email',
    value: <Email emails={emails} />
  },
  {
    label: 'Company',
    value: (
      <ClientAndEmploymentStatus
        link={clientLink}
        noLongerPartOfCompany={noLongerPartOfCompany}
      />
    )
  },
  { label: 'Position', value: position },

  {
    label: 'Phone',
    value: phones.length ? (
      <Container flex>
        <PhoneContactsViewer
          nodes={phones}
          nodeData={{ companyRepresentativeId }}
        />
      </Container>
    ) : null
  },

  // 'Phone Number Notes' row is rendered only if field's there
  ...(phoneNumberNotes
    ? [{ label: 'Phone Number Notes', value: phoneNumberNotes }]
    : []),

  {
    label: 'Skype',
    value: skype ? <SkypeLink skypeId={skype} /> : null
  },

  {
    label: 'Twitter',
    value: twitter ? (
      <LinkOverflow
        link={{ url: `https://twitter.com/${twitter}`, text: `@${twitter}` }}
        target='_blank'
      />
    ) : null
  },
  {
    label: 'LinkedIn',
    value: linkedin ? (
      <LinkOverflow link={{ url: linkedin, text: linkedin }} target='_blank' />
    ) : null
  },
  {
    label: 'Zoominfo profile',
    value: zoominfoProfile ? (
      <LinkOverflow
        link={{ url: zoominfoProfile, text: 'Go to zoominfo' }}
        target='_blank'
      />
    ) : null
  },

  {
    label: 'Salesforce',
    value: salesforceLink ? (
      <LinkOverflow link={salesforceLink} target='_blank' />
    ) : null
  },

  {
    label: 'Country',
    value: location?.country?.name
  },
  {
    label: 'Current City',
    value: location?.cityName
  },

  {
    label: 'Spoken languages',
    value: languages?.nodes.length
      ? languages.nodes.map(lang => lang.name).join(', ')
      : null
  },

  { label: 'Time zone', value: <TimeZone timeZone={timeZone} /> },

  {
    label: 'Portal status',
    value: cumulativeStatus ? <LoginStatus status={cumulativeStatus} /> : null
  },

  {
    label: 'Applied',
    value: <TimeZonedDate date={createdAt} />
  },
  {
    label: 'Approved',
    value: <TimeZonedDate date={activatedAt} />
  },
  {
    label: 'Last edited',
    value: <TimeZonedDate date={updatedAt} />
  },

  {
    label: 'Last login',
    value: <LastLogin {...{ currentSignInAt, currentSignInIp, ipLocation }} />
  },

  {
    label: 'Terms of service',
    value: tosAcceptedAt ? (
      <>
        Accepted on <TimeZonedDate date={tosAcceptedAt} />
      </>
    ) : (
      'Not accepted'
    )
  },
  {
    label: 'NPS Score',
    value: <NPSScore promotion={promotion} url={promotionUrl} />
  },

  {
    label: 'OFAC Status',
    value: <OFACStatusField {...{ ofacStatus, visualComplianceStatus }} />
  },

  {
    label: 'Call Recording',
    value: <CallRecording accepted={callRecordingAccepted} />
  },

  {
    label: 'Billing Communication',
    value: billingCommunication
      ? mapBillingOptsToNames(billingCommunication)
      : null
  },
  {
    label: 'View and download billing reporting',
    value: readBillingReport ? 'Yes' : 'No'
  },
  // 'Selected Job Notices' row is rendered only if field's there
  ...(jobsWithBillingNotification?.nodes?.length
    ? [
        {
          label: 'Selected Job Notices',
          value: <JobsLinks jobs={jobsWithBillingNotification.nodes} />
        }
      ]
    : []),
  {
    label: 'Communication',
    value: communications?.length
      ? communications.map(mapCommOptsToNames).join(', ')
      : null
  },

  {
    label: 'Linked Jobs',
    value: (
      <JobsWithAssignButton
        jobs={jobs?.nodes}
        {...{ assignCompanyRepresentativeToJob, companyRepresentativeId }}
      />
    )
  },

  // 'merged into' row is rendered only if field's there
  ...(mergedInto?.webResource
    ? [
        {
          label: 'Merged into link',
          value: (
            <LinkOverflow
              link={{
                url: mergedInto.webResource.url,
                text: mergedInto.webResource.text
              }}
              target='_blank'
            />
          )
        }
      ]
    : [])
]
