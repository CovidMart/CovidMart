const db = require('./server/db')
const {User, Puzzle, Order, PuzzleOrders} = require('./server/db/models')

//feel free to add cool puzzles to the seed data!
const puzzles = [
  {
    title: 'Wharhol TP Mask',
    price: 1999,
    pieceCount: 2000,
    dimensions: '27.56" x 19.69"',
    imageUrl: '/puzzles/wharholTPmask.jpg',
    category: 'Art',
    description:
      'This stunning piece of modern art captures the zeitgeist of our times. A brilliant green background with Wharhol-esque screen printed foreground is sure to be fun for the whole family! As a rare 700-piece puzzle, this is a great transition from beginner into more advanced puzzling.'
  },
  {
    title: 'Dogs Playing Poker',
    price: 1499,
    pieceCount: 1500,
    dimensions: '27.56" x 16.68"',
    imageUrl: '/puzzles/pokerDogs.jpg',
    category: 'Art',
    description:
      'This famous kitsch artwork by Cassius Marcellus Coolidge is the perfect home entertainment for everyone, with a challenging 1,000-piece jigsaw spread on wood-board backing, this will last a lifetime.'
  },
  {
    title: 'Ted Williams',
    price: 2999,
    pieceCount: 3000,
    dimensions: '8x11',
    imageUrl:
      'https://baseballhall.org/sites/default/files/styles/fullscreen_image_popup/public/Williams%20Ted%206780.88_Bat_NBL_0.jpg?itok=CYaQ8m4h',
    category: 'Sports',
    description: 'A must have for the baseball lover in your life!'
  },
  {
    title: 'Animal Crossing View',
    price: 1999,
    pieceCount: 2000,
    dimensions: '12x18',
    imageUrl: 'https://miro.medium.com/max/1280/0*H9kJZup7794AwcLs.jpg',
    category: 'Nature',
    description: 'Looking good on your island!'
  },
  {
    title: 'A Walk In the Park',
    price: 2999,
    pieceCount: 3000,
    dimensions: '22.5x34',
    imageUrl:
      'https://41bfok2rrfmy84ghm2vvsaxf-wpengine.netdna-ssl.com/wp-content/uploads/2017/06/Harvest-Square-June-2018-Melanie-Manson-4-1024x768.jpg',
    category: 'Nature',
    description: 'How pretty!'
  },
  {
    title: 'Josh Allen',
    price: 2499,
    pieceCount: 2500,
    dimensions: '10x8',
    imageUrl:
      'https://static.nfl.com/static/content/public/photo/2020/01/04/0ap3000001094202.jpg ',
    category: 'Sports',
    description: "The Buffalo Bills best hope for a Super Bowl. Go Bill's"
  },
  {
    title: 'Patient Kittens',
    price: 999,
    pieceCount: 1000,
    dimensions: '22.5x34',
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/cmmuxL2n4qGheu5NgAoZZ-0rWjs4QRe9dS_LRUsAR0a5N2K1rO98h4jsdDZ0Z7qjj-Wasn7I2Dz5Camwe3Qt0czZG0Y8JnDZn62bJw',
    category: 'Kittens',
    description: 'Meow meow meow. Kittens!'
  },
  {
    title: 'Harvest Kittens',
    price: 2499,
    pieceCount: 2500,
    dimensions: '12x18',
    imageUrl:
      'https://media.newyorker.com/photos/5909697cc14b3c606c106f22/master/pass/Borowitz-New-Hillary-Clinton-Ad-Features-Just-Kittens.jpg',
    category: 'Kittens',
    description: 'Meow meow meow meow. Kittens!'
  },
  {
    title: 'Go Sports!',
    price: 2999,
    pieceCount: 3000,
    dimensions: '10x8',
    imageUrl:
      'https://www.sportswearable.net/wp-content/uploads/2019/03/sports-New-Brunswick.jpg',
    category: 'Sports',
    description: 'Why pick one when you can have them all!'
  },
  {
    title: 'Bigger on the Inside',
    price: 2500,
    pieceCount: 2499,
    dimensions: '32x46',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1550/5277/articles/DW_Tardis_Square_grande.jpg?v=1518600651',
    category: 'Fantasy',
    description: 'Step aboard the Tardis from "Doctor Who"'
  },
  {
    title: 'American Pop Culture',
    price: 2999,
    pieceCount: 3000,
    dimensions: '10x8',
    imageUrl:
      'https://ih1.redbubble.net/image.521980708.2292/flat,750x1000,075,f.jpg',
    category: 'Pop Culture',
    description: 'Americana!'
  },
  {
    title: 'The Starry Night',
    price: 999,
    pieceCount: 1000,
    dimensions: '12x18',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1569/2203/collections/starry-night_2048x.jpg?v=1555871516',
    category: 'Art',
    description:
      'The Starry Night, an oil on canvas by Dutch painter Vincent van Gogh.'
  },
  {
    title: 'Funny Cat in Green Hat',
    price: 2499,
    pieceCount: 2500,
    dimensions: '12x18',
    imageUrl: 'https://www.askideas.com/media/08/Funny-Cat-In-Green-Hat.jpg',
    category: 'Kittens',
    description: 'Meow meow meow. Kittens!'
  },
  {
    title: 'Sunset on the Beach',
    price: 2499,
    pieceCount: 2500,
    dimensions: '10x8',
    imageUrl: 'https://static.toiimg.com/photo/54406710/.jpg',
    category: 'Nature',
    description: 'A warm and beautiful scene'
  },
  {
    title: 'Thunder Storm',
    price: 999,
    pieceCount: 1000,
    dimensions: '10x8',
    imageUrl:
      'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    category: 'Nature',
    description: 'What a scene!'
  },
  {
    title: 'Miracle On Ice',
    price: 1499,
    pieceCount: 1500,
    dimensions: '16x24',
    imageUrl: 'https://d.newsweek.com/en/full/1568805/miracle-ice.jpg',
    category: 'Sports',
    description: "The 1980 'Miracle On Ice' US Olympic Hockey Team"
  },
  {
    title: 'Christmas Kittens',
    price: 1499,
    pieceCount: 1500,
    dimensions: '22.5x34',
    imageUrl:
      'https://4my3boyz.com/content/images/thumbs/0017780_christmas-pet-selfies-silly-holiday-cats-kittens-blue-cotton-fabric_500.jpeg',
    category: 'Kittens',
    description: 'Meowy Christmas!'
  },
  {
    title: 'Middle Earth',
    price: 3000,
    pieceCount: 2999,
    dimensions: '11x16',
    imageUrl: 'http://dummyimage.com/309x397.jpg/cc0000/ffffff',
    category: 'Fantasy',
    description:
      "The land of Middle Earth from J.R.R. Tolkien's Lord of the Rings"
  },
  {
    title: 'Hidden Waterfall',
    price: 2400,
    pieceCount: 2500,
    dimensions: '8x11',
    imageUrl:
      'https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg',
    category: 'Nature',
    description: 'A beautiful water scene'
  },
  {
    title: 'Alpine Way',
    price: 1999,
    pieceCount: 2000,
    dimensions: '32x46',
    imageUrl:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB11guXT.img?h=552&w=750&m=6&q=60&u=t&o=f&l=f',
    category: 'Nature',
    description: 'Get lost in this mountain view!'
  },
  {
    title: 'The Great Wave off Kanagawa',
    price: 999,
    pieceCount: 1000,
    dimensions: '12x18',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
    category: 'Art',
    description:
      'The Great Wave off Kanagawa, a woodblock print by the Japanese ukiyo-e artist Hokusai'
  },
  {
    title: 'Combic Book Pop!',
    price: 1499,
    pieceCount: 1500,
    dimensions: '22.5x34',
    imageUrl:
      'https://i.pinimg.com/originals/10/52/69/105269e5cad0204f07a74b6c2b9ac364.jpg',
    category: 'Pop Culture',
    description: 'POP!'
  },
  {
    title: 'Lost in the Woods',
    price: 999,
    pieceCount: 1000,
    dimensions: '8x11',
    imageUrl:
      'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA-iStock-1084289620-WB.jpg?itok=njJbmkM7',
    category: 'Nature',
    description: 'Get lost and find the beauty of nature '
  },
  {
    title: 'Victory Lap',
    price: 2999,
    pieceCount: 3000,
    dimensions: '22.5x34',
    imageUrl:
      'https://allthatsinteresting.com/wordpress/wp-content/uploads/2014/04/sports-photos-usain-bolt.jpg',
    category: 'Sports',
    description: 'Runnnnnnnnnn!'
  },
  {
    title: 'Reef',
    price: 1499,
    pieceCount: 1500,
    dimensions: '8x11',
    imageUrl:
      'https://images.theconversation.com/files/239870/original/file-20181009-72106-6bsj7z.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    category: 'Nature',
    description: 'Under the Sea!'
  },
  {
    title: 'Mona Lisa',
    price: 2499,
    pieceCount: 2500,
    dimensions: '16x24',
    imageUrl:
      'https://ae01.alicdn.com/kf/HTB1pvHHomfD8KJjSszhq6zIJFXan/3D-Diy-Round-Diamond-Painting-Kit-Cross-Stitch-Needlework-Mona-Lisa-Square-Drill-Diamond-Embroidery-Picture.jpg',
    category: 'Art',
    description: "Leonardo da Vinci's famous oil painting, The Mona Lisa "
  },
  {
    title: 'Grumpy Cat',
    price: 1499,
    pieceCount: 1500,
    dimensions: '16x24',
    imageUrl:
      'https://media1.s-nbcnews.com/j/newscms/2014_11/248401/140312-grumpy-cat-jms-1825_10dac16e180db5439aaaba7232b86596.fit-760w.jpg',
    category: 'Kittens',
    description: 'Meow meow meow. Kittens!'
  },
  {
    title: 'Serena Williams',
    price: 1499,
    pieceCount: 1500,
    dimensions: '32x46',
    imageUrl:
      'https://images.ctfassets.net/yixw23k2v6vo/cmq4RuZchqG8asksoSuUu/af7f8c9b855f6d85a48977bf44406eb8/Serena-Williams-GettyImages-544090226.jpg?w=600&h=400&fm=jpg&fit=thumb&q=65&fl=progressive',
    category: 'Sports',
    description: 'The Champ!'
  },
  {
    title: 'Hogwarts',
    price: 1999,
    pieceCount: 2000,
    dimensions: '12x18',
    imageUrl:
      'https://imgix.bustle.com/rehost/2016/9/13/70371c31-7d4c-4b46-839f-3225d06f8f99.jpg?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70',
    category: 'Fantasy',
    description: "Hogwarts Castle from J.K. Rowling's Harry Potter series"
  },

  {
    title: 'Pokemon',
    price: 1999,
    pieceCount: 2000,
    dimensions: '16x24',
    imageUrl:
      'https://www.altoonalibrary.org/wp-content/uploads/2019/08/pokemon.jpg',
    category: 'Fantasy',
    description: "Say 'I Choose You' to this adorable Pokemon puzzle"
  },
  {
    title: 'Girl With A Pearl Earing',
    price: 1499,
    pieceCount: 1500,
    dimensions: '11x16',
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/x0YY0CKf7WW0OIlL79zhsiBRcFNzcYA8f42JnbfdIHqDRnEsi18gCPf1V2igkJIdH3G_GexXFnfLXEkwP7uBFN8nr3la1JQNxUXsmy5dUUilO4WyLECpDXvNtGNBRnaFNUWiSTHFroe2aifXFbrx8vZBPymD7bz6xjBywwidhNGlZWAGS_eYzSkLBvXU6sDdBxk',
    category: 'Art',
    description:
      "This beautiful puzzle represents Johannes Vermeer's A Girl with a Pearl Earring. Sure to be treasured by the art lover in your family!"
  },
  {
    title: 'Ball is Life',
    price: 2000,
    pieceCount: 1999,
    dimensions: '12x18',
    imageUrl:
      'https://www.rotoworld.com/sites/default/files/svod/thumbnail/nbc_nhl_nbacoronavirusupdate_200311.jpg',
    category: 'Sports',
    description: 'Go Sports!'
  },
  {
    title: 'Big World, Little Kitten',
    price: 2999,
    pieceCount: 3000,
    dimensions: '32x46',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/55e7b445e4b04e7d0095c2cd/1556296318516-36C15R1S3A4H1GUP62QL/ke17ZwdGBToddI8pDm48kFyD7pzB8zoMIVY5aiUuFlp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jG2lbcDYBOeMi4OFSYem8DMb5PTLoEDdB05UqhYu-xbnSznFxIRsaAU-3g5IaylIg/AdobeStock_170586850+%281%29.jpeg?format=1000w',
    category: 'Kittens',
    description: 'Meow meow meow. Kittens!'
  },
  {
    title: 'A Cup of Kittens',
    price: 1000,
    pieceCount: 999,
    dimensions: '12x18',
    imageUrl: 'https://s1.dmcdn.net/v/AgmiK1LgyblVL95DG/x1080',
    category: 'Kittens',
    description: 'Meow meow meow. Kittens!'
  }
]

const users = [
  {
    email: 'anniejigsaw@jigmail.com',
    password: 'puzzle123',
    firstName: 'Annie',
    lastName: 'Smythers',
    phone: '808-249-5051',
    address: '42 Rainbow Lane, Ourtown, OH, 78965',
    isAdmin: false
  },
  {
    email: 'ariddler0@nifty.com',
    password: 'AV6eYR',
    firstName: 'Alfy',
    lastName: 'Riddler',
    phone: '163-797-4152',
    address: '4364 Mockingbird Lane',
    isAdmin: false
  },
  {
    email: 'mrogge1@w3.org',
    password: 'C9Vzyx8oRifC',
    firstName: 'Mab',
    lastName: 'Rogge',
    phone: 'error: Access denied to method String.',
    address: '5 Commercial Terrace',
    isAdmin: false
  },
  {
    email: 'mpurches2@opensource.org',
    password: 'pwsVyN',
    firstName: 'Morty',
    lastName: 'Purches',
    phone: '942-703-2472',
    address: '0 Briar Crest Pass',
    isAdmin: false
  },
  {
    email: 'dfonso3@toplist.cz',
    password: '7axZrh2Y',
    firstName: 'Dickie',
    lastName: 'Fonso',
    phone: '122-223-4456',
    address: '1017 Heffernan Park',
    isAdmin: false
  },
  {
    email: 'eballentime4@devhub.com',
    password: 'GYQizoE',
    firstName: 'Ethelin',
    lastName: 'Ballentime',
    phone: '233-254-5564',
    address: '2082 Summerview Terrace',
    isAdmin: false
  },
  {
    email: 'mrisley5@goo.gl',
    password: 'fNgm5QdirF',
    firstName: 'Magdaia',
    lastName: 'Risley',
    phone: '241-254-6587',
    address: '6 Twin Pines Avenue',
    isAdmin: false
  },
  {
    email: 'bsickert6@virginia.edu',
    password: '9xU0efrSdGa1',
    firstName: 'Bald',
    lastName: 'Sickert',
    phone: '221-556-9981',
    address: '561 Oxford Street',
    isAdmin: false
  },
  {
    email: 'mrhydderch7@hhs.gov',
    password: 'UKIVrV2Qww3',
    firstName: 'Marnie',
    lastName: 'Rhydderch',
    phone: '321-654-9871',
    address: '1756 Longview Terrace',
    isAdmin: false
  },
  {
    email: 'ljaray8@apache.org',
    password: 'fXhO77q6Bo',
    firstName: 'Leanor',
    lastName: 'Jaray',
    phone: '111-442-3574',
    address: '526 Surrey Parkway',
    isAdmin: false
  },
  {
    email: 'bwagen9@google.cn',
    password: 'Ku5Z9kAzqvV',
    firstName: 'Baron',
    lastName: 'Wagen',
    phone: '763-261-5434',
    address: '22512 Parkside Terrace',
    isAdmin: false
  },
  {
    email: 'aleheudea@cornell.edu',
    password: 'mxInT3J',
    firstName: 'Anselma',
    lastName: 'Leheude',
    phone: '320-255-8874',
    address: '4812 North Terrace',
    isAdmin: true
  },
  {
    email: 'ddurnb@reverbnation.com',
    password: 'u86jlCX0scrU',
    firstName: 'Darci',
    lastName: 'Durn',
    phone: '612-261-7345',
    address: '2 Sachtjen Park',
    isAdmin: false
  },
  {
    email: 'ttreacec@pagesperso-orange.fr',
    password: '8pwwZ1f',
    firstName: 'Trueman',
    lastName: 'Treace',
    phone: '369-5678-1245',
    address: '1 Mitchell Alley',
    isAdmin: false
  },
  {
    email: 'lbosseld@admin.ch',
    password: 'Yc0KZgohP7Is',
    firstName: 'Lydia',
    lastName: 'Bossel',
    phone: '255-485-1212',
    address: '94 Morrow Way',
    isAdmin: false
  },
  {
    email: 'igeldarde@slideshare.net',
    password: 'l64nfwasl9U',
    firstName: 'Ileana',
    lastName: 'Geldard',
    phone: '320-249-5656',
    address: '5 Utah Street',
    isAdmin: false
  },
  {
    email: 'bcesconif@patch.com',
    password: 'b0F07e7j',
    firstName: 'Banky',
    lastName: 'Cesconi',
    phone: '612-369-4826',
    address: '852 Buell Drive',
    isAdmin: false
  },
  {
    email: 'jpinchong@nyu.edu',
    password: 'TvRQ5m',
    firstName: 'Julieta',
    lastName: 'Pinchon',
    phone: '414-775-3188',
    address: '41 Express Circle',
    isAdmin: false
  },
  {
    email: 'agovesh@shinystat.com',
    password: 'b5iQbfiJAs',
    firstName: 'Adriana',
    lastName: 'Goves',
    phone: '269-543-2294',
    address: '3104 Grover Junction',
    isAdmin: false
  },
  {
    email: 'nmcmanamoni@google.it',
    password: '1ToTfksm',
    firstName: 'Nora',
    lastName: 'McManamon',
    phone: '269-797-0194',
    address: '4899 Crescent Oaks Center',
    isAdmin: false
  },
  {
    email: 'mkynastonj@php.net',
    password: 'wKZLWygrpELG',
    firstName: 'Myrta',
    lastName: 'Kynaston',
    phone: '732-620-0680',
    address: '6753 Comanche Terrace',
    isAdmin: true
  },
  {
    email: 'lbeartk@census.gov',
    password: '7Kmuke',
    firstName: 'Lezley',
    lastName: 'Beart',
    phone: '564-841-3883',
    address: '9 Vermont Drive',
    isAdmin: false
  },
  {
    email: 'sdartel@theguardian.com',
    password: 'CiCjrqnZAnZ',
    firstName: 'Silvan',
    lastName: 'Darte',
    phone: '876-703-1092',
    address: '17024 Fisk Way',
    isAdmin: false
  },
  {
    email: 'ejeannonm@ehow.com',
    password: 'YCc5o7KK',
    firstName: 'Emmi',
    lastName: 'Jeannon',
    phone: '558-982-5431',
    address: '10 Namekagon Point',
    isAdmin: false
  },
  {
    email: 'icoweuppen@imdb.com',
    password: 'goUFbphYTMnF',
    firstName: 'Idelle',
    lastName: 'Coweuppe',
    phone: '450-156-1099',
    address: '2 Anhalt Place',
    isAdmin: false
  },
  {
    email: 'ahallwardo@tinypic.com',
    password: 'cO75P9sUHlT',
    firstName: 'Agosto',
    lastName: 'Hallward',
    phone: '718-874-3820',
    address: '662 Packers Parkway',
    isAdmin: false
  },
  {
    email: 'vcowtonp@europa.eu',
    password: 'KYe02hjnyW',
    firstName: 'Viva',
    lastName: 'Cowton',
    phone: '586-601-9762',
    address: '55369 Union Parkway',
    isAdmin: false
  },
  {
    email: 'nbeszantq@addtoany.com',
    password: 'udt1rzYe',
    firstName: 'Niki',
    lastName: 'Beszant',
    phone: '712-617-0174',
    address: '4 Dexter Way',
    isAdmin: false
  },
  {
    email: 'ggavaganr@bloglovin.com',
    password: 'AqU4LUVR2Ei',
    firstName: 'Gregorius',
    lastName: 'Gavagan',
    phone: '946-970-5543',
    address: '6 Moulton Court',
    isAdmin: false
  },
  {
    email: 'gnuddes@mysql.com',
    password: 'JysG5IcPQ',
    firstName: 'Guido',
    lastName: 'Nudde',
    phone: '946-970-3193',
    address: '98 Sundown Drive',
    isAdmin: false
  },
  {
    email: 'tmacsherryt@dmoz.org',
    password: 'JYyBJqN',
    firstName: 'Theodora',
    lastName: 'MacSherry',
    phone: '539-705-3918',
    address: '5891 Saint Paul Parkway',
    isAdmin: false
  },
  {
    email: 'icoddu@cocolog-nifty.com',
    password: 'JBzqLx5G',
    firstName: 'Irvin',
    lastName: 'Codd',
    phone: '673-334-3304',
    address: '6 Ramsey Center',
    isAdmin: false
  },
  {
    email: 'dcoasev@naver.com',
    password: '9ngex9',
    firstName: 'Dorelle',
    lastName: 'Coase',
    phone: '755-815-3349',
    address: '13 Badeau Center',
    isAdmin: true
  },
  {
    email: 'uizzardw@accuweather.com',
    password: 'clklbSBSqa',
    firstName: 'Ulberto',
    lastName: 'Izzard',
    phone: '736-621-5984',
    address: '3 7th Pass',
    isAdmin: false
  },
  {
    email: 'siglesiasx@delicious.com',
    password: 'otU3JyqGISK',
    firstName: 'Silvanus',
    lastName: 'Iglesias',
    phone: '304-233-9838',
    address: '67 Brickson Park Drive',
    isAdmin: false
  },
  {
    email: 'mvandersony@people.com.cn',
    password: 'gqeDbSoY',
    firstName: 'Max',
    lastName: 'Vanderson',
    phone: '272-198-0635',
    address: '10 Pearson Plaza',
    isAdmin: false
  },
  {
    email: 'daubrunz@wikispaces.com',
    password: 'SHE2hp',
    firstName: 'Danice',
    lastName: 'Aubrun',
    phone: '617-358-7090',
    address: '9 Blaine Park',
    isAdmin: false
  },
  {
    email: 'pdood10@digg.com',
    password: '5ZDXTl2B',
    firstName: 'Puff',
    lastName: 'Dood',
    phone: '164-430-1050',
    address: '5 Rowland Junction',
    isAdmin: true
  },
  {
    email: 'tazema11@ebay.com',
    password: 'RUcZN9x',
    firstName: 'Tome',
    lastName: 'Azema',
    phone: '624-466-6040',
    address: '67091 Beilfuss Place',
    isAdmin: false
  },
  {
    email: 'kbalducci12@jugem.jp',
    password: 'gKtQoCI',
    firstName: 'Konrad',
    lastName: 'Balducci',
    phone: '811-186-6742',
    address: '555 Farmco Point',
    isAdmin: false
  },
  {
    email: 'rwillcock13@berkeley.edu',
    password: 'Y9J6UM9MN',
    firstName: 'Rudyard',
    lastName: 'Willcock',
    phone: '452-178-0139',
    address: '354 Northridge Street',
    isAdmin: false
  },
  {
    email: 'sstetlye14@cornell.edu',
    password: 'bmfuFpZFLUk',
    firstName: 'Simeon',
    lastName: 'Stetlye',
    phone: '367-237-6674',
    address: '54645 Bunker Hill Terrace',
    isAdmin: true
  },
  {
    email: 'jcanedo15@imgur.com',
    password: 'LbYaBC63',
    firstName: 'Jarvis',
    lastName: 'Canedo',
    phone: '926-535-6934',
    address: '98 Green Ridge Circle',
    isAdmin: false
  },
  {
    email: 'fsilman16@ask.com',
    password: 'bMmOvV0y',
    firstName: 'Frances',
    lastName: 'Silman',
    phone: '338-577-8506',
    address: '0436 Hermina Drive',
    isAdmin: false
  },
  {
    email: 'vwray17@infoseek.co.jp',
    password: 'REMVZW',
    firstName: 'Vassili',
    lastName: 'Wray',
    phone: '239-609-3721',
    address: '721 Bartillon Street',
    isAdmin: true
  },
  {
    email: 'mvidgen18@unblog.fr',
    password: 'WyGR2vJsTUxu',
    firstName: 'Marlon',
    lastName: 'Vidgen',
    phone: '540-584-6185',
    address: '09823 Florence Court',
    isAdmin: false
  },
  {
    email: 'chartas19@mapy.cz',
    password: 'HykTGCqie',
    firstName: 'Clarette',
    lastName: 'Hartas',
    phone: '710-354-6023',
    address: '7221 Meadow Ridge Junction',
    isAdmin: false
  },
  {
    email: 'egershom1a@ucoz.com',
    password: 'CBlI6rcpS9U8',
    firstName: 'Edd',
    lastName: 'Gershom',
    phone: '614-892-3003',
    address: '48162 Killdeer Parkway',
    isAdmin: false
  },
  {
    email: 'lgason1b@hexun.com',
    password: '3x1MH94x',
    firstName: 'Lenore',
    lastName: 'Gason',
    phone: '904-971-6441',
    address: '34 Reindahl Road',
    isAdmin: false
  },
  {
    email: 'mlevane1c@cyberchimps.com',
    password: '0KV3cjsale',
    firstName: 'Marielle',
    lastName: 'Levane',
    phone: '396-242-0326',
    address: '2295 Thackeray Way',
    isAdmin: false
  },
  {
    email: 'cgallichan1d@bandcamp.com',
    password: 'pXpfz1WR',
    firstName: 'Conchita',
    lastName: 'Gallichan',
    phone: '544-774-5526',
    address: '587 Washington Place',
    isAdmin: false
  }
]

//NOTE: cannot run seed with foreign keys
//(userId in order) --> manually add??
const orders = [
  {
    stillInCart: true,
    shippingStatus: 'Processing',
    pricePaid: 865
  },
  {
    stillInCart: false,
    shippingStatus: 'Shipped',
    pricePaid: 3199
  },
  {
    stillInCart: false,
    shippingStatus: 'Delivered',
    pricePaid: 1095
  },
  {
    stillInCart: false,
    shippingStatus: 'Delivered',
    pricePaid: 2832
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      users.map(user => {
        return User.create(user)
      }),

      puzzles.map(puzzle => {
        Puzzle.create(puzzle)
      }),

      orders.map(item => {
        Order.create(item)
      })
      // orderproducts.map(order =>{
      //   PuzzleOrders.create(order)
      // })
    )

    db.close()
  } catch (err) {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
