/**
 * 条目覆盖：停用 / 改标题 / 改参数
 *
 * 两处计算链路都要用同一套规则，抽出来避免各写一份导致行为不一致：
 *   1. ProfileDmg.getCalcRule → 面板实际展示与伤害计算用的条目（梁氏/miao 都在这里）
 *   2. CharCfg.getCalcRule    → 属性 buff 计算用的条目
 */
import { getOverride } from './override.js'
import { charKey } from './rule.js'

export function applyEntryOverride (char, cfg) {
  if (!cfg || !Array.isArray(cfg.details)) return cfg

  const entries = getOverride(charKey(char), char.game)?.entries
  if (!entries || !Object.keys(entries).length) return cfg

  const details = cfg.details.map(d => ({ ...d }))
  for (const [idx, patch] of Object.entries(entries)) {
    const i = Number(idx)
    if (!Number.isInteger(i) || !details[i]) continue
    if (patch.enabled === false) details[i]._disabled = true
    if (typeof patch.title === 'string') details[i].title = patch.title
    if (patch.params && typeof patch.params === 'object') {
      details[i].params = { ...(details[i].params || {}), ...patch.params }
    }
  }

  // 删掉条目后默认展示的索引会偏移，不修正就会指到错误的条目上
  const defIdx = Number(cfg.defDmgIdx)
  if (Number.isInteger(defIdx) && defIdx >= 0) {
    const removedBefore = details.filter((d, i) => d._disabled && i < defIdx).length
    cfg.defDmgIdx = Math.max(0, defIdx - removedBefore)
  }

  cfg.details = details.filter(d => !d._disabled)
  return cfg
}
