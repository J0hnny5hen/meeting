import React from 'react'
import { has, always, cond, pipe, prop, propSatisfies, lt, gt, __, either, allPass } from 'ramda'
import { Button, Checkbox, Input, Form, useForm } from '@ui/components'

import { i18n } from '@ui/shared-store'
import './index.styl'

// const tooltipOverlay = (
//   <ul>
//     <li>房间已存在时，需要输入正确的密码</li>
//     <li>房间不存在时，输入的密码将成为这个房间的密码</li>
//     <li>房间可以不设置密码</li>
//   </ul>
// )
enum FieldKeys {
  USERNAME= 'userName',
  ROOMNAME = 'roomName',
  PASSWORD = 'password'
}
const initialFields = { [FieldKeys.USERNAME]: '', [FieldKeys.ROOMNAME]: '', [FieldKeys.PASSWORD]: '' }

const VALIDATE_ONCHANGE = true
const validate = cond([
  [
    allPass([
      has(FieldKeys.ROOMNAME),
      propSatisfies(
        pipe<number, boolean>(prop('length') as () => number, either(lt(__, 3), gt(__, 50))),
        FieldKeys.ROOMNAME,
      ),
    ]),
    always({ [FieldKeys.ROOMNAME]: '房间名不得小于3个字符，也不能超过50个字符' }),
  ],
  [
    allPass([
      has(FieldKeys.PASSWORD),
      propSatisfies(
        pipe<number, boolean>(prop('length') as () => number, gt(__, 50)),
        FieldKeys.PASSWORD,
      ),
    ]),
    always({ [FieldKeys.PASSWORD]: '房间密码不能超过50个字符' }),
  ],
  [
    allPass([
      has(FieldKeys.USERNAME),
      propSatisfies(
        pipe<number, boolean>(prop('length') as () => number, either(lt(__, 3), gt(__, 20))),
        FieldKeys.USERNAME,
      ),
    ]),
    always({ [FieldKeys.USERNAME]: '用户名不得小于3个字符，也不能超过20个字符' }),
  ],
])

export const HomePage = () => {
  const { fields, handleChange } = useForm(initialFields, VALIDATE_ONCHANGE, validate)
  const handleSubmit = (evt: React.FormEvent) => { evt.preventDefault() }
  return (
    <div className='meeting-facade'>
      <div className='login'>
        <div className='login-content'>
          <div className='setting'>
            <span className='setting-icon' />
          </div>
          <div className='content-header'>
            <img className='meeting-logo' alt='agora meeting logo' />
            <span className='app-name'>Agora Meeting</span>
          </div>
          <div className='login-card'>
            <Form onSubmit={handleSubmit}>
              <Input
                className='customize'
                label={i18n.t('meeting.session.roomName')}
                name={FieldKeys.ROOMNAME}
                value={fields[FieldKeys.ROOMNAME]}
                onChange={handleChange}
              />
              <Input
                className='customize customize-password'
                label={i18n.t('meeting.session.password')}
                name={FieldKeys.PASSWORD}
                value={fields[FieldKeys.PASSWORD]}
                onChange={handleChange}
              />
              <Input
                className='customize'
                label={i18n.t('meeting.session.userName')}
                name={FieldKeys.USERNAME}
                value={fields[FieldKeys.USERNAME]}
                onChange={handleChange}
              />
              <Checkbox label='打开摄像头' />
              <Checkbox label='打开麦克风' />
              <Button className='login-btn' type='submit'>加入</Button>
            </Form>
            <div className='home-notice-container'>
              <i className='home-notice' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
