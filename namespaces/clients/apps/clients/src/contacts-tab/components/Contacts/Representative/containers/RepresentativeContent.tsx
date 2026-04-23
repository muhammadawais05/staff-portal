import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import {
  useRepresentativePhonesEmails,
  CallRecording,
  ClientAndEmploymentStatus,
  Email,
  Status,
  JobsWithAssignButton,
  LastLogin,
  RepresentativeFragment,
  TimeZone,
  LinkOverflow,
  PhoneContactsViewer,
  EditableInformation
} from '@staff-portal/client-representatives'
import { NO_VALUE } from '@staff-portal/config'

import { getCommunicationOptions } from '../utils/get-communication-options'

interface Props {
  representative: RepresentativeFragment
}

const RepresentativeContent = ({ representative }: Props) => {
  const [phones, emails] = useRepresentativePhonesEmails(representative)
  const {
    id: companyRepresentativeId,
    client: { webResource: clientLink },
    position,
    linkedin,
    jobs,
    information,
    noLongerPartOfCompany,
    operations: {
      assignCompanyRepresentativeToJob,
      updateCompanyRepresentativeProfile
    },
    mergedInto,
    currentSignInAt,
    currentSignInIp,
    cumulativeStatus,
    ipLocation,
    timeZone,
    communicationOptions: communications,
    callRecordingAccepted
  } = representative

  return (
    <DetailedList labelColumnWidth={8} defaultValue={NO_VALUE}>
      <DetailedList.Row>
        <DetailedList.Item label='Company'>
          <ClientAndEmploymentStatus
            link={clientLink}
            noLongerPartOfCompany={noLongerPartOfCompany}
          />
        </DetailedList.Item>
        <DetailedList.Item label='Email'>
          <Email emails={emails} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item />
        <DetailedList.Item label='Portal Status'>
          <Status status={cumulativeStatus}/>
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Position'>{position}</DetailedList.Item>
        <DetailedList.Item label='Last login'>
          <LastLogin {...{ currentSignInAt, currentSignInIp, ipLocation }} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Phone'>
          {phones.length ? (
            <PhoneContactsViewer
              nodes={phones}
              nodeData={{ companyRepresentativeId }}
            />
          ) : null}
        </DetailedList.Item>
        <DetailedList.Item label='Time zone'>
          <TimeZone timeZone={timeZone} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='LinkedIn'>
          {linkedin ? (
            <LinkOverflow
              link={{ url: linkedin, text: linkedin }}
              target='_blank'
            />
          ) : null}
        </DetailedList.Item>
        <DetailedList.Item label='Communication'>
          {getCommunicationOptions(communications)}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Linked Jobs'>
          <JobsWithAssignButton
            jobs={jobs?.nodes}
            {...{ assignCompanyRepresentativeToJob, companyRepresentativeId }}
          />
        </DetailedList.Item>
        <DetailedList.Item label='Call Recording'>
          <CallRecording accepted={callRecordingAccepted} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Information'>
          <EditableInformation
            companyRepresentativeId={companyRepresentativeId}
            operation={updateCompanyRepresentativeProfile}
            value={information}
          />
        </DetailedList.Item>
        {mergedInto?.webResource ? (
          <DetailedList.Item label='Merged into link'>
            <LinkOverflow
              link={{
                url: mergedInto.webResource.url,
                text: mergedInto.webResource.text
              }}
              target='_blank'
            />
          </DetailedList.Item>
        ) : null}
      </DetailedList.Row>
    </DetailedList>
  )
}

export default RepresentativeContent
