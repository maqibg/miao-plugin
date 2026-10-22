import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '迪卢克天赋：[永不休止] 重击的体力消耗降低[_a2StaminaPct]%，持续时间延长[_a2SustainedPlus]秒',
  data: {
    _a2StaminaPct: 50,
    _a2SustainedPlus: 3
  }
},
{
  check: ({ params }) => params.Dawn === true,
  title: '迪卢克天赋：[熔毁之翼] 黎明提供的元素附魔效果持续期间内获得[dmg]%元素伤害加成',
  data: {
    dmg: 20
  }
},
{
  title: '迪卢克1命：[罪罚裁断] 敌人生命值[buff]%，造成伤害提高[dmg]%',
  cons: 1,
  data: {
    buff: ({ params, weapon, artis }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100)),
    dmg: ({ params, weapon, artis }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : (artis['勇士之心'] == 4 ? 50 : 100))) >= 50 ? 15 : 0
  }
},
{
  title: '迪卢克2命：[罪罚裁断] 受到伤害[buff]次，攻击力提高[atkPct]%，攻击速度提高[_aSpeed]%',
  cons: 2,
  data: {
    buff: ({ params }) => params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0),
    atkPct: ({ params }) => Math.min((10 * (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0))), 30),
    _aSpeed: ({ params }) => Math.min((5 * (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0))), 15)
  }
},
{
  title: '迪卢克4命：[罪罚裁断] 施放逆焰之刃的[buff]秒后，下一段逆焰之刃的伤害提高[eDmg]%',
  cons: 4,
  data: {
    buff: ({ params }) => params.SkillsAfter || 0,
    eDmg: ({ params }) => (params.SkillsAfter || 0) >= 2 ? 40 : 0
  }
},
{
  title: '迪卢克6命：[清算黑暗的炎之剑] 施放逆焰之刃后，普通攻击的攻击速度提升[_aSpeed]%，造成伤害提高[aDmg]%',
  cons: 6,
  data: {
    _aSpeed: 30,
    aDmg: 30
  }
}]