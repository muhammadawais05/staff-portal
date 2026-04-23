import { Container } from '@toptal/picasso'
import styled from 'styled-components'

export const skills = `
  flex-wrap: wrap
`

export const Wrapper = styled(Container).attrs(props => ({
  top: 'small',
  bottom: props.padded ? 'medium' : ''
}))`
  ${skills}
`
