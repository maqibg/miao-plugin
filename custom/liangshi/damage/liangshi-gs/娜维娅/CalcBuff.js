import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '娜维娅技能：[典仪式晶火] 消耗[_count]枚弹片将使本次射击造成的伤害额外提升[eDmg]%',
  data: {
    _count: ({ params }) => Math.min((params.CrystallizeNumber || 0), 6),
    eDmg: ({ params }) => Math.max((Math.min((params.CrystallizeNumber || 0), 6) - 3), 0) * 15
  }
},
{
  title: '娜维娅天赋：[不明流通渠道] 施放典仪式晶火后娜维娅的普通攻击、重击与下落攻击造成的伤害提升[aDmg]%',
  data: {
    aDmg: 40,
    a2Dmg: 40,
    a3Dmg: 40
  }
},
{
  title: '娜维娅天赋：[互助关系网] 队伍中存在[buff]位火雷冰水元素角色,攻击力提升[atkPct]%',
  data: {
    buff: ({ params }) => (params.ElementIceTeam || 0) + (params.ElementWaterTeam || 0) + (params.ElementFireTeam || 0) + (params.ElementMineTeam || 0),
    atkPct: ({ params }) => Math.min((((params.ElementIceTeam || 0) + (params.ElementWaterTeam || 0) + (params.ElementFireTeam || 0) + (params.ElementMineTeam || 0)) * 20), 40)
  }
},
{
  title: '娜维娅1命：[淑女的距离感守则] 施放典仪式晶火时为娜维娅恢复[_energyevery]点元素能量,并使如霰澄天的鸣礼的冷却时间减少[_qcdPlus]秒',
  cons: 1,
  data: {
    _energyevery: 6,
    _qcdPlus: 3
  }
},
{
  title: '娜维娅2命：[总指挥的乘胜追击] 施放典仪式晶火时消耗「裂晶弹片」使本次典仪式晶火的暴击率提升[eCpct]%',
  cons: 2,
  data: {
    eCpct: ({ params }) => Math.min(36, Math.max(Math.min((params.CrystallizeNumber || 0), 6), 0) * 12)
  }
},
{
  title: '娜维娅4命：[铭誓者的绝不姑息] 如霰澄天的鸣礼命中敌人时，将使该敌人的元素抗性降低[kx]%',
  cons: 4,
  data: {
    kx: 20
  }
},
{
  title: '娜维娅6命：[刺玫会长的灵活手腕] 施放典仪式晶火时，消耗[_count]枚弹片,使本次典仪式晶火的暴击伤害提升[eCdmg]%',
  cons: 6,
  data: {
    _count: ({ params }) => Math.min((params.CrystallizeNumber || 0), 6),
    eCdmg :  ({ params }) => Math.min(135, Math.max((Math.min((params.CrystallizeNumber || 0), 6) - 3), 0) * 45)
  }
}]
