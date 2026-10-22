import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "千织"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 50, CrystallizeNumber: 2 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { NormalElement: 1, RockDmg: 2 },
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段`,
  params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5, NormalElement: 5, RockDmg: 6 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}`,
  params: { NormalElement: 1, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, RockDmg: 3 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
    return {
      dmg: a1.dmg * 2,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}后高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 2, PlungingDmg: 2, RockDmg: 3 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害2'][1], 'a3')
},
{
  title: `${TalentName.eName}释放伤害`,
  params: { RockDmg: 1 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
},
{
  title: `${TalentName.eName}人偶伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, RockDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
},
/*
{
  title: `后台${TalentName.eName}人偶伤害`, // 使用元素战技切换至后台也视为主动释放一次元素战技
  params: { TruceTime: 2, SkillsUse: 2, SkillsHit: 3, SkillsDmg: 3, RockDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
},
*/
{
  title: `${TalentName.c2Name}人偶切斩伤害`,
  check: ({ cons }) => cons >= 2,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, RockDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7, 'e')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, RockDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
}]
