/**
 * 引导式修改（面向不熟悉命令写法的用户）
 *
 *   #胡桃面板权重修改   → 选属性 → 填数值 → 保存出图
 *   #胡桃面板计算修改   → 选方案 / 开关条目 / 看公式
 *
 * 与一行式命令完全共存，最终都落到同一份 override 数据上。
 *
 * 三个关键约束（框架层面没有替我们处理）：
 *   1. 会话状态在内存里，重启即丢；超时 3 分钟自动失效
 *   2. 进入交互后所有消息都会被接住，所以「# 开头」必须主动放行给正常指令
 *   3. 框架取上下文只认 QQ 号，同一个人在其他群发的数字也会被接到，
 *      因此每个会话都记下群号，不匹配就拒绝，避免跨群串话
 */
import { App } from '#miao'
import { resolveChar, getRule, getCharOverride, charKey } from '../lib/rule.js'
import { saveOverride } from '../lib/override.js'
import { canEdit } from '../lib/permission.js'
import { fmtWeights, parseWeights, badAttrHint } from '../lib/weights.js'
import { attrLabel, formatEntryText } from '../lib/entry-view.js'
import { rerender } from '../lib/render.js'
import { liangshiCalcPath } from '../lib/override.js'
import { normalizeCharName } from '../lib/context.js'

const app = App.init({ id: 'calcInteractive', name: '计算引导', priority: 28 })

const TIMEOUT = 180 // 秒
const sessions = new Map()

const ATTR_LIST = [
  ['atk', '攻击力'], ['hp', '生命值'], ['def', '防御力'], ['mastery', '元素精通'],
  ['cpct', '暴击率'], ['cdmg', '暴击伤害'], ['recharge', '元素充能'],
  ['dmg', '伤害加成'], ['heal', '治疗加成'], ['phy', '物理伤害']
]

function sessionKey (e) {
  // 与框架的上下文 key 保持一致（只认 QQ 号）。
  // 若把群号也放进 key，用户在别的群发言时根本查不到会话，会静默无响应。
  return String(e.user_id || '')
}

function groupKey (e) {
  return e.isGroup ? String(e.group_id) : 'private'
}

/** 顺手清掉过期会话，避免长期占内存 */
function pruneSessions () {
  const now = Date.now()
  for (const [k, v] of sessions) {
    if (!v || v.expireAt < now) sessions.delete(k)
  }
}

/** 权重菜单 */
function weightMenu (state) {
  const lines = [`【${state.char.name} · 权重修改】`]
  lines.push(`当前：${fmtWeights(state.draft)}`)
  lines.push('')
  lines.push('回复编号选择要改的属性：')
  ATTR_LIST.forEach(([key, label], i) => {
    const cur = state.draft[key]
    const tail = cur === undefined ? '' : `（当前 ${cur}）`
    lines.push(` ${String(i + 1).padStart(2)} ${label}${tail}`)
  })
  lines.push('')
  lines.push(' 0 保存并出图')
  lines.push(' r 恢复默认权重')
  lines.push(' # 取消')
  return lines.join('\n')
}

/** 计算主菜单 */
function calcMenu (state) {
  const total = state.rule.details.length
  const off = state.rule.details.filter(d => d._disabled).length
  const ov = getCharOverride(state.char) || {}
  const scheme = ov.scheme === 'basic' ? '梁氏基础' : 'miao 自带'
  const lines = [
    `【${state.char.name} · 计算修改】`,
    `方案：${scheme}`,
    `条目：${total} 条${off ? `（其中 ${off} 条已停用）` : ''}`,
    '',
    ' 1 切换计算方案',
    ' 2 启用 / 停用条目',
    ' 3 查看某一条怎么算',
    ' 0 完成',
    '',
    '# 取消'
  ]
  return lines.join('\n')
}

/** 方案列表 */
function schemeMenu (state) {
  const ov = getCharOverride(state.char) || {}
  const hasLiang = !!liangshiCalcPath(normalizeCharName(charKey(state.char)), state.char.game, 'basic')
  const lines = [
    `【${state.char.name} · 切换方案】`,
    `当前：${ov.scheme === 'basic' ? '梁氏基础' : 'miao 自带'}`,
    '',
    ' 1 miao 自带（上游原始算法）',
    hasLiang ? ' 2 梁氏基础（条目更全，来自梁氏方案）' : ' 2 梁氏基础（本地尚未同步，暂不可用）',
    ' 0 返回'
  ]
  return lines.join('\n')
}

/** 条目列表（切换模式 / 查看模式共用） */
function entryMenu (state) {
  const mode = state.entryMode === 'view' ? '查看' : '启用 / 停用'
  const lines = [`【${state.char.name} · 条目${mode}】`, '回复编号操作：']
  state.rule.details.forEach((d, i) => {
    const off = d._disabled ? '（已停用）' : ''
    const star = i === state.rule.defDmgIdx ? '★' : ' '
    lines.push(` ${String(i + 1).padStart(2)} ${star} ${d.title || `条目${i + 1}`}${off}`)
  })
  lines.push('')
  lines.push(' 0 返回')
  lines.push(' # 取消')
  return lines.join('\n')
}

function open (self, e, state) {
  pruneSessions()
  state.expireAt = Date.now() + TIMEOUT * 1000
  state.groupKey = groupKey(e)
  sessions.set(sessionKey(e), state)
  self.setContext('interactive', false, TIMEOUT)
}

/** 权重保存并出图 */
async function finishWeight (e, state) {
  const ov = getCharOverride(state.char) || {}
  ov.weights = { ...state.draft }
  saveOverride(charKey(state.char), state.char.game, ov)
  e.reply(`已保存 ${state.char.name} 权重：${fmtWeights(state.draft)}`)
  await rerender(e, state.char)
}

/** #胡桃面板权重修改 */
async function weightEntry (e) {
  // 允许尾部直接带参数：#可莉面板权重修改 攻击力75 / 攻击力 75
  const m = /^#(\S+?)面板权重修改\s*([\s\S]*)$/.exec(String(e.msg || '').trim())
  if (!m) return false
  const char = resolveChar(m[1])
  if (!char) return e.reply(`没找到角色「${m[1]}」，换个名字试试`)
  if (!canEdit(e)) {
    return e.reply(`${char.name}：你没有修改权限\n（主人可用 #计算权限 添加 @你）`)
  }

  const arg = (m[2] || '').trim()
  if (arg) {
    // 带了参数就不进交互，直接一步到位
    if (/^(默认|重置|恢复默认)$/.test(arg)) {
      const cur = getCharOverride(char) || {}
      delete cur.weights
      saveOverride(charKey(char), char.game, cur)
      e.reply(`已恢复 ${char.name} 的默认权重`)
      await rerender(e, char)
      return true
    }
    const { out, bad } = parseWeights(arg)
    if (bad.length) return e.reply(badAttrHint(bad))
    if (!Object.keys(out).length) {
      return e.reply(`没识别到权重，例如：#${char.name}面板权重修改 暴击=80`)
    }
    const cur = getCharOverride(char) || {}
    cur.weights = { ...(cur.weights || {}), ...out }
    saveOverride(charKey(char), char.game, cur)
    e.reply(`已更新 ${char.name} 权重：${fmtWeights(cur.weights)}`)
    await rerender(e, char)
    return true
  }

  const ov = getCharOverride(char) || {}
  const state = {
    kind: 'weight',
    step: 'pick',
    char,
    draft: { ...(ov.weights || {}) }
  }
  open(this, e, state)
  e.reply(weightMenu(state))
  return true
}

/** #胡桃面板计算修改 */
async function calcEntry (e) {
  const m = /^#(\S+?)面板计算修改$/.exec(String(e.msg || '').trim())
  if (!m) return false
  const char = resolveChar(m[1])
  if (!char) return e.reply(`没找到角色「${m[1]}」，换个名字试试`)
  if (!canEdit(e)) {
    return e.reply(`${char.name}：你没有修改权限\n（主人可用 #计算权限 添加 @你）`)
  }
  const rule = await getRule(char)
  if (!rule) return e.reply(`${char.name} 没有可用的计算规则`)

  const state = { kind: 'calc', step: 'menu', char, rule }
  open(this, e, state)
  e.reply(calcMenu(state))
  return true
}

/** 权重：属性选择 */
async function weightPick (e, state, msg) {
  if (msg === '0') {
    await finishWeight(e, state)
    this.finish('interactive')
    sessions.delete(sessionKey(e))
    return true
  }

  // 恢复默认：先清空草稿，回复 0 才真正落盘（保留反悔余地）
  if (/^(默认|重置|恢复默认|r)$/i.test(msg)) {
    state.draft = {}
    e.reply(`已清空为默认权重，回复 0 保存生效\n\n${weightMenu(state)}`)
    return true
  }

  // 熟手可以直接写「暴击=80」，不必走两步；简称交给统一的权重解析
  if (/[=:：]/.test(msg)) {
    const { out, bad } = parseWeights(msg)
    if (Object.keys(out).length && !bad.length) {
      Object.assign(state.draft, out)
      const show = Object.entries(out)
        .map(([k, v]) => `${ATTR_LIST.find(([kk]) => kk === k)?.[1] || attrLabel(k)} = ${v}`)
        .join('、')
      e.reply(`已设为 ${show}\n\n${weightMenu(state)}`)
      return true
    }
    e.reply(`没认出「${msg}」\n属性名可以写简称，例如：暴击=80、爆伤=120、精通=60`)
    return true
  }

  const n = Number(msg)
  if (Number.isInteger(n) && n >= 1 && n <= ATTR_LIST.length) {
    const [key, label] = ATTR_LIST[n - 1]
    state.step = 'value'
    state.pendingAttr = key
    const cur = state.draft[key]
    e.reply(`请输入「${label}」的新数值（0~100）\n当前：${cur === undefined ? '默认' : cur}\n\n# 取消`)
    return true
  }

  e.reply(`没看懂「${msg}」，请回复 1~${ATTR_LIST.length} 的编号，或 0 保存\n\n${weightMenu(state)}`)
  return true
}

/** 权重：输入数值 */
async function weightValue (e, state, msg) {
  const n = Number(msg)
  if (!Number.isInteger(n) || n < 0 || n > 100) {
    e.reply('数值要是 0~100 的整数，请重新输入（# 取消）')
    return true
  }
  state.draft[state.pendingAttr] = n
  state.step = 'pick'
  const label = ATTR_LIST.find(([k]) => k === state.pendingAttr)?.[1] || attrLabel(state.pendingAttr)
  e.reply(`已设为 ${label} = ${n}\n\n${weightMenu(state)}`)
  return true
}

/** 计算：主菜单 */
async function calcMenuAction (e, state, msg) {
  if (msg === '0') {
    this.finish('interactive')
    sessions.delete(sessionKey(e))
    e.reply(`已完成，发 #${state.char.name}面板 查看效果`)
    return true
  }
  if (msg === '1') {
    state.step = 'scheme'
    e.reply(schemeMenu(state))
    return true
  }
  if (msg === '2') {
    state.step = 'entries'
    state.entryMode = 'toggle'
    e.reply(entryMenu(state))
    return true
  }
  if (msg === '3') {
    state.step = 'entries'
    state.entryMode = 'view'
    e.reply(entryMenu(state))
    return true
  }
  e.reply(`没看懂「${msg}」\n\n${calcMenu(state)}`)
  return true
}

/** 计算：方案选择 */
async function calcSchemeAction (e, state, msg) {
  if (msg === '0') {
    state.step = 'menu'
    e.reply(calcMenu(state))
    return true
  }
  const ov = getCharOverride(state.char) || {}
  if (msg === '1') {
    delete ov.scheme
    saveOverride(charKey(state.char), state.char.game, ov)
    state.rule = await getRule(state.char)
    state.step = 'menu'
    e.reply(`已切换为 miao 自带\n\n${calcMenu(state)}`)
    return true
  }
  if (msg === '2') {
    if (!liangshiCalcPath(normalizeCharName(charKey(state.char)), state.char.game, 'basic')) {
      e.reply('梁氏方案还没有同步到本地，暂时用不了这一项')
      return true
    }
    ov.scheme = 'basic'
    saveOverride(charKey(state.char), state.char.game, ov)
    state.rule = await getRule(state.char)
    state.step = 'menu'
    e.reply(`已切换为梁氏基础\n\n${calcMenu(state)}`)
    return true
  }
  e.reply(`没看懂「${msg}」，请回复 1、2 或 0`)
  return true
}

/** 计算：条目切换 / 查看 */
async function calcEntriesAction (e, state, msg) {
  if (msg === '0') {
    state.step = 'menu'
    e.reply(calcMenu(state))
    return true
  }
  const n = Number(msg)
  if (!Number.isInteger(n) || n < 1 || n > state.rule.details.length) {
    e.reply(`请回复 1~${state.rule.details.length} 的编号，或 0 返回`)
    return true
  }

  if (state.entryMode === 'view') {
    e.reply(formatEntryText(state.char, state.rule, n - 1) + '\n\n' + entryMenu(state))
    return true
  }

  const ov = getCharOverride(state.char) || {}
  ov.entries = ov.entries || {}
  const k = String(n - 1)
  const wasOff = ov.entries[k]?.enabled === false
  ov.entries[k] = { ...(ov.entries[k] || {}), enabled: wasOff }
  saveOverride(charKey(state.char), state.char.game, ov)
  state.rule = await getRule(state.char)
  const title = state.rule.details[n - 1]?.title || `第 ${n} 条`
  e.reply(`已${wasOff ? '启用' : '停用'}「${title}」\n\n${entryMenu(state)}`)
  return true
}

/** 交互消费：所有未命中正常指令的消息先进这里 */
async function interactive (e) {
  const key = sessionKey(e)
  const state = sessions.get(key)
  const msg = String(e.msg || '').trim()

  // 没有会话：放行给正常指令
  if (!state) {
    this.finish('interactive')
    return 'continue'
  }

  // 会话已过期
  if (state.expireAt < Date.now()) {
    sessions.delete(key)
    this.finish('interactive')
    e.reply('修改流程已超时，重新发指令即可')
    return true
  }

  // 别的群发来的消息：拒绝并提示，不当作输入
  if (state.groupKey !== groupKey(e)) {
    e.reply('你在另一个群有一个未完成的修改，先去处理或等待它超时')
    return true
  }

  // 以 # 开头：退出交互，交给正常指令
  if (msg.startsWith('#')) {
    sessions.delete(key)
    this.finish('interactive')
    return 'continue'
  }

  // 会话续命，避免用户思考一下就超时
  state.expireAt = Date.now() + TIMEOUT * 1000

  if (state.kind === 'weight') {
    if (state.step === 'value') return weightValue.call(this, e, state, msg)
    return weightPick.call(this, e, state, msg)
  }

  if (state.kind === 'calc') {
    if (state.step === 'menu') return calcMenuAction.call(this, e, state, msg)
    if (state.step === 'scheme') return calcSchemeAction.call(this, e, state, msg)
    if (state.step === 'entries') return calcEntriesAction.call(this, e, state, msg)
  }

  return true
}

app.reg({
  weightEntry: { name: '权重修改引导', fn: weightEntry, rule: /^#(\S+?)面板权重修改\s*.*$/ },
  calcEntry: { name: '计算修改引导', fn: calcEntry, rule: /^#(\S+?)面板计算修改$/ },
  // 规则本身不会被正则命中：上下文由 setContext 直接调用
  interactive: { name: '引导式交互', fn: interactive, rule: /^#__引导内部使用__$/ }
})

export default app
