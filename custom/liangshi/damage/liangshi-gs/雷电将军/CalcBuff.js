import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '雷电将军技能：[神变·恶曜开眼] 获授雷罚恶曜之眼的角色在持续期间内元素爆发造成的伤害获得[qDmg]%提升',
  data: {
    qDmg: ({ talent }) => talent.e['元素爆发伤害提高'] * 90
  }
},
{
  title: '雷电将军技能：[奥义·梦想真说] 消耗[buffCount]层诸愿百眼之愿力,梦想一刀与梦想一心的攻击造成的伤害提高[qPct]%,抗打断能力提高[_interruption]%,并免疫感电反应的伤害。',
  data: {
    buffCount: ({ params }) => params.Resolve || 0,
    qPct: ({ talent, params }) => talent.q['愿力加成'][params.Musou_Isshin || 0] * (params.Resolve || 0),
    _interruption: 100
  }
},
{
  title: '雷电将军天赋：[殊胜之御体] 元素伤害加成提升[dmg]%,梦想一心状态提供的元素能量恢复提高[_recharge]%',
  sort: 4,
  data: {
    dmg: ({ attr }) => Math.max(attr.recharge.base + attr.recharge.plus - 100, 0) * 0.4,
    _recharge: ({ attr }) => Math.max(attr.recharge.base + attr.recharge.plus - 100, 0) * 0.6
  }
},
{
  title: '雷电将军2命：[斩铁断金] 奥义·梦想真说的梦想一刀与梦想一心状态期间的攻击将无视敌人[qIgnore]%的防御力。',
  cons: 2,
  data: {
    qIgnore: 60
  }
}]