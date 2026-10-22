import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "魈"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWindTeam: 1, EnergyTeammate: 80, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `满层${TalentName.eName}`,
  params: { SkillsUse: 4, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.qName}首${TalentName.a3NameT}`,
  params: { BurstAfter: 1, BurstUse: 1, Yakshas_Mask: true, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${TalentName.qName}首${TalentName.a2NameT}`,
  params: { BurstAfter: 1, BurstUse: 1, Yakshas_Mask: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.qName}尾${TalentName.a3NameT}`,
  params: { BurstAfter: 12, BurstUse: 1, Yakshas_Mask: true, PlungingUse: 8, PlungingHit: 8, PlungingDmg: 8 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${TalentName.qName}尾${TalentName.a2NameT}`,
  params: { BurstAfter: 12, BurstUse: 1, Yakshas_Mask: true, ChargedUse: 8, ChargedHit: 8, ChargedDmg: 8 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.qName}尾六段${TalentName.aNameT}`,
  params: { BurstAfter: 12, BurstUse: 1, Yakshas_Mask: true, NormalUse: 18, NormalHit: 24, NormalDmg: 24 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后满层${TalentName.eNameT}`,
  params: { SkillsUse: 4, SkillsHit: 4, SkillsDmg: 4, BurstAfter: 12, BurstUse: 1, Yakshas_Mask: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}]