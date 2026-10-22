import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '琴天赋：[顺风而行] 普通攻击命中时，有50%的几率为队伍中所有角色恢复生命值'
},
{
  title: '琴天赋：[听凭风引] 使用蒲公英之风后，恢复[_energyeveryPct]%元素能量.',
  data: {
    _energyeveryPct: 20
  }
},
{
  title: '琴1命：[流转剑脊的暴风] 风压剑长按[buff]秒，造成的伤害提升[eDmg]%',
  cons: 1,
  data: {
    buff: ({ params }) => params.SkillsAfter || 0,
    eDmg: ({ params }) => (params.SkillsAfter || 0) >= 2 ? 40 : 0
  }
},
{
  title: '琴2命：[守护众人的坚盾] 获得元素晶球或元素微粒时，队伍中所有角色获得[_aSpeed]%攻击速度和[_jSpeed]%移动速度提升',
  cons: 2,
  data: {
    _aSpeed: 15,
    _jSpeed: 15
  }
},
{
  check: ({ params }) => params.Dandelion_Field === true,
  title: '琴4命：[蒲公英的国土] 在蒲公英之风的领域内，所有敌人的元素抗性下降[kx]%',
  cons: 4,
  data: {
    kx: 40
  }
},
{
  check: ({ params }) => params.Dandelion_Field === true,
  title: '琴6命：[恩眷万民的狮牙] 在蒲公英之风的领域内，角色受到的伤害降低[_reduction]%',
  cons: 6,
  data: {
    _reduction: 35
  }
}]