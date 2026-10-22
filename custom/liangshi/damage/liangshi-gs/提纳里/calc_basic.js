import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "提纳里"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 40 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['花筥箭伤害'], 'a2')
},
{
  title: '单支藏蕴花矢伤害',
  params: { ChargedUse: 1, ChargedHit: 3, ChargedDmg: 3 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['藏蕴花矢伤害'], 'a2')
},
{
  title: `${TalentName.a2Name}总伤害`,
  params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4 },
  dmg: ({ talent, cons }, dmg) => {
    let d1 = dmg(talent.a['花筥箭伤害'], 'a2')
    let d2 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let cons6 = cons >= 6 ? dmg(150, 'a2') : { dmg: 0, avg: 0 }
    return {
      dmg: d1.dmg + d2.dmg * 4 + cons6.dmg,
      avg: d1.avg + d2.avg * 4 + cons6.avg
    }
  }
},
{
  title: `${TalentName.a2Name}总激化`,
  params: { GrassAttachment: true, ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4 },
  dmgKey: 'z',
  dmg: ({ talent, cons }, dmg) => {
    let d1 = dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
    let d2 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let d3 = dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
    let cons6 = cons >= 6 ? dmg(150, 'a2', 'spread') : { dmg: 0, avg: 0 }
    return {
      dmg: d1.dmg + d2.dmg * 3 + d3.dmg + cons6.dmg,
      avg: d1.avg + d2.avg * 3 + d3.avg + cons6.avg
    }
  }
},
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}激化伤害`,
  params: { GrassAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { BurstProgress: true, ReactionDmg: 0, BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmg: ({ talent, cons }, dmg) => {
    let q1 = dmg(talent.q['缠藤箭伤害'], 'q')
    let q2 = dmg(talent.q['次级缠藤箭伤害'], 'q')
    return  {
      dmg: q1.dmg * 6 + q2.dmg * 6,
      avg: q1.avg * 6 + q2.avg * 6
    }
  }
},
{
  title: `${TalentName.qName}完整激化`,
  params: { GrassAttachment: true, BurstProgress: true, ReactionDmg: 4, BurstUse: 1, BurstHit: 6, BurstDmg: 6 },
  dmgKey: 'q',
  dmg: ({ talent, cons }, dmg) => {
    let q1 = dmg(talent.q['缠藤箭伤害'], 'q')
    let q2 = dmg(talent.q['缠藤箭伤害'], 'q', 'spread')
    let q3 = dmg(talent.q['次级缠藤箭伤害'], 'q')
    let q4 = dmg(talent.q['次级缠藤箭伤害'], 'q', 'spread')
    return  {
      dmg: q1.dmg * 4 + q2.dmg * 2 + q3.dmg * 4 + q4.dmg * 2,
      avg: q1.avg * 4 + q2.avg * 2 + q3.avg * 4 + q4.avg * 2
    }
  }
}]
