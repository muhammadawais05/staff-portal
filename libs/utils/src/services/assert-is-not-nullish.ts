// eslint-disable-next-line func-style
function assertIsNotNullish<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(
      `Invariant failed: value should not be \`null\` or \`undefined\`, but received ${value}`
    )
  }
}

export default assertIsNotNullish
