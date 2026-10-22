import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "阿蕾奇诺"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}`, ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 60, HealDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段伤害`,
  params: { NormalElement: 1, ChangeBondOfLife: 1 },
  dmgKey: 'a',
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段蒸发`,
  params: { NormalElement: 1, WaterAttachment: true, ChangeBondOfLife: 1 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  check: ({ cons }) => cons >= 2,
  title: '血偿勒令回收伤害',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, ChangeBondOfLife: 1 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 900 / 100, 'e')
},
{
  title: `${TalentName.eName}发动伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['尖刺伤害'], 'e')
},
{
  title: `${TalentName.eName}切斩伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['切斩伤害'], 'e')
},
{
  title: '血偿勒令伤害',
  params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['血偿勒令伤害'], 'e')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1, ChangeBondOfLife: 2 },
  dmgKey: 'q',
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}蒸发伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1, WaterAttachment: true, ChangeBondOfLife: 2 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.qName}治疗量`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1, ChangeBondOfLife: 2 },
  dmg: ({ params, cons, talent, attr, calc, weapon }, { heal }) => heal(150 / 100 * (Math.min((params.blPct * (Math.min(145, (65 + (cons >= 2 ? 65 : 0))) * 2 + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus), 200) / 100) * calc(attr.hp) + 150 / 100 * calc(attr.atk))
}]
