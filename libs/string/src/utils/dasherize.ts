const dasherize = (input: string, replacer = '-') => {
  return input.replace(/_/g, replacer)
}

export default dasherize
