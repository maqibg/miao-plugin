import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "卡维"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 80, HealDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段`,
  params: { Painted_Dome: true, NormalUse: 1, NormalHit: 1, NormalDmg: 1, NormalElement: 1 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.tName}治疗量`,
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4 },
  dmg: ({ attr, calc }, { heal }) => heal(calc(attr.mastery) * 300 / 100)
},
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}激化`,
  params: { GrassAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  title: '草原核迸发',
  dmg: ({}, { reaction }) => reaction('bloom')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'spread')
},
{
  title: `${TalentName.qNameT}后草原核伤害`,
  params: { Painted_Dome: true, NormalUse: 4, NormalHit: 4, NormalDmg: 4, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('bloom')
},
{
  check: ({ cons }) => cons >= 6,
  title: '天园之光伤害',
  params: { Painted_Dome: true, NormalUse: 4, NormalHit: 4, NormalDmg: 4, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 61.8 / 100, 'q')
}]
