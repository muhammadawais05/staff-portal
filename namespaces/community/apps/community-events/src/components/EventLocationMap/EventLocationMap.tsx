import React, {
  memo,
  useState,
  useCallback,
  ChangeEvent,
  CSSProperties
} from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Form, Input, NumberInput } from '@toptal/picasso'
import { useDebouncedCallback } from 'use-debounce'

import {
  coordsToString,
  stringToCoords,
  isPositionValid
} from '../../services/event-map-utils'

const DEFAULT_STYLE = {
  width: 600,
  height: 400
}

const DEFAULT_ZOOM = 12
const MAP_MAX_ZOOM = 22
const MAP_MIN_ZOOM = 1
const MAP_CENTER_CHANGED_DEBOUNCE = 200

interface Props {
  onCenterChanged?: (coords: google.maps.LatLngLiteral) => void
  onZoomChanged?: (zoom?: number) => void
  center: google.maps.LatLngLiteral
  zoom?: number
  containerStyle?: CSSProperties
}

const EventLocationMap = ({
  containerStyle = DEFAULT_STYLE,
  center,
  zoom = DEFAULT_ZOOM,
  onCenterChanged,
  onZoomChanged
}: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [inputZoom, setInputZoom] = useState(zoom)
  const [inputCenter, setInputCenter] = useState(coordsToString(center))
  const [markerPosition, setMarkerPosition] = useState(center)

  const onLoad = useCallback((newMap: google.maps.Map) => {
    setMap(newMap)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleZoomChanged = useCallback(() => {
    if (map) {
      const mapZoom = map.getZoom()

      onZoomChanged?.(mapZoom)
      setInputZoom(mapZoom as number)
    }
  }, [map, onZoomChanged])

  const handleInputZoomChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (map) {
        const value = Number(event.target.value)

        setInputZoom(value)
        map.setZoom(value)
      }
    },
    [map]
  )

  const handleInputCenterChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value = event.target.value ?? ''

      if (value) {
        setInputCenter(value)
      }
    },
    []
  )

  const handleInputCenterBlur = useCallback(() => {
    if (map && isPositionValid(inputCenter)) {
      const centerPosition = stringToCoords(inputCenter)

      map.setCenter(centerPosition)
      setMarkerPosition(centerPosition)
    }
  }, [map, inputCenter])

  const getCoords = useCallback(() => {
    const mapCoords = map?.getCenter()

    if (mapCoords) {
      return {
        lat: Number(mapCoords.lat().toFixed(5)),
        lng: Number(mapCoords.lng().toFixed(5))
      }
    }
  }, [map])

  const handleCenterChanged = useDebouncedCallback(() => {
    const coords = getCoords()

    if (coords) {
      onCenterChanged?.(coords)
      setMarkerPosition(coords)
      setInputCenter(coordsToString(coords))
    }
  }, MAP_CENTER_CHANGED_DEBOUNCE)

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onZoomChanged={handleZoomChanged}
        onCenterChanged={handleCenterChanged}
        center={center}
        zoom={zoom}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      <Form.Field>
        <Form.Label>Map geoposition</Form.Label>
        <Input
          name='center'
          value={inputCenter}
          onChange={handleInputCenterChange}
          onBlur={handleInputCenterBlur}
          data-testid='mapGeopositionField'
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Map zoom level</Form.Label>
        <NumberInput
          name='zoom'
          value={inputZoom}
          onChange={handleInputZoomChange}
          data-testid='mapZoomField'
          max={MAP_MAX_ZOOM}
          min={MAP_MIN_ZOOM}
        />
      </Form.Field>
    </>
  )
}

export default memo(EventLocationMap)
