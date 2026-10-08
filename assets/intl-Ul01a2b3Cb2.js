// Uluslararası yarışma altyapısı (tüm branşlar): ülke listesi (FIG/IOC kodu), bayrak, ülke çözümleme, İngilizce etiketler.
// Yarışma kaydında tur === "uluslararasi" ise sporcular il/kulüp yerine ülke koduyla (TUR, AZE, ITA…) gösterilir.
// Sporcu kaydı: ulke = IOC kodu ("TUR"). Kodu olmayan sporcu uluslararası yarışmada "TUR" sayılır.
const L=[
["AFG","af","Afghanistan","Afganistan"],["ALB","al","Albania","Arnavutluk"],["ALG","dz","Algeria","Cezayir"],["AND","ad","Andorra","Andorra"],
["ANG","ao","Angola","Angola"],["ARG","ar","Argentina","Arjantin"],["ARM","am","Armenia","Ermenistan"],["ARU","aw","Aruba","Aruba"],
["AUS","au","Australia","Avustralya"],["AUT","at","Austria","Avusturya"],["AZE","az","Azerbaijan","Azerbaycan"],["BAH","bs","Bahamas","Bahamalar"],
["BAN","bd","Bangladesh","Bangladeş"],["BAR","bb","Barbados","Barbados"],["BEL","be","Belgium","Belçika"],["BEN","bj","Benin","Benin"],
["BER","bm","Bermuda","Bermuda"],["BIH","ba","Bosnia and Herzegovina","Bosna-Hersek"],["BLR","by","Belarus","Belarus"],["BOL","bo","Bolivia","Bolivya"],
["BOT","bw","Botswana","Botsvana"],["BRA","br","Brazil","Brezilya"],["BRN","bh","Bahrain","Bahreyn"],["BUL","bg","Bulgaria","Bulgaristan"],
["BUR","bf","Burkina Faso","Burkina Faso"],["CAM","kh","Cambodia","Kamboçya"],["CAN","ca","Canada","Kanada"],["CHI","cl","Chile","Şili"],
["CHN","cn","People's Republic of China","Çin"],["CIV","ci","Côte d'Ivoire","Fildişi Sahili"],["CMR","cm","Cameroon","Kamerun"],["COL","co","Colombia","Kolombiya"],
["CRC","cr","Costa Rica","Kosta Rika"],["CRO","hr","Croatia","Hırvatistan"],["CUB","cu","Cuba","Küba"],["CYP","cy","Cyprus","Kıbrıs"],
["CZE","cz","Czechia","Çekya"],["DEN","dk","Denmark","Danimarka"],["DOM","do","Dominican Republic","Dominik Cumhuriyeti"],["ECU","ec","Ecuador","Ekvador"],
["EGY","eg","Egypt","Mısır"],["ESA","sv","El Salvador","El Salvador"],["ESP","es","Spain","İspanya"],["EST","ee","Estonia","Estonya"],
["ETH","et","Ethiopia","Etiyopya"],["FIN","fi","Finland","Finlandiya"],["FRA","fr","France","Fransa"],["GAB","ga","Gabon","Gabon"],
["GBR","gb","Great Britain","Büyük Britanya"],["GEO","ge","Georgia","Gürcistan"],["GER","de","Germany","Almanya"],["GHA","gh","Ghana","Gana"],
["GRE","gr","Greece","Yunanistan"],["GUA","gt","Guatemala","Guatemala"],["HKG","hk","Hong Kong, China","Hong Kong"],["HON","hn","Honduras","Honduras"],
["HUN","hu","Hungary","Macaristan"],["INA","id","Indonesia","Endonezya"],["IND","in","India","Hindistan"],["IRI","ir","Islamic Republic of Iran","İran"],
["IRL","ie","Ireland","İrlanda"],["IRQ","iq","Iraq","Irak"],["ISL","is","Iceland","İzlanda"],["ISR","il","Israel","İsrail"],
["ITA","it","Italy","İtalya"],["JAM","jm","Jamaica","Jamaika"],["JOR","jo","Jordan","Ürdün"],["JPN","jp","Japan","Japonya"],
["KAZ","kz","Kazakhstan","Kazakistan"],["KEN","ke","Kenya","Kenya"],["KGZ","kg","Kyrgyzstan","Kırgızistan"],["KOR","kr","Republic of Korea","Güney Kore"],
["KOS","xk","Kosovo","Kosova"],["KSA","sa","Saudi Arabia","Suudi Arabistan"],["KUW","kw","Kuwait","Kuveyt"],["LAT","lv","Latvia","Letonya"],
["LBA","ly","Libya","Libya"],["LBN","lb","Lebanon","Lübnan"],["LIE","li","Liechtenstein","Lihtenştayn"],["LTU","lt","Lithuania","Litvanya"],
["LUX","lu","Luxembourg","Lüksemburg"],["MAC","mo","Macau, China","Makao"],["MAD","mg","Madagascar","Madagaskar"],["MAR","ma","Morocco","Fas"],
["MAS","my","Malaysia","Malezya"],["MDA","md","Republic of Moldova","Moldova"],["MEX","mx","Mexico","Meksika"],["MGL","mn","Mongolia","Moğolistan"],
["MKD","mk","North Macedonia","Kuzey Makedonya"],["MLT","mt","Malta","Malta"],["MNE","me","Montenegro","Karadağ"],["MON","mc","Monaco","Monako"],
["MRI","mu","Mauritius","Mauritius"],["NAM","na","Namibia","Namibya"],["NCA","ni","Nicaragua","Nikaragua"],["NED","nl","Netherlands","Hollanda"],
["NEP","np","Nepal","Nepal"],["NGR","ng","Nigeria","Nijerya"],["NOR","no","Norway","Norveç"],["NZL","nz","New Zealand","Yeni Zelanda"],
["OMA","om","Oman","Umman"],["PAK","pk","Pakistan","Pakistan"],["PAN","pa","Panama","Panama"],["PAR","py","Paraguay","Paraguay"],
["PER","pe","Peru","Peru"],["PHI","ph","Philippines","Filipinler"],["PLE","ps","Palestine","Filistin"],["POL","pl","Poland","Polonya"],
["POR","pt","Portugal","Portekiz"],["PRK","kp","DPR Korea","Kuzey Kore"],["PUR","pr","Puerto Rico","Porto Riko"],["QAT","qa","Qatar","Katar"],
["ROU","ro","Romania","Romanya"],["RSA","za","South Africa","Güney Afrika"],["RUS","ru","Russian Federation","Rusya"],["SEN","sn","Senegal","Senegal"],
["SGP","sg","Singapore","Singapur"],["SLO","si","Slovenia","Slovenya"],["SMR","sm","San Marino","San Marino"],["SRB","rs","Serbia","Sırbistan"],
["SRI","lk","Sri Lanka","Sri Lanka"],["SUI","ch","Switzerland","İsviçre"],["SVK","sk","Slovakia","Slovakya"],["SWE","se","Sweden","İsveç"],
["SYR","sy","Syrian Arab Republic","Suriye"],["THA","th","Thailand","Tayland"],["TJK","tj","Tajikistan","Tacikistan"],["TKM","tm","Turkmenistan","Türkmenistan"],
["TPE","tw","Chinese Taipei","Çin Taipei"],["TTO","tt","Trinidad and Tobago","Trinidad ve Tobago"],["TUN","tn","Tunisia","Tunus"],["TUR","tr","Türkiye","Türkiye"],
["UAE","ae","United Arab Emirates","Birleşik Arap Emirlikleri"],["UGA","ug","Uganda","Uganda"],["UKR","ua","Ukraine","Ukrayna"],["URU","uy","Uruguay","Uruguay"],
["USA","us","United States of America","Amerika Birleşik Devletleri"],["UZB","uz","Uzbekistan","Özbekistan"],["VEN","ve","Venezuela","Venezuela"],["VIE","vn","Vietnam","Vietnam"],
["YEM","ye","Yemen","Yemen"],["ZAM","zm","Zambia","Zambiya"],["ZIM","zw","Zimbabwe","Zimbabve"],
["AIN","un","Individual Neutral Athletes","Bağımsız Tarafsız Sporcu"]];
export const ULKELER=L.map(([kod,iso,en,tr])=>({kod,iso,en,tr}));
const BY={};ULKELER.forEach(u=>{BY[u.kod]=u});
// Eş anlamlılar: ISO kodları, yaygın yazımlar → IOC
const ES={TR:"TUR",TURKEY:"TUR",TURKIYE:"TUR","TÜRKİYE":"TUR","TÜRKIYE":"TUR",DEU:"GER",GERMANY:"GER",NLD:"NED",CHE:"SUI",PRT:"POR",GRC:"GRE",HRV:"CRO",SVN:"SLO",
 BGR:"BUL",DNK:"DEN",LVA:"LAT",IRN:"IRI",IDN:"INA",MYS:"MAS",PHL:"PHI",ZAF:"RSA",SAU:"KSA",ARE:"UAE",UK:"GBR",ENG:"GBR",GB:"GBR",US:"USA",
 AZ:"AZE",UZ:"UZB",KZ:"KAZ",UA:"UKR",RU:"RUS",IT:"ITA",FR:"FRA",ES:"ESP",DE:"GER",JP:"JPN",CN:"CHN",KR:"KOR",GE:"GEO",BG:"BUL",RO:"ROU",HU:"HUN",GR:"GRE",IL:"ISR",
 EG:"EGY",SRB:"SRB",RS:"SRB",BY:"BLR",MD:"MDA",AM:"ARM",KG:"KGZ",TM:"TKM",TJ:"TJK",MN:"MGL",CY:"CYP",KKTC:"TUR",TRNC:"TUR"};
const NA={};ULKELER.forEach(u=>{NA[u.en.toLocaleUpperCase("en")]=u.kod;NA[u.tr.toLocaleUpperCase("tr-TR")]=u.kod});
// Serbest metinden IOC kodu ("Azerbaycan", "AZ", "AZE", "Azerbaijan" → "AZE"); bulunamazsa null
export function ulkeKod(v){if(v==null)return null;const s=String(v).trim();if(!s)return null;const U=s.toLocaleUpperCase("tr-TR"),E=s.toLocaleUpperCase("en");
 for(const X of[E,U]){if(BY[X])return X;if(ES[X])return ES[X];if(NA[X])return NA[X]}
 if(E.length===2){const f=ULKELER.find(u=>u.iso.toUpperCase()===E);if(f)return f.kod}return null}
export const ulke=k=>BY[k]||null;
export const ulkeAd=(k,dil)=>{const u=BY[k];return u?(dil==="tr"?u.tr:u.en):k||""};
export const isIntl=c=>!!c&&(c.tur==="uluslararasi"||c.uluslararasi===!0);
// Sporcunun ülkesi: kayıttaki ulke alanı → (yalnız uluslararası yarışmada) varsayılan TUR
export const sporcuUlke=(a,comp)=>{const k=ulkeKod(a?.ulke)||ulkeKod(a?.country)||ulkeKod(a?.noc);return k||(isIntl(comp)?"TUR":null)};
// Takım adı (2026-10-08): uluslararası yarışmada ülke içinde birden fazla takım olabilir ("TUR Team 1", "TUR Team 2") — karışmasın.
// takim alanı ya da kulüp/okul metnindeki "Team N" / "Takım N" kullanılır; yoksa yalnız ülke kodu.
export const takimAdi=(a,comp)=>{const u=sporcuUlke(a,comp);if(!u)return"";const ham=String(a&&a.takim||"").trim()||((String(a&&(a.kulup||a.okul)||"").match(/\b(team|tak[ıi]m)\s*\d+\b/i)||[])[0]||"");if(!ham)return u;const n=(ham.match(/\d+/)||[""])[0];return n?u+" Team "+n:u+" "+ham};
export const bayrakUrl=k=>{const u=BY[k];return u&&u.iso!=="un"?`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${u.iso}.svg`:null};
// Ekranda bayrak + kod (React jsx fonksiyonu e ile)
export function UlkeEtiket(e,k,o){if(!k)return null;const u=bayrakUrl(k),s=o?.boy||14;return e.jsxs("span",{className:"gx-ulke",title:ulkeAd(k,o?.dil),style:{display:"inline-flex",alignItems:"center",gap:5,fontWeight:800,letterSpacing:".04em",whiteSpace:"nowrap",...(o?.style||{})},children:[u?e.jsx("img",{src:u,alt:"",loading:"lazy",style:{width:Math.round(s*4/3),height:s,borderRadius:2,objectFit:"cover",boxShadow:"0 0 0 1px rgba(0,0,0,.12)",flexShrink:0}}):null,k]})}
// PDF için bayrak PNG (dataURL), önbellekli; jsdelivr CORS izinli
const PC={};
export function bayrakPng(k,w=64){const u=bayrakUrl(k);if(!u)return Promise.resolve(null);const key=k+"|"+w;if(PC[key])return PC[key];
 PC[key]=new Promise(res=>{try{const im=new Image;im.crossOrigin="anonymous";im.onload=()=>{try{const h=Math.round(w*3/4),c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,0,0,w,h);res(c.toDataURL("image/png"))}catch{res(null)}};im.onerror=()=>res(null);im.src=u}catch{res(null)}});return PC[key]}
export async function bayraklarPng(kodlar){const o={};await Promise.all([...new Set(kodlar.filter(Boolean))].map(async k=>{o[k]=await bayrakPng(k)}));return o}
// İngilizce çıktı etiketleri (FIG biçimi)
export const EN={sira:"Rank",sporcu:"Gymnast",takim:"Team",ulke:"NOC",toplam:"Total",ceza:"Pen.",fark:"Behind",kategori:"Category",alet:"Apparatus",
 genelTasnif:"All-Around",aletFinali:"Apparatus Final",takimSiralamasi:"Team Ranking",ulkeSiralamasi:"Nation Ranking",madalya:"Medal Table",
 altin:"Gold",gumus:"Silver",bronz:"Bronze",yarismadi:"DNS",gecersiz:"DSQ",baslangic:"Start List",sonuclar:"Results",olusturma:"Generated"};
// Madalya tablosu: [{kod, altin, gumus, bronz, toplam}] — sonuclar: [{ulke, rank}] listelerinin listesi
export function madalyaTablosu(listeler){const T={};listeler.forEach(ls=>ls.forEach(r=>{if(!r||!r.ulke||!(r.rank>=1&&r.rank<=3))return;const t=T[r.ulke]||(T[r.ulke]={kod:r.ulke,altin:0,gumus:0,bronz:0,toplam:0});r.rank===1?t.altin++:r.rank===2?t.gumus++:t.bronz++;t.toplam++}));
 return Object.values(T).sort((a,b)=>b.altin-a.altin||b.gumus-a.gumus||b.bronz-a.bronz||a.kod.localeCompare(b.kod))}
// Ülke seçimi <select> seçenekleri
export function UlkeSecenekleri(e,dil){return ULKELER.slice().sort((a,b)=>(dil==="en"?a.en:a.tr).localeCompare(dil==="en"?b.en:b.tr,dil==="en"?"en":"tr")).map(u=>e.jsx("option",{value:u.kod,children:u.kod+" — "+(dil==="en"?u.en:u.tr)},u.kod))}
// Kategori / alet adlarını İngilizceye (FIG terimleri) çevirir — PDF başlıkları için
const KW=[[/Tek Kadın/g,"Individual Women"],[/Tek Erkek/g,"Individual Men"],[/Karma Çift/g,"Mixed Pair"],[/Çift/g,"Mixed Pair"],[/Aerobik Dans/g,"Aerobic Dance"],[/Aerobik Step/g,"Aerobic Step"],[/Step Aerobik/g,"Aerobic Step"],[/Takım Sıralaması/g,"Team Ranking"],[/Yaş Grubu/g,"Age Group"],[/Grubu/g,"Group"],[/Büyükler/g,"Senior"],[/Büyük/g,"Senior"],[/Gençler/g,"Junior"],[/Genç/g,"Junior"],[/Yıldızlar/g,"Pre-Junior"],[/Yıldız/g,"Pre-Junior"],[/Küçükler/g,"Children"],[/Küçük/g,"Children"],[/Minikler/g,"Mini"],[/Minik/g,"Mini"],
 [/Kızlar/g,"Women"],[/Kız/g,"Women"],[/Kadınlar/g,"Women"],[/Kadın/g,"Women"],[/Erkekler/g,"Men"],[/Erkek/g,"Men"],[/Bireysel/g,"Individual"],[/Ferdi/g,"Individual"],[/Grup/g,"Group"],[/Takım/g,"Team"],[/Karma/g,"Mixed"],
 [/Genel Tasnif/g,"All-Around"],[/Çok Mücadele/g,"All-Around"],[/Finali/g,"Final"],[/Final/g,"Final"],[/Çember/g,"Hoop"],[/Kurdele/g,"Ribbon"],[/Labut/g,"Clubs"],[/\bTop\b/g,"Ball"],[/İp/g,"Rope"],[/Serbest/g,"WA"],[/(\d)\. Seri/g,"Routine $1"],
 [/Yer/g,"Floor"],[/Atlama/g,"Vault"],[/Barfiks/g,"High Bar"],[/Denge/g,"Beam"],[/Asimetrik Paralel/g,"Uneven Bars"],[/Halka/g,"Rings"],[/Kulplu Beygir/g,"Pommel Horse"],[/Paralel/g,"Parallel Bars"],[/Kategori/g,"Category"]];
export function katEN(s){let t=String(s||"");KW.forEach(([r,v])=>{t=t.replace(r,v)});return t.replace(/(Children|Mini) Women/g,"$1 Girls").replace(/(Children|Mini) Men/g,"$1 Boys")}
const KWU=KW.map(([r,v])=>[new RegExp(r.source.toLocaleUpperCase("tr-TR").replace(/\\B/g,"\\b"),"g"),v.toUpperCase()]);
export function katENup(s){let t=String(s||"");KWU.forEach(([r,v])=>{t=t.replace(r,v)});return katEN(t)}
