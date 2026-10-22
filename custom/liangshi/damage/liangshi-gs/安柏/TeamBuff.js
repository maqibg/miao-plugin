export const TeamBuff_Amber = [
{
  check: ({ params }) => params.team === true && params.Amber === true,
  title: '安柏6命：[疾如野火] 使用箭雨后，队伍中所有角色的移动速度提升[_jSpeed]%，攻击力提升[_eIncreases]%。',
  cons: 6,
  data: {
    _jSpeed: 15,
    atkPct: 15
  }
}]