export const TeamBuff_Nilou = [
{
  check: ({ params, element }) => params.team === true && params.Nilou === true && [params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementIceTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementWaterTeam >= 1 && params.ElementGrassTeam >= 1,
  title: '妮露天赋：[折旋落英之庭] 队伍中所有角色的元素类型均为草元素与水元素，并且至少有一名草元素角色、一名水元素角色时,释放七域舞步的第三段舞步后触发绽放反应,将取代草原核产生「丰穰之核」,角色受到草元素攻击会使元素精通提升[mastery]点 ',
  data: {
    mastery: 100
  }
},
{
  check: ({ params, element }) => params.team === true && params.Nilou === true && [params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementIceTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementWaterTeam >= 1 && params.ElementGrassTeam >= 1,
  title: '妮露天赋：[翩舞永世之梦] 处于「金杯的丰馈」状态下的角色触发的丰穰之核造成的伤害提升[bloom]%',
  data: {
    bloom: 400
  }
},
{
  check: ({ params }) => params.team === true && params.Nilou === true && [params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementIceTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementWaterTeam >= 1 && params.ElementGrassTeam >= 1,
  title: '妮露2命：[星天的花雨] 对敌人造成水元素伤害后,该敌人的元素抗性降低[kx]%,触发绽放反应对敌人造成伤害后,该敌人的元素抗性降低[_kx]%',
  cons: 2,
  data: {
    kx: 35,
    _kx: 35
  }
}]
