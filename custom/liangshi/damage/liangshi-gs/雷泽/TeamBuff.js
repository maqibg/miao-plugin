export const TeamBuff_Razor = [
{
  check: ({ params }) => params.team === true && params.Razor === true,
  title: '雷泽4命：[撕咬] 利爪与苍雷点按时,会使命中的敌人防御力降低[enemyDef]%',
  cons: 4,
  data: {
    enemyDef: 15
  }
}]