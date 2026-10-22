import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '那维莱特天赋：[古海孑遗的权柄] 队伍中的角色对敌人触发水元素反应,将使重击·衡平推裁造成原本[_a2Dmg]%的伤害',
  data: {
    _a2Dmg: ({ params }) => 2.5 * Math.pow(Math.min((params.Past_Draconic_Glories || 0), 3), 3) - 5 * Math.pow(Math.min((params.Past_Draconic_Glories || 0), 3), 2) + 12.5 * Math.min((params.Past_Draconic_Glories || 0), 3) + 100
  }
},
{
  title: '那维莱特天赋：[至高仲裁的纪律] 当前生命值[buff]%，获得[dmg]%元素伤害加成',
  data: {
    buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
    dmg: ({ params, artis }) => Math.min((((params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) - 30) * 0.6), 30)
  }
},
{
  title: '那维莱特1命：[尊荣的创定] 登场时获得一层「遗龙之荣」，进行重击蓄力·诉论心证与重击·衡平推裁时抗打断能力提高[_interruption]%',
  cons: 1,
  data: {
    _interruption: 100
  }
},
{
  title: '那维莱特2命：[律法的命诫] 根据「遗龙之荣」的层数, 使重击·衡平推裁的暴击伤害提升[a2Cdmg]%',
  cons: 2,
  data: {
    a2Cdmg: ({ params }) => Math.min((params.Past_Draconic_Glories || 0), 3) * 14
  }
},
{
  title: '那维莱特6命：[忿怒的报偿] 重击·衡平推裁命中敌人时,每2秒,将额外释放两道洪流',
  cons: 6
}]
