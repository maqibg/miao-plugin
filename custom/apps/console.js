/**
 * 计算控制台（只读部分）
 *
 * 设计目标：一条 #角色计算 就能看清"用哪份规则、有哪些条目、权重多少"，
 * 后续的修改指令都挂在这同一个入口下，用户不需要记第二套语法。
 *
 * 展示原则：不暴露服务器文件路径；参数名必须带中文解释；没有值的字段直接省略。
 */
import { App } from '#miao'
import { resolveChar, getRule, getCharOverride, getLiangshiVersion } from '../lib/rule.js'
import { canView } from '../lib/permission.js'
import { formatParam } from '../lib/params.js'

const app = App.init({ id: 'calcConsole', name: '计算控制台', priority: 45 })

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

function fmtWeights (w) {
  if (!w || !Object.keys(w).length) return '默认'
  return Object.entries(w).map(([k, v]) => `${ATTR_SHOW[k] || k}${v}`).join(' ')
}

function dmgTypes (src) {
  const found = []
  for (const m of src.matchAll(/'([A-Za-z][A-Za-z0-9]*)'/g)) {
    if (DMG_TYPE[m[1]] && !found.includes(m[1])) found.push(m[1])
  }
  return found.map(k => DMG_TYPE[k])
}

/** #胡桃面板计算 */
async function showConsole (e) {
  const m = /^#(\S+?)面板计算$/.exec(e.msg.trim())
  if (!m) return false
  if (!canView(e)) {
    return e.reply('当前仅白名单成员可以查看，请联系主人')
  }
  const char = resolveChar(m[1])
  if (!char) {
    return e.reply(`没找到角色「${m[1]}」，换个名字试试`)
  }

  const rule = await getRule(char)
  if (!rule) {
    return e.reply(`${char.name} 目前没有任何伤害计算规则（miao 未收录）`)
  }

  const ov = getCharOverride(char)
  const lsVer = getLiangshiVersion()
  const defIdx = Number.isInteger(rule.defDmgIdx) ? rule.defDmgIdx : -1

  const lines = []
  lines.push(`【${char.name} · 计算控制台】`)
  lines.push(`方案：${ov?.scheme === 'basic' ? '梁氏·基础' : 'miao 自带'}`)
  if (lsVer) lines.push(`梁氏版本：${lsVer}`)
  lines.push(`主属性：${rule.mainAttr.split(',').map(k => ATTR_SHOW[k] || k).join('、')}`)
  lines.push(`权重：${fmtWeights(ov?.weights)}`)
  lines.push('')

  if (!rule.details.length) {
    lines.push('该规则没有定义伤害条目')
    if (rule.source === '梁氏方案') {
      lines.push('（梁氏这一档对当前角色是空的，出图时会自动改用 miao 自带）')
    }
  } else {
    const offCount = rule.details.filter(d => d._disabled).length
    const total = rule.details.length
    lines.push(`伤害条目（共 ${total} 条${offCount ? `，其中 ${offCount} 条已停用` : ''}，★为默认展示）：`)
    rule.details.forEach((d, i) => {
      const title = d.title || `条目${i + 1}`
      const star = i === defIdx ? '★' : ' '
      const off = d._disabled ? '（已停用）' : ''
      lines.push(` ${String(i + 1).padStart(2)} ${star} ${title}${off}`)
    })
  }

  lines.push('')
  lines.push(`查看某条：#${char.name}面板计算 看 {编号}`)
  lines.push(`改评分权重：#${char.name}面板权重 暴击=80 精通=60`)
  lines.push('全部用法：#面板计算帮助')

  e.reply(lines.join('\n'))
  return true
}

/** #胡桃面板计算 看 2 */
async function showEntry (e) {
  const m = /^#(\S+?)面板计算\s+看\s*(\d+)$/.exec(e.msg.trim())
  if (!m) return false
  if (!canView(e)) return e.reply('当前仅白名单成员可以查看')
  const char = resolveChar(m[1])
  if (!char) return e.reply(`没找到角色「${m[1]}」`)
  const rule = await getRule(char)
  if (!rule) return e.reply(`${char.name} 没有可用的计算规则`)

  const idx = Number(m[2]) - 1
  const d = rule.details[idx]
  if (!d) return e.reply(`编号 ${m[2]} 超出范围（共 ${rule.details.length} 条）`)

  const lines = []
  lines.push(`【${char.name} · 第 ${idx + 1} 条】`)
  lines.push(`标题：${d.title || '无'}`)

  if (typeof d.dmg === 'function') {
    // 直接取函数源码，保证说明与实际计算永远一致
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

  e.reply(lines.join('\n'))
  return true
}

/** #胡桃面板计算 来源 */
async function showSource (e) {
  const m = /^#(\S+?)面板计算\s+来源$/.exec(e.msg.trim())
  if (!m) return false
  if (!canView(e)) return e.reply('当前仅白名单成员可以查看')
  const char = resolveChar(m[1])
  if (!char) return e.reply(`没找到角色「${m[1]}」`)
  const rule = await getRule(char)
  if (!rule) return e.reply(`${char.name} 没有可用的计算规则`)

  const lsVer = getLiangshiVersion()
  const lines = [
    `【${char.name} · 规则来源】`,
    `类型：${rule.source}`,
    `署名：${rule.createdBy}`
  ]
  if (lsVer) lines.push(`梁氏版本：${lsVer}`)
  lines.push(`条目数：${rule.details.length} 条`)
  lines.push(`主属性：${rule.mainAttr.split(',').map(k => ATTR_SHOW[k] || k).join('、')}`)
  e.reply(lines.join('\n'))
  return true
}

const HELP_TEXT = [
  '【面板计算使用说明】',
  '',
  '查看：',
  '  #胡桃面板计算            打开计算控制台',
  '  #胡桃面板计算 看 2       看第 2 条伤害是怎么算的',
  '  #胡桃面板计算 来源       看当前用的是哪份规则',
  '',
  '切换方案：',
  '  #胡桃面板计算 方案       查看当前方案',
  '  #胡桃面板计算 方案 基础   用梁氏基础档',
  '  #胡桃面板计算 方案 上游   用 miao 自带',
  '',
  '管理条目：',
  '  #胡桃面板计算 停用 2,4   停用第 2、4 条',
  '  #胡桃面板计算 启用 2     重新启用',
  '  #胡桃面板计算 撤销       回退上一步修改',
  '  #胡桃面板计算 重置       清空该角色全部自定义',
  '',
  '评分权重：',
  '  #胡桃面板权重 暴击=80 精通=60',
  '  详细用法发 #面板权重帮助',
  '',
  '权限：修改需要白名单，主人不受限'
].join('\n')

/** #面板计算帮助 */
async function help (e) {
  e.reply(HELP_TEXT)
  return true
}

app.reg({
  help: { name: '面板计算说明', fn: help, rule: /^#(面板计算|\S+面板计算)帮助$/ },
  showConsole: { name: '计算控制台', fn: showConsole, rule: /^#(\S+?)面板计算$/ },
  showEntry: { name: '查看计算条目', fn: showEntry, rule: /^#(\S+?)面板计算\s+看\s*\d+$/ },
  showSource: { name: '查看规则来源', fn: showSource, rule: /^#(\S+?)面板计算\s+来源$/ }
})

export default app
