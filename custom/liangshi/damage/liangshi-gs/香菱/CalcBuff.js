import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => !params.TruceTime,
  title: '香菱天赋：[绝云朝天椒] 拾取辣椒会提高[atkPct]%攻击力',
  data: {
    atkPct: 10
  }
},
{
  title: '香菱天赋：[交叉火力] 锅巴的喷火距离提高20.0%。'
},
{
  title: '香菱1命：[外酥里嫩] 受到锅巴攻击的敌人,元素抗性降低[kx]%',
  cons: 1,
  data: {
    kx: 15
  }
},
{
  title: '香菱4命：[文火慢煨] 旋火轮的持续时间延长[_qSustainedPct]％',
  cons: 4,
    _qSustainedPct: 40
},
{
  check: ({ params }) => params.Pyronado === true,
  title: '香菱6命：[大龙卷旋火轮] 旋火轮持续期间,队伍中所有角色获得[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: 15
  }
 }]