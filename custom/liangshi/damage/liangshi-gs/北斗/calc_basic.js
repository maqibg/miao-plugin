import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "北斗"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { LiyueTeammate: 1, ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 80, ShieldDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}基础伤害`,
  params: { ShieldTime: 0.3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'], 'e')
},
{
  title: `2层${TalentName.eName}伤害`,
  params: { ShieldTime: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'] + talent.e['受击时伤害提升'] * 2, 'e')
},
{
  title: `2层${TalentName.eName}激化`,
  params: { GrassAttachment: true, ShieldTime: 2 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'] + talent.e['受击时伤害提升'] * 2, 'e', 'aggravate')
},
{
  title: `${TalentName.eName}护盾吸收量`,
  params: { ShieldTime: 2 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量2'][1] * 1)
},
{
  title: `${TalentName.qName}释放伤害`,
  params: ({ cons }) => ({ Stormbreaker: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: cons >= 1 ? 0.5 : 0 }),
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '闪雷伤害',
  params: ({ cons }) => ({ Stormbreaker: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4, NormalUse: 4, NormalHit: 4, NormalDmg: 4, ShieldTime: cons >= 1 ? 6 : 0 }),
  dmg: ({ talent }, dmg) => dmg(talent.q['闪雷伤害'], 'q')
},
{
  title: '闪雷激化',
  dmgKey: 'q',
  params: ({ cons }) => ({ Stormbreaker: true, GrassAttachment: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4, NormalUse: 4, NormalHit: 4, NormalDmg: 4, ShieldTime: cons >= 1 ? 6 : 0 }),
  dmg: ({ talent }, dmg) => dmg(talent.q['闪雷伤害'], 'q', 'aggravate')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后2层${TalentName.eName}`,
  params: { Stormbreaker: true, ShieldTime: 2, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'] + talent.e['受击时伤害提升'] * 2, 'e')
}]
