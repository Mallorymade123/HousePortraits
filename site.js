(function(){
  var S='fill="none" stroke="#1c2130" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"';
  function win(x,y,w,h){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/><path d="M'+x+' '+(y+h/2)+'h'+w+'M'+(x+w/2)+' '+y+'v'+h+'"/>';}
  function bush(x,y){return '<path d="M'+x+' '+y+'q4-12 10-4q5-10 10 0q7-6 8 4"/>';}
  var H={
    1:'<path d="M12 124H188"/><rect x="42" y="62" width="116" height="62"/><path d="M32 64L100 24L168 64M52 52h96M62 44h76M74 36h52"/><rect x="128" y="24" width="13" height="20"/><path d="M134 22q3-6 0-10q-3-5 2-9"/><rect x="92" y="90" width="18" height="34"/><circle cx="106" cy="108" r="1"/>'+win(54,76,24,22)+win(122,76,24,22)+bush(40,124)+bush(132,124)+'<path d="M92 124q-10 6-22 12M110 124q8 6 16 12"/>',
    2:'<path d="M20 126H180"/><rect x="60" y="30" width="80" height="96"/><path d="M54 30L100 10L146 30"/><rect x="118" y="8" width="12" height="16"/><path d="M68 126V84h34v42M68 92h34"/>'+win(74,96,22,24)+win(70,44,22,30)+win(108,44,22,30)+'<path d="M112 126V94q9-10 18 0v32"/><circle cx="126" cy="110" r="1"/><path d="M30 126v-16M38 126v-16M46 126v-16M54 126v-16M26 110h34M146 126v-16M154 126v-16M162 126v-16M170 126v-16M142 110h34"/>',
    3:'<path d="M8 126H192"/><rect x="24" y="46" width="152" height="80"/><path d="M18 46L44 20H156L182 46"/><rect x="50" y="8" width="12" height="14"/><rect x="138" y="8" width="12" height="14"/>'+win(34,56,18,24)+win(62,56,18,24)+win(91,56,18,24)+win(120,56,18,24)+win(148,56,18,24)+win(34,92,18,24)+win(62,92,18,24)+win(120,92,18,24)+win(148,92,18,24)+'<rect x="91" y="96" width="18" height="30"/><path d="M91 96q9-12 18 0M86 126V90h28v36"/><circle cx="105" cy="112" r="1"/>'+bush(26,126)+bush(146,126)
  };
  function house(n,wash){
    return '<svg viewBox="0 0 200 140" role="img" aria-label="Placeholder pen and ink drawing of a house">'+
      (wash?'<ellipse class="w" cx="100" cy="84" rx="78" ry="42" fill="none" filter="url(#blur)" opacity=".55"/>':'')+
      '<g '+S+' filter="url(#wob)">'+H[n]+'</g></svg>';
  }
  document.querySelectorAll('[data-house]').forEach(function(el){el.innerHTML=house(el.dataset.house,el.hasAttribute('data-wash'));});

  var frames=[['gilt','Gilt, a little foxed'],['oak','Dark oak'],['ebony','Ebonised, narrow'],['sage','Sage painted pine'],['bamboo','Faux bamboo'],['box','Deep box frame']];
  var grid=document.getElementById('frameGrid');
  if(grid) grid.innerHTML=frames.map(function(f,i){
    return '<label class="pick"><input type="radio" name="frame" id="frame'+(i+1)+'" value="'+i+'"'+(i===0?' checked':'')+'>'+
      '<div class="pinned"><div class="frame f-'+f[0]+'"><div class="mount">'+house(i%3+1)+'</div></div></div>'+
      '<div class="label"><b>Frame No. '+(i+1)+'</b><span>'+f[1]+'</span><span>£50 with your portrait</span></div></label>';
  }).join('');

  var washes=[['None',''],['Rose','#d98a8f'],['Sage','#8fb08a'],['Sky','#8fb4d6'],['Ochre','#d9b25a'],['Lilac','#b39ad0']];
  var wEl=document.getElementById('washes');
  if(wEl) wEl.innerHTML=washes.map(function(w,i){
    return '<label style="--c:'+(w[1]||'transparent')+'"><input type="radio" name="wash" id="wash'+i+'" value="'+w[1]+'"'+(i===1?' checked':'')+'><i></i>'+w[0]+'</label>';
  }).join('');

  var QL=[["There is nothing like staying at home for real comfort.", "Jane Austen, Emma"], ["The house that built us", ""], ["Be it ever so humble, there's no place like home.", "John Howard Payne, Home, Sweet Home"], ["Kettle on, door open", ""], ["Wherever you are is my home, my only home.", "Charlotte Brontë, Jane Eyre"], ["All of us, under one roof", ""], ["One feast, one house, one mutual happiness.", "William Shakespeare, The Two Gentlemen of Verona"], ["It's lovely to be going home and know it's home.", "L.M. Montgomery, Anne of Green Gables"], ["Full house, full heart", ""], ["Without hearts there is no home.", "Lord Byron, Don Juan"], ["Sir, you are very welcome to our house.", "William Shakespeare, The Merchant of Venice"], ["Where we became a family", ""], ["To be happy at home is the ultimate result of all ambition.", "Samuel Johnson, The Rambler"], ["And is there honey still for tea?", "Rupert Brooke, The Old Vicarage, Grantchester"], ["The kitchen table knows everything", ""], ["This castle hath a pleasant seat.", "William Shakespeare, Macbeth"], ["Your house is your larger body.", "Kahlil Gibran, The Prophet"], ["Our corner of the world", ""], ["Small cheer and great welcome makes a merry feast.", "William Shakespeare, The Comedy of Errors"], ["For there is no friend like a sister.", "Christina Rossetti, Goblin Market"], ["Here we began", ""], ["I remember, I remember, the house where I was born.", "Thomas Hood, I Remember, I Remember"], ["Now stir the fire, and close the shutters fast.", "William Cowper, The Task"], ["A homely home and simple pleasures.", "Jerome K. Jerome, Three Men in a Boat"], ["Thank you for having us", ""]], LIMIT=60;
  var quotes=QL.map(function(q){return q[0];});
  var qs=document.getElementById('quote');
  var qlEl=document.getElementById('quoteList');
  var qlHtml=QL.map(function(q,i){
    if(qs){var o=document.createElement('option');o.value=i;o.textContent=(i+1)+'. '+q[0];qs.appendChild(o);}
    return '<li>'+q[0]+'<span>'+(q[1]||'Our own line')+' · '+q[0].length+' characters</span></li>';
  }).join('');
  if(qlEl) qlEl.innerHTML=qlHtml;
  if(grid){
  var oo=document.createElement('option');oo.value='own';oo.textContent='My own words (up to '+LIMIT+' characters)';qs.appendChild(oo);
  var own=document.getElementById('own');own.maxLength=LIMIT;
  own.addEventListener('input',update);
  var matters=document.getElementById('matters');matters.addEventListener('input',update);

  function update(){
    var fi=+document.querySelector('input[name=frame]:checked').value;
    var wash=document.querySelector('input[name=wash]:checked').value;
    var n=document.getElementById('notelets').checked;
    document.querySelectorAll('ellipse.w').forEach(function(e){e.setAttribute('fill',wash||'none');});
    document.getElementById('pvFrame').className='frame pvframe f-'+frames[fi][0];
    document.getElementById('pv').innerHTML='<div class="washbox"><img src="burnley-drawing.jpg" alt="Pen and ink drawing of Burnley with a colour wash behind the house">'+(wash?'<i class="wash" style="--c:'+wash+'"></i>':'')+'</div>';
    var qv=qs.value;
    var isOwn=qv==='own';
    document.getElementById('ownField').hidden=!isOwn;
    document.getElementById('mattersCount').textContent=matters.value.length+' of 250 characters used';
    document.getElementById('sMatters').hidden=!matters.value.trim();
    document.getElementById('ownCount').textContent=own.value.length+' of '+LIMIT+' characters used';
    var line=isOwn?own.value:(qv!==''?quotes[+qv]:'');
    if(line){var st=document.createElement('div');st.className='strip';st.textContent=line;document.getElementById('pv').appendChild(st);}
    document.getElementById('sQuote').hidden=qv==='';
    document.getElementById('sFrame').textContent='Portrait in frame No. '+(fi+1);
    document.getElementById('sNote').hidden=!n;
    document.getElementById('sTot').textContent='£'+(50+(n?15:0));
  }
  document.addEventListener('change',update);update();
  document.getElementById('pay').addEventListener('click',function(){document.getElementById('payMsg').hidden=false;});
  }

  // photo guide diagrams: a phone viewfinder with the house placed well or badly
  function shot(t,ok,text){
    return '<div class="shot"><svg viewBox="0 0 200 140" role="img" aria-label="'+text+'"><g transform="'+t+'"><g '+S+'>'+H[1]+'</g></g>'+
      '<rect x="3" y="3" width="194" height="134" fill="none" stroke="#1c2130" stroke-width="2"/></svg>'+
      '<div class="verdict '+(ok?'yes':'no')+'">'+(ok?'Yes':'No')+'</div><p style="font-size:.95rem">'+text+'</p></div>';
  }
  var shEl=document.getElementById('shots');
  if(shEl) shEl.innerHTML=
    shot('translate(20 14) scale(.8)',true,'Front on, whole house in the shot, a little space all round.')+
    shot('translate(-90 -60) scale(1.9)',false,'Too close. The roof and the edges are cut off.')+
    shot('translate(60 30) skewY(-14) scale(.65 .8)',false,'Taken from an angle. Stand directly opposite the front door.')+
    shot('translate(70 60) scale(.3)',false,'Too far away. The house should fill most of the picture.');

  var bf='<g transform="translate(@x @y) scale(@z)"><path d="M0 0C-14-22-40-20-36 2C-34 14-16 12 0 4C-20 12-26 30-12 30C-4 30 0 18 0 6Z M0 0C14-22 40-20 36 2C34 14 16 12 0 4C20 12 26 30 12 30C4 30 0 18 0 6Z" fill="@c" stroke="#1c2130" stroke-width="1.2"/><path d="M0-8V26M0-8l-6-10M0-8l6-10" stroke="#1c2130" stroke-width="1.5" fill="none"/><circle cx="0" cy="6" r="2.2" fill="#a17a26"/></g>';
  function b(x,y,z,c){return bf.replace('@x',x).replace('@y',y).replace('@z',z).replace('@c',c);}
  var tiles=[
    ['Pinned butterflies in a box frame','<svg viewBox="0 0 200 200">'+b(60,60,1,'#d98a8f')+b(140,62,.9,'#8fb4d6')+b(62,140,.85,'#d9b25a')+b(140,140,1,'#8fb08a')+'</svg>'],
    ['Typed museum labels in a drawer','<svg viewBox="0 0 200 200" font-family="Courier New,monospace" font-size="11" fill="#1c2130"><g fill="none" stroke="#1c2130"><rect x="20" y="30" width="160" height="38"/><rect x="20" y="82" width="160" height="38"/><rect x="20" y="134" width="160" height="38"/></g><text x="30" y="46">No. 14 · Rose Cottage</text><text x="30" y="60">Loc. Oxfordshire</text><text x="30" y="98">No. 15 · The Old Forge</text><text x="30" y="112">Coll. Oct. 2026</text><text x="30" y="150">No. 16 · 22 Mill Lane</text><text x="30" y="164">Pen and ink, 7 x 5</text></svg>'],
    ['A stack of found frames','<svg viewBox="0 0 200 200" fill="none" stroke-width="9"><rect x="30" y="34" width="110" height="130" stroke="#b8963e" transform="rotate(-6 85 100)"/><rect x="62" y="48" width="100" height="120" stroke="#4a3324" transform="rotate(5 110 108)"/><rect x="52" y="74" width="92" height="100" stroke="#8fa58c"/></svg>'],
    ['The parcel: tissue, string, sticker','<svg viewBox="0 0 200 200" fill="none" stroke="#1c2130" stroke-width="1.5"><rect x="36" y="50" width="128" height="104" fill="#e7dcc4"/><path d="M100 50V154M36 102H164"/><path d="M100 102q-22-26-30-8q-2 12 30 8q22-26 30-8q2 12-30 8"/><circle cx="140" cy="132" r="13" fill="#96283a" stroke="none"/></svg>']
  ];
  var mEl=document.getElementById('mood');
  if(mEl) mEl.innerHTML=tiles.map(function(t){return '<div><div class="mood">'+t[1]+'</div><span class="ph">Placeholder · '+t[0]+'</span></div>';}).join('');
})();
