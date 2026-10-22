export const TeamBuff_Kinich = [
{
  check: ({ params }) => params.team === true && params.Kinich === true,
  title: '基尼奇2命：[星虎之掌] 元素战技命中敌人使其元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: ({ element, params }) => ['草'].includes(element) ? (params.phy === true ? 0 : 30) : 0
  }
}]
