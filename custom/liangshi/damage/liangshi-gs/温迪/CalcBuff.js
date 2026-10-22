import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '温迪天赋：[暴风之眼] 风神之诗效果结束后，会恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 15
  }
},
{
  title: '温迪2命：[眷恋的泠风] 高天之歌会使敌人的抗性降低[_kx]％被高天之歌击飞的敌人在落地前,抗性总计降低[kx]％',
  cons: 2,
  data: {
    _kx: 12,
    kx: 24,
    phyKx: 24
  }
},
{
  title: '温迪4命：[自由的凛风] 获取元素晶球或元素微粒后,获得[dmg]%元素伤害加成',
  cons: 4,
  data: {
    dmg: 25
  }
},
{
  title: '温迪6命：[抗争的暴风] 受风神之诗伤害的敌人,元素抗性降低[kx]％',
  check: ({ params }) => params.Winds_Grand_Ode === true,
  cons: 6,
  data: {
    kx: 20
  }
}]
