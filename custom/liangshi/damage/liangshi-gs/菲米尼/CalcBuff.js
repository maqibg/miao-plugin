import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '菲米尼技能：[猎影潜袭] 浮冰增压冷却时间缩短[_ecd]%',
  data: {
    _ecd: 70
  }
},
{
  title: '菲米尼技能：[猎影潜袭] 使普通攻击释放的霜寒造成原本[_eDmg]%的伤害',
  data: {
    _eDmg: 200
  }
},
{
  title: '菲米尼天赋：[饱和深潜] 施放浮冰增压·高压粉碎时,如果佩伊刻计的压力阶级小于四阶,浮冰增压的冷却时间缩短[_ecdPlus]秒',
  data: {
    _ecdPlus: 1
  }
},
{
  check: ({ params }) => params.Shattering_Pressure === true,
  title: '菲米尼天赋：[并流式冷凝机关] 对敌人触发碎冰反应后,会使浮冰增压·高压粉碎造成的伤害提高[eDmg]%',
  data: {
    eDmg: 20
  }
},
{
  check: ({ params }) => params.Shattering_Pressure === true,
  title: '菲米尼1命：[深水与泡沫之梦] 浮冰增压·高压粉碎的暴击率提高[eCpct]%',
  cons: 1,
  data: {
    eCpct: 15
  }
},
{
  check: ({ params }) => params.Shattering_Pressure === true,
  title: '菲米尼2命：[企鹅与丰渥之国] 施放浮冰增压·高压粉碎将恢复[_energyevery]点元素能量',
  cons: 2,
  data: {
    _energyevery: 2
  }
},
{
  title: '菲米尼4命：[雪月与芦笛之舞] 对敌人触发冰冻、碎冰、超导反应后,攻击力提升[atkPct]%',
  cons: 4,
  data: {
    atkPct: 18
  }
},
{
  title: '菲米尼6命：[梦晓与决意之刻] 对敌人触发冰冻、碎冰、超导反应后，暴击伤害提升[cdmg]%',
  cons: 6,
  data: {
    cdmg: 36
  }
}]
