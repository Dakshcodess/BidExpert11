const fs = require('fs')
const path = require('path')

const playersDir = path.join(__dirname, '../public/players')
const files = fs.readdirSync(playersDir)

console.log(`Found ${files.length} photo files`)

let content = fs.readFileSync(path.join(__dirname, 'iplPlayers.js'), 'utf8')
let updatedCount = 0

files.forEach(file => {
  const ext = path.extname(file)
  const playerName = path.basename(file, ext)
  const localUrl = `http://localhost:5000/players/${file}`
  
  // Simple string replacement
  const searchStr = `name: "${playerName}"`
  
  if (content.includes(searchStr)) {
    // Find imageUrl after this player name and replace it
    const playerIndex = content.indexOf(searchStr)
    const imageUrlIndex = content.indexOf('imageUrl: "', playerIndex)
    const imageUrlEnd = content.indexOf('"', imageUrlIndex + 11)
    
    if (imageUrlIndex !== -1 && imageUrlIndex - playerIndex < 500) {
      const oldUrl = content.substring(imageUrlIndex + 11, imageUrlEnd)
      content = content.substring(0, imageUrlIndex + 11) + localUrl + content.substring(imageUrlEnd)
      updatedCount++
      console.log(`✓ ${playerName}`)
    }
  } else {
    console.log(`✗ NOT FOUND: ${playerName}`)
  }
})

fs.writeFileSync(path.join(__dirname, 'iplPlayers.js'), content)
console.log(`\nDone! Updated ${updatedCount} / ${files.length} players`)