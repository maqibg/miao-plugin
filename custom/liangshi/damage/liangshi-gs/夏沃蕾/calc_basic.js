import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "夏沃蕾"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 60, FontaineTeammate: 1, HealTeamDetermine: true, HealDetermine: true, PrimordialDetermine: "ousia" }
export const buffs = CalcBuff
export const details = [
{
  title: `点按${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e',)
},
{
  title: `长按${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
},
{
  title: '「超量装药弹头」伤害',
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['「超量装药弹头」伤害'], 'e')
},
 {
  check: ({ cons }) => cons >= 2,
  title: `${TalentName.c2Name}额外伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, HealNumber: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.atk) * 120 / 100, 'e')
},
{
  title: `${TalentName.eName}持续治疗`,
  params: { HealNumber: 2 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { heal }) => heal(talent.e['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.e['持续治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['爆轰榴弹伤害'], 'q',)
},
{
  title: `${TalentName.eName}分裂弹伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['二重毁伤弹伤害'], 'q')
}]