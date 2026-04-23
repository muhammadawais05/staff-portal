// todo: include to default mocking, not used at the moment
const createGetRoleLensTokenMock = () => ({
  communicationTrackingToken: `${btoa('{"alg":"ES256"}')}.${btoa(
    '{"exp": 1597214562}'
  )}.abc123`
})

export default createGetRoleLensTokenMock
