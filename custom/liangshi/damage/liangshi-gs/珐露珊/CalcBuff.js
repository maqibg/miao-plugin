import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Dazzling_Polyhedron === true,
  title: '珐露珊技能：[抟风秘道] 烈风波释放时，将降低敌人的元素抗性[kx]%，为附近的队伍中所有角色获得元素伤害加成[dmg]%',
  data: {
    kx: 30,
    dmg: ({ talent }) => talent.q['风元素伤害加成']
  }
},
{
  title: '珐露珊天赋：[迅捷流风] 处于非想风天的「疾风示现」状态下时，瞄准射击所需的蓄力时间减少[_a2Speed]%',
  data: {
    _a2Speed: 60
  }
},
{
  check: ({ params }) => params.Dazzling_Polyhedron === true,
  title: '珐露珊天赋：[七窟遗智] 处于抟风秘道的「祈风之赐」效果下造成风元素伤害时，会使造成的伤害提高[a2Plus]%',
  data: {
    a2Plus: ({ attr }) => attr.atk.base * 32 / 100,
    ePlus: ({ attr }) => attr.atk.base * 32 / 100,
    qPlus: ({ attr }) => attr.atk.base * 32 / 100
  }
},
{
  title: '珐露珊2命：[舍径求真] 抟风秘道的「赫耀多方面体」的存在时间延长[_qSustainedPlus]秒。',
  cons: 2,
  data: {
    _qSustainedPlus: 6
  }
},
{
  title: '珐露珊4命：[神机明悟] 风压坍陷产生的风涡可以恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 4
  }
},
{
  check: ({ params }) => params.Dazzling_Polyhedron === true,
  title: '珐露珊6命：[妙道合真] 处于抟风秘道的「祈风之赐」效果影响下的角色，造成风元素伤害时的暴击伤害提升[cdmg]%；处于「祈风之赐」效果影响下的当前场上角色造成伤害时，将为该敌人施加「风压坍陷」。',
  cons: 6,
  data: {
    cdmg: 40
  }
}]