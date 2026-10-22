import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '神里绫人技能：[神里流·镜花] 处于泷廻鉴花时抗打断能力提升[_interruption]%',
  data: {
    _interruption: 50,
  }
},
{
  title: '神里绫人技能：[神里流·镜花] [buffCount]层浪闪,提升瞬水剑造成的伤害[aPlus]',
  sort: 9,
  data: {
    buffCount: ({ params, cons }) => Math.min((params.Namisen || 2), (cons >= 2 ? 5 : 4)),
    aPlus: ({ params, attr, calc, talent, cons }) => calc(attr.hp) * talent.e['浪闪伤害值提高'] / 100 * Math.min((params.Namisen || 2), (cons >= 2 ? 5 : 4))
  }
},
{
  check: ({ params }) => params.Suiyuu === true,
  title: '神里绫人技能：[神里流·水囿] 普通攻击伤害提升[aDmg]%',
  data: {
    aDmg: ({ talent }) => talent.q['普通攻击伤害提升']
  }
},
{
  title: '神里绫人1命：[镜华风姿] 敌人当前生命值[buff]%,瞬水剑造成的伤害提升[aDmg]%',
  cons: 1,
  data: {
    buff: ({ params, artis }) => params.TargetHp || (artis['勇士之心'] == 4 ? 50 : 100),
    aDmg: ({ params, artis }) => (params.TargetHp || (artis['勇士之心'] == 4 ? 50 : 100)) > 50 ? 0 : 40
  }
},
{
  title: '神里绫人2命：[世有源泉] 处于[buff]层浪闪状态下,提升[hpPct]%生命上限',
  cons: 2,
  data: {
    buff: ({ params, cons }) => Math.min((params.Namisen || 2), (cons >= 2 ? 5 : 4)),
    hpPct: ({ params, cons }) => Math.min((params.Namisen || 2), (cons >= 2 ? 5 : 4)) >= 3 ? 50 : 0
  }
},
{
  title: '神里绫人4命：[不厌细流] 施放神里流·水囿后，队伍中附近的角色普通攻击的攻击速度提升[_aSpeed]%',
  cons: 4,
  data: {
    _aSpeed: 15
  }
},
{
  title: '神里绫人6命：[滥觞无底] 施放神里流·镜花之后,下一次瞬水剑攻击命中敌人时,将进行2.0次额外的瞬水剑攻击',
  cons: 6
}]