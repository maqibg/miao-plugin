import LSconfig from '#liangshi/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "钟离"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementRockTeam: 1, EnergyTeammate: 40, LiyueTeammate: 1, ShieldDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.aName}前五段`,
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4, ShieldTime: 6 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => {
    let t1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let t2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let t3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let t4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let t5 = dmg(talent.a['五段伤害'] / 4, 'a', 'phy')
    return {
      dmg: t1.dmg + t2.dmg + t3.dmg + t4.dmg + t5.dmg * 4,
      avg: t1.avg + t2.avg + t3.avg + t4.avg + t5.avg * 4
    }
  }
},
{
  title: `${TalentName.eName}护盾量`,
  params: { ShieldTime: 6 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾基础吸收量'] + calc(attr.hp) * talent.e['护盾附加吸收量'] / 100)
},
{
  title: '地心伤害',
  params: { ShieldTime: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][0], 'e')
},
{
  title: '地心·磐礴伤害',
  params: { ShieldTime: 6 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
},
{
  title: '共鸣伤害',
  params: { ShieldTime: 6 },
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: 6 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]