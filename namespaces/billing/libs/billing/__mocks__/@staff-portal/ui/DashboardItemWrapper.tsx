import React from 'react'

const DashboardItemWrapper = props => (
  <div data-testid={props['data-testid'] || 'DashboardItemWrapper'}>
    <div data-testid='DashboardItemWrapper-actions'>{props.actions}</div>
    <div data-testid='DashboardItemWrapper-children'>{props.children}</div>
    <div data-testid='DashboardItemWrapper-gridSize'>{props.gridSize}</div>
    <div data-testid='DashboardItemWrapper-showTitleBorder'>
      {JSON.stringify(props.showTitleBorder)}
    </div>
    <div data-testid='DashboardItemWrapper-subtitle'>{props.subtitle}</div>
    <div data-testid='DashboardItemWrapper-title'>{props.title}</div>
  </div>
)

export default DashboardItemWrapper
