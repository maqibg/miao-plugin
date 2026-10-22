import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "香菱"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 80, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}单口伤害`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷火伤害'], 'e')
},
{
  title: `${TalentName.eName}单口蒸发`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, WaterAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['喷火伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.qNameT}一段挥舞伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['一段挥舞伤害'], 'q')
},
{
  title: `${TalentName.qNameT}二段挥舞伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['二段挥舞伤害'], 'q')
},
{
  title: `${TalentName.qNameT}三段挥舞伤害`,
  params: { EnergyDetermine: 0, Pyronado: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['三段挥舞伤害'], 'q')
},
{
  title: `${TalentName.qName}单次伤害`,
  params: { BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.q['旋火轮伤害'], 'q')
},
{
  title: `${TalentName.qName}单次蒸发`,
  params: { BurstUse: 1, BurstHit: 6, BurstDmg: 6, WaterAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['旋火轮伤害'], 'q', 'vaporize')
 }]