import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "班尼特"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 60, HealDetermine: true, HealTeamDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `点按${TalentName.eName}`,
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
},
{
  title: `一段${TalentName.eName}`,
  params: { SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['一段蓄力伤害'][0], 'e')
    let e2 = dmg(talent.e['一段蓄力伤害'][1], 'e')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: `二段${TalentName.eName}`,
  params: { SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['二段蓄力伤害'][0], 'e')
    let e2 = dmg(talent.e['二段蓄力伤害'][1], 'e')
    let e3 = dmg(talent.e['爆炸伤害'], 'e')
    return {
      dmg: e1.dmg + e2.dmg + e3.dmg,
      avg: e1.avg + e2.avg + e3.avg
    }
  }
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}融化`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, IceAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}每跳治疗`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 2 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['持续治疗2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗2'][1] * 1)
},
{
  title: `${TalentName.qName}攻击力提升`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 2 },
  dmgKey: 'f',
  dmg: ({ attr, talent, cons }) => {
    return {
      avg: attr.atk.base * (talent.q['攻击力加成比例'] + (cons >= 1 ? 20 : 0)) / 100
    }
  }
},
{
  title: `${TalentName.qNameT}后点按${TalentName.eName}`,
  params: { Inspiration_Field: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 2 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
}]
