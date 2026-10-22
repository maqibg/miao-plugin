import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '莫娜天赋：[「托付于命运吧!」] 元素伤害加成获得[dmg]%额外提升',
  sort: 9,
  data: {
    dmg: ({ calc, attr }) => calc(attr.recharge) * 0.2
  }
},
{
  title: '莫娜天赋：[「老太婆来抓我啊!」] 进入虚实流动状态2.0秒后凝聚一个虚影,破裂造成水元素范围伤害'
},
{
  check: ({ params }) => params.Omen === true ,
  title: '莫娜技能：[星命定轨] 处于泡影影响下的敌人受到伤害时,对敌人施加星异的伤害加成效果,并以此提高这一次造成的伤害[dmg]%',
  data: {
    dmg: ({ talent }) => talent.q['伤害加成']
  }
},
{
  check: ({ params }) => params.Omen === true ,
  title: '莫娜1命：[沉没的预言] 队伍中自己的角色攻击命中处于星异状态下的敌人后,感电反应造成的伤害提升[electroCharged]%,蒸发反应造成的伤害提升[vaporize]%,水元素扩散反应造成的伤害提升[swirl]%,冻结反应的持续时间延长[frozrntimePct]%。',
  cons: 1,
  data: {
    electroCharged: 15,
    vaporize: 15,
    swirl: 15,
    frozrntimePct: 15
  }
},
{
  title: '莫娜2命：[星月的连珠] 普通攻击命中时,自动施放一次重击',
  cons: 2,
},
{
  check: ({ params }) => params.Omen === true ,
  title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时，暴击率提升[cpct]%',
  cons: 4,
  data: {
    cpct: 15
  }
},
{
  title: '莫娜6命：[厄运的修辞] 进入虚实流动状态移动[buffCount]秒,重击伤害增加[a2Dmg]%',
  cons: 6,
  data: {
    buffCount: ({ params }) => params.Alternate_Sprint || 0,
    a2Dmg: ({ params }) => Math.min(((params.Alternate_Sprint || 0) * 60), 180)
  }
}]