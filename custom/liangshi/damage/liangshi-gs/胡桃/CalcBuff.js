import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Paramita_Papilio === true,
  title: '胡桃技能：[蝶引来生] 基于进入该状态的生命值上限,提高[atkPlus]点攻击力',
  sort: 9,
  data: {
    atkPlus: ({ talent, attr, calc }) => Math.min(talent.e['攻击力提高'] * calc(attr.hp) / 100, attr.atk.base * 4)
  }
},
{
  title: '胡桃天赋：[血之灶火] 当前生命值[buff]%,获得[dmg]%元素伤害加成',
  data: {
    buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
    dmg: ({ params, artis }) => (params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) > 50 ? 0 : 33
  }
},
{
  check: ({ params }) => params.Paramita_Papilio === true,
  title: '胡桃1命：[赤团开时斜飞去] 处于蝶引来生施加的彼岸蝶舞状态下时,重击体力消耗减少[_a2Stamina]% ',
  cons: 1,
  data: {
    _a2Stamina: 100
  }
},
{
  title: '胡桃2命：[最不安神晴又复雨] 血梅香造成的伤害提高[ePlus]点,安神秘法会为命中的敌人施加血梅香效果',
  cons: 2,
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 10 / 100
  }
},
{
  title: '胡桃6命：[幽蝶能留一缕芳] 生命值降至25.0%以下,或承受足以使她倒下的伤害时所有元素抗性和物理抗性提高[_res]%,暴击率提高[_cpct]%,并提高[_interruption]%抗打断能力 {此效果不会参与计算}',
  cons: 6,
  data: {
    _interruption: 100,
    _cpct: 100,
    _res: 200
  }
}]
