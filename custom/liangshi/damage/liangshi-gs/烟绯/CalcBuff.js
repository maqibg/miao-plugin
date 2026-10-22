import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '烟绯天赋：[关联条款] 通过重击消耗[buff]枚丹火印,会提升[a2Dmg]%元素伤害加成',
  data: {
    buff: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)),
    a2Dmg: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)) * 5
  }
},
{
  check: ({ params }) => params.Brilliance === true,
  title: '烟绯技能：[凭此结契] 每间隔一段时间赋予一枚丹火印并提高重击[a2Dmg]%的伤害',
  data: {
    a2Dmg: ({ talent }) => talent.q['重击伤害额外加成']
  }
},
{
  title: '烟绯技能：[普通攻击·火漆制印] [buff]枚丹火印降低[_stamina]%的体力消耗',
  data: {
    buff: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)),
    _stamina: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)) * 15
  }
},
{
  title: '烟绯1命：[占理不饶人] 进行重击时[buff]枚丹火印,提高咏唱期间[_interruption]%的抗打断能力,并额外降低本次重击[_a2StaminaPct]%的体力消耗',
  cons: 1,
  data: {
    buff: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)),
    _interruptionPct: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)) * 10,
    _a2Stamina: ({ params, cons }) => Math.min((params.Scarlet_Seal || 0), (cons >= 6 ? 4 : 3)) * 10
  }
},
{
  title: '烟绯2命：[最终解释权] 敌人生命值[buff]%，重击暴击率提高[a2Cpct]%',
  cons: 2,
  data: {
    buff: ({ params, artis }) => params.TargetHp || (artis['勇士之心'] == 4 ? 50 : 100),
    a2Cpct: ({ params, artis }) => (params.TargetHp || (artis['勇士之心'] == 4 ? 50 : 100)) < 50 ? 20 : 0
  }
},
{
  title: '烟绯6命：[是额外条款] 持有的丹火印最大数量增加一枚',
  cons: 6
}]
