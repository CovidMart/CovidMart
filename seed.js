const db = require('./server/db')
const {User, Puzzle, Order, PuzzleOrders} = require('./server/db/models')

//feel free to add cool puzzles to the seed data!
const puzzles = [
  {
    title: 'Wharhol TP Mask',
    price: 2199,
    pieceCount: 700,
    dimensions: '27.56" x 19.69"',
    imageUrl: '/puzzles/wharholTPmask.jpg',
    category: 'Art',
    description:
      'This stunning piece of modern art captures the zeitgeist of our times. A brilliant green background with Wharhol-esque screen printed foreground is sure to be fun for the whole family! As a rare 700-piece puzzle, this is a great transition from beginner into more advanced puzzling.'
  },
  {
    title: 'Dogs Playing Poker',
    price: 3191,
    pieceCount: 700,
    dimensions: '27.56" x 16.68"',
    imageUrl: '/puzzles/pokerDogs.jpg',
    category: 'Art',
    description:
      'This famous kitsch artwork by Cassius Marcellus Coolidge is the perfect home entertainment for everyone, with a challenging 1,000-piece jigsaw spread on wood-board backing, this will last a lifetime.'
  },
  {
    title: 'Voltsillam',
    price: 3529,
    pieceCount: 5663,
    dimensions: '8x11',
    imageUrl: 'http://dummyimage.com/327x281.jpg/cc0000/ffffff',
    category: 'Sports',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    title: 'Span',
    price: 3362,
    pieceCount: 353,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/397x356.jpg/5fa2dd/ffffff',
    category: 'Nature',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.'
  },
  {
    title: 'Andalax',
    price: 3796,
    pieceCount: 3104,
    dimensions: '22.5x34',
    imageUrl: 'http://dummyimage.com/200x328.jpg/dddddd/000000',
    category: 'Nature',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  },
  {
    title: 'Alpha',
    price: 4256,
    pieceCount: 1591,
    dimensions: '10x8',
    imageUrl: 'http://dummyimage.com/258x297.jpg/5fa2dd/ffffff',
    category: 'Sports',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.'
  },
  {
    title: 'Wrapsafe',
    price: 2241,
    pieceCount: 1870,
    dimensions: '22.5x34',
    imageUrl: 'http://dummyimage.com/278x374.jpg/5fa2dd/ffffff',
    category: 'Kittens',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.'
  },
  {
    title: 'Transcof',
    price: 3404,
    pieceCount: 5670,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/213x238.jpg/5fa2dd/ffffff',
    category: 'Kittens',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    title: 'Subin',
    price: 2958,
    pieceCount: 2886,
    dimensions: '10x8',
    imageUrl: 'http://dummyimage.com/225x270.jpg/cc0000/ffffff',
    category: 'Sports',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.'
  },
  {
    title: 'Viva',
    price: 442,
    pieceCount: 6652,
    dimensions: '32x46',
    imageUrl: 'http://dummyimage.com/361x290.jpg/dddddd/000000',
    category: 'Fantasy',
    description:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'
  },
  {
    title: 'Zamit',
    price: 4948,
    pieceCount: 5126,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/340x203.jpg/5fa2dd/ffffff',
    category: 'Art',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.'
  },
  {
    title: 'Vagrammo',
    price: 521,
    pieceCount: 2802,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/266x320.jpg/5fa2dd/ffffff',
    category: 'Kittens',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  },
  {
    title: 'Stronghold',
    price: 3953,
    pieceCount: 8958,
    dimensions: '10x8',
    imageUrl: 'http://dummyimage.com/366x262.jpg/5fa2dd/ffffff',
    category: 'Nature',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'
  },
  {
    title: 'Thunder Storm',
    price: 525,
    pieceCount: 2787,
    dimensions: '10x8',
    imageUrl: 'http://dummyimage.com/352x388.jpg/ff4444/ffffff',
    category: 'Nature',
    description:
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.'
  },
  {
    title: 'Kitten Soccer',
    price: 1601,
    pieceCount: 8548,
    dimensions: '16x24',
    imageUrl: 'http://dummyimage.com/281x276.jpg/5fa2dd/ffffff',
    category: 'Sports',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.'
  },
  {
    title: 'Bigtax',
    price: 5432,
    pieceCount: 3554,
    dimensions: '22.5x34',
    imageUrl: 'http://dummyimage.com/362x216.jpg/dddddd/000000',
    category: 'Kittens',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    title: 'Gembucket',
    price: 3879,
    pieceCount: 9107,
    dimensions: '11x16',
    imageUrl: 'http://dummyimage.com/309x397.jpg/cc0000/ffffff',
    category: 'Fantasy',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.'
  },
  {
    title: 'Stage Craft',
    price: 2972,
    pieceCount: 6916,
    dimensions: '8x11',
    imageUrl: 'http://dummyimage.com/219x354.jpg/dddddd/000000',
    category: 'Nature',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.'
  },
  {
    title: 'Alpine Way',
    price: 1393,
    pieceCount: 2857,
    dimensions: '32x46',
    imageUrl: 'http://dummyimage.com/302x233.jpg/ff4444/ffffff',
    category: 'Nature',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    title: 'Regrant',
    price: 4172,
    pieceCount: 650,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/371x228.jpg/dddddd/000000',
    category: 'Art',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.'
  },
  {
    title: 'Veribet',
    price: 4436,
    pieceCount: 4442,
    dimensions: '22.5x34',
    imageUrl: 'http://dummyimage.com/342x313.jpg/ff4444/ffffff',
    category: 'Pop Culture',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.'
  },
  {
    title: 'Holdlamis',
    price: 197,
    pieceCount: 5934,
    dimensions: '8x11',
    imageUrl: 'http://dummyimage.com/318x293.jpg/5fa2dd/ffffff',
    category: 'Nature',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  },
  {
    title: 'Cookley',
    price: 3222,
    pieceCount: 1957,
    dimensions: '22.5x34',
    imageUrl: 'http://dummyimage.com/280x232.jpg/cc0000/ffffff',
    category: 'Sports',
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'
  },
  {
    title: 'Stronghold',
    price: 1674,
    pieceCount: 6902,
    dimensions: '8x11',
    imageUrl: 'http://dummyimage.com/200x302.jpg/5fa2dd/ffffff',
    category: 'Nature',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.'
  },
  {
    title: 'Konklux',
    price: 2532,
    pieceCount: 6467,
    dimensions: '16x24',
    imageUrl: 'http://dummyimage.com/254x201.jpg/5fa2dd/ffffff',
    category: 'Art',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.'
  },
  {
    title: 'Mat Lam Tam',
    price: 1484,
    pieceCount: 7163,
    dimensions: '16x24',
    imageUrl: 'http://dummyimage.com/376x350.jpg/ff4444/ffffff',
    category: 'Kittens',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
  },
  {
    title: 'Matsoft',
    price: 449,
    pieceCount: 6742,
    dimensions: '32x46',
    imageUrl: 'http://dummyimage.com/328x201.jpg/5fa2dd/ffffff',
    category: 'Sports',
    description:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.'
  },
  {
    title: 'Hogwarts',
    price: 1939,
    pieceCount: 9574,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/277x367.jpg/cc0000/ffffff',
    category: 'Fantasy',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  },
  {
    title: 'Y-find',
    price: 318,
    pieceCount: 9463,
    dimensions: '10x8',
    imageUrl: 'http://dummyimage.com/213x382.jpg/cc0000/ffffff',
    category: 'Pop Culture',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.'
  },
  {
    title: 'Fintone',
    price: 912,
    pieceCount: 2961,
    dimensions: '16x24',
    imageUrl: 'http://dummyimage.com/388x256.jpg/dddddd/000000',
    category: 'Fantasy',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'
  },
  {
    title: 'Stim',
    price: 3062,
    pieceCount: 1671,
    dimensions: '11x16',
    imageUrl: 'http://dummyimage.com/266x305.jpg/5fa2dd/ffffff',
    category: 'Art',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    title: 'Wrigley Field',
    price: 2309,
    pieceCount: 7397,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/226x338.jpg/cc0000/ffffff',
    category: 'Sports',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.'
  },
  {
    title: 'Treeflex',
    price: 3229,
    pieceCount: 1629,
    dimensions: '32x46',
    imageUrl: 'http://dummyimage.com/383x317.jpg/ff4444/ffffff',
    category: 'Kittens',
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.'
  },
  {
    title: 'Domainer',
    price: 1022,
    pieceCount: 744,
    dimensions: '12x18',
    imageUrl: 'http://dummyimage.com/322x336.jpg/dddddd/000000',
    category: 'Kittens',
    description:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'
  }
]

const users = [
  {
    email: 'anniejigsaw@jigmail.com',
    password: 'puzzle123',
    firstName: 'Annie',
    lastName: 'Smythers',
    phone: '808-249-5051',
    address: '42 Rainbow Lane, Ourtown, OH, 78965'
  },
  {
    email: 'ariddler0@nifty.com',
    password: 'AV6eYR',
    firstName: 'Alfy',
    lastName: 'Riddler',
    phone: '163-797-4152',
    address: '4364 Mockingbird Lane'
  },
  {
    email: 'mrogge1@w3.org',
    password: 'C9Vzyx8oRifC',
    firstName: 'Mab',
    lastName: 'Rogge',
    phone: 'error: Access denied to method String.',
    address: '5 Commercial Terrace'
  },
  {
    email: 'mpurches2@opensource.org',
    password: 'pwsVyN',
    firstName: 'Morty',
    lastName: 'Purches',
    phone: '942-703-2472',
    address: '0 Briar Crest Pass'
  },
  {
    email: 'dfonso3@toplist.cz',
    password: '7axZrh2Y',
    firstName: 'Dickie',
    lastName: 'Fonso',
    phone: '122-223-4456',
    address: '1017 Heffernan Park'
  },
  {
    email: 'eballentime4@devhub.com',
    password: 'GYQizoE',
    firstName: 'Ethelin',
    lastName: 'Ballentime',
    phone: '233-254-5564',
    address: '2082 Summerview Terrace'
  },
  {
    email: 'mrisley5@goo.gl',
    password: 'fNgm5QdirF',
    firstName: 'Magdaia',
    lastName: 'Risley',
    phone: '241-254-6587',
    address: '6 Twin Pines Avenue'
  },
  {
    email: 'bsickert6@virginia.edu',
    password: '9xU0efrSdGa1',
    firstName: 'Bald',
    lastName: 'Sickert',
    phone: '221-556-9981',
    address: '561 Oxford Street'
  },
  {
    email: 'mrhydderch7@hhs.gov',
    password: 'UKIVrV2Qww3',
    firstName: 'Marnie',
    lastName: 'Rhydderch',
    phone: '321-654-9871',
    address: '1756 Longview Terrace'
  },
  {
    email: 'ljaray8@apache.org',
    password: 'fXhO77q6Bo',
    firstName: 'Leanor',
    lastName: 'Jaray',
    phone: '111-442-3574',
    address: '526 Surrey Parkway'
  },
  {
    email: 'bwagen9@google.cn',
    password: 'Ku5Z9kAzqvV',
    firstName: 'Baron',
    lastName: 'Wagen',
    phone: '763-261-5434',
    address: '22512 Parkside Terrace'
  },
  {
    email: 'aleheudea@cornell.edu',
    password: 'mxInT3J',
    firstName: 'Anselma',
    lastName: 'Leheude',
    phone: '320-255-8874',
    address: '4812 North Terrace'
  },
  {
    email: 'ddurnb@reverbnation.com',
    password: 'u86jlCX0scrU',
    firstName: 'Darci',
    lastName: 'Durn',
    phone: '612-261-7345',
    address: '2 Sachtjen Park'
  },
  {
    email: 'ttreacec@pagesperso-orange.fr',
    password: '8pwwZ1f',
    firstName: 'Trueman',
    lastName: 'Treace',
    phone: '369-5678-1245',
    address: '1 Mitchell Alley'
  },
  {
    email: 'lbosseld@admin.ch',
    password: 'Yc0KZgohP7Is',
    firstName: 'Lydia',
    lastName: 'Bossel',
    phone: '255-485-1212',
    address: '94 Morrow Way'
  },
  {
    email: 'igeldarde@slideshare.net',
    password: 'l64nfwasl9U',
    firstName: 'Ileana',
    lastName: 'Geldard',
    phone: '320-249-5656',
    address: '5 Utah Street'
  },
  {
    email: 'bcesconif@patch.com',
    password: 'b0F07e7j',
    firstName: 'Banky',
    lastName: 'Cesconi',
    phone: '612-369-4826',
    address: '852 Buell Drive'
  },
  {
    email: 'jpinchong@nyu.edu',
    password: 'TvRQ5m',
    firstName: 'Julieta',
    lastName: 'Pinchon',
    phone: '414-775-3188',
    address: '41 Express Circle'
  },
  {
    email: 'agovesh@shinystat.com',
    password: 'b5iQbfiJAs',
    firstName: 'Adriana',
    lastName: 'Goves',
    phone: '269-543-2294',
    address: '3104 Grover Junction'
  },
  {
    email: 'nmcmanamoni@google.it',
    password: '1ToTfksm',
    firstName: 'Nora',
    lastName: 'McManamon',
    phone: '269-797-0194',
    address: '4899 Crescent Oaks Center'
  },
  {
    email: 'mkynastonj@php.net',
    password: 'wKZLWygrpELG',
    firstName: 'Myrta',
    lastName: 'Kynaston',
    phone: '732-620-0680',
    address: '6753 Comanche Terrace'
  },
  {
    email: 'lbeartk@census.gov',
    password: '7Kmuke',
    firstName: 'Lezley',
    lastName: 'Beart',
    phone: '564-841-3883',
    address: '9 Vermont Drive'
  },
  {
    email: 'sdartel@theguardian.com',
    password: 'CiCjrqnZAnZ',
    firstName: 'Silvan',
    lastName: 'Darte',
    phone: '876-703-1092',
    address: '17024 Fisk Way'
  },
  {
    email: 'ejeannonm@ehow.com',
    password: 'YCc5o7KK',
    firstName: 'Emmi',
    lastName: 'Jeannon',
    phone: '558-982-5431',
    address: '10 Namekagon Point'
  },
  {
    email: 'icoweuppen@imdb.com',
    password: 'goUFbphYTMnF',
    firstName: 'Idelle',
    lastName: 'Coweuppe',
    phone: '450-156-1099',
    address: '2 Anhalt Place'
  },
  {
    email: 'ahallwardo@tinypic.com',
    password: 'cO75P9sUHlT',
    firstName: 'Agosto',
    lastName: 'Hallward',
    phone: '718-874-3820',
    address: '662 Packers Parkway'
  },
  {
    email: 'vcowtonp@europa.eu',
    password: 'KYe02hjnyW',
    firstName: 'Viva',
    lastName: 'Cowton',
    phone: '586-601-9762',
    address: '55369 Union Parkway'
  },
  {
    email: 'nbeszantq@addtoany.com',
    password: 'udt1rzYe',
    firstName: 'Niki',
    lastName: 'Beszant',
    phone: '712-617-0174',
    address: '4 Dexter Way'
  },
  {
    email: 'ggavaganr@bloglovin.com',
    password: 'AqU4LUVR2Ei',
    firstName: 'Gregorius',
    lastName: 'Gavagan',
    phone: '946-970-5543',
    address: '6 Moulton Court'
  },
  {
    email: 'gnuddes@mysql.com',
    password: 'JysG5IcPQ',
    firstName: 'Guido',
    lastName: 'Nudde',
    phone: '946-970-3193',
    address: '98 Sundown Drive'
  },
  {
    email: 'tmacsherryt@dmoz.org',
    password: 'JYyBJqN',
    firstName: 'Theodora',
    lastName: 'MacSherry',
    phone: '539-705-3918',
    address: '5891 Saint Paul Parkway'
  },
  {
    email: 'icoddu@cocolog-nifty.com',
    password: 'JBzqLx5G',
    firstName: 'Irvin',
    lastName: 'Codd',
    phone: '673-334-3304',
    address: '6 Ramsey Center'
  },
  {
    email: 'dcoasev@naver.com',
    password: '9ngex9',
    firstName: 'Dorelle',
    lastName: 'Coase',
    phone: '755-815-3349',
    address: '13 Badeau Center'
  },
  {
    email: 'uizzardw@accuweather.com',
    password: 'clklbSBSqa',
    firstName: 'Ulberto',
    lastName: 'Izzard',
    phone: '736-621-5984',
    address: '3 7th Pass'
  },
  {
    email: 'siglesiasx@delicious.com',
    password: 'otU3JyqGISK',
    firstName: 'Silvanus',
    lastName: 'Iglesias',
    phone: '304-233-9838',
    address: '67 Brickson Park Drive'
  },
  {
    email: 'mvandersony@people.com.cn',
    password: 'gqeDbSoY',
    firstName: 'Max',
    lastName: 'Vanderson',
    phone: '272-198-0635',
    address: '10 Pearson Plaza'
  },
  {
    email: 'daubrunz@wikispaces.com',
    password: 'SHE2hp',
    firstName: 'Danice',
    lastName: 'Aubrun',
    phone: '617-358-7090',
    address: '9 Blaine Park'
  },
  {
    email: 'pdood10@digg.com',
    password: '5ZDXTl2B',
    firstName: 'Puff',
    lastName: 'Dood',
    phone: '164-430-1050',
    address: '5 Rowland Junction'
  },
  {
    email: 'tazema11@ebay.com',
    password: 'RUcZN9x',
    firstName: 'Tome',
    lastName: 'Azema',
    phone: '624-466-6040',
    address: '67091 Beilfuss Place'
  },
  {
    email: 'kbalducci12@jugem.jp',
    password: 'gKtQoCI',
    firstName: 'Konrad',
    lastName: 'Balducci',
    phone: '811-186-6742',
    address: '555 Farmco Point'
  },
  {
    email: 'rwillcock13@berkeley.edu',
    password: 'Y9J6UM9MN',
    firstName: 'Rudyard',
    lastName: 'Willcock',
    phone: '452-178-0139',
    address: '354 Northridge Street'
  },
  {
    email: 'sstetlye14@cornell.edu',
    password: 'bmfuFpZFLUk',
    firstName: 'Simeon',
    lastName: 'Stetlye',
    phone: '367-237-6674',
    address: '54645 Bunker Hill Terrace'
  },
  {
    email: 'jcanedo15@imgur.com',
    password: 'LbYaBC63',
    firstName: 'Jarvis',
    lastName: 'Canedo',
    phone: '926-535-6934',
    address: '98 Green Ridge Circle'
  },
  {
    email: 'fsilman16@ask.com',
    password: 'bMmOvV0y',
    firstName: 'Frances',
    lastName: 'Silman',
    phone: '338-577-8506',
    address: '0436 Hermina Drive'
  },
  {
    email: 'vwray17@infoseek.co.jp',
    password: 'REMVZW',
    firstName: 'Vassili',
    lastName: 'Wray',
    phone: '239-609-3721',
    address: '721 Bartillon Street'
  },
  {
    email: 'mvidgen18@unblog.fr',
    password: 'WyGR2vJsTUxu',
    firstName: 'Marlon',
    lastName: 'Vidgen',
    phone: '540-584-6185',
    address: '09823 Florence Court'
  },
  {
    email: 'chartas19@mapy.cz',
    password: 'HykTGCqie',
    firstName: 'Clarette',
    lastName: 'Hartas',
    phone: '710-354-6023',
    address: '7221 Meadow Ridge Junction'
  },
  {
    email: 'egershom1a@ucoz.com',
    password: 'CBlI6rcpS9U8',
    firstName: 'Edd',
    lastName: 'Gershom',
    phone: '614-892-3003',
    address: '48162 Killdeer Parkway'
  },
  {
    email: 'lgason1b@hexun.com',
    password: '3x1MH94x',
    firstName: 'Lenore',
    lastName: 'Gason',
    phone: '904-971-6441',
    address: '34 Reindahl Road'
  },
  {
    email: 'mlevane1c@cyberchimps.com',
    password: '0KV3cjsale',
    firstName: 'Marielle',
    lastName: 'Levane',
    phone: '396-242-0326',
    address: '2295 Thackeray Way'
  },
  {
    email: 'cgallichan1d@bandcamp.com',
    password: 'pXpfz1WR',
    firstName: 'Conchita',
    lastName: 'Gallichan',
    phone: '544-774-5526',
    address: '587 Washington Place'
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
