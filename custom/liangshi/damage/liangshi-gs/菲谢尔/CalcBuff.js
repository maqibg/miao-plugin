import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '菲谢尔天赋：[断罪雷影] 奥兹在场时，若当前场上自己的角色攻击敌人时触发了雷元素相关反应，则会对敌人降下圣裁之雷，造成雷元素伤害'
},
{
  check: ({ params }) => params.Oz === true,
  title: '菲谢尔2命：[圣裁影羽] 施放夜巡影翼时，能额外造成[ePlus]伤害',
  data: {
    ePlus: ({ calc, attr }) => calc(attr.atk) * 200 / 100
  }
},
{
  title: '菲谢尔4命：[皇女幻绮谭] 施放至夜幻现时，会对周围的敌人造雷元素伤害',
  cons: 4
},
{
  title: '菲谢尔6命：[永夜之禽] 奥兹的存在时间延长[_qSustainedPlus]秒，会协同当前场上自己的角色一起攻击，造成雷元素伤害。',
  cons: 6,
  data: {
    _eSustainedPlus: 2
  }
}]
