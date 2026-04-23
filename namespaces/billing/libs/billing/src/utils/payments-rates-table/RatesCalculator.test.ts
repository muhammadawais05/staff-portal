import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import RatesCalculator, { RatesCalculatorValues } from './RatesCalculator'

const createCalculator = (initialValues: RatesCalculatorValues) => {
  const calculator = new RatesCalculator()

  calculator.initialize(initialValues)

  return calculator
}

describe('#RatesCalculator', () => {
  describe('when the company is US-based', () => {
    const initialValuesUS: RatesCalculatorValues = {
      canBeDiscounted: false,
      commitment: EngagementCommitmentEnum.HOURLY,
      defaultUpcharge: '20.0',
      discountMultiplier: '0.97',
      markup: '5',
      talentHourlyRate: '25.0',
      talentPartTimeRate: '500.0',
      talentFullTimeRate: '1000.0',
      companyHourlyRate: '39.0',
      companyPartTimeRate: '741.0',
      companyFullTimeRate: '1404.0',
      partTimeDiscount: '5.0',
      fullTimeDiscount: '10.0'
    }

    it('recalculates other rates but does not change discount when talent part-time rate changes', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        talent: {
          partTime: 1000, // used to calculate the remaining values
          hourly: 50,
          fullTime: 2000
        },
        company: {
          hourly: 71,
          partTime: 1349,
          fullTime: 2556
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'talent',
        'partTime',
        expectedValues.talent.partTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('recalculates other rates but does not change discount when company full-time rate changes', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        company: {
          fullTime: 3000, // used to calculate the remaining values
          hourly: 83.33,
          partTime: 1583.27
        },
        talent: {
          hourly: 59,
          partTime: 1180,
          fullTime: 2360
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'company',
        'fullTime',
        expectedValues.company.fullTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('recalculates other rates but does not change discount when company part-time rate change', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        company: {
          fullTime: 720,
          hourly: 20,
          partTime: 380 // used to calculate the remaining values
        },
        talent: {
          hourly: 10,
          partTime: 200,
          fullTime: 400
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'company',
        'partTime',
        expectedValues.company.partTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('recalculates other rates but discount does not change when company hourly rate changes', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        company: {
          fullTime: 5940,
          hourly: 165, // used to calculate the remaining values
          partTime: 3135
        },
        talent: {
          hourly: 123,
          partTime: 2460,
          fullTime: 4920
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'company',
        'hourly',
        expectedValues.company.hourly
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('does not update talent rate below zero when company rate changes', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        company: {
          fullTime: 36,
          hourly: 1, // used to calculate the remaining values
          partTime: 19
        },
        talent: {
          hourly: 0,
          partTime: 0,
          fullTime: 0
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'company',
        'hourly',
        expectedValues.company.hourly
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('updates company part time rate when part-time discount changes', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        discount: {
          partTime: 15, // used to calculate the remaining values
          hourly: 0,
          fullTime: 10
        },
        talent: {
          hourly: 25,
          partTime: 500,
          fullTime: 1000
        },
        company: {
          hourly: 39,
          partTime: 663,
          fullTime: 1404
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'discount',
        'partTime',
        expectedValues.discount.partTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('updates company full-time rate when discount full-time rate changes', () => {
      const calculator = createCalculator(initialValuesUS)
      const expectedValues = {
        discount: {
          fullTime: 30, // used to calculate the remaining values
          hourly: 0,
          partTime: 5
        },
        talent: {
          hourly: 25,
          partTime: 500,
          fullTime: 1000
        },
        company: {
          hourly: 39,
          partTime: 741,
          fullTime: 1092
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'discount',
        'fullTime',
        expectedValues.discount.fullTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })
  })

  describe('when the company is not US-based', () => {
    const initialValuesNotUS: RatesCalculatorValues = {
      canBeDiscounted: false,
      commitment: EngagementCommitmentEnum.HOURLY,
      defaultUpcharge: '20.0',
      discountMultiplier: '1',
      markup: '5',
      talentHourlyRate: '25.0',
      talentPartTimeRate: '500.0',
      talentFullTimeRate: '1000.0',
      companyHourlyRate: '38.0',
      companyPartTimeRate: '722.0',
      companyFullTimeRate: '1064.0',
      partTimeDiscount: '5.0',
      fullTimeDiscount: '10.0'
    }

    it('recalculates other rates and discount does not change when talent part-time rate changes', () => {
      const calculator = createCalculator(initialValuesNotUS)
      const expectedValues = {
        talent: {
          partTime: 1000, // used to calculate the remaining values
          hourly: 50,
          fullTime: 2000
        },
        company: {
          hourly: 69,
          partTime: 1311,
          fullTime: 2484
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'talent',
        'partTime',
        expectedValues.talent.partTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('recalculates other rates and discount does not change when company full-time rate changes', () => {
      const calculator = createCalculator(initialValuesNotUS)
      const expectedValues = {
        company: {
          fullTime: 3000, // used to calculate the remaining values
          hourly: 83.33,
          partTime: 1583.27
        },
        talent: {
          hourly: 61,
          partTime: 1220,
          fullTime: 2440
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'company',
        'fullTime',
        expectedValues.company.fullTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('updates company part time rate when part-time discount changes', () => {
      const calculator = createCalculator(initialValuesNotUS)
      const expectedValues = {
        discount: {
          partTime: 15, // used to calculate the remaining values
          hourly: 0,
          fullTime: 10
        },
        talent: {
          hourly: 25,
          partTime: 500,
          fullTime: 1000
        },
        company: {
          hourly: 38,
          partTime: 646,
          fullTime: 1368
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'discount',
        'partTime',
        expectedValues.discount.partTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })

    it('updates company full-time rate when discount full-time rate changes', () => {
      const calculator = createCalculator(initialValuesNotUS)
      const expectedValues = {
        discount: {
          fullTime: 30, // used to calculate the remaining values
          hourly: 0,
          partTime: 5
        },
        talent: {
          hourly: 25,
          partTime: 500,
          fullTime: 1000
        },
        company: {
          hourly: 38,
          partTime: 722,
          fullTime: 1064
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'discount',
        'fullTime',
        expectedValues.discount.fullTime
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })
  })

  const initialValues: RatesCalculatorValues = {
    canBeDiscounted: false,
    commitment: EngagementCommitmentEnum.HOURLY,
    defaultUpcharge: '20.0',
    discountMultiplier: '0.97',
    markup: '5',
    talentHourlyRate: '25.0',
    talentPartTimeRate: '500.0',
    talentFullTimeRate: '1000.0',
    companyHourlyRate: '39.0',
    companyPartTimeRate: '741.0',
    companyFullTimeRate: '1404.0',
    partTimeDiscount: '5.0',
    fullTimeDiscount: '10.0'
  }

  describe('when rateMethod is overrideUsingCustomValues', () => {
    it('changes only one value', () => {
      const calculator = createCalculator(initialValues)
      const expectedValues = {
        talent: {
          partTime: 500,
          hourly: 25,
          fullTime: 1050 // the only value changed
        },
        company: {
          hourly: 39,
          partTime: 741,
          fullTime: 1404
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'talent',
        'fullTime',
        expectedValues.talent.fullTime,
        'overrideUsingCustomValues'
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })
  })

  describe('when rateMethod is not overrideUsingCustomValues', () => {
    it('recalculates the values', () => {
      const calculator = createCalculator(initialValues)
      const expectedValues = {
        talent: {
          partTime: 1000, // used to calculate the remaining values
          hourly: 50,
          fullTime: 2000
        },
        company: {
          hourly: 71,
          partTime: 1349,
          fullTime: 2556
        },
        discount: {
          hourly: 0,
          partTime: 5,
          fullTime: 10
        }
      }

      const { calculatedRates } = calculator.recalculateRates(
        'talent',
        'partTime',
        expectedValues.talent.partTime,
        'DEFAULT'
      )
      const { company, talent, discount } = calculatedRates

      expect(talent).toEqual(expectedValues.talent)
      expect(company).toEqual(expectedValues.company)
      expect(discount).toEqual(expectedValues.discount)
    })
  })
})
