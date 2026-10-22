/**
 * 自定义层钩子系统
 *
 * 全部采用「包装」：保存上游原函数，先查自定义，未命中原样交回。
 * 卸载时恢复原函数，保证删掉 custom 目录即回到未修改状态。
 */
import * as dmgRule from './dmgRule.js'
import * as dmgCalc from './dmgCalc.js'
import * as charCfg from './charCfg.js'
import * as artis from './artis.js'
import * as cache from './cache.js'

export function install () {
  return {
    dmgRule: dmgRule.install(),
    dmgCalc: dmgCalc.install(),
    charCfg: charCfg.install(),
    artis: artis.install(),
    cache: cache.install()
  }
}

export function uninstall () {
  return {
    dmgRule: dmgRule.uninstall(),
    dmgCalc: dmgCalc.uninstall(),
    charCfg: charCfg.uninstall(),
    artis: artis.uninstall(),
    cache: cache.uninstall()
  }
}
