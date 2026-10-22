export const TeamBuff_Chong_Yun = [
{
  check: ({ params }) => params.team === true && params.Chong_Yun === true,
  title: '重云天赋：[追冰剑诀] 灵刃·重华叠霜领域消失时唤出灵刃降低敌人[kx]%元素抗性',
  data: {
    kx: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Chong_Yun === true,
  title: '重云天赋：[吐纳真定] 处在灵刃·重华叠霜领域内的普通攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: ({ weaponTypeName }) => ['弓', '法器'].includes(weaponTypeName) ? 0 : 8
  }
},
{
  check: ({ params }) => params.team === true && params.Chong_Yun === true,
  title: '重云2命：[周天运转] 处于重华叠霜领域中获得[_cd]%冷却缩减',
  cons: 2,
  data: {
    _cd: 15
  }
}]