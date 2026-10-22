import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "珊瑚宫心海"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWaterTeam: 1, EnergyTeammate: 70, HealDetermine: true, TruceChangeHp: true, HealTeamDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['波纹伤害'], 'e')
},
{
  title: `${TalentName.eName}每跳治疗`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, Ceremonial_Garment: false, OwnHp: 25 },
  dmgKey: 'h',
  dmg: ({ attr, talent, calc, cons }, { heal }) => heal(calc(attr.hp) / 100 * talent.e['治疗量2'][0] + talent.e['治疗量2'][1] * 1 + calc(attr.hp) * 4.5 * (cons * 1 >= 2 ? 1 : 0) / 100)
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},
{
  title: `${TalentName.qName}蒸发`,
  params: { FireAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}治疗`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 5 },
  dmg: ({ attr, talent, calc, cons }, { heal }) => heal(calc(attr.hp) / 100 * talent.q['命中治疗量2'][0] + talent.q['命中治疗量2'][1] * 1 + calc(attr.hp) * 0.6 * (cons * 1 >= 2 ? 1 : 0) / 100)
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmgKey: 'e',
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['波纹伤害'], 'e')
},
{
  title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后${TalentName.a2Name}蒸发`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}]
