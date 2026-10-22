import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "绮良良"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 60, ShieldDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: '甩尾飞踢伤害',
  params: { SkillsUse: 1, SkillsHit: 11 , SkillsDmg: 11, ShieldTime: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['甩尾飞踢伤害'], 'e')
},
{
  title: '甩尾飞踢激化',
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 11, SkillsDmg: 11, ShieldTime: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['甩尾飞踢伤害'], 'e', 'spread')
},
{
  title: `${TalentName.eName}冲撞伤害`,
  params: { SkillsUse: 1, SkillsHit: 6, SkillsDmg: 6, ShieldTime: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['猫箱急件冲撞伤害'], 'e')
},
{
  title: '翻正爪击伤害',
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, ShieldTime: 0.2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['翻正爪击伤害'], 'e')
},
{
  title: '翻正爪击激化',
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, ShieldTime: 0.2 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['翻正爪击伤害'], 'e', 'spread')
},
{
  title: `${TalentName.eName}护盾吸收量`,
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 11, SkillsDmg: 11, ShieldTime: 6 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量上限2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量上限2'][1] * 1)
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'spread')
},
{
  title: '猫草豆蔻爆炸伤害',
  params: {  BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['猫草豆蔻爆炸伤害'], 'q')
}]