import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "行秋"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWaterTeam: 1, EnergyTeammate: 80, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
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
  check: ({ cons }) => cons >= 4,
  title: `${TalentName.qNameT}${TalentName.aNameT}后${TalentName.eName}伤害`,
  params: { Rainbow_Bladework: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
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
  title: `${TalentName.eName}蒸发`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, FireAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['技能伤害2'][0], 'e', 'vaporize')
    let e2 = dmg(talent.e['技能伤害2'][1], 'e', 'vaporize')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: `${TalentName.qNameT}${TalentName.aNameT}后${TalentName.eName}蒸发`,
  check: ({ cons }) => cons >= 4,
  params: { Rainbow_Bladework: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, FireAttachment: true },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['技能伤害2'][0], 'e', 'vaporize')
    let e2 = dmg(talent.e['技能伤害2'][1], 'e', 'vaporize')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { Rainbow_Bladework: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['剑雨伤害'], 'q')
},
{
  title: `${TalentName.qName}单段蒸发`,
  params: { Rainbow_Bladework: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { Rainbow_Bladework: true, BurstUse: 1, BurstHit: 60, BurstDmg: 60 },
  dmg: ({ talent, cons }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    return {
      dmg: q.dmg * (cons < 6 ? (cons < 2 ? 37 : 42) : 55),
      avg: q.avg * (cons < 6 ? (cons < 2 ? 37 : 42) : 55)
    }
  }
},
{
  title: `${TalentName.qName}完整蒸发`,
  params: { Rainbow_Bladework: true, BurstUse: 1, BurstHit: 60, BurstDmg: 60, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent, cons }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let qz = dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
    return {
      dmg: (cons < 6 ? (cons < 2 ? 25 : 28) : 37) * q.dmg + (cons < 6 ? (cons < 2 ? 12 : 14) : 18) * qz.dmg,
      avg: (cons < 6 ? (cons < 2 ? 25 : 28) : 37) * q.avg + (cons < 6 ? (cons < 2 ? 12 : 14) : 18) * qz.avg
    }
  }
}]