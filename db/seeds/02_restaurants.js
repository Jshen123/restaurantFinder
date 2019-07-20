
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          name: 'A&W Canada',
          price: 1,
          address: 'A%26W%20Canada%20SFU',
          tag:  ['Fast food restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Bun & Me',
          price: 2,
          address: 'Bun%20%26%20Me',
          tag:  ['Vietnamese restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Togo Sushi',
          price: 2,
          address: 'Togo%20Sushi%20SFU',
          tag:  ['Japanese restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Chopped Leaf',
          price: 2,
          address: 'Chopped%20Leaf%20SFU',
          tag:  ['Salad shop'],
          description: 'Test Restaurant'
        },
        {
          name: 'Uncle Fatih\'s Pizza',
          price: 1,
          address: 'Uncle%20Fatih\'s%20Pizza%20SFU',
          tag:  ['Pizza restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Chef Hung Taiwanese Beef Noodle',
          price: 2,
          address: 'Chef%20Hung%20Taiwanese%20Beef%20Noodle%20SFU',
          tag:  ['Taiwanese restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Tim Hortons Cornerstone',
          price: 1,
          address: 'Tim%20Hortons%20University%20High',
          tag:  ['Coffee shop'],
          description: 'Test Restaurant'
        },
        {
          name: 'Nature\'s Garden Cafe SFU',
          price: 2,
          address: 'Nature\'s%20Garden%20Cafe%20SFU',
          tag:  ['Health food restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Quesada Burritos & Tacos',
          price: 1,
          address: 'Quesada%20Burritos%20and%20Tacos%20SFU',
          tag:  ['Tex-Mex restaurant'],
          description: 'Test Restaurant'
        },
        {
          name: 'Steve\'s Poké Bar',
          price: 2,
          address: 'Steve\'s%20Poke%20Bar%20SFU',
          tag:  ['Hawaiian restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Donair Town',
          price: 1,
          address: 'Donair%20Town%20SFU',
          tag:  ['Turkish restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Bamboo Garden Chinese Restaurant',
          price: 1,
          address: 'Bamboo%20Garden%20Chinese%20Restaurant%20SFU',
          tag:  ['Chinese restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Pizza Hut',
          price: 2,
          address: 'Pizza%20Hut%20SFU',
          tag:  ['Pizza restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Subway',
          price: 1,
          address: 'Subway%20SFU',
          tag:  ['Sandwich shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Starbucks Cornerstone',
          price: 2,
          address: 'Starbucks%20-%20Universtiy%20High%20St.%20V5A%204Y6',
          tag:  ['Coffee shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Club Ilia',
          price: 2,
          address: 'Club%20Ilia%20SFU',
          tag:  ['Pub restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'CaliBurger',
          price: 2,
          address: 'Caliburger%20SFU',
          tag:  ['Hamburger restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Pearl Fever Tea House',
          price: 1,
          address: 'Pearl%20Fever%20SFU',
          tag:  ['Bubble tea shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Japaritto',
          price: 2,
          address: '8910 University High St, Burnaby, BC V5A 4X6',
          tag:  ['Japanese restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Mackenzie Café',
          price: 1,
          address: 'Mackenzie%20Cafe%20SFU',
          tag:  ['Cafeteria'],
          description: 'Test restaurant'
        },
        {
          name: 'Renaissance Coffee AQ',
          price: 2,
          address: 'Renaissance%20Coffee%20SFU',
          tag:  ['Coffee shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Smoke\'s Poutinerie',
          price: 2,
          address: 'Smoke\'s%20Poutinerie%20SFU',
          tag:  ['Hamburger Restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Higher Grounds Coffee Shop',
          price: 2,
          address: 'Higher%20Grounds%20Coffee%20Shop%20SFU',
          tag:  ['Coffee shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Guadalupe Handmade Burritos',
          price: 2,
          address: 'Guadalupe%20SFU',
          tag:  ['Tex-Mex restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Noodle Waffle Cafe',
          price: 2,
          address: 'Noodle%20Waffle%20Cafe',
          tag:  ['Hong Kong restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Gawon Korean Restaurant',
          price: 2,
          address: 'Gawon%20Korean%20Restaurant',
          tag:  ['Korean restaurant'],
          description: 'Test restaurant'
        },
        {
          name: 'Bubble World',
          price: 1,
          address: 'Bubble%20World%20SFU',
          tag:  ['Bubble Tea Shop'],
          description: 'Test restaurant'
        },
        {
          name: 'The Study Public House',
          price: 2,
          address: 'The%20Study%20Public%20House',
          tag:  ['Pub'],
          description: 'Test restaurant'
        },
        {
          name: 'Jugo Juice',
          price: 2,
          address: '49.279388, -122.915710',
          tag:  ['Juice shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Starbucks West Mall',
          price: 2,
          address: 'Starbucks%20SFU%20West%20Mall',
          tag:  ['Coffee Shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Tim Hortons West Mall',
          price: 1,
          address: 'Tim%20Hortons%20SFU%20West%20Mall',
          tag:  ['Cafe'],
          description: 'Test restaurant'
        },
        {
          name: 'Residence Dining Hall',
          price: 2,
          address: 'Residence%20Dining%20Hall',
          tag:  ['Cafeteria'],
          description: 'Test restaurant'
        },
        {
          name: 'Renaissance Coffee ASB',
          price: 2,
          address: '49.277879, -122.914629',
          tag:  ['Coffee shop'],
          description: 'Test restaurant'
        },
        {
          name: 'Menchie\'s Frozen Yogurt',
          price: 2,
          address: 'Menchie\'s%20SFU',
          tag:  ['Frozen yogurt shop'],
          description: 'Test restaurant'
        }
      ]);
    });
};
