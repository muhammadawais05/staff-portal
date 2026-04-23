import { TaskCardLayoutContentItem } from '@staff-portal/tasks'
import { TypographyOverflow } from '@toptal/picasso'
import { camelCase } from 'lodash-es'
import React from 'react'
import * as paymentHelpers from '@staff-portal/billing/src/_lib/helpers/payment'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import ContactLink from '@staff-portal/billing/src/components/ContactLink'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import i18n from '@staff-portal/billing/src/utils/i18n'

import {
  GetPaymentTaskCardQuery,
  GetPaymentTaskCardSubjectObjectStaffFragment,
  GetPaymentTaskCardSubjectObjectTalentFragment
} from '../data/getPaymentTaskCard.graphql.types'

type Staff = GetPaymentTaskCardSubjectObjectStaffFragment
type Talent = GetPaymentTaskCardSubjectObjectTalentFragment

const getPaymentDetailsContent = ({
  createdOn,
  subjectObject,
  paymentGroup,
  dueDate,
  paymentMethod,
  paymentKind,
  client,
  job
}: Exclude<
  GetPaymentTaskCardQuery['node'],
  undefined | null
>): TaskCardLayoutContentItem[] => {
  const companyLink = client?.webResource
  const jobLink = job?.webResource
  const paymentOnHold = (subjectObject as Talent)?.activePaymentHold

  return [
    {
      key: 'paymentFor',
      label: i18n.t('payment:taskCard.details.paymentFor'),
      value: (subjectObject as Staff)?.fullName ? (
        <ContactLink
          contact={subjectObject as Staff}
          data-testid='paymentFor'
        />
      ) : (
        EMPTY_DATA
      )
    },
    {
      key: 'companyLink',
      label: i18n.t('payment:taskCard.details.companyLink'),
      value: companyLink ? (
        <LinkWrapper
          href={companyLink?.url}
          target='_blank'
          data-testid='companyLink-link'
        >
          <TypographyOverflow color='inherit'>
            {companyLink.text}
          </TypographyOverflow>
        </LinkWrapper>
      ) : (
        EMPTY_DATA
      )
    },
    {
      key: 'jobLink',
      label: i18n.t('payment:taskCard.details.jobLink'),
      value: jobLink ? (
        <LinkWrapper
          href={jobLink?.url}
          target='_blank'
          data-testid='companyLink-link'
        >
          <TypographyOverflow color='inherit'>
            {jobLink.text}
          </TypographyOverflow>
        </LinkWrapper>
      ) : (
        EMPTY_DATA
      )
    },
    {
      key: 'type',
      label: i18n.t('payment:taskCard.details.type'),
      value: i18n.t(`payment:kind.${camelCase(paymentKind)}`)
    },
    {
      key: 'paymentMethod',
      label: i18n.t('payment:taskCard.details.paymentMethod'),
      value: i18n.t(
        `paymentMethod:${camelCase(paymentMethod || undefined)}`,
        EMPTY_DATA
      )
    },
    {
      key: 'paymentGroupLink',
      label: i18n.t('payment:taskCard.details.paymentGroupLink'),
      value: paymentGroup ? (
        <LinkWrapper
          href={paymentGroup?.webResource?.url}
          target='_blank'
          data-testid='companyLink-link'
        >
          <TypographyOverflow color='inherit'>
            {paymentGroup.number}
          </TypographyOverflow>
        </LinkWrapper>
      ) : (
        EMPTY_DATA
      )
    },
    {
      key: 'createdOn',
      label: i18n.t('payment:taskCard.details.createdOn'),
      value: createdOn ? formatDateMed(createdOn) : EMPTY_DATA
    },
    {
      key: 'duePeriod',
      label: i18n.t('payment:taskCard.details.duePeriod'),
      value: dueDate ? formatDateMed(dueDate) : EMPTY_DATA
    },
    {
      key: 'paymentOnHold',
      label: i18n.t('payment:taskCard.details.paymentOnHold'),
      value: paymentOnHold
        ? paymentHelpers.getPaymentOnHold(paymentOnHold)
        : EMPTY_DATA
    }
  ]
}

export default getPaymentDetailsContent
