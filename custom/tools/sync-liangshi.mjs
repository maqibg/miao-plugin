/**
 * 梁氏方案同步脚本
 *
 * 把 liangshi-calc 仓库里「计算用得到」的部分复制进 custom/liangshi/，
 * 并改写其中的路径，使它在 miao 包内仍能正常解析。
 *
 * 为什么不整仓库复制：resources/common 是 56MB 图片，计算完全用不到。
 * 复制范围：damage（768 个计算文件）、resources/CalcBuff、components、config。
 *
 * 路径改写规则（两类，顺序不能反）：
 *   1. import 里的相对引用  (../)+plugins/liangshi-calc/xxx  →  #liangshi/xxx
 *      （#liangshi/* 由 miao 的 package.json imports 解析到 custom/liangshi/*）
 *   2. 运行时 fs 读取的 cwd 路径  plugins/liangshi-calc/xxx  →  plugins/miao-plugin/custom/liangshi/xxx
 *
 * 用法：node plugins/miao-plugin/custom/tools/sync-liangshi.mjs [源目录]
 * 默认源目录：plugins/liangshi-calc
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../../..') // Yunzai 根目录
const MIAO = path.resolve(__dirname, '../..') // miao-plugin 根目录
const DEST = path.join(MIAO, 'custom', 'liangshi')
const SRC = path.resolve(ROOT, process.argv[2] || 'plugins/liangshi-calc')

const COPIES = ['damage', 'components', 'config', 'resources/CalcBuff', 'resources/FantasticalBlessings.js']

function log (msg) {
  console.log(`[sync-liangshi] ${msg}`)
}

if (!fs.existsSync(SRC)) {
  console.error(`[sync-liangshi] 源目录不存在：${SRC}`)
  console.error('本地已移除 liangshi-calc 插件时，可传入源目录参数，或直接依赖 GitHub Action 每日同步')
  process.exit(1)
}

const srcPkg = JSON.parse(fs.readFileSync(path.join(SRC, 'package.json'), 'utf8'))
const version = srcPkg.version || 'unknown'

log(`源：${SRC}（v${version}）`)
log(`目标：${DEST}`)

// 1. 复制（覆盖式，不删除目标里已有的文件，避免误删用户数据）
for (const rel of COPIES) {
  const from = path.join(SRC, rel)
  const to = path.join(DEST, rel)
  if (!fs.existsSync(from)) {
    log(`跳过（源中不存在）：${rel}`)
    continue
  }
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true, force: true })
  log(`已复制：${rel}`)
}

// 2. 改写路径
const IMPORT_REF = /(?:\.\.\/)+plugins\/liangshi-calc\//g
const CWD_REF = /plugins\/liangshi-calc\//g
let changedFiles = 0
let changedRefs = 0

function walk (dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.name.endsWith('.js')) {
      const before = fs.readFileSync(full, 'utf8')
      let count = 0
      const after = before
        .replace(IMPORT_REF, () => {
          count++
          return '#liangshi/'
        })
        .replace(CWD_REF, () => {
          count++
          return 'plugins/miao-plugin/custom/liangshi/'
        })
      if (count > 0) {
        fs.writeFileSync(full, after, 'utf8')
        changedFiles++
        changedRefs += count
      }
    }
  }
}

walk(DEST)
log(`路径改写：${changedFiles} 个文件，${changedRefs} 处引用`)

// 3. 记录版本，供控制台与图底部展示
//
// 只有版本号变化时才写 VERSION：syncedAt 是当天日期，无条件写入会让每天
// 都产生一条"只改日期"的空提交，把提交历史灌满。
// 同版本下梁氏改动的文件仍会通过 git diff 触发正常提交，不受影响。
const versionFile = path.join(DEST, 'VERSION')
let oldVersion = ''
try {
  oldVersion = JSON.parse(fs.readFileSync(versionFile, 'utf8')).version || ''
} catch {
  oldVersion = ''
}
if (oldVersion !== version) {
  fs.writeFileSync(versionFile, JSON.stringify({
    version,
    source: 'liangshi-calc',
    syncedAt: new Date().toISOString().slice(0, 10)
  }, null, 2), 'utf8')
  log(`VERSION：${oldVersion || '(无)'} → ${version}`)
} else {
  log(`VERSION 未变化（${version}），跳过写入`)
}
log('完成')
