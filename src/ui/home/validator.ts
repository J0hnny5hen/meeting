import { has, always, cond, pipe, prop, propSatisfies, lt, gt, __, either, allPass } from 'ramda'
import { LoginFieldKey as FieldKey } from '@declare'

const genCondition = <T extends FieldKey>(key: T, floor: number, cap: number, errmsg: string) => [
  allPass([
    has(key),
    propSatisfies(
      pipe(prop('length') as () => number, either(lt(__, floor), gt(__, cap))),
      key,
    ),
  ]),
  always(errmsg),
]

const validate = cond([
  genCondition(FieldKey.ROOMID, 3, 50, '房间名不得小于3个字符，也不能超过50个字符'),
  genCondition(FieldKey.PASSWORD, 0, 50, '房间密码不能超过50个字符'),
  genCondition(FieldKey.USERNAME, 3, 20, '用户名不得小于3个字符，也不能超过20个字符'),
])

export default validate
