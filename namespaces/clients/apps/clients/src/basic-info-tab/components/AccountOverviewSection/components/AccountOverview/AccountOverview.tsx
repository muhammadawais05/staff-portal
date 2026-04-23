/* eslint-disable max-lines */
import React, { useCallback } from 'react'
import {
  UserBadge,
  Container,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { ApolloError } from '@staff-portal/data-layer-service'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import { ClientPhoneLink } from '@staff-portal/communication'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  ContactType,
  ClientEnterpriseAccountStatusEnum
} from '@staff-portal/graphql/staff'
import { ProfileHeader } from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'
import {
  ClientIcon,
  CompanyStatus,
  isEnterpriseBusiness,
  LeadProbabilityBucket
} from '@staff-portal/clients'

import { CompanyNegotiationStatus } from '../../../CompanyNegotiationStatus'
import { CompanyOverviewFragment } from '../../data'
import { isAuthorisedField } from './utils/is-authorised-field'
import { usePatchClientChangeHandler } from './utils/use-patch-client-change-handler'
import {
  AccountOverviewContactName,
  AccountOverviewEmail,
  AccountOverviewSkype,
  CountAsLead,
  PrimaryRegion,
  PhoneContacts,
  CompanyHqPhone,
  TimeZone,
  ParentLink,
  LegalName,
  LegalContact,
  SalesforceLink,
  AccountOverviewHierarchy,
  Location,
  ActualSignDate,
  SalesPlaybookName,
  ClientLeadSource,
  AccountPlan,
  Website,
  ClientBusinessType,
  LikelihoodToClose,
  LeadStatus,
  NextLeadAction,
  BillingOptionsUpdate,
  Tier,
  SecondaryRegion,
  DiscountEligible,
  DefaultDiscount,
  EnterpriseAccountStatus,
  LegalStaTerms
} from './components'

export interface Props {
  company: CompanyOverviewFragment
  error: ApolloError | undefined
}

// eslint-disable-next-line max-lines-per-function, complexity
const AccountOverview = ({ company, error }: Props) => {
  const {
    id: clientId,
    operations,
    businessType,
    contact,
    email,
    companyHqPhone,
    clientopedia,
    billingPhone,
    timeZone,
    parent,
    ofacStatus,
    visualComplianceStatus,
    legalName,
    fullName,
    signerEmail,
    signerFullName,
    salesforceLink,
    hierarchyCategory,
    country,
    city,
    cumulativeStatus,
    investigations,
    actualSignDate,
    leadPotential,
    scoreExplanation,
    salesPlaybookName,
    leadSource,
    onboardingPath,
    accountPlan,
    website,
    likelihoodToClose,
    enterpriseLeadStatus,
    enterpriseFollowUpStatus,
    enterpriseFollowUpStatusComment,
    currentNegotiation,
    billingOptionsUpdateEnabled,
    tier,
    secondaryRegion,
    discountEligible,
    fullTimeDiscount,
    partTimeDiscount,
    enterpriseAccountStatus,
    activeStaContract,
    photo,
    primaryRegion,
    countAsLead
  } = company

  const onChange = usePatchClientChangeHandler(company)
  const enterprise = isEnterpriseBusiness(businessType)
  const authorisedField = useCallback(
    (fieldName: string) => isAuthorisedField(error, fieldName),
    [error]
  )
  const showEnterpriseAccountStatus =
    enterprise &&
    !parent &&
    enterpriseAccountStatus?.status &&
    enterpriseAccountStatus?.status !==
      ClientEnterpriseAccountStatusEnum.DISABLED

  return (
    <Container>
      <Container bottom='small'>
        <ProfileHeader id={clientId}>
          <UserBadge
            size='small'
            name=''
            avatar={
              photo?.small ?? <ClientIcon color='dark-grey' size='5rem' />
            }
          />
        </ProfileHeader>
      </Container>
      <Typography as='div' size='medium'>
        <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10}>
          <DetailedList.Row>
            <DetailedList.Item label='Primary Contact'>
              <AccountOverviewContactName
                clientId={clientId}
                businessType={businessType}
                contactName={contact?.fullName}
                handleChange={onChange}
                operation={operations.patchClientProfile}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Email'>
              <AccountOverviewEmail
                clientId={clientId}
                email={email}
                operation={operations.patchClientProfile}
                handleChange={onChange}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Phone'>
              {contact && (
                <PhoneContacts contact={contact} clientId={clientId} />
              )}
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Company HQ Phone'>
              <CompanyHqPhone
                clientId={clientId}
                value={companyHqPhone}
                clientopediaValue={clientopedia?.phone}
                handleChange={onChange}
                operation={operations.patchClientProfile}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Billing Phone'>
              {billingPhone && (
                <ClientPhoneLink
                  clientId={clientId}
                  destination={billingPhone}
                  contactType={ContactType.PHONE}
                />
              )}
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Skype'>
              <AccountOverviewSkype
                clientId={clientId}
                contact={contact}
                operation={operations.patchClientProfile}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Time Zone'>
              <TimeZone
                editingDisabled={
                  !isOperationEnabled(operations.patchClientProfile)
                }
                timeZone={timeZone}
                clientId={clientId}
                handleChange={onChange}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Parent'>
                <ParentLink
                  clientId={clientId}
                  parent={parent}
                  operations={operations}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          <DetailedList.Row>
            <DetailedList.Item label='Legal Name'>
              <LegalName
                clientId={clientId}
                value={legalName || fullName}
                operation={operations.updateClientLegalName}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Legal Contact'>
              <LegalContact
                clientId={clientId}
                signerEmail={signerEmail}
                signerFullName={signerFullName}
                operation={operations.updateClientLegalContactDetails}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Legal STA Terms'>
              <LegalStaTerms
                activeStaContract={activeStaContract}
                legalName={legalName || fullName}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Salesforce Account'>
              <SalesforceLink
                clientId={clientId}
                operation={operations.pushClientToSalesforce}
                salesforceLink={salesforceLink}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Hierarchy'>
              <AccountOverviewHierarchy hierarchyCategory={hierarchyCategory} />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Location'>
              <Location
                clientId={clientId}
                country={country}
                city={city}
                editingDisabled={
                  !isOperationEnabled(operations.patchClientProfile)
                }
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Status'>
              <CompanyStatus
                cumulativeStatus={cumulativeStatus}
                investigations={investigations}
              />
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
          {authorisedField('actualSignDate') && (
            <DetailedList.Row>
              <DetailedList.Item label='Actual Sign Date'>
                <ActualSignDate
                  clientId={clientId}
                  value={actualSignDate}
                  operation={operations.updateActualSignDate}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          <DetailedList.Row>
            <DetailedList.Item label='Lead Probability Bucket'>
              <LeadProbabilityBucket
                bucket={leadPotential?.leadProbabilityBucket}
                scoreExplanation={scoreExplanation}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          {!enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Sales Playbook'>
                <SalesPlaybookName salesPlaybookName={salesPlaybookName} />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          <DetailedList.Row>
            <DetailedList.Item label='Lead Source'>
              <ClientLeadSource
                editingDisabled={
                  !isOperationEnabled(operations.updateClientLeadSource)
                }
                value={leadSource}
                clientId={clientId}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Onboarding Path'>
              {onboardingPath && (
                <TypographyOverflow data-testid='onboarding-path'>
                  {onboardingPath}
                </TypographyOverflow>
              )}
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Account Plan'>
              <AccountPlan accountPlan={accountPlan} />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Website'>
              <Website
                clientId={clientId}
                handleChange={onChange}
                website={website ?? ''}
                operation={operations.patchClientProfile}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Business Type'>
              <ClientBusinessType
                editingDisabled={
                  !isOperationEnabled(operations.updateClientBusinessType)
                }
                value={businessType ?? undefined}
                clientId={clientId}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Likelihood to Close'>
                <LikelihoodToClose
                  operation={operations.updateClientLikelihoodToClose}
                  value={likelihoodToClose}
                  clientId={clientId}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Lead Status'>
                <LeadStatus
                  operation={operations.updateClientEnterpriseLeadStatus}
                  value={enterpriseLeadStatus}
                  clientId={clientId}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Next lead action'>
                <NextLeadAction
                  status={enterpriseFollowUpStatus}
                  comment={enterpriseFollowUpStatusComment}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Negotiation Status'>
                <CompanyNegotiationStatus value={currentNegotiation} />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Billing Options Update'>
                <BillingOptionsUpdate
                  clientId={clientId}
                  editingDisabled={
                    !isOperationEnabled(operations.patchClientProfile)
                  }
                  value={billingOptionsUpdateEnabled}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Tier'>
                <Tier value={tier} />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Primary Region'>
                <PrimaryRegion
                  clientId={clientId}
                  updateClientPrimaryRegion={
                    operations.updateClientPrimaryRegion
                  }
                  primaryRegion={primaryRegion}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {enterprise && (
            <DetailedList.Row>
              <DetailedList.Item label='Secondary Region'>
                <SecondaryRegion
                  clientId={clientId}
                  updateClientSecondaryRegion={
                    operations.updateClientSecondaryRegion
                  }
                  secondaryRegion={secondaryRegion}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          {authorisedField('countAsLead') && (
            <DetailedList.Row>
              <DetailedList.Item label='Count as Lead'>
                <CountAsLead
                  clientId={clientId}
                  value={countAsLead}
                  operation={operations.updateClientCountAsLead}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          <DetailedList.Row>
            <DetailedList.Item label='3% Discount Eligible'>
              <DiscountEligible
                clientId={clientId}
                businessType={businessType}
                value={discountEligible}
                operation={operations.updateClientDiscountEligible}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          {showEnterpriseAccountStatus && (
            <DetailedList.Row>
              <DetailedList.Item label='Enterprise Account Status'>
                <EnterpriseAccountStatus
                  clientId={clientId}
                  enterpriseAccountStatus={enterpriseAccountStatus}
                  restoreClientEnterpriseAccountStatus={
                    operations.restoreClientEnterpriseAccountStatus
                  }
                  updateClientEnterpriseAccountStatus={
                    operations.updateClientEnterpriseAccountStatus
                  }
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
          <DetailedList.Row>
            <DetailedList.Item label='Default Discount'>
              <DefaultDiscount
                fullTimeDiscount={fullTimeDiscount}
                partTimeDiscount={partTimeDiscount}
              />
            </DetailedList.Item>
          </DetailedList.Row>
        </DetailedList>
      </Typography>
    </Container>
  )
}

export default AccountOverview
