export const TeamBuff_Kamisato_Ayato = [
{
  check: ({ params }) => params.team === true && params.Kamisato_Ayato === true,
  title: '神里绫人4命：[不厌细流] 施放神里流·水囿后，队伍中附近的角色普通攻击的攻击速度提升[_aSpeed]%',
  cons: 4,
  data: {
    _aSpeed: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Kamisato_Ayato === true,
  title: '神里绫人技能：[神里流·水囿] 普通攻击伤害提升[aDmg]%',
  data: {
    aDmg: 20
  }
}]
