import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => ![params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementIceTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementWaterTeam >= 1 && params.ElementGrassTeam >= 1,
  title: '妮露天赋：[折旋落英之庭] 队伍中所有角色的元素类型均为草元素与水元素，并且至少有一名草元素角色、一名水元素角色时,释放七域舞步的第三段舞步后触发绽放反应,将取代草原核产生「丰穰之核」,角色受到草元素攻击会使元素精通提升[mastery]点 ',
  data: {
    mastery: 100
  }
},
{
  check: ({ params }) => ![params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementIceTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementWaterTeam >= 1 && params.ElementGrassTeam >= 1,
  title: '妮露天赋：[翩舞永世之梦] 处于「金杯的丰馈」状态下的角色触发的丰穰之核造成的伤害提升[bloom]%',
  sort: 9,
  data: {
    bloom: ({ calc, attr }) => Math.max(0, Math.min(400, (calc(attr.hp) - 30000) / 1000 * 9))
  }
},
{
  check: ({ params }) => params.Luminous_Illusion === true,
  title: '妮露1命：[却月的轻舞] 水月造成的伤害提升[eDmg]%,净天水环的持续时间延长[_eSustainedPlus]秒',
  cons: 1,
  data: {
    eDmg: 65,
    _eSustainedPlus: 6
  }
},
{
  check: ({ params }) => ![params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementIceTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1) && params.ElementWaterTeam >= 1 && params.ElementGrassTeam >= 1,
  title: '妮露2命：[星天的花雨] 对敌人造成水元素伤害后,该敌人的元素抗性降低[kx]%,触发绽放反应对敌人造成伤害后,该敌人的元素抗性降低[_kx]%',
  cons: 2,
  data: {
    kx: 35,
    _kx: 35
  }
},
{
  title: '妮露4命：[挽漪的节音] 七域舞步的翩转状态下的第三段舞步命中敌人后,将恢复[_energyevery]点元素能量,并使浮莲舞步·远梦聆泉造成的伤害提升[qDmg]%',
  cons: 4,
  data: {
    _energyevery: 15,
    qDmg: 50
  }
},
{
  title: '妮露6命：[断霜的弦歌] 暴击率提升[cpct]%,暴击伤害提升[cdmg]%',
  sort: 9,
  cons: 6,
  data: {
    cpct: ({ calc, attr }) => Math.min(30, calc(attr.hp) / 1000 * 0.6),
    cdmg: ({ calc, attr }) => Math.min(60, calc(attr.hp) / 1000 * 1.2)
  }
}]