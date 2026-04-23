export const getClientIndustriesResponse = (industries: string[] = []) => ({
  data: {
    clientIndustries: ['Industry', ...industries]
  }
})
