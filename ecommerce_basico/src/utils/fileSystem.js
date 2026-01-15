import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const resolvePath = (relativePath) =>
  path.join(__dirname, relativePath)

export const readJSON = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data || '[]')
  } catch {
    return []
  }
}

export const writeJSON = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}