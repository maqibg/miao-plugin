export const TeamBuff_Bei_Dou = [
{
  check: ({ params }) => params.team === true && params.Bei_Dou === true,
  title: '北斗技能：[斫雷] 创造环绕自身的雷兽之盾，使受到伤害降低[_reduction]%',
  data: {
    _reduction: 20
  }
},
{
  check: ({ params }) => params.team === true && params.Bei_Dou === true,
  title: '北斗6命：[北斗祓幽孽] 斫雷持续期间，周围敌人的元素抗性降低[kx]%',
  cons: 6,
  data: {
    kx: ({ element, params }) => ['雷'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
}]