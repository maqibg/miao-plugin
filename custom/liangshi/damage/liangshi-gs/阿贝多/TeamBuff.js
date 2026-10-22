export const TeamBuff_Albedo = [
{
  check: ({ params }) => params.team === true && params.Albedo === true,
  title: '阿贝多天赋：[瓶中人的天慧] 释放诞生式·大地之潮时,使附近的队伍中角色的元素精通提高[mastery]点',
  data: {
    mastery: 125
  }
},
{
  check: ({ params }) => params.team === true && params.Albedo === true && !params.TruceTime,
  title: '阿贝多4命：[神性之陨] 处于阳华的领域中的队伍中当前场上角色，造成的下落攻击伤害提高[a3Dmg]%',
  cons: 4,
  data: {
    a3Dmg: 30
  }
},
{
  check: ({ params }) => params.team === true && params.Albedo === true && !params.TruceTime,
  title: '阿贝多6命：[无垢之土] 处在阳华的领域中的队伍中当前场上角色，若处于结晶反应产生的护盾庇护下，造成的伤害提高[dmg]%',
  cons: 6,
  data: {
    dmg: 17
  }
}]
