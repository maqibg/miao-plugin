/**
 * 三层规则的查找顺序
 *
 *   ① 用户自定义  custom/data/<游戏>/<角色>/
 *   ② 梁氏方案    custom/liangshi/damage/liangshi-<游戏>/<角色>/
 *   ③ miao 原生   resources/meta-<游戏>/character/<角色>/
 *
 * 本文件只负责 ①②，③ 由包装层在未命中时调用原函数完成。
 * 硬性约束：这里绝不写入梁氏目录，只读取。
 */
import fs from 'node:fs'
import { DATA_PATH, LS_PATH, dataDirName } from './context.js'
import { readJSON, writeJSON, bumpVersion } from './store.js'

/** 用户覆盖文件路径 */
export function overridePath (name, game = 'gs') {
  return `${DATA_PATH}/${game}/${dataDirName(name)}/override.json`
}

/** 读用户覆盖；没有或不合法返回 null */
export function getOverride (name, game = 'gs') {
  const ov = readJSON(overridePath(name, game), null)
  if (!ov || typeof ov !== 'object' || Array.isArray(ov)) return null
  return ov
}

/** 用户自己写的计算规则文件（整份替换时使用） */
export function customCalcPath (name, game = 'gs') {
  const file = `${DATA_PATH}/${game}/${dataDirName(name)}/calc_custom.js`
  return fs.existsSync(file) ? file : false
}

/** 梁氏方案文件路径；档位体现在文件名上（basic/concise/team/complete/develop） */
export function liangshiCalcPath (name, game = 'gs', scheme = 'basic') {
  const file = `${LS_PATH}/damage/liangshi-${game}/${name}/calc_${scheme}.js`
  return fs.existsSync(file) ? file : false
}

/** 梁氏评分权重文件路径 */
export function liangshiArtisPath (name, game = 'gs', scheme = 'basic') {
  const file = `${LS_PATH}/damage/liangshi-${game}/${name}/artis_${scheme}.js`
  return fs.existsSync(file) ? file : false
}

/** 梁氏方案是否已经同步到本地 */
export function liangshiReady () {
  return fs.existsSync(`${LS_PATH}/damage`)
}

/** 撤销历史文件 */
export function historyPath (name, game = 'gs') {
  return `${DATA_PATH}/${game}/${dataDirName(name)}/override.history.json`
}

/**
 * 写用户覆盖
 *
 * 写之前把旧内容压入历史（最多 5 条），保证改错能撤回；
 * 重置也走这里（写空对象），不物理删除文件，便于事后追溯。
 */
export function saveOverride (name, game = 'gs', data = {}) {
  const file = overridePath(name, game)
  const old = readJSON(file, null)
  if (old && typeof old === 'object' && Object.keys(old).length) {
    const hist = readJSON(historyPath(name, game), [])
    hist.unshift({ at: Date.now(), data: old })
    writeJSON(historyPath(name, game), hist.slice(0, 5))
  }
  writeJSON(file, data)
  bumpVersion()
  return data
}

/** 撤销一步：取最近一条历史写回 */
export function undoOverride (name, game = 'gs') {
  const hist = readJSON(historyPath(name, game), [])
  if (!Array.isArray(hist) || !hist.length) return false
  const last = hist.shift()
  writeJSON(historyPath(name, game), hist)
  writeJSON(overridePath(name, game), last.data || {})
  bumpVersion()
  return last.data || {}
}
