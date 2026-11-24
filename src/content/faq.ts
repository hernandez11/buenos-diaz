export interface FaqItem {
  question: string
  answer: string
  contactPhrase?: string
}

export const faqs: FaqItem[] = [
  {
    question: 'WHAT IS BUENOS DÍAZ?',
    answer:
      'We are a mobile espresso bar based in New York City. We bring specialty coffee rooted in Mexican tradition to events, popups, and private gatherings across the city.',
  },
  {
    question: 'WHAT MAKES OUR COFFEE DIFFERENT?',
    answer:
      'Our coffee comes from Chiapas, Mexico, where our family has farmed for generations. We pair it with syrups we make in house, built on the authentic flavors we grew up with, so every drink tastes like where it came from.',
  },
  {
    question: 'WHERE CAN YOU FIND US?',
    answer:
      'We move around. Check the events page for what is coming up, or follow us on Instagram for the latest!',
  },
  {
    question: 'DO WE CATER PRIVATE EVENTS?',
    answer: 'Yes. We bring the bar, the team, and everything needed to serve your guests.',
  },
  {
    question: 'WHAT EVENTS DO WE SERVE?',
    answer:
      'Weddings, brand launches, office mornings, markets, popups, and private parties. If it calls for good coffee, we are interested.',
  },
  {
    question: "WHAT'S INCLUDED WHEN YOU BOOK WITH US?",
    answer:
      'Our full bar setup, baristas, equipment, cups, and a menu built for your event. We handle setup and breakdown.',
  },
  {
    question: 'CAN WE CUSTOMIZE THE MENU FOR YOUR EVENT?',
    answer:
      'Yes. We can build around a theme, a flavor, or a product. Signature drinks made for your event are part of what we do.',
  },
  {
    question: 'DO WE OFFER NON-COFFEE OPTIONS?',
    answer:
      'Yes. Along with our specialty coffee, we offer our signature homemade horchata and Guava Roja, a hibiscus and guava alternative.',
  },
  {
    question: 'HOW DO YOU BOOK US?',
    answer:
      'Send us a note through the contact form with details of your event. We will follow up with availability, specifics, and a quote.',
    contactPhrase: 'contact',
  },
]
