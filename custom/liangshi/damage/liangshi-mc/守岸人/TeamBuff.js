export const TeamBuff_Shorekeeper = [
  {
    check: ({ params }) => params.team === true && params.Shorekeeper === true,
    title: '守岸人2链：[夜幕的赠予与拒绝] 浅析星域附近队伍中的角色攻击提升[atkPct]%',
    cons: 2,
    data: {
      atkPct: 40
    }
  },
  {
    check: ({ params }) => params.team === true && params.Shorekeeper === true,
    title: '守岸人固有2：[自我引力] 角色处于星域生效范围内时共鸣效率提升[recharge]%',
    tree: 2,
    data: {
      recharge: 10
    }
  },
  {
    check: ({ params }) => params.team === true && params.Shorekeeper === true,
    title: '守岸人技能：[终末回环] 深潜星域内角色暴击提升[cpct]% 解限星域内角色暴击伤害提升[cdmg]%',
    data: {
      cpct: 12.5,
      cdmg: 25
    }
  },
  {
    check: ({ params }) => params.team === true && params.Shorekeeper === true,
    title: '守岸人延奏：[双联合相] 队伍中的角色全伤害加深[dmg]%',
    data: {
      dmg: 15
    }
  }
]
