const gameNames = [
  'Cyberpunk Adventure',
  'Space Explorer',
  'Magic Kingdom',
  'Racing Thunder',
  'Battle Arena',
  'Mystic Quest',
  'Ocean Deep',
  'Sky Fortress',
  'Dragon Hunter',
  'Neon City',
  'Shadow Wars',
  'Crystal Legends',
  'Robot Factory',
  'Pirate Cove',
  'Zombie Survival',
  'Ice Kingdom',
  'Fire Temple',
  'Wind Walker',
  'Earth Guardian',
  'Lightning Strike',
  'Dark Forest',
  'Golden Valley',
  'Silver Mountain',
  'Ruby Castle',
  'Diamond Mine',
  'Emerald Lake',
  'Purple Plains',
  'Orange Desert',
  'Blue Ocean',
  'Green Jungle',
  'Red Canyon',
  'Yellow Fields',
  'Black Cave',
  'White Tower',
  'Gray Fortress',
  'Pink Garden',
  'Brown Village',
  'Turquoise Bay',
  'Violet Storm',
  'Indigo Night',
  'Copper Hills',
  'Bronze Age',
  'Iron Throne',
  'Steel City',
  'Platinum Palace',
  'Titanium Base',
  'Chrome Station',
  'Neon Arcade',
  'Retro Zone',
  'Pixel World',
]

const generateRandomPosition = (): [number, number, number] => [
  (Math.random() - 0.5) * 20, // X entre -10 e 10
  Math.random() * 5, // Y entre 0 e 5
  (Math.random() - 0.5) * 20, // Z entre -10 e 10
]

const generateRandomRotation = (): [number, number, number] => [
  Math.random() * Math.PI * 2, // Rotação X aleatória
  Math.random() * Math.PI * 2, // Rotação Y aleatória
  Math.random() * Math.PI * 2, // Rotação Z aleatória
]

const generateRandomThumbnail = (index: number): string => {
  const colors = [
    'FF6B6B',
    '4ECDC4',
    '45B7D1',
    'F7B801',
    'A8E6CF',
    'FFD93D',
    'C44569',
    '6C5CE7',
  ]
  const color = colors[index % colors.length]
  return `https://via.placeholder.com/150/${color}/FFFFFF?text=Game+${index + 1}`
}

const objectsDataMock = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  title:
    gameNames[index % gameNames.length] +
    ` ${Math.floor(index / gameNames.length) + 1}`,
  position: generateRandomPosition(),
  rotation: generateRandomRotation(),
  thumbnail: generateRandomThumbnail(index),
}))

export { objectsDataMock }
