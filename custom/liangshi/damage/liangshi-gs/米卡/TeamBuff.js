export const TeamBuff_Mika = [
{
  check: ({ params }) => params.team === true && params.Mika === true && !params.TruceTime,
  title: '米卡技能：[星霜的流旋] 处于灵风状态下的角色处于场上时,攻击速度将获得[_aSpeed]%提升 ',
  data: {
    _aSpeed: ({ cons }) => cons >= 5 ? 25 : 22
  }
},
{
  check: ({ params }) => params.team === true && params.Mika === true && !params.TruceTime,
  title: '米卡天赋：[速射牵制] 3.0层侦明,使角色处于场上时,造成的物理伤害提升[phy]%',
  data: {
    phy: 3 * 10
  }
},
{
  check: ({ params }) => params.team === true && params.Mika === true && !params.TruceTime,
  title: '米卡6命：[依随的策援] 处于灵风状态下的当前场上角色,其物理伤害的暴击伤害提高[aCdmg]%,星霜的流旋灵风状态下的侦明效果叠加层数上限提升1.0层',
  cons: 6,
  data: {
    phy: 10,
    phyCdmg: 60
  }
}]
