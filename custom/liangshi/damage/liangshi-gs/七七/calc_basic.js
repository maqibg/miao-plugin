import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "七七"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 80, HealDetermine: true, TruceChangeHp: true, HealTeamDetermine: true, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, phy: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['重击伤害2'][0], 'a2', 'phy')
    return {
      dmg: 2 * z.dmg,
      avg: 2 * z.avg
    }
  }
},
{
  title: `${TalentName.eName}持续伤害`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 2 },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['寒病鬼差伤害'], 'e')
},
{
  title: `${TalentName.eName}持续融化`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 2, FireAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['寒病鬼差伤害'], 'e', 'melt')
},
{
  title: `${TalentName.eName}持续治疗`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 2 },
  dmgKey: 'undefined',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1)
},
{
  title: `${TalentName.eName}命中治疗`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 6, NormalUse: 4, NormalHit: 4, NormalDmg: 4 },
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['命中治疗量2'][0] * calc(attr.atk) / 100 + talent.e['命中治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}融化`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}每跳治疗`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 2, NormalUse: 4, NormalHit: 4, NormalDmg: 4 },
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1)
}]