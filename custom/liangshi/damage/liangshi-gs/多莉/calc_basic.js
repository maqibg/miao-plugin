import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "多莉"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, MineAttachment: 1, EnergyTeammate: 80, HealDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['断除烦恼炮伤害'], 'e')
},
{
  title: `${TalentName.eName}激化`,
  params: { GrassAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['断除烦恼炮伤害'], 'e', 'aggravate')
},
{
  title: '售后服务弹伤害',
  params: { SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['售后服务弹伤害'], 'e')
},
{
  title: '售后服务弹激化',
  params: { GrassAttachment: true, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['售后服务弹伤害'], 'e', 'aggravate')
},
{
  title: `${TalentName.eName}总伤害`,
  params: { SkillsHit: 3, SkillsDmg: 3 },
  dmgKey: 'e',
  dmg: ({ talent, cons }, dmg) => {
    let e1 = dmg(talent.e['断除烦恼炮伤害'], 'e')
    let e2 = dmg(talent.e['售后服务弹伤害'], 'e')
    let cons1 = cons * 1 >= 1 ? 3 : 2
    return {
      dmg: e1.dmg + cons1 * e2.dmg ,
      avg: e1.avg + cons1 * e2.avg
    }
  }
},
{
  title: `${TalentName.qName}连接伤害`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, HealNumber: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['连接伤害'], 'q')
},
{
  check: ({ cons }) => cons >= 2,
  title: '治疗镇灵炮伤害',
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, HealNumber: 1 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 50 / 100, 'q')
},
{
  title: `${TalentName.qName}每跳治疗`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗量2'][1] * 1)
},
{
  check: ({ cons }) => cons >= 6,
  title: '${TalentName.aName}命中治疗',
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, HealNumber: 2, NormalElement: 1 },
  dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 4 / 100)
}]
