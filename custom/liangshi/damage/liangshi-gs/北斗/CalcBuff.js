import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Stormbreaker === true,
  title: '北斗技能：[斫雷] 创造环绕自身的雷兽之盾，使受到伤害降低[_reduction]%',
  data: {
    _reduction: 20
  }
},
{
  check: ({ params }) => params.BurstUse > 0,
  title: '北斗天赋：[霹雳连霄] 释放拥有最高伤害加成的捉浪后，普通攻击与重击造成的伤害提高[aDmg]%，攻击速度提高[_aSpeed]%',
  data: {
    aDmg: 15,
    a2Dmg: 15,
    _aSpeed: 15
  }
},
{
  title: '北斗2命：[赫赫雷涌起] 斫雷的闪电能额外攻击2.0个敌人。',
  cons: 2
},
{
  title: '北斗4命：[牵星觅乡岸] 受到攻击后的普通攻击附带额外雷元素伤害。',
  cons: 4
},
{
  check: ({ params }) => params.Stormbreaker === true,
  title: '北斗6命：[北斗祓幽孽] 斫雷持续期间，周围敌人的元素抗性降低[kx]%',
  cons: 6,
  data: {
    kx: 15
  }
}]