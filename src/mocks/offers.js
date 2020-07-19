import {AVATAR_URL} from "../common/const.js";


const offers = [
  {
    id: 0,
    city: `Amsterdam`,
    title: `Beautiful & luxurious apartment at great location`,
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    price: 200,
    type: `Apartment`,
    rating: 4,
    coordinates: [
      52.3909553943508,
      4.85309666406198
    ],
  }, {
    id: 1,
    city: `Amsterdam`,
    title: `Wood and stone place`,
    picture: `img/apartment-03.jpg`,
    isPremium: true,
    price: 170,
    type: `House`,
    rating: 5,
    coordinates: [
      52.369553943508,
      4.85309666406198
    ]
  }, {
    id: 2,
    city: `Amsterdam`,
    title: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    price: 70,
    type: `Room`,
    rating: 3,
    coordinates: [
      52.3909553943508,
      4.929309666406198
    ]
  }, {
    id: 3,
    city: `Amsterdam`,
    title: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    price: 150,
    type: `Apartment`,
    rating: 4,
    coordinates: [
      52.3809553943508,
      4.939309666406198
    ]
  }
];

const offersDetails = [
  {
    id: 0,
    details: {
      pictures: [
        `img/apartment-01.jpg`,
        `img/room.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/studio-01.jpg`,
        `img/apartment-01.jpg`,
      ],
      description: [
        `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. 
        The building is green and from 18th century.`,
        `An independent House, strategically located between Rembrand Square and National Opera, 
        but where the bustle of the city comes to rest in this alley flowery and colorful.`,
      ],
      bedroomsCount: `3 bedrooms`,
      maxGuests: `Max 4 adults`,
      insideItems: [
        `Wi-Fi`,
        `Heating`,
        `Kitchen`,
        `Friddge`,
        `Washing machine`,
        `Coffee machine`,
        `Dishwasher`,
        `Towels`,
        `Baby seat`,
        `Cabel TV`,
      ],
      host: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        isSuper: true,
      }
    }
  }, {
    id: 1,
    details: {
      pictures: [
        `img/apartment-03.jpg`,
        `img/apartment-01.jpg`,
        `img/room.jpg`,
        `img/apartment-02.jpg`,
        `img/studio-01.jpg`,
        `img/apartment-01.jpg`,
      ],
      description: [
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
      ],
      bedroomsCount: `3 bedrooms`,
      maxGuests: `Max 4 adults`,
      insideItems: [
        `Wi-Fi`,
        `Heating`,
        `Kitchen`,
        `Friddge`,
        `Washing machine`,
      ],
      host: {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        isSuper: false,
      }
    }
  }, {
    id: 2,
    details: {
      pictures: [
        `img/room.jpg`,
        `img/apartment-01.jpg`,
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
        `img/studio-01.jpg`,
        `img/apartment-01.jpg`,
      ],
      description: [
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
        `Eligendi repellendus ut optio ad repudiandae obcaecati reprehenderit ipsa.`,
      ],
      bedroomsCount: `3 bedrooms`,
      maxGuests: `Max 4 adults`,
      insideItems: [
        `Wi-Fi`,
        `Kitchen`,
        `Friddge`,
      ],
      host: {
        avatar: `${AVATAR_URL}/1`,
        name: `Alessa`,
        isSuper: false,
      }
    }
  }, {
    id: 3,
    details: {
      pictures: [
        `img/apartment-02.jpg`,
        `img/room.jpg`,
        `img/apartment-01.jpg`,
        `img/apartment-03.jpg`,
        `img/studio-01.jpg`,
        `img/apartment-01.jpg`,
      ],
      description: [
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
        `Eligendi repellendus ut optio ad repudiandae obcaecati reprehenderit ipsa.`,
        `Quia labore atque nostrum eum repudiandae laboriosam molestias corrupti numquam aliquid? Ab, deleniti.`
      ],
      bedroomsCount: `1 bedrooms`,
      maxGuests: `Max 2 adults`,
      insideItems: [
        `Wi-Fi`,
        `Kitchen`,
        `Friddge`,
        `Cabel TV`,
      ],
      host: {
        avatar: `${AVATAR_URL}/2`,
        name: `Kristian`,
        isSuper: true,
      }
    }
  },
];

export {offers, offersDetails};
