import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "那维莱特"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = {}
export const buffs = CalcBuff
export const details = [
{
  title: `零层${TalentName.a2Name}单段`,
  params: { Past_Draconic_Glories: 0, ChangeHp: 3, HealNumber: 3 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100 * (cons >= 1 ? 1.1 : 1), 'a2')
},
{
  title: `一层${TalentName.a2Name}单段`,
  dmgKey: 'undefined',
  params: { Past_Draconic_Glories: 1, ChangeHp: 3, HealNumber: 3 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * (cons >= 1 ? 1.25 : 1.1), 'a2')
},
{
  title: `二层${TalentName.a2Name}单段`,
  params: { Past_Draconic_Glories: 2, ChangeHp: 3, HealNumber: 3 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * (cons >= 1 ? 1.6 : 1.25), 'a2')
},
{
  title: `三层${TalentName.a2Name}单段`,
  params: { Past_Draconic_Glories: 3, ChangeHp: 3, HealNumber: 3 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * (cons >= 1 ? 1.6 : 1.25), 'a2')
},
{
  title: `${TalentName.a2Name}蓄力 3秒`,
  params: ({ cons }) => ({ Past_Draconic_Glories: cons >= 1 ? 3 : 2, ChangeHp: 3 }),
  dmgKey: 'z',
  dmg: ({ talent, calc, attr, cons, params }, { basic }) => {
    let tf1 = (1/40) * Math.pow(Math.min((params.Past_Draconic_Glories + (cons >= 1 ? 1 : 0)), 3), 3)
    let tf2 = (1/20) * Math.pow(Math.min((params.Past_Draconic_Glories + (cons >= 1 ? 1 : 0)), 3), 2)
    let tf3 = (1/8) * Math.min((params.Past_Draconic_Glories + (cons >= 1 ? 1 : 0)), 3)
    let z1 = basic((1+ tf1 - tf2 + tf3) * calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100, 'a2')
    return {
      avg: z1.avg * 8,
      dmg: z1.dmg * 8
    }
  }
},
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},
{
  title: `${TalentName.qName}水爆伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['水瀑伤害'] / 100, 'q')
},
{
  title: `${TalentName.qName}总伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let q1 = basic(talent.q['技能伤害'] * calc(attr.hp) / 100, 'q')
    let q2 = basic(talent.q['水瀑伤害'] * calc(attr.hp) / 100, 'q')
    return {
      avg: q1.avg + q2.avg * 2,
      dmg: q1.dmg + q2.dmg * 2
    }
  }
}]