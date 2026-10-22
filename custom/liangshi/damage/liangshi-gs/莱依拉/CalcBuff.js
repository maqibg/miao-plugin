import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '安眠帷幕护盾：[属性 - 冰] 对冰元素伤害有[_cryoshieldInc]%的额外吸收效果。',
  data: {
    _cryoShieldInc: 150
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '莱依拉天赋：[如光骤现] 安眠帷幕护盾在存在期间，处于安眠帷幕护盾庇护下的角色，护盾强效提升[shield]%',
  data: {
    shield: 6 * 4
  }
},
{
  check: ({ params }) => params.Shooting_Star === true,
  title: '莱依拉天赋：[勿扰沉眠] 飞垂裳端凝之夜发射的飞星造成的伤害提高[ePlus]',
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 1.5 / 100
  }
},
{
  title: '莱依拉1命：[寐领围垣] 垂裳端凝之夜的安眠帷幕护盾的伤害吸收量提高[shieldInc]%',
  cons: 1,
  data: {
    shieldInc: 20
  }
},
{
  title: '莱依拉2命：[归芒携信] 垂裳端凝之夜发射的飞星命中敌人时，恢复[_energyevery]点能量',
  cons: 2,
  data: {
    _energyevery: 1
  }
},
{
  title: '莱依拉4命：[星示昭明] 垂裳端凝之夜开始发射一轮飞星时，将使附近的队伍中所有角色普通攻击与重击造成的伤害提升[aPlus]',
  cons: 4,
  sort: 9,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.hp) * 5 / 100,
    a2Plus: ({ attr, calc }) => calc(attr.hp) * 5 / 100
  }
},
{
  title: '莱依拉6命：[曜光灵炬] 垂裳端凝之夜的飞星造成的伤害提升[eDmg]%,星流摇床之梦的星光弹造成的伤害提升[qDmg]%,垂裳端凝之夜产生晚星的间隔时间减少[_qspeed]%',
  cons: 6,
  data: {
    eDmg: ({ params }) => params.Shooting_Star === true ? 40 : 0,
    qDmg: 40,
   _qspeed: 20
  }
}]