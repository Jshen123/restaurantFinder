
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
          tag:  ['Fast food','Burgers','Cornerstone'],
          description: 'Find out what is cooking at A&W. From tasty burgers to crispy onion rings to frosty mugs of Root Beer to the plant-based Beyond Meat Burger, we have got it all.'
        },
        {
          name: 'Bun & Me',
          price: 2,
          address: 'Bun%20%26%20Me',
          tag:  ['Vietnamese','Sandwiches','Cornerstone'],
          description: 'Serving up delicious fresh, local, and quality authentic Vietnamese food including bánh mì, rice plates and Vietnamese Coffee to SFU!'
        },
        {
          name: 'Togo Sushi',
          price: 2,
          address: 'Togo%20Sushi%20SFU',
          tag:  ['Japanese','Seafood','Rice','Noodles','Cornerstone'],
          description: 'We take pride in serving you fresh assortments of nigiri sushi, maki sushi and sashimi made on site, everyday with top quality, nutritious ingredients. Togo Sushi is dedicated to bringing you ultimate sushi experience.'
        },
        {
          name: 'Chopped Leaf',
          price: 2,
          address: 'Chopped%20Leaf%20SFU',
          tag:  ['Salads','Healthy','Vegetarian','Cornerstone'],
          description: 'Our goal is fast, fresh and healthy food delivered with exceptional timeliness for premium customer service. Raising the bar for fast food everywhere.'
        },
        {
          name: 'Uncle Fatih\'s Pizza',
          price: 1,
          address: 'Uncle%20Fatih\'s%20Pizza%20SFU',
          tag:  ['Pizza','Cornerstone'],
          description: 'Healthy, freshly made dough everyday, combined with rustic, traditional, never frozen ingredients. Drop on by to our pizza-pie shop and refuel your belly with the non-hydrogenated energy your body craves and your taste buds cant resist.'
        },
        {
          name: 'Chef Hung Taiwanese Beef Noodle',
          price: 2,
          address: 'Chef%20Hung%20Taiwanese%20Beef%20Noodle%20SFU',
          tag:  ['Taiwanese','Noodles','Cornerstone'],
          description: 'Serving authentic Taiwanese cuisine, Chef Hung is an award-winning chef known for his Taiwanese beef noodle dishes. Our store offers a variety of bowls of noodles as well as other Taiwanese delicacies that are bound to satisfy your taste buds.'
        },
        {
          name: 'Tim Hortons Cornerstone',
          price: 1,
          address: 'Tim%20Hortons%20University%20High',
          tag:  ['Fast Food','Coffee','Cornerstone'],
          description: 'Tim Hortons is the perfect place for great-tasting, freshly brewed coffee. We also offer specialty beverages including lattes, cappuccinos, espresso, iced and frozen coffee, hot chocolate and tea.'
        },
        {
          name: 'Nature\'s Garden Cafe SFU',
          price: 2,
          address: 'Nature\'s%20Garden%20Cafe%20SFU',
          tag:  ['Healthy','Coffee','Sandwiches','Cornerstone'],
          description: 'We are your weekday morning ritual. We are fresh baked breads, cookies and muffins. We are your place for lunch with a friend. We are your local meeting place. We are your place to escape and enjoy yourself over coffee drinks made with care.'
        },
        {
          name: 'Quesada Burritos & Tacos',
          price: 1,
          address: 'Quesada%20Burritos%20and%20Tacos%20SFU',
          tag:  ['Mexican','Burritos','Cornerstone'],
          description: 'Hand-mashed guacamole and house-made salsa take hours of chopping, roasting and blending, but we wouldn\’t have it any other way. Creating a delicious, pleasurable experience is our ultimate goal. Bite into Quesada and to experience The Joy of Mex.'
        },
        {
          name: 'Steve\'s Poké Bar',
          price: 2,
          address: 'Steve\'s%20Poke%20Bar%20SFU',
          tag:  ['Hawaiian','Seafood','Cornerstone'],
          description: 'Steve’s Poké Bar is a locally owned Hawaiian poké joint serving a variety of flavoured and seasoned raw fish with many options. Customers can enjoy poké with homemade recipes mixed fresh daily, and can choose whichever seafood and toppings they desire.'
        },
        {
          name: 'Donair Town',
          price: 1,
          address: 'Donair%20Town%20SFU',
          tag:  ['Middle Eastern','Cornerstone'],
          description: 'Donair Town is a locally owned donair joint serving a variety of donairs, plates, falafels in different types of meat including beef, chicken, and lamb. Customers can also enjoy many exotic Turkish side dishes, come drop by for a quick bite!'
        },
        {
          name: 'Bamboo Garden Chinese Restaurant',
          price: 1,
          address: 'Bamboo%20Garden%20Chinese%20Restaurant%20SFU',
          tag:  ['Chinese','Noodles','Rice','Cornerstone'],
          description: 'Bamboo Garden is a locally owned Cantonese style joint that offers a variety of topping options ranging from sweet and sour pork to BBQ chicken, served on fried rice or chow mein as a combo. Come visit for affordable Chinese food!'
        },
        {
          name: 'Pizza Hut',
          price: 2,
          address: 'Pizza%20Hut%20SFU',
          tag:  ['Pizza','Cornerstone'],
          description: 'At Pizza Hut, we don\’t just make pizza. We make people\’s days. Pizza Hut was built on the belief that pizza night should be special, and we carry that belief into everything we do. We create food we\’re proud to serve and deliver it fast, with a smile.'
        },
        {
          name: 'Subway',
          price: 1,
          address: 'Subway%20SFU',
          tag:  ['Fast Food','Sandwiches','Cornerstone'],
          description: 'Eat fresh! Subway is the world’s largest submarine sandwich chain with more than 44,000 locations around the world. Enjoy delicious, made-to-order sandwiches from this convenient location in the Cornerstone area.'
        },
        {
          name: 'Starbucks Cornerstone',
          price: 2,
          address: 'Starbucks%20-%20Universtiy%20High%20St.%20V5A%204Y6',
          tag:  ['Coffee','Cornerstone'],
          description: 'Starbucks offers more than 30 blends of handcrafted beverages including fresh-brewed coffee, hot and iced espresso beverages, Frappuccino coffee and non-coffee blended beverages, smoothies and teas. Baked pastries, sandwiches, & salads are also available.'
        },
        {
          name: 'Club Ilia',
          price: 2,
          address: 'Club%20Ilia%20SFU',
          tag:  ['Italian','Pizza','Burgers','Alcohol','Cornerstone'],
          description: 'Close-to-campus bar & grill dishing up burgers, pizza & Italian favorites, plus a full bar & patio. In the award winning UniverCity community, Club Ilia is a local favorite of students, staff and neighbours alike. Visit us today and taste what\’s cookin!'
        },
        {
          name: 'CaliBurger',
          price: 2,
          address: 'Caliburger%20SFU',
          tag:  ['Fast Food','Burgers','Cornerstone'],
          description: 'CaliBurger believes that fresh tastes best, that selection matters, and service still counts. Our signature CaliBurgers are always made with 100% all-beef and our chicken burgers are top-grade. Quality and confidence, that\’s the CaliBurger commitment.'
        },
        {
          name: 'Pearl Fever Tea House',
          price: 1,
          address: 'Pearl%20Fever%20SFU',
          tag:  ['Bubble Tea','Cornerstone'],
          description: 'Based in the lower mainland, Pearl Fever Teahouse is dedicated to its bubble tea craft and consistency in quality. Our service to individual taste aims to evolve the way we think of bubble tea.'
        },
        {
          name: 'Japarrito',
          price: 2,
          address: '8910 University High St, Burnaby, BC V5A 4X6',
          tag:  ['Japanese','Burritos','Seafood','Cornerstone'],
          description: 'A fresh way to roll. Japanese burritos are different from traditional sushi. It does not offer any wasabi or ginger and each Japarrito is crafted with its homemade sauce. You eat it with your hands like a burrito. Come by for a new experience!'
        },
        {
          name: 'Mackenzie Café',
          price: 1,
          address: 'Mackenzie%20Cafe%20SFU',
          tag:  ['Cafeteria','Academic Quadrangle'],
          description: 'Whether you are looking for something crafted between two buns, breakfast for dinner, a stone fired pizza pie or something to enjoy with chopsticks, the Mackenzie Café\'s got it all. A warm and comfortable café to enjoy a meal or spend time with a friend.'
        },
        {
          name: 'Renaissance Coffee AQ',
          price: 2,
          address: 'Renaissance%20Coffee%20SFU',
          tag:  ['Coffee','Academic Quadrangle'],
          description: 'Renaissance Coffee is a locally owned coffee shop with a wide variety of drinks ranging from an americano to a london fog. We also sell many different snacks such as banana bread or cookies. Stop by for a quick visit to kickstart your day!'
        },
        {
          name: 'Smoke\'s Poutinerie',
          price: 2,
          address: 'Smoke\'s%20Poutinerie%20SFU',
          tag:  ['Fast Food','Burgers','Academic Quadrangle'],
          description: 'Smoke’s Poutinerie is the first of its kind in the World offering a broad menu exclusive to Poutine. The goal of Smoke’s Poutinerie is to bring the authentic Quebec classic to the rest of the World.'
        },
        {
          name: 'Higher Grounds Coffee Shop',
          price: 2,
          address: 'Higher%20Grounds%20Coffee%20Shop%20SFU',
          tag:  ['Coffee','Maggie Benston Centre'],
          description: 'If you\’re in the Food Court, and hankering for a hot cup of coffee to start off the day feeling fresh, then Higher Grounds is the place for you. We\'ve got a good selection of baked goods, as well as smoothies, iced drinks, and sandwiches. Come on by!'
        },
        {
          name: 'Guadalupe Handmade Burritos',
          price: 2,
          address: 'Guadalupe%20SFU',
          tag:  ['Mexican','Burritos','Maggie Benston Centre'],
          description: 'It starts with our recipes. From over 20 years living in the Heart of Texas we bring you our most loved recipes, and combine them into one in-house made, freshly pressed tortilla. Our mission is simple: to bring you high quality food at a great price.'
        },
        {
          name: 'Noodle Waffle Cafe',
          price: 2,
          address: 'Noodle%20Waffle%20Cafe',
          tag:  ['Chinese','Noodles','Rice','Maggie Benston Centre'],
          description: 'We serve healthy food from dishes taken directly from our Asian roots, but with a little west-coast flare. We make our dishes from scratch using fresh, nutritious and tasty ingredients because we believe that\'s where great taste comes from.'
        },
        {
          name: 'Gawon Korean Restaurant',
          price: 2,
          address: 'Gawon%20Korean%20Restaurant',
          tag:  ['Korean','Noodles','Rice','Maggie Benston Centre'],
          description: 'At SFU and looking for Korean cuisine? Come visit Gawon in the MBC food court to try out our popular dishes like kimchi fried rice or spicy rice cakes. We also serve other delicious dishes such as beef ramen and kim-bap (korean sushi).'
        },
        {
          name: 'Bubble World',
          price: 1,
          address: 'Bubble%20World%20SFU',
          tag:  ['Bubble Tea','Maggie Benston Centre'],
          description: 'Bubble world is a Taiwanese cuisine restaurant. We are absorbed in offering the best food service and Taiwanese food culture to all our guests. Come and visit to try out our delicious selection of Taiwanese entrées or for perhaps a quick bubble tea run!'
        },
        {
          name: 'The Study Public House',
          price: 2,
          address: 'The%20Study%20Public%20House',
          tag:  ['Burgers','Sandwiches','Alcohol','Maggie Benston Centre'],
          description: 'Located at the heart of the SFU, the Study seats 320 along with an expansive patio with views from Burnaby Mountain. The newest vibrant social hub at SFU with fun activities. Your space to unwind with tasty drinks & meals to create memorable experiences.'
        },
        {
          name: 'Jugo Juice',
          price: 2,
          address: '49.279388, -122.915710',
          tag:  ['Juice and Smoothies','Academic Quadrangle'],
          description: 'Jugo Juice is establishing itself as the most recognized and respected brand for smoothies in Canada. Our goal is to offer customers not just the finest smoothies, juices and food products anywhere, but also a complete healthy lifestyle experience.'
        },
        {
          name: 'Starbucks West Mall',
          price: 2,
          address: 'Starbucks%20SFU%20West%20Mall',
          tag:  ['Coffee','West Mall Centre'],
          description: 'Starbucks offers more than 30 blends of handcrafted beverages including fresh-brewed coffee, hot and iced espresso beverages, Frappuccino coffee and non-coffee blended beverages, smoothies and teas. Baked pastries, sandwiches, & salads are also available.'
        },
        {
          name: 'Tim Hortons West Mall',
          price: 1,
          address: 'Tim%20Hortons%20SFU%20West%20Mall',
          tag:  ['Fast Food','Coffee','Breakfast','West Mall Centre'],
          description: 'Tim Hortons is the perfect place for great-tasting, freshly brewed coffee. We also offer specialty beverages including lattes, cappuccinos, espresso, iced and frozen coffee, hot chocolate and tea.'
        },
        {
          name: 'Residence Dining Hall',
          price: 2,
          address: 'Residence%20Dining%20Hall',
          tag:  ['Cafeteria','Residence and Housing Building'],
          description: 'Join us at the Dining Hall as you have the freedom and flexibility to choose to eat what you want, when you want it!  The Dining Hall is a great place to meet new friends, learn to cook at our chef assisted myPantry station, or just sit back and relax.'
        },
        {
          name: 'Renaissance Coffee ASB',
          price: 2,
          address: '49.277879, -122.914629',
          tag:  ['Coffee','Applied Science Building'],
          description: 'Renaissance Coffee is a locally owned coffee shop with a wide variety of drinks ranging from an americano to a london fog. We also sell many different snacks such as banana bread or cookies. Stop by for a quick visit to kickstart your day!'
        },
        {
          name: 'Menchie\'s Frozen Yogurt',
          price: 2,
          address: 'Menchie\'s%20SFU',
          tag:  ['Frozen Yogurt','Academic Quadrangle'],
          description: 'Menchie\'s is a self-serve frozen yogurt chain with dozens of flavours and toppings. Our goal is to make you smile and provide you with great tasting, high quality frozen yogurt that will have you coming back for more.'
        }
      ]);
    });
};
