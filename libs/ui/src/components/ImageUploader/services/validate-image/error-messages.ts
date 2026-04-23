export const errorMessages = {
  noFile: `File not selected. Please try again.`,
  size: (sizeInMb: number) =>
    `Please select a photo that's smaller than ${sizeInMb} MB.`,
  resolution: (width: number, height: number) =>
    `Please select a photo that's larger than ${width} × ${height} pixels.`,
  type: (filetypes: string) => {
    let formats: string
    const arrayOfTypes = filetypes.split(' ')

    if (arrayOfTypes.length > 1) {
      const lastElement = arrayOfTypes[arrayOfTypes.length - 1]

      formats = arrayOfTypes.slice(0, -1).join(', ') + ` or ${lastElement}`
    } else {
      formats = arrayOfTypes.join(', ')
    }

    return `This file type isn't supported. Try using a ${formats}.`
  }
}
