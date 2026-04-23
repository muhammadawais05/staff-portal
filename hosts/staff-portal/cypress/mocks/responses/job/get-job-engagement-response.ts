import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  BillCycle,
  Engagement,
  EngagementRateMethodEnum,
  JobCommitment,
  WeekDay
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'

export const getJobEngagementResponse = (engagement?: Partial<Engagement>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Engagement'),
      billCycle: BillCycle.BI_WEEKLY,
      billDay: WeekDay.SATURDAY,
      commitment: JobCommitment.PART_TIME,
      canBeDiscounted: true,
      companyFullTimeRate: '0',
      companyHourlyRate: '0',
      companyPartTimeRate: '0',
      extraHoursEnabled: false,
      defaultFullTimeDiscount: '0',
      defaultMarkup: '0',
      defaultPartTimeDiscount: '0',
      defaultUpcharge: '0',
      discountMultiplier: '0.00',
      fullTimeDiscount: '0.0',
      markup: '0',
      partTimeDiscount: '0.0',
      rateMethod: EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES,
      rateOverrideReason: 'Toptal Project',
      talentFullTimeRate: '2000.0',
      talentHourlyRate: '50.0',
      talentPartTimeRate: '1000.0',
      talent: {
        id: encodeEntityId('123', 'Talent'),
        fullName: 'Dortha Hoeger',
        __typename: 'Talent'
      },
      job: {
        id: encodeEntityId('123', 'Job'),
        autoConsolidationEnabled: false,
        title: 'Senior  Developer (264984)',
        jobType: 'developer',
        client: {
          fullName: 'Mueller-Stokes WQ',
          contact: {
            fullName: 'Sima Barton',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1NjgyMzY',
            __typename: 'CompanyRepresentative'
          },
          enterprise: false,
          id: 'VjEtQ2xpZW50LTUzMTk4NA',
          netTerms: 10,
          purchaseOrders: {
            nodes: [],
            __typename: 'PurchaseOrderConnection'
          },
          __typename: 'Client'
        },
        __typename: 'Job'
      },
      semiMonthlyPaymentTalentAgreement: false,
      operations: {
        changeProductBillingFrequency: enabledOperationMock(),
        changeEngagementCommitment: enabledOperationMock(),
        __typename: 'EngagementOperations'
      },
      ...engagement,
      __typename: 'Engagement'
    }
  }
})
