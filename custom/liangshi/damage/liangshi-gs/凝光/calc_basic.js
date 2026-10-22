import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "凝光"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 40, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}单颗`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['普通攻击伤害'], 'a')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '星璇伤害',
  params: { ChargedUse: 1, ChargedHit: 3, ChargedDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['星璇伤害'], 'a2')
},
{
  title: `3星璇${TalentName.a2Name}`,
  params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let a2 = dmg(talent.a['重击伤害'], 'a2')
    let a3 = dmg(talent.a['星璇伤害'], 'a2')
    return {
      dmg: a3.dmg * 3 + a2.dmg,
      avg: a3.avg * 3 + a2.avg
    }
  }
},
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.qNameT}单颗宝石伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['宝石伤害'], 'q')
},
{
  title: `${TalentName.eNameT}后${TalentName.qNameT}完整伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['宝石伤害'], 'q')
    return {
      dmg: q1.dmg * 6 * 2,
      avg: q1.avg * 6 * 2
    }
  }
},
{
  check: ({ cons }) => cons >= 2,
  title: `${TalentName.qNameT}后${TalentName.a2Name}`,
  dmgKey: 'q',
  params: { BurstUse: 1, BurstHit: 6, BurstDmg: 6, ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4 },
  dmg: ({ talent }, dmg) => {
    let a2 = dmg(talent.a['重击伤害'], 'a2')
    let a3 = dmg(talent.a['星璇伤害'], 'a2')
    return {
      dmg: a3.dmg * 7 + a2.dmg,
      avg: a3.avg * 7 + a2.avg
    }
  }
}]