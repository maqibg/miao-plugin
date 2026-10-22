import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "艾梅莉埃"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
let T1t1Dmg = { avg: 0, dmg: 0 }
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { BurningDetermine: true, ElementSame: 1, ElementGrassTeam: 1, FontaineTeammate: 1, PrimordialDetermine: true, FireAttachment: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}二段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}三段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}四段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.eName}释放伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}一阶伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
},
{
  title: `${TalentName.eName}一阶激化`,
  params: { BurningDetermine: false, GrassAttachment: true, FireAttachment: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e', 'spread')
},
{
  title: `${TalentName.eName}完整伤害`,
  dmg:  ({ talent }, dmg) => {
    let e1 = dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
    return {
      dmg: e1.dmg * 14,
      avg: e1.avg * 14
    }
  }
},
{
  title: `${TalentName.eName}二阶单枚伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·二阶攻击伤害2'][0], 'e')
},
{
  title: `${TalentName.eName}完整燃烧伤害`,
  dmg:  ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    return {
      dmg: e1.dmg * (cons >= 1 ? 1 : 2) + e2.dmg * (cons >= 1 ? 13 : 12) * 2 + e3.dmg * 2 * (cons >= 1 ? 2 : 1),
      avg: e1.avg * (cons >= 1 ? 1 : 2) + e2.avg * (cons >= 1 ? 13 : 12) * 2 + e3.avg * 2 * (cons >= 1 ? 2 : 1)
    }
  }
},
{
  title: '浸析伤害',
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 500 / 100, '')
},
{
  title: `${TalentName.eName}三阶伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
},
{
  title: `${TalentName.eName}三阶激化`,
  params: { BurningDetermine: false, GrassAttachment: true, FireAttachment: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q', 'spread')
},
{
  title: `${TalentName.qName}完整伤害`,
  dmgKey: 'q',
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let cons4 = cons >= 4 ? 12 : 4
    return {
      dmg: q1.dmg * cons4,
      avg: q1.avg * cons4
    }
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
  params: { BurstAfter: 3, NormalElement: 1, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '燃烧反应伤害',
  dmg: ({}, { reaction }) => reaction('burning')
},
{
  title: '单人站场14秒',
  params: { BurningDetermine: false, GrassAttachment: true, FireAttachment: false },
  dmg:  ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = (cons >= 6 ? (e2.dmg * 4 * 2 + e1.dmg) : (e1.dmg * 5)) + e3.dmg * (cons >= 6 ? 1 : 0)
    let eAvg = (cons >= 6 ? (e2.avg * 4 * 2 + e1.avg) : (e1.avg * 5)) + e3.avg * (cons >= 6 ? 1 : 0)
    let qDmg = q1.dmg * (cons >= 4 ? 12 : 4)
    let qAvg = q1.avg * (cons >= 4 ? 12 : 4)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场14秒激化',
  params: { BurningDetermine: false, GrassAttachment: true, FireAttachment: false },
  dmg:  ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a', 'spread')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a', 'spread')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e', 'spread')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e', 'spread')
    let e3 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e4 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e', 'spread')
    let e5 = basic(calc(attr.atk) * 500 / 100, '', 'spread')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let q2 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q', 'spread')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = (cons >= 6 ? (e2.dmg + e4.dmg * 2 + e3.dmg * 6) : (e1.dmg * 2 + e2.dmg * 3)) + e0.dmg + e5.dmg * (cons >= 6 ? 1 : 0)
    let eAvg = (cons >= 6 ? (e2.avg + e4.avg * 2 + e3.avg * 6) : (e1.avg * 2 + e2.avg * 3)) + e0.avg + e5.avg * (cons >= 6 ? 1 : 0)
    let qDmg = q1.dmg * (cons >= 4 ? 8 : 2) + q2.dmg * (cons >= 4 ? 4 : 2)
    let qAvg = q1.avg * (cons >= 4 ? 8 : 2) + q2.avg * (cons >= 4 ? 4 : 2)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场14秒燃烧',
  dmg:  ({ talent, calc, attr, cons }, { basic, reaction }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let rs = reaction('burning')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = e2.dmg * 5 * 2 + e3.dmg * (cons >= 1 ? (cons >= 6 ? 5 : 3) : 1)
    let eAvg = e2.avg * 5 * 2 + e3.avg * (cons >= 1 ? (cons >= 6 ? 5 : 3) : 1)
    let qDmg = q1.dmg * (cons >= 4 ? 12 : 4)
    let qAvg = q1.avg * (cons >= 4 ? 12 : 4)
    return {
      dmg: aDmg + eDmg + qDmg + rs.avg * 4 * 14,
      avg: aAvg + eAvg + qAvg + rs.avg * 4 * 14
    }
  }
}]







