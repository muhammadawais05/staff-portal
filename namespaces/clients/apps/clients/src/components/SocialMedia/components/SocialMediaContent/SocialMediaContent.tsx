import React from 'react'
import { Container, Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'

import SocialMediaItem from '../../../SocialMedia/components/SocialMediaItem'
import { adjustInputValues } from '../../../SocialMedia/utils/adjust-input-values'
import { ClientSocialMediaFragment } from '../../../SocialMedia/data'
import { CompanyExternalSourceType } from '../../../CompanyExternalSourceInfo'
import CompanyExternalSourceInfoLink, {
  getCompanyExternalSourceCrunchbaseTooltip,
  getCompanyExternalSourceFacebookTooltip,
  getCompanyExternalSourceLinkedInTooltip,
  getCompanyExternalSourceTwitterTooltip,
  getCompanyExternalSourceZoomUrlTooltip
} from '../../../CompanyExternalSourceInfoLink'
import {
  getClientSocialMediaHook,
  useSocialMediaMutation
} from '../../../SocialMedia/utils'

interface Props {
  companyDetails: ClientSocialMediaFragment
}

const SocialMediaContent = ({ companyDetails: company }: Props) => {
  const {
    id: companyId,
    twitterLink,
    linkedinLink,
    facebookLink,
    crunchbaseLink,
    zoominfoProfileUrl,
    buyingSignalsService,
    clientopedia,
    operations: {
      patchClientProfile: patchClientProfileOperation = undefined
    } = {}
  } = company

  const values = adjustInputValues(company)
  const { handleChange } = useSocialMediaMutation(companyId, values)
  const operationDisabled = !isOperationEnabled(patchClientProfileOperation)

  const zoominfoProfileUrlWebresource = {
    url: zoominfoProfileUrl || clientopedia?.zoominfoUrl?.url,
    text: 'Go to zoominfo'
  }

  const initialValues = { clientId: companyId }

  return (
    <Section title='Social Media' variant='withHeaderBar'>
      <DetailedList labelColumnWidth={9}>
        <DetailedList.Row>
          <DetailedList.Item label='Twitter'>
            <SocialMediaItem
              queryValue={getClientSocialMediaHook(companyId, 'twitter')}
              initialValues={initialValues}
              handleOnChange={handleChange}
              name='twitter'
              webResource={twitterLink}
              disabled={operationDisabled}
              value={values.twitter}
              icon={
                <Container top={0.2}>
                  {getCompanyExternalSourceTwitterTooltip(company)}
                </Container>
              }
            >
              <CompanyExternalSourceInfoLink
                value={buyingSignalsService?.twitter?.text}
                url={buyingSignalsService?.twitter?.url}
                userValue={twitterLink?.text}
                type={CompanyExternalSourceType.BSS}
              />
            </SocialMediaItem>
          </DetailedList.Item>
          <DetailedList.Item label='Linkedin'>
            <SocialMediaItem
              queryValue={getClientSocialMediaHook(companyId, 'linkedin')}
              initialValues={initialValues}
              handleOnChange={handleChange}
              name='linkedin'
              webResource={linkedinLink}
              value={values.linkedin}
              disabled={operationDisabled}
              icon={
                <Container top={0.2}>
                  {getCompanyExternalSourceLinkedInTooltip(company)}
                </Container>
              }
            >
              <CompanyExternalSourceInfoLink
                value={buyingSignalsService?.linkedin?.text}
                url={buyingSignalsService?.linkedin?.url}
                userValue={values.linkedin}
                type={CompanyExternalSourceType.BSS}
              />
              <CompanyExternalSourceInfoLink
                value={clientopedia?.linkedinUrl?.text}
                url={clientopedia?.linkedinUrl?.url}
                userValue={values.linkedin}
                type={CompanyExternalSourceType.CLIENTOPEDIA}
              />
            </SocialMediaItem>
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Facebook'>
            <SocialMediaItem
              queryValue={getClientSocialMediaHook(companyId, 'facebook')}
              initialValues={initialValues}
              handleOnChange={handleChange}
              name='facebook'
              webResource={facebookLink}
              value={values.facebook}
              disabled={operationDisabled}
              icon={
                <Container top={0.2}>
                  {getCompanyExternalSourceFacebookTooltip(company)}
                </Container>
              }
            >
              <CompanyExternalSourceInfoLink
                value={buyingSignalsService?.facebook?.text}
                url={buyingSignalsService?.facebook?.url}
                userValue={facebookLink?.text}
                type={CompanyExternalSourceType.BSS}
              />
            </SocialMediaItem>
          </DetailedList.Item>

          <DetailedList.Item label='CrunchBase'>
            <SocialMediaItem
              queryValue={getClientSocialMediaHook(companyId, 'crunchbase')}
              initialValues={initialValues}
              handleOnChange={handleChange}
              name='crunchbase'
              webResource={crunchbaseLink}
              value={values.crunchbase}
              disabled={operationDisabled}
              icon={
                <Container top={0.2}>
                  {getCompanyExternalSourceCrunchbaseTooltip(company)}
                </Container>
              }
            >
              <CompanyExternalSourceInfoLink
                value={buyingSignalsService?.crunchbase?.text}
                url={buyingSignalsService?.crunchbase?.url}
                userValue={values.crunchbase}
                type={CompanyExternalSourceType.BSS}
              />
            </SocialMediaItem>
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Zoominfo Profile'>
            <SocialMediaItem
              queryValue={getClientSocialMediaHook(
                companyId,
                'zoominfoProfile'
              )}
              initialValues={initialValues}
              handleOnChange={handleChange}
              name='zoominfoProfile'
              webResource={zoominfoProfileUrlWebresource}
              value={zoominfoProfileUrlWebresource?.url ?? ''}
              disabled={operationDisabled}
              icon={
                <Container top={0.2}>
                  {getCompanyExternalSourceZoomUrlTooltip(company)}
                </Container>
              }
            >
              {zoominfoProfileUrlWebresource.url !==
                clientopedia?.zoominfoUrl?.url && (
                <CompanyExternalSourceInfoLink
                  value={clientopedia?.zoominfoUrl?.text}
                  url={clientopedia?.zoominfoUrl?.url}
                  type={CompanyExternalSourceType.CLIENTOPEDIA}
                />
              )}
            </SocialMediaItem>
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    </Section>
  )
}

export default SocialMediaContent
