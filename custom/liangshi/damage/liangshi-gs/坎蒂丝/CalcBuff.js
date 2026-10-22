import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Prayer_of_the_Crimson_Crown === true,
  title: '坎蒂丝技能：[圣仪·灰鸰衒潮] 角色的普通攻击对敌人造成元素伤害时，提高[aDmg]%造成的伤害',
  data: {
    aDmg: 20
  }
},
{
  check: ({ params }) => params.Prayer_of_the_Crimson_Crown === true,
  title: '坎蒂丝天赋：[漫沙陨穹] 处于圣仪·灰鸰衒潮的赤冕祝祷状态下的角色，普通攻击对敌人造成元素伤害时,伤害提高[aDmg]%',
  sort: 9,
  data: {
    aDmg: ({ attr, calc }) => Math.floor(calc(attr.hp) / 1000) * 0.5
  }
},
{
  title: '坎蒂丝1命：[赤沙的归嗣] 圣仪·灰鸰衒潮的赤冕祝祷状态持续时间延长[_qSustainedPlus]秒。',
  cons: 1,
  data: {
    _qSustainedPlus: 3
  }
},
{
  title: '坎蒂丝2命：[贯月的耀锋] 圣仪·苍鹭庇卫命中敌人时，坎蒂丝的生命值上限提升[hpPct]%',
  cons: 2,
  data: {
    hpPct: 20
  }
},
{
  title: '坎蒂丝4命：[守戍的誓命] 缩短圣仪·苍鹭庇卫长按的冷却时间[_ecdPlus]秒',
  cons: 4,
  data: {
    _ecdPlus: 3
  }
}]