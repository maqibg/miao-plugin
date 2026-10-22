import { mainAttrData, RankingKey } from '../index.js'
import { CalcMeasure } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "塔利雅"
export const buffs = CalcBuff
export const defDmgKey = RankingKey(CharacterName)
export const defParams = { FreezeDetermine: true, IceAttachment: true, ElementSame: 1, ElementWaterTeam: 1, EnergyTeammate: 60, ShieldDetermine: true }
export const details = CalcMeasure
export const mainAttr = mainAttrData[CharacterName]