export const TeamBuff_Bennett = [
{
  check: ({ params }) => params.team === true && params.Bennett === true && !params.TruceTime,
  title: '班尼特技能：[美妙旅程] 领域内的角色获得[atkPlus]攻击力',
  data: {
    atkPlus: ({ cons }) => (cons >= 5 ? 119 : 101) * 674.33 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Bennett === true && !params.TruceTime,
  title: '班尼特1命：[热情复燃] 美妙旅程的攻击力提升数值上追加[atkPlus]',
  cons: 1,
  data: {
    atkPlus: 20 * 674.33 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Bennett === true && !params.TruceTime,
  title: '班尼特6命：[烈火与勇气] 处在美妙旅程领域内的队伍中当前场上角色获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: ({ element, params }) => ['火'].includes(element) ? (params.phy === true ? 0 : 15) : 0
  }
}]