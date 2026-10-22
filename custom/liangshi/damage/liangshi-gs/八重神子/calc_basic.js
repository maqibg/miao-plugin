import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "八重神子"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 90 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}单段伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.a2Name}单段激化`,
  params: { GrassAttachment: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'aggravate')
},
{
  title: `${TalentName.eName}满阶伤害`,
  params: { SkillsUse: 3, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent, attr, cons }, dmg) => dmg(cons >= 2 ? talent.e['杀生樱伤害·肆阶'] : talent.e['杀生樱伤害·叁阶'], 'e')
},
{
  title: `${TalentName.eName}满阶激化`,
  params: { GrassAttachment: true, SkillsUse: 3, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'e',
  dmg: ({ talent, attr, cons }, dmg) => dmg(cons >= 2 ? talent.e['杀生樱伤害·肆阶'] : talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 3, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 3, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  title: '天狐霆雷伤害',
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 3, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q')
},
{
  title: '天狐霆雷激化',
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 3, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
}]