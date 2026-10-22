import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "基尼奇"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 70, NatlanTeammate: 1, Nightsoul: true }
export const buffs = CalcBuff
export const details = [
{
  title: '环绕射击单枚',
  params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.e['环绕射击伤害'], 'e,nightsoul')
},
{
  title: '环绕射击单枚激化',
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.e['环绕射击伤害'], 'e,nightsoul', 'spread')
},
{
  title: '迴猎贯鳞炮伤害',
  dmgKey: 'e',
  params: { Scalespiker_Cannon: true, SkillsAfter: 3, SkillsUse: 2, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul')
},
{
  title: '迴猎贯鳞炮激化',
  params: { GrassAttachment: true, Scalespiker_Cannon: true, SkillsAfter: 3, SkillsUse: 2, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul', 'spread')
},
{
  check: ({ cons }) => cons >= 2,
  title: '2命首次猎贯鳞炮',
  params: { Scalespiker_Cannon: true, SkillsAfter: 1.6, SkillsUse: 2, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}释放激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'spread')
},
{
  title: `${TalentName.qName}龙息伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['龙息伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}龙息激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['龙息伤害'], 'q,nightsoul', 'spread')
}]