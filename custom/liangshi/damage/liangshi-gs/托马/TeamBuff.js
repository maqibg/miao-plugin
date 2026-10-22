export const TeamBuff_Thoma = [
{
  check: ({ params }) => params.team === true && params.Thoma === true && !params.TruceTime,
  title: '托马天赋：[甲衣交叠] 当前场上自己的角色获取或刷新烈烧佑命护盾时,护盾强效提升[shieldPlus]%',
  data: {
    shield: 5 * 5
  }
},
{
  check: ({ params }) => params.team === true && params.Thoma === true,
  title: '托马6命：[炽烧的至心] 获取或刷新烈烧佑命护盾时,队伍中所有角色的普通攻击,重击与下落攻击造成的伤害提升[aDmg]%',
  cons: 6,
  data: {
    aDmg: 15,
    a2Dmg: 15,
    a3Dmg: 15
  }
}]