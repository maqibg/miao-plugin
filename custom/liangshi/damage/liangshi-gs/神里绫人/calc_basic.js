import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "神里绫人"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWaterTeam: 1, EnergyTeammate: 80 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['水影伤害'], 'e')
},
{
  title: `${TalentName.qNameT}后瞬水剑一段伤害`,
  params: { Suiyuu: true, Namisen: 3, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['一段瞬水剑伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后瞬水剑二段伤害`,
  params: { Suiyuu: true, Namisen: 4, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['二段瞬水剑伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后瞬水剑三段伤害`,
  params: { Suiyuu: true, Namisen: 5, NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段瞬水剑伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后瞬水剑三段蒸发`,
  params: { Suiyuu: true, Namisen: 5, NormalUse: 3, NormalHit: 3, NormalDmg: 3, FireAttachment: true, NormalElement: 3 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.e['三段瞬水剑伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.qName}每段伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['水花剑伤害'], 'q')
},
{
  title: `${TalentName.qName}每段蒸发`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['水花剑伤害'], 'q', 'vaporize')
}]
