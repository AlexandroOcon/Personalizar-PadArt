export const products = [
  {
    id: 'kb-1',
    name: 'Teclado Mecanico Pro',
    category: 'keyboard',
    basePrice: 129.99,
    description: 'Teclado mecanico customizable',
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6',
    customizationOptions: [
      {
        type: 'switch',
        name: 'Tipo de Switch',
        options: [
          { id: 'red', name: 'Red Linear', price: 0 },
          { id: 'blue', name: 'Blue Clicky', price: 10 },
          { id: 'brown', name: 'Brown Tactile', price: 5 },
        ],
      },
      {
        type: 'color',
        name: 'Color del Case',
        options: [
          { id: 'black', name: 'Black', price: 0 },
          { id: 'white', name: 'White', price: 0 },
          { id: 'custom', name: 'Personalizar Color', price: 20 },
        ],
      },
      {
        type: 'keycaps',
        name: 'Color de Keycaps',
        options: [
          { id: 'black', name: 'Todo Black', price: 0 },
          { id: 'white', name: 'Todo White', price: 0 },
          { id: 'pudding', name: 'Cafe', price: 25 },
          { id: 'custom', name: 'Custom Color', price: 30 },
        ],
      },
    ],
  },
  {
    id: 'ms-1',
    name: 'Gaming Mouse Ultra',
    category: 'mouse',
    basePrice: 79.99,
    description: 'Mouse de alta calidad y customizable',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
    customizationOptions: [
      {
        type: 'processor',
        name: 'Sensor',
        options: [
          { id: '16k', name: '16K DPI Sensor', price: 0 },
          { id: '25k', name: '25K DPI Sensor', price: 30 },
        ],
      },
      {
        type: 'color',
        name: 'Color Theme',
        options: [
          { id: 'black', name: 'Hierro Negro', price: 0 },
          { id: 'rgb', name: 'RGB Edition', price: 15 },
          { id: 'custom', name: 'Personalizar Color', price: 25 },
        ],
      },
    ],
  },
  {
    id: 'mp-1',
    name: 'PlayStation Pro',
    category: 'consola',
    basePrice: 29.99,
    description: 'Consola professional',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e',
    customizationOptions: [
      {
        type: 'color',
        name: 'Color',
        options: [
          { id: 'black', name: 'Todo Black', price: 0 },
          { id: 'white', name: 'Todo White', price: 0 },
          { id: 'pudding', name: 'Cafe', price: 25 },
          { id: 'custom', name: 'Personalizar Color', price: 30 },
        ],
      },
      {
        type: 'image',
        name: 'Imagen',
        options: [
          { id: 'none', name: 'Ningun diseño', price: 0 },
          { id: 'custom', name: 'Implementar imagen', price: 20 },
        ],
      },
    ],
  },
];
