import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1401ranking = cfg.sr1401ranking
let aName = '普通攻击'
let eName = '格局打开'
let eNameT = 'E'
let qName = '早说了是魔法吧'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '开窍了吗'
  eNameT = '格局打开'
  qNameT = '早说了是魔法吧'
 } else if ( NamePath == 3 ) {
  eNameT = '格局打开'
  qNameT = '早说了是魔法吧'
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
const miss = ['f','c','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1401ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'e'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'e'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[大黑塔] 排名规则均未命中，已选择默认排名规则')
       ranking = 'e'
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
 ranking = `${sr1401ranking}`
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
  title: `${eName}伤害`,
  params: { e: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `强化${eName}主目标伤害`,
  params: { e: 2 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e2['主目标伤害'], 'e')
},
{
  title: `强化${eName}相邻目标伤害`,
  params: { e: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e2['技能伤害'], 'e')
},
{
  title: `零层${qName}伤害`,
  params: { jd: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `满层${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` , jd: 99 }

export const buffs = [characterBuffSr,enemyBuffSr,
{
  check: ({ params }) => params.technique >= 1,
  title: '大黑塔秘技：[看看好看的] 战斗开始时攻击力提高[atkPct]%',
  data: {
    atkPct: 60
  }
},
{
  title: '大黑塔技能：[早说了是魔法吧] 终结技施放时，攻击力提高[atkPct]%',
  data: {
    atkPct: ({ talent }) => talent.q['攻击力提高'] * 100
  }
},
{
  check: ({ params }) => params.e >= 1,
  title: '大黑塔天赋：[拿来吧你] 队伍中的「智识」命途角色大于等于2名，目标持有[_buff]层【解读】,造成的伤害值提高[ePlus]',
  data: {
    _buff: ({ params }) => Math.min(42, params.jd),
    ePlus: ({ talent, params, calc, attr }) => (params.e == 2 ? talent.t['主目标每层倍率'] : talent.t['相邻目标每层倍率']) * Math.min(42, params.jd) * calc(attr.atk) * 2
  }
},
{
  title: '大黑塔行迹：[冷漠的诚实] 每击中1个目标就固定恢复[_energyevery]点能量',
  tree: 1,
  data: {
    _energyevery: 3
  }
},
{
  check: ({ params }) => params.e >= 1,
  title: '大黑塔行迹：[冷漠的诚实] 主目标的【解读】层数为[_buff],造成的伤害提高[eDmg]%',
  tree: 1,
  data: {
    _buff: ({ params }) => Math.min(42, params.jd),
    eDmg: ({ params }) => params.jd >= 42 ? 50 : 0
  }
},
{
  title: '大黑塔行迹：[视界外来信] 队伍中的「智识」命途角色大于等于2名，暴击伤害提高[cdmg]%',
  tree: 2,
  data: {
    cdmg: 80
  }
},
{
  title: '大黑塔行迹：[饥饿的地景] 敌方目标每被施加[_buff]层【谜底】，使终结技的伤害值提高[qPlus]',
  tree: 3,
  data: {
    _buff: ({ params }) => Math.min(99, params.jd),
    qPlus: ({ params, calc, attr }) => Math.min(99, params.jd) * calc(attr.atk) / 100
  }
},
{
  title: '大黑塔4魂：[第十六把钥匙] 队伍中的「智识」命途角色的速度提高[speedPct]%',
  cons: 4,
  data: {
    speedPct: 12
 }
},
{
  title: '大黑塔6魂：[甜饵般的答案] 冰属性抗性穿透提高[kx]%,当场上3名敌方目标，终结技的伤害值提高[qPlus]',
  sort: 9,
  cons: 6,
  data: {
    kx: 20,
    qPlus: ({ calc, attr }) => calc(attr.atk) * 4
 }
},
 { title: `1.17最后修改：[1.3重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1401ranking} 更新日志:${renew} 其他信息:${information}` }]
