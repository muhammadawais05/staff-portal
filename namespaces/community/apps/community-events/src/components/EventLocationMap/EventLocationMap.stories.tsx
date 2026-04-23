import React from 'react'
import { StoryShell } from '@staff-portal/story-shell'
import { useJsApiLoader } from '@react-google-maps/api'

import Component from './EventLocationMap'

const { STORYBOOK_GOOGLE_MAPS_API_KEY = '' } = process.env

export default {
  title: 'Community/Events/Components/EventLocationMap',
  args: {
    zoom: 10,
    center: { lat: 52.001, lng: 18.5138 },
    containerStyle: { width: 600, height: 400 }
  }
}

const ComponentWrapper = (props: {
  zoom: number
  center: google.maps.LatLngLiteral
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'eventLocationMap',
    googleMapsApiKey: STORYBOOK_GOOGLE_MAPS_API_KEY
  })

  return isLoaded ? <Component {...props} /> : null
}

export const EventLocationMap = (props: {
  zoom: number
  center: google.maps.LatLngLiteral
}) => <StoryShell render={() => <ComponentWrapper {...props} />} />
