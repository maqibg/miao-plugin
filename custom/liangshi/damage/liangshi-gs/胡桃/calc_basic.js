import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "胡桃"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { OwnHp: 30, HealDetermine: true, FontaineTeammate: 1, ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { Paramita_Papilio: true, NormalElement: 1 },
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Paramita_Papilio: true, NormalElement: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段蒸发`,
  params: { ElementWaterTeam: true, Paramita_Papilio: true, NormalElement: 1 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}蒸发`,
  params: { ElementWaterTeam: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Paramita_Papilio: true, NormalElement: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg ) => dmg(talent.e['血梅香伤害'], 'e')
},
{
  title: `高血量${TalentName.eNameT}后${TalentName.qNameT}`,
  params: { OwnHp: 75.76, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 4, Paramita_Papilio: true },
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.eNameT}后${TalentName.qNameT}`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 4, Paramita_Papilio: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q')
},
{
  title: `${TalentName.qName}治疗`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 4, Paramita_Papilio: true },
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.hp) * talent.q['低血量时技能治疗量'] / 100)
}]
