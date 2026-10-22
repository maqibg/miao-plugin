import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "菲谢尔"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}召唤伤害`,
  params: { Oz: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['召唤伤害'], 'e')
},
{
  title: `${TalentName.eName}召唤激化`,
  params: { GrassAttachment: true, Oz: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['召唤伤害'], 'e', 'aggravate')
},
{
  title: `${TalentName.eName}攻击伤害`,
  params: { SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['奥兹攻击伤害'], 'e')
},
{
  title: `${TalentName.eName}攻击激化`,
  params: { GrassAttachment: true, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['奥兹攻击伤害'], 'e', 'aggravate')
},
{
  title: '圣裁之雷伤害',
  params: { SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 80 / 100, 'e')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.c6Name}协同攻击`,
  params: { SkillsHit: 8, SkillsDmg: 8 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 30 / 100, 'e')
},
{
  check: ({ cons }) => cons >= 4,
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 222 / 100, 'q')
},
{
  title: `${TalentName.qName}落雷伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['落雷伤害'], 'q')
},
{
  title: `${TalentName.qName}落雷激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['落雷伤害'], 'q', 'aggravate')
}]
