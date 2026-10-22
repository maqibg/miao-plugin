export const TeamBuff_Raiden_Shogun = [
{
  check: ({ params }) => params.team === true && params.Raiden_Shogun === true,
  title: '雷电将军技能：[神变·恶曜开眼] 获授雷罚恶曜之眼的角色在持续期间内元素爆发造成的伤害获得[qDmg]%提升',
  data: {
    qDmg: 0.3 * 80
  }
},
{
  check: ({ params }) => params.team === true && params.Raiden_Shogun === true,
  title: '雷电将军4命：[誓奉常道] 奥义·梦想真说施加的梦想一心状态结束后，附近的队伍中所有角色的攻击力提升[atkPct]%',
  cons: 4,
  data: {
    atkPct: 30
  }
},
{
  check: ({ params }) => params.team === true && params.Raiden_Shogun === true,
  title: '雷电将军6命：[负愿前行] 处于奥义·梦想真说施加的梦想一心状态下的元素爆发伤害命中敌人时，使附近的队伍中所有角色元素爆发的冷却时间缩短[_qcdPlus]秒',
  cons: 6,
  data: {
    _qcdPlus: 1
  }
}]