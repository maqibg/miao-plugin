/**
 * 自定义层的 JSON 读写与版本号
 *
 * 版本号用于让 miao 的角色规则缓存失效：用户在群里改完权重/条目后，
 * 不需要重启就能在下一张面板图生效。
 */
import fs from 'node:fs'
import path from 'node:path'

/** 读取 JSON，文件不存在返回默认值；读坏时不静默吞掉，打日志并返回默认值 */
export function readJSON (file, def = null) {
  try {
    if (!fs.existsSync(file)) return def
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    console.error(`[miao-custom] 配置读取失败 ${file}: ${e.message}`)
    return def
  }
}

/** 写入 JSON，自动建目录；写入失败直接抛出，让调用方看到 */
export function writeJSON (file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

let version = 0

/** 每次写入用户数据后调用，使缓存层知道要重算 */
export function bumpVersion () {
  version++
  return version
}

export function getVersion () {
  return version
}
