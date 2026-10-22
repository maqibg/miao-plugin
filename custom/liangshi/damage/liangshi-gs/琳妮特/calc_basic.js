import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "琳妮特"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWindTeam: 1, EnergyTeammate: 70, HealDetermine: true, PrimordialDetermine: "ousia", FontaineTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  params: { HealNumber: 1 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['谜影突刺伤害'], 'e')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { ChangeHp: 3, HealNumber: 1, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eName}命中治疗`,
  params: { HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ attr, calc }, { heal }) => heal(calc(attr.hp) * 25 / 100)
},
{
  title: `${TalentName.qNameT}展开伤害`,
  params: { BurstAfter: 0.1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '惊奇猫猫盒伤害',
  params: { Bogglecat_Box: true, BurstAfter: 2, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['惊奇猫猫盒伤害'], 'q')
},
{
  title: '彩练术弹伤害',
  params: { Bogglecat_Box: true, BurstAfter: 2, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['彩练术弹伤害'], 'q', 'scene')
}]
