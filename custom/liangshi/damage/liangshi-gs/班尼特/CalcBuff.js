import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Inspiration_Field === true && !params.TruceTime,
  title: '班尼特技能：[美妙旅程] 领域内的角色获得[atkPct]%攻击力',
  data: {
    atkPct: ({ talent }) => talent.q['攻击力加成比例']
  }
},
{
  title: '班尼特天赋：[热情复燃] 热情过载的冷却时间减少[_eCd]%',
  data: {
    _eCd: 20
  }
},
{
  check: ({ params }) => params.Inspiration_Field === true && !params.TruceTime,
  title: '班尼特天赋：[无畏的热血] 在美妙旅程领域内，热情过载的冷却时间减少[_eCd]%',
  data: {
    _eCd: 50
  }
},
{
  check: ({ params }) => params.Inspiration_Field === true && !params.TruceTime,
  title: '班尼特1命：[热情复燃] 美妙旅程的攻击力提升数值上追加[atkPct]%',
  cons: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '班尼特2命：[踏破绝境] 生命值[buff]％，元素充能效率提高[recharge]%',
  cons: 2,
  data: {
    buff: ({ params, weapon, artis }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
    recharge: ({ params, weapon, artis }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) < 70 ? 30 : 0
  }
},
{
  title: '班尼特4命：[热情不灭] 施放一段蓄力的热情过载时，在技能第二段攻击中可施放额外的追击。',
  cons: 4
},
{
  check: ({ params }) => params.Inspiration_Field === true && !params.TruceTime,
  title: '班尼特6命：[烈火与勇气] 处在美妙旅程领域内的队伍中当前场上角色获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: 15
  }
}]
