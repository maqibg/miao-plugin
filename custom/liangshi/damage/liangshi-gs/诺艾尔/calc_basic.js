import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "诺艾尔"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 80, ShieldDetermine: true, HealDetermine: true, TruceChangeHp: true, HealTeamDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}一段`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.eName}启动伤害`,
  params: { HealNumber: 1, ShieldTime: 0.1 },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, { basic }) => basic(talent.e['技能伤害'] * calc(attr.def) / 100 , 'e')
},
{
  title: `${TalentName.eName}盾量`,
  params: { HealNumber: 1, ShieldTime: 2 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['吸收量2'][0] * calc(attr.def) / 100 + talent.e['吸收量2'][1] * 1)
},
{
  title: `${TalentName.eName}单次治疗`,
  params: { HealNumber: 2, ShieldTime: 2 },
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.e['治疗量2'][0] * calc(attr.def) / 100 + talent.e['治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}挥砍伤害`,
  params: { Sweeping_Time: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: 6 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段`,
  params: { Sweeping_Time: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: 6, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}四段`,
  params: { Sweeping_Time: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, NormalUse: 4, NormalHit: 4, NormalDmg: 4, ShieldTime: 6, NormalElement: 4 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后${TalentName.a2Name}`,
  params: { Sweeping_Time: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: 6 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
}]
