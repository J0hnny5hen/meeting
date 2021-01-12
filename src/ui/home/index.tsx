import React, { useState, useCallback, useMemo } from 'react'
import { assign, get, keys, isNil } from 'lodash'
import { observer } from 'mobx-react'

import { Button, Checkbox, Input, Triangle, Loading } from '@ui/components'
import { autoObserve } from '@tool'
import { LoginFieldKey, LoginFields } from '@declare'
import { i18n } from '@ui/shared-store'

import HomeStore from './store'
import validate from './validator'
import classNames from './index.styl'

const tooltipOverlay = (
  <ul className='triangle_list'>
    <li>房间已存在时，需要输入正确的密码</li>
    <li>房间不存在时，输入的密码将成为这个房间的密码</li>
    <li>房间可以不设置密码</li>
  </ul>
)

export const HomePage = observer(() => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { setFields, fields, logging, login } = autoObserve(HomeStore)

  const hasError = useMemo(() => keys(errors).some((key) => !isNil(errors[key])), [errors])

  const handleChange = useCallback((fieldName: LoginFieldKey, value: Pick<LoginFields, LoginFieldKey>) => {
    const fieldItem = { [fieldName]: value }
    setFields({ ...fields, ...fieldItem })
    setErrors((prev) => assign({ ...prev }, { [fieldName]: validate(fieldItem) }))
  }, [fields])

  const handleLogin = (evt: React.FormEvent) => { evt.preventDefault(); login() }

  const triangle = (
    <Triangle title={tooltipOverlay} placement='right'>
      <i className='home-notice' />
    </Triangle>
  )

  const loading = logging && <Loading />

  return (
    <div className='meeting-facade'>
      { loading }
      <div className='login'>
        <div className='login-content'>
          <div className='setting'>
            <span className='setting-icon' />
          </div>
          <div className='content-header'>
            <img className='meeting-logo' alt='agora meeting logo' />
            <span className='app-name'>Agora Meeting</span>
          </div>
          <form onSubmit={handleLogin} className='login-card'>
            <Input
              className='customize'
              label={i18n.t('meeting.session.roomName')}
              name={LoginFieldKey.ROOMID}
              value={fields[LoginFieldKey.ROOMID]}
              onChange={handleChange}
              errMsg={get(errors, LoginFieldKey.ROOMID)}
              required
            />
            <Input
              className='customize customize-password'
              label={i18n.t('meeting.session.password')}
              name={LoginFieldKey.PASSWORD}
              value={fields[LoginFieldKey.PASSWORD]}
              onChange={handleChange}
              InputProps={{ endAdornment: triangle }}
              errMsg={get(errors, LoginFieldKey.PASSWORD)}
            />
            <Input
              className='customize'
              label={i18n.t('meeting.session.userName')}
              name={LoginFieldKey.USERNAME}
              value={fields[LoginFieldKey.USERNAME]}
              onChange={handleChange}
              errMsg={get(errors, LoginFieldKey.USERNAME)}
              required
            />
            <Checkbox
              label={i18n.t('meeting.session.openMicro')}
              name={LoginFieldKey.ENABLEAUDIO}
              labelCls={classNames.opentrack__label}
              checked={fields[LoginFieldKey.ENABLEAUDIO]}
              onChange={handleChange}
            />
            <Checkbox
              label={i18n.t('meeting.session.openCamera')}
              labelCls='opentrack__label'
              name={LoginFieldKey.ENABLEVIDEO}
              checked={fields[LoginFieldKey.ENABLEVIDEO]}
              onChange={handleChange}
            />
            <Button type='submit' className='login-btn' disabled={hasError || logging} color='primary'>
              {i18n.t('meeting.session.join')}
            </Button>
          </form>
          <div className='login__footer'>本应用为测试产品，请勿商用。单次会议时长最长10分钟</div>
        </div>
      </div>
    </div>
  )
})
