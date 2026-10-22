import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '阿贝多天赋：[白垩色的威压] 创生法·拟造阳华的刹那之花对[buff]%生命值的敌人造成的伤害提高[eDmg]%',
  data: {
    buff: ({ params, weapon, artis }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100)),
    eDmg: ({ params, weapon, artis }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100))) < 50 ? 25 : 0
  }
},
{
  title: '阿贝多天赋：[瓶中人的天慧] 释放诞生式·大地之潮时,使附近的队伍中角色的元素精通提高[mastery]点',
  data: {
    mastery: 125
  }
},
{
  title: '阿贝多1命：[伊甸之花] 创生法·拟造阳华生成的刹那之花绽放时，恢复[_energyevery]元素能量',
  cons: 1,
  data: {
    _energyevery: 1.2
  }
},
{
  title: '阿贝多2命：[显生之宙] 施放诞生式·大地之潮时，清除[buffCount]层生灭计数效果，提高诞生式·大地之潮的爆发伤害与生灭之花造成的伤害[qPlus]点',
  sort: 9,
  cons: 2,
  data: {
    buffCount: ({ params }) => params.Fatal_Reckoning || 0,
    qPlus: ({ params, attr, calc }) => (params.Fatal_Reckoning || 0) * calc(attr.def) * 1.2
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '阿贝多4命：[神性之陨] 处于阳华的领域中的队伍中当前场上角色，造成的下落攻击伤害提高[a3Dmg]%',
  cons: 4,
  data: {
    a3Dmg: 30
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '阿贝多6命：[无垢之土] 处在阳华的领域中的队伍中当前场上角色，若处于结晶反应产生的护盾庇护下，造成的伤害提高[dmg]%',
  cons: 6,
  data: {
    dmg: 17
  }
}]