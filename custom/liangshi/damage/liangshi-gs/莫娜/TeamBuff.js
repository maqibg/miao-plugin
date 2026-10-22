export const TeamBuff_Mona = [
{
  check: ({ params }) => params.team === true && params.Mona === true,
  title: '莫娜技能：[星命定轨] 处于泡影影响下的敌人受到伤害时,对敌人施加星异的伤害加成效果,并以此提高造成的伤害[dmg]%',
  data: {
    dmg: 60
  }
},
{
  check: ({ params }) => params.team === true && params.Mona === true,
  title: '莫娜1命：[沉没的预言] 队伍中自己的角色攻击命中处于星异状态下的敌人后,感电反应造成的伤害提升[electroCharged]%,蒸发反应造成的伤害提升[vaporize]%,扩散反应造成的伤害提升[swirl]%,冻结反应的持续时间延长[frozrntimePct]%。',
  cons: 1,
  data: {
    electroCharged: 15,
    vaporize: 15,
    swirl: ({ element }) => ['水', '风'].includes(element) ? 15 : 0,
    frozrntimePct: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Mona === true,
  title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时，暴击率提升[cpct]%',
  cons: 4,
  data: {
    cpct: 15
  }
}]