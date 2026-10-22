import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Yakshas_Mask === true,
  title: '魈技能：[靖妖傩舞] 大幅提升跳跃能力攻击范围与[aDmg]%攻击伤害',
  data: {
    aDmg: ({ talent }) => talent.q['普通攻击/重击/下落攻击伤害提升'],
    a2Dmg: ({ talent }) => talent.q['普通攻击/重击/下落攻击伤害提升'],
    a3Dmg: ({ talent }) => talent.q['普通攻击/重击/下落攻击伤害提升']
  }
},
{
  check: ({ params }) => params.Yakshas_Mask === true,
  title: '魈天赋：[降魔·平妖大圣] 在靖妖傩舞状态下,成的所有伤害提高[dmg]%',
  data: {
    dmg: ({ params }) => Math.min((Math.floor((params.BurstAfter || 0) / 3) + 1) * 5, 25)
  }
},
{
  title: '魈天赋：[坏劫·国土碾尘] 施放[buff]次元素战技，使风轮两立造成的伤害提高[eDmg]%',
  data: {
    buff: ({ params }) => params.SkillsUse || 1,
    eDmg: ({ params }) => Math.min(((params.SkillsUse || 1) - 1) * 15, 45)
  }
},
{
  title: '魈1命：[坏劫·毁坏三界] 风轮两立的可使用次数增加[_eIncreases]次',
  cons: 1,
  data: {
    _eIncreases: 1
  }
},
{
  check: ({ params }) => params.TruceTime > 0,
  title: '魈2命：[空劫·虚空华开敷变] 处在队伍后台时，元素充能效率提高[recharge]%',
  cons: 2,
  data: {
    recharge: 25
  }
},
{
  title: '魈4命：[神通·诸苦灭尽] 当前[buff]%生命值，获得[defPct]%的防御力',
  cons: 4,
  data: {
    buff: ({ params, weapon, artis }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    defPct: ({ params, weapon, artis }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) >= 50 ? 0 : 100
  }
},
{
  title: '魈6命：[降魔·护法夜叉] 在靖妖傩舞状态下,下落攻击命中至少2.0个敌人时,风轮两立立刻获得1.0次可使用次数,并且在接下来可以无视冷却时间施放风轮两立。',
  cons: 6
}]
