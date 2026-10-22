export const TeamBuff_Yoimiya = [
{
  check: ({ params }) => params.team === true && params.Yoimiya === true,
  title: '宵宫天赋：[炎昼风物诗] 施放琉金云间草后，附近的队伍中所有其他角色攻击力提高[atkPct]%',
  data: {
    atkPct: 20
  }
}]