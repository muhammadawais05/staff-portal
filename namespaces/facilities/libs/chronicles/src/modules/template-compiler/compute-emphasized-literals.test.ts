import computeEmphasizedLiterals from './compute-emphasized-literals'

describe('computeEmphasizedLiterals', () => {
  describe('when passing empty array', () => {
    it('returns empty array', () => {
      expect(computeEmphasizedLiterals([])).toStrictEqual([])
    })
  })

  describe('when passing string literal', () => {
    it('returns typography with semibold weight', () => {
      expect(computeEmphasizedLiterals(['text'])).toStrictEqual([
        {
          kind: 'typography',
          text: 'text',
          color: undefined,
          weight: 'semibold'
        }
      ])
    })
  })

  describe('when passing link literal', () => {
    it('returns link literal', () => {
      expect(
        computeEmphasizedLiterals([
          { kind: 'link', href: 'https://toptal.com', text: 'text' }
        ])
      ).toStrictEqual([
        {
          kind: 'link',
          href: 'https://toptal.com',
          text: 'text'
        }
      ])
    })
  })

  describe('when passing typography literal', () => {
    it('returns typography with semibold weight', () => {
      expect(
        computeEmphasizedLiterals([
          { kind: 'typography', text: 'text', color: 'green' }
        ])
      ).toStrictEqual([
        {
          kind: 'typography',
          text: 'text',
          color: 'green',
          weight: 'semibold'
        }
      ])
    })
  })
})
