export const TeamBuff_Iansan = [
{
  check: ({ params }) => params.team === true && params.Iansan === true && !params.TruceTime,
  title: '伊安珊技能：[力的三原理] 取出动能标示跟随角色行动，使队伍中自己的当前场上角色的攻击力提升[atkPlus]',
  data: {
    atkPlus: ({ cons }) => cons >= 5 ? 810 : 690
  }
},
{
  check: ({ params }) => params.team === true && params.Iansan === true && !params.TruceTime,
  title: '伊安珊2命：[偷懒是健身大忌!] 施放元素爆发时，队伍中自己的当前场上角色的攻击力提升[atkPct]%',
  cons: 2,
  data: {
    atkPct: 30
  }
},
{
  check: ({ params }) => params.team === true && params.Iansan === true && !params.TruceTime,
  title: '伊安珊6命：[偷懒是健身大忌!] 夜魂值恢复量溢出，队伍中自己的当前场上角色造成的伤害提升[dmg]%',
  cons: 6,
  data: {
    dmg: 25
  }
}]