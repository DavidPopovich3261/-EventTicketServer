
import { promises as fsPromises } from 'fs'

export async function readFile(fileName) {
        try {
        const data = await fsPromises.readFile(fileName, 'utf8') 
        const dataToJson = await JSON.parse(data)
            return dataToJson
    } catch (error) {
        console.error(`Error read file:`, error);
    }
}

export async function writeFile(fileName, data) {
    try {
            await fsPromises.writeFile(fileName, JSON.stringify(data), 'utf8')
        } catch (error) {
            console.error(`Error writing file:`, error);
        }
}