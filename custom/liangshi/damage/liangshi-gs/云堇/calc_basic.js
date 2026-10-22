import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "云堇"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 80, ShieldDetermine: true, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.qName}普攻伤害提升`,
  dmgKey: 'f',
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: (talent.q['伤害值提升'] / 100 + 0.115) * calc(attr.def)
    }
  }
},
{
  title: `点按${TalentName.eName}伤害`,
  params: { ShieldTime: 0.1 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(talent.e['点按伤害'] * calc(attr.def) / 100, 'e')
},
{
  title: `${TalentName.eName}二段伤害`,
  params: { ShieldTime: 2 },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, { basic }) => basic(talent.e['二段蓄力伤害'] * calc(attr.def) / 100, 'e')
},
{
  title: `${TalentName.eName}护盾吸收量`,
  params: { ShieldTime: 2 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield((talent.e['护盾吸收量2'][0] * calc(attr.def) / 100 + talent.e['护盾吸收量2'][1] * 1) * 1.5)
},
{
  title: `${TalentName.qName}展开伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, { basic }) => basic(talent.q['技能伤害'] * calc(attr.def) / 100, 'q')
}]