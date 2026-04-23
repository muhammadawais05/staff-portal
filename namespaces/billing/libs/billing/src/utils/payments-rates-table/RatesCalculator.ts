/* eslint-disable max-lines */
import { camelCase, isUndefined } from 'lodash-es'
import {
  EngagementCommitmentEnum,
  EngagementRateMethodEnum
} from '@staff-portal/graphql/staff'

export type Source = 'talent' | 'company' | 'discount'

export type Commitment = 'hourly' | 'partTime' | 'fullTime'

export type RatesCalculatorValues = {
  talentHourlyRate?: string | null
  companyHourlyRate?: string | null
  talentPartTimeRate?: string | null
  companyPartTimeRate?: string | null
  talentFullTimeRate?: string | null
  companyFullTimeRate?: string | null
  partTimeDiscount?: string
  fullTimeDiscount?: string
  markup?: string
  canBeDiscounted?: boolean
  commitment?: EngagementCommitmentEnum
  defaultUpcharge?: string
  discountMultiplier?: string
}

export const DEFAULT_DISCOUNT_MULTIPLIER = '0.97'

const DEFAULT_UPCHARGE = 0
const PART_TIME_HOURS = 20
const FULL_TIME_HOURS = PART_TIME_HOURS * 2
const DEFAULT_EMPTY_RATE = '0.0'
const DEFAULT_COMMITMENT_TYPE = 'hourly'
const DEFAULT_FRACTIONAL_DISCOUNT = 0.2

const roundToTwoDecimals = (num: number) => Number(num.toFixed(2))

const fromHourly = (
  value: number,
  fullTimeDiscountCoefficient = 1.0,
  partTimeDiscountCoefficient = 1.0
) => ({
  fullTime: roundToTwoDecimals(
    value * FULL_TIME_HOURS * fullTimeDiscountCoefficient
  ),
  hourly: roundToTwoDecimals(value),
  partTime: roundToTwoDecimals(
    value * PART_TIME_HOURS * partTimeDiscountCoefficient
  )
})

const fromPartTime = (
  value: number,
  fullTimeDiscountCoefficient = 1.0,
  partTimeDiscountCoefficient = 1.0
) => {
  const roundedValue = roundToTwoDecimals(value)
  const hourly = roundToTwoDecimals(
    roundedValue / PART_TIME_HOURS / partTimeDiscountCoefficient
  )

  return {
    fullTime: roundToTwoDecimals(
      hourly * FULL_TIME_HOURS * fullTimeDiscountCoefficient
    ),
    hourly: hourly,
    partTime: roundedValue
  }
}

const fromFullTime = (
  value: number,
  fullTimeDiscountCoefficient = 1.0,
  partTimeDiscountCoefficient = 1.0
) => {
  const roundedValue = roundToTwoDecimals(value)
  const hourly = roundToTwoDecimals(
    roundedValue / FULL_TIME_HOURS / fullTimeDiscountCoefficient
  )

  return {
    fullTime: roundedValue,
    hourly: hourly,
    partTime: roundToTwoDecimals(
      hourly * PART_TIME_HOURS * partTimeDiscountCoefficient
    )
  }
}

const getStateFromInitialValues = (initialValues: RatesCalculatorValues) => {
  const {
    canBeDiscounted = false,
    commitment = EngagementCommitmentEnum.HOURLY,
    companyFullTimeRate = DEFAULT_EMPTY_RATE,
    companyHourlyRate = DEFAULT_EMPTY_RATE,
    companyPartTimeRate = DEFAULT_EMPTY_RATE,
    discountMultiplier = DEFAULT_DISCOUNT_MULTIPLIER,
    talentFullTimeRate = DEFAULT_EMPTY_RATE,
    talentHourlyRate = DEFAULT_EMPTY_RATE,
    talentPartTimeRate = DEFAULT_EMPTY_RATE,
    defaultUpcharge = DEFAULT_UPCHARGE,
    fullTimeDiscount,
    markup,
    partTimeDiscount
  } = initialValues

  return {
    calculatedRates: {
      company: {
        fullTime: Number(companyFullTimeRate),
        hourly: Number(companyHourlyRate),
        partTime: Number(companyPartTimeRate)
      },
      talent: {
        fullTime: Number(talentFullTimeRate),
        hourly: Number(talentHourlyRate),
        partTime: Number(talentPartTimeRate)
      },
      discount: {
        partTime: Number(partTimeDiscount ?? 0),
        hourly: 0, // not applicable
        fullTime: Number(fullTimeDiscount ?? 0)
      }
    },
    canBeDiscounted,
    commitmentType: camelCase(commitment),
    discountMultiplier: Number(discountMultiplier),
    defaultUpcharge,
    markup
  }
}

export default class RatesCalculator {
  state = {
    calculatedRates: {
      company: {
        fullTime: 0,
        hourly: 0,
        partTime: 0
      },
      talent: {
        fullTime: 0,
        hourly: 0,
        partTime: 0
      },
      discount: {
        fullTime: 0,
        hourly: 0,
        partTime: 0
      }
    },
    canBeDiscounted: false,
    commitmentType: DEFAULT_COMMITMENT_TYPE,
    // Discount is usually 20% for non-enterprise clients.
    defaultUpcharge: DEFAULT_UPCHARGE,
    // Discount multiplier is usually 0.97 and valid for US companies.
    discountMultiplier: Number(DEFAULT_DISCOUNT_MULTIPLIER),
    markup: 0,
    sourceType: 'talent'
  }

  initialize(
    initialValues: RatesCalculatorValues,
    rateMethod?: string | EngagementRateMethodEnum
  ) {
    const initialState = getStateFromInitialValues(initialValues)

    this.state = Object.assign({}, this.state, initialState)

    return this.updateAndSyncRates(
      rateMethod ? camelCase(rateMethod) : undefined
    )
  }

  // eslint-disable-next-line max-params
  recalculateRates(
    sourceType: Source,
    commitmentType: Commitment,
    value: number,
    rateMethod?: string
  ) {
    this.state.sourceType = sourceType // "talent" or "company" or "discount"
    this.state.commitmentType = commitmentType // "hourly", "partTime" or "fullTime"

    this.state.calculatedRates[sourceType][commitmentType] = value

    return this.updateAndSyncRates(rateMethod)
  }

  updateAndSyncRates(rateMethod?: string) {
    const { sourceType } = this.state

    const autoCalculationEnabled =
      camelCase(rateMethod) !== 'overrideUsingCustomValues'

    if (autoCalculationEnabled) {
      if (sourceType === 'talent') {
        this.updateFromTalent()
      } else if (sourceType === 'discount') {
        this.updateFromDiscount()
      } else {
        this.updateFromCompany()
      }
    }

    return this.state
  }

  updateFromDiscount() {
    const {
      calculatedRates: { company, discount },
      commitmentType
    } = this.state

    const companyHourlyRate = company.hourly

    if (commitmentType === 'partTime') {
      this.state.calculatedRates.company.partTime =
        companyHourlyRate * 20 * (1 - discount.partTime / 100)
    } else {
      this.state.calculatedRates.company.fullTime =
        companyHourlyRate * 40 * (1 - discount.fullTime / 100)
    }
  }

  updateFromTalent() {
    const {
      calculatedRates: { talent },
      commitmentType
    } = this.state

    switch (commitmentType) {
      case 'fullTime':
        this.state.calculatedRates.talent = fromFullTime(talent.fullTime)
        break
      case 'partTime':
        this.state.calculatedRates.talent = fromPartTime(talent.partTime)
        break
      default:
        this.state.calculatedRates.talent = fromHourly(talent.hourly)
    }

    this.state.calculatedRates.company = this.calculateCompanyRates()
  }

  updateFromCompany() {
    const {
      calculatedRates: { company, discount },
      commitmentType
    } = this.state

    const fullTimeDiscountCoefficient = this.calculateDiscountCoefficient(
      discount.fullTime
    )
    const partTimeDiscountCoefficient = this.calculateDiscountCoefficient(
      discount.partTime
    )

    switch (commitmentType) {
      case 'fullTime':
        this.state.calculatedRates.company = fromFullTime(
          company.fullTime,
          fullTimeDiscountCoefficient,
          partTimeDiscountCoefficient
        )
        break
      case 'partTime':
        this.state.calculatedRates.company = fromPartTime(
          company.partTime,
          fullTimeDiscountCoefficient,
          partTimeDiscountCoefficient
        )
        break
      default:
        this.state.calculatedRates.company = fromHourly(
          company.hourly,
          fullTimeDiscountCoefficient,
          partTimeDiscountCoefficient
        )
    }

    this.state.calculatedRates.talent = this.calculateTalentRates()
  }

  calculateCompanyRates() {
    const {
      calculatedRates: { discount }
    } = this.state

    const fullTimeDiscountCoefficient = this.calculateDiscountCoefficient(
      discount.fullTime
    )
    const partTimeDiscountCoefficient = this.calculateDiscountCoefficient(
      discount.partTime
    )
    const hourlyRate = this.calculateCompanyHourlyRate()

    return {
      fullTime: hourlyRate * FULL_TIME_HOURS * fullTimeDiscountCoefficient,
      hourly: hourlyRate,
      partTime: hourlyRate * PART_TIME_HOURS * partTimeDiscountCoefficient
    }
  }

  calculateCompanyHourlyRate() {
    const {
      defaultUpcharge,
      discountMultiplier,
      markup,
      calculatedRates: { talent }
    } = this.state

    const coefficient = this.calculateDiscountCoefficient(
      Number(defaultUpcharge)
    )
    const rateIncrement = Number(markup)

    const rate =
      talent.hourly > 0
        ? (talent.hourly + rateIncrement) / coefficient / discountMultiplier
        : 0

    return Math.ceil(rate)
  }

  calculateTalentHourlyRate() {
    const {
      defaultUpcharge,
      discountMultiplier,
      markup,
      calculatedRates: { company }
    } = this.state

    const coefficient = this.calculateDiscountCoefficient(
      Number(defaultUpcharge)
    )
    const rateIncrement = Number(markup)

    const rate =
      company.hourly > 0
        ? company.hourly * discountMultiplier * coefficient - rateIncrement
        : 0

    return Math.max(Math.floor(rate), 0)
  }

  calculateTalentRates() {
    const hourlyRate = this.calculateTalentHourlyRate()

    return {
      fullTime: hourlyRate * FULL_TIME_HOURS,
      hourly: hourlyRate,
      partTime: hourlyRate * PART_TIME_HOURS
    }
  }

  calculateDiscountCoefficient(discount?: number) {
    // check with isUndefined because discount can be 0
    const fractionalDiscount = !isUndefined(discount)
      ? discount / 100
      : DEFAULT_FRACTIONAL_DISCOUNT

    return 1.0 - fractionalDiscount
  }
}
