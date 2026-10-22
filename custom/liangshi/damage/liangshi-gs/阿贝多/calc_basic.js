import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "阿贝多"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 40, CrystallizeNumber: 3 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  params: { TargetHp: 100, SkillsHit: 1, SkillsDmg: 1, RockDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '满血刹那之花伤害',
  params: { TargetHp: 100, SkillsHit: 4, SkillsDmg: 4, RockDmg: 4 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.def) * talent.e['刹那之花伤害'] / 100, 'e')
},
{
  title: '刹那之花伤害',
  params: { TargetHp: 25, SkillsHit: 4, SkillsDmg: 4, RockDmg: 4 },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.def) * talent.e['刹那之花伤害'] / 100, 'e')
},
{
  title: `${TalentName.qName}伤害`,
  params: { Fatal_Reckoning: 0, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, RockDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
},
{
  title: `4层${TalentName.qName}伤害`,
  params: { Fatal_Reckoning: 4, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, RockDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
},
{
  title: '生灭之花伤害',
  params: { Fatal_Reckoning: 0, BurstUse: 1, BurstHit: 6, BurstDmg: 6, RockDmg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.q['生灭之花伤害'], 'q')
},
{
  title: '4层生灭之花伤害',
  dmgKey: 'q',
  params: { Fatal_Reckoning: 4, BurstUse: 1, BurstHit: 6, BurstDmg: 6, RockDmg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.q['生灭之花伤害'], 'q')
},
{
  title: '结晶护盾吸收量',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('crystallize')
}]