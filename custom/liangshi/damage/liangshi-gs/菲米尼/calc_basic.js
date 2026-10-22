import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "菲米尼"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName] // 这里默认目标都是冻结状态
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 40, IceAttachment: true, FreezeDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { phy: true },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: '霜寒伤害',
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['霜寒伤害'], 'e')
},
{
   title: '上挑攻击伤害',
   dmg: ({ talent }, dmg) => dmg(talent.e['上挑攻击伤害'], 'e')
},
{
   title: '零阶高压粉碎伤害',
  params: { Shattering_Pressure: true, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 2 },
   dmg: ({ talent }, dmg) => dmg(talent.e['零阶高压粉碎伤害'], 'e')
},
{
  title: '一阶高压粉碎伤害',
  params: { Shattering_Pressure: true, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['一阶高压粉碎伤害2'][0], 'e')
    let e2 = dmg(talent.e['一阶高压粉碎伤害2'][1], 'e', 'phy')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: '二阶高压粉碎伤害',
  params: { Shattering_Pressure: true, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 2, NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['二阶高压粉碎伤害2'][0], 'e')
    let e2 = dmg(talent.e['二阶高压粉碎伤害2'][1], 'e', 'phy')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: '三阶高压粉碎伤害',
  params: { Shattering_Pressure: true, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 2, NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['三阶高压粉碎伤害2'][0], 'e')
    let e2 = dmg(talent.e['三阶高压粉碎伤害2'][1], 'e', 'phy')
    return {
      dmg: e1.dmg + e2.dmg,
      avg: e1.avg + e2.avg
    }
  }
},
{
   title: '四阶高压粉碎伤害',
  params: { Shattering_Pressure: true, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 2, NormalUse: 4, NormalHit: 4, NormalDmg: 4, phy: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['四阶高压粉碎伤害'], 'e', 'phy')
},
{
  title: `${TalentName.qName}展开伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
   dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]