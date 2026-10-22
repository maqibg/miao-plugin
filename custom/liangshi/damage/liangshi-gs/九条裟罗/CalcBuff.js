import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '九条裟罗天赋：[不动心] 处于鸦羽天狗霆雷召咒的「乌羽护持」状态下时，瞄准射击的所需的蓄力时间减少[atkPlus]',
  data: {
    _a2Spell: 60
  }
},
{
  title: '九条裟罗天赋：[御公仪] 天狗咒雷•伏命中敌人后，队伍中所有角色恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: ({ attr, calc }) => calc(attr.recharge) / 100 * 1.2
  }
},
{
  check: ({ params, cons }) => (cons >= 2) || !params.TruceTime,
  title: '九条裟罗技能：[鸦羽天狗霆雷召咒] 天狗咒雷•伏使其范围内的当前场上当前角色获得攻击力加成[atkPlus]',
  data: {
    atkPlus: ({ attr, talent }) => talent.e['攻击力加成比例'] * attr.atk.base / 100
  }
},
{
  title: '九条1命：[乌眼] 天狗咒雷为角色施加攻击力提升效果或命中敌人后，鸦羽天狗霆雷召咒的冷却时间减少[_ecdPlus]秒',
  cons: 1,
  data: {
    _ecdPlus: 1
  }
},
{
  title: '九条2命：[鸦羽] 放鸦羽天狗霆雷召咒时，会在原本的位置留下能引发一次较弱的天狗咒雷•伏的「乌羽」，造成雷元素伤害',
  cons: 2
},
{
  title: '九条4命：[彻证] 煌煌千道镇式释放的天狗咒雷•雷砾增加至6.0道。',
  cons: 2
},
{
  check: ({ params, cons }) => (cons >= 2) || !params.TruceTime,
  title: '九条6命：[我界] 提处于天狗咒雷带来的攻击力提升效果状态下的角色，其雷元素伤害的暴击伤害提高[cdmg]%',
  cons: 6,
  data: {
    cdmg: 60
  }
}]