import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "鹿野院平藏"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWindTeam: 1, EnergyTeammate: 40 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.a2Name}伤害`,
  dmgKey: 'z',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.eName}伤害`,
  params: { Declension: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `满层${TalentName.eName}伤害`,
  params: { Declension: 4, NormalUse: 6, NormalHit: 8, NormalDmg: 8 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg((talent.e['技能伤害'] + 4 * talent.e['变格伤害提升'] + talent.e['正论伤害提升']), 'e')
},
{
  title: '真空弹伤害',
  params: { Declension: 4, NormalUse: 6, NormalHit: 8, NormalDmg: 8 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['不动流·真空弹伤害'], 'q')
},
{
  title: '聚风真眼伤害',
  params: { Declension: 4, NormalUse: 6, NormalHit: 8, NormalDmg: 8 },
  dmg: ({ talent }, dmg) => dmg(talent.q['聚风真眼伤害'], 'q', 'scene')
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]
