/**
 * 钩子②b：属性计算用的条目（CharCfg.getCalcRule）
 *
 * 与 hooks/dmgCalc.js 共用同一套覆盖规则，保证「停用一条」在两处一致。
 * 注意这一层的 details 来自 miao 自己的配置文件，不一定等于面板展示的那份，
 * 所以它只是补充，真正决定面板条目的是 dmgCalc.js。
 */
import CharCfg from '../../models/character/CharCfg.js'
import { applyEntryOverride } from '../lib/entries.js'

let original = null

export function install () {
  if (original) return false
  original = CharCfg.getCalcRule
  CharCfg.getCalcRule = function (char) {
    return applyEntryOverride(char, original.call(this, char))
  }
  return true
}

export function uninstall () {
  if (!original) return false
  CharCfg.getCalcRule = original
  original = null
  return true
}

export function getOriginal () {
  return original
}
