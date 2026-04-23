import React, { useEffect } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { GoogleMap, Marker } from '@react-google-maps/api'

import EventLocationMap from './EventLocationMap'

jest.mock('@react-google-maps/api', () => ({
  ...jest.requireActual('@react-google-maps/api'),
  GoogleMap: jest.fn(),
  Marker: jest.fn()
}))

const GoogleMapMock = GoogleMap as jest.Mock
const MarkerMock = Marker as unknown as jest.Mock

const setupMap = (map: Record<string, () => void>) => {
  GoogleMapMock.mockImplementation(props => {
    useEffect(() => {
      props.onLoad(map)
    }, [])

    return <div data-testid='googleMap'>{props.children}</div>
  })
}

describe('EventLocationMap', () => {
  beforeEach(() => {
    GoogleMapMock.mockImplementation(props => (
      <div data-testid='googleMap'>{props.children}</div>
    ))
    MarkerMock.mockImplementation(() => <div data-testid='marker' />)
  })

  it('renders event location map with', () => {
    render(
      <TestWrapper>
        <EventLocationMap center={{ lat: -42, lng: -18 }} />
      </TestWrapper>
    )

    expect(GoogleMapMock).toHaveBeenCalledTimes(1)
    expect(GoogleMapMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mapContainerStyle: { width: 600, height: 400 },
        onLoad: expect.any(Function),
        onUnmount: expect.any(Function),
        onZoomChanged: expect.any(Function),
        onCenterChanged: expect.any(Function),
        center: { lat: -42, lng: -18 },
        zoom: 12
      }),
      {}
    )
    expect(MarkerMock).toHaveBeenCalledTimes(1)
    expect(MarkerMock).toHaveBeenCalledWith(
      {
        position: { lat: -42, lng: -18 }
      },
      {}
    )
    expect(screen.getByText('Map Geoposition')).toBeInTheDocument()
    expect(screen.getByText('Map Zoom Level')).toBeInTheDocument()
    expect(screen.getByTestId('mapGeopositionField')).toHaveValue('-42, -18')
    expect(screen.getByTestId('mapZoomField')).toHaveValue(12)
  })

  it('calls map "setZoom" method when changing zoom field', () => {
    const fakeMap = {
      setZoom: jest.fn(),
      getZoom: jest.fn(() => 10)
    }

    setupMap(fakeMap)

    const handleZoomChangedMock = jest.fn()

    render(
      <TestWrapper>
        <EventLocationMap
          center={{ lat: -42, lng: -18 }}
          onZoomChanged={handleZoomChangedMock}
        />
      </TestWrapper>
    )

    fireEvent.change(screen.getByTestId('mapZoomField'), {
      target: { value: 8 }
    })

    expect(fakeMap.setZoom).toHaveBeenCalledWith(8)
  })

  it('calls map "setCenter" method when changing geoposition field', () => {
    const fakeMap = {
      setCenter: jest.fn(),
      getCenter: jest.fn(() => ({
        lat: () => -42,
        lng: () => -17
      }))
    }

    setupMap(fakeMap)

    const handleCenterChangedMock = jest.fn()

    render(
      <TestWrapper>
        <EventLocationMap
          center={{ lat: -42, lng: -18 }}
          onCenterChanged={handleCenterChangedMock}
        />
      </TestWrapper>
    )

    fireEvent.change(screen.getByTestId('mapGeopositionField'), {
      target: { value: '52.8, -23.5' }
    })
    fireEvent.blur(screen.getByTestId('mapGeopositionField'))

    expect(fakeMap.setCenter).toHaveBeenCalledWith({ lat: 52.8, lng: -23.5 })
  })
})
