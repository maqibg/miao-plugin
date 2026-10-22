import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1313ranking = cfg.sr1313ranking
let aName = '普通攻击'
let eName = '纸与仪典的恩赐'
let eNameT = 'E'
let qName = '轻与伤痕的赞颂'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '闪烁的劝诫'
  eNameT = '纸与仪典的恩赐'
  qNameT = '轻与伤痕的赞颂'
 } else if ( NamePath == 3 ) {
  eNameT = '纸与仪典的恩赐'
  qNameT = '轻与伤痕的赞颂'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f','c','e','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1313ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'h'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'h'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[星期日] 排名规则均未命中，已选择默认排名规则')
       ranking = 'h'
      } else {
        ranking = `${rankingThreePath}`
      }
    } else {
      ranking = `${rankingTwoPath}`
    }
 } else {
  ranking = `${rankingOnePath}`
 }
} else {
 ranking = `${sr1313ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `队友暴击提高`,
  params: { q: true },
  dmg: ({ talent, attr, calc, cons }) => {
    return {
      avg: Format.percent(talent.t['暴击率提高'] * (cons >= 6 ? 3 : 1)),
      type: 'text'
    }
  }
},
{
  title: `队友暴伤提高`,
  params: { q: true },
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: Format.percent(talent.q['爆伤提高·固定值'] + talent.q['爆伤提高·百分比'] * calc(attr.cpct)),
      type: 'text'
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
{
  check: ({ params }) => params.technique >= 1,
  title: '星期日秘技：[荣光之秘] 对我方目标施放技能时，使目标造成的伤害提高[dmg]%',
  data: {
    dmg: 50
  }
},
{
  title: '星期日技能：[纸与仪典的恩赐] 造成的伤害提高[dmg]%',
  data: {
    dmg: ({ talent }) => talent.e['造成的伤害提高'] * 100
  }
},
{
  check: ({ params }) => params.q != true,
  title: '星期日技能：[轻与伤痕的赞颂] 恢复[_energyeveryPct]%能量上限的能量。暴击伤害提高[cdmg]%',
  sort: 9,
  data: {
    _energyeveryPct: 20,
    cdmg: ({ calc, attr, talent }) => talent.q['爆伤提高·固定值'] * 100 + talent.q['爆伤提高·百分比'] * calc(attr.cpct)
  }
},
{
  check: ({ params }) => params.q != true,
  title: '星期日天赋：[倾诉之肉身] 施放战技时，暴击率提高[cpct]%',
  data: {
    cpct: ({ talent }) => talent.t['暴击率提高'] * 100
  }
},
{
  title: '星期日行迹：[崇高拂尘] 战斗开始时，恢复[_energyevery]点能量',
  tree: 2,
  data: {
    _energyevery: 25
  }
},
{
  title: '星期日1魂：[常世道返三途无六钱] 施放战技时，使目标角色造成伤害时额外无视目标[ignore]%的防御,召唤物造成伤害时无视目标[summonedIgnore]%的防御',
  cons: 1,
  data: {
    ignore: 10,
    summonedIgnore: 30
 }
},
{
  title: '星期日2魂：[笃信补完微缺] 首次施放终结技后恢复[skillPoints]%。【蒙福者】造成的伤害提高[dmg]%',
  cons: 2,
  data: {
    skillPoints: 2,
    dmg: 30
 }
},
{
  title: '星期日4魂：[雕塑的卷首语] 回合开始时，恢复[_energyevery]点能量。',
  cons: 4,
  data: {
    _energyevery: 8
 }
},
{
  check: ({ params }) => params.q != true,
  title: '星期日6魂：[破邪显正应报无慈悲] 天赋的暴击率提高效果可以叠加3层',
  cons: 6,
  data: {
    cpct: 20
 }
},
{
  check: ({ params }) => params.q != true,
  title: '星期日6魂：[破邪显正应报无慈悲] 溢出[_cpct]%暴击率,提高[cdmg]%暴击伤害。',
  sort: 9,
  cons: 6,
  data: {
    _cpct: ({ calc, attr }) => Math.max(0,(calc(attr.cpct) - 100)),
    cdmg: ({ calc, attr }) => Math.max(0,(calc(attr.cpct) - 100)) * 2
 }
},
 { title: `12.20最后修改：[12.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1313ranking} 更新日志:${renew} 其他信息:${information}` }]
