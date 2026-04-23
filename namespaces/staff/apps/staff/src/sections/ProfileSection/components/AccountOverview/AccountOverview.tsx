/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import React from 'react'
import {
  DetailedList,
  TwitterLink,
  EmailLink,
  ExternalLink
} from '@staff-portal/ui'
import { RolePhoneLink, SkypeLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import {
  AccountField,
  LastLoginField,
  OtherRolesField,
  SpokenLanguagesField
} from '@staff-portal/role-profile'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
/**
 * TODO: remove the comment, once the component would be extracted to the correct folder
 * https://toptal-core.atlassian.net/browse/SP-2308
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PaymentMethodsField } from '@staff-portal/talents-profile'
import { checkIfFieldIsForbidden } from '@staff-portal/data-layer-service'

import TwilioNumber from '../TwilioNumber/TwilioNumber'
import StatusField from '../../../../components/StatusField/StatusField'
import Teams from '../../../../components/Teams/Teams'
import BillingNotes from '../BillingNotes/BillingNotes'
import EmployeeType from '../EmployeeType/EmployeeType'
import PayFrequency from '../PayFrequency/PayFrequency'
import TermsOfService from '../TermsOfService/TermsOfService'
import { useStaffContext } from '../../../../context/StaffContext'

const AccountOverview = () => {
  const { staffProfile, error } = useStaffContext()
  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  if (!staffProfile) {
    return null
  }

  const {
    id: staffId,
    email,
    phoneNumber,
    skype,
    jobTitle,
    legalName,
    citizenship,
    location,
    ofacStatus,
    visualComplianceStatus,
    timeZone,
    twitterLink,
    otherRoles,
    cityDescription,
    twilioNumber,
    cumulativeStatus,
    createdAt,
    updatedAt,
    currentSignInAt,
    currentSignInIp,
    ipLocation,
    tosAcceptedAt,
    website,
    languages,
    paymentOptions,
    teams,
    billingNotes,
    paymentsEmployeeType,
    paymentsFrequency,
    unallocatedMemorandum,
    operations: {
      updateBillingNotes,
      updatePaymentsEmployeeType,
      updatePaymentsFrequency
    }
  } = staffProfile

  return (
    <DetailedList defaultValue={NO_VALUE} labelColumnWidth={11} striped>
      <DetailedList.Row>
        <DetailedList.Item label='Email'>
          <EmailLink email={email} />
        </DetailedList.Item>
      </DetailedList.Row>
      {!!otherRoles?.nodes.length && (
        <DetailedList.Row>
          <DetailedList.Item label='Other roles'>
            <OtherRolesField otherRoles={otherRoles.nodes} />
          </DetailedList.Item>
        </DetailedList.Row>
      )}
      <DetailedList.Row>
        <DetailedList.Item label='Phone'>
          {phoneNumber ? (
            <RolePhoneLink
              roleId={staffId}
              destination={phoneNumber}
              contactType={ContactType.PHONE}
            />
          ) : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      {!checkIfFieldIsForbidden('twilioNumber', error) &&
        <DetailedList.Row>
          <DetailedList.Item label='Twilio number'>
            <TwilioNumber twilioNumber={twilioNumber} staffId={staffId} />
          </DetailedList.Item>
        </DetailedList.Row>}
      <DetailedList.Row>
        <DetailedList.Item label='Skype'>
          {skype ? <SkypeLink skypeId={skype} /> : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Twitter'>
          {twitterLink?.url ? (
            <TwitterLink url={twitterLink.url} text={twitterLink.text} />
          ) : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Title'>{jobTitle}</DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Legal name'>{legalName}</DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Current country'>
          {location?.countryName}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Current city'>
          {cityDescription}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Time zone'>
          {getTimeZoneFullText(timeZone)}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Citizenship'>
          {citizenship?.name}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Status'>
          {cumulativeStatus ? (
            <StatusField cumulativeStatus={cumulativeStatus} />
          ) : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Applied'>
          {userDateFormatter(createdAt)}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Last Edited'>
          {userDateFormatter(updatedAt)}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Last Login'>
          {ipLocation ? (
            <LastLoginField
              dateTime={userDateTimeFormatter(currentSignInAt)}
              ip={currentSignInIp}
              ipLocation={ipLocation}
            />
          ) : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Terms of service'>
          <TermsOfService tosAcceptedAt={tosAcceptedAt} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Website'>
          {website ? <ExternalLink href={website} /> : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Teams'>
          {teams?.nodes.length ? (
            <Teams teams={teams} staffId={staffId} />
          ) : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Spoken languages'>
          {languages?.nodes.length ? (
            <SpokenLanguagesField languages={languages.nodes} />
          ) : undefined}
        </DetailedList.Item>
      </DetailedList.Row>
      {paymentOptions && (
        <DetailedList.Row>
          <DetailedList.Item label='Payment methods'>
            {paymentOptions.nodes.length ? (
              <PaymentMethodsField paymentOptions={paymentOptions} />
            ) : undefined}
          </DetailedList.Item>
        </DetailedList.Row>
      )}
      <DetailedList.Row>
        <DetailedList.Item label='Notes'>
          <BillingNotes
            staffId={staffId}
            billingNotes={billingNotes}
            operation={updateBillingNotes}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Employee type'>
          <EmployeeType
            staffId={staffId}
            operation={updatePaymentsEmployeeType}
            value={paymentsEmployeeType}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Pay frequency'>
          <PayFrequency
            staffId={staffId}
            operation={updatePaymentsFrequency}
            value={paymentsFrequency}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Account'>
          <AccountField unallocatedMemorandum={unallocatedMemorandum} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='OFAC Status'>
          <OFACStatusField
            ofacStatus={ofacStatus}
            visualComplianceStatus={visualComplianceStatus}
          />
        </DetailedList.Item>
      </DetailedList.Row>
    </DetailedList>
  )
}

export default AccountOverview
