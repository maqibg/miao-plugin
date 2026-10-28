/**
 * 权重解析与展示（面板权重 / 控制台 / 引导流程共用）
 *
 * 容错解析，尽量让用户怎么打都能认：
 *   暴击=80      暴击:80      暴击80
 *   攻击力 75    攻击力75     （属性与数值分开写）
 *   暴击=80 精通 60 充能=120   （混合写）
 *
 * 数值范围 0~100，非法项收集起来一次性反馈，避免用户改一次错一次。
 */
import WeightOverride from '../../components/WeightOverride.js'

const SEP = /[\s,，、]+/

function toAttr (name) {
  return WeightOverride.ATTR_KEY_MAP[String(name || '').trim()] || ''
}

function toValue (text) {
  const n = Number(text)
  if (!Number.isInteger(n) || n < 0 || n > 100) return null
  return n
}

export function parseWeights (text) {
  const out = {}
  const bad = []
  const parts = String(text).split(SEP).filter(Boolean)

  // 第一轮：属性与数值连在一起（暴击=80 / 暴击:80 / 暴击80）
  const leftover = []
  for (const part of parts) {
    const m = /^(.+?)[=:：](\d+)$/.exec(part) || /^([^\d=:：]+?)(\d+)$/.exec(part)
    if (!m) {
      leftover.push(part)
      continue
    }
    const key = toAttr(m[1])
    const val = toValue(m[2])
    if (!key || val === null) {
      bad.push(part)
      continue
    }
    out[key] = val
  }

  // 第二轮：属性与数值分开写（攻击力 75）；单独出现的属性名等下一个数字来配对
  for (let i = 0; i < leftover.length; i++) {
    const part = leftover[i]
    const key = toAttr(part)
    if (key) {
      const next = leftover[i + 1]
      const val = next !== undefined && /^\d+$/.test(next) ? toValue(next) : null
      if (val !== null) {
        out[key] = val
        i++
        continue
      }
    }
    bad.push(part)
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
