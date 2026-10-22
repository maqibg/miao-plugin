export const TeamBuff_Xing_Qiu = [
{
  check: ({ params }) => params.team === true && params.Xing_Qiu === true,
  title: '行秋技能：[古华剑·画雨笼山] 场上角色的抗打断能力提升[_interruption]%受到伤害降低[_reduction]%',
  data: {
    _interruption: 70,
    _reduction: 29 + 24
  }
},
{
  check: ({ params }) => params.team === true && params.Xing_Qiu === true,
  title: '行秋2命：[天青现虹] ,受到剑雨攻击的敌人元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: ({ element, params }) => ['水'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
}]