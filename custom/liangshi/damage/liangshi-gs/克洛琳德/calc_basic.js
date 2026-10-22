import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "克洛琳德"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}`, FontaineTeammate: 1, ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 60, HealDetermine: true, PrimordialDetermine: "ousia" }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}穿透射击`,
  dmgKey: 'a',
  params: { blPct: 0.5, ChangeBondOfLife: 2, NormalElement: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['驰猎伤害2'][1], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}射击`,
  dmgKey: 'undefined',
  params: { NormalUse: 4, NormalDmg: 4, NormalHit: 4, ChangeBondOfLife: 3, NormalElement: 4 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['驰猎伤害2'][0], 'a')
},
{
  title: `${TalentName.eName}贯夜突进伤害`,
  params: { blPct: 0, NormalUse: 0, NormalDmg: 0, NormalHit: 0, ChangeBondOfLife: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['贯夜伤害2'][0], 'e')
},
{
  title: `${TalentName.eName}强化贯夜伤害`,
  params: { blPct: 0.5, NormalUse: 2, NormalDmg: 2, NormalHit: 2, ChangeBondOfLife: 3, NormalElement: 2 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['贯夜伤害2'][1], 'e')
},
{
  title: `${TalentName.eName}贯夜·契令`,
  params: { NormalUse: 3, NormalDmg: 3, NormalHit: 3, SkillsHit: 3, SkillsDmg: 3, ChangeBondOfLife: 4, NormalElement: 3 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg ) => {
    let e3 = dmg(talent.e['贯夜伤害2'][2], 'e')
    return {
      dmg: e3.dmg * 3,
      avg: e3.avg * 3
    }
  }
},
{
  check: ({ cons }) => cons >= 1,
  title: '夜巡之影协同攻击',
  params: { NormalUse: 3, NormalDmg: 3, NormalHit: 3, SkillsHit: 3, SkillsDmg: 3, ChangeBondOfLife: 3 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 30 / 100, 'a')
},
{
  check: ({ cons }) => cons >= 6,
  title: '明烛之影追击伤害',
  params: { NormalUse: 3, NormalDmg: 3, NormalHit: 3, SkillsHit: 3, SkillsDmg: 3, ChangeBondOfLife: 3 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 200 / 100, 'a')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ChangeBondOfLife: 4 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害2'][0], 'q')
}]
