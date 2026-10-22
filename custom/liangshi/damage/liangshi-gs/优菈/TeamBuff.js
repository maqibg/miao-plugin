export const TeamBuff_Eula = [
{
  check: ({ params }) => params.team === true && params.Eula === true,
  title: '优菈技能：[冰潮的涡旋] 消耗2.0层冷酷之心效果，使身边的敌人的抗性降低[kx]%',
  data: {
    kx: ({ element }) => ['冰'].includes(element) ? 25 : 0
  }
}]
