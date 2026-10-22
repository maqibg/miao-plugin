import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1225ranking = cfg.sr1225ranking
let aName = '普通攻击'
let zName = '冉冉方炽'
let eName = '有道祥见，衔书摇风'
let eNameT = 'E'
let qName = '阳极照世，离火满缀'
let qNameT = 'Q'
let tName = '天赋'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '焕焕辰尾'
  eNameT = '有道祥见，衔书摇风'
  qNameT = '阳极照世，离火满缀'
  tName = '善盈后福，德气流布'
 } else if ( NamePath == 3 ) {
  eNameT = '有道祥见，衔书摇风'
  qNameT = '阳极照世，离火满缀'
  tName = '善盈后福，德气流布'
 } else if ( NamePath == 4 ) {
  zName = '强化普攻'
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  zName = '强普'
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  zName = 'Z'
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  tName = 'T'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f','c','e','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1225ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'z'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[忘归人] 排名规则均未命中，已选择默认排名规则')
       ranking = 'z'
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
 ranking = `${sr1225ranking}`
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
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${zName}主目标单段伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a2['技能伤害'], 'a')
},
{
  title: `队友击破特攻提高`,
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: Format.percent(talent.e['击破特攻提高'] + ((6 + (attr.stance >= 220 ? 12 : 0)) * 2) / 100),
      type: 'text'
    }
  }
},
{
  title: `${qName}-精英敌人击破`,
  dmgKey: 'r',
  params: { toughness: 10 },
  dmg: ({ params, cons, talent }, { reaction }) => {
    return {
      avg: reaction('fireBreak').avg * ( params.toughness + 2 ) / 4
    }
  }
},
{
  title: `${qName}超击破伤害`,
  params: { toughness: 10 },
  dmg: ({ params, cons, talent }, { reaction }) => {
    return {
      avg: reaction('superBreak').avg / 0.9 * talent.t['超击破伤害'] * 2 * (1 + (cons >= 1 ? 0.5 : 0) + (cons >= 6 ? 0.5 : 0))
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,stance'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '敌人状态：[韧性] 具有[toughness]韧性上限',
  data: {
    toughness: ({ params }) => (params.toughness || 10)
  }
},
{
  check: ({ params }) => params.q === true,
  title: '忘归人技能：[有道祥见，衔书摇风] 持有【狐祈】的我方目标，击破特攻提高[stance]%，施放攻击时，使受到攻击的敌方目标防御力降低[enemyDef]%',
  data: {
    stance: ({ talent }) => talent.e['击破特攻提高'] * 100,
    enemyDef: ({ talent }) => talent.e['防御力降低'] * 100
  }
},
{
  title: '忘归人天赋：[善盈后福，德气流布] 忘归人在场时，敌方目标会被额外附上[_toughness]的【云火昭】',
  data: {
    _toughness: ({ params }) => (params.toughness || 10) * 40 / 100
  }
},
{
  title: '忘归人行迹：[涂山玄设] 击破特攻提高[stance]%，施放首次战技后立即恢复[skillPoints]点战技点。',
  tree: 2,
  data: {
    stance: 30,
    skillPoints: 1
  }
},
{
  title: '忘归人2魂：[瑞应之來，必昭有德] 当有敌方目标的弱点被击破时，恢复[_energyevery]点能量',
  cons: 2,
  data: {
    _energyevery: 3
 }
},
{
  title: '忘归人4魂：[自我离形，而今几姓] 造成的击破伤害提高[breakDmg]%',
  cons: 4,
  data: {
    breakDmg: 20
 }
},
 { title: `12.20最后修改：[12.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1225ranking} 更新日志:${renew} 其他信息:${information}` }]
