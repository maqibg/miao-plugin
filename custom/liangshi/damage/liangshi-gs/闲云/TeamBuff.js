export const TeamBuff_Xian_Yun = [
{
  check: ({ params }) => params.team === true && params.Xian_Yun === true,
  title: '闲云天赋：[霜翎高逐祥风势] 朝起鹤云的闲云冲击波命中[buffCount]个敌人,使角色的下落攻击的暴击率提升[a3Cpct]%',
  data: {
    buffCount: 4,
    a3Cpct: 10
  }
},
{
  check: ({ params }) => params.team === true && params.Xian_Yun === true && !params.TruceTime,
  title: '闲云天赋：[细想应是洞中仙] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害提升[a3Plus]',
  data: {
    a3Plus: 9000
  }
},
{
  check: ({ params }) => params.team === true && params.Xian_Yun === true && !params.TruceTime,
  title: '闲云2命：[鹤唳远人间] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害额外提升[a3Plus]',
  cons: 2,
  data: {
    a3Plus: 9000
  }
}]
