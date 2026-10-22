import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "安柏"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 40 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},
{
  title: `${TalentName.a2Name}蒸发`,
  params: { WaterAttachment: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'vaporize')
},
{
  title: `${TalentName.a2Name}融化`,
  params: { ElementIceTeam: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
},
{
  title: `${TalentName.eName}爆炸`,
  dmg: ({ talent }, dmg) => dmg(talent.e['爆炸伤害'], 'e')
},
{
  title: `${TalentName.eName}蒸发`,
  params: { WaterAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['爆炸伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.eName}融化`,
  params: { ElementIceTeam: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['爆炸伤害'], 'e', 'melt')
},
{
  check: ({ cons }) => cons >= 2,
  title: `引爆${TalentName.eName}蒸发`,
  params: { ChargedProgress: true, ChargedUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['爆炸伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { BurstUse: 1, BurstHit: 6, BurstDmg: 6, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['箭雨单次伤害'], 'q')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyDetermine: 0 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['箭雨单次伤害'], 'q')
    return {
      dmg: 18 * q1.dmg,
      avg: 18 * q1.avg
    }
  }
}]