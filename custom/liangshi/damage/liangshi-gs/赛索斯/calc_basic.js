import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "赛索斯"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `二段蓄力${TalentName.a2Name2}`,
  params: { Shadowpiercing_Shot: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.a['贯影箭伤害'][0] * calc(attr.atk) / 100 + talent.a['贯影箭伤害'][1] * calc(attr.mastery) / 100 , 'a2')
},
{
  title: `二段蓄力${TalentName.a2Name2}激化`,
  dmgKey: 'z',
  params: { GrassAttachment: true, Shadowpiercing_Shot: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.a['贯影箭伤害'][0] * calc(attr.atk) / 100 + talent.a['贯影箭伤害'][1] * calc(attr.mastery) / 100 , 'a2', 'aggravate')
},
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}激化伤害`,
  params: { GrassAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['技能伤害'], 'e', 'aggravate')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段`,
  params: { BurstAfter: 2, BurstUse: 1, NormalUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段激化`,
  dmgKey: 'undefined',
  params: { GrassAttachment: true, BurstAfter: 2, BurstUse: 1, NormalUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a2', 'aggravate')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}三段`,
  params: { BurstAfter: 3, BurstUse: 1, NormalUse: 3, ChargedHit: 3, ChargedDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}三段激化`,
  dmgKey: 'a',
  params: { GrassAttachment: true, BurstAfter: 3, BurstUse: 1, NormalUse: 3, ChargedHit: 3, ChargedDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a2', 'aggravate')
}]