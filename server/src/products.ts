export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  longDescription: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Elephant',
    price: 5.99,
    description: 'The White Stripes',
    image: 'http://localhost:8080/stripes.webp',
    longDescription:
      'Elephant is the fourth studio album by the American rock duo The White Stripes.',
  },
  {
    id: 2,
    name: 'Electric Warrior',
    price: 23.99,
    description: 'T. Rex',
    image: 'http://localhost:8080/trex.webp',
    longDescription:
      'Electric Warrior is the second studio album by English rock band T. Rex, their sixth since their debut as Tyrannosaurus Rex.',
  },
  {
    id: 3,
    name: 'Gunfighter Ballads and Trail Songs",',
    price: 3.72,
    description: 'Marty Robbins',
    image: 'http://localhost:8080/marty.webp',
    longDescription:
      'Gunfighter Ballads and Trail Songs is the fifth studio album by Marty Robbins',
  },
  {
    id: 5,
    name: 'Master of Reality',
    price: 13.92,
    description: 'Black Sabbath',
    image: 'http://localhost:8080/sabbath.webp',
    longDescription:
      'Master of Reality is the third studio album by English heavy metal band Black Sabbath',
  },
];

export default products;
