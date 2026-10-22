import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "瑶瑶"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 80, LiyueTeammate: 1, HealDetermine: true, TruceChangeHp: true, HealTeamDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: '白玉萝卜伤害',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e')
},
{
  title: '白玉萝卜激化',
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e', 'spread')
},
{
  title: `${TalentName.qNameT}后白玉萝卜伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4, HealNumber: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
},
{
  title: `${TalentName.qNameT}后白玉萝卜激化`,
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4, HealNumber: 4 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', 'spread')
},
{
  title: `${TalentName.qName}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '白玉萝卜每跳治疗',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 3 },
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.e['白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.e['白玉萝卜治疗量2'][1])
},
{
  title: `${TalentName.qNameT}后白玉萝卜每跳治疗`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4, HealNumber: 3 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['桂子仙机白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.q['桂子仙机白玉萝卜治疗量2'][1])
},
{
  title: `萝卜炸裂${TalentName.tName}治疗`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 5 },
  dmg: ({ calc, attr }, { heal }) => heal(calc(attr.hp) * 0.8 / 100)
},
{
  title: `${TalentName.c6Name}大萝卜治疗`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 5 },
  cons: 6,
  dmg: ({ calc, attr }, { heal }) => heal(calc(attr.hp) * 7.5 / 100)
}]