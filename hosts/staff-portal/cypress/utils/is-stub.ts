// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStub = (wrappedMethod: any) => {
  return Boolean(wrappedMethod?.restore?.sinon)
}

export default isStub
