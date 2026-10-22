/**
 * 钩子②：面板实际使用的计算条目（ProfileDmg.getCalcRule）
 *
 * 这是真正决定「面板上显示哪几条伤害」的链路：
 * ProfileDmg 按 dmgRulePath 找到文件后，直接返回该文件的 details。
 * 因此条目覆盖必须在这里完成。
 *
 * 额外兜底：梁氏部分角色的基础档条目表为空（实测 10 个角色），
 * 这时若照常出图会一条伤害都没有，必须回退到 miao 自带。
 */
import ProfileDmg from '../../models/ProfileDmg.js'
import { applyEntryOverride } from '../lib/entries.js'
import { setBypass } from './dmgRule.js'

let original = null

function ruleName (char) {
  return char.isTraveler ? `旅行者/${char.elem}` : char.name
}

export function install () {
  if (original) return false
  original = ProfileDmg.prototype.getCalcRule
  ProfileDmg.prototype.getCalcRule = async function () {
    const ret = await original.call(this)
    if (!ret || !this.char) return ret

    // 梁氏文件在「该角色没有配条目」时导出的是 false，而不是空数组，两种都要兜住
    const noEntries = !ret.details || (Array.isArray(ret.details) && ret.details.length === 0)
    if (noEntries) {
      const hit = ProfileDmg.dmgRulePath(ruleName(this.char), this.char.game)
      if (hit && String(hit.createdBy).startsWith('梁氏')) {
        setBypass(ruleName(this.char), this.char.game, true)
        try {
          const fallback = await original.call(this)
          if (fallback && Array.isArray(fallback.details) && fallback.details.length) {
            console.warn(`[miao-custom] ${this.char.name} 的梁氏基础档没有条目，本次回退 miao 自带`)
            return applyEntryOverride(this.char, fallback)
          }
        } finally {
          setBypass(ruleName(this.char), this.char.game, false)
        }
      }
    }

    return applyEntryOverride(this.char, ret)
  }
  return true
}

export function uninstall () {
  if (!original) return false
  ProfileDmg.prototype.getCalcRule = original
  original = null
  return true
}
