export const getOnsiteTimeOptions = ({
  maxOnsiteTimePercentage
}: {
  maxOnsiteTimePercentage: number
}) => {
  const options = [{ text: '1 - 4 weeks', value: 0 }]

  for (let percent = 10; percent <= maxOnsiteTimePercentage; percent += 10) {
    options.push({ text: `${percent}%`, value: percent / 10 })
  }

  return options
}
