import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '瑶瑶技能：[玉颗珊珊月中落] 周期性召唤「月桂·弹跳型」使移动速度提升[_jSpeed]%获得[_dendroRes]%草元素抗性',
  data: {
    _jSpeed: 8,
  	_dendroRes: 50
  }
},
{
  check: ({ params }) => !params.TruceTime,
  title: '瑶瑶1命：[妙受琼阁] 白玉萝卜炸裂时,处在其影响范围内的当前场上角色获得[dmg]%元素伤害加成并恢复[_stamina]点体力',
  cons: 1,
  data: {
    dmg: 15,
    _stamina: 15
  }
},
{
  title: '瑶瑶2命：[正思无邪] 白玉萝卜的炸裂伤害命中敌人,恢复[_energyevery]点元素能量',
  cons: 2,
  data: {
    _energyevery: 3
  }
},
{
  title: '瑶瑶4命：[爰爰可亲] 施放云台团团降芦菔或玉颗珊珊月中落后提升元素精通[mastery]点',
  cons: 4,
  sort: 9,
  data: {
    mastery: ({ calc, attr }) => Math.min(120, calc(attr.hp) * 0.3 / 100)
  }
},
{
  title: '瑶瑶6命：[慈惠仁心] 月桂·抛掷型每投掷2.0次白玉萝卜,就会在下次投掷时额外投掷1.0枚超厉害·大萝卜',
  cons: 6
}]
