import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '夏洛蒂天赋：[冲击力瞬间] 带有「聚焦印象」印记的敌人被击败时，取景·冰点构图法的冷却时间减少[_ecdPlus]秒',
  data: {
    _ecdPlus: 2
  }
},
{
  title: '夏洛蒂天赋：[多样性调查] 队伍中存在不包括自己的枫丹角色[buff]名，获得[heal]%治疗加成，[dmg]%元素伤害加成',
  data: {
    buff: ({ params }) => (params.FontaineTeammate || 1) - 1,
    heal: ({ params }) => Math.min((((params.FontaineTeammate || 1) - 1) * 5), 15),
    dmg: ({ params }) => Math.min(((4 - (params.FontaineTeammate || 1)) * 5), 15)
  }
},
{
  title: '夏洛蒂2命：[以求真为职守] 施放取景·冰点构图法时,「温亨廷先生」的攻击命中了[buff]名敌人,攻击力提升[atkPct]%',
  cons: 2,
  data: {
    buff: ({ params }) => params.SkillsHit || 1,
    atkPct: ({ params }) => Math.min(((params.SkillsHit || 1) * 10), 30)
  }
},
{
  title: '夏洛蒂4命：[以督促为责任] 定格·全方位确证命中附有「瞬时剪影」或「聚焦印象」印记的敌人时,造成的伤害提升[qDmg]%,恢复[_energyevery]点能量',
  cons: 4,
  data: {
    qDmg: 10,
    _energyevery: 2
  }
},
{
  title: '夏洛蒂6命：[以有趣相关为要义] 当前场上角色的普通攻击与重击命中附有取景·冰点构图法的「聚焦印象」的敌人后,「温亨廷先生」将进行协同攻击',
  cons: 6
}]
