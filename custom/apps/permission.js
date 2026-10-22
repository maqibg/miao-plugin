/**
 * 修改权限管理（仅主人可用）
 *
 * 权限模型：
 *   主人           → 永远可以改，不受任何开关限制
 *   成员白名单     → 这些 QQ 号在私聊和群聊里都能改
 *   群白名单       → 只有在该群内发言才能改（群成员各自生效）
 *   不在以上名单   → 只能查看，不能改
 *
 * 关键约束：群号和 QQ 号都是数字、无法从格式区分，所以群操作必须显式写「群」，
 * 并且在加成员时对可疑长度给出提示，避免再次落错名单。
 */
import { App } from '#miao'
import { load, save } from '../lib/permission.js'

const app = App.init({ id: 'calcPerm', name: '计算权限', priority: 44 })

function fmtList (list, mark) {
  if (!list.length) return '（空）'
  return list.map(v => (mark && String(v) === mark ? `${v}（本群）` : String(v))).join('、')
}

function showConfig (e) {
  const cfg = load()
  const gid = e.isGroup ? String(e.group_id || '') : ''
  const lines = [
    '【计算权限】',
    `白名单：${cfg.enabled ? '启用（仅名单内的成员可改）' : '关闭（除主人外一律禁止修改）'}`,
    `修改地点：${cfg.groups.length ? '仅限指定群' : '不限（私聊也可）'}`,
    `只读开放：${cfg.readonly ? '是（任何人都能查看）' : '否'}`,
    `可修改成员：${fmtList(cfg.users)}`,
    `可修改群：${fmtList(cfg.groups, gid)}`,
    '',
    '说明：',
    '· 能改的人 = 主人 + 成员白名单',
    '· 群白名单为空：名单内成员在任何群和私聊都能改',
    '· 加了群白名单：名单内成员只能在这些群里改，私聊和其他群都不行',
    '· 群里的普通成员不会因为加了群就获得权限',
    '· 关闭白名单 = 除主人外所有人禁止修改',
    '',
    '设置方法（仅主人）：',
    '#计算权限 开启 / 关闭',
    '#计算权限 添加 @某人    或  添加 QQ号',
    '#计算权限 移除 @某人    或  移除 QQ号',
    '#计算权限 添加群            把当前群加进去',
    '#计算权限 添加群 群号       指定群',
    '#计算权限 移除群 [群号]'
  ]
  e.reply(lines.join('\n'))
  return true
}

/** 取出要操作的 QQ 号：优先 @，其次纯数字 */
function pickTarget (e, text) {
  const at = String(e.at || '').trim()
  if (at && /^\d{5,}$/.test(at)) return at
  const num = /(\d{5,})/.exec(text || '')
  return num ? num[1] : ''
}

async function handler (e) {
  const m = /^#计算权限\s*(.*)$/.exec(e.msg.trim())
  if (!m) return false
  if (!e.isMaster) {
    return e.reply('只有主人可以管理计算权限')
  }
  const arg = (m[1] || '').trim()
  if (!arg) return showConfig(e)

  const cfg = load()

  if (/^开启$/.test(arg)) {
    cfg.enabled = true
    save(cfg)
    return e.reply('已启用白名单：只有成员白名单里的人可以修改\n群里其他人只能查看')
  }
  if (/^关闭$/.test(arg)) {
    cfg.enabled = false
    save(cfg)
    return e.reply('已关闭白名单：除主人外所有人禁止修改计算和面板权重\n重新放开发：#计算权限 开启')
  }
  if (/^只读\s*(开启|关闭)$/.test(arg)) {
    cfg.readonly = /开启/.test(arg)
    save(cfg)
    return e.reply(`只读已${cfg.readonly ? '开启' : '关闭'}`)
  }

  // 群操作：必须带「群」字，可跟群号；不跟则用当前群
  // 这里放在成员分支之前，且允许尾部群号，避免「添加群 123456」落进成员名单
  const gm = /^(添加|移除)\s*群\s*(\d{5,})?$/.exec(arg)
  if (gm) {
    const add = gm[1] === '添加'
    const gid = gm[2] || (e.isGroup ? String(e.group_id || '') : '')
    if (!gid) {
      return e.reply('私聊里添加群需要带群号，例如：#计算权限 添加群 123456789')
    }
    const had = cfg.groups.some(g => String(g) === gid)
    cfg.groups = cfg.groups.filter(g => String(g) !== gid)
    if (add) cfg.groups.push(gid)
    save(cfg)
    if (add) {
      return e.reply(`已把群 ${gid} 加入允许修改的地点\n注意：群只限定地点，还需要把人加进成员白名单\n例如：#计算权限 添加 @某人`)
    }
    return e.reply(had ? `已移除群 ${gid} 的修改权限` : `群 ${gid} 本来就不在名单里`)
  }

  // 成员操作：@ 或 QQ 号
  const m2 = /^(添加|移除)\s*(.+)$/.exec(arg)
  if (m2) {
    const add = m2[1] === '添加'
    const uid = pickTarget(e, m2[2])
    if (!uid) {
      return e.reply('没识别到 QQ 号，可以 @ 一下对方，或直接写 QQ 号')
    }
    const had = cfg.users.some(u => String(u) === uid)
    cfg.users = cfg.users.filter(u => String(u) !== uid)
    if (add) cfg.users.push(uid)
    save(cfg)

    const tip = uid.length >= 8
      ? '\n提示：如果这是一个群号，请改用 #计算权限 添加群 ' + uid
      : ''
    if (add) return e.reply(`已添加成员 ${uid}（私聊和群聊都能改）${tip}`)
    return e.reply(had ? `已移除成员 ${uid}` : `成员 ${uid} 本来就不在名单里`)
  }

  e.reply('没看懂这个操作，发 #计算权限 查看用法')
  return true
}

app.reg({
  handler: { name: '计算权限管理', fn: handler, rule: /^#计算权限\s*.*$/ }
})

export default app
