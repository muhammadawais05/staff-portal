export const safelyStartGuides = () => {
  if (!window.pendo || !('isReady' in pendo) || !pendo.isReady()) {
    return
  }

  pendo.startGuides()
}
