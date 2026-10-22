/**
 * 权重解析与展示（面板权重 / 控制台共用）
 *
 * 支持三种写法：暴击=80 / 暴击:80 / 暴击80
 * 范围 0~100，非法项收集起来一次性反馈，避免用户改一次错一次。
 */
import WeightOverride from '../../components/WeightOverride.js'

export function parseWeights (text) {
  const out = {}
  const bad = []
  for (const part of String(text).split(/[\s,，、]+/).filter(Boolean)) {
    let m = /^(.+?)[=:：](\d+)$/.exec(part) || /^([^\d=:：]+?)(\d+)$/.exec(part)
    if (!m) {
      bad.push(part)
      continue
    }
    const key = WeightOverride.ATTR_KEY_MAP[m[1].trim()]
    const val = Number(m[2])
    if (!key || !Number.isInteger(val) || val < 0 || val > 100) {
      bad.push(part)
      continue
    }
    out[key] = val
  }
  return { out, bad }
}

export function badAttrHint (bad) {
  const attrs = Object.keys(WeightOverride.ATTR_KEY_MAP).join('/')
  return `无法识别：${bad.join('、')}\n可用属性：${attrs}\n数值范围：0~100 的整数`
}

export function fmtWeights (weights) {
  if (!weights || !Object.keys(weights).length) return '默认'
  return Object.entries(weights)
    .map(([k, v]) => `${WeightOverride.ATTR_SHOW_MAP[k] || k}${v}`)
    .join(' ')
}
