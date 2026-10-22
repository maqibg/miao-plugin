export const TeamBuff_Shen_He = [
{
  check: ({ params }) => params.team === true && params.Shen_He === true,
  title: '申鹤天赋：[缚灵通真法印] 施放仰灵威召将役咒后将使附近的队伍中所有角色根据技能释放形式对应伤害提高[dmg]%',
  data: {
    dmg: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Shen_He === true && !params.TruceTime,
  title: '申鹤天赋：[大洞弥罗尊法] 处于神女遣灵真诀的领域中的当前场上角色,元素伤害加成提高[dmg]%',
  data: {
    dmg: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Shen_He === true,
  title: '申鹤技能：[神女遣灵真诀] 使领域其中敌人的抗性降低[kx]%',
  data: {
    kx: ({ element, params }) => ['冰'].includes(element) ? 15 : (params.phy != true ? 0 : 15)
  }
},
{
  check: ({ params }) => params.phy != true && params.team === true && params.Shen_He === true,
  title: '申鹤技能：[仰灵威召将役咒] 攻击对敌人造成元素伤害时,造成的伤害提高[aPlus]%',
  sort: 9,
  data: {
    aPlus: ({ cons, params }) => (cons >= 3 ? 97 : 82.2) * (params.phy === true ? 0 : 3600) / 100,
    a2Plus: ({ cons, params }) => (cons >= 3 ? 97 : 82.2) * (params.phy === true ? 0 : 3600) / 100,
    a3Plus: ({ cons, params }) => (cons >= 3 ? 97 : 82.2) * (params.phy === true ? 0 : 3600) / 100,
    ePlus: ({ cons, params }) => (cons >= 3 ? 97 : 82.2) * (params.phy === true ? 0 : 3600) / 100,
    qPlus: ({ cons, params }) => (cons >= 3 ? 97 : 82.2) * (params.phy === true ? 0 : 3600) / 100
  }
},
{
  check: ({ params }) => params.phy != true && params.team === true && params.Shen_He === true && !params.TruceTime,
  title: '申鹤2命：[定蒙] 神女遣灵真诀的持续时间延长[_qSustainedPlus]秒,领域中的当前场上角色,暴击伤害提高[cdmg]%',
  cons: 2,
  data: {
    _qSustainedPlus: 6,
    cdmg: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
}]
