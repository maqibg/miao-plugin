import { Format , LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "钟离"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ShieldTime: 12, CrystallizeNumber: 2, ShieldDetermine: true, SubjectedDmg: 0, ElementSame: 1, ElementRockTeam: 1, RockDmg: 3, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  dmgKey: 'undefined',
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}五段伤害`,
  dmgKey: 'a',
  params: { NormalUse: 5, NormalHit: 8, NormalDmg: 8 },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['五段伤害'] / 4 , 'a', 'phy')
    return {
      dmg: a1.dmg * 4,
      avg: a1.avg * 4
    }
  }
},
{
  title: `${TalentName.aName}六段伤害`,
  params: { NormalUse: 6, NormalHit: 9, NormalDmg: 9 },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  dmgKey: 'z',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: '下落期间伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][0], 'e')
},
{
  title: '共鸣伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
},
{
  title: `${TalentName.eName}柱子完整伤害`,
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    return {
      dmg: e1.dmg * 15,
      avg: e1.avg * 15
    }
  }
},
{
  title: `${TalentName.eName}长按伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
},
{
  title: `${TalentName.eName}护盾量`,
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾基础吸收量'] + calc(attr.hp) * talent.e['护盾附加吸收量'] / 100)
},
{
  title: `${TalentName.qName}伤害`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
 {
  title: '单人站场18秒',
  dmgKey: 'dph',
  params: { NormalUse: 12, NormalHit: 15, NormalDmg: 15 , BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'] / 4 , 'a', 'phy')
    let a6 = dmg(talent.a['六段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['岩脊伤害/共鸣伤害'][1] * 0.5, 'e')
    let e2 = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    let e3 = dmg(talent.e['长按伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let cons1 = cons * 1 >= 1 ? 1 : 0
    let aDmg = 4 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + 3 * a5.dmg) + 3 * a6.dmg
    let aAvg = 4 * (a1.avg + a2.avg + a3.avg + a4.avg + 3 * a5.avg) + 3 * a6.avg
    let eDmg = e2.dmg * 9 + e3.dmg + cons1 * (e2.dmg * 7 + e1.dmg)
    let eAvg = e2.avg * 9 + e3.avg + + cons1 * (e2.avg * 7 + e1.avg)
    let qDmg = q1.dmg
    let qAvg = q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ calc, attr, weapon }) => {
  let weaponn = 0
  let weaponnn = 0
  let weaponconsn = 0
    if (weapon.name === '西风长枪') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '喜多院十文字') {
      weaponnn = (2.5 + 0.5 * weapon.affix) * 3
    }
    if (weapon.name === '公义的酬报') {
      weaponnn = 6 + 2 * weapon.affix
    }
    if (weapon.name === '天空之脊') {
      weaponconsn = 2
    }
  return {
    avg: Format.percent((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (40 - weaponnn - (0.2073 * (22 + weaponconsn)))),
    type: 'text'
  }
 }
},
{
  title: '单人站场DPS',
  dmgKey: 'dps',
  params: { NormalUse: 12, NormalHit: 15, NormalDmg: 15 , BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'] / 4 , 'a', 'phy')
    let a6 = dmg(talent.a['六段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['岩脊伤害/共鸣伤害'][1] * 0.5, 'e')
    let e2 = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    let e3 = dmg(talent.e['长按伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let cons1 = cons * 1 >= 1 ? 1 : 0
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn = 0
    if (weapon.name === '西风长枪') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '喜多院十文字') {
      weaponnn = (2.5 + 0.5 * weapon.affix) * 3
    }
    if (weapon.name === '公义的酬报') {
      weaponnn = 6 + 2 * weapon.affix
    }
    if (weapon.name === '天空之脊') {
      weaponconsn = 2
    }
    let qcn = Math.min(1 ,((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (40 - weaponnn - (0.2073 * (22 + weaponconsn)))))
    let aDmg = 4 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + 3 * a5.dmg) + 3 * a6.dmg
    let aAvg = 4 * (a1.avg + a2.avg + a3.avg + a4.avg + 3 * a5.avg) + 3 * a6.avg
    let eDmg = e2.dmg * 9 + e3.dmg + cons1 * (e2.dmg * 7 + e1.dmg)
    let eAvg = e2.avg * 9 + e3.avg + + cons1 * (e2.avg * 7 + e1.avg)
    let qDmg = q1.dmg * qcn
    let qAvg = q1.avg * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 18,
      avg: (aAvg + eAvg + qAvg) / 18
    }
  }
}]
