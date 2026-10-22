export const TeamBuff_Lisa = [
{
  check: ({ params }) => params.team === true && params.Lisa === true,
  title: '丽莎天赋：[静电场力] 敌人受到蔷薇的雷光攻击后，降低[enemyDef]%防御力',
  data: {
    enemyDef: 15
  }
}]