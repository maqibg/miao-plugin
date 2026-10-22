export const TeamBuff_Arataki_Itto = [
{
  check: ({ params }) => params.team === true && params.Arataki_Itto === true,
  title: '荒泷一斗4命：[纠集众人，斗倒御岳] 最恶鬼王•一斗轰临！！施加的「怒目鬼王」状态结束后，附近的队伍中所有角色的防御力提升[defPct]%，攻击力提升[atkPct]%',
  cons: 4,
  data: {
    defPct: 20,
    atkPct: 20
  }
}]
