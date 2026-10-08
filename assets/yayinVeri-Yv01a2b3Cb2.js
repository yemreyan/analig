/* Gymexa Score — YAYIN VERİSİ (ortak hesap)
   Yayın overlay'i (/yayin-overlay.html) ve TV veri linki (/api/yayin) aynı hesabı kullanır:
   güncel kategori, anlık sıralama, sıradaki sporcular, podyum, çağrılan sporcu, son yayınlanan puan.
   Klasik betik (ES modül değil): tarayıcıda self.GXYV, Node'da module.exports. Yalnız OKUR, veri yazmaz.
   Veri: <yarışma>/kategoriler, sporcular/<kat>, puanlar/<kat>, aktifSporcu, aktifAlet, flashTrigger, yayinProfilleri/<id>. */
(function(){
"use strict";
var BRANS={aerobik:"aerobik_yarismalar",ritmik:"ritmik_yarismalar",artistik:"competitions"};
var ALET={cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",ip:"İp",serbest:"Serbest",grup_seri1:"1. Seri",grup_seri2:"2. Seri"};
var ALET_EN={cember:"Hoop",top:"Ball",labut:"Clubs",kurdele:"Ribbon",ip:"Rope",serbest:"WA",grup_seri1:"Routine 1",grup_seri2:"Routine 2"};
// IOC → ISO (bayrak) — intl modülündeki listeyle aynı
var ISO={};"AFG:af,ALB:al,ALG:dz,AND:ad,ANG:ao,ARG:ar,ARM:am,ARU:aw,AUS:au,AUT:at,AZE:az,BAH:bs,BAN:bd,BAR:bb,BEL:be,BEN:bj,BER:bm,BIH:ba,BLR:by,BOL:bo,BOT:bw,BRA:br,BRN:bh,BUL:bg,BUR:bf,CAM:kh,CAN:ca,CHI:cl,CHN:cn,CIV:ci,CMR:cm,COL:co,CRC:cr,CRO:hr,CUB:cu,CYP:cy,CZE:cz,DEN:dk,DOM:do,ECU:ec,EGY:eg,ESA:sv,ESP:es,EST:ee,ETH:et,FIN:fi,FRA:fr,GAB:ga,GBR:gb,GEO:ge,GER:de,GHA:gh,GRE:gr,GUA:gt,HKG:hk,HON:hn,HUN:hu,INA:id,IND:in,IRI:ir,IRL:ie,IRQ:iq,ISL:is,ISR:il,ITA:it,JAM:jm,JOR:jo,JPN:jp,KAZ:kz,KEN:ke,KGZ:kg,KOR:kr,KOS:xk,KSA:sa,KUW:kw,LAT:lv,LBA:ly,LBN:lb,LIE:li,LTU:lt,LUX:lu,MAC:mo,MAD:mg,MAR:ma,MAS:my,MDA:md,MEX:mx,MGL:mn,MKD:mk,MLT:mt,MNE:me,MON:mc,MRI:mu,NAM:na,NCA:ni,NED:nl,NEP:np,NGR:ng,NOR:no,NZL:nz,OMA:om,PAK:pk,PAN:pa,PAR:py,PER:pe,PHI:ph,PLE:ps,POL:pl,POR:pt,PRK:kp,PUR:pr,QAT:qa,ROU:ro,RSA:za,RUS:ru,SEN:sn,SGP:sg,SLO:si,SMR:sm,SRB:rs,SRI:lk,SUI:ch,SVK:sk,SWE:se,SYR:sy,THA:th,TJK:tj,TKM:tm,TPE:tw,TTO:tt,TUN:tn,TUR:tr,UAE:ae,UGA:ug,UKR:ua,URU:uy,USA:us,UZB:uz,VEN:ve,VIE:vn,YEM:ye,ZAM:zm,ZIM:zw".split(",").forEach(function(p){var a=p.split(":");if(a[1])ISO[a[0]]=a[1]});
var bayrakUrl=function(k){var i=ISO[String(k||"").toUpperCase()];return i?"https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/"+i+".svg":null};
// Kategori adı TR → EN (intl katEN ile aynı tablo)
var KW=[[/Tek Kadın/g,"Individual Women"],[/Tek Erkek/g,"Individual Men"],[/Karma Çift/g,"Mixed Pair"],[/Çift/g,"Mixed Pair"],[/Aerobik Dans/g,"Aerobic Dance"],[/Aerobik Step/g,"Aerobic Step"],[/Step Aerobik/g,"Aerobic Step"],[/Takım Sıralaması/g,"Team Ranking"],[/Yaş Grubu/g,"Age Group"],[/Grubu/g,"Group"],[/Büyükler/g,"Senior"],[/Büyük/g,"Senior"],[/Gençler/g,"Junior"],[/Genç/g,"Junior"],[/Yıldızlar/g,"Pre-Junior"],[/Yıldız/g,"Pre-Junior"],[/Küçükler/g,"Children"],[/Küçük/g,"Children"],[/Minikler/g,"Mini"],[/Minik/g,"Mini"],
 [/Kızlar/g,"Women"],[/Kız/g,"Women"],[/Kadınlar/g,"Women"],[/Kadın/g,"Women"],[/Erkekler/g,"Men"],[/Erkek/g,"Men"],[/Bireysel/g,"Individual"],[/Ferdi/g,"Individual"],[/Grup/g,"Group"],[/Takım/g,"Team"],[/Karma/g,"Mixed"],
 [/Genel Tasnif/g,"All-Around"],[/Çok Mücadele/g,"All-Around"],[/Finali/g,"Final"],[/Final/g,"Final"],[/Çember/g,"Hoop"],[/Kurdele/g,"Ribbon"],[/Labut/g,"Clubs"],[/\bTop\b/g,"Ball"],[/İp/g,"Rope"],[/Serbest/g,"WA"],[/(\d)\. Seri/g,"Routine $1"],
 [/Yer/g,"Floor"],[/Atlama/g,"Vault"],[/Barfiks/g,"High Bar"],[/Denge/g,"Beam"],[/Asimetrik Paralel/g,"Uneven Bars"],[/Halka/g,"Rings"],[/Kulplu Beygir/g,"Pommel Horse"],[/Paralel/g,"Parallel Bars"],[/Kategori/g,"Category"]];
function katEN(s){var t=String(s||"");KW.forEach(function(x){t=t.replace(x[0],x[1])});return t.replace(/(Children|Mini) Women/g,"$1 Girls").replace(/(Children|Mini) Men/g,"$1 Boys")}

var num=function(v){var x=parseFloat(v);return isFinite(x)?x:0};
var r3=function(v){return Math.round(num(v)*1000)/1000};
var f3=function(v){return v==null||v===""?"":num(v).toFixed(3)};
var anahtar=function(s){return String(s==null?"":s).trim().replace(/[.#$\[\]\/]/g,"-")};
var temiz=function(s){return String(s||"").replace(/^\s*🏆\s*/,"").trim()};
var obj=function(o){return o&&typeof o==="object"&&!Array.isArray(o)};

function katAd(kats,k,en){if(!k)return"";var c=kats&&kats[k],a;
 if(c&&(c.name||c.ad))a=temiz(c.name||c.ad);
 else{var p=String(k).split("__"),cb=kats&&kats[p[0]],bn=cb?temiz(cb.name||cb.ad||p[0]):p[0];a=p[1]?bn+" — "+(ALET[p[1]]||p[1]):bn}
 return en?katEN(a):a}
function aletAd(a,en){return a?((en?ALET_EN:ALET)[a]||a):""}
function katUygun(filtre,k){return !filtre||!filtre.length||filtre.some(function(f){return k===f||String(k).indexOf(f+"__")===0||String(k).indexOf(f+"/")===0})}
function isFinal(kats,k){return /^final_/.test(k)||!!(kats&&kats[k]&&kats[k].final===true)}

// aktifSporcu: düz (aerobik/ritmik) ya da alet bazında iç içe (artistik) → [{...sporcu,_kat,_yol}]
function aktifListe(aktif){var out=[];var gez=function(o,yol){if(!obj(o))return;if(o.ad!=null||o.soyad!=null){var x={};for(var k in o)x[k]=o[k];x._kat=yol[0];x._yol=yol.join("/");out.push(x);return}Object.keys(o).forEach(function(k){gez(o[k],yol.concat([k]))})};
 Object.keys(aktif||{}).forEach(function(k){gez(aktif[k],[k])});return out.sort(function(a,b){return num(b.ts)-num(a.ts)})}

// Güncel kategori: elle seçilen → son yayınlanan puanın kategorisi → en son çağrılan sporcunun kategorisi
function guncelKat(o){var kats=o.kats||{},f=o.filtre||[];
 if(o.kat&&kats[o.kat])return o.kat;
 var ft=o.flash,ak=aktifListe(o.aktif).filter(function(a){return katUygun(f,a._kat)})[0];
 var fk=ft&&ft.kategori&&kats[ft.kategori]&&katUygun(f,ft.kategori)?ft.kategori:null;
 if(!fk&&ft&&ft.aletAd){var t=temiz(ft.aletAd).replace(/^final\s*[—–-]\s*/i,"");Object.keys(kats).some(function(k){var n=temiz(kats[k].name||kats[k].ad||"");if(n===temiz(ft.aletAd)||n===t){fk=katUygun(f,k)?k:null;return true}return false})}
 if(fk&&ak&&ak._kat!==fk&&num(ak.ts)>num(ft.timestamp))return ak._kat; // puandan sonra başka kategoride sporcu çağrıldı
 return fk||(ak&&ak._kat)||null}

// Kategorideki girişler (ferdi sporcu ya da takım/grup). Takım anahtarı puanlar'daki gibi: <kat>::<kulüp>::<grupNo>
function girisler(kat,spor,puan){var S=spor||{},E={},sira=0;
 Object.keys(S).forEach(function(id){var a=S[id];if(!obj(a))return;sira++;
  var takim=a.yarismaTuru==="takim"||(a.grupNo!=null&&String(a.yarismaTuru||"")!=="ferdi"&&/::/.test(Object.keys(puan||{}).join(" ")));
  var kul=a.okul||a.kulup||"",st=num(a.cikisSirasi)||num(a.sirasi)||null,ad=[a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||"";
  if(!takim){E[id]={key:id,id:id,takim:false,ad:ad,soyad:a.soyad||"",kulup:kul,il:a.il||"",ulke:a.ulke||null,bib:a.bib||null,start:st,_i:sira,uyeler:[]};return}
  var key=kat+"::"+anahtar(kul)+"::"+(a.grupNo!=null?a.grupNo:1),t=E[key];
  if(!t)t=E[key]={key:key,id:key,takim:true,ad:kul,kulup:kul,il:a.il||"",ulke:a.ulke||null,bib:a.bib||null,start:st,_i:sira,uyeler:[]};
  t.uyeler.push(a.soyad?String(a.soyad):ad);if(st&&(!t.start||st<t.start))t.start=st;if(!t.ulke&&a.ulke)t.ulke=a.ulke});
 // sporcu kaydı olmayan puan anahtarları (ör. eski finaller)
 Object.keys(puan||{}).forEach(function(k){if(E[k]||!obj(puan[k]))return;var p=String(k).split("::"),kul=p.length>2?p.slice(1,-1).join("::"):"",x=puan[k];
  E[k]={key:k,id:k,takim:p.length>2,ad:p.length>2?kul:([x.ad,x.soyad].filter(Boolean).join(" ")||k),kulup:p.length>2?kul:(x.okul||x.kulup||""),il:"",ulke:x.ulke||null,bib:x.bib||null,start:null,_i:9999,uyeler:[]}});
 return Object.keys(E).map(function(k){return E[k]}).sort(function(a,b){return (a.start||1e6)-(b.start||1e6)||a._i-b._i})}

// Bir girişin sonucu. ritmik: aletlerin toplamı (alet verilirse yalnız o alet); diğerleri: düz kayıt
function sonuc(brans,katDef,p,alet){if(!obj(p))return null;
 if(brans==="ritmik"){var al=alet?[alet]:(katDef&&Array.isArray(katDef.aletler)&&katDef.aletler.length?katDef.aletler:Object.keys(p).filter(function(k){return obj(p[k])&&("sonuc" in p[k]||"durum" in p[k])}));
  var R={total:0,e:0,a:0,d:0,da:0,db:0,pen:0,say:0,adet:al.length,irm:null};
  al.forEach(function(k){var x=p[k];if(!obj(x)||x.yayinBekliyor)return;if(x.irm){R.irm=R.irm||x.irm;R.say++;return}if(x.durum!=="tamamlandi")return;R.say++;
   R.total+=num(x.sonuc);R.e+=num(x.eScore);R.a+=num(x.aScore);R.da+=num(x.daScore!=null?x.daScore:x.da);R.db+=num(x.dbScore!=null?x.dbScore:x.db);R.pen+=num(x.penaltyTotal)});
  if(!R.say)return null;R.d=R.da+R.db;["total","e","a","d","da","db","pen"].forEach(function(k){R[k]=r3(R[k])});R.tamam=R.say>=R.adet;
  if(R.irm&&R.total===0)R.yalnizIrm=true;return R}
 if(p.irm||p.gecersiz===true||p.yarismadi===true)return {irm:p.irm||(p.yarismadi?"DNS":"DSQ"),yalnizIrm:true,tamam:true,total:0,say:1,adet:1};
 if(!(p.kilitli===true||p.durum==="tamamlandi"))return null;
 var pen=p.penalty!=null?p.penalty:(p.totalPenalties!=null?p.totalPenalties:(p.neutralDeductions!=null?p.neutralDeductions:0));
 var tot=p.finalScore!=null?p.finalScore:(p.sonuc!=null?p.sonuc:num(p.dScore)+num(p.aScore)+num(p.eScore)-num(pen));
 return {total:r3(tot),e:r3(p.eScore),a:r3(p.aScore),d:r3(p.dScore),pen:r3(pen),say:1,adet:1,tamam:true}}

// Anlık sıralama — eşitlikte FIG: E > A > D; eşitler aynı sırayı alır. IRM'ler sona, sırasız.
function siralama(o){var brans=o.brans,kd=o.kats&&o.kats[o.kat],G=girisler(o.kat,o.spor,o.puan),rows=[],irm=[];
 G.forEach(function(g){var s=sonuc(brans,kd,(o.puan||{})[g.key],o.alet);if(!s)return;var r={giris:g,s:s};(s.yalnizIrm?irm:rows).push(r)});
 var k=function(x){return [Math.round(x.s.total*1e3),Math.round(x.s.e*1e3),Math.round(x.s.a*1e3),Math.round(x.s.d*1e3)]};
 rows.sort(function(x,y){var a=k(x),b=k(y);for(var i=0;i<4;i++)if(a[i]!==b[i])return b[i]-a[i];return 0});
 rows.forEach(function(r,i){if(i&&k(rows[i-1]).join()===k(r).join())r.sira=rows[i-1].sira;else r.sira=i+1});
 irm.forEach(function(r){r.sira=null});
 var tumu=G.length>0&&G.every(function(g){var s=sonuc(brans,kd,(o.puan||{})[g.key],o.alet);return s&&s.tamam});
 return {satirlar:rows.concat(irm),girisSayisi:G.length,tamamlandi:tumu}}

// Takım sıralaması (ritmik ferdi kategori; canlı skor / Sonuçlar / Raporlar ile aynı kural, 2026-10-08):
//  takım = uluslararasıda ülke içindeki takım ("TUR Team 1" ≠ "TUR Team 2"), değilse kulüp; her takımdan toplamı en iyi N sporcu
//  (genç 3, diğerleri 4), her alette bu sporcuların en iyi 2 notu; en az 2 puanlı sporcusu olmayan takım girmez; takım kesintisi düşülür.
function takimAdi(a,intl){if(!intl)return String(a.okul||a.kulup||a.il||"").trim();var u=String(a.ulke||"").trim().toUpperCase();if(!u)return String(a.okul||a.kulup||"").trim();
 var h=String(a.takim||"").trim()||((String(a.kulup||a.okul||"").match(/\b(team|tak[ıi]m)\s*\d+\b/i)||[])[0]||"");if(!h)return u;var n=(h.match(/\d+/)||[""])[0];return n?u+" Team "+n:u+" "+h}
function takimlar(o){var kd=o.kats&&o.kats[o.kat]||{},al=Array.isArray(kd.aletler)?kd.aletler:[],N=/genc/i.test(String(o.kat))?3:4,T={},ded={};
 Object.keys(o.spor||{}).forEach(function(id){var a=o.spor[id];if(!obj(a))return;var ad=takimAdi(a,o.intl);if(!ad)return;
  var t=T[ad]||(T[ad]={ad:ad,ulke:a.ulke?String(a.ulke).trim().toUpperCase():null,uyeler:[]}),p=(o.puan||{})[id],m={ad:[a.ad,a.soyad].filter(Boolean).join(" "),soyad:a.soyad||"",total:0,ap:{}};
  al.forEach(function(x){var r=sonuc("ritmik",kd,p,x),v=r&&!r.yalnizIrm?num(r.total):0;m.ap[x]=v;m.total+=v});t.uyeler.push(m)});
 Object.keys(o.kesintiler||{}).forEach(function(k){var x=o.kesintiler[k];if(obj(x)&&(!x.categoryId||x.categoryId===o.kat)){var n=String(x.teamName||"").trim().toUpperCase();ded[n]=(ded[n]||0)+num(x.amount)}});
 var rows=Object.keys(T).map(function(k){return T[k]}).filter(function(t){return t.uyeler.filter(function(m){return m.total>0}).length>=2}).map(function(t){
  var sec=t.uyeler.slice().sort(function(p,q){return q.total-p.total}).slice(0,N),apps={},top=0;
  al.forEach(function(x){var v=sec.map(function(m){return m.ap[x]||0}).sort(function(p,q){return q-p}).slice(0,2).reduce(function(p,q){return p+q},0);apps[x]=r3(v);top+=v});
  var d=ded[t.ad.toUpperCase()]||0;return {ad:t.ad,ulke:t.ulke,uyeler:sec.filter(function(m){return m.total>0}).map(function(m){return m.soyad||m.ad}),apps:apps,toplam:r3(top),kesinti:r3(d),total:r3(top-d)}})
  .sort(function(a,b){return b.total-a.total});
 rows.forEach(function(r,i){r.sira=i&&Math.round(rows[i-1].total*1e3)===Math.round(r.total*1e3)?rows[i-1].sira:i+1});
 return rows}

// Sıradaki sporcular: çıkış sırasına göre, çağrılan sporcudan sonra, henüz puanı olmayanlar
function siradakiler(o){var brans=o.brans,kd=o.kats&&o.kats[o.kat],G=girisler(o.kat,o.spor,o.puan),al=o.alet||null;
 var bitti=function(g){var p=(o.puan||{})[g.key];if(brans==="ritmik"){if(obj(p)&&Object.keys(p).some(function(k){return obj(p[k])&&p[k].yayinBekliyor}))return true;if(!al)return !!(sonuc(brans,kd,p)||{}).tamam;var x=p&&p[al];return obj(x)&&(x.durum==="tamamlandi"||!!x.irm)}return !!sonuc(brans,kd,p)};
 var cagri=o.cagrilan&&o.cagrilan._kat===o.kat?String(o.cagrilan.id||""):"";
 var i=cagri?G.findIndex(function(g){return g.key===cagri||g.id===cagri}):-1;
 var sonra=(i>=0?G.slice(i+1).concat(G.slice(0,i)):G).filter(function(g){return !bitti(g)&&g.key!==cagri});
 return {simdi:i>=0?G[i]:null,sonraki:sonra.slice(0,Math.max(1,o.n||3))}}

// Satır biçimi (overlay + veri linki)
function satir(g,s,en,o){o=o||{};var r={rank:s&&s.sira!=null?s.sira:null,name:g.takim?g.ad:g.ad,sub:g.takim?g.uyeler.join(", "):(g.kulup||""),club:g.kulup||"",city:g.il||"",
  noc:g.ulke||"",flag:g.ulke?bayrakUrl(g.ulke):null,bib:g.bib||"",team:!!g.takim,members:g.takim?g.uyeler.join(", "):"",start:g.start||null,id:g.key};
 if(s&&s.s){var x=s.s;r.total=f3(x.total);r.e=f3(x.e);r.a=f3(x.a);r.d=f3(x.d);if(o.ritmik){r.da=f3(x.da);r.db=f3(x.db)}r.pen=x.pen?f3(x.pen):"";r.irm=x.irm||"";r.complete=!!x.tamam;r.done=x.say+"/"+x.adet;
  r.medal=r.rank===1?"gold":r.rank===2?"silver":r.rank===3?"bronze":""}
 return r}

// TV veri paketi (veri linki tek çağrıda bunu döndürür)
// Son puanın cezası: ritmik pen (toplam) · aerobik başhakem (p) + çizgi (l) + süre (t) · artistik tarafsız kesinti (pen / p)
function penF(ft){if(ft.isRitmik)return num(ft.pen);if(ft.isAerobik||ft.l!=null||ft.t!=null)return num(ft.p)+num(ft.l)+num(ft.t);return num(ft.p!=null?ft.p:ft.pen)}
function paket(o){var en=o.dil==="en",kats=o.kats||{},kat=o.kat,kd=kats[kat]||{},rit=o.brans==="ritmik";
 var al=rit?((o.tur==="alet"&&o.flash&&o.flash.kategori===kat&&o.flash.alet)||null):null;
 var S=kat?siralama({brans:o.brans,kats:kats,kat:kat,spor:o.spor,puan:o.puan,alet:al}):{satirlar:[],tamamlandi:false,girisSayisi:0};
 var aktifAlet=rit&&o.aktifAlet?o.aktifAlet[kat]||null:null;
 var ak=aktifListe(o.aktif).filter(function(a){return katUygun(o.filtre,a._kat)})[0]||null;
 var N=kat?siradakiler({brans:o.brans,kats:kats,kat:kat,spor:o.spor,puan:o.puan,alet:aktifAlet,cagrilan:ak,n:o.nSirada||3}):{sonraki:[]};
 var ft=o.flash&&(!o.filtre||!o.filtre.length||!o.flash.kategori||katUygun(o.filtre,o.flash.kategori))?o.flash:null;
 var n=Math.max(1,o.n||10);
 return {
  competition:{id:o.comp,name:o.isim||"",discipline:o.brans},
  category:kat?{id:kat,name:katAd(kats,kat,en),final:isFinal(kats,kat),apparatus:al?aletAd(al,en):(rit&&aktifAlet?aletAd(aktifAlet,en):""),ranking:al?"apparatus":"overall",entries:S.girisSayisi,complete:S.tamamlandi}:null,
  current:ak?{name:[ak.ad,ak.soyad].filter(Boolean).join(" "),club:ak.okul||ak.kulup||"",city:ak.il||"",noc:ak.ulke||"",flag:ak.ulke?bayrakUrl(ak.ulke):null,bib:ak.bib||"",category:katAd(kats,ak._kat,en),categoryId:ak._kat,apparatus:aletAd(ak.alet||"",en),calledAt:ak.ts?new Date(ak.ts).toISOString():""}:null,
  lastScore:ft?{name:ft.adSoyad||"",club:ft.kulup||"",noc:ft.ulke||"",flag:ft.ulke?bayrakUrl(ft.ulke):null,bib:ft.bib||"",category:ft.kategori?katAd(kats,ft.kategori,en):(en?katEN(temiz(ft.aletAd)):temiz(ft.aletAd)),categoryId:ft.kategori||"",apparatus:ft.alet?aletAd(ft.alet,en):"",
   total:f3(ft.total),d:ft.isRitmik?f3(num(ft.da)+num(ft.db)):f3(ft.d),da:ft.isRitmik?f3(ft.da):"",db:ft.isRitmik?f3(ft.db):"",a:f3(ft.a),e:f3(ft.e),pen:penF(ft)>0?f3(penF(ft)):"",penCJP:ft.isAerobik?f3(ft.p):"",penLine:ft.isAerobik?f3(ft.l):"",penTime:ft.isAerobik?f3(ft.t):"",rank:num(ft.sira)>0?num(ft.sira):null,inquiry:ft.itiraz||"",previousTotal:ft.oncekiTotal!=null?f3(ft.oncekiTotal):"",publishedAt:ft.timestamp?new Date(ft.timestamp).toISOString():""}:null,
  standings:S.satirlar.slice(0,n).map(function(s){return satir(s.giris,s,en,{ritmik:rit})}),
  upNext:(N.sonraki||[]).map(function(g,i){var r=satir(g,null,en);r.order=i+1;return r}),
  podium:S.tamamlandi?S.satirlar.filter(function(s){return s.sira&&s.sira<=3}).map(function(s){return satir(s.giris,s,en,{ritmik:rit})}):[],
  updatedAt:new Date().toISOString()}}

// JSON → XML / CSV (vMix, CasparCG, Vizrt, Ross veri kaynakları)
function xmlEsc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]})}
function xml(v,ad){ad=ad||"data";if(Array.isArray(v))return "<"+ad+">"+v.map(function(x){return xml(x,"row")}).join("")+"</"+ad+">";
 if(obj(v))return "<"+ad+">"+Object.keys(v).map(function(k){return xml(v[k],k)}).join("")+"</"+ad+">";return "<"+ad+">"+xmlEsc(v)+"</"+ad+">"}
function csv(rows){rows=(rows||[]).filter(obj);if(!rows.length)return "";var cols=[];rows.forEach(function(r){Object.keys(r).forEach(function(k){if(cols.indexOf(k)<0&&!obj(r[k]))cols.push(k)})});
 var q=function(v){v=v==null?"":String(v);return /[",\n;]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
 return cols.join(",")+"\n"+rows.map(function(r){return cols.map(function(c){return q(r[c])}).join(",")}).join("\n")+"\n"}

var X={BRANS:BRANS,ALET:ALET,ALET_EN:ALET_EN,bayrakUrl:bayrakUrl,katEN:katEN,katAd:katAd,aletAd:aletAd,katUygun:katUygun,isFinal:isFinal,aktifListe:aktifListe,guncelKat:guncelKat,
 girisler:girisler,sonuc:sonuc,siralama:siralama,siradakiler:siradakiler,takimlar:takimlar,takimAdi:takimAdi,bayrakUrl:bayrakUrl,satir:satir,paket:paket,xml:xml,csv:csv,f3:f3,num:num,anahtar:anahtar};
if(typeof module!=="undefined"&&module.exports)module.exports=X;else (typeof self!=="undefined"?self:this).GXYV=X;
})();
