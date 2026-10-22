export const TeamBuff_Traveler_Geo = [
{
  check: ({ params }) => params.team === true && params.Traveler_Geo === true && !params.TruceTime,
  title: '旅行者1命：[巍然的青岩] 队伍中角色处于岩潮叠嶂的岩嶂包围中时，暴击率提升[cpct]%，并提高抗打断能力[_interruption]%。',
  cons: 1,
  data: {
    cpct: 10,
    _interruption: 70
  }
}]