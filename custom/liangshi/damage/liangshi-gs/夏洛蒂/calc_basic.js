import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "夏洛蒂"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 80, FontaineTeammate: 1, HealDetermine: true, TruceChangeHp: true, HealTeamDetermine: true, PrimordialDetermine: "pneuma" }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `点按${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['点按拍照伤害'] , 'e')
},
{
  title: `长按${TalentName.eName}伤害`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按拍照伤害'] , 'e')
},
{
  title: '瞬时剪影伤害',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['「瞬时剪影」印记伤害'] , 'e')
},
{
  title: '聚焦印象伤害',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['「聚焦印象」印记伤害'] , 'e')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}释放治疗`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['施放治疗量2'][0] * calc(attr.atk) / 100 + talent.q['施放治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}持续伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4, HealNumber: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['相机伤害'], 'q')
},
{
  title: `${TalentName.qName}持续治疗`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4, HealNumber: 4 },
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['相机持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['相机持续治疗量2'][1] * 1)
}]