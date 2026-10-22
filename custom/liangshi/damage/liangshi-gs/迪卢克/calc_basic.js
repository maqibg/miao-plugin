import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "迪卢克"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
let e1Dmg = { avg: 0, dmg: 0 }
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 40 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}第一段伤害`,
  params: { SkillsAfter: 0, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
  dmg: ({ talent }, dmg) => {
    e1Dmg = dmg(talent.e['一段伤害'], 'e')
    return e1Dmg
  }
},
{
  title: `${TalentName.eName}第一段融化`,
  params: { SkillsAfter: 0, IceAttachment: true, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['一段伤害'], 'e', 'melt')
},
{
  title: `${TalentName.eName}完整伤害`,
  dmgKey: 'e',
  params: { SkillsAfter: 2, SkillsUse: 3, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg ) => {
    let e1 = e1Dmg
    let e2 = dmg(talent.e['二段伤害'], 'e')
    let e3 = dmg(talent.e['三段伤害'], 'e')
    return {
      dmg: e1.dmg + e2.dmg + e3.dmg,
      avg: e1.avg + e2.avg + e3.avg
    }
  }
},
{
  title: `${TalentName.qName}爆发伤害`,
  params: { Dawn: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
},
{
  title: `${TalentName.qName}爆发蒸发`,
  params: { Dawn: true, WaterAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.qName}爆发融化`,
  dmgKey: 'q',
  params: { Dawn: true, IceAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}每段伤害`,
  params: { Dawn: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段`,
  dmgKey: 'a',
  params: { Dawn: true, BurstUse: 1, BurstHit: 8, BurstDmg: 8, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}]
