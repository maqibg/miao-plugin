import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '久岐忍技能：[御咏鸣神刈山祭] 施放时生命值[buff]%，结界的持续时间将会延长[_qSustainedPlus]秒',
  data: {
    buff: ({ params, weapon }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    _qSustainedPlus: ({ params, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 0 : 1
  }
},
{
  title: '久岐忍天赋：[破笼之志] 生命值[buff]%，治疗加成提升[heal]%',
  data: {
    buff: ({ params, weapon }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    heal: ({ params, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 0 : 15
  }
},
{
  title: '久岐忍天赋：[安心之所] 越祓雷草之轮将获得[_heal]治疗量值,[ePlus]伤害值提升',
  data: {
    _heal: ({ attr, calc }) => calc(attr.mastery) * 75 / 100,
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 25 / 100
  }
},
{
  title: '久岐忍2命：[割舍侥幸之心] 越祓草轮的持续时间延长[_eSustainedPlus]秒',
  cons: 2,
  data: {
    _eSustainedPlus: 3
  }
},
{
  title: '久岐忍4命：[割舍封闭之心] 处于越祓草轮状态下的角色，在普通攻击、重击或下落攻击命中敌人时，雷草标将落在敌人所在的位置造成雷元素范围伤害。',
  cons: 4
},
{
  title: '久岐忍6命：[卓越的血脉] 生命值降至25.0%以下,或承受足以使她倒下的伤害时，会提升自身[_mastery]点精通 {此效果不会参与伤害计算}',
  cons: 6,
  data: {
    _mastery: 150
  }
}]