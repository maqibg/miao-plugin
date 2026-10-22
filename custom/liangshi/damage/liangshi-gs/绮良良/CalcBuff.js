import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '安全运输护盾：[属性 - 草] 对草元素伤害有[_dendroShieldInc]%的额外吸收效果。',
  data: {
    _dendroShieldInc: 150
  }
},
{
  title: '绮良良天赋：[应时惑目之灵] 呜喵町飞足造成的伤害提升[eDmg]%,秘法·惊喜特派造成的伤害提升[qDmg]%',
  sort: 9,
  data: {
    eDmg: ({ calc, attr }) => calc(attr.hp) / 1000 * 0.4,
    qDmg: ({ calc, attr }) => calc(attr.hp) / 1000 * 0.3
  }
},
{
  title: '绮良良1命：[沿途百景会心] 基于生命值上限,施放秘法·惊喜特派时将额外生成[_qDmg]枚猫草豆蔻',
  cons: 1,
  data: {
    _qDmg: ({ calc, attr }) => Math.floor(Math.min(calc(attr.hp) / 8000, 4))
  }
},
{
  title: '绮良良4命：[韦驮骏足] 处于安全运输护盾或安全运输护盾·要件的当前场上角色的普通攻击、重击与下落攻击命中敌人后，绮良良将使用猫草小豆蔻进行协同攻击',
  cons: 4
},
{
  title: '绮良良6命：[沿途百景会心] 施放元素战技或元素爆发后，所有角色获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: 12
  }
}]