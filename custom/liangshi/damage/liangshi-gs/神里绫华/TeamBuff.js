export const TeamBuff_Kamisato_Ayaka = [
{
  check: ({ params }) => params.team === true && params.Kamisato_Ayaka === true,
  title: '神里绫华4命：[盈缺流返] 敌人受到神里流•霜灭的霜见雪关扉造成的伤害后,防御力降低[enemyDef]%',
  cons: 4,
  data: {
    enemyDef: 30
  }
}]