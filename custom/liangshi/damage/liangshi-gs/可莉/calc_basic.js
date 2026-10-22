import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "可莉"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `火花${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `火花${TalentName.a2Name}蒸发`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, WaterAttachment: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${TalentName.eName}弹跳伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['蹦蹦炸弹伤害'], 'e')
},
{
  title: `${TalentName.eName}弹跳蒸发`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, WaterAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['蹦蹦炸弹伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.eName}诡雷伤害`,
  params: { SkillsUse: 2, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['诡雷伤害'], 'e')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.q['轰轰火花伤害'], 'q')
},
{
  title: `${TalentName.qName}单段蒸发`,
  params: { BurstUse: 1, BurstHit: 6, BurstDmg: 6, WaterAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['轰轰火花伤害'], 'q', 'vaporize')
},
{
  check: ({ cons }) => cons >= 4,
  params: { BurstUse: 1, BurstHit: 12, BurstDmg: 12 },
  title: `${TalentName.c4Name}退场伤害`,
  dmg: ({ attr, talent, calc }, { basic }) =>  basic(calc(attr.atk) * 555 / 100)
}]