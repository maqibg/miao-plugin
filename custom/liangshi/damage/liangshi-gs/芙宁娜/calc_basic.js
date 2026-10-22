import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

// 不希望计算Q后伤害的可将Fanfare删除（设置为0时仍会计算命之座第一层获得的150点「气氛值」）

let CharacterName = "芙宁娜"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { FontaineTeammate: 1, PrimordialDetermine: true, ElementSame: 1, ElementWaterTeam: 1, EnergyTeammate: 60, TruceChangeHp: true, HealDetermine: true, HealTeamDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.c6Name}${TalentName.aName}伤害提升-荒`,
  params: { cons6: true , PrimordialDetermine: "ousia", Fanfare: 999, HealNumber: 1 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.hp) * 18 / 100 , 'a')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.c6Name}${TalentName.aName}伤害提升-芒`,
  params: { cons6: true , PrimordialDetermine: "pneuma", Fanfare: 999, ChangeHp: 3 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.hp) * 43 / 100 , 'a')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.c6Name}${TalentName.aName}治疗量-荒`,
  params: { cons6: true , PrimordialDetermine: "ousia", Fanfare: 999, HealNumber: 1 },
  dmg: ({ attr, calc }, { heal }) => heal( calc(attr.hp) * 4 / 100 )
},
{
  title: '众水的歌者治疗量',
  params: { Fanfare: 999, HealNumber: 5 },
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1)
},
{
  title: '海薇玛夫人伤害',
  params: { Fanfare: 999, Salon_Solitaire: 40, ChangeHp: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4 , 'e')
},
{
  title: '乌瑟勋爵伤害',
  params: { Fanfare: 999, Salon_Solitaire: 40, ChangeHp: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4 , 'e')
},
{
  title: '谢贝蕾妲小姐伤害',
  params: { Fanfare: 999, Salon_Solitaire: 40, ChangeHp: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4 , 'e')
},
{
  title: '谢贝蕾妲小姐蒸发',
  params: { Fanfare: 999, Salon_Solitaire: 40, ChangeHp: 3, FireAttachment: true, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4 , 'e', 'vaporize')
},
{
  title: `${TalentName.qName}展开伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, Fanfare: 0 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},
{
  title: `${TalentName.qNameT}展开蒸发`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, Fanfare: 0, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
}]

