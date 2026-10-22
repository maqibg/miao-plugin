import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "欧洛伦"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 60, NatlanTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}弹跳对单`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['宿灵球伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.eName}弹跳激化`,
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['宿灵球伤害'], 'e,nightsoul', 'aggravate')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['秘仪伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}释放激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['秘仪伤害'], 'q,nightsoul', 'aggravate')
},
{
  title: `${TalentName.qName}音波碰撞伤害`,
  params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}音波碰撞激化`,
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul', 'aggravate')
},
{
  title: `${TalentName.tName}附加伤害`,
  params: { Hypersense_effect: true, ElementDmg: 2, Nightsoul: true },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 160 / 100, 'nightsoul')
},
{
  title: '感电反应伤害',
  params: { Nightsoul: true },
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('electroCharged')
},
{
  title: `恰玛欧茜 后台${TalentName.qName}碰撞`,
  dmgKey: 'q',
  params: { team: true, Mavuika: true, Chasca: true, Citlali: true, ElementDifferent: 3, ElementSame: 1, ElementWindTeam: 1, ElementMineTeam: 1, ElementFireTeam: 1, ElementIceTeam: 1, ShieldTime: 10, NatlanTeammate: 4, EnergyTeammate: 180, NightsoulUse: 332, TruceTime: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul')
}]