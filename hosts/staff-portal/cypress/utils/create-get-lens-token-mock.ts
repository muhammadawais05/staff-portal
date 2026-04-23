const createGetLensTokenMock = () => ({
  globalCommunicationTracking: `${btoa('{"alg":"ES256"}')}.${btoa(
    '{"exp": 1597214562}'
  )}.abc123`
})

export default createGetLensTokenMock
