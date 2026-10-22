import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "卡齐娜"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 70, NatlanTeammate: 1, CrystallizeNumber: 5 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}搭乘伤害`,
  params: { NormalUse: 3, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, Nightsoul: true, RockDmg: 3 },
  dmgKey: 'a',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转搭乘伤害'] / 100, 'e,nightsoul')
},
{
  title: `${TalentName.eName}独立伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, Nightsoul: true, RockDmg: 3 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转独立伤害'] / 100, 'e,nightsoul')
},
/*
{
  title: `后台${TalentName.eName}独立伤害`,
  params: { TruceTime: 2, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, Nightsoul: true, RockDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转独立伤害'] / 100, 'e,nightsoul')
},
*/
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, RockDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.q['技能伤害'] / 100, 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: '护盾替换摧毁伤害',
  params: { RockDmg: 3 },
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.def) * 200 / 100, '')
}]