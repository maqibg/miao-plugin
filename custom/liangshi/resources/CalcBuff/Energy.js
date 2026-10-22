import { LSconfig } from '#liangshi'
import { EnergyKey } from './EnergyKey.js'
import path from 'node:path'
import fs from 'node:fs'

  /**
   * @CharacterName 角色名字
   * @attr   角色属性
   * @weapon 角色武器
   * @artis  角色圣遗物
   * @ConsRestore  命座能量恢复(直接)
   * @ConsOutput   命座产球(结算能量)
   * @ConsSpeed    命座攻速(实际提升攻击次数)
   * @SkillsQuantity  循环战技次数
   * @SkillsAddQuantity  循环战技附加次数
   * @NormalQuantity  循环普攻次数
   */

function EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, ConsOutput, ConsSpeed, SkillsQuantity, SkillsAddQuantity, NormalQuantity) {
  let cfg = LSconfig.getConfig('user', 'config')
  let energy = cfg.energymodel || 0
  let EnergySum = EnergyKey[CharacterName][0] //角色能量上限
  let SkillsOutput = EnergyKey[CharacterName][1] //角色E即时产球
  let SkillsAdditional = EnergyKey[CharacterName][2] //角色E附加产球

  let NormalRestore = 0 //普攻能量恢复
  if (['单手剑', '弓'].includes(weapon.weaponTypeName)) {
    NormalRestore = 0.221
  } else if (['双手剑', '法器'].includes(weapon.weaponTypeName)) {
    NormalRestore = 0.273
  } else {
    NormalRestore = 0.207
  }

  let ArtisRestore = 0 //圣遗物直接恢复
  if (artis['追忆之注连'] == 4) {
    ArtisRestore = 0 - 15
  } else if (artis['烬城勇者绘卷'] >= 2) {
    ArtisRestore = 6
  } else if (artis['学士'] == 4) {
    // 学士预留配置
  }

  let WeaponRestore = 0 //武器直接恢复
  let WeaponOutput = 0 //武器产球数(结算能量)
  let WeaponSpeed = 0 //武器攻速(实际提升攻击次数)
  if (weapon.name.includes('西风')) {
    WeaponOutput = 3 * 2 * 2
  }
  if (weapon.name.includes('祭礼')) {
    SkillsQuantity = SkillsQuantity + 1
  }

  // 单手剑
  if (weapon.name === '船坞长剑') {
    WeaponRestore = (weapon.affix * 0.5 + 1.5) * 3
  }
  if (weapon.name === '天目影打刀') {
    WeaponRestore = weapon.affix * 1.5 + 4.5
  }
  if (weapon.name === '天空之刃') {
    WeaponSpeed = 1
  }

  //双手剑
  if (weapon.name === '便携动力锯') {
    WeaponRestore = (weapon.affix * 0.5 + 1.5) * 3
  }
  if (weapon.name === '桂木斩长正') {
    WeaponRestore = (weapon.affix * 0.5 + 2.5) * 3
  }
  if (weapon.name === '松籁响起之时') {
    WeaponSpeed = weapon.affix >= 4 ? 2 : 1
  }

  // 长柄
  if (weapon.name === '喜多院十文字') {
    WeaponRestore = (weapon.affix * 0.5 + 2.5) * 3
  }
  if (weapon.name === '公义的酬报' || weapon.name === '沙中伟贤的对答') {
    WeaponRestore = weapon.affix * 2 + 6
  }
  if (weapon.name === '天空之脊') {
    WeaponSpeed = 2
  }

  // 法器
  if (weapon.name === '试作金珀') {
    WeaponRestore = (weapon.affix * 0.5 + 3.5) * 3
  }
  if (weapon.name === '碧落之珑') {
    WeaponRestore = (weapon.affix * 0.5 + 3) * 2
  }
  if (weapon.name === '万世流涌大典') {
    WeaponRestore = weapon.affix + 7
  }
  if (weapon.name === '不灭月华') {
    WeaponRestore = 0.6 * NormalQuantity
  }
  if (weapon.name === '图莱杜拉的回忆') {
    WeaponSpeed = weapon.affix >= 4 ? 2 : 1
  }

  let recharge = ((attr.recharge / 100) * (((SkillsOutput * SkillsQuantity + SkillsAdditional * SkillsAddQuantity) * 3) + WeaponOutput)) / (EnergySum - energy - WeaponRestore - ArtisRestore - (NormalRestore * (NormalQuantity + WeaponSpeed)))
  return recharge
}

export { EnergyCycle }
