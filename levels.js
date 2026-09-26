// ColorGallery: famous public-domain paintings on the shared ColorEngine.
(function(){
const {INK,petals,circ,ring,holeRect}=CF;
// ---------- Art pictures (public domain: artists who died before 1956, works published before 1931) ----------
// Kandinsky: 6 tiles, each background + 2 rings + a center dot. Layers never overlap (rings), so draw order is free.
const KAN=(()=>{
  const tiles=[[0,3,6,2],[1,4,5,6],[2,7,0,3],[5,4,6,1],[0,2,6,7],[1,3,5,6]], out=Array.from({length:8},()=>'');
  tiles.forEach((t,i)=>{
    const x=4+(i%3)*105, y=4+Math.floor(i/3)*117, cx=x+51, cy=y+56;
    out[t[0]]+=holeRect(x,y,102,113,cx,cy,46); out[t[1]]+=ring(cx,cy,46,31); out[t[2]]+=ring(cx,cy,31,15); out[t[3]]+=`<circle cx="${cx}" cy="${cy}" r="15"/>`;
  });
  return out;
})();
// Klee: a 5×4 mosaic of warm blocks
const KLEE=(()=>{
  const g=['CDBCF','BADEB','DFABC','AECAD'], out={};
  g.forEach((row,r)=>[...row].forEach((k,c)=>{out[k]=(out[k]||'')+`<rect x="${c*64}" y="${r*60}" width="64" height="60"/>`;}));
  return out;
})();
const HEAD=(cx,cy,r)=>{let s='';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=`<ellipse cx="${(cx+Math.cos(a)*r*.72).toFixed(1)}" cy="${(cy+Math.sin(a)*r*.72).toFixed(1)}" rx="${(r*.36).toFixed(1)}" ry="${(r*.2).toFixed(1)}" transform="rotate(${(a*180/Math.PI).toFixed(0)} ${(cx+Math.cos(a)*r*.72).toFixed(1)} ${(cy+Math.sin(a)*r*.72).toFixed(1)})"/>`;}return s;};
const SUN=[[160,62,26,'a'],[108,86,22,'b'],[214,88,24,'c'],[74,130,20,'c'],[252,132,20,'a'],[140,124,22,'c'],[196,130,20,'b'],[112,36,17,'b'],[214,36,17,'a']];

const ART_LEVELS=[
{ id:'mondrian', title:'Composition', tier:'easy', intro:'undo', sub:'Pure color between straight lines.',
  credit:'After <i>Composition with Red, Blue and Yellow</i> by Piet Mondrian, 1930 (public domain)',
  bg:`<rect width="320" height="240" fill="#e7e5df"/>`,
  regions:[
    {id:'red',name:'Red square',recipe:{M:1,Y:1},svg:'<rect x="100" y="0" width="180" height="160"/>'},
    {id:'white',name:'White blocks',recipe:{W:1},svg:'<rect x="40" y="0" width="60" height="80"/><rect x="40" y="80" width="60" height="80"/><rect x="100" y="160" width="130" height="80"/><rect x="230" y="160" width="50" height="35"/>'},
    {id:'blue',name:'Blue block',recipe:{C:2,M:1},svg:'<rect x="40" y="160" width="60" height="80"/>'},
    {id:'yellow',name:'Yellow block',recipe:{M:1,Y:4},svg:'<rect x="230" y="195" width="50" height="45"/>'},
    {id:'lines',name:'Black lines',recipe:{K:1},stroke:7,svg:'<path d="M100 0V240M40 80H100M40 160H280M230 160V240M230 195H280"/>'},
  ],
  order:['white','red','blue','yellow','lines'],
  decor:`<rect x="40" y="0" width="240" height="240" fill="none" stroke="${INK}" stroke-width="1.5" pointer-events="none"/>`
},
{ id:'kandinsky', title:'Concentric Circles', tier:'normal', intro:'pick', sub:'Eight colors, repeated across six squares.',
  credit:'After <i>Squares with Concentric Circles</i> by Wassily Kandinsky, 1913 (public domain)',
  bg:`<rect width="320" height="240" fill="${INK}"/>`,
  regions:[
    {id:'k0',name:'Night blue',recipe:{C:2,M:1,K:1},svg:KAN[0]},
    {id:'k1',name:'Ochre',recipe:{W:1,M:1,Y:2},svg:KAN[1]},
    {id:'k2',name:'Teal',recipe:{W:1,C:2,Y:1},svg:KAN[2]},
    {id:'k3',name:'Crimson',recipe:{M:3,Y:1},svg:KAN[3]},
    {id:'k4',name:'Sky blue',recipe:{W:3,C:3,M:1},svg:KAN[4]},
    {id:'k5',name:'Violet',recipe:{C:1,M:2},svg:KAN[5]},
    {id:'k6',name:'Lemon',recipe:{W:1,Y:3},svg:KAN[6]},
    {id:'k7',name:'Black',recipe:{K:1},svg:KAN[7]},
  ],
  order:['k0','k1','k2','k3','k4','k5','k6','k7'], decor:''
},
{ id:'redfuji', title:'Red Fuji', tier:'hard', sub:'Hard: close blues, tight paint. Plan every drop.',
  credit:'After <i>Fine Wind, Clear Morning</i> by Katsushika Hokusai, c. 1831 (public domain)',
  regions:[
    {id:'upper',name:'Upper sky',recipe:{W:1,C:2,M:1},svg:'<rect x="0" y="0" width="320" height="72"/>'},
    {id:'lower',name:'Lower sky',recipe:{W:3,C:2,M:1},svg:'<rect x="0" y="72" width="320" height="168"/>'},
    {id:'clouds',name:'Clouds',recipe:{W:6,M:1},svg:[[28,112],[62,124],[34,140],[92,104],[70,152],[250,118],[284,104],[268,140],[298,132],[236,150]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="17" ry="5"/>`).join('')},
    {id:'fuji',name:'Red Fuji',recipe:{M:2,Y:1,K:1},svg:'<path d="M-10 240C60 200 120 150 172 72L204 62L232 72C262 122 292 172 330 204V240Z"/>'},
    {id:'snow',name:'Snow',recipe:{W:5,K:1},svg:'<path d="M172 72L204 62L232 72L241 88L228 82L220 96L208 84L196 98L186 84L166 94Z"/>'},
    {id:'slope',name:'Lower slope',recipe:{C:1,M:2,Y:2},svg:'<path d="M-10 240C60 208 112 194 152 192C204 194 262 208 330 222V240Z"/>'},
    {id:'forest',name:'Forest',recipe:{C:1,Y:1,K:2},svg:'<path d="M0 240V222C20 214 30 220 42 212C54 220 66 208 80 214C92 206 104 214 116 210C126 218 136 212 148 218C132 226 120 232 112 240Z"/>'},
  ],
  order:['upper','lower','clouds','fuji','snow','slope','forest'],
  decor:`<g fill="none" stroke="${INK}" stroke-width="1.2" pointer-events="none"><path d="M196 110l-6 30M214 104l4 34M182 130l-10 28M230 124l8 26"/></g>`
},
{ id:'klee', title:'Castle and Sun', tier:'normal', intro:'hint', sub:'A mosaic of warm blocks under a golden sun.',
  credit:'After <i>Castle and Sun</i> by Paul Klee, 1928 (public domain)',
  regions:[
    {id:'A',name:'Brick',recipe:{M:2,Y:1},svg:KLEE.A},
    {id:'B',name:'Apricot',recipe:{W:2,M:2,Y:3},svg:KLEE.B},
    {id:'C',name:'Rose',recipe:{W:2,M:1},svg:KLEE.C},
    {id:'D',name:'Violet',recipe:{W:2,C:1,M:3},svg:KLEE.D},
    {id:'E',name:'Moss',recipe:{W:1,C:1,Y:3,K:1},svg:KLEE.E},
    {id:'F',name:'Sand',recipe:{W:2,M:1,Y:1},svg:KLEE.F},
    {id:'towers',name:'Towers',recipe:{W:1,K:2},svg:'<path d="M128 120L160 72L192 120Z"/><path d="M192 180L224 136L256 180Z"/><path d="M64 180L88 140L112 180Z"/><rect x="146" y="120" width="28" height="60"/>'},
    {id:'sun',name:'Sun',recipe:{W:1,M:2,Y:4},svg:'<circle cx="236" cy="48" r="26"/>'},
  ],
  order:['A','B','C','D','E','F','towers','sun'], decor:''
},
{ id:'monet', title:'Japanese Bridge', tier:'normal', sub:'A green bridge over a pond of water lilies.',
  credit:'After <i>Bridge over a Pond of Water Lilies</i> by Claude Monet, 1899 (public domain)',
  regions:[
    {id:'foliage',name:'Foliage',recipe:{C:1,Y:2,K:1},svg:'<rect x="0" y="0" width="320" height="160"/>'},
    {id:'willow',name:'Willows',recipe:{W:1,C:1,Y:3},svg:'<path d="M0 0H70C60 40 80 70 60 110C50 130 30 120 20 140C10 120 0 130 0 110Z"/><path d="M320 0H250C262 40 240 70 262 110C272 130 290 120 300 140C310 120 320 130 320 110Z"/>'},
    {id:'pond',name:'Pond',recipe:{W:2,C:3,M:1,Y:1},svg:'<rect x="0" y="150" width="320" height="90"/>'},
    {id:'shadow',name:'Reflections',recipe:{C:2,Y:1,K:2},svg:'<path d="M0 160Q80 175 160 165T320 168V185Q240 195 160 188T0 190Z"/>'},
    {id:'pads',name:'Lily pads',recipe:{C:3,Y:4},svg:[[40,204,18,6],[92,224,22,7],[150,208,16,5],[210,226,24,7],[270,206,18,6],[122,234,14,4],[250,236,16,4],[60,234,12,4]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}"/>`).join('')},
    {id:'lilies',name:'Lilies',recipe:{W:3,M:1},svg:[[46,201],[98,221],[216,223],[266,203],[150,206],[126,232]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5"/>`).join('')},
    {id:'bridge',name:'Bridge',recipe:{W:1,C:3,Y:2},stroke:6,svg:'<path d="M-10 128Q160 58 330 128M-10 104Q160 34 330 104M30 113.5V89.5M80 100.8V76.8M130 94.1V70.1M190 94.1V70.1M240 100.8V76.8M290 113.5V89.5"/>'},
  ],
  order:['foliage','willow','pond','shadow','pads','lilies','bridge'], decor:''
},
{ id:'scream', title:'The Scream', tier:'normal', sub:'A blazing sky over a dark fjord.',
  credit:'After <i>The Scream</i> by Edvard Munch, 1893 (public domain)',
  regions:[
    {id:'flame',name:'Flaming sky',recipe:{M:3,Y:2},svg:'<path d="M0 0H320V40Q280 30 240 44T160 40T80 48T0 38Z"/>'},
    {id:'orange',name:'Orange sky',recipe:{M:1,Y:2},svg:'<path d="M0 38Q40 48 80 48T160 40T240 44T320 40V78Q270 64 220 80T120 74T0 84Z"/>'},
    {id:'yellow',name:'Yellow sky',recipe:{W:2,M:1,Y:4},svg:'<path d="M0 84Q60 70 120 74T220 80T320 78V104Q250 96 190 110T0 112Z"/>'},
    {id:'fjord',name:'Fjord',recipe:{C:3,M:1,K:2},svg:'<path d="M0 112Q60 108 120 110Q100 128 140 136Q90 150 60 172Q30 150 0 160Z"/>'},
    {id:'hills',name:'Hills',recipe:{C:2,Y:3,K:1},svg:'<path d="M120 110Q190 100 320 104V170Q260 150 200 146Q160 140 140 136Q100 128 120 110Z"/><path d="M0 160Q30 150 60 172Q40 200 0 214Z"/>'},
    {id:'bridge',name:'Bridge',recipe:{W:1,C:1,M:2,Y:3},svg:'<path d="M0 214L320 118V170L120 240H0Z"/>'},
    {id:'coat',name:'Coat',recipe:{C:1,M:1,K:2},svg:'<path d="M150 240C146 210 160 190 158 172C156 160 170 150 180 152C192 154 196 166 194 178C192 196 204 214 206 240Z"/>'},
    {id:'face',name:'Face',recipe:{W:4,C:1,Y:1},svg:'<path d="M178 152C166 152 160 138 162 124C164 110 172 102 180 102C190 102 197 110 197 124C197 140 190 152 178 152Z"/>'},
  ],
  order:['flame','orange','yellow','fjord','hills','bridge','coat','face'],
  decor:`<g fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" pointer-events="none"><path d="M0 206L320 110"/><path d="M160 136C150 150 152 170 158 176M196 134C204 148 200 168 194 176"/></g><g fill="${INK}" pointer-events="none"><ellipse cx="173" cy="122" rx="3" ry="4.5"/><ellipse cx="186" cy="122" rx="3" ry="4.5"/><ellipse cx="179.5" cy="138" rx="3" ry="5"/></g><g fill="${INK}" pointer-events="none"><path d="M40 222l6-30h8l6 30z"/><path d="M66 212l5-24h7l5 24z"/></g>`
},
{ id:'wave', title:'The Great Wave', tier:'hard', sub:'Hard: pale shades that look alike. Watch the match bar.',
  credit:'After <i>The Great Wave off Kanagawa</i> by Katsushika Hokusai, c. 1831 (public domain)',
  regions:[
    {id:'sky',name:'Sky',recipe:{W:4,M:1,Y:2},svg:'<rect x="0" y="0" width="320" height="240"/>'},
    {id:'fuji',name:'Mount Fuji',recipe:{W:3,C:1,K:1},svg:'<path d="M168 204L203 160L215 158L252 204Z"/>'},
    {id:'deep',name:'Deep wave',recipe:{C:3,M:1,K:1},svg:'<path d="M0 240V150C20 110 50 70 100 50C150 32 200 44 214 70C190 56 160 60 150 80C140 100 160 120 180 116C150 140 120 170 110 240Z"/><path d="M200 240C220 204 262 184 320 180V240Z"/>'},
    {id:'light',name:'Light wave',recipe:{W:2,C:2,M:1},svg:'<path d="M20 240C30 190 60 140 100 110C120 150 110 200 90 240Z"/><path d="M244 240C262 216 290 206 320 206V240Z"/>'},
    {id:'boats',name:'Boats',recipe:{W:3,M:1,Y:3},svg:'<path d="M60 198Q110 186 160 172L166 178Q116 194 64 206Z"/><path d="M180 214Q230 202 290 198L292 204Q236 210 184 222Z"/>'},
    {id:'foam',name:'Foam',recipe:{W:6,C:1},svg:[[100,50],[118,44],[136,42],[154,44],[170,48],[186,54],[200,62],[210,72],[150,84],[158,98],[170,110],[40,110],[30,130],[262,186],[282,182],[302,180]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5"/>`).join('')},
  ],
  order:['sky','fuji','deep','light','boats','foam'],
  decor:`<path d="M198 166L203 160L215 158L222 166L215 164L209 170L204 164Z" fill="#fff" stroke="${INK}" stroke-width="1.2" pointer-events="none"/>`
},
{ id:'sunflowers', title:'Sunflowers', tier:'nightmare', sub:'Nightmare: nine flowers, three yellows, almost no spare paint.',
  credit:'After <i>Sunflowers</i> by Vincent van Gogh, 1888 (public domain)',
  regions:[
    {id:'wall',name:'Wall',recipe:{W:3,C:1,Y:4},svg:'<rect x="0" y="0" width="320" height="172"/>'},
    {id:'table',name:'Table',recipe:{W:1,M:2,Y:5},svg:'<rect x="0" y="172" width="320" height="68"/>'},
    {id:'leaves',name:'Leaves',recipe:{C:2,Y:5,K:1},svg:'<ellipse cx="120" cy="164" rx="26" ry="8" transform="rotate(-24 120 164)"/><ellipse cx="202" cy="164" rx="26" ry="8" transform="rotate(26 202 164)"/><ellipse cx="96" cy="112" rx="18" ry="6" transform="rotate(30 96 112)"/>'},
    {id:'vase',name:'Vase',recipe:{W:1,M:1,Y:3},svg:'<path d="M130 240C122 214 120 192 132 172H188C200 192 198 214 190 240Z"/>'},
    {id:'pa',name:'Bright petals',recipe:{M:1,Y:6},svg:SUN.filter(h=>h[3]==='a').map(h=>HEAD(h[0],h[1],h[2])).join('')},
    {id:'pb',name:'Orange petals',recipe:{M:2,Y:5},svg:SUN.filter(h=>h[3]==='b').map(h=>HEAD(h[0],h[1],h[2])).join('')},
    {id:'pc',name:'Pale petals',recipe:{W:2,M:1,Y:6},svg:SUN.filter(h=>h[3]==='c').map(h=>HEAD(h[0],h[1],h[2])).join('')},
    {id:'centers',name:'Seed heads',recipe:{C:1,M:2,Y:3,K:1},svg:SUN.map(h=>`<circle cx="${h[0]}" cy="${h[1]}" r="${(h[2]*.42).toFixed(1)}"/>`).join('')},
  ],
  order:['wall','table','leaves','vase','pa','pb','pc','centers'],
  decor:`<path d="M126 214H194" stroke="${INK}" stroke-width="2" pointer-events="none"/>`
},
];
const ORDER=['malevich','mondrian','kandinsky','redfuji','klee','starry','monet','scream','wave','sunflowers'];
const LEVELS=[
{ id:'malevich', title:'Suprematism', sub:'Only white and black. Balance light and dark.', budget:8, tier:'easy', paints:['W','K'], intro:'empty',
  credit:'After <i>Suprematism</i> by Kazimir Malevich, 1915 (public domain)',
  tip:{title:'Welcome to the gallery',text:'Famous paintings have lost their color. Tap or drag a paint into the bowl; a part paints itself when the match reaches 95%. This first one needs only <b>White</b> and <b>Black</b>.'},
  bg:`<rect width="320" height="240" fill="#d8d2c6"/><rect x="66" y="0.5" width="188" height="239" fill="#b89a6c" stroke="${INK}" stroke-width="2"/>`,
  regions:[
    {id:'square',name:'Black square',recipe:{K:1},svg:'<path d="M121.9 16.9H200.4V94.2H121.9Z"/>'},
    {id:'canvas',name:'Canvas',recipe:{W:1},svg:'<rect x="70" y="4.5" width="180" height="231"/>'},
    {id:'bar',name:'Gray bar',recipe:{W:1,K:1},svg:'<path d="M202.6 205.8 237.0 178.6 244.9 188.5 210.5 215.7Z"/>'},
  ],
  order:['canvas','square','bar'],
  decor:`<g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round" pointer-events="none">
    <path d="M83.8 106.8H115.9V157.9H83.8Z" fill="#f5b800"/><path d="M104.8 157.9H124.8V175.2H104.8Z" fill="#9a4a1f"/>
    <path fill-rule="evenodd" d="M123.60000000000001 146.0a12.3 12.3 0 1 0 24.6 0a12.3 12.3 0 1 0 -24.6 0zM128.0 146.0a7.9 7.9 0 1 1 15.8 0a7.9 7.9 0 1 1 -15.8 0z" fill="#9a4a1f"/>
    <path d="M147.3 172.0 200.2 135.7 224.1 187.5 191.0 214.7Z" fill="#1f4fa3"/></g>`
},
{ id:'starry', title:'Starry Night', sub:'Hard: deep night blues. Every drop counts.', tier:'hard',
  credit:'After <i>The Starry Night</i> by Vincent van Gogh, 1889 (public domain)',
  regions:[
    {id:'stars',name:'Stars',recipe:{W:3,Y:4},svg:[[110,30],[178,22],[228,68],[302,96],[18,62],[140,62],[92,86],[250,20]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6"/>`).join('')},
    {id:'moon',name:'Moon',recipe:{W:1,M:1,Y:5},svg:'<circle cx="276" cy="44" r="21"/>'},
    {id:'hills',name:'Hills',recipe:{C:2,Y:1},svg:'<path d="M0 150Q60 126 120 144T232 136T320 146V192H0Z"/>'},
    {id:'swirl',name:'Wind swirls',recipe:{W:2,C:3,M:1},stroke:8,svg:'<path d="M0 100C50 72 90 124 140 98C168 84 184 62 214 72"/><path d="M172 108C152 124 118 112 122 90C126 70 158 70 162 88C165 100 152 105 145 97"/><path d="M196 118C228 96 262 124 304 106"/><path d="M58 48C90 36 112 56 152 44"/><path d="M216 44C238 30 250 58 272 74"/>'},
    {id:'village',name:'Village',recipe:{W:2,C:1,M:1,K:1},svg:'<path d="M0 184Q100 172 200 180T320 178V240H0Z"/><path d="M120 190v-12l9-7 9 7v12z"/><path d="M146 192v-10l8-6 8 6v10z"/><path d="M200 188v-14l10-8 10 8v14z"/><path d="M232 190v-10l8-6 8 6v10z"/><path d="M262 190v-14l9-7 9 7v14z"/><path d="M292 192v-10l7-6 7 6v10z"/><path d="M176 190v-30l5-34 5 34v30z"/>'},
    {id:'cypress',name:'Cypress tree',recipe:{C:1,Y:1,K:3},svg:'<path d="M36 240C24 214 40 200 34 176C44 158 38 140 48 124C44 104 56 92 52 72C60 58 58 38 66 16C72 36 72 54 78 70C76 90 86 104 82 122C92 140 86 158 96 176C92 200 106 214 104 240Z"/>'},
    {id:'sky',name:'Night sky',recipe:{C:2,M:1,K:2},svg:'<rect x="0" y="0" width="320" height="200"/>'},
  ],
  order:['sky','swirl','stars','moon','hills','village','cypress'],
  decor:`<g fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round" pointer-events="none">
    <path d="M268 30a16 16 0 1 0 14 26a12 12 0 1 1 -14 -26z"/>
    <path d="M60 60c4 20 2 40 8 60M54 110c4 30 6 60 16 110M74 90c2 30 12 70 18 130"/></g>
    <g fill="${INK}" pointer-events="none"><rect x="126" y="182" width="3" height="3"/><rect x="206" y="178" width="3" height="3"/><rect x="268" y="180" width="3" height="3"/><rect x="152" y="184" width="3" height="3"/></g>`
}
].concat(ART_LEVELS).sort((a,b)=>ORDER.indexOf(a.id)-ORDER.indexOf(b.id));
// ---------- Art quiz: free paint when you run out, plus a daily quiz with a streak ----------
// Facts are only filled where they are unambiguous: prints with many impressions, works in several
// versions or private collections have no museum; artists with contested nationality have no country.
const QUIZ={
  options:4, rescuePaint:5, rescuePerDay:3,            // out-of-paint quiz: +5 paint, once per picture attempt, 3 a day
  dailyCoins:[10,15,20,25,30,35,50],                   // daily quiz reward by streak day (day 7+ keeps the last value)
  easyTypes:['artist','style','country'], allTypes:['artist','century','style','museum','country'],
  artistGroups:{
    modern:['Kazimir Malevich','Piet Mondrian','Wassily Kandinsky','Paul Klee','Henri Matisse','Pablo Picasso','Robert Delaunay','Gustav Klimt'],
    impressionist:['Vincent van Gogh','Claude Monet','Pierre-Auguste Renoir','Paul Cézanne','Paul Gauguin','Edgar Degas','Edvard Munch','Georges Seurat'],
    japanese:['Katsushika Hokusai','Utagawa Hiroshige','Kitagawa Utamaro','Utagawa Kuniyoshi'],
    oldmaster:['Leonardo da Vinci','Johannes Vermeer','Rembrandt','Sandro Botticelli','Raphael','Titian'],
  },
  pools:{
    styles:['Suprematism','De Stijl','Abstract art','Ukiyo-e','Expressionism','Post-Impressionism','Impressionism','Renaissance','Dutch Golden Age','Art Nouveau','Cubism','Baroque'],
    museums:['Louvre, Paris','Museum of Modern Art, New York','The Met, New York','Uffizi, Florence','Rijksmuseum, Amsterdam','Mauritshuis, The Hague','Belvedere, Vienna','National Gallery, London','Kunsthaus Zürich','Lenbachhaus, Munich','National Museum, Oslo',"Musée d'Orsay, Paris",'Musée Marmottan Monet, Paris','Prado, Madrid'],
    countries:['Netherlands','France','Japan','Norway','Russia','Italy','Austria','Spain','Germany'],
  },
  facts:[
    {id:'malevich',title:'Suprematism',artist:'Kazimir Malevich',century:'20th century',style:'Suprematism',group:'modern',fact:'Malevich built his Suprematist paintings from nothing but simple geometric shapes on a white ground.'},
    {id:'mondrian',title:'Composition with Red, Blue and Yellow',artist:'Piet Mondrian',century:'20th century',style:'De Stijl',museum:'Kunsthaus Zürich',country:'Netherlands',group:'modern',fact:'Mondrian limited himself to the three primary colors, plus black, white and gray.'},
    {id:'kandinsky',title:'Squares with Concentric Circles',artist:'Wassily Kandinsky',century:'20th century',style:'Abstract art',museum:'Lenbachhaus, Munich',country:'Russia',group:'modern',fact:"It's a small color study on paper, not a large canvas."},
    {id:'redfuji',title:'Fine Wind, Clear Morning (Red Fuji)',artist:'Katsushika Hokusai',century:'19th century',style:'Ukiyo-e',country:'Japan',group:'japanese',fact:'It belongs to the series Thirty-six Views of Mount Fuji, printed from carved wooden blocks.'},
    {id:'klee',title:'Castle and Sun',artist:'Paul Klee',century:'20th century',group:'modern',fact:'Klee was teaching at the Bauhaus art school in Germany when he painted it.'},
    {id:'starry',title:'The Starry Night',artist:'Vincent van Gogh',century:'19th century',style:'Post-Impressionism',museum:'Museum of Modern Art, New York',country:'Netherlands',group:'impressionist',fact:'Van Gogh painted it from memory of the view from his window at the asylum in Saint-Rémy-de-Provence.'},
    {id:'monet',title:'Bridge over a Pond of Water Lilies',artist:'Claude Monet',century:'19th century',style:'Impressionism',museum:'The Met, New York',country:'France',group:'impressionist',fact:'Monet had the pond and the Japanese-style bridge built in his own garden at Giverny.'},
    {id:'scream',title:'The Scream',artist:'Edvard Munch',century:'19th century',style:'Expressionism',museum:'National Museum, Oslo',country:'Norway',group:'impressionist',fact:'Munch made several versions of The Scream, in paint, pastel and print.'},
    {id:'wave',title:'The Great Wave off Kanagawa',artist:'Katsushika Hokusai',century:'19th century',style:'Ukiyo-e',country:'Japan',group:'japanese',fact:'Look closely: Mount Fuji sits small in the background, between the waves.'},
    {id:'sunflowers',title:'Sunflowers',artist:'Vincent van Gogh',century:'19th century',style:'Post-Impressionism',country:'Netherlands',group:'impressionist',fact:'Van Gogh painted his sunflowers to decorate the room for his friend Paul Gauguin in Arles.'},
    // Not levels yet: text-only questions in the daily quiz
    {id:'monalisa',title:'Mona Lisa',artist:'Leonardo da Vinci',century:'16th century',style:'Renaissance',museum:'Louvre, Paris',country:'Italy',group:'oldmaster',fact:"It's painted on a poplar wood panel, not on canvas."},
    {id:'pearl',title:'Girl with a Pearl Earring',artist:'Johannes Vermeer',century:'17th century',style:'Dutch Golden Age',museum:'Mauritshuis, The Hague',country:'Netherlands',group:'oldmaster',fact:"It's a tronie, a study of a face, not a portrait of a known sitter."},
    {id:'kiss',title:'The Kiss',artist:'Gustav Klimt',century:'20th century',style:'Art Nouveau',museum:'Belvedere, Vienna',country:'Austria',group:'modern',fact:'Klimt used real gold leaf on the canvas.'},
    {id:'venus',title:'The Birth of Venus',artist:'Sandro Botticelli',century:'15th century',style:'Renaissance',museum:'Uffizi, Florence',country:'Italy',group:'oldmaster',fact:'Venus arrives on a giant scallop shell, blown ashore by the winds.'},
    {id:'sunrise',title:'Impression, Sunrise',artist:'Claude Monet',century:'19th century',style:'Impressionism',museum:'Musée Marmottan Monet, Paris',country:'France',group:'impressionist',fact:'This painting gave the Impressionist movement its name.'},
    {id:'nightwatch',title:'The Night Watch',artist:'Rembrandt',century:'17th century',style:'Dutch Golden Age',museum:'Rijksmuseum, Amsterdam',country:'Netherlands',group:'oldmaster',fact:"It isn't a night scene: darkened varnish earned it the nickname."},
  ],
};
window.GAME={name:'ColorGallery', saveKey:'colorgallery', firstProper:'kandinsky',
  logo:'img/logo-hero.jpg', shareLogo:'img/logo-card.jpg', levels:LEVELS, quiz:QUIZ};
})();
