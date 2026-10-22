/**
 * 计算修改（方案 / 条目启停 / 重置 / 撤销）
 *
 * 权重不在这里：统一走 #<角色>面板权重（见 weight.js）
 *
 * 全部落在 custom/data 下的 override.json，绝不改写梁氏目录与上游 miao，
 * 因此上游同步和梁氏同步都能安全覆盖。
 */
import { App } from '#miao'
import { resolveChar, getRule, getCharOverride, charKey } from '../lib/rule.js'
import { liangshiCalcPath, saveOverride, undoOverride } from '../lib/override.js'
import { normalizeCharName } from '../lib/context.js'
import { canEdit, canView } from '../lib/permission.js'

const app = App.init({ id: 'calcEdit', name: '计算修改', priority: 43 })


async function handleScheme (e, char, arg) {
  const key = arg.trim()
  const keyName = charKey(char)
  const ov = getCharOverride(char) || {}
  const current = ov.scheme === 'basic' ? '梁氏·基础' : 'miao 自带'

  if (!key) {
    return e.reply([
      `${char.name} 当前方案：${current}`,
      `切到梁氏：#${char.name}面板计算 方案 基础`,
      `切回 miao：#${char.name}面板计算 方案 上游`
    ].join('\n'))
  }
  if (/(上游|默认|miao|自带|取消)/i.test(key)) {
    delete ov.scheme
    saveOverride(keyName, char.game, ov)
    return e.reply(`已切回 miao 自带计算（${char.name}）`)
  }
  if (/^(基础|梁氏|liangshi)$/i.test(key)) {
    if (!liangshiCalcPath(normalizeCharName(keyName), char.game, 'basic')) {
      return e.reply('本地还没有同步梁氏方案，暂时用不了基础档\n需要管理员执行一次方案同步')
    }
    ov.scheme = 'basic'
    saveOverride(keyName, char.game, ov)
    return e.reply(`已切换 ${char.name} 为梁氏基础档\n发 #${char.name}面板 查看效果`)
  }
  return e.reply(`不认识的方案「${key}」\n可选：基础（梁氏）/ 上游（miao 自带）`)
}

async function handleEntries (e, char, arg, enabled) {
  const rule = await getRule(char)
  if (!rule) return e.reply(`${char.name} 没有可用的计算规则`)
  const idxList = String(arg).split(/[\s,，、]+/).filter(Boolean).map(Number)
  if (!idxList.length || idxList.some(n => !Number.isInteger(n))) {
    return e.reply(`请给条目编号，例如：#${char.name}面板计算 ${enabled ? '启用' : '停用'} 2,4`)
  }
  const invalid = idxList.filter(n => n < 1 || n > rule.details.length)
  if (invalid.length) {
    return e.reply(`编号超出范围：${invalid.join('、')}（共 ${rule.details.length} 条）`)
  }
  const ov = getCharOverride(char) || {}
  ov.entries = ov.entries || {}
  for (const n of idxList) {
    ov.entries[String(n - 1)] = { ...(ov.entries[String(n - 1)] || {}), enabled }
  }
  saveOverride(charKey(char), char.game, ov)
  return e.reply(`已${enabled ? '启用' : '停用'} ${char.name} 第 ${idxList.join('、')} 条\n发 #${char.name}面板 查看效果`)
}

async function handler (e) {
  const m = /^#(\S+?)面板计算\s+(方案|权重|停用|启用|重置|撤销)\s*(.*)$/.exec(e.msg.trim())
  if (!m) return false
  const [, charInput, action, arg] = m
  const char = resolveChar(charInput)
  if (!char) return e.reply(`没找到角色「${charInput}」`)

  // 只查方案属于"查看"，不应要求修改权限
  if (action === '方案' && !arg.trim()) {
    if (!canView(e)) return e.reply('当前仅白名单成员可以查看，请联系主人')
    return handleScheme(e, char, arg)
  }

  // 权重不属于这里的命令，给所有人明确引导（不必先有修改权限）
  if (action === '权重') {
    return e.reply(`改权重请用：#${char.name}面板权重 暴击=80 精通=60\n详细说明：#面板权重帮助`)
  }

  if (!canEdit(e)) {
    return e.reply(`${char.name}：你没有修改权限，可以查看但不能改\n（主人可用 #计算权限 添加 @你）`)
  }

  if (action === '重置') {
    saveOverride(charKey(char), char.game, {})
    return e.reply(`已清除 ${char.name} 的全部自定义，回到上游默认`)
  }
  if (action === '撤销') {
    const data = undoOverride(charKey(char), char.game)
    if (data === false) return e.reply(`${char.name} 没有可撤销的修改`)
    return e.reply(`已撤销 ${char.name} 的上一次修改`)
  }
  if (action === '方案') return handleScheme(e, char, arg)
  if (action === '停用') return handleEntries(e, char, arg, false)
  if (action === '启用') return handleEntries(e, char, arg, true)
  return false
}

app.reg({
  handler: { name: '计算修改', fn: handler, rule: /^#(\S+?)面板计算\s+(方案|权重|停用|启用|重置|撤销).*$/ }
})

export default app
