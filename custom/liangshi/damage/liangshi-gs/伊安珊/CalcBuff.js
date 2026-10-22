import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '伊安珊天赋：[强化抗阻练习] 「雷霆飞缒」命中敌人后，攻击力提升[atkPct]%',
  data: {
     atkPct: 20
  }
},
{
  title: '伊安珊1命：[万事从来开头难] 战斗中处于夜魂加持状态下时，消耗6点夜魂值恢复[_energyevery]点元素能量',
  cons: 1,
   data: {
    _energyevery: 15
   }
},
{
  title: '伊安珊6命：[「沃陆之邦」的训教] 夜魂值恢复量溢出，使造成的伤害提升[dmg]%',
  cons: 6,
  data: {
    dmg: 25
  }
}]
