export const TeamBuff_Aloy = [
{
  check: ({ params }) => params.team === true && params.Aloy === true,
  title: '埃洛伊技能：[冰尘雪野] 被命中的敌人攻击力降低[_enemyAtk]%',
  data: {
    _enemyAtk: 12
  }
},
{
  check: ({ params }) => params.team === true && params.Aloy === true,
  title: '埃洛伊天赋：[战斗覆盖] 触发线圈效果时提升队伍中其他角色的攻击力[atkPct]%',
  data: {
    atkPct: 8
  }
}]