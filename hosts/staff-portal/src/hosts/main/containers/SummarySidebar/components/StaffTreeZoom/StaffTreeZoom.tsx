import React from 'react'
import {
  Button,
  Container,
  Plus16,
  Minus16,
  useTreeView
} from '@toptal/picasso'

const ZOOM_IN = 1
const ZOOM_OUT = 0
const ZOOM_STEP = 0.1

const StaffTreeZoom = () => {
  const { zoomHandler } = useTreeView()

  const handleZoom = (zoomBase: number) => zoomHandler(zoomBase + ZOOM_STEP)

  return (
    <Container>
      <Button size='small' onClick={() => handleZoom(ZOOM_OUT)}>
        <Minus16 />
      </Button>
      <Button size='small' onClick={() => handleZoom(ZOOM_IN)}>
        <Plus16 />
      </Button>
    </Container>
  )
}

export default StaffTreeZoom
