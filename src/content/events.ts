export interface EventContent {
  id: string
  title: string
  date: string
  description?: string
}

export const eventContent: EventContent[] = [
  {
    id: 'remedy-popup',
    title: 'REMEDY PLACE',
    date: '09.06.2026',
    description:
      "Buenos Díaz took over the bar at Remedy Place Flatiron for a day, pouring specialty espresso made with authentic Mexican ingredients through the morning before shifting to our handcrafted aguas frescas in the afternoon. A taste of Chiapas inside one of NYC's social wellness clubs.",
  },
  {
    id: 'obscure-popup',
    title: 'OBSCURE COFFEE ROASTERS',
    date: '08.15.2026',
    description:
      'Buenos Díaz joined Obscure Coffee Roasters in Bushwick for a one-day popup, bringing our specialty espresso menu into their space alongside a limited run of collaborative drinks merging the coffee culture of Chiapas, Mexico with the bold flavors of Puerto Rico.',
  },
  {
    id: 'shopify-popup',
    title: 'SHOPIFY | SUMMER BIZ CONNECT',
    date: '07.21.2026',
    description:
      'Buenos Díaz served at Shopify NYs Summer Biz Connect, a networking mixer bringing together founders, merchants, and creators at their SoHo flagship on Greene Street. We poured our summer aguas frescas for a room full of builders and entrepreneurs, adding a taste of Mexican ingredients to an evening built on connection and collaboration.',
  },
]

export const findEventContent = (id: string) => {
  const match = eventContent.find((item) => item.id === id)
  if (!match) throw new Error(`Unknown event id: ${id}`)
  return match
}
