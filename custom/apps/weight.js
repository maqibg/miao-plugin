/**
 * #<角色>面板权重 —— 持久化评分权重
 *
 * 接管上游同名指令（优先级 29 抢在 30 之前），行为从「一次性」改为「持久保存」：
 * 改完直接出一张图，之后每次出面板都按新权重算，直到重置或修改。
 *
 * 只写 custom/data 下的用户数据，不碰梁氏目录与上游文件。
 */
import { App } from '#miao'
import { resolveChar, getCharOverride, charKey } from '../lib/rule.js'
import { saveOverride } from '../lib/override.js'
import { canEdit, canView } from '../lib/permission.js'
import { parseWeights, badAttrHint, fmtWeights } from '../lib/weights.js'
import { rerender } from '../lib/render.js'

const app = App.init({ id: 'calcWeight', name: '面板权重', priority: 29 })

const HELP_TEXT = [
  '【面板权重使用说明】',
  '',
  '一步步改（推荐新手）：#胡桃面板权重修改',
  '',
  '熟练后一行写完：#胡桃面板权重 暴击=80 精通=60',
  '查看：  #胡桃面板权重',
  '清除：  #胡桃面板权重 清除',
  '',
  '· 设置后一直生效，之后每次出面板都按新权重算',
  '· 没写的属性保持原样，只覆盖你写的那几个',
  '· 数值范围 0 ~ 100 的整数',
  '',
  '可用属性（中英文都认）：',
  '攻击力/攻击  生命值/生命  防御力/防御',
  '元素精通/精通  暴击率/暴击  暴击伤害/爆伤',
  '元素充能/充能  伤害加成/伤害  治疗加成/治疗  物理伤害',
  '',
  '权限：需要在白名单内，主人不受限'
].join('\n')

/** #面板权重帮助 */
async function help (e) {
  e.reply(HELP_TEXT)
  return true
}

async function handler (e) {
  const m = /^#(\S+?)面板权重\s*([\s\S]*)$/.exec(e.msg.trim())
  if (!m) return false
  const char = resolveChar(m[1])
  if (!char) return e.reply(`没找到角色「${m[1]}」，换个名字试试`)
  const arg = (m[2] || '').trim()
  if (/^帮助$/.test(arg)) return help(e)
  const ov = getCharOverride(char) || {}

  // 不带参数：查看当前权重（查看也受只读开关约束）
  if (!arg) {
    if (!canView(e)) return e.reply('当前仅白名单成员可以查看，请联系主人')
    e.reply(`${char.name} 当前权重：${fmtWeights(ov.weights)}\n修改：#${char.name}面板权重 暴击=80 精通=60\n清除：#${char.name}面板权重 清除`)
    return true
  }

  if (!canEdit(e)) {
    return e.reply(`${char.name}：你没有修改权限\n（主人可用 #计算权限 添加 @你）`)
  }

  if (/^(清除|重置|默认)$/.test(arg)) {
    delete ov.weights
    saveOverride(charKey(char), char.game, ov)
    e.reply(`已清除 ${char.name} 的自定义权重，恢复默认`)
    await rerender(e, char)
    return true
  }

  const { out, bad } = parseWeights(arg)
  if (bad.length) return e.reply(badAttrHint(bad))
  if (!Object.keys(out).length) return e.reply(`没有识别到有效权重，例如：#${char.name}面板权重 暴击=80`)

  ov.weights = { ...(ov.weights || {}), ...out }
  saveOverride(charKey(char), char.game, ov)
  e.reply(`已更新 ${char.name} 权重：${fmtWeights(ov.weights)}`)
  await rerender(e, char)
  return true
}

app.reg({
  help: { name: '面板权重说明', fn: help, rule: /^#(面板权重|\S+面板权重)帮助$/ },
  handler: { name: '设置面板权重', fn: handler, rule: /^#(\S+?)面板权重\s*.*$/ }
})

export default app
