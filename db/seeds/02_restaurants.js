
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          name: 'A&W Canada',
          price: 1,
          address: '9055 University High St, Burnaby, BC V5A 4X6',
          type: ['Fast food', 'Burgers'],
          description: 'Test Restaurant'
        }
        // {
        //   name: 'Bun & Me',
        //   price: 2,
        //   address: '8915 Cornerstone Mews, Burnaby, BC V5A 4Y7',
        //   type: 'Vietnamese restaurant',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Togo Sushi',
        //   price: 2,
        //   address: '9055 University High St, Burnaby, BC V5A 0A7',
        //   type: 'Japanese restaurant',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Chopped Leaf',
        //   price: 2,
        //   address: '9055 University High St Unit 106, Burnaby, BC V5A 0A7',
        //   type: 'Salad shop',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Uncle Fatih\'s Pizza',
        //   price: 1,
        //   address: '9055 University High St Unit 108, Burnaby, BC V5A 0A7',
        //   type: 'Pizza restaurant',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Chef Hung Taiwanese Beef Noodle',
        //   price: 2,
        //   address: '9055 University High St Unit 109, Burnaby, BC V5A 0A7',
        //   type: 'Taiwanese restaurant',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Tim Hortons',
        //   price: 1,
        //   address: '9055 University High St, Burnaby, BC V5A 0A7',
        //   type: 'Coffee shop',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Nature\'s Garden Cafe SFU',
        //   price: 2,
        //   address: '8968 University High St, Burnaby, BC V5A 4Y6',
        //   type: 'Health food restaurant',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Quesada Burritos & Tacos',
        //   price: 1,
        //   address: '8961 Cornerstone Mews, Burnaby, BC V5A 4Y6',
        //   type: 'Tex-Mex restaurant',
        //   description: 'Test Restaurant'
        // },
        // {
        //   name: 'Steve\'s Poké Bar',
        //   price: 2,
        //   address: '8931 Cornerstone Mews, Burnaby, BC V5A 4Y7',
        //   type: 'Hawaiian restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Donair Town',
        //   price: 1,
        //   address: '8923 Cornerstone Mews, Burnaby, BC V5A 4Y6',
        //   type: 'Turkish restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Bamboo Garden Chinese Restaurant',
        //   price: 1,
        //   address: '8911 Cornerstone Mews, Burnaby, BC V5A 4Y6',
        //   type: 'Chinese restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Pizza Hut',
        //   price: 2,
        //   address: '8917 Cornerstone Mews, Burnaby, BC V5A 4Y6',
        //   type: 'Pizza restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Subway',
        //   price: 1,
        //   address: '916 University High St Unit R6, Burnaby, BC V5A 4Y6',
        //   type: 'Sandwich shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Starbucks',
        //   price: 2,
        //   address: '8906 University High St, Burnaby, BC V5A 4Y6',
        //   type: 'Coffee shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Club Ilia',
        //   price: 2,
        //   address: '8902 University High St, Burnaby, BC V5A 4X6',
        //   type: 'Pub restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'CaliBurger',
        //   price: 2,
        //   address: '8901 Cornerstone Mews, Burnaby, BC V5A 4Y6',
        //   type: 'Hamburger restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Pearl Fever Tea House',
        //   price: 1,
        //   address: '8951 Cornerstone Mews, Burnaby, BC V5A 4Y6',
        //   type: 'Bubble tea shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Japaritto',
        //   price: 2,
        //   address: '8910 University High St, Burnaby, BC V5A 4X6',
        //   type: 'Japanese restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Mackenzie Café',
        //   price: 1,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Cafeteria',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Renaissance Coffee AQ',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Coffee shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Junction 65',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Hamburger Restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Higher Grounds Coffee Shop',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Coffee shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Guadalupe Handmade Burritos',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Tex-Mex restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Noodle Waffle Cafe',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Hong Kong restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Gawon Korean Restaurant',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Korean restaurant',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Bubble World',
        //   price: 1,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Bubble Tea Shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'The Study Public House',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Pub',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Jugo Juice',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Juice shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Starbucks',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Coffee Shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Tim Hortons',
        //   price: 1,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Cafe',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Residence Dining Hall',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Cafeteria',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Renaissance Coffee ASB',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Coffee shop',
        //   description: 'Test restaurant'
        // },
        // {
        //   name: 'Menchie\'s Frozen Yogurt',
        //   price: 2,
        //   address: '8888 University Dr, Burnaby, BC V5A 1S6',
        //   type: 'Frozen yogurt shop',
        //   description: 'Test restaurant'
        // }
      ]);
    });
};
