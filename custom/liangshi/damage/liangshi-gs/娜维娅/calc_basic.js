import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "娜维娅"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 60, PrimordialDetermine: "ousia" }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { NormalElement: 1 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, NormalElement: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
},
{
  title: `0消耗${TalentName.eName}`,
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'], 'e')
},
{
  title: `3消耗${TalentName.eName}`,
  params: { CrystallizeNumber: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `4消耗${TalentName.eName}`,
  params: { CrystallizeNumber: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `5消耗${TalentName.eName}`,
  params: { CrystallizeNumber: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `6消耗${TalentName.eName}`,
  params: { CrystallizeNumber: 6 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '支援炮击伤害',
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['支援炮击伤害'], 'q')
}]
