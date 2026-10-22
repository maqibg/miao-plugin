import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "白术"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { LiyueTeammate: 1, GrassAttachment: true, ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 80, HealDetermine: true, TruceChangeHp: true, HealTeamDetermine: true, ShieldDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  title: `${TalentName.eName}治疗量`,
  params: { HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['治疗量2'][0] * calc(attr.hp) / 100 + talent.e['治疗量2'][1] * 1)
},
{
  check: ({ cons }) => cons >= 2,
  title: '游丝徵灵·切激化',
  dmg: ({ talent, attr, calc }, { basic }) => basic((calc(attr.atk) * 250 / 100), 'e', 'spread')
},
{
  title: `${TalentName.qName}伤害`,
  params: { ShieldTime: 1.25, BurstUse: 1, BurstHit: 2, BurstDmg: 2, HealNumber: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['灵气脉技能伤害'], 'q')
},
{
  title: `${TalentName.qName}激化`,
  dmgKey: 'q',
  params: { ShieldTime: 1.25, BurstUse: 1, BurstHit: 2, BurstDmg: 2, HealNumber: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['灵气脉技能伤害'], 'q', 'spread')
},
{
  title: '无郤气护盾吸收量',
  params: { ShieldTime: 1.25, BurstUse: 1, BurstHit: 2, BurstDmg: 2, HealNumber: 2 },
  dmg: ({ talent, calc, attr }, { shield }) => shield((talent.q['无郤气护盾吸收量2'][0] * calc(attr.hp) / 100 + talent.q['无郤气护盾吸收量2'][1] * 1) * 1 )
},
{
  title: '无郤气护盾治疗量',
  params: { ShieldTime: 1.25, BurstUse: 1, BurstHit: 2, BurstDmg: 2, HealNumber: 2 },
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q['无郤气护盾治疗量2'][0] * calc(attr.hp) / 100 + talent.q['无郤气护盾治疗量2'][1] * 1 )
}]