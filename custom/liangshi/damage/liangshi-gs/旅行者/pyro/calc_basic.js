import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "旅行者/pyro"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, Nightsoul: true, EnergyTeammate: 70 }
export const buffs = CalcBuff
export const details = [
{
  title: `点按${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['焰烈之槛伤害'], 'e,nightsoul')
},
{
  title: `长按${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e,nightsoul')
},
{
  title: `长按${TalentName.eName}蒸发`,
  params: { WaterAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e,nightsoul', 'vaporize')
},
{
  title: `长按${TalentName.eName}融化`,
  params: { IceAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e,nightsoul', 'melt')
},
{
  title: `长按${TalentName.eName}协同`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['灼火之槛伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.qName}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}释放蒸发`,
  params: { WaterAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'vaporize')
},
{
  title: `${TalentName.qName}释放融化`,
  params: { IceAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'melt')
}]
