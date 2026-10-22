import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Niwabi_Enshou === true,
  title: '宵宫技能：[焰硝庭火舞] 在持续期间内,将普通攻击发射的箭矢转为炽焰箭并提高普通攻击造成的伤害[aMulti]%',
  data: {
    aMulti: ({ talent }) => talent.e['炽焰箭伤害'] - 100
  }
},
{
  title: '宵宫天赋：[袖火百景图] 在焰硝庭火舞的持续期间内,普通攻击命中[buff]次,将提供[dmg]%元素伤害加成',
  data: {
    buff:  ({ params }) => params.NormalHit || 1,
    dmg: ({ params }) => Math.min(((params.NormalHit || 1) * 2), 10)
  }
},
{
  title: '宵宫1命：[袖火百景图] 琉金云间草的琉金火光持续时间延长[_qSustainedPlus]秒,处于琉金火光影响下的敌人被击败时攻击力提高[atkPct]%',
  cons: 1,
  data: {
    _qSustainedPlus: 4,
    atkPct: 20
  }
},
{
  title: '宵宫2命：[万灯送火] 火元素伤害造成暴击后,获得[dmg]%元素伤害加成。',
  cons: 2,
  data: {
    dmg: 25
  }
},
{
  title: '宵宫4命：[花火职人心得] 琉金火光发生爆炸时,焰硝庭火舞的冷却时间减少[_cdPlus]秒',
  cons: 4,
  data: {
    _ecdPlus: 1.2
  }
},
{
  title: '宵宫6命：[长野原龙势流星群] 在焰硝庭火舞的持续期间内,主动进行普通攻击有50.0%几率发射一枚额外的炽焰箭',
  cons: 6
}]
