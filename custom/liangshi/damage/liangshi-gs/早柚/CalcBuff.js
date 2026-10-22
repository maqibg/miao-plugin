import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Kick === true,
  title: '早柚2命：[理清逃跑路线] 施放风风轮舞踢造成的伤害提高[eDmg]%',
  cons: 2,
  data: {
    eDmg: ({ params }) => Math.min(((params.SkillsAfter || 0) * 2 * 3.3 + 3.3), 66)
  }
},
{
  title: '早柚4命：[偷懒的新方法] 在场上触发扩散反应时，将恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 1.2
  }
},
{
  title: '早柚6命：[呼呼大睡时间] 通过呜呼流·影貉缭乱召唤的不倒貉貉的攻击伤害提升[qPlus],治疗量提升[_heal]',
  sort: 9,
  cons: 6,
  data: {
    qPlus: ({ attr, calc }) => Math.min(calc(attr.atk) * calc(attr.mastery) * 0.2 / 100, calc(attr.atk) * 400 / 100),
    _heal: ({ attr, calc }) => Math.min(calc(attr.mastery) * 3, 6000)
  }
}]