/**
 * 修改权限：谁能看、谁能改
 *
 * 模型：
 *   可改 = 主人
 *        || (白名单启用 && 用户在成员白名单 && (群白名单为空 || 当前群在群白名单))
 *   可看 = 可改 || 允许只读
 *
 * 三个开关的准确含义：
 *   enabled  = 白名单总开关。关闭后除主人外一律禁止修改（不是"全开放"）。
 *   users    = 允许修改的人。
 *   groups   = 修改地点的白名单。为空表示不限地点；非空表示只有名单里的用户
 *              在指定群发言时才能改，群里其他成员依旧不能改。
 */
import fs from 'node:fs'
import { CONFIG_PATH } from './context.js'
import { readJSON, writeJSON } from './store.js'

const FILE = `${CONFIG_PATH}/permission.json`

const DEFAULT = {
  // true = 启用白名单；false = 关闭白名单，除主人外所有人禁止修改
  enabled: true,
  // 允许修改的 QQ 号（跨群、私聊都生效；若设置了群白名单则限定在那些群里）
  users: [],
  // 允许修改的地点：为空 = 不限地点；非空 = 只有这里的群允许修改
  groups: [],
  // 不在名单里的人能否查看（建议保持 true）
  readonly: true
}

export function load () {
  const cfg = readJSON(FILE, null)
  if (!cfg || typeof cfg !== 'object') {
    if (!fs.existsSync(FILE)) writeJSON(FILE, DEFAULT)
    return { ...DEFAULT }
  }
  return {
    ...DEFAULT,
    ...cfg,
    users: Array.isArray(cfg.users) ? cfg.users : [],
    groups: Array.isArray(cfg.groups) ? cfg.groups : []
  }
}

export function save (cfg) {
  writeJSON(FILE, cfg)
}

export function canEdit (e) {
  if (!e) return false
  if (e.isMaster) return true

  const cfg = load()
  // 关闭白名单 = 锁定，只有主人能改
  if (!cfg.enabled) return false

  // 必须在成员白名单里
  const uid = String(e.user_id || '')
  if (!cfg.users.some(u => String(u) === uid)) return false

  // 群白名单为空表示不限地点；非空表示只能在列出的群里改
  if (!cfg.groups.length) return true
  return e.isGroup && cfg.groups.some(g => String(g) === String(e.group_id || ''))
}

export function canView (e) {
  if (!e) return false
  if (e.isMaster) return true
  if (canEdit(e)) return true
  return load().readonly !== false
}
