let EASY = [
    "black",
    "gray",
    "white",
    "red",
    "green",
    "lime",
    "olive",
    "navy",
    "blue",
    "teal",
    "aqua",
    "beige",
    "brown",
    "coral",
    "cyan",
    "gold",
    "pink",
    "khaki",
    "plum",
    "wheat",
    'lion',
    'cow',
    'shark',
    'duck',
    'goat',
    'koala',
    'tiger',
    'panda',
    'bear',
    'horse',
    "zebra",
    'china',
    'spain',
    'italy',
    'peru',
    "egypt",
    'japan',

  ];
let MEDIUM = [
    "silver",
    "purple",
    "maroon",
    "yellow",
    'monkey',
    'mexico',
    "orange",
    "crimson",
    'rabbit',
    'penguin',
    "salmon",
    'girafee',
    'canada',
    'lizard',
    'france',
    'brasil',
    'israel',
    "russia"
    
  ];
  
let HARD = [
    "fuchsia",
    "aliceblue",
    "aquamarine",
    "chocolate",
    "darkcyan",
    "burlywood",
    "cadetblue",
    "mistyrose",
    "springgreen",
    'colombia',
    'thailand',
    'england',

  ];

  function randomWord(type=EASY
  ){
    switch(type){
        case 'medium':
            return MEDIUM[Math.floor(Math.random()*MEDIUM.length)]
        
        
        case 'hard':
            return HARD[Math.floor(Math.random()*HARD.length)]
        
        case 'easy':
            return EASY
          [Math.floor(Math.random()*EASY
            .length)]
    
        default:
            return EASY
          [Math.floor(Math.random()*EASY
            .length)]
    }
    

  }
  export {randomWord}