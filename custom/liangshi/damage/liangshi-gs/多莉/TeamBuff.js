export const TeamBuff_Dori = [
{
  check: ({ params }) => params.team === true && params.Dori === true,
  title: '多莉技能：[卡萨扎莱宫的无微不至] 与灯中幽精相连的角色持续获得[_energyevery]点元素能量。',
  data: {
    _energyevery: 2.5
  }
},
{
  check: ({ params }) => params.team === true && params.Dori === true,
  title: '多莉4命：[酌盈剂虚] 当前生命值[buffHp]%，元素能量[buffRec]%，提升[healInc]%受治疗加成；提升[recharge]%元素充能效率。',
  cons: 4,
  data: {
    buffHp: ({ params, artis, weapon }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : ((artis['战狂'] === 4) ? 30 : 100)) : ((artis['战狂'] === 4) ? 30 : 100)),
    buffRec: ({ params }) => params.EnergyDetermine || 100,
    healInc: ({ params, artis, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : ((artis['战狂'] === 4) ? 30 : 100)) : ((artis['战狂'] === 4) ? 30 : 100))) >= 50 ? 0 : 50,
    recharge: ({ params }) => (params.EnergyDetermine || 100) >= 50 ? 0 : 30
  }
}]
