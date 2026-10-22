import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '热情拂扫护盾：[属性 - 火] 对火元素伤害有[_pyroShieldInc]%的额外吸收效果。',
  data: {
    _pyroShieldInc: 150
  }
},
{
  title: '辛焱天赋：[这才是摇滚!] 处于热情拂扫的护盾保护下的角色造成的物理伤害提高[phy]%',
  data: {
    phy: 15
  }
},
{
  title: '辛焱1命：[绝命的加速] 造成暴击后普通攻击和重击的攻击速度提升[_aSpeed]% ',
  cons: 1,
  data: {
    _aSpeed: 12,
    _a2Speed: 12
  }
},
{
  check: ({ params }) => params.BurstProgress === true,
  title: '辛焱2命：[开场即兴段] 叛逆刮弦造成的物理伤害暴击率提升[qCpct]%',
  cons: 2,
  data: {
    qCpct: 100
  }
},
{
  title: '辛焱4命：[节奏的传染] 热情拂扫的伤害，会使敌人的物理抗性降低[kx]%',
  cons: 4,
  data: {
    phyKx: 15
  }
},
{
  check: ({ params }) => params.ChargedProgress === true,
  title: '辛焱6命：[地狱里摇摆] 重击的体力消耗降低[_a2Stamina]%且进行重击时获得[atkPlus]点攻击力加成',
  sort: 9,
  cons: 6,
  data: {
   _a2Stamina: 30,
   atkPlus: ({ attr, calc }) => calc(attr.def) * 0.5
  }
}]