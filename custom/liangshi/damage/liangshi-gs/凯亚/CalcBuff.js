import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.FireAttachment != true && params.MineAttachment != true && params.WindAttachment != true,
  title: '凯亚1命：[卓越的血脉] 对受到元素影响的敌人，普通攻击与重击暴击率提升[aCpct]%',
  cons: 1,
  data: {
    aCpct: 15,
    a2Cpct: 15
  }
},
{
  title: '凯亚2命：[无尽的霜舞] 在凛冽轮舞的持续时间击败[buff]个敌人，其持续时间延长[_qSustainedPlus]秒',
  cons: 2,
  data: {
    buff: ({ params }) => (params.BurstKill || 1) + (params.Skillskill || 1) + (params.Plungingkill || 1) + (params.ChargedKill || 1) + (params.Normalkill || 1),
    _qSustainedPlus: ({ params }) => Math.min((((params.BurstKill || 1) + (params.Skillskill || 1) + (params.Plungingkill || 1) + (params.ChargedKill || 1) + (params.Normalkill || 1)) * 2.5), 7)
  }
},
{
  title: '凯亚6命：[轮旋的冰凌] 凛冽轮舞会产生一个额外的寒冰之棱，并在施放时返还[_energyevery]点元素能量',
  cons: 6,
  data: {
   _energyevery: 15
  }
}]
