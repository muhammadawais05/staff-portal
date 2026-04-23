import renderWithProviders from '../../__tests__/render-with-providers'
import { renderRecord as renderPerformedAction } from '../../compiler'
import { RANGE_TYPE_PAYLOAD_TEMPLATE, MODEL_DESCRIPTIONS } from './fixture'

describe('range payload type', () => {
  describe('with dates', () => {
    describe('when both dates exist', () => {
      it('should render range with keywords (from, till)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.DATE,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only start date exists', () => {
      it('should render only start value with keyword (from)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.DATE_START,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only stop date exists', () => {
      it('should render only stop value with keyword (till)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.DATE_STOP,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when start and stop date are equal', () => {
      it('should render only single value with keyword (on)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.DATE_EQUAL,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })
  })

  describe('with times', () => {
    describe('when both times exist', () => {
      it('should render range with keywords (from, till)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.TIME,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only start time exists', () => {
      it('should render only start value with keyword (from)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.TIME_START,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only stop time exists', () => {
      it('should render only stop value with keyword (till)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.TIME_STOP,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when start and stop time are equal', () => {
      it('should render only single value with keyword (at)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.TIME_EQUAL,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })
  })

  describe('with plain values', () => {
    describe('when both values exist', () => {
      it('should render range with keywords (from till)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.PLAIN,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only start value exists', () => {
      it('should render only start value with keyword (from)', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.PLAIN_START,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only stop value exists', () => {
      it('should render only stop value', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.PLAIN_STOP,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })

    describe('when only equal value exists', () => {
      it('should render only single value', () => {
        const result = renderPerformedAction(
          RANGE_TYPE_PAYLOAD_TEMPLATE.PLAIN_EQUAL,
          MODEL_DESCRIPTIONS
        )

        const { container } = renderWithProviders(result)

        expect(container).toMatchSnapshot()
      })
    })
  })
})
