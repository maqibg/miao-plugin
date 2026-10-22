import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "达达利亚"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWaterTeam: 1, EnergyTeammate: 60 }
export const buffs = CalcBuff
export const details = [
{
  title: `满蓄力${TalentName.a2Name}`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},
{
  title: '断流·闪 单段',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['断流·闪 伤害2'][0], 'a')
},
{
  title: `${TalentName.eName}状态${TalentName.a2Name}`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let a2 = dmg(talent.e['重击伤害'] / 2, 'a2')
    return {
      dmg: 2 * a2.dmg,
      avg: 2 * a2.avg
    }
  }
},
{
  title: '断流·斩 伤害',
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['断流·斩 伤害'], 'e')
},
{
  title: '魔弹一闪伤害',
  params: { EnergyDetermine: 20, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·远程'], 'q')
},
{
  title: '尽灭水光伤害',
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·近战'], 'q')
},
{
  title: '尽灭水光蒸发',
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·近战'], 'q', 'vaporize')
},
{
  title: '断流·爆 伤害',
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['断流·爆 伤害'], 'q')
},
{
  title: '断流·破 伤害',
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['断流·破 伤害'], 'a')
}]
