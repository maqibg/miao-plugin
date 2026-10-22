import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "罗莎莉亚"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.eName}伤害`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['技能伤害2'][0], 'e')
    let e2 = dmg(talent.e['技能伤害2'][1], 'e')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: `${TalentName.eName}融化`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, FireAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['技能伤害2'][0], 'e', 'melt')
    let e2 = dmg(talent.e['技能伤害2'][1], 'e', 'melt')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let q2 = dmg(talent.q['技能伤害2'][1], 'q')
    return {
      dmg: q1.dmg + q2.dmg,
      avg: q1.avg + q2.avg
    }
  }
},
{
  title: `${TalentName.qName}融化`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害2'][0], 'q', 'melt')
    let q2 = dmg(talent.q['技能伤害2'][1], 'q', 'melt')
    return {
      dmg: q1.dmg + q2.dmg,
      avg: q1.avg + q2.avg
    }
  }
},
{
  title: `${TalentName.qName}每跳伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰枪持续伤害'], 'q')
},
{
  title: `${TalentName.qName}每跳融化`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 4, BurstDmg: 4, FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰枪持续伤害'], 'q', 'melt')
}]