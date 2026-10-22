import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "莱依拉"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 40, ShieldDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `满层${TalentName.eNameT}护盾量`,
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(calc(attr.hp) * talent.e['护盾基础吸收量2'][0] / 100 + talent.e['护盾基础吸收量2'][1])
},
{
  title: '护盾展开伤害',
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '护盾展开融化',
  params: { FireAttachment: true, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: '单个飞星伤害',
  params: { Shooting_Star: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['飞星伤害'], 'e')
},
{
  title: '单个飞星融化',
  params: { Shooting_Star: true, FireAttachment: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmgKey: 'e',
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['飞星伤害'], 'e', 'melt')
},
{
  title: '星光弹伤害',
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ attr, calc, talent }, { basic }) => basic(calc(attr.hp) * talent.q['星光弹伤害'] / 100)
},
{
  title: '星光弹融化',
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmgKey: 'q',
  dmg: ({ attr, calc, talent }, { basic }) => basic(calc(attr.hp) * talent.q['星光弹伤害'] / 100, 'q', 'melt')
}]