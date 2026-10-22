export const TeamBuff_Navia = [
{
  check: ({ params }) => params.team === true && params.Navia === true,
  title: '娜维娅4命：[铭誓者的绝不姑息] 如霰澄天的鸣礼命中敌人时，将使该敌人的元素抗性降低[kx]%',
  cons: 4,
  data: {
    kx: ({ element, params }) => ['岩'].includes(element) ? (params.phy === true ? 0 : 20) : 0
  }
}]
