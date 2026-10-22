export const TeamBuff_Venti = [
{
  check: ({ params }) => params.team === true && params.Venti === true,
  title: '温迪6命：[抗争的暴风] 受风神之诗伤害的敌人,元素抗性降低[kx]％',
  cons: 6,
  data: {
    kx: ({ element }) => !['岩', '草'].includes(element) ? 20 : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Venti === true,
  title: '温迪2命：[眷恋的泠风] 高天之歌会使敌人的抗性降低[_kx]％被高天之歌击飞的敌人在落地前,抗性总计降低[kx]％',
  cons: 2,
  data: {
    _kx:  ({ element }) => ['风'].includes(element) ? 12 : 0,
    kx: ({ element }) => ['风'].includes(element) ? 24 : 0,
    phyKx: 24
  }
},
{
  check: ({ params }) => params.team === true && params.Venti === true,
  title: '温迪天赋：[暴风之眼] 风神之诗效果结束后，会为对应元素恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 15
  }
}]
