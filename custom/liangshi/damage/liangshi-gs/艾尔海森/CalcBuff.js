import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '艾尔海森天赋：[谜林道破] 光幕伤害与殊境·显象缚结造成的伤害提升[eDmg]%',
  sort: 9,
  data: {
    eDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery) ) * 0.1),
    qDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery) ) * 0.1)
  }
},
{
  title: '艾尔海森1命：[直观] 光幕攻击命中敌人时，将使共相·理式摹写的冷却时间减少[_cdPlus]秒',
  cons: 1,
  data: {
    _cdPlus: 1.2
  }
},
{
  title: '艾尔海森2命：[辩章] 产生[buffCount]枚琢光镜，使元素精通提升[mastery]点',
  cons: 2,
  data: {
    buffCount: ({ params }) => params.Chisel_Light_Mirror || 3 ,
    mastery: ({ params }) => Math.min(((params.Chisel_Light_Mirror || 3) * 50), 150)
  }
},
{
  title: '艾尔海森4命：[义贯] 施放殊境·显象缚结时,消耗[buffCount]枚琢光镜,获得[dmg]%元素伤害加成',
  cons: 4,
  data: {
    buffCount: ({ params }) => params.Chisel_Light_Mirror || 3 ,
    dmg: ({ params }) => Math.min(((params.Chisel_Light_Mirror || 3) * 10), 40)
  }
},
{
  check: ({ params }) => params.BurstAfter >= 2 || !params.BurstAfter,
  title: '艾尔海森6命：[正理] 琢光镜达到上限,提升暴击率[cpct]%,暴击伤害[cdmg]%',
  cons: 6,
  data: {
    cpct: 10,
    cdmg: 70
  }
}]
