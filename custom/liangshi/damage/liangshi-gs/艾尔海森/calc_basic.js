import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "艾尔海森"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { GrassAttachment: true, ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 70 }
export const buffs = CalcBuff
export const details = [
{
  title: `附魔${TalentName.aName}一段激化`,
  params: { NormalElement: 1 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'spread')
},
{
  title: `${TalentName.eName}突进伤害`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['突进攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['突进攻击伤害2'][1] * calc(attr.mastery) / 100, 'e')
},
{
  title: `${TalentName.eName}突进激化`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['突进攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['突进攻击伤害2'][1] * calc(attr.mastery) / 100, 'e', 'spread')
},
{
  title: '光幕单段伤害',
  params: { NormalElement: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['1枚光幕攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['1枚光幕攻击伤害2'][1] * calc(attr.mastery) / 100, 'e')
},
{
  title: '光幕单段激化',
  params: { NormalElement: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['1枚光幕攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['1枚光幕攻击伤害2'][1] * calc(attr.mastery) / 100, 'e', 'spread')
},
{
  title: `${TalentName.qName}激化-4段`,
  params: { BurstAfter: 0.3, EnergyDetermine: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmg: ({ talent, calc, attr }, { basic }) => {
    let q1 = basic(talent.q['单次伤害2'][0] * calc(attr.atk) / 100 + talent.q['单次伤害2'][1] * calc(attr.mastery) / 100, 'q')
    let q2 = basic(talent.q['单次伤害2'][0] * calc(attr.atk) / 100 + talent.q['单次伤害2'][1] * calc(attr.mastery) / 100, 'q', 'spread')
    return {
      dmg: q1.dmg * 2 + q2.dmg * 2,
      avg: q1.avg * 2 + q2.avg * 2
    }
  }
},
{
  title: `${TalentName.qName}-10段`,
  params: { BurstAfter: 0.3, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmg: ({ talent, calc, attr }, { basic }) => {
    let q1 = basic(talent.q['单次伤害2'][0] * calc(attr.atk) / 100 + talent.q['单次伤害2'][1] * calc(attr.mastery) / 100, 'q')
    return {
      dmg: q1.dmg * 10,
      avg: q1.avg * 10
    }
  }
},
{
  title: `${TalentName.qName}激化-10段`,
  params: { BurstAfter: 0.3, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => {
    let q1 = basic(talent.q['单次伤害2'][0] * calc(attr.atk) / 100 + talent.q['单次伤害2'][1] * calc(attr.mastery) / 100, 'q')
    let q2 = basic(talent.q['单次伤害2'][0] * calc(attr.atk) / 100 + talent.q['单次伤害2'][1] * calc(attr.mastery) / 100, 'q', 'spread')
    return {
      dmg: q1.dmg * 6 + q2.dmg * 4,
      avg: q1.avg * 6 + q2.avg * 4
    }
  }
}]
