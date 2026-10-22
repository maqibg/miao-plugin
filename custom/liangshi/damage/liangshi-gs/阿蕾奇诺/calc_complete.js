import { Format , LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { recordData } from '../../../components/jsRecord.js'
import { CalcBuff } from './CalcBuff.js'
import path from 'node:path'
import fs from 'node:fs'

let EmilieTeam = null
let ChioriTeam = null
let Zhong_LiTeam = null
try {
  EmilieTeam = fs.readFileSync('plugins/miao-plugin/custom/liangshi/damage/liangshi-gs/艾梅莉埃/TeamData.json', 'utf8')
  EmilieTeam = JSON.parse(EmilieTeam)
  ChioriTeam = fs.readFileSync('plugins/miao-plugin/custom/liangshi/damage/liangshi-gs/千织/TeamData.json', 'utf8')
  ChioriTeam = JSON.parse(ChioriTeam)
  Zhong_LiTeam = fs.readFileSync('plugins/miao-plugin/custom/liangshi/damage/liangshi-gs/钟离/TeamData.json', 'utf8')
  Zhong_LiTeam = JSON.parse(Zhong_LiTeam)
} catch (err) {
  console.error('组队数据读取失败:', err)
}
let c2eDmg = { avg: 0, dmg: 0 }
let T1a1Dmg = { avg: 0, dmg: 0 }
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1e3Dmg = { avg: 0, dmg: 0 }
let T1e4Dmg = { avg: 0, dmg: 0 }
let T1z1Dmg = { avg: 0, dmg: 0 }
let CharacterName = "阿蕾奇诺"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}` }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段伤害`,
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段蒸发`,
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}一段伤害`,
  params: { blPlus: 200 , blPct: 1, NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段蒸发`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}二段伤害`,
  params: { blPlus: 200 , blPct: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段蒸发`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}三段伤害`,
  params: { blPlus: 200 , blPct: 1, NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5 },
  dmg: ({ talent }, dmg ) => {
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    return {
      dmg: a4.dmg * 2 ,
      avg: a4.avg * 2
    }
  }
},
{
  title: `满契${TalentName.aName}四段伤害`,
  params: { blPlus: 200 , blPct: 0.9625, NormalUse: 4, NormalHit: 5, NormalDmg: 5 },
  dmg: ({ talent }, dmg ) => {
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    return {
      dmg: a4.dmg * 2 ,
      avg: a4.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}五段伤害`,
  params: { NormalUse: 5, NormalHit: 6, NormalDmg: 6 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}五段蒸发`,
  params: { NormalUse: 5, NormalHit: 6, NormalDmg: 6 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}五段伤害`,
  params: { blPlus: 200 , blPct: 1, NormalUse: 5, NormalHit: 6, NormalDmg: 6 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}六段伤害`,
  params: { NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}六段蒸发`,
  params: { NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}六段伤害`,
  dmgKey: 'a',
  params: { blPlus: 200, blPct: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  check: ({ cons }) => cons >= 2,
  title: '血偿勒令回收伤害',
  dmg: ({ attr, calc }, { basic }) => {
   c2eDmg = basic(calc(attr.atk) * 900 / 100, 'e')
   return c2eDmg
  }
},
{
  check: ({ cons }) => cons >= 2,
  title: '血偿勒令回收蒸发',
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 900 / 100, 'e', 'vaporize')
},
{
  title: `${TalentName.eName}尖刺伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg ) => dmg(talent.e['尖刺伤害'], 'e')
},
{
  title: `${TalentName.eName}尖刺蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.e['尖刺伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.eName}切斩伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg ) => dmg(talent.e['切斩伤害'], 'e')
},
{
  title: `${TalentName.eName}切斩蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.e['切斩伤害'], 'e', 'vaporize')
},
{
  title: '血偿勒令伤害',
  dmg: ({ talent }, dmg ) => dmg(talent.e['血偿勒令伤害'], 'e')
},
{
  title: '血偿勒令蒸发',
  dmg: ({ talent }, dmg ) => dmg(talent.e['血偿勒令伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: `满契${TalentName.qName}伤害`,
  params: { blPlus: 200 , blPct: 1, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}蒸发伤害`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.eNameT}后${TalentName.qName}治疗量`,
  params: { EnergyDetermine: 0 },
  dmg: ({ params, cons, attr, calc, weapon }, { heal }) => heal((150 / 100 * (Math.min((params.blPct * ((cons >= 2 ? 130 : 65) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus), 200) / 100) * calc(attr.hp)) + (150 / 100 * calc(attr.atk)))
},
{
  title: `满契${TalentName.qName}治疗量`,
  params: { EnergyDetermine: 0 },
  dmgKey: 'h',
  dmg: ({ params, cons, attr, calc, weapon }, { heal }) => heal(150 / 100 * (200 / 100) * calc(attr.hp) + 150 / 100 * calc(attr.atk))
},
{
  title: `满契首轮${TalentName.aName}期望`,
  params: { blPlus: 200, blPct: 0.8011, NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent, attr , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    return {
      dmg: a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg + a6.dmg ,
      avg: a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg + a6.avg
    }
  }
},
{
  title: `满契首轮${TalentName.aName}蒸发期望`,
  params: { blPlus: 200 , blPct: 0.8011, NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent, attr , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    let az4 = dmg(talent.a['四段伤害'] / 2 , 'a', 'vaporize')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    return {
      dmg: a1.dmg + a2.dmg + a3.dmg + a4.dmg + az4.dmg + a5.dmg + a6.dmg ,
      avg: a1.avg + a2.avg + a3.avg + a4.avg + az4.dmg + a5.avg + a6.avg
    }
  }
},
{
  title: '单人站场20秒',
  dmgKey: 'dpm',
  params: { blPct: 0.594, NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent, cons }, dmg ) => {
    let e1 = dmg(talent.e['尖刺伤害'], 'e')
    let e2 = dmg(talent.e['切斩伤害'], 'e')
    let e3 = dmg(talent.e['血偿勒令伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    let z1 = dmg(talent.a['重击伤害'], 'a2')
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let e4 = c2eDmg
    let aDmg = z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg + a6.dmg)
    let aAvg = z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg + a6.avg)
    let eDmg = (e1.dmg + e2.dmg + e3.dmg) * 2 + e4.dmg * cons2
    let eAvg = (e1.avg + e2.avg + e3.avg) * 2 + e4.avg * cons2
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
  dmg: ({ calc, attr, weapon, cons }) => {
    let weaponn = 0
    let consn = 0
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
    if (cons >= 4) {
      consn = 15
    }
    return {
      avg: Format.percent((calc(attr.recharge) / 100 * (5 * 3 + weaponn + energy)) / (60 - weaponnn - consn - (0.2073 * (14 + weaponconsn)))),
      type: 'text'
    }
  }
},
{
  title: '单人站场期望DPS',
  dmgKey: 'dps',
  params: { blPct: 0.594, NormalUse: 6, NormalHit: 7, NormalDmg: 7 },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg ) => {
    let e1 = dmg(talent.e['尖刺伤害'], 'e')
    let e2 = dmg(talent.e['切斩伤害'], 'e')
    let e3 = dmg(talent.e['血偿勒令伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    let z1 = dmg(talent.a['重击伤害'], 'a2')
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let e4 = c2eDmg
    let weaponn = 0
    let consn = 0
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
    if (cons >= 4) {
      consn = 15
    }
    let qcn = Math.min(1 , ((calc(attr.recharge) / 100 * (5 * 3 + weaponn + energy)) / (60 - weaponnn - consn - (0.2073 * (14 + weaponconsn)))))
    let aDmg = z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg + a6.dmg)
    let aAvg = z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg + a6.avg)
    let eDmg = (e1.dmg + e2.dmg + e3.dmg) * (1 + qcn) + e4.dmg * cons2
    let eAvg = (e1.avg + e2.avg + e3.avg) * (1 + qcn) + e4.avg * cons2
    let qDmg = q1.dmg * qcn
    let qAvg = q1.avg * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 20,
      avg: (aAvg + eAvg + qAvg) / 20
    }
  }
}]
