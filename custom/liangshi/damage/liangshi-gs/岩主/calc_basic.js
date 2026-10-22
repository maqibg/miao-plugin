import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "旅行者/geo"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}崩毁伤害`,
  params: { NormalUse: 5, NormalHit: 5, NormalDmg: 5 },
  dmgKey: 'a',
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 60 / 100, 'a')
},
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { Wake_of_Earth: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['地震波单次伤害'], 'q')
},
{
  title: `${TalentName.qName}完整伤害`,
  dmgKey: 'q',
  params: { Wake_of_Earth: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['地震波单次伤害'], 'q')
    return {
      dmg: q1.dmg * 4,
      avg: q1.avg * 4
    }
  }
},
{
  check: ({ cons }) => cons >= 1,
  title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
  params: { Wake_of_Earth: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '结晶护盾吸收量',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('crystallize')
}]