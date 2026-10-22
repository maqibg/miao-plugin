import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "雷泽"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 80 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4, phy: true },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.eName}点按伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e')
},
{
  title: `${TalentName.eName}长按伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
},
{
  title: `${TalentName.eName}长按激化`,
  params: { GrassAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e', 'aggravate')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
},
{
  title: `${TalentName.qName}协同攻击首段`,
  params: { Energy: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['狼魂伤害'] * talent.a['一段伤害'] / 100, 'q')
},
{
  title: `${TalentName.qName}协同攻击四段`,
  params: { Energy: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['狼魂伤害'] * talent.a['四段伤害'] / 100, 'q')
},
{
  title: '超绽放伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('hyperBloom')
}]