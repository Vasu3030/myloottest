const baseNames = [
  'Blaze', 'Neo', 'Ghost', 'Vortex', 'Crimson', 'Byte',
  'Luna', 'Cyber', 'Pixel', 'Arcane', 'Frost', 'Nova',
  'Zero', 'Neko', 'Loot', 'Mana', 'Tank', 'Crit'
]

export function generateUsersForTeam(teamIndex: number): string[] {
  const users: string[] = []
  for (let i = 0; i < 12; i++) {
    const base = baseNames[(teamIndex * 3 + i) % baseNames.length]
    users.push(`${base}${teamIndex}${i}`)
  }
  return users
}
