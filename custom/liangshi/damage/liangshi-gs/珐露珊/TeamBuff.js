export const TeamBuff_Faruzan = [
{
  check: ({ params }) => params.team === true && params.Faruzan === true,
  title: '珐露珊技能：[抟风秘道] 烈风波释放时，将降低敌人的元素抗性[kx]%，为附近的队伍中所有角色获得元素伤害加成[dmg]%',
  data: {
    kx: ({ element, params }) => ['风'].includes(element) ? (params.phy === true ? 0 : 30) : 0,
    dmg: ({ element, cons, params }) => ['风'].includes(element) ? (cons >= 5 ? (params.phy === true ? 0 : 38.2) : (params.phy === true ? 0 : 32.4)) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Faruzan === true,
  title: '珐露珊天赋：[七窟遗智] 处于抟风秘道的「祈风之赐」效果下造成伤害时，会使造成的伤害提高[a2Plus]%',
  data: {
    a2Plus: ({ element, params }) => ['风'].includes(element) ? (params.phy === true ? 0 : 215.04) : 0,
    ePlus: ({ element, params }) => ['风'].includes(element) ? (params.phy === true ? 0 : 215.04) : 0,
    qPlus: ({ element, params }) => ['风'].includes(element) ? (params.phy === true ? 0 : 215.04) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Faruzan === true,
  title: '珐露珊6命：[妙道合真] 处于抟风秘道的「祈风之赐」效果影响下的角色，造成伤害时的暴击伤害提升[cdmg]%；处于「祈风之赐」效果影响下的当前场上角色造成伤害时，将为该敌人施加「风压坍陷」。',
  cons: 6,
  data: {
    cdmg: ({ element, params }) => ['风'].includes(element) ? (params.phy === true ? 0 : 40) : 0
  }
}]
