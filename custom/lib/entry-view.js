/**
 * 单条伤害的说明文本（控制台「看 N」与引导式流程共用）
 *
 * 内容直接取自规则文件的函数源码与参数，保证说明和实际计算永远一致。
 */
import { formatParam } from './params.js'

const ATTR_SHOW = {
  atk: '攻击', hp: '生命', def: '防御', mastery: '精通',
  cpct: '暴击', cdmg: '爆伤', recharge: '充能', dmg: '伤害',
  phy: '物伤', heal: '治疗', speed: '速度', stance: '击破'
}

// dmg() 的第二个参数是伤害类型标记，翻译成中文才有意义
const DMG_TYPE = {
  a: '普通攻击', a2: '重击', a3: '下落攻击', e: '元素战技', q: '元素爆发', z: '重击',
  phy: '物理伤害', vaporize: '蒸发', melt: '融化', aggravate: '超激化', spread: '蔓激化',
  overloaded: '超载', electrocharged: '感电', superconduct: '超导', swirl: '扩散',
  crystallize: '结晶', bloom: '绽放', burning: '燃烧', hyperbloom: '超绽放', burgeon: '烈绽放'
}

export function dmgTypes (src) {
  const found = []
  for (const m of src.matchAll(/'([A-Za-z][A-Za-z0-9]*)'/g)) {
    if (DMG_TYPE[m[1]] && !found.includes(m[1])) found.push(m[1])
  }
  return found.map(k => DMG_TYPE[k])
}

export function attrLabel (key) {
  return ATTR_SHOW[key] || key
}

/** 返回一条伤害的完整说明 */
export function formatEntryText (char, rule, idx) {
  const d = rule.details[idx]
  if (!d) return `编号 ${idx + 1} 超出范围（共 ${rule.details.length} 条）`

  const lines = []
  lines.push(`【${char.name} · 第 ${idx + 1} 条】`)
  lines.push(`标题：${d.title || '无'}`)

  if (typeof d.dmg === 'function') {
    const src = d.dmg.toString().replace(/\s+/g, ' ')
    lines.push(`公式：${src.length > 220 ? src.slice(0, 220) + '…' : src}`)
    const types = dmgTypes(src)
    if (types.length) lines.push(`计算方式：${types.join('、')}`)
  } else {
    lines.push('公式：该条目未定义伤害函数')
  }

  const params = d.params || {}
  const keys = Object.keys(params)
  if (keys.length) {
    lines.push('触发条件：')
    for (const k of keys) lines.push(`  ${formatParam(k, params[k])}`)
  }

  // 梁氏部分条目把 dmgKey 写成字符串 'undefined'，不能原样显示
  if (d.dmgKey && !/^(undefined|null)$/i.test(String(d.dmgKey))) {
    lines.push(`排名键：${d.dmgKey}`)
  }
  return lines.join('\n')
}
