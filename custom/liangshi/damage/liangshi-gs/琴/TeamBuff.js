export const TeamBuff_Jean = [
{
  check: ({ params }) => params.team === true && params.Jean === true,
  title: '琴2命：[守护众人的坚盾] 获得元素晶球或元素微粒时，队伍中所有角色获得[_aSpeed]%攻击速度和[_jSpeed]%移动速度提升',
  cons: 2,
  data: {
    _aSpeed: 15,
    _jSpeed: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Jean === true,
  title: '琴4命：[蒲公英的国土] 在蒲公英之风的领域内，所有敌人的元素抗性下降[kx]%',
  cons: 4,
  data: {
    kx: ({ element, params }) => ['风'].includes(element) ? (params.phy === true ? 0 : 40) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Jean === true,
  title: '琴6命：[恩眷万民的狮牙] 在蒲公英之风的领域内，角色受到的伤害降低[_reduction]%',
  cons: 6,
  data: {
    _reduction: 35
  }
}]