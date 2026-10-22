import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "神里绫华"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 80, NormalElement: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.a2Name}总伤害`,
  params: { ChargedUse: 1, ChargedHit: 3, ChargedDmg: 3 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let zDmg = dmg(talent.a['重击伤害2'][0], 'a2')
    return {
      dmg: zDmg.dmg * 3,
      avg: zDmg.avg * 3
    }
  }
},
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}融化`,
  params: { FireAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { Frostflake_Seki: true, BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q')
},
{
  title: `${TalentName.qName}单段融化`,
  params: { Frostflake_Seki: true, FireAttachment: true, BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}尾段伤害`,
  params: { Frostflake_Seki: true, BurstUse: 1, BurstHit: 12, BurstDmg: 12 },
  dmg: ({ talent }, dmg) => dmg(talent.q['绽放伤害'], 'q')
},
{
  title: `${TalentName.qName}尾段融化`,
  params: { Frostflake_Seki: true, FireAttachment: true, BurstUse: 1, BurstHit: 12, BurstDmg: 12 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['绽放伤害'], 'q', 'melt')
}]
