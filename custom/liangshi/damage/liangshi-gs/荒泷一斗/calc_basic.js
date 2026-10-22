import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "荒泷一斗"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 80, CrystallizeNumber: 3 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}每段`,
  params: { ChargedUse: 3, ChargedHit: 3, ChargedDmg: 3, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟连斩伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.a2Name}尾段`,
  params: { ChargedUse: 5, ChargedHit: 5, ChargedDmg: 5, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟终结伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.eName}伤害`,
  params: { RockDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
  params: { Raging_Oni_King: true, BurstUse: 1, RockDmg: 1, NormalElement: 1 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后左一文字斩伤害`,
  params: { Raging_Oni_King: true, BurstUse: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, RockDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['左一文字斩伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后每段${TalentName.a2Name}`,
  params: { Raging_Oni_King: true, BurstUse: 1, ChargedUse: 3, ChargedHit: 3, ChargedDmg: 3, RockDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟连斩伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后${TalentName.a2Name}尾段`,
  dmgKey: 'z',
  params: { Raging_Oni_King: true, BurstUse: 1, ChargedUse: 5, ChargedHit: 5, ChargedDmg: 5, RockDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟终结伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
  params: { Raging_Oni_King: true, BurstUse: 1, RockDmg: 1 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}]
