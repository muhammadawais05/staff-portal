import React from 'react'

const Typography = props => (
  <div data-testid={props['data-testid'] || 'SkeletonLoader.Typography'} />
)

const Button = props => (
  <div data-testid={props['data-testid'] || 'SkeletonLoader.Button'} />
)

const Header = props => (
  <div data-testid={props['data-testid'] || 'SkeletonLoader.Header'} />
)

export default {
  Typography,
  Header,
  Button
}
