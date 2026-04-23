import React from 'react'
import { Amount, TypographyOverflow } from '@toptal/picasso'
import { TaskCardLayoutContentItem } from '@staff-portal/tasks'
import { camelCase } from 'lodash-es'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { getMatcherRoleByType } from '@staff-portal/billing/src/_lib/helpers/client'
import ContactLink from '@staff-portal/billing/src/components/ContactLink'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { GetInvoiceTaskCardQuery } from '../data/getInvoiceTaskCard.graphql.types'

const getInvoiceDetailsContent = ({
  amount,
  subjectObject: {
    preferredBillingOption,
    claimer,
    fullName,
    webResource,
    matchers
  },
  dueDate
}: Exclude<
  GetInvoiceTaskCardQuery['node'],
  undefined | null
>): TaskCardLayoutContentItem[] => {
  const designerMatcher = getMatcherRoleByType({
    matchers: matchers?.nodes,
    talentType: 'designer'
  })
  const developerMatcher = getMatcherRoleByType({
    matchers: matchers?.nodes,
    talentType: 'developer'
  })
  const financeExpert = getMatcherRoleByType({
    matchers: matchers?.nodes,
    talentType: 'finance_expert'
  })
  const productManager = getMatcherRoleByType({
    matchers: matchers?.nodes,
    talentType: 'product_manager'
  })
  const projectManager = getMatcherRoleByType({
    matchers: matchers?.nodes,
    talentType: 'project_manager'
  })

  return [
    {
      key: 'invoiceFor',
      label: i18n.t('invoice:taskCard.details.invoiceFor'),
      value: (
        <LinkWrapper href={webResource?.url} target='_blank'>
          <TypographyOverflow color='inherit'>{fullName}</TypographyOverflow>
        </LinkWrapper>
      )
    },
    {
      key: 'totalAmount',
      label: i18n.t('invoice:taskCard.details.totalAmount'),
      value: <Amount amount={amount} />
    },
    {
      key: 'paymentMethod',
      label: i18n.t('invoice:taskCard.details.paymentMethod'),
      value: i18n.t(
        `paymentMethod:${camelCase(preferredBillingOption?.billingMethod)}`,
        EMPTY_DATA
      )
    },
    {
      key: 'dueDate',
      label: i18n.t('invoice:taskCard.details.dueDate'),
      value: dueDate ? formatDateMed(dueDate) : EMPTY_DATA
    },
    {
      key: 'developerMatcher',
      label: i18n.t('invoice:taskCard.details.developerMatcher'),
      value: (
        <ContactLink
          data-testid='developerMatcher'
          contact={developerMatcher}
        />
      )
    },
    {
      key: 'designerMatcher',
      label: i18n.t('invoice:taskCard.details.designerMatcher'),
      value: (
        <ContactLink data-testid='designerMatcher' contact={designerMatcher} />
      )
    },
    {
      key: 'financeExpert',
      label: i18n.t('invoice:taskCard.details.financeExpert'),
      value: <ContactLink data-testid='financeExpert' contact={financeExpert} />
    },
    {
      key: 'projectManager',
      label: i18n.t('invoice:taskCard.details.projectManager'),
      value: (
        <ContactLink data-testid='projectManager' contact={projectManager} />
      )
    },
    {
      key: 'productManager',
      label: i18n.t('invoice:taskCard.details.productManager'),
      value: (
        <ContactLink data-testid='productManager' contact={productManager} />
      )
    },
    {
      key: 'claimer',
      label: i18n.t('invoice:taskCard.details.claimer'),
      value: <ContactLink data-testid='claimer' contact={claimer} />
    }
  ]
}

export default getInvoiceDetailsContent
