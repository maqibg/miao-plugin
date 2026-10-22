import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "托马"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 80, ShieldDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  params: { ShieldTime: 0.1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}蒸发`,
  params: { WaterAttachment: true, ShieldTime: 0.1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.eName}融化`,
  params: { IceAttachment: true, ShieldTime: 0.1 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: `${TalentName.eNameT}基础护盾量`,
  params: { ShieldTime: 2 },
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量2'][1] * 1)
},
{
  title: `${TalentName.qName}每段伤害`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, ShieldTime: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['炽火崩破伤害'], 'q')
},
{
  title: `${TalentName.qName}每段蒸发`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, WaterAttachment: true, ShieldTime: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['炽火崩破伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.qName}每段融化`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, IceAttachment: true, ShieldTime: 4 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['炽火崩破伤害'], 'q', 'melt')
},
{
  title: '护盾量上限',
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, IceAttachment: true, ShieldTime: 4 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾吸收量上限2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量上限2'][1] * 1)
}]