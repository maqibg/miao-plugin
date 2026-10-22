export const TeamBuff_Candace = [
{
  check: ({ params }) => params.team === true && params.Candace === true,
  title: '坎蒂丝技能：[圣仪·灰鸰衒潮] 角色的普通攻击对敌人造成元素伤害时，提高[aDmg]%造成的伤害',
  data: {
    aDmg: 20
  }
},
{
  check: ({ params }) => params.team === true && params.Candace === true,
  title: '坎蒂丝天赋：[漫沙陨穹] 处于圣仪·灰鸰衒潮的赤冕祝祷状态下的角色，普通攻击对敌人造成伤害时,伤害提高[aDmg]%',
  sort: 9,
  data: {
    aDmg: ({ params }) => params.phy === true ? 0 : (Math.floor(36000 / 1000) * 0.5)
  }
}]
