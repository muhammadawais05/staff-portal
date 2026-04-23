import React from 'react'
import { useScreenersSetting } from '@staff-portal/talents-profile'
import { reloadPage } from '@staff-portal/navigation'
import { Menu, Switch, Typography } from '@toptal/picasso'

import * as S from './styles'

const ScreenersViewMenuItem = () => {
  const { screenersSetting, setScreenersSetting } = useScreenersSetting()

  const toggleScreenersSetting = () => {
    setScreenersSetting(!screenersSetting)
    reloadPage()
  }

  return (
    <Menu.Item key='screeners-view'>
      <Switch
        checked={screenersSetting}
        onChange={toggleScreenersSetting}
        name='screener-view'
        label={
          <Typography
            size='medium'
            color='black'
            data-testid='screener-view-label'
          >
            <span onClick={toggleScreenersSetting}>Screeners View</span>
          </Typography>
        }
        css={S.switchComponent}
        data-testid='screeners-view-switch'
      />
    </Menu.Item>
  )
}

export default ScreenersViewMenuItem
