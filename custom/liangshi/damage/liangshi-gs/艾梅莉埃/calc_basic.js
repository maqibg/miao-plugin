import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "艾梅莉埃"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName] // 默认打燃烧，不想打燃烧可以将BurningDetermine设置为false
export const defParams = { BurningDetermine: true, ElementSame: 1, ElementGrassTeam: 1, FontaineTeammate: 1, PrimordialDetermine: "pneuma", EnergyTeammate: 50 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}释放伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}一阶伤害`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
},
{
  title: `${TalentName.eName}二阶单枚伤害`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, FireAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·二阶攻击伤害2'][0], 'e')
},
{
  title: `${TalentName.eName}三阶伤害`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
},
{
  title: `${TalentName.eName}三阶激化`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, BurningDetermine: false, GrassAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q', 'spread')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmgKey: 'q',
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let cons4 = cons >= 4 ? 12 : 4
    return {
      dmg: q1.dmg * cons4,
      avg: q1.avg * cons4
    }
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4, BurstAfter: 3, NormalElement: 1, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '浸析伤害',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, FireAttachment: true },
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 500 / 100, '')
},
{
  title: '燃烧反应伤害',
  params: { FireAttachment: true },
  dmg: ({}, { reaction }) => reaction('burning')
}]