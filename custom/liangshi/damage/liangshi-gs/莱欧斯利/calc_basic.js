import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "莱欧斯利"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 60, FontaineTeammate: 1, PrimordialDetermine: "ousia", HealDetermine: true, SkillsHit: 0, SkillsDmg: 0 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后斥逐拳一段`,
  params: { ChangeHp: 1, OwnHp: 68.5, NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后斥逐拳尾段`,
  params: { ChangeHp: 5, OwnHp: 50.5, NormalUse: 5, NormalHit: 6, NormalDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后斥逐拳尾段融化`,
  params: { ChangeHp: 5, OwnHp: 50.5, NormalUse: 5, NormalHit: 6, NormalDmg: 6, FireAttachment: true },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'melt')
},
{
  title: '惩戒·凌跃拳',
  params: { ChangeHp: 5, OwnHp: 46, NormalUse: 5, NormalHit: 6, NormalDmg: 6, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, HealNumber: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '惩戒·凌跃拳融化',
  params: { ChangeHp: 5, OwnHp: 46, NormalUse: 5, NormalHit: 6, NormalDmg: 6, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true, HealNumber: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'melt')
},
{
  title: '惩戒·凌跃拳治疗',
  params: { ChangeHp: 6, OwnHp: 46, NormalUse: 5, NormalHit: 6, NormalDmg: 6, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ calc, attr , cons }, { heal }) => heal(calc(attr.hp) * (cons * 1 >= 4 ? 50 : 30) / 100)
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { ChangeHp: 5, OwnHp: 50.5, NormalUse: 5, NormalHit: 6, NormalDmg: 6, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, HealNumber: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害2'][0], 'q')
},
{
  title: `${TalentName.qName}单段融化`,
  params: { ChangeHp: 5, OwnHp: 50.5, NormalUse: 5, NormalHit: 6, NormalDmg: 6, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true, HealNumber: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害2'][0], 'q', 'melt')
}]
