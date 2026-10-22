export const TeamBuff_Traveler_Anemo = [
{
  check: ({ params }) => params.team === true && params.Traveler_Anemo === true,
  title: '旅行者6命：[纠缠的信风] 受到风息激荡伤害的目标，元素抗性下降[kx]%',
  cons: 6,
  data: {
    kx: ({ element, params }) => ['水', '冰', '雷', '火'].includes(element) ? (params.phy === true ? 0 : 20) : 0
  }
}]