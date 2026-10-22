export const TeamBuff_Lyney = [
{
  check: ({ params }) => params.team === true && params.Lyney === true,
  title: '林尼4命：[熟稔习练的筹谋] 元素类型为火元素的重击攻击命中敌人后，该敌人的元素抗性降低[kx]%',
  cons: 4,
  data: {
    kx: ({ element, params }) => ['火'].includes(element) ? (params.phy === true ? 0 : 20) : 0
  }
}]
