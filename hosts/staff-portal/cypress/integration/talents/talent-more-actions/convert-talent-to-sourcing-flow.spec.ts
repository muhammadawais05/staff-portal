import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { updateConvertToSourcingFlowStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { ConvertToSourcingFlowModal } from '~integration/modules/pages/talents/talent-profile-tab/components'
import {
  ENTER_KEY,
  ARROW_DOWN_KEY,
  DEBOUNCED_AUTOCOMPLETE
} from '~integration/utils'

describe('Talent Profile > More Actions > Convert to Sourcing Flow', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new ConvertToSourcingFlowModal()

  it('converts the talent to sourcing flow', () => {
    updateConvertToSourcingFlowStubs({
      cityDescription: 'Ahmedabad, Gujarat',
      countryName: 'India',
      citizenship: {
        id: encodeEntityId('123', 'Country'),
        name: 'India',
        __typename: 'Country'
      },
      locationV2: {
        placeId: 'some-id',
        cityName: 'Ahmedabad',
        countryName: 'India',
        __typename: 'Location'
      }
    } as unknown as Talent)

    cy.clock()
    page.visit()

    const cityName = 'Brasov'
    const placeId = 'ChIJ8RSiKoZbs0ARDx45VO_y9Ww'

    const predictions = [
      {
        description: `${cityName}, Romania`,
        place_id: placeId
      },
      {
        description: 'Bucharest, Romania',
        place_id: 'ChIJT608vzr5sUARKKacfOMyBqw'
      }
    ] as google.maps.places.QueryAutocompletePrediction[]
    const status = 'OK'

    cy.window().then(win => {
      win.google = {
        maps: {
          places: {
            PlacesServiceStatus: {
              OK: status
            },
            AutocompleteService: class {
              getPlacePredictions = (
                _: unknown,
                resolve: (
                  predictions: google.maps.places.QueryAutocompletePrediction[],
                  status: string
                ) => void
              ) => resolve(predictions, status)
            }
          }
        } as typeof google.maps
      }
    })

    cy.intercept(
      'https://maps.googleapis.com/maps/api/place/js/AutocompletionService*',
      request => {
        // eslint-disable-next-line no-restricted-globals
        const searchParams = new URLSearchParams(request.url)
        const callbackParam = searchParams.get('callback')

        const output = `${callbackParam} && ${callbackParam}(${JSON.stringify({
          predictions,
          status
        })})`

        request.reply(output)
      }
    )

    page.generalSection.currentCountry.should('have.text', 'India')
    page.generalSection.currentCity.should('have.text', 'Ahmedabad, Gujarat')
    page.generalSection.citizenship.should('have.text', 'India')

    page.moreActionsButton.click()

    actions.convertToSourcingFlow.click()

    modal.countryField
      .click()
      .trigger('keydown', { keyCode: ARROW_DOWN_KEY })
      .trigger('keydown', { keyCode: ENTER_KEY })

    modal.cityField.type('b').tick(DEBOUNCED_AUTOCOMPLETE)
    modal.cityField.trigger('keydown', { keyCode: ENTER_KEY })

    modal.citizenshipField
      .click()
      .trigger('keydown', { keyCode: ARROW_DOWN_KEY })
      .trigger('keydown', { keyCode: ENTER_KEY })
    modal.applicantSkillsField.click().type('a').tick(DEBOUNCED_AUTOCOMPLETE)
    modal.applicantSkillsField.trigger('keydown', { keyCode: ENTER_KEY })
    modal.englishProficiencyField
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    updateConvertToSourcingFlowStubs({
      cityDescription: cityName,
      countryName: 'Romania',
      citizenship: {
        id: encodeEntityId('124', 'Country'),
        name: 'Romania',
        __typename: 'Country'
      },
      locationV2: {
        placeId,
        cityName,
        countryName: 'Romania',
        __typename: 'Location'
      }
    } as unknown as Talent)

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The talent profile was successfully converted to the sourcing flow.'
    )

    page.generalSection.currentCountry.should('have.text', 'Romania')
    page.generalSection.currentCity.should('have.text', cityName)
    page.generalSection.citizenship.should('have.text', 'Romania')
  })
})
