export const TeamBuff_Verina = [
  {
    check: ({ params }) => params.team === true && params.Verina === true,
    title: '维里奈固有1：[自然的献礼] 施放重击星星花绽放、空中攻击星星花绽放、共鸣解放草木生长或延奏技能盛放时, 攻击提升[atkPct]%',
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params, element }) => params.team === true && params.Verina === true && element === '衍射',
    title: '维里奈4链：[盛放的拥抱] 施放重击星星花绽放、空中攻击星星花绽放、共鸣解放草木生长或延奏技能盛放时，伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: 15
    }
  },
  {
    check: ({ params }) => params.team === true && params.Verina === true,
    title: '维里奈延奏：[盛放] 持续为下一位登场角色回复生命值，附近队伍中所有角色全伤害加深[dmg]%',
    data: {
      dmg: 15
    }
  }
]
