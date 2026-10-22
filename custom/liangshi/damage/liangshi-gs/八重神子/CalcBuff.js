import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '八重神子天赋：[启蜇之祝词] 使杀生樱造成的伤害提升[eDmg]%',
  sort: 9,
  data: {
    eDmg: ({ attr, calc }) => calc(attr.mastery) * 0.15
  }
},
{
  title: '八重神子1命：[野狐供真篇] 大密法·天狐显真引发天狐霆雷，会恢复[_energyevery]点元素能量。',
  cons: 1,
  data: {
    _energyevery: 8
  }
},
{
  title: '八重神子2命：[望月吼哕声] 杀生樱创造时的位阶上限提升至肆阶，攻击范围提升60.0%。',
  cons: 2
},
{
  check: ({ params }) => params.SkillsHit > 0,
  title: '八重神子4命：[绯樱引雷章] 杀生樱的落雷命中敌人后，队伍中附近的所有角色获得[dmg]%元素伤害加成。',
  cons: 4,
  data: {
    dmg: 20
  }
},
{
  title: '八重神子6命：[大杀生咒禁] 杀生樱在攻击时无视敌人[eIgnore]%的防御力。',
  cons: 6,
  data: {
    eIgnore: 60
  }
}]