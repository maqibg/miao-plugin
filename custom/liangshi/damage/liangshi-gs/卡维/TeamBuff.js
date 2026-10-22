export const TeamBuff_Kaveh = [
{
  check: ({ params, element }) => params.team === true && params.Kaveh === true,
  title: '卡维技能：[繁绘隅穹] 队伍中自己的角色触发绽放反应产生的草原核，在迸发时造成的伤害提升[bloom]%',
  data: {
    bloom: ({ talent }) => cons >= 3 ? 58.4 : 49.5
  }
}]
