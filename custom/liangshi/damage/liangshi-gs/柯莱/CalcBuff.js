import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '柯莱天赋：[飞叶迴斜] 在飞叶轮返回前，如果队伍中自己的角色触发了燃烧、原激化、超激化、蔓激化、绽放、超绽放或烈绽放反应，则会在返回时持续对身边的敌人造成草元素伤害'
},
{
  title: '柯莱天赋：[徐如旷林] 柯里安巴领域中的角色触发燃烧、原激化、超激化、蔓激化、绽放、超绽放或烈绽放反应时，将使领域的持续时间延长[_qSustainedPlus]秒。',
  data: {
    _qSustainedPlus: 3
  }
},
{
  check: ({ params }) => params.TruceTime > 0,
  title: '柯莱1命：[巡护深林] 处于队伍后台时，元素充能效率提升[recharge]%',
  cons: 1,
  data: {
    recharge: 20
  }
},
{
  title: '柯莱6命：[坠镞为林] 飞叶轮命中时，会产生一个迷你柯里安巴，造成草元素伤害。',
  cons: 6
}]