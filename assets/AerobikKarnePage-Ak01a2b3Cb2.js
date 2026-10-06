import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,u as usAuth,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar";
const PANEL_LABEL={a:"A — Artistik",e:"E — Uygulama"};
const tr=s=>String(s==null?"":s).replace(/ı/g,"i").replace(/İ/g,"I").replace(/ş/g,"s").replace(/Ş/g,"S").replace(/ğ/g,"g").replace(/Ğ/g,"G").replace(/ü/g,"u").replace(/Ü/g,"U").replace(/ö/g,"o").replace(/Ö/g,"O").replace(/ç/g,"c").replace(/Ç/g,"C");
const NAVY=[28,37,64],TCFRED=[200,16,42];
const trimmedMean=ds=>{ds=ds.filter(d=>d!=null&&!isNaN(d)).map(Number);if(ds.length>=4){const s=[...ds].sort((a,b)=>a-b);return s.slice(1,-1).reduce((a,b)=>a+b,0)/(s.length-2)}return ds.length?ds.reduce((a,b)=>a+b,0)/ds.length:0};
const discPts=d=>{d=Math.abs(d);return d<=.1?1:d<=.2?.85:d<=.3?.7:d<=.5?.45:d<=.7?.2:0};
const discColor=d=>{d=Math.abs(d);return d<=.1?[34,197,94]:d<=.2?[139,195,74]:d<=.3?[158,157,36]:d<=.5?[141,110,99]:d<=.7?[211,47,47]:[183,28,28]};
const gradeShort=acc=>acc>=.85?["Çok İyi","#86efac","rgba(34,197,94,.16)"]:acc>=.70?["İyi","#bef264","rgba(132,204,22,.16)"]:acc>=.55?["Kabul","#fde047","rgba(234,179,8,.16)"]:acc>=.40?["Sınırda","#fdba74","rgba(249,115,22,.16)"]:["İncelenmeli","#fca5a5","rgba(239,68,68,.16)"];
const gradeEN=acc=>acc>=.85?"Very Good":acc>=.70?"Good":acc>=.55?"Acceptable":acc>=.40?"Marginal":"Review";

// ---- PDF font (DejaVu Sans, Türkçe) ----
let _fReg=null,_fBold=null,_logo=null;
async function loadAssets(){if(!_fReg||!_fBold){try{const{R:_r,B:_b}=await import("./fontTR-Fn01a2b3Cb2.js");_fReg=_r,_fBold=_b}catch(e){}}const _kucultLogo=_du=>new Promise(_rs=>{try{const _im=new Image();_im.onload=()=>{try{const _S=256,_cv=document.createElement("canvas");_cv.width=_S;_cv.height=_S;const _cx=_cv.getContext("2d");_cx.clearRect(0,0,_S,_S);_cx.drawImage(_im,0,0,_S,_S);_rs(_cv.toDataURL("image/png"))}catch{_rs(_du)}};_im.onerror=()=>_rs(_du);_im.src=_du}catch{_rs(_du)}});if(_logo===null){try{const r=await fetch("/logo.png");if(r.ok){const bl=await r.blob();const _ham=await new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.readAsDataURL(bl)});_logo=await _kucultLogo(_ham)}else _logo=0}catch(e){_logo=0}}}

function Karne(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const urlComp=sp.get("competitionId")||sp.get("compId")||sp.get("comp"),token=sp.get("token");
 const{currentUser}=usAuth?usAuth():{currentUser:null};
 const[comp,setComp]=R.useState(urlComp||""),[comps,setComps]=R.useState({});
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma"),[compIl,setCompIl]=R.useState("");
 const[catF,setCatF]=R.useState(""),[panelF,setPanelF]=R.useState(""),[busy,setBusy]=R.useState(!1),[hakemler,setHak]=R.useState({});

 R.useEffect(()=>{loadAssets()},[]);
 R.useEffect(()=>{if(token&&urlComp){get(ref(db,`${BASE}/${urlComp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!!currentUser)}).catch(()=>setAuthed(!!currentUser)).finally(()=>setLoading(!1))}else{setAuthed(!!currentUser);setLoading(!1)}},[urlComp,token,currentUser]);
 R.useEffect(()=>{if(!currentUser||urlComp)return;get(ref(db,BASE)).then(s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o)}).catch(()=>{})},[currentUser,urlComp]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const u5=onValue(ref(db,`${BASE}/${comp}/il`),s=>setCompIl(s.val()||""));const u6=onValue(ref(db,`${BASE}/${comp}/hakemler`),s=>setHak(s.val()||{}));return()=>{u1(),u2(),u3(),u4(),u5(),u6()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const resolveName=(cat,aid)=>{const cm=spor[cat]||{},i=cm[aid];if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||i.adSoyad||aid,okul:i.okul||i.kulup||"",il:i.il||""};const parts=String(aid).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok));return{name:mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", ")||aid,okul:mem[0]?.okul||mem[0]?.kulup||"",il:mem[0]?.il||""}};

 const evalPosition=(cat,panel,pos)=>{const aths=pun[cat]||{},jkey="j"+pos,rows=[];let sjCount=0,avgCount=0;
  Object.entries(aths).forEach(([aid,r])=>{if(!r||typeof r!="object"||r.durum!=="tamamlandi")return;let mark,ctrl,refSrc;
    if(panel==="a"){const ap=r.aPanel||{},v=ap[jkey];if(v==null||isNaN(v))return;mark=Number(v);const sj=r.sjPanel?.a?.value;if(sj!=null&&!isNaN(sj)){ctrl=Number(sj);refSrc="SJA";sjCount++}else{ctrl=(r.aScore!=null&&!isNaN(r.aScore))?Number(r.aScore):trimmedMean([ap.j1,ap.j2,ap.j3,ap.j4]);refSrc="A ort.";avgCount++}}
    else{const ep=r.ePanel||{},dd=ep[jkey];if(dd==null||isNaN(dd))return;mark=10-Number(dd);const sj=r.sjPanel?.e?.value;if(sj!=null&&!isNaN(sj)){ctrl=10-Number(sj);refSrc="SJE";sjCount++}else{ctrl=(r.eScore!=null&&!isNaN(r.eScore))?Number(r.eScore):10-trimmedMean([ep.j1,ep.j2,ep.j3,ep.j4]);refSrc="E ort.";avgCount++}}
    const disc=mark-ctrl,nm=resolveName(cat,aid);rows.push({aid,name:nm.name,okul:nm.okul,il:nm.il,ctrl:+ctrl.toFixed(3),mark:+mark.toFixed(3),disc:+disc.toFixed(3),refSrc})});
  rows.sort((a,b)=>b.ctrl-a.ctrl);const n=rows.length;
  const judge=(hakemler[cat]||hakemler[String(cat).replace(/^final_/,"")])?.[panel+pos]?.name||"";
  return{cat,panel,pos,label:panel.toUpperCase()+pos,judge,rows,n,acc:n?rows.reduce((s,r)=>s+discPts(r.disc),0)/n:0,avgAbs:n?rows.reduce((s,r)=>s+Math.abs(r.disc),0)/n:0,avgSigned:n?rows.reduce((s,r)=>s+r.disc,0)/n:0,sjCount,avgCount}};

 const units=[];const allCats=Object.keys(pun);(catF?[catF]:allCats).forEach(cat=>{["a","e"].forEach(panel=>{if(panelF&&panel!==panelF)return;[1,2,3,4].forEach(pos=>{const u=evalPosition(cat,panel,pos);if(u.n>0)units.push(u)})})});
 const catOpts=[...new Set(allCats)].map(c=>[c,catName(c)]);

 // ---- PDF ----
 function drawUnit(doc,u,first,FONT){
  const T=s=>FONT==="helvetica"?tr(s):String(s==null?"":s);
  const PW=210,PH=297,MB=7,IN=MB+6;
  const cN=catName(u.cat),pN=PANEL_LABEL[u.panel]||u.panel;
  const frame=()=>{doc.setDrawColor(90);doc.setLineWidth(.5);doc.roundedRect(MB,MB,PW-2*MB,PH-2*MB,2,2,"S");doc.setLineWidth(.2)};
  const hline=yy=>{doc.setDrawColor(210);doc.setLineWidth(.3);doc.line(IN,yy,PW-IN,yy);doc.setLineWidth(.2)};
  const secH=(t,yy)=>{doc.setFillColor(...TCFRED);doc.rect(IN,yy-3.3,1.5,3.9,"F");doc.setFont(FONT,"bold");doc.setFontSize(10.5);doc.setTextColor(...NAVY);doc.text(t,IN+4,yy)};
  const newpage=()=>{doc.addPage();frame()};
  if(!first)doc.addPage();frame();
  if(_logo){try{doc.addImage(_logo,"PNG",MB+4,MB+3,13,13,"tcflogo","FAST")}catch(e){}}
  let y=MB+9;
  doc.setFont(FONT,"bold");doc.setFontSize(13.5);doc.setTextColor(...NAVY);doc.text(T("AEROBİK PANEL HAKEM KARNESİ"),PW/2,y,{align:"center"});y+=5;
  doc.setFont(FONT,"normal");doc.setFontSize(8.5);doc.setTextColor(110);doc.text(T("Türkiye Cimnastik Federasyonu — Hakem Doğruluk Karnesi"),PW/2,y,{align:"center"});y+=4.5;
  doc.setDrawColor(...TCFRED);doc.setLineWidth(.9);doc.line(MB+4,y,PW-MB-4,y);doc.setLineWidth(.2);y+=7;
  doc.setFont(FONT,"bold");doc.setFontSize(10.5);doc.setTextColor(...NAVY);doc.text(T(compName||comp),IN,y);y+=5.5;
  if(compIl){doc.setFont(FONT,"normal");doc.setFontSize(9.5);doc.setTextColor(60);doc.text(T(compIl),IN,y);y+=5}
  y+=1;hline(y);y+=6;
  doc.setFont(FONT,"bold");doc.setFontSize(11);doc.setTextColor(...NAVY);doc.text(T(`${cN} — ${pN} paneli`),IN,y);y+=6;
  doc.setFont(FONT,"normal");doc.setFontSize(8.5);doc.setTextColor(90);
  doc.text(T(u.sjCount>0?`Referans: Süper Jüri (${u.panel==="a"?"SJA":"SJE"}) — ${u.sjCount} sporcuda; panel ort. — ${u.avgCount}`:"Referans: panel ortalaması (Süper Jüri notu yok)"),IN,y);y+=6;
  hline(y);y+=6;
  doc.setFont(FONT,"bold");doc.setFontSize(12);doc.setTextColor(...NAVY);doc.text(T(u.judge?`${u.judge}`:`Pozisyon ${u.label}`),IN,y);y+=5;doc.setFont(FONT,"normal");doc.setFontSize(9);doc.setTextColor(110);doc.text(T(`Panel pozisyonu: ${u.label}${u.judge?"":"  ·  (hakem atanmamış)"}`),IN,y);y+=7;
  // KPI
  const ky=y,usable=PW-2*IN,kgap=3.5,cw=(usable-2*kgap)/3;
  const ac=u.acc>=.7?[34,150,60]:u.acc>=.55?[180,140,0]:[200,60,40];
  const kpi=(ci,lab,val,vc,sub)=>{const x=IN+ci*(cw+kgap);doc.setDrawColor(223,227,234);doc.setFillColor(248,249,251);doc.setLineWidth(.3);doc.roundedRect(x,ky,cw,16,1.8,1.8,"FD");doc.setLineWidth(.2);doc.setFillColor(...vc);doc.roundedRect(x,ky,1.6,16,.8,.8,"F");doc.setFont(FONT,"bold");doc.setFontSize(6);doc.setTextColor(140);doc.text(lab,x+4,ky+4.6);const vs=String(val),fs=vs.length>7?9:vs.length>4?11:14;doc.setFont(FONT,"bold");doc.setFontSize(fs);doc.setTextColor(...vc);doc.text(vs,x+4,ky+11);if(sub){doc.setFont(FONT,"normal");doc.setFontSize(5.9);doc.setTextColor(150);doc.text(T(sub),x+4,ky+14.2)}};
  kpi(0,"EGZERSIZ",u.n,NAVY,"puanlanan");kpi(1,"ACCURACY",u.acc.toFixed(2),ac,gradeEN(u.acc));kpi(2,"ORT. SAPMA",(u.avgSigned>=0?"+":"")+u.avgSigned.toFixed(2),u.avgAbs<.15?[34,150,60]:u.avgAbs<.3?[180,140,0]:[200,60,40],"işaretli");
  y=ky+16+7;secH(T("Egzersiz bazında doğruluk"),y);y+=7;
  // nokta grafiği
  const plotL=IN+42,plotR=PW-IN-28,legendX=plotR+4;
  let vals=[];u.rows.forEach(r=>vals.push(r.ctrl,r.mark));
  let sMax=Math.ceil((Math.max(...vals)+.15)*5)/5,sMin=Math.floor((Math.min(...vals)-.15)*5)/5;if(sMax-sMin<.6){sMax+=.3;sMin-=.3}
  const sx=s=>plotL+(sMax-s)/(sMax-sMin)*(plotR-plotL),rowH=4.5,bottom=PH-MB-14;
  const _range=sMax-sMin,_ls=_range>4?1:_range>2?.5:.2;
  const ticks=(t0,b0)=>{doc.setDrawColor(235);doc.setLineWidth(.15);for(let s=Math.ceil(sMin/.2)*.2;s<=sMax+1e-9;s+=.2){const x=sx(s);doc.line(x,t0,x,b0)}doc.setFont(FONT,"normal");doc.setFontSize(6.5);doc.setTextColor(110);for(let s=Math.ceil(sMin/_ls)*_ls;s<=sMax+1e-9;s+=_ls){doc.text(s.toFixed(1),sx(s),t0-.8,{align:"center"})}doc.setDrawColor(150);doc.setLineWidth(.25);doc.rect(plotL,t0,plotR-plotL,b0-t0,"S")};
  const legend=ly=>{doc.setFont(FONT,"normal");doc.setFontSize(7);doc.setTextColor(60);doc.setFillColor(37,99,235);doc.circle(legendX+1.5,ly,1.3,"F");doc.text(T("Kontrol (SJ/ort)"),legendX+4,ly+1);let yy=ly+6;doc.setFont(FONT,"bold");doc.setFontSize(6.3);doc.text(T("Sapma"),legendX,yy);doc.setFont(FONT,"normal");yy+=4;[["Çok yüksek",[183,28,28]],["Yüksek",[211,47,47]],["Orta",[141,110,99]],["Ortalama",[158,157,36]],["Düşük",[139,195,74]],["Yok",[34,197,94]]].forEach(([l,c])=>{doc.setFillColor(...c);doc.circle(legendX+1.5,yy,1.3,"F");doc.setTextColor(60);doc.setFontSize(6.3);doc.text(T(l),legendX+4,yy+1);yy+=4})};
  let idx=0,segTop=y+3,legDone=!1;
  while(idx<u.rows.length){if(idx>0){newpage();segTop=MB+16}const per=Math.max(1,Math.floor((bottom-segTop)/rowH)),end=Math.min(u.rows.length,idx+per),botY=segTop+(end-idx)*rowH;ticks(segTop,botY);if(!legDone){legend(segTop+3);legDone=!0}for(let k=idx;k<end;k++){const r=u.rows[k],ry=segTop+(k-idx)*rowH+rowH/2;doc.setFont(FONT,"normal");doc.setFontSize(6);doc.setTextColor(50,50,50);doc.text(T(r.name).slice(0,28),plotL-2,ry+.6,{align:"right"});doc.setFillColor(37,99,235);doc.circle(sx(r.ctrl),ry,1.15,"F");doc.setFillColor(...discColor(r.disc));doc.circle(sx(r.mark),ry,1.15,"F")}doc.setFont(FONT,"normal");doc.setFontSize(6.5);doc.setTextColor(110);doc.text(T("Hakem notu / kontrol"),(plotL+plotR)/2,botY+3.5,{align:"center"});idx=end;segTop=botY+9}
  // Out of consensus (manuel)
  let y2=segTop+3;if(y2>PH-MB-40){newpage();y2=MB+16}secH(T("Konsensüs dışı (|sapma| > 0.7)"),y2);y2+=6;
  const ooc=u.rows.filter(r=>Math.abs(r.disc)>.7);
  if(!ooc.length){doc.setFont(FONT,"normal");doc.setFontSize(9);doc.setTextColor(90);doc.text(T("Yok"),IN,y2);y2+=6}
  else{doc.setFont(FONT,"bold");doc.setFontSize(7.3);doc.setTextColor(120);doc.text(T("Sporcu"),IN,y2);doc.text(T("Kontrol"),IN+95,y2);doc.text(T("Not"),IN+120,y2);doc.text(T("Sapma"),IN+140,y2);doc.text(T("Ref"),IN+165,y2);y2+=1.5;doc.setDrawColor(200);doc.line(IN,y2,PW-IN,y2);y2+=4;doc.setFont(FONT,"normal");doc.setFontSize(8);doc.setTextColor(40);ooc.forEach(r=>{if(y2>PH-MB-12){newpage();y2=MB+14}doc.text(T(r.name).slice(0,42),IN,y2);doc.text(r.ctrl.toFixed(2),IN+95,y2);doc.text(r.mark.toFixed(2),IN+120,y2);const dc=discColor(r.disc);doc.setTextColor(...dc);doc.text((r.disc>=0?"+":"")+r.disc.toFixed(2),IN+140,y2);doc.setTextColor(40);doc.text(r.refSrc,IN+165,y2);y2+=4.6})}
  // footer
  const fy=PH-MB-8;doc.setDrawColor(215);doc.setLineWidth(.3);doc.line(IN,fy,PW-IN,fy);doc.setLineWidth(.2);doc.setFont(FONT,"bold");doc.setFontSize(7);doc.setTextColor(...NAVY);doc.text(T("TÜRKİYE CİMNASTİK FEDERASYONU"),IN,fy+4);doc.setFont(FONT,"normal");doc.setFontSize(6.1);doc.setTextColor(140);doc.text(T("Kontrol = Süper Jüri notu, yoksa panel ortalaması.  Sapma = Not − Kontrol."),IN,fy+7.2);
 }
 const genPDF=async(us,fn)=>{if(!us.length||busy)return;setBusy(!0);try{await loadAssets();const{jsPDF}=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(m=>m.j);const doc=new jsPDF({unit:"mm",format:"a4",compress:!0});let FONT="helvetica";if(_fReg&&_fBold){try{doc.addFileToVFS("Roboto.ttf",_fReg);doc.addFont("Roboto.ttf","Roboto","normal");doc.addFileToVFS("Roboto-Bold.ttf",_fBold);doc.addFont("Roboto-Bold.ttf","Roboto","bold");FONT="Roboto"}catch(e){}}us.forEach((u,i)=>drawUnit(doc,u,i===0,FONT));doc.save(fn)}catch(e){toast(__T("PDF oluşturulamadı."),"error")}setBusy(!1)};

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#9333ea,#6366f1)",boxShadow:"0 6px 18px rgba(147,51,234,.35)"},
  sel:{background:"#1b2438",color:"#e8edf7",border:"1px solid #2a3550",borderRadius:9,padding:".5rem .7rem",font:"inherit",fontWeight:700,fontSize:".85rem"},
  btn:{border:"none",borderRadius:10,padding:".55rem 1rem",fontWeight:800,fontSize:".85rem",cursor:"pointer",color:"#3a2c00",background:"#fbbf24"},
  in:{maxWidth:1000,margin:"0 auto",padding:"1rem"},
  th:{color:"#8b97b3",fontWeight:800,fontSize:".68rem",textTransform:"uppercase",letterSpacing:".04em",textAlign:"left",padding:".5rem .6rem",borderBottom:"1px solid #2a3550"},
  td:{padding:".55rem .6rem",borderBottom:"1px solid rgba(40,52,79,.5)",fontSize:".85rem"},
  tag:(bg,c)=>({display:"inline-block",padding:".15rem .5rem",borderRadius:6,fontWeight:800,fontSize:".72rem",background:bg,color:c}),
  pdfb:{background:"#1b2438",border:"1px solid #2a3550",color:"#e8edf7",borderRadius:8,padding:".35rem .7rem",fontWeight:800,fontSize:".78rem",cursor:"pointer"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Doğrulanıyor…")})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:__T("Yetkisiz Erişim")}),e.jsx("p",{children:__T("Geçersiz/süresi dolmuş bağlantı.")})]})});
 if(!comp)return e.jsxs("div",{style:S.wrap,children:[e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"22px"},children:"fact_check"})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Aerobik")}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.02rem",lineHeight:1.1},children:__T("FIG Hakem Karnesi")})]})]}),e.jsxs("div",{style:{maxWidth:560,margin:"2rem auto 0",padding:"1rem"},children:[e.jsx("div",{style:{fontSize:".9rem",color:"#8b97b3",fontWeight:700,marginBottom:".8rem"},children:__T("Karnesini görmek istediğiniz yarışmayı seçin:")}),e.jsxs("select",{style:{...S.sel,width:"100%",padding:".7rem .8rem"},value:comp,onChange:x=>setComp(x.target.value),children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]})]})]});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"22px"},children:"fact_check"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:".78rem",color:"#8b97b3",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:compName}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.02rem"},children:__T("FIG Hakem Karnesi")})]}),
   e.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"},children:[
    urlComp?null:e.jsxs("select",{style:S.sel,value:comp,onChange:x=>setComp(x.target.value),children:[e.jsx("option",{value:"",children:__T("— Yarışma —")}),Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    e.jsxs("select",{style:S.sel,value:catF,onChange:x=>setCatF(x.target.value),children:[e.jsx("option",{value:"",children:__T("Tüm kategoriler")}),catOpts.map(([c,n])=>e.jsx("option",{value:c,children:n},c))]}),
    e.jsxs("select",{style:S.sel,value:panelF,onChange:x=>setPanelF(x.target.value),children:[e.jsx("option",{value:"",children:__T("A + E panel")}),e.jsx("option",{value:"a",children:__T("Sadece A")}),e.jsx("option",{value:"e",children:__T("Sadece E")})]}),
    e.jsx("button",{style:{...S.btn,opacity:units.length&&!busy?1:.5},disabled:!units.length||busy,onClick:()=>genPDF(units,`Aerobik_Karneler_${tr(compName).replace(/[^a-zA-Z0-9]+/g,"_").slice(0,40)}.pdf`),children:busy?__T("Hazırlanıyor…"):__T("⬇ Tüm Karneler (PDF)")})
   ]})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsx("div",{style:{fontSize:".82rem",color:"#8b97b3",fontWeight:700,margin:"0 0 .8rem"},children:__T("Her satır = bir panel pozisyonu (A1–A4 / E1–E4) × kategori. Referans (kontrol): varsa Süper Jüri (SJA/SJE) notu; yoksa panel ortalaması. Sapma = hakem notu − referans.")}),
   e.jsxs("div",{style:{color:"#8b97b3",fontWeight:700,fontSize:".85rem",marginBottom:".5rem"},children:[units.length," pozisyon karnesi"]}),
   units.length===0?e.jsx("div",{style:S.center,children:__T("Panel notu bulunamadı.")}):
   e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[
    e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:S.th,children:__T("Poz. · Hakem")}),e.jsx("th",{style:S.th,children:__T("Kategori")}),e.jsx("th",{style:{...S.th,textAlign:"center"},children:__T("Egz.")}),e.jsx("th",{style:{...S.th,textAlign:"center"},children:__T("Ort. Sapma")}),e.jsx("th",{style:{...S.th,textAlign:"center"},children:__T("Accuracy")}),e.jsx("th",{style:S.th,children:__T("Referans")}),e.jsx("th",{style:S.th})]})}),
    e.jsx("tbody",{children:units.map((u,i)=>{const g=gradeShort(u.acc);return e.jsxs("tr",{children:[
      e.jsxs("td",{style:S.td,children:[e.jsx("span",{style:S.tag(u.panel==="a"?"rgba(236,72,153,.16)":"rgba(16,185,129,.16)",u.panel==="a"?"#f9a8d4":"#6ee7b7"),children:u.label}),u.judge?e.jsx("span",{style:{fontWeight:800,marginLeft:".45rem"},children:u.judge}):e.jsx("span",{style:{marginLeft:".45rem",color:"#8b97b3",fontWeight:600,fontSize:".78rem"},children:__T("(atanmamış)")})]}),
      e.jsx("td",{style:{...S.td,color:"#8b97b3"},children:catName(u.cat)}),
      e.jsx("td",{style:{...S.td,textAlign:"center",fontWeight:700},children:u.n}),
      e.jsxs("td",{style:{...S.td,textAlign:"center",fontWeight:700},children:[u.avgSigned>=0?"+":"",u.avgSigned.toFixed(3)]}),
      e.jsx("td",{style:{...S.td,textAlign:"center"},children:e.jsxs("span",{style:S.tag(g[2],g[1]),children:[u.acc.toFixed(2)," · ",g[0]]})}),
      e.jsx("td",{style:S.td,children:u.sjCount>0?e.jsxs("span",{children:[e.jsxs("span",{style:S.tag("rgba(99,102,241,.16)","#a5b4fc"),children:["SJ ",u.sjCount]}),u.avgCount>0?e.jsxs("span",{style:{...S.tag("rgba(139,151,179,.16)","#c7d0e0"),marginLeft:".3rem"},children:["ort ",u.avgCount]}):null]}):e.jsx("span",{style:S.tag("rgba(139,151,179,.16)","#c7d0e0"),children:__T("panel ort.")})}),
      e.jsx("td",{style:S.td,children:e.jsx("button",{style:S.pdfb,disabled:busy,onClick:()=>genPDF([u],`AerobikKarne_${tr(catName(u.cat)).replace(/\s+/g,"_")}_${u.label}.pdf`),children:__T("PDF")})})
    ]},u.cat+u.label)})})
   ]})
  ]})
 ]});
}
export{Karne as default};
