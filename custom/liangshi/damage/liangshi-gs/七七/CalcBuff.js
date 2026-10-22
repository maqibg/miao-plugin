import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '七七天赋：[延命妙法] 处于仙法·寒病鬼差状态下的角色触发元素反应时，受治疗加成提升[healInc]%',
  data: {
    healInc: 20
  }
},
{
  title: '七七1命：[寒苦回向] 寒病鬼差命中被度厄真符标记的敌人时,恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 4
  }
},
{
  check: ({ params }) => params.FireAttachment != true && params.MineAttachment != true && params.WindAttachment != true,
  title: '七七2命：[冰寒蚀骨] 对受到元素影响的敌人,普通攻击与重击造成的伤害提升[a2Dmg]%',
  cons: 2,
  data: {
    aDmg: 15,
    a2Dmg: 15
  }
},
{
  title: '七七4命：[天威压众] 被度厄真符标记的目标，攻击力下降[_enemyAtk]%',
  cons: 4,
  data: {
    _enemyAtk: 20
  }
},
{
  title: '七七6命：[起死回骸] 施放仙法·救苦度厄时，复苏附近队伍中所有倒下的角色，并将其生命值恢复至50.0%。',
  cons: 6
}]