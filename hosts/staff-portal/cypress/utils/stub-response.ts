const stubResponse = (result: object): Promise<Response> =>
  Promise.resolve({
    json() {
      return Promise.resolve(result)
    },
    text() {
      return Promise.resolve(JSON.stringify(result))
    },
    ok: true
  } as Response)

export default stubResponse
