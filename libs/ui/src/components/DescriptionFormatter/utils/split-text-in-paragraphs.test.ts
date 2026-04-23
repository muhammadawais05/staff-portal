import { splitTextInParagraphs } from './split-text-in-paragraphs'

describe('splitTextInParagraphs', () => {
  it('splits text', () => {
    const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla
sodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit. Nulla ero`

    expect(splitTextInParagraphs(input)).toStrictEqual([
      [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla',
        'sodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit. Nulla ero'
      ]
    ])
  })
})
