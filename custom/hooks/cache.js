/**
 * 钩子④：规则缓存失效
 *
 * miao 会把 getCalcRule / getArtisCfg 的结果缓存在角色对象上，
 * 不处理的话用户在群里改完必须重启才生效，体验不可接受。
 *
 * 做法：给每个角色对象记一个"规则版本号"，与全局版本不一致就丢弃缓存，
 * 让下一次读取重新走 CharCfg（那里会叠加上用户覆盖）。
 */
import { Character } from '../../models/index.js'
import { getVersion } from '../lib/store.js'

let originals = null

function invalidate (char) {
  if (char.__ruleVersion === getVersion()) return false
  char.__ruleVersion = getVersion()
  char._calcRule = undefined
  char._artisRule = undefined
  return true
}

export function install () {
  if (originals) return false
  originals = {
    getCalcRule: Character.prototype.getCalcRule,
    getArtisCfg: Character.prototype.getArtisCfg
  }
  Character.prototype.getCalcRule = function () {
    invalidate(this)
    return originals.getCalcRule.call(this)
  }
  Character.prototype.getArtisCfg = function () {
    invalidate(this)
    return originals.getArtisCfg.call(this)
  }
  return true
}

export function uninstall () {
  if (!originals) return false
  Character.prototype.getCalcRule = originals.getCalcRule
  Character.prototype.getArtisCfg = originals.getArtisCfg
  originals = null
  return true
}
