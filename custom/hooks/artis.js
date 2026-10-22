/**
 * 钩子③：评分权重（ArtisMarkCfg.getCharArtisCfg）
 *
 * 为什么不在 CharCfg.getArtisCfg 上做：只有部分角色有 artis.js，
 * 其余角色走 miao 内部的默认权重分支，在那一层会漏掉。
 * 这里拿到的是最终要用的 { title, attrWeight }，覆盖最准。
 */
import ArtisMarkCfg from '../../models/artis/ArtisMarkCfg.js'
import { getOverride } from '../lib/override.js'
import { charKey } from '../lib/rule.js'

let original = null

export function install () {
  if (original) return false
  original = ArtisMarkCfg.getCharArtisCfg
  ArtisMarkCfg.getCharArtisCfg = function (profile) {
    const ret = original.call(this, profile)
    const char = profile?.char
    if (!ret || !ret.attrWeight || !char) return ret

    const weights = getOverride(charKey(char), char.game)?.weights
    if (!weights || !Object.keys(weights).length) return ret

    const merged = { ...ret.attrWeight }
    let changed = false
    for (const [key, val] of Object.entries(weights)) {
      const n = Number(val)
      if (!Number.isFinite(n) || n < 0 || n > 100) continue
      merged[key] = n
      changed = true
    }
    if (!changed) return ret
    return {
      ...ret,
      attrWeight: merged,
      title: ret.title ? `${ret.title}·自定义` : '自定义'
    }
  }
  return true
}

export function uninstall () {
  if (!original) return false
  ArtisMarkCfg.getCharArtisCfg = original
  original = null
  return true
}
