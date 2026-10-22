import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "希诺宁"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 60, NatlanTeammate: 1, CrystallizeNumber: 5, HealTeamDetermine: true, HealDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}突进伤害`,
  params: { NormalElement: 0, RockDmg: 1 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['突进伤害'] * calc(attr.def) / 100, 'e,nightsoul')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, RockDmg: 4, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['技能伤害'] * calc(attr.def) / 100, 'q,nightsoul')
},
{
  title: `${TalentName.qName}单次治疗`,
  params: { RockDmg: 6, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.def) / 100 + talent.q['持续治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}追加伤害`,
  params: { RockDmg: 6, BurstUse: 1, BurstHit: 2, BurstDmg: 2, HealNumber: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['追加节拍伤害'] * calc(attr.def) / 100, 'q,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { RockDmg: 2, NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎一段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段`,
  params: { RockDmg: 3, NormalUse: 1, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎二段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段`,
  params: { RockDmg: 4, NormalUse: 1, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎三段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段`,
  dmgKey: 'a',
  params: { RockDmg: 5, NormalUse: 1, NormalHit: 4, NormalDmg: 4 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎四段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
}]