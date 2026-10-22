/**
 * 自检：确认钩子装上后，对上游 miao 的输出没有任何影响
 *
 * 做法：先记录上游原函数的输出，再安装钩子，逐个对比；最后卸载恢复。
 * 在任何一次上游同步之后跑一遍，能立刻发现 miao 是否改了函数签名或返回结构。
 * GitHub Action 里也会执行本脚本，失败即阻断合并结果上线。
 *
 * 运行：在仓库根目录执行  node custom/selfcheck.js
 */
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { install, uninstall } from './index.js'
import ProfileDmg from '../models/ProfileDmg.js'
import CharCfg from '../models/character/CharCfg.js'
import ArtisMarkCfg from '../models/artis/ArtisMarkCfg.js'
import { Character } from '../models/index.js'

const CASES = [
  ['胡桃', 'gs'],
  ['雷电将军', 'gs'],
  ['旅行者/岩', 'gs'],
  ['希儿', 'sr'],
  ['虚构角色名', 'gs']
]

let failed = 0
function assert (ok, label, detail = '') {
  if (ok) {
    console.log(`  ✓ ${label}`)
  } else {
    failed++
    console.log(`  ✗ ${label}${detail ? '\n    ' + detail : ''}`)
  }
}

function same (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

console.log('[miao-custom] 自检开始')

// 本机如果存在用户自定义数据，"无自定义时结果不变"会被真实覆盖影响，跳过该比对
const dataDir = fileURLToPath(new URL('./data/', import.meta.url))
const hasUserData = fs.existsSync(dataDir) &&
  fs.readdirSync(dataDir, { withFileTypes: true }).some(d => d.isDirectory() || d.isFile())
if (hasUserData) {
  console.log('  ! 检测到本机自定义数据，跳过「无自定义时结果不变」比对（Action 环境会自动执行）')
}

// 1. 记录上游原函数与基准输出
const originals = {
  dmg: ProfileDmg.dmgRulePath,
  dmgCalc: ProfileDmg.prototype.getCalcRule,
  calc: CharCfg.getCalcRule,
  artis: ArtisMarkCfg.getCharArtisCfg,
  charCalc: Character.prototype.getCalcRule,
  charArtis: Character.prototype.getArtisCfg
}
const beforeDmg = CASES.map(([name, game]) => originals.dmg(name, game))

// 2. 安装
const result = install()
for (const key of ['dmgRule', 'dmgCalc', 'charCfg', 'artis', 'cache']) {
  assert(result[key] === true, `${key} 钩子安装`)
}
assert(ProfileDmg.dmgRulePath !== originals.dmg, '伤害规则函数被包装')
assert(ProfileDmg.prototype.getCalcRule !== originals.dmgCalc, '面板条目函数被包装')
assert(CharCfg.getCalcRule !== originals.calc, '条目函数被包装')
assert(ArtisMarkCfg.getCharArtisCfg !== originals.artis, '权重函数被包装')
assert(Character.prototype.getCalcRule !== originals.charCalc, '角色缓存钩子被包装')

// 3. 无自定义数据时，输出必须与上游完全一致
if (!hasUserData) CASES.forEach(([name, game], i) => {
  const after = ProfileDmg.dmgRulePath(name, game)
  assert(
    same(beforeDmg[i], after),
    `无自定义时 ${name}(${game}) 结果不变`,
    `原: ${JSON.stringify(beforeDmg[i])}\n    现: ${JSON.stringify(after)}`
  )
})

// 4. 卸载后必须恢复成原函数
const un = uninstall()
for (const key of ['dmgRule', 'dmgCalc', 'charCfg', 'artis', 'cache']) {
  assert(un[key] === true, `${key} 钩子卸载`)
}
assert(ProfileDmg.dmgRulePath === originals.dmg, '伤害规则函数已恢复')
assert(ProfileDmg.prototype.getCalcRule === originals.dmgCalc, '面板条目函数已恢复')
assert(CharCfg.getCalcRule === originals.calc, '条目函数已恢复')
assert(ArtisMarkCfg.getCharArtisCfg === originals.artis, '权重函数已恢复')
assert(Character.prototype.getCalcRule === originals.charCalc, '角色缓存钩子已恢复')

console.log(failed === 0 ? '[miao-custom] 自检通过' : `[miao-custom] 自检失败 ${failed} 项`)
process.exit(failed === 0 ? 0 : 1)
