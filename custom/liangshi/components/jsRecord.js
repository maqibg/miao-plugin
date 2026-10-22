import fs from 'node:fs'
import path from 'node:path'

/**
* 记录数据到指定的 JSON 文件中
* @param {string} TeamDataPath - 组队数据JSON路径
* @param {string} uid - 面板UID
* @param {Object} dmg - 伤害数据
*/

export async function recordData(TeamDataPath, uid, dmg, CharacterName) {
  let existingData = {}
  try {
    const data = fs.readFileSync(TeamDataPath, 'utf8')
    if (data) {
      existingData = JSON.parse(data)
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('文件读取异常:', err)
    }
  }
  existingData[uid] = dmg
  fs.writeFileSync(TeamDataPath, JSON.stringify(existingData, null, 2), 'utf8')
  console.log(`${CharacterName}面板: 组队计算数据已记录`)
}
