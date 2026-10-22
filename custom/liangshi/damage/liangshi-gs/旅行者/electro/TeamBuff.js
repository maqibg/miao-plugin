export const TeamBuff_Traveler_Electro = [
{
  check: ({ params }) => params.team === true && params.Traveler_Electro === true,
  title: '旅行者2命：[震怒的苍雷] 雷轰电转的威光命中敌人后，会使敌人的雷元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: 15
  }
},
{
  check: ({ params }) => params.team === true && params.Traveler_Electro === true && !params.TruceTime,
  title: '旅行者6命：[撼世的神雷] 雷轰电转每引发2.0次威光落雷，就为当前角色额外恢复[_energyevery]点元素能量。',
  cons: 6,
  data: {
    _energyevery: 1
  }
}]