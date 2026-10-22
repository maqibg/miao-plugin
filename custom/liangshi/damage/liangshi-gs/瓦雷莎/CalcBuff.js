import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '瓦雷莎天赋：[连势，三重腾跃！] 施放元素战技后，下落攻击坠地冲击造成的伤害提升[a3Plus]%',
  data: {
    a3Plus: ({ params, attr, calc }) => (params.Fiery_Passion == true ? 180 : 50) * calc(attr.atk) / 100
  }
},
{
  title: '瓦雷莎天赋：[英雄，二度归来！] 附近的角色触发「夜魂迸发」时，攻击力提升[atkPct]%',
  data: {
    atkPct: 35 * 2
  }
},
{
  title: '瓦雷莎1命：[终始不熄的热诚] 无论是否处于炽热激情状态，进行下落攻击坠地冲击造成的伤害都会提升',
  cons: 1,
  data: {
    a3Plus: ({ params, attr, calc }) => (params.Fiery_Passion == true ? 0 : 130) * calc(attr.atk) / 100
  }
},
{
  title: '瓦雷莎2命：[逾越天光的极限] 处于极限驱动状态下时，抗打断能力还会进一步提升，下落攻击的坠地冲击命中敌人时，会恢复[_energyevery]点元素能量',
  cons: 2,
  data: {
     _energyevery: 11.5
  }
},
{
  title: '瓦雷莎4命：[直面前路的勇气] 施放元素爆发时，本次元素爆发造成的伤害提升[qDmg]%。',
  cons: 4,
  data: {
    qDmg: ({ params }) => params.Fiery_Passion == true ? 100 : 0
  }
},
{
  title: '瓦雷莎6命：[正义英雄的凯旋] 进入极限驱动状态时，将恢复[_energyevery]点元素能量。下落攻击与元素爆发的暴击率提高[qCpct]%,暴击伤害提高[qCdmg]%',
  cons: 6,
  data: {
    _energyevery: 30,
    a3Cpct: 10,
    a3Cdmg: 100,
    qCpct: 10,
    qCdmg: 100
  }
}]
