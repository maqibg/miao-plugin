export const TeamBuff_Diona = [
{
  check: ({ params }) => params.team === true && params.Diona === true,
  title: '迪奥娜天赋：[猫尾隐藏菜单] 处于猫爪冻冻的护盾保护下的角色，移动速度提升[_jSpeed]%，体力消耗降低[_staminaPct]%。',
  data: {
    _jSpeed: 10 ,
    _staminaPct: 10
  }
},
{
  check: ({ params }) => params.team === true && params.Diona === true,
  title: '迪奥娜天赋：[滑稽百出的醉相] 敌人进入最烈特调的领域后，攻击力降低[_enemyAtk]%。',
  data: {
    _enemyAtk: 10
  }
},
{
  check: ({ params }) => params.team === true && params.Diona === true,
  title: '迪奥娜6命：处在最烈特调领域内的角色生命值[buff]%，受治疗加成提升[healInc]%，元素精通提升[mastery]',
  cons: 6,
  data: {
    buff: ({ params, artis, weapon }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    healInc: ({ params, artis, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 0 : 30,
    mastery: ({ params, artis, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 200 : 0
  }
}]