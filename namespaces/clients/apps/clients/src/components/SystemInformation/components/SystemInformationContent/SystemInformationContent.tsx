import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import {
  parseAndFormatDate,
  DEFAULT_FULL_DATE_FORMAT
} from '@staff-portal/date-time-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { titleize } from '@staff-portal/string'
import { isOperationEnabled } from '@staff-portal/operations'
import { isNotNullish } from '@staff-portal/utils'
import { NO_VALUE } from '@staff-portal/config'

import {
  LastLogin,
  NPSScore,
  Origin,
  Referrer,
  ReviewLink,
  InterestedIn,
  HowDidYouHear,
  HowDidYouHearDetails
} from '../../components'
import {
  getClientSystemInformationDataHooks,
  useSystemInformationMutation
} from '../../utils'
import { SystemInformationFragment } from '../../data'
import SystemInformationSection from '../SystemInformationSection'

interface Props {
  systemInformation: SystemInformationFragment
}

const SystemInformationContent = ({ systemInformation }: Props) => {
  const {
    applicationInfo,
    approvedAt,
    billingVerifiedAt,
    claimableSince,
    claimedAt,
    createdAt,
    hiresCount,
    howDidYouHear,
    howDidYouHearDetails,
    id: clientId,
    interestedIn,
    lastAnsweredPromotion,
    mobileAppEnabled,
    operations: { patchClientProfile },
    promotions,
    referrer,
    representatives,
    reviewLink,
    reviewStatus,
    tosAcceptedAt,
    updatedAt
  } = systemInformation

  const user = useGetCurrentUser()
  const timeZone = user?.timeZone?.value
  const lastLoginDetails = representatives.nodes[0]
  const operationDisabled = !isOperationEnabled(patchClientProfile)
  const { handleChange } = useSystemInformationMutation(systemInformation)
  const {
    useClientReviewLink,
    useClientInterestedIn,
    useClientHowDidYouHear,
    useClientHowDidYouHearDetails
  } = getClientSystemInformationDataHooks(clientId)

  const fullDateOptions = {
    dateFormat: DEFAULT_FULL_DATE_FORMAT,
    timeZone
  }

  const claimableSinceDate = parseAndFormatDate(claimableSince, fullDateOptions)
  const approvedOnDate = parseAndFormatDate(approvedAt, fullDateOptions)
  const lastEditedDate = parseAndFormatDate(updatedAt, fullDateOptions)
  const appliedOnDate = parseAndFormatDate(createdAt, fullDateOptions)
  const claimedOnDate = parseAndFormatDate(claimedAt, fullDateOptions)
  const tosDate = parseAndFormatDate(tosAcceptedAt, { timeZone })
  const billingVerifiedOnDate = parseAndFormatDate(billingVerifiedAt, {
    timeZone
  })

  return (
    <SystemInformationSection>
      <DetailedList labelColumnWidth={9} defaultValue={NO_VALUE}>
        <DetailedList.Row>
          <DetailedList.Item
            label='Review status'
            value={reviewStatus && titleize(reviewStatus)}
          />
          <DetailedList.Item label='Origin'>
            {!!applicationInfo?.webResource.url && (
              <Origin clientId={clientId} />
            )}
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Review link'>
            <ReviewLink
              key='reviewLink'
              reviewLink={reviewLink}
              operationDisabled={operationDisabled}
              useClientReviewLink={useClientReviewLink}
              handleChange={handleChange}
            />
          </DetailedList.Item>
          <DetailedList.Item label='Referrer'>
            {!!referrer?.webResource.url && <Referrer referrer={referrer} />}
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='NPS Score'>
            {lastAnsweredPromotion && promotions?.webResource.url && (
              <NPSScore
                lastAnsweredPromotion={lastAnsweredPromotion}
                promotions={promotions}
                timeZone={timeZone}
              />
            )}
          </DetailedList.Item>
          <DetailedList.Item label='Applied on' value={appliedOnDate} />
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Most interested in'>
            <InterestedIn
              key='interestedInId'
              interestedIn={interestedIn}
              operationDisabled={operationDisabled}
              useClientInterestedIn={useClientInterestedIn}
              handleChange={handleChange}
            />
          </DetailedList.Item>
          <DetailedList.Item label='Claimed on' value={claimedOnDate} />
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Last edited' value={lastEditedDate} />
          <DetailedList.Item label='Approved on' value={approvedOnDate} />
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Last login'>
            {!!lastLoginDetails?.currentSignInAt && (
              <LastLogin
                lastLoginDetails={lastLoginDetails}
                timeZone={timeZone}
              />
            )}
          </DetailedList.Item>
          <DetailedList.Item
            label='Billing verified on'
            value={billingVerifiedOnDate}
          />
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item
            label='Mobile app access'
            value={mobileAppEnabled ? 'Enabled' : 'Disabled'}
          />
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Heard us from'>
            <HowDidYouHear
              key='howDidYouHear'
              howDidYouHear={howDidYouHear}
              operationDisabled={operationDisabled}
              useClientHowDidYouHear={useClientHowDidYouHear}
              handleChange={handleChange}
            />
          </DetailedList.Item>
          <DetailedList.Item
            label='Past hires'
            value={isNotNullish(hiresCount) && hiresCount.toString()}
          />
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='How they heard us'>
            <HowDidYouHearDetails
              key='howDidYouHearDetails'
              howDidYouHearDetails={howDidYouHearDetails}
              operationDisabled={operationDisabled}
              useClientHowDidYouHearDetails={useClientHowDidYouHearDetails}
              handleChange={handleChange}
            />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item
            label='Terms of service'
            value={tosAcceptedAt ? `Accepted on ${tosDate}` : 'Not accepted'}
          />
          <DetailedList.Item
            label='Claimable since'
            value={claimableSinceDate}
          />
        </DetailedList.Row>
      </DetailedList>
    </SystemInformationSection>
  )
}

export default SystemInformationContent
