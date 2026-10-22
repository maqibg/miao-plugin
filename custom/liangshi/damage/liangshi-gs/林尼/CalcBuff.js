import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '林尼技能：[眩惑光戏法] [buffCount]层「隐具余数」提升眩惑光戏法造成的伤害[ePlus]点',
  data: {
    buffCount: ({ params }) => params.Prop_Surplus || 0,
    ePlus: ({ talent, calc, attr, params }) => talent.e['技能伤害加成'] * calc(attr.atk) * Math.min((params.Prop_Surplus || 0), 5) / 100
  }
},
{
  title: '林尼天赋：[惊险演出] 发射隐具魔术箭消耗了生命值，命中敌人时会回复[_energyevery]点元素能量，并提高[a2Plus]点伤害',
  data: {
    _energyevery: 3,
    a2Plus: ({ calc, attr }) => calc(attr.atk) * 80 / 100
  }
},
{
  check: ({ params }) => [params.IceAttachment, params.WaterAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment),
  title: '林尼天赋：[完场喝彩] 对处于元素影响下的敌人造成的伤害提升[dmg]%',
  data: {
    dmg: ({ params }) => Math.min(60 + (params.ElementFireTeam || 0) * 20 , 100)
  }
},
{
  title: '林尼2命：[巧言贴耳的诱引] [buff]层「集意专注」,使暴击伤害提升[cdmg]%',
  cons: 2,
  data: {
    buff: ({ params }) => Math.min(((params.FightTime || 6) / 2), 3),
    cdmg: ({ params }) => Math.min(((params.FightTime || 6) / 2 * 20), 60)
  }
},
{
  title: '林尼4命：[熟稔习练的筹谋] 元素类型为火元素的重击攻击命中敌人后，该敌人的元素抗性降低[kx]%',
  cons: 4,
  data: {
    kx: 20
  }
},
{
  title: '林尼6命：[违心的笑] 发射隐具魔术箭时，将发射一枚礼花术弹·重奏，造成火元素伤害',
  cons: 6
}]
