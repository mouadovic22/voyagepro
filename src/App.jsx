import { useState, useEffect, useRef } from "react";

const BASE = "https://upload.wikimedia.org/wikipedia/commons/thumb/";
const IMG = id => {
  const MAP = {
    paris:       BASE+"8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg/600px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg",
    tokyo:       BASE+"b/b1/Shinjuku_skyline_crop.jpg/600px-Shinjuku_skyline_crop.jpg",
    marrakech:   BASE+"c/c1/Djemaa_el-Fna_at_Sunset.jpg/600px-Djemaa_el-Fna_at_Sunset.jpg",
    rome:        BASE+"d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/600px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
    dubai:       BASE+"8/89/Dubai_skyline_(8282183840).jpg/600px-Dubai_skyline_(8282183840).jpg",
    barcelona:   BASE+"e/ee/Sagrada_Familia_01.jpg/600px-Sagrada_Familia_01.jpg",
    newyork:     BASE+"4/47/New_york_times_square-terabass.jpg/600px-New_york_times_square-terabass.jpg",
    bali:        BASE+"5/53/Pura_Ulun_Danu_Bratan,_Bali.jpg/600px-Pura_Ulun_Danu_Bratan,_Bali.jpg",
    istanbul:    BASE+"9/90/Hagia_Sophia_exterior_2007_002.jpg/600px-Hagia_Sophia_exterior_2007_002.jpg",
    london:      BASE+"5/54/Palace_of_Westminster,_London_-_Jan_2006.jpg/600px-Palace_of_Westminster,_London_-_Jan_2006.jpg",
    singapore:   BASE+"9/98/Singapore_skyline_2019-10.jpg/600px-Singapore_skyline_2019-10.jpg",
    bangkok:     BASE+"9/93/Grand_Palace_in_Bangkok.jpg/600px-Grand_Palace_in_Bangkok.jpg",
    amsterdam:   BASE+"b/b9/Amsterdam_-_Herengracht_and_Thorbeckeplein.jpg/600px-Amsterdam_-_Herengracht_and_Thorbeckeplein.jpg",
    prague:      BASE+"c/c6/Praha,_Pohled_na_Hrad%C4%8Dany_od_%C4%8Cechova_mostu.jpg/600px-Praha,_Pohled_na_Hrad%C4%8Dany_od_%C4%8Cechova_mostu.jpg",
    vienna:      BASE+"9/9d/Schonbrunn_cropped.jpg/600px-Schonbrunn_cropped.jpg",
    sydney:      BASE+"2/26/Sydney_Harbour_Bridge_BG.jpg/600px-Sydney_Harbour_Bridge_BG.jpg",
    kyoto:       BASE+"b/bd/Fushimi_Inari-taisha_shrine.jpg/600px-Fushimi_Inari-taisha_shrine.jpg",
    losangeles:  BASE+"2/2c/DowntownLA_Aerial.jpg/600px-DowntownLA_Aerial.jpg",
    miami:       BASE+"2/20/Miami_Beach_SoBe.jpg/600px-Miami_Beach_SoBe.jpg",
    lisbon:      BASE+"8/84/Lisbon_(26987344515).jpg/600px-Lisbon_(26987344515).jpg",
    athens:      BASE+"d/da/The_Parthenon_in_Athens.jpg/600px-The_Parthenon_in_Athens.jpg",
    cairo:       BASE+"6/6c/Egypt.Giza.Sphinx.02.jpg/600px-Egypt.Giza.Sphinx.02.jpg",
    capetown:    BASE+"8/8d/Cape_Town_(16572285602).jpg/600px-Cape_Town_(16572285602).jpg",
    maldives:    BASE+"c/cb/Maldive_Beautiful.jpg/600px-Maldive_Beautiful.jpg",
    santorini:   BASE+"f/f0/Oia-Santorini.jpg/600px-Oia-Santorini.jpg",
    rio:         BASE+"6/69/Rio_de_Janeiro_-_Aerial_(9611838796).jpg/600px-Rio_de_Janeiro_-_Aerial_(9611838796).jpg",
    buenosaires: BASE+"4/45/Buenos_Aires_-_Aerial.jpg/600px-Buenos_Aires_-_Aerial.jpg",
    mexico:      BASE+"7/7d/Mexico_City_Reforma.jpg/600px-Mexico_City_Reforma.jpg",
    havana:      BASE+"e/e2/La_Habana_Cuba_(5674013286).jpg/600px-La_Habana_Cuba_(5674013286).jpg",
    beijing:     BASE+"a/a5/Great_Wall_of_China,_Jinshanling_crop.jpg/600px-Great_Wall_of_China,_Jinshanling_crop.jpg",
    hongkong:    BASE+"1/18/Hong_Kong_Night_Skyline.jpg/600px-Hong_Kong_Night_Skyline.jpg",
    seoul:       BASE+"0/02/Seoul_Skyline_(14233978424).jpg/600px-Seoul_Skyline_(14233978424).jpg",
    berlin:      BASE+"a/a6/Brandenburger_Tor_abends.jpg/600px-Brandenburger_Tor_abends.jpg",
    munich:      BASE+"5/5f/M%C3%BCnchen,_Blick_vom_Hochhaus_an_der_Candidstra%C3%9Fe_auf_die_Frauenkirche.jpg/600px-M%C3%BCnchen,_Blick_vom_Hochhaus_an_der_Candidstra%C3%9Fe_auf_die_Frauenkirche.jpg",
    zurich:      BASE+"7/7e/Z%C3%BCrich_Quaibr%C3%BCcke_2015_2.jpg/600px-Z%C3%BCrich_Quaibr%C3%BCcke_2015_2.jpg",
    toronto:     BASE+"2/21/Toronto_-_ON_-_Toronto_Harbourfront4.jpg/600px-Toronto_-_ON_-_Toronto_Harbourfront4.jpg",
    montreal:    BASE+"9/95/Montreal_-(e)_night.jpg/600px-Montreal_-(e)_night.jpg",
    mumbai:      BASE+"9/9d/India_Mumbai_Skyline_from_Malabar_Hill.jpg/600px-India_Mumbai_Skyline_from_Malabar_Hill.jpg",
    delhi:       BASE+"0/09/India_Gate_in_New_Delhi_03-2016.jpg/600px-India_Gate_in_New_Delhi_03-2016.jpg",
    nairobi:     BASE+"2/28/Nairobi_CBD.jpg/600px-Nairobi_CBD.jpg",
    casablanca:  BASE+"8/84/Hassan_II_Mosque,_Casablanca.jpg/600px-Hassan_II_Mosque,_Casablanca.jpg",
    tunis:       BASE+"7/7f/Medina_of_Tunis.jpg/600px-Medina_of_Tunis.jpg",
    alger:       BASE+"d/d0/Algiers,_Algeria.jpg/600px-Algiers,_Algeria.jpg",
    abudhabi:    BASE+"9/95/Abu_Dhabi_Skyline_2.jpg/600px-Abu_Dhabi_Skyline_2.jpg",
    doha:        BASE+"4/4c/Doha_Qatar_Jan_2011.jpg/600px-Doha_Qatar_Jan_2011.jpg",
    phuket:      BASE+"3/3c/Patong_Beach,_Phuket,_Thailand.jpg/600px-Patong_Beach,_Phuket,_Thailand.jpg",
    florence:    BASE+"b/b1/Firenze_SM_del_Fiore_Apr_2008_(2).jpg/600px-Firenze_SM_del_Fiore_Apr_2008_(2).jpg",
    venice:      BASE+"9/92/Basilica_di_San_Marco_Venezia.jpg/600px-Basilica_di_San_Marco_Venezia.jpg",
    seville:     BASE+"6/61/Seville_cathedral.jpg/600px-Seville_cathedral.jpg",
    shanghai:    BASE+"5/52/Shanghai_skyline_2013.jpg/600px-Shanghai_skyline_2013.jpg",
    dublin:      BASE+"2/2b/Dublin,_Ireland_-_panoramio_(1).jpg/600px-Dublin,_Ireland_-_panoramio_(1).jpg",
    copenhagen:  BASE+"0/0a/Nyhavn_-_Copenhagen,_Denmark_-_panoramio.jpg/600px-Nyhavn_-_Copenhagen,_Denmark_-_panoramio.jpg",
    stockholm:   BASE+"4/43/Stockholm_-_Stadhuset.jpg/600px-Stockholm_-_Stadhuset.jpg",
    helsinki:    BASE+"6/61/Tuomiokirkko,_Helsinki.jpg/600px-Tuomiokirkko,_Helsinki.jpg",
    oslo:        BASE+"9/9b/Oslo_Aker_Brygge.jpg/600px-Oslo_Aker_Brygge.jpg",
    warsaw:      BASE+"7/74/Warsaw_Old_Town_(2010).jpg/600px-Warsaw_Old_Town_(2010).jpg",
    budapest:    BASE+"9/97/Budapest_Parliament_by_night.jpg/600px-Budapest_Parliament_by_night.jpg",
    bucharest:   BASE+"d/d9/Bucharest_city_center.jpg/600px-Bucharest_city_center.jpg",
    brussels:    BASE+"c/cb/Grand_Place_Brussels_Belgium_2009_01.jpg/600px-Grand_Place_Brussels_Belgium_2009_01.jpg",
    edinburgh:   BASE+"f/f2/Edinburgh_Castle_from_the_north-east.jpg/600px-Edinburgh_Castle_from_the_north-east.jpg",
    belgrade:    BASE+"1/13/Belgrade_panorama_from_Kalemegdan.jpg/600px-Belgrade_panorama_from_Kalemegdan.jpg",
    reykjavik:   BASE+"4/42/Reykjavik,_capital_city_of_Iceland.jpg/600px-Reykjavik,_capital_city_of_Iceland.jpg",
    sofia:       BASE+"3/39/Alexander_Nevsky_Cathedral_Sofia.jpg/600px-Alexander_Nevsky_Cathedral_Sofia.jpg",
    zagreb:      BASE+"5/56/Zagreb_Cathedral_closeup.jpg/600px-Zagreb_Cathedral_closeup.jpg",
    valletta:    BASE+"0/05/Valletta_Grand_Harbour_2.jpg/600px-Valletta_Grand_Harbour_2.jpg",
  };
  return MAP[id] || BASE+"4/47/Globe_east_90.jpg/600px-Globe_east_90.jpg";
};

const WIKI_TITLES = {
  paris:"Paris",newyork:"New_York_City",tokyo:"Tokyo",london:"London",
  rome:"Rome",barcelona:"Barcelona",bali:"Bali",dubai:"Dubai",istanbul:"Istanbul",
  singapore:"Singapore",bangkok:"Bangkok",amsterdam:"Amsterdam",prague:"Prague",
  vienna:"Vienna",sydney:"Sydney",kyoto:"Kyoto",losangeles:"Los_Angeles",
  miami:"Miami",lisbon:"Lisbon",athens:"Athens",cairo:"Cairo",capetown:"Cape_Town",
  maldives:"Maldives",santorini:"Santorini",rio:"Rio_de_Janeiro",
  buenosaires:"Buenos_Aires",mexico:"Mexico_City",havana:"Havana",beijing:"Beijing",
  hongkong:"Hong_Kong",seoul:"Seoul",berlin:"Berlin",munich:"Munich",zurich:"Zurich",
  toronto:"Toronto",montreal:"Montreal",mumbai:"Mumbai",delhi:"New_Delhi",
  nairobi:"Nairobi",casablanca:"Casablanca",tunis:"Tunis",alger:"Algiers",
  marrakech:"Marrakesh",abudhabi:"Abu_Dhabi",doha:"Doha",phuket:"Phuket",
  florence:"Florence",venice:"Venice",seville:"Seville",shanghai:"Shanghai",
  dublin:"Dublin",copenhagen:"Copenhagen",stockholm:"Stockholm",helsinki:"Helsinki",
  oslo:"Oslo",warsaw:"Warsaw",budapest:"Budapest",bucharest:"Bucharest",
  brussels:"Brussels",edinburgh:"Edinburgh",belgrade:"Belgrade",reykjavik:"Reykjavik",
  sofia:"Sofia",zagreb:"Zagreb",valletta:"Valletta"
};

// ── AFFILIATE IDs ── CJ Publisher ID: 7982811
// To get link IDs: CJ dashboard → Advertisers → join program → Links → Deep Link Generator
const AFF = {
  cj_pid:       "7982811", // your CJ Publisher ID
  booking:      "",   // CJ → Booking.com program → link ID after "click-7982811-"
  getyourguide: "",   // partner.getyourguide.com → partner_id (direct program, not CJ)
  viator:       "",   // CJ → Viator program → link ID after "click-7982811-"
  kayak:        "",   // CJ → Kayak program → link ID after "click-7982811-"
};

const aff = (base, params) => AFF[Object.keys(params)[0]]
  ? `${base}${base.includes("?")?"&":"?"}${Object.entries(params).map(([k,v])=>`${k}=${v}`).join("&")}`
  : base;

const BOOK = {
  flights:     (from, to)   => `https://www.google.com/travel/flights?q=vols+de+${encodeURIComponent(from)}+à+${encodeURIComponent(to)}`,
  skyscanner:  (from, to)   => aff(`https://www.skyscanner.fr/transport/vols/${encodeURIComponent(from.toLowerCase().replace(/ /g,"-"))}/${encodeURIComponent(to.toLowerCase().replace(/ /g,"-"))}/`, {marker:AFF.skyscanner}),
  kayak:       (from, to)   => `https://www.kayak.fr/flights/${encodeURIComponent(from)}-${encodeURIComponent(to)}`,
  booking:     (city, name) => aff(`https://www.booking.com/searchresults.fr.html?ss=${encodeURIComponent(name||city)}&lang=fr`, {aid:AFF.booking}),
  airbnb:      (city)       => `https://www.airbnb.fr/s/${encodeURIComponent(city)}/homes`,
  getyourguide:(name, city) => aff(`https://www.getyourguide.fr/s/?q=${encodeURIComponent(name+" "+city)}&locale_autoredirect_optout=true`, {partner_id:AFF.getyourguide}),
  viator:      (name, city) => aff(`https://www.viator.com/fr-FR/search?text=${encodeURIComponent(name+" "+city)}`, {pid:AFF.viator}),
  thefork:     (name, city) => `https://www.thefork.fr/recherche?q=${encodeURIComponent(name)}&cityName=${encodeURIComponent(city)}`,
  tripadvisor: (name, city) => `https://www.tripadvisor.fr/Search?q=${encodeURIComponent(name+" "+city)}&searchSessionId=x`,
  maps:        (name, city) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+" "+city)}`,
};

// Upscale a Wikipedia/Commons thumbnail URL to a larger width for crisp images
const upscaleWiki = (url, width=1000) => url ? url.replace(/\/(\d+)px-/, `/${width}px-`) : url;

// localStorage cache so images load instantly on subsequent visits
const _imgCache = (() => { try { return JSON.parse(localStorage.getItem('vp_imgs')||'{}'); } catch(e){ return {}; } })();
const _saveImgCache = () => { try { localStorage.setItem('vp_imgs', JSON.stringify(_imgCache)); } catch(e){} };

// Fetch a Wikipedia image URL, with cache (returns a promise of url|null)
const fetchWikiImage = (id, name, width=600) => {
  const key = `${id}_${width}`;
  if (_imgCache[key]) return Promise.resolve(_imgCache[key]);
  const title = WIKI_TITLES[id] || (name||"").replace(/ /g,'_');
  return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
    .then(r=>r.json())
    .then(d=>{
      const orig = d.originalimage?.source;
      const thumb = upscaleWiki(d.thumbnail?.source, width);
      const src = orig || thumb || null;
      if (src) { _imgCache[key] = src; _saveImgCache(); }
      return src;
    })
    .catch(()=>null);
};

const wikiError = e => {
  if (e.target.dataset.tried) { e.target.style.opacity=0; return; }
  e.target.dataset.tried = '1';
  const width = e.target.dataset.hires ? 1000 : 600;
  const searchTerm = e.target.dataset.wikiterm || e.target.alt;
  fetchWikiImage(e.target.dataset.id || searchTerm, searchTerm, width)
    .then(src=>{ if(src){e.target.src=src;e.target.style.opacity=1;}else e.target.style.opacity=0;});
};

// Map cuisine type string → Wikipedia article title for food photo lookup
const getFoodWikiTitle = t => {
  const s = (t||"").toLowerCase();
  if (s.includes("ramen"))                                    return "Ramen";
  if (s.includes("sushi"))                                    return "Sushi";
  if (s.includes("pizza")||s.includes("trattoria"))           return "Pizza";
  if (s.includes("burger")||s.includes("fast food"))          return "Hamburger";
  if (s.includes("tapas")||s.includes("pintxos")||s.includes("catalan")) return "Tapas";
  if (s.includes("paella")||s.includes("espagnol"))           return "Paella";
  if (s.includes("gastronomique")||s.includes("étoilé")||s.includes("étoile")||s.includes("haute")||s.includes("kaiseki")) return "Haute_cuisine";
  if (s.includes("bistro")||s.includes("brasserie")||s.includes("café parisien")) return "French_cuisine";
  if (s.includes("crêpe")||s.includes("crepe"))               return "Crêpe";
  if (s.includes("street food")||s.includes("marché"))        return "Street_food";
  if (s.includes("marocain")||s.includes("tajine")||s.includes("tagine")) return "Moroccan_cuisine";
  if (s.includes("souvlaki")||s.includes("gyros")||s.includes("grec"))    return "Souvlaki";
  if (s.includes("steak")||s.includes("grillades")||s.includes("bbq")||s.includes("steakhouse")) return "Steak";
  if (s.includes("deli"))                                     return "Delicatessen";
  if (s.includes("café")||s.includes("cafe")||s.includes("coffee")) return "Coffeehouse";
  if (s.includes("koshary")||s.includes("égyptien"))          return "Kushari";
  if (s.includes("indien")||s.includes("indienne")||s.includes("curry")) return "Indian_cuisine";
  if (s.includes("thaï")||s.includes("thai")||s.includes("thaïlandais")) return "Thai_cuisine";
  if (s.includes("japonais")||s.includes("tempura")||s.includes("teppan")||s.includes("balinais")) return "Japanese_cuisine";
  if (s.includes("tunisien"))                                 return "Tunisian_cuisine";
  if (s.includes("algérien"))                                 return "Algerian_cuisine";
  if (s.includes("émirati"))                                  return "Emirati_cuisine";
  if (s.includes("fusion"))                                   return "Fusion_cuisine";
  if (s.includes("iranien"))                                  return "Iranian_cuisine";
  if (s.includes("pakistanais"))                              return "Pakistani_cuisine";
  if (s.includes("turc")||s.includes("kebab")||s.includes("meze")||s.includes("ottoman")||s.includes("baklava")) return "Turkish_cuisine";
  if (s.includes("dim sum")||s.includes("cantonais")||s.includes("chinois")) return "Dim_sum";
  if (s.includes("libanais")||s.includes("falafel")||s.includes("houmous")) return "Lebanese_cuisine";
  if (s.includes("fruits de mer")||s.includes("seafood"))    return "Seafood";
  if (s.includes("vietnam"))                                  return "Vietnamese_cuisine";
  if (s.includes("coréen"))                                   return "Korean_cuisine";
  if (s.includes("locale")||s.includes("local")||s.includes("traditionnel")) return "Cuisine";
  return "Restaurant";
};

const getFoodEmoji = t => {
  const s = (t||"").toLowerCase();
  if (s.includes("ramen")||s.includes("japonais")) return "🍜";
  if (s.includes("sushi")) return "🍣";
  if (s.includes("pizza")||s.includes("trattoria")) return "🍕";
  if (s.includes("burger")) return "🍔";
  if (s.includes("tapas")||s.includes("paella")) return "🥘";
  if (s.includes("gastronomique")||s.includes("étoilé")||s.includes("haute")) return "⭐";
  if (s.includes("crêpe")) return "🥞";
  if (s.includes("street food")||s.includes("marché")) return "🌮";
  if (s.includes("marocain")||s.includes("tajine")) return "🫕";
  if (s.includes("souvlaki")||s.includes("grec")) return "🥙";
  if (s.includes("steak")||s.includes("grillades")) return "🥩";
  if (s.includes("deli")) return "🥪";
  if (s.includes("café")||s.includes("coffee")) return "☕";
  if (s.includes("indien")||s.includes("curry")) return "🍛";
  if (s.includes("thaï")) return "🌶️";
  if (s.includes("turc")||s.includes("kebab")) return "🌯";
  if (s.includes("mexicain")||s.includes("tacos")) return "🌮";
  if (s.includes("chinois")||s.includes("dim sum")) return "🥟";
  if (s.includes("fruits de mer")||s.includes("seafood")) return "🦞";
  return "🍽️";
};


const DESTINATIONS = [
  { id:"paris",      name:"Paris",          country:"France",         flag:"🇫🇷", emoji:"🗼", temp:"18°C", currency:"EUR", mapCenter:[48.8566,2.3522],    continent:"europe",    photo:IMG("paris") },
  { id:"tokyo",      name:"Tokyo",          country:"Japon",          flag:"🇯🇵", emoji:"🗾", temp:"22°C", currency:"JPY", mapCenter:[35.6762,139.6503],  continent:"asie",      photo:IMG("tokyo") },
  { id:"marrakech",  name:"Marrakech",      country:"Maroc",          flag:"🇲🇦", emoji:"🕌", temp:"28°C", currency:"MAD", mapCenter:[31.6295,-7.9811],   continent:"maghreb",   photo:IMG("marrakech") },
  { id:"rome",       name:"Rome",           country:"Italie",         flag:"🇮🇹", emoji:"🏛️", temp:"24°C", currency:"EUR", mapCenter:[41.9028,12.4964],   continent:"europe",    photo:IMG("rome") },
  { id:"dubai",      name:"Dubaï",          country:"Émirats",        flag:"🇦🇪", emoji:"🏙️", temp:"35°C", currency:"AED", mapCenter:[25.2048,55.2708],   continent:"maghreb",   photo:IMG("dubai") },
  { id:"barcelona",  name:"Barcelone",      country:"Espagne",        flag:"🇪🇸", emoji:"🎭", temp:"21°C", currency:"EUR", mapCenter:[41.3851,2.1734],    continent:"europe",    photo:IMG("barcelona") },
  { id:"newyork",    name:"New York",       country:"USA",            flag:"🇺🇸", emoji:"🗽", temp:"15°C", currency:"USD", mapCenter:[40.7128,-74.0060],   continent:"ameriques", photo:IMG("newyork") },
  { id:"bali",       name:"Bali",           country:"Indonésie",      flag:"🇮🇩", emoji:"🌴", temp:"30°C", currency:"IDR", mapCenter:[-8.3405,115.0920],  continent:"asie",      photo:IMG("bali") },
  { id:"istanbul",   name:"Istanbul",       country:"Türkiye",        flag:"🇹🇷", emoji:"🕍", temp:"20°C", currency:"TRY", mapCenter:[41.0082,28.9784],   continent:"maghreb",   photo:IMG("istanbul") },
  { id:"london",     name:"Londres",        country:"Royaume-Uni",    flag:"🇬🇧", emoji:"🎡", temp:"14°C", currency:"GBP", mapCenter:[51.5074,-0.1278],   continent:"europe",    photo:IMG("london") },
  { id:"singapore",  name:"Singapour",      country:"Singapour",      flag:"🇸🇬", emoji:"🦁", temp:"31°C", currency:"SGD", mapCenter:[1.3521,103.8198],   continent:"asie",      photo:IMG("singapore") },
  { id:"bangkok",    name:"Bangkok",        country:"Thaïlande",      flag:"🇹🇭", emoji:"🛕", temp:"33°C", currency:"THB", mapCenter:[13.7563,100.5018],  continent:"asie",      photo:IMG("bangkok") },
  { id:"amsterdam",  name:"Amsterdam",      country:"Pays-Bas",       flag:"🇳🇱", emoji:"🌷", temp:"16°C", currency:"EUR", mapCenter:[52.3676,4.9041],    continent:"europe",    photo:IMG("amsterdam") },
  { id:"prague",     name:"Prague",         country:"Tchéquie",       flag:"🇨🇿", emoji:"🏰", temp:"15°C", currency:"CZK", mapCenter:[50.0755,14.4378],   continent:"europe",    photo:IMG("prague") },
  { id:"vienna",     name:"Vienne",         country:"Autriche",       flag:"🇦🇹", emoji:"🎶", temp:"16°C", currency:"EUR", mapCenter:[48.2082,16.3738],   continent:"europe",    photo:IMG("vienna") },
  { id:"sydney",     name:"Sydney",         country:"Australie",      flag:"🇦🇺", emoji:"🦘", temp:"22°C", currency:"AUD", mapCenter:[-33.8688,151.2093], continent:"oceanie",   photo:IMG("sydney") },
  { id:"kyoto",      name:"Kyoto",          country:"Japon",          flag:"🇯🇵", emoji:"⛩️", temp:"20°C", currency:"JPY", mapCenter:[35.0116,135.7681],  continent:"asie",      photo:IMG("kyoto") },
  { id:"losangeles", name:"Los Angeles",    country:"USA",            flag:"🇺🇸", emoji:"🎬", temp:"24°C", currency:"USD", mapCenter:[34.0522,-118.2437],  continent:"ameriques", photo:IMG("losangeles") },
  { id:"miami",      name:"Miami",          country:"USA",            flag:"🇺🇸", emoji:"🌊", temp:"29°C", currency:"USD", mapCenter:[25.7617,-80.1918],   continent:"ameriques", photo:IMG("miami") },
  { id:"lisbon",     name:"Lisbonne",       country:"Portugal",       flag:"🇵🇹", emoji:"🚋", temp:"19°C", currency:"EUR", mapCenter:[38.7223,-9.1393],   continent:"europe",    photo:IMG("lisbon") },
  { id:"athens",     name:"Athènes",        country:"Grèce",          flag:"🇬🇷", emoji:"🏺", temp:"25°C", currency:"EUR", mapCenter:[37.9838,23.7275],   continent:"europe",    photo:IMG("athens") },
  { id:"cairo",      name:"Le Caire",       country:"Égypte",         flag:"🇪🇬", emoji:"🐪", temp:"32°C", currency:"EGP", mapCenter:[30.0444,31.2357],   continent:"maghreb",   photo:IMG("cairo") },
  { id:"capetown",   name:"Le Cap",         country:"Afrique du Sud", flag:"🇿🇦", emoji:"🦁", temp:"20°C", currency:"ZAR", mapCenter:[-33.9249,18.4241],  continent:"afrique",   photo:IMG("capetown") },
  { id:"maldives",   name:"Maldives",       country:"Maldives",       flag:"🇲🇻", emoji:"🏝️", temp:"30°C", currency:"MVR", mapCenter:[4.1755,73.5093],    continent:"asie",      photo:IMG("maldives") },
  { id:"santorini",  name:"Santorin",       country:"Grèce",          flag:"🇬🇷", emoji:"🌅", temp:"25°C", currency:"EUR", mapCenter:[36.3932,25.4615],   continent:"europe",    photo:IMG("santorini") },
  { id:"rio",        name:"Rio de Janeiro", country:"Brésil",         flag:"🇧🇷", emoji:"🎉", temp:"28°C", currency:"BRL", mapCenter:[-22.9068,-43.1729],  continent:"ameriques", photo:IMG("rio") },
  { id:"buenosaires",name:"Buenos Aires",   country:"Argentine",      flag:"🇦🇷", emoji:"💃", temp:"20°C", currency:"ARS", mapCenter:[-34.6037,-58.3816],  continent:"ameriques", photo:IMG("buenosaires") },
  { id:"mexico",     name:"Mexico",         country:"Mexique",        flag:"🇲🇽", emoji:"🌮", temp:"22°C", currency:"MXN", mapCenter:[19.4326,-99.1332],   continent:"ameriques", photo:IMG("mexico") },
  { id:"havana",     name:"La Havane",      country:"Cuba",           flag:"🇨🇺", emoji:"🎺", temp:"28°C", currency:"CUP", mapCenter:[23.1136,-82.3666],   continent:"ameriques", photo:IMG("havana") },
  { id:"beijing",    name:"Pékin",          country:"Chine",          flag:"🇨🇳", emoji:"🏯", temp:"18°C", currency:"CNY", mapCenter:[39.9042,116.4074],   continent:"asie",      photo:IMG("beijing") },
  { id:"hongkong",   name:"Hong Kong",      country:"Chine (RAE)",    flag:"🇭🇰", emoji:"🌃", temp:"26°C", currency:"HKD", mapCenter:[22.3193,114.1694],   continent:"asie",      photo:IMG("hongkong") },
  { id:"seoul",      name:"Séoul",          country:"Corée du Sud",   flag:"🇰🇷", emoji:"🎎", temp:"16°C", currency:"KRW", mapCenter:[37.5665,126.9780],   continent:"asie",      photo:IMG("seoul") },
  { id:"berlin",     name:"Berlin",         country:"Allemagne",      flag:"🇩🇪", emoji:"🌉", temp:"15°C", currency:"EUR", mapCenter:[52.5200,13.4050],    continent:"europe",    photo:IMG("berlin") },
  { id:"munich",     name:"Munich",         country:"Allemagne",      flag:"🇩🇪", emoji:"🍺", temp:"14°C", currency:"EUR", mapCenter:[48.1351,11.5820],    continent:"europe",    photo:IMG("munich") },
  { id:"zurich",     name:"Zurich",         country:"Suisse",         flag:"🇨🇭", emoji:"⛰️", temp:"13°C", currency:"CHF", mapCenter:[47.3769,8.5417],    continent:"europe",    photo:IMG("zurich") },
  { id:"toronto",    name:"Toronto",        country:"Canada",         flag:"🇨🇦", emoji:"🍁", temp:"12°C", currency:"CAD", mapCenter:[43.6532,-79.3832],   continent:"ameriques", photo:IMG("toronto") },
  { id:"montreal",   name:"Montréal",       country:"Canada",         flag:"🇨🇦", emoji:"🥐", temp:"10°C", currency:"CAD", mapCenter:[45.5017,-73.5673],   continent:"ameriques", photo:IMG("montreal") },
  { id:"mumbai",     name:"Mumbai",         country:"Inde",           flag:"🇮🇳", emoji:"🎥", temp:"30°C", currency:"INR", mapCenter:[19.0760,72.8777],    continent:"asie",      photo:IMG("mumbai") },
  { id:"delhi",      name:"New Delhi",      country:"Inde",           flag:"🇮🇳", emoji:"🕌", temp:"29°C", currency:"INR", mapCenter:[28.6139,77.2090],    continent:"asie",      photo:IMG("delhi") },
  { id:"nairobi",    name:"Nairobi",        country:"Kenya",          flag:"🇰🇪", emoji:"🦒", temp:"24°C", currency:"KES", mapCenter:[-1.2921,36.8219],    continent:"afrique",   photo:IMG("nairobi") },
  { id:"casablanca", name:"Casablanca",     country:"Maroc",          flag:"🇲🇦", emoji:"🕌", temp:"22°C", currency:"MAD", mapCenter:[33.5731,-7.5898],    continent:"maghreb",   photo:IMG("casablanca") },
  { id:"tunis",      name:"Tunis",          country:"Tunisie",        flag:"🇹🇳", emoji:"🏛️", temp:"23°C", currency:"TND", mapCenter:[36.8191,10.1658],    continent:"maghreb",   photo:IMG("tunis") },
  { id:"alger",      name:"Alger",          country:"Algérie",        flag:"🇩🇿", emoji:"🏛️", temp:"20°C", currency:"DZD", mapCenter:[36.7538,3.0588],     continent:"maghreb",   photo:IMG("alger") },
  { id:"abudhabi",   name:"Abu Dhabi",      country:"Émirats",        flag:"🇦🇪", emoji:"🕌", temp:"34°C", currency:"AED", mapCenter:[24.4539,54.3773],    continent:"maghreb",   photo:IMG("abudhabi") },
  { id:"doha",       name:"Doha",           country:"Qatar",          flag:"🇶🇦", emoji:"🏟️", temp:"33°C", currency:"QAR", mapCenter:[25.2854,51.5310],    continent:"maghreb",   photo:IMG("doha") },
  { id:"phuket",     name:"Phuket",         country:"Thaïlande",      flag:"🇹🇭", emoji:"🏖️", temp:"30°C", currency:"THB", mapCenter:[7.8804,98.3923],     continent:"asie",      photo:IMG("phuket") },
  { id:"florence",   name:"Florence",       country:"Italie",         flag:"🇮🇹", emoji:"🎨", temp:"22°C", currency:"EUR", mapCenter:[43.7696,11.2558],    continent:"europe",    photo:IMG("florence") },
  { id:"venice",     name:"Venise",         country:"Italie",         flag:"🇮🇹", emoji:"🚤", temp:"19°C", currency:"EUR", mapCenter:[45.4408,12.3155],    continent:"europe",    photo:IMG("venice") },
  { id:"seville",    name:"Séville",        country:"Espagne",        flag:"🇪🇸", emoji:"💃", temp:"25°C", currency:"EUR", mapCenter:[37.3891,-5.9845],    continent:"europe",    photo:IMG("seville") },
  { id:"shanghai",   name:"Shanghai",       country:"Chine",          flag:"🇨🇳", emoji:"🌆", temp:"20°C", currency:"CNY", mapCenter:[31.2304,121.4737],   continent:"asie",      photo:IMG("shanghai") },
  // ── European capitals ──
  { id:"dublin",     name:"Dublin",         country:"Irlande",        flag:"🇮🇪", emoji:"🍺", temp:"12°C", currency:"EUR", mapCenter:[53.3498,-6.2603],    continent:"europe",    photo:IMG("dublin") },
  { id:"copenhagen", name:"Copenhague",     country:"Danemark",       flag:"🇩🇰", emoji:"🧜", temp:"13°C", currency:"DKK", mapCenter:[55.6761,12.5683],    continent:"europe",    photo:IMG("copenhagen") },
  { id:"stockholm",  name:"Stockholm",      country:"Suède",          flag:"🇸🇪", emoji:"👑", temp:"10°C", currency:"SEK", mapCenter:[59.3293,18.0686],    continent:"europe",    photo:IMG("stockholm") },
  { id:"helsinki",   name:"Helsinki",       country:"Finlande",       flag:"🇫🇮", emoji:"🌲", temp:"7°C",  currency:"EUR", mapCenter:[60.1699,24.9384],    continent:"europe",    photo:IMG("helsinki") },
  { id:"oslo",       name:"Oslo",           country:"Norvège",        flag:"🇳🇴", emoji:"⛵", temp:"8°C",  currency:"NOK", mapCenter:[59.9139,10.7522],    continent:"europe",    photo:IMG("oslo") },
  { id:"warsaw",     name:"Varsovie",       country:"Pologne",        flag:"🇵🇱", emoji:"🏰", temp:"13°C", currency:"PLN", mapCenter:[52.2297,21.0122],    continent:"europe",    photo:IMG("warsaw") },
  { id:"budapest",   name:"Budapest",       country:"Hongrie",        flag:"🇭🇺", emoji:"🌊", temp:"17°C", currency:"HUF", mapCenter:[47.4979,19.0402],    continent:"europe",    photo:IMG("budapest") },
  { id:"bucharest",  name:"Bucarest",       country:"Roumanie",       flag:"🇷🇴", emoji:"🏛️", temp:"16°C", currency:"RON", mapCenter:[44.4268,26.1025],    continent:"europe",    photo:IMG("bucharest") },
  { id:"brussels",   name:"Bruxelles",      country:"Belgique",       flag:"🇧🇪", emoji:"🧇", temp:"14°C", currency:"EUR", mapCenter:[50.8503,4.3517],     continent:"europe",    photo:IMG("brussels") },
  { id:"edinburgh",  name:"Édimbourg",      country:"Écosse",         flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", emoji:"🏯", temp:"11°C", currency:"GBP", mapCenter:[55.9533,-3.1883],    continent:"europe",    photo:IMG("edinburgh") },
  { id:"belgrade",   name:"Belgrade",       country:"Serbie",         flag:"🇷🇸", emoji:"🎸", temp:"16°C", currency:"RSD", mapCenter:[44.7866,20.4489],    continent:"europe",    photo:IMG("belgrade") },
  { id:"reykjavik",  name:"Reykjavik",      country:"Islande",        flag:"🇮🇸", emoji:"🌌", temp:"5°C",  currency:"ISK", mapCenter:[64.1265,-21.8174],   continent:"europe",    photo:IMG("reykjavik") },
  { id:"sofia",      name:"Sofia",          country:"Bulgarie",       flag:"🇧🇬", emoji:"🕍", temp:"15°C", currency:"BGN", mapCenter:[42.6977,23.3219],    continent:"europe",    photo:IMG("sofia") },
  { id:"zagreb",     name:"Zagreb",         country:"Croatie",        flag:"🇭🇷", emoji:"🏰", temp:"17°C", currency:"EUR", mapCenter:[45.8150,15.9819],    continent:"europe",    photo:IMG("zagreb") },
  { id:"valletta",   name:"La Valette",     country:"Malte",          flag:"🇲🇹", emoji:"⚓", temp:"22°C", currency:"EUR", mapCenter:[35.8997,14.5147],    continent:"europe",    photo:IMG("valletta") },
];

const ORIGINS = ["Alger","Tunis","Casablanca","Rabat","Oran","Constantine","Paris","Lyon","Marseille","Bruxelles","Genève","Montréal","Dakar","Beyrouth","Dubaï","Le Caire","Riyad"];

const CONTINENTS = [
  { id:"tous",      label:"Tous",         icon:"🌍" },
  { id:"europe",    label:"Europe",       icon:"🏛️" },
  { id:"asie",      label:"Asie",         icon:"🌸" },
  { id:"maghreb",   label:"Orient",       icon:"🕌" },
  { id:"ameriques", label:"Amériques",    icon:"🌎" },
  { id:"afrique",   label:"Afrique",      icon:"🦁" },
  { id:"oceanie",   label:"Océanie",      icon:"🦘" },
];

const CONTINENT_BG = { europe:"#0F2040", asie:"#0F2E0F", maghreb:"#2E1800", ameriques:"#0F1E2E", afrique:"#2E1000", oceanie:"#002E2E" };

const FEATURED_IDS = ["paris","tokyo","bali","dubai","santorini","newyork","marrakech","kyoto"];

const TRANSPORT_MODES = [
  { icon:"✈️", label:"Avion",         desc:"Liaisons directes & low-cost partout dans le monde", color:"#8B5CF6" },
  { icon:"🚄", label:"Train rapide",  desc:"TGV, Shinkansen, Frecciarossa — confort & rapidité", color:"#10B981" },
  { icon:"🚢", label:"Croisière",     desc:"Traversée et escales entre plusieurs destinations",   color:"#6366F1" },
  { icon:"🚌", label:"Bus longue distance", desc:"FlixBus, Ouibus — économique & confortable",   color:"#F59E0B" },
  { icon:"🚗", label:"Location auto", desc:"Liberté totale pour explorer à votre rythme",        color:"#EF4444" },
];

const BUDGET_LABELS = {
  serré:{ label:"Budget Serré", icon:"🎒", color:"#2DD4BF", desc:"Voyager malin, profiter au max" },
  moyen:{ label:"Budget Moyen", icon:"✈️",  color:"#F59E0B", desc:"Confort et bonnes expériences" },
  riche:{ label:"Budget Premium",icon:"💎", color:"#8B5CF6", desc:"Le luxe sans compromis" },
};

const LANG = {
  fr:{
    hero_title:"Planifiez votre voyage de rêve",
    hero_sub:"50+ destinations · Hôtels, attractions & itinéraire personnalisé",
    depart:"Ville de départ", search_ph:"Paris, Tokyo, Bali, Marrakech…",
    trending:"Destinations tendance", results:"résultat",
    continue:"Continuer →", configure:"Configurez votre voyage",
    dep_date:"Date de départ", ret_date:"Date de retour",
    adults:"Adultes", children:"Enfants", budget_type:"Type de budget",
    generate:"🗺️ Générer mon programme", back:"← Retour",
    dl_pdf:"Télécharger PDF", modify:"✏️ Modifier",
    step_dest:"Destination", step_settings:"Paramètres", step_program:"Programme",
    home_btn:"Accueil", book_section:"Réserver", generating:"Génération…",
    tabs:["🗺 Attractions","🍽 Restaurants","📅 Itinéraire","🗾 Carte","✈️ Transport","🏨 Hébergements"],
    tab_keys:["attractions","restaurants","itinerary","map","transport","hotels"],
    recommended:"Hébergement recommandé", transport_title:"Transport & Conseils",
    transport_general:"Moyens de transport généraux", tips:"💡 Conseils pratiques",
    no_dest:"Aucune destination trouvée pour",
    selected:"sélectionné", also_choose:"— choisissez aussi votre ville de départ",
    nights:n=>`${n} nuit${n>1?"s":""}`, budget_label:"Budget",
    journey:"Trajet", stay:"Séjour", travelers:"Voyageurs",
    hotel_options:"Options d\'hébergement", stars:"étoile",
    daily_plan:"Programme jour par jour", transport_info:"Infos pratiques",
    // Step 1 landing page
    hero_badge:"Planificateur de voyage intelligent",
    hero_h1:["Créez votre","voyage","idéal"],
    hero_desc:"Des itinéraires personnalisés, des hôtels d'exception et des expériences uniques, rien que pour vous.",
    hero_cta1:"Commencer mon voyage →", hero_cta2:"▶ Découvrir les destinations",
    lbl_depart:"🛫 Départ", lbl_dest:"📍 Destination", dest_ph:"Où partir ?",
    lbl_dates:"📅 Dates", lbl_travelers:"👤 Voyageurs",
    travelers_fn:n=>`${n} voyageur${n>1?"s":""}`,
    lbl_budget:"💰 Budget", search_btn:"Rechercher 🔍",
    search_confirm:(o,d,f)=>`✓ ${o} → ${d} ${f} — cliquez sur Rechercher pour configurer votre voyage`,
    featured_badge:"✦ Destinations populaires",
    featured_title:["Explorez les plus belles","destinations"],
    featured_see_all:"Voir toutes les destinations ▾",
    featured_hotels:"hôtels disponibles",
    grid_title:"Choisissez votre destination",
    grid_search_lbl:"🔍 Rechercher une destination",
    dest_no_origin:"· Choisissez aussi votre ville de départ",
    passion_badge:"✦ Voyagez selon vos envies",
    passion_title:"Des voyages pour chaque passion",
    passion_items:[
      {emoji:"🏝",label:"Plage",desc:"Se détendre au soleil"},
      {emoji:"🏔",label:"Nature",desc:"Aventures & paysages"},
      {emoji:"🏛",label:"Culture",desc:"Histoire & patrimoine"},
      {emoji:"🍽",label:"Gastronomie",desc:"Saveurs du monde"},
      {emoji:"💎",label:"Luxe",desc:"Expériences d'exception"},
      {emoji:"🧭",label:"Aventure",desc:"Sensations fortes"},
    ],
    features_badge:"✦ Pourquoi choisir VoyagesPro ?",
    features_title:"Une expérience sur-mesure",
    features_items:[
      {icon:"✈️",title:"Itinéraires intelligents",desc:"Notre IA crée des itinéraires personnalisés selon vos goûts, votre budget et vos envies."},
      {icon:"🏨",title:"Hôtels sélectionnés",desc:"Une sélection rigoureuse des meilleurs hôtels pour un confort et un service d'exception."},
      {icon:"📄",title:"Export PDF premium",desc:"Exportez votre itinéraire complet en PDF pour l'emporter partout avec vous."},
    ],
    testimonial_rating:"4,9/5 ⭐", testimonial_count:"+10 000 voyageurs satisfaits",
    testimonial_quote:"Un voyage inoubliable grâce à un itinéraire parfaitement organisé.\nChaque détail était parfait !",
    testimonial_author:"— Marie L., Paris → Tokyo",
    cta_title:"Prêt à vivre l'aventure ?",
    cta_desc:"Créez votre voyage de rêve en quelques clics.",
    cta_btn:"Commencer maintenant →",
    about_badge:"À propos", about_title:"Planifiez le voyage de vos rêves, simplement",
    about_p1:"VoyagesPro est né d'une conviction simple : organiser un voyage devrait être un plaisir, pas une corvée. Trop souvent, préparer un séjour demande des heures de recherche sur des dizaines de sites différents pour comparer les attractions, trouver de bons restaurants et bâtir un programme cohérent. Nous avons voulu réunir tout cela en un seul endroit, gratuit et accessible à tous.",
    about_p2:"En quelques clics, indiquez votre destination, vos dates et votre budget : VoyagesPro génère instantanément un itinéraire jour par jour avec les incontournables, des suggestions de restaurants locaux et des recommandations d'hébergements adaptées. Que vous prépariez un week-end à Paris, une lune de miel à Bali ou un grand voyage à Tokyo, notre outil vous fait gagner un temps précieux pour que vous puissiez vous concentrer sur l'essentiel : profiter.",
    guides_badge:"Guides de voyage", guides_title:"Nos destinations à la loupe",
    guides_desc:"Découvrez l'essence de chaque destination, ses incontournables et la meilleure période pour la visiter.",
    guides_btn:"Planifier ce voyage →",
    guides_items:[
      {title:"Paris, la Ville Lumière", text:"Capitale mondiale de l'art de vivre, Paris séduit par ses musées d'exception comme le Louvre et le musée d'Orsay, ses avenues haussmanniennes et la silhouette intemporelle de la tour Eiffel. Flânez le long de la Seine, explorez Montmartre et ses ruelles d'artistes, puis savourez la gastronomie française dans un bistrot du Marais. La meilleure période s'étend d'avril à juin et de septembre à octobre, lorsque la ville révèle toute sa douceur."},
      {title:"Tokyo, entre tradition et futur", text:"Mégapole fascinante où temples millénaires côtoient gratte-ciel ultramodernes, Tokyo ne dort jamais. Perdez-vous dans l'effervescence de Shibuya, recueillez-vous au sanctuaire Meiji, dégustez les meilleurs sushis du marché de Toyosu et plongez dans la culture pop d'Akihabara. Au printemps, les cerisiers en fleurs transforment la ville en tableau poétique. Un voyage à Tokyo est une immersion sensorielle inoubliable."},
      {title:"Marrakech, la perle du Sud", text:"Ville impériale aux mille couleurs, Marrakech enchante par sa médina classée à l'UNESCO, la place Jemaa el-Fna animée jour et nuit, et ses jardins luxuriants comme le jardin Majorelle. Perdez-vous dans les souks parfumés d'épices, séjournez dans un riad traditionnel et offrez-vous une escapade dans le désert ou l'Atlas. Le printemps et l'automne offrent un climat idéal pour découvrir la ville ocre."},
      {title:"Dubaï, le luxe à l'état pur", text:"Symbole de démesure et d'innovation, Dubaï impressionne avec Burj Khalifa, la plus haute tour du monde, ses îles artificielles et ses centres commerciaux gigantesques. Entre safari dans les dunes dorées, plages paradisiaques et restaurants étoilés, la ville mêle modernité futuriste et traditions bédouines. La saison idéale court de novembre à mars, loin des chaleurs estivales extrêmes."},
      {title:"Bali, l'île des dieux", text:"Véritable paradis tropical, Bali conjugue rizières en terrasses, temples sacrés et plages de rêve. Méditez à Ubud au cœur de la jungle, surfez sur les vagues de Canggu, admirez les couchers de soleil sur le temple de Tanah Lot et ressourcez-vous dans un spa balinais. Île de spiritualité et de douceur de vivre, Bali se visite idéalement entre avril et octobre, durant la saison sèche."},
      {title:"New York, la ville qui ne dort jamais", text:"Capitale culturelle et financière, New York est une énergie à elle seule. Contemplez la skyline depuis l'Empire State Building, promenez-vous dans Central Park, traversez le pont de Brooklyn et laissez-vous happer par l'effervescence de Times Square. Entre comédies musicales à Broadway, musées de renommée mondiale et quartiers cosmopolites, la Grosse Pomme se découvre toute l'année, avec une magie particulière à l'automne et pendant les fêtes."},
    ],
    faq_badge:"Questions fréquentes", faq_title:"Tout ce qu'il faut savoir",
    faq_items:[
      ["VoyagesPro est-il vraiment gratuit ?", "Oui, VoyagesPro est 100 % gratuit et le restera. Vous pouvez planifier autant de voyages que vous le souhaitez, consulter les itinéraires et exporter votre programme en PDF sans aucun frais ni abonnement."],
      ["Dois-je créer un compte pour utiliser le site ?", "Non, aucune inscription n'est requise. VoyagesPro fonctionne directement dans votre navigateur : choisissez votre destination, vos dates et votre budget, et obtenez instantanément votre programme personnalisé."],
      ["Comment VoyagesPro crée-t-il mon itinéraire ?", "Notre outil génère un programme jour par jour adapté à votre destination, à la durée de votre séjour et à votre budget. Chaque journée comprend des attractions incontournables, des suggestions de restaurants et des recommandations d'hébergements."],
      ["Combien de destinations sont disponibles ?", "VoyagesPro propose 50 destinations parmi les plus prisées au monde, réparties sur tous les continents : Europe, Asie, Afrique, Amériques et Océanie, de Paris à Tokyo en passant par Marrakech, Dubaï et Bali."],
      ["Puis-je exporter mon programme de voyage ?", "Absolument. Une fois votre itinéraire généré, vous pouvez l'exporter en PDF en un clic pour le consulter hors ligne, l'imprimer ou le partager avec vos compagnons de voyage."],
      ["VoyagesPro réserve-t-il les hôtels et les vols ?", "VoyagesPro est un outil de planification : il vous oriente vers les meilleures attractions, restaurants et hôtels, et vous propose des liens vers des partenaires de confiance pour effectuer vos réservations en toute sérénité."],
      ["Sur quels appareils puis-je utiliser VoyagesPro ?", "VoyagesPro est accessible depuis n'importe quel appareil disposant d'un navigateur web : ordinateur, tablette ou smartphone. L'interface s'adapte automatiquement à votre écran."],
      ["Les informations sont-elles à jour ?", "Nous sélectionnons des lieux et attractions reconnus et durables. Nous vous recommandons toutefois de vérifier les horaires et conditions d'accès directement auprès des établissements avant votre départ."],
    ],
    footer_tagline:"Votre partenaire pour des voyages inoubliables, personnalisés et sans stress.",
    footer_dest:"Destinations",
    footer_continents:["Europe","Asie","Afrique","Amérique","Océanie"],
    footer_info:"Informations",
    footer_links_labels:["À propos","Guides de voyage","FAQ","Contact","Mentions légales & CGU"],
    footer_privacy:"Confidentialité", footer_newsletter:"Newsletter",
    footer_newsletter_desc:"Recevez nos meilleures offres de voyage.",
    footer_newsletter_ph:"Votre email",
    footer_copyright:`© ${new Date().getFullYear()} VoyagesPro. Tous droits réservés.`,
  },
  en:{
    hero_title:"Plan your dream trip",
    hero_sub:"50+ destinations · Hotels, attractions & personalized itinerary",
    depart:"Departure city", search_ph:"Paris, Tokyo, Bali, Marrakech…",
    trending:"Trending destinations", results:"result",
    continue:"Continue →", configure:"Configure your trip",
    dep_date:"Departure date", ret_date:"Return date",
    adults:"Adults", children:"Children", budget_type:"Budget type",
    generate:"🗺️ Generate my itinerary", back:"← Back",
    dl_pdf:"Download PDF", modify:"✏️ Edit",
    step_dest:"Destination", step_settings:"Settings", step_program:"Itinerary",
    home_btn:"Home", book_section:"Book", generating:"Generating…",
    tabs:["🗺 Attractions","🍽 Restaurants","📅 Itinerary","🗾 Map","✈️ Transport","🏨 Accommodation"],
    tab_keys:["attractions","restaurants","itinerary","map","transport","hotels"],
    recommended:"Recommended accommodation", transport_title:"Transport & Tips",
    transport_general:"General transport options", tips:"💡 Practical tips",
    no_dest:"No destination found for",
    selected:"selected", also_choose:"— also choose your departure city",
    nights:n=>`${n} night${n>1?"s":""}`, budget_label:"Budget",
    journey:"Route", stay:"Stay", travelers:"Travelers",
    hotel_options:"Accommodation options", stars:"star",
    daily_plan:"Day-by-Day Plan", transport_info:"Transport & Info",
    // Step 1 landing page
    hero_badge:"Intelligent Travel Planner",
    hero_h1:["Create your","perfect","journey"],
    hero_desc:"Personalized itineraries, exceptional hotels and unique experiences, just for you.",
    hero_cta1:"Start my trip →", hero_cta2:"▶ Discover destinations",
    lbl_depart:"🛫 Departure", lbl_dest:"📍 Destination", dest_ph:"Where to?",
    lbl_dates:"📅 Dates", lbl_travelers:"👤 Travelers",
    travelers_fn:n=>`${n} traveler${n>1?"s":""}`,
    lbl_budget:"💰 Budget", search_btn:"Search 🔍",
    search_confirm:(o,d,f)=>`✓ ${o} → ${d} ${f} — click Search to configure your trip`,
    featured_badge:"✦ Popular destinations",
    featured_title:["Explore the world's most beautiful","destinations"],
    featured_see_all:"See all destinations ▾",
    featured_hotels:"hotels available",
    grid_title:"Choose your destination",
    grid_search_lbl:"🔍 Search a destination",
    dest_no_origin:"· Also choose your departure city",
    passion_badge:"✦ Travel your way",
    passion_title:"Trips for every passion",
    passion_items:[
      {emoji:"🏝",label:"Beach",desc:"Relax in the sun"},
      {emoji:"🏔",label:"Nature",desc:"Adventures & landscapes"},
      {emoji:"🏛",label:"Culture",desc:"History & heritage"},
      {emoji:"🍽",label:"Gastronomy",desc:"Flavors of the world"},
      {emoji:"💎",label:"Luxury",desc:"Exceptional experiences"},
      {emoji:"🧭",label:"Adventure",desc:"Thrills & exploration"},
    ],
    features_badge:"✦ Why choose VoyagesPro?",
    features_title:"A tailor-made experience",
    features_items:[
      {icon:"✈️",title:"Smart itineraries",desc:"Our AI creates personalized itineraries based on your tastes, budget and desires."},
      {icon:"🏨",title:"Curated hotels",desc:"A rigorous selection of the best hotels for exceptional comfort and service."},
      {icon:"📄",title:"Premium PDF export",desc:"Export your complete itinerary as PDF to take with you everywhere."},
    ],
    testimonial_rating:"4.9/5 ⭐", testimonial_count:"+10,000 satisfied travelers",
    testimonial_quote:"An unforgettable trip thanks to a perfectly organized itinerary.\nEvery detail was perfect!",
    testimonial_author:"— Marie L., Paris → Tokyo",
    cta_title:"Ready for adventure?",
    cta_desc:"Create your dream trip in just a few clicks.",
    cta_btn:"Start now →",
    about_badge:"About", about_title:"Plan the trip of your dreams, simply",
    about_p1:"VoyagesPro was born from a simple belief: organizing a trip should be a pleasure, not a chore. Too often, planning a stay requires hours of research across dozens of different websites to compare attractions, find good restaurants, and build a coherent schedule. We wanted to bring it all together in one place, free and accessible to everyone.",
    about_p2:"In just a few clicks, enter your destination, dates and budget: VoyagesPro instantly generates a day-by-day itinerary with must-sees, local restaurant suggestions and tailored accommodation recommendations. Whether you're planning a weekend in Paris, a honeymoon in Bali or a grand adventure in Tokyo, our tool saves you precious time so you can focus on what matters: enjoying.",
    guides_badge:"Travel guides", guides_title:"Our destinations in detail",
    guides_desc:"Discover the essence of each destination, its highlights and the best time to visit.",
    guides_btn:"Plan this trip →",
    guides_items:[
      {title:"Paris, the City of Light", text:"The world capital of art de vivre, Paris captivates with its exceptional museums like the Louvre and Musée d'Orsay, its Haussmann avenues and the timeless Eiffel Tower silhouette. Stroll along the Seine, explore Montmartre's artist lanes, then savor French cuisine in a Marais bistro. Best visited April to June and September to October, when the city is at its most charming."},
      {title:"Tokyo, between tradition and future", text:"A fascinating megalopolis where ancient temples stand beside ultra-modern skyscrapers, Tokyo never sleeps. Get lost in Shibuya's buzz, find peace at Meiji Shrine, taste the finest sushi at Toyosu market and dive into Akihabara pop culture. In spring, cherry blossoms transform the city into a poetic tableau — an unforgettable sensory journey."},
      {title:"Marrakech, Pearl of the South", text:"An imperial city of a thousand colors, Marrakech enchants with its UNESCO-listed medina, Jemaa el-Fna square alive day and night, and lush gardens like the Majorelle Garden. Wander spice-scented souks, stay in a traditional riad and escape to the desert or Atlas Mountains. Spring and autumn offer the ideal climate for the ochre city."},
      {title:"Dubai, pure luxury", text:"A symbol of ambition and innovation, Dubai impresses with the Burj Khalifa, the world's tallest tower, artificial islands and vast malls. Between golden dune safaris, paradise beaches and starred restaurants, the city blends futuristic modernity with Bedouin heritage. Best time to visit: November to March, away from extreme summer heat."},
      {title:"Bali, Island of the Gods", text:"A true tropical paradise, Bali combines terraced rice fields, sacred temples and dream beaches. Meditate in Ubud's jungle, surf Canggu's waves, admire sunsets over Tanah Lot temple and rejuvenate in a Balinese spa. An island of spirituality and gentle living, best visited April to October during the dry season."},
      {title:"New York, the city that never sleeps", text:"Cultural and financial capital, New York is an energy unto itself. Admire the skyline from the Empire State Building, stroll Central Park, cross the Brooklyn Bridge and let Times Square sweep you away. With Broadway musicals, world-class museums and cosmopolitan neighborhoods, the Big Apple enchants year-round, with special magic in autumn and the holiday season."},
    ],
    faq_badge:"FAQ", faq_title:"Everything you need to know",
    faq_items:[
      ["Is VoyagesPro really free?", "Yes, VoyagesPro is 100% free and will remain so. You can plan as many trips as you like, view itineraries and export your programme to PDF with no fees or subscription."],
      ["Do I need to create an account?", "No, no sign-up required. VoyagesPro works directly in your browser: choose your destination, dates and budget, and instantly get your personalised itinerary."],
      ["How does VoyagesPro create my itinerary?", "Our tool generates a day-by-day programme tailored to your destination, length of stay and budget. Each day includes must-see attractions, restaurant suggestions and accommodation recommendations."],
      ["How many destinations are available?", "VoyagesPro offers 50 of the world's most popular destinations across all continents: Europe, Asia, Africa, the Americas and Oceania — from Paris to Tokyo, via Marrakech, Dubai and Bali."],
      ["Can I export my itinerary?", "Absolutely. Once your itinerary is generated, you can export it to PDF in one click to read offline, print or share with your travel companions."],
      ["Does VoyagesPro book hotels and flights?", "VoyagesPro is a planning tool: it guides you to the best attractions, restaurants and hotels, and provides links to trusted partners so you can book with confidence."],
      ["Which devices can I use VoyagesPro on?", "VoyagesPro works on any device with a web browser: computer, tablet or smartphone. The interface adapts automatically to your screen size."],
      ["Is the information up to date?", "We select well-established and lasting places and attractions. We recommend checking opening hours and access conditions directly with establishments before you travel."],
    ],
    footer_tagline:"Your partner for unforgettable, personalized and stress-free travels.",
    footer_dest:"Destinations",
    footer_continents:["Europe","Asia","Africa","Americas","Oceania"],
    footer_info:"Information",
    footer_links_labels:["About","Travel guides","FAQ","Contact","Legal notice & Terms"],
    footer_privacy:"Privacy", footer_newsletter:"Newsletter",
    footer_newsletter_desc:"Get our best travel deals.",
    footer_newsletter_ph:"Your email",
    footer_copyright:`© ${new Date().getFullYear()} VoyagesPro. All rights reserved.`,
  },
  ar:{
    hero_title:"خطط لرحلة أحلامك",
    hero_sub:"أكثر من 50 وجهة · فنادق، معالم سياحية وبرنامج مخصص",
    depart:"مدينة الانطلاق", search_ph:"باريس، طوكيو، بالي، مراكش…",
    trending:"الوجهات الرائجة", results:"نتيجة",
    continue:"متابعة ←", configure:"إعداد رحلتك",
    dep_date:"تاريخ المغادرة", ret_date:"تاريخ العودة",
    adults:"البالغون", children:"الأطفال", budget_type:"نوع الميزانية",
    generate:"🗺️ إنشاء برنامجي", back:"→ رجوع",
    dl_pdf:"تحميل PDF", modify:"✏️ تعديل",
    step_dest:"الوجهة", step_settings:"الإعدادات", step_program:"البرنامج",
    home_btn:"الرئيسية", book_section:"احجز", generating:"جارٍ…",
    tabs:["🗺 المعالم","🍽 المطاعم","📅 البرنامج","🗾 الخريطة","✈️ النقل","🏨 الإقامة"],
    tab_keys:["attractions","restaurants","itinerary","map","transport","hotels"],
    recommended:"الإقامة الموصى بها", transport_title:"النقل والنصائح",
    transport_general:"خيارات النقل العامة", tips:"💡 نصائح عملية",
    no_dest:"لم يتم العثور على وجهة لـ",
    selected:"محدد", also_choose:"— اختر أيضاً مدينة انطلاقك",
    nights:n=>`${n} ليلة`, budget_label:"الميزانية",
    journey:"المسار", stay:"المدة", travelers:"المسافرون",
    hotel_options:"خيارات الإقامة", stars:"نجمة",
    daily_plan:"البرنامج اليومي", transport_info:"النقل والمعلومات",
    // Step 1 landing page
    hero_badge:"مخطط رحلات ذكي",
    hero_h1:["أنشئ رحلة","أحلامك","المثالية"],
    hero_desc:"برامج مخصصة، فنادق استثنائية وتجارب فريدة، فقط لك.",
    hero_cta1:"ابدأ رحلتي ←", hero_cta2:"▶ اكتشف الوجهات",
    lbl_depart:"🛫 المغادرة", lbl_dest:"📍 الوجهة", dest_ph:"إلى أين؟",
    lbl_dates:"📅 التواريخ", lbl_travelers:"👤 المسافرون",
    travelers_fn:n=>`${n} مسافر${n>1?"ون":""}`,
    lbl_budget:"💰 الميزانية", search_btn:"بحث 🔍",
    search_confirm:(o,d,f)=>`✓ ${o} ← ${d} ${f} — انقر بحث لإعداد رحلتك`,
    featured_badge:"✦ الوجهات الشهيرة",
    featured_title:["استكشف أجمل","وجهات العالم"],
    featured_see_all:"عرض جميع الوجهات ▾",
    featured_hotels:"فندق متاح",
    grid_title:"اختر وجهتك",
    grid_search_lbl:"🔍 ابحث عن وجهة",
    dest_no_origin:"· اختر أيضاً مدينة انطلاقك",
    passion_badge:"✦ سافر بطريقتك",
    passion_title:"رحلات لكل شغف",
    passion_items:[
      {emoji:"🏝",label:"الشاطئ",desc:"الاسترخاء تحت الشمس"},
      {emoji:"🏔",label:"الطبيعة",desc:"مغامرات ومناظر خلابة"},
      {emoji:"🏛",label:"الثقافة",desc:"التاريخ والتراث"},
      {emoji:"🍽",label:"الطهي",desc:"نكهات العالم"},
      {emoji:"💎",label:"الفخامة",desc:"تجارب استثنائية"},
      {emoji:"🧭",label:"المغامرة",desc:"إثارة واكتشاف"},
    ],
    features_badge:"✦ لماذا VoyagesPro؟",
    features_title:"تجربة مصممة خصيصاً لك",
    features_items:[
      {icon:"✈️",title:"برامج ذكية",desc:"يُنشئ ذكاؤنا الاصطناعي برامج مخصصة حسب اهتماماتك وميزانيتك ورغباتك."},
      {icon:"🏨",title:"فنادق منتقاة",desc:"تشكيلة دقيقة من أفضل الفنادق لراحة وخدمة استثنائية."},
      {icon:"📄",title:"تصدير PDF متميز",desc:"صدّر برنامجك كاملاً بصيغة PDF لاصطحابه معك في أي مكان."},
    ],
    testimonial_rating:"4.9/5 ⭐", testimonial_count:"+10,000 مسافر سعيد",
    testimonial_quote:"رحلة لا تُنسى بفضل برنامج منظم بإتقان.\nكل تفصيل كان مثالياً!",
    testimonial_author:"— ماري ل.، باريس ← طوكيو",
    cta_title:"مستعد للمغامرة؟",
    cta_desc:"أنشئ رحلة أحلامك بنقرات قليلة.",
    cta_btn:"ابدأ الآن ←",
    about_badge:"عن VoyagesPro", about_title:"خطط لرحلة أحلامك بكل سهولة",
    about_p1:"وُلد VoyagesPro من قناعة بسيطة: تنظيم الرحلة يجب أن يكون متعة، لا عبئاً. في أغلب الأحيان، يستغرق التخطيط ساعات من البحث عبر عشرات المواقع المختلفة لمقارنة المعالم والمطاعم وبناء برنامج متكامل. أردنا تجميع كل ذلك في مكان واحد، مجاناً وفي متناول الجميع.",
    about_p2:"في بضع نقرات، أدخل وجهتك وتواريخك وميزانيتك: يُنشئ VoyagesPro على الفور برنامجاً يومياً بالمعالم الأساسية ومقترحات المطاعم المحلية والإقامات المناسبة. سواء كنت تخطط لعطلة في باريس أو شهر عسل في بالي أو مغامرة كبرى في طوكيو، يوفّر عليك أداتنا وقتاً ثميناً لتتفرغ للأهم: الاستمتاع.",
    guides_badge:"أدلة السفر", guides_title:"وجهاتنا بالتفصيل",
    guides_desc:"اكتشف جوهر كل وجهة ومعالمها وأفضل وقت لزيارتها.",
    guides_btn:"خطط لهذه الرحلة ←",
    guides_items:[
      {title:"باريس، مدينة النور", text:"عاصمة فن العيش في العالم، تأسر باريس بمتاحفها الاستثنائية كاللوفر وأورسيه وشوارعها الهوسمانية والصورة الخالدة لبرج إيفل. تجوّل على ضفاف السين، استكشف مونمارتر وأزقتها الفنية وتذوّق المطبخ الفرنسي في مقهى بالمارية. أفضل موسم للزيارة: من أبريل إلى يونيو ومن سبتمبر إلى أكتوبر."},
      {title:"طوكيو، بين التقاليد والمستقبل", text:"مدينة عملاقة رائعة تتجاور فيها المعابد الألفية وناطحات السحاب الحديثة، طوكيو لا تنام أبداً. تيه في صخب شيبويا، تأمّل في ضريح ميجي، تذوّق أفضل سوشي في سوق تويوسو وانغمس في ثقافة أكيهابارا. في الربيع تتحول المدينة بأزهار الكرز إلى لوحة شعرية — تجربة حسية لا تُنسى."},
      {title:"مراكش، لؤلؤة الجنوب", text:"مدينة إمبراطورية بألف لون، تسحرك مراكش بمدينتها القديمة المدرجة في اليونسكو وساحة جامع الفنا المتحركة ليلاً ونهاراً وحدائقها كحديقة ماجوريل. تيه في الأسواق العطرة، أقم في رياض تقليدي وتمتع بتجربة في الصحراء أو الأطلس. الربيع والخريف موسمان مثاليان للمدينة الحمراء."},
      {title:"دبي، الفخامة في أوجها", text:"رمز الطموح والابتكار، تبهر دبي ببرج خليفة أطول أبراج العالم وجزرها الاصطناعية ومراكزها التجارية العملاقة. بين سفاري الكثبان وشواطئ الأحلام والمطاعم المرموقة، تمزج المدينة بين حداثة مستقبلية وتراث بدوي أصيل. أفضل موسم: من نوفمبر إلى مارس."},
      {title:"بالي، جزيرة الآلهة", text:"جنة استوائية حقيقية تجمع حقول الأرز المدرجة والمعابد المقدسة والشواطئ الخلابة. تأمّل في أوبود في قلب الغابة، اركب أمواج كانغو، أعجب بغروب الشمس على معبد تاناه لوت وجدّد نشاطك في منتجع بالينيزي. جزيرة الروحانية والعيش الهادئ، تُزار مثالياً من أبريل إلى أكتوبر."},
      {title:"نيويورك، المدينة التي لا تنام", text:"العاصمة الثقافية والمالية، نيويورك طاقة بحد ذاتها. أعجب بأفق المدينة من إمباير ستيت بيلدينغ، تجوّل في سنترال بارك، اعبر جسر بروكلين ودعك تبتلعك إثارة تايمز سكوير. بين عروض برودواي والمتاحف العالمية والأحياء الكوزموبوليتانية، تكشف التفاحة الكبرى سحرها طوال العام مع بهجة خاصة في الخريف والأعياد."},
    ],
    faq_badge:"الأسئلة الشائعة", faq_title:"كل ما تحتاج معرفته",
    faq_items:[
      ["هل VoyagesPro مجاني حقاً؟", "نعم، VoyagesPro مجاني 100% وسيظل كذلك. يمكنك التخطيط لأي عدد من الرحلات والاطلاع على البرامج وتصديرها بصيغة PDF دون أي رسوم أو اشتراك."],
      ["هل أحتاج إلى إنشاء حساب؟", "لا، لا يلزم التسجيل. يعمل VoyagesPro مباشرة في متصفحك: اختر وجهتك وتواريخك وميزانيتك، واحصل فوراً على برنامجك المخصص."],
      ["كيف يُنشئ VoyagesPro برنامجي؟", "تُولّد أداتنا برنامجاً يومياً مُكيَّفاً مع وجهتك ومدة إقامتك وميزانيتك. تشمل كل يوم أبرز المعالم السياحية واقتراحات المطاعم والإقامات المناسبة."],
      ["كم عدد الوجهات المتاحة؟", "يقدم VoyagesPro 50 وجهة من أشهر وجهات العالم موزعة على جميع القارات: أوروبا وآسيا وأفريقيا والأمريكتان وأوقيانوسيا، من باريس إلى طوكيو مروراً بمراكش ودبي وبالي."],
      ["هل يمكنني تصدير برنامج رحلتي؟", "بالتأكيد. بمجرد إنشاء برنامجك، يمكنك تصديره بصيغة PDF بنقرة واحدة للاطلاع عليه دون اتصال أو طباعته أو مشاركته مع رفقاء سفرك."],
      ["هل يحجز VoyagesPro الفنادق والرحلات؟", "VoyagesPro أداة تخطيط: يرشدك إلى أفضل المعالم والمطاعم والفنادق، ويوفر روابط لشركاء موثوقين لإجراء حجوزاتك بكل سهولة وأمان."],
      ["على أي أجهزة يمكنني استخدام VoyagesPro؟", "يعمل VoyagesPro على أي جهاز بمتصفح ويب: حاسوب أو لوحي أو هاتف ذكي. تتكيف الواجهة تلقائياً مع حجم شاشتك."],
      ["هل المعلومات محدَّثة؟", "نختار أماكن ومعالم راسخة ومستدامة. نوصي مع ذلك بالتحقق من أوقات العمل وشروط الدخول مباشرة من الجهات المعنية قبل سفرك."],
    ],
    footer_tagline:"رفيقك لرحلات لا تُنسى، مخصصة وخالية من التوتر.",
    footer_dest:"الوجهات",
    footer_continents:["أوروبا","آسيا","أفريقيا","الأمريكتان","أوقيانوسيا"],
    footer_info:"معلومات",
    footer_links_labels:["عن VoyagesPro","أدلة السفر","الأسئلة الشائعة","تواصل معنا","الإشعارات القانونية"],
    footer_privacy:"الخصوصية", footer_newsletter:"النشرة الإخبارية",
    footer_newsletter_desc:"احصل على أفضل عروض السفر.",
    footer_newsletter_ph:"بريدك الإلكتروني",
    footer_copyright:`© ${new Date().getFullYear()} VoyagesPro. جميع الحقوق محفوظة.`,
  },
};

const STEP1 = {
  dark:{
    bg:"#07111F", bg2:"#0F1B2D", footerBg:"#060D1A",
    text:"#F8FAFC", textMuted:"#94A3B8",
    cardBg:"rgba(15,27,45,.65)", cardBorder:"rgba(255,255,255,.07)",
    searchBg:"rgba(10,20,38,.9)", searchBorder:"rgba(255,255,255,.08)",
    searchDivider:"rgba(255,255,255,.08)", searchText:"#F8FAFC",
    passionBg:"rgba(255,255,255,.03)", passionBorder:"rgba(255,255,255,.07)",
    gridBg:"rgba(15,27,45,.55)", gridBorder:"rgba(255,255,255,.07)",
    btnOutline:"rgba(255,255,255,.12)", btnOutlineText:"#94A3B8",
    sectionTag:"#D4A574", socialBg:"rgba(255,255,255,.05)",
    socialBorder:"rgba(255,255,255,.08)", divider:"rgba(255,255,255,.06)",
    copyright:"rgba(148,163,184,.45)", continentBg:"rgba(255,255,255,.03)",
    continentActive:"rgba(212,165,116,.1)", heroMuted:"rgba(248,250,252,.68)",
  },
  light:{
    bg:"#FAF6F0", bg2:"#F0E8DC", footerBg:"#1A1208",
    text:"#1A1208", textMuted:"#7B6B55",
    cardBg:"rgba(255,255,255,.95)", cardBorder:"rgba(212,165,116,.18)",
    searchBg:"rgba(255,248,240,.97)", searchBorder:"rgba(212,165,116,.28)",
    searchDivider:"rgba(212,165,116,.18)", searchText:"#1A1208",
    passionBg:"rgba(212,165,116,.06)", passionBorder:"rgba(212,165,116,.14)",
    gridBg:"rgba(255,248,240,.92)", gridBorder:"rgba(212,165,116,.18)",
    btnOutline:"rgba(26,18,8,.14)", btnOutlineText:"#7B6B55",
    sectionTag:"#C49160", socialBg:"rgba(255,255,255,.08)",
    socialBorder:"rgba(255,255,255,.12)", divider:"rgba(255,255,255,.08)",
    copyright:"rgba(255,255,255,.5)", continentBg:"rgba(212,165,116,.06)",
    continentActive:"rgba(212,165,116,.18)", heroMuted:"rgba(248,250,252,.78)",
  },
};

const THEMES = {
  dark:{
    bg:"#08071A", bg2:"linear-gradient(160deg,#06051A 0%,#0D0A28 50%,#06051A 100%)",
    card:"rgba(139,92,246,.06)", cardBorder:"rgba(139,92,246,.15)",
    cardHover:"rgba(139,92,246,.22)",
    text:"#F0EEFF", text2:"rgba(196,181,253,.75)", text3:"rgba(196,181,253,.4)",
    inputBg:"rgba(139,92,246,.08)", inputBorder:"rgba(139,92,246,.2)",
    headerBg:"linear-gradient(135deg,#160D35,#22104A,#160D35)",
    headerBorder:"rgba(139,92,246,.2)",
    heroBg:"linear-gradient(135deg,#0F0822,#1C0D42,#0F0822)",
    summaryBg:"linear-gradient(135deg,#1A0B40,#22104A)",
    summaryBorder:"rgba(139,92,246,.25)",
    tabActive:"linear-gradient(135deg,#6D28D9,#8B5CF6)",
    tabInactive:"rgba(139,92,246,.08)",
    tabInactiveBorder:"rgba(139,92,246,.15)",
    tabInactiveColor:"rgba(196,181,253,.75)",
    btnSecBg:"rgba(139,92,246,.08)", btnSecBorder:"rgba(139,92,246,.15)", btnSecColor:"#A78BFA",
    hotelBg:"linear-gradient(135deg,rgba(139,92,246,.08),rgba(245,158,11,.04))",
    hotelBorder:"rgba(139,92,246,.2)",
  },
  light:{
    bg:"#FAF8FF", bg2:"linear-gradient(160deg,#F5F0FF 0%,#EDE5FF 50%,#F5F0FF 100%)",
    card:"#FFFFFF", cardBorder:"rgba(109,40,217,.12)",
    cardHover:"rgba(109,40,217,.06)",
    text:"#1A0B35", text2:"#5B21B6", text3:"#A78BFA",
    inputBg:"#FFFFFF", inputBorder:"rgba(109,40,217,.25)",
    headerBg:"linear-gradient(135deg,#3B0764,#6D28D9,#7C3AED)",
    headerBorder:"rgba(109,40,217,.3)",
    heroBg:"linear-gradient(135deg,#3B0764,#6D28D9,#8B5CF6)",
    summaryBg:"linear-gradient(135deg,#EDE5FF,#F5F0FF)",
    summaryBorder:"rgba(109,40,217,.2)",
    tabActive:"linear-gradient(135deg,#5B21B6,#7C3AED)",
    tabInactive:"rgba(109,40,217,.06)",
    tabInactiveBorder:"rgba(109,40,217,.15)",
    tabInactiveColor:"#5B21B6",
    btnSecBg:"rgba(109,40,217,.06)", btnSecBorder:"rgba(109,40,217,.15)", btnSecColor:"#6D28D9",
    hotelBg:"linear-gradient(135deg,rgba(109,40,217,.08),rgba(245,158,11,.04))",
    hotelBorder:"rgba(109,40,217,.2)",
  },
};

// Rich data for top cities
const CITY_DATA = {
  paris:{
    attractions:[
      {name:"Tour Eiffel",type:"monument",budget:{serré:"Gratuit (ext.)",moyen:"18€ (2e étage)",riche:"28€ (sommet)"},duration:"2h",coords:[48.8584,2.2945]},
      {name:"Musée du Louvre",type:"musée",budget:{serré:"15€",moyen:"15€",riche:"Visite privée 350€"},duration:"3h",coords:[48.8606,2.3376]},
      {name:"Montmartre & Sacré-Coeur",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[48.8867,2.3431]},
      {name:"Musée d'Orsay",type:"musée",budget:{serré:"14€",moyen:"14€",riche:"Guidé 80€"},duration:"2h30",coords:[48.8600,2.3266]},
      {name:"Versailles",type:"monument",budget:{serré:"20€",moyen:"20€",riche:"50€ (accès total)"},duration:"4h",coords:[48.8049,2.1204]},
      {name:"Croisière Seine",type:"loisir",budget:{serré:"15€",moyen:"25€",riche:"90€ (dîner)"},duration:"1h30",coords:[48.8566,2.3522]},
    ],
    restaurants:[
      {name:"Breizh Café",type:"Crêperie bretonne",budget:{serré:"12-18€",moyen:"18-25€",riche:"25-35€"},coords:[48.8613,2.3580]},
      {name:"L'As du Fallafel",type:"Street food",budget:{serré:"6-10€",moyen:"8-12€",riche:null},coords:[48.8565,2.3529]},
      {name:"Frenchie",type:"Bistro moderne",budget:{serré:null,moyen:"45-65€",riche:"65-90€"},coords:[48.8631,2.3476]},
      {name:"Le Jules Verne",type:"Gastronomique Tour Eiffel",budget:{serré:null,moyen:null,riche:"180-300€"},coords:[48.8583,2.2945]},
      {name:"Café de Flore",type:"Café parisien",budget:{serré:"8-15€",moyen:"10-20€",riche:"15-25€"},coords:[48.8537,2.3328]},
    ],
    hotels:{serré:{name:"Generator Paris",price:"45-80€/nuit",stars:2},moyen:{name:"Mercure Paris Centre",price:"120-180€/nuit",stars:3},riche:{name:"Hôtel de Crillon",price:"900-2500€/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vol direct ~3h depuis Maghreb",budgetNote:"Dès 80€ (low cost)"}],
  },
  tokyo:{
    attractions:[
      {name:"Temple Senso-ji",type:"temple",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide 5000 ¥"},duration:"1h30",coords:[35.7148,139.7967]},
      {name:"Shibuya Crossing",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[35.6595,139.7004]},
      {name:"Palais Impérial",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h30",coords:[35.6852,139.7528]},
      {name:"TeamLab Planets",type:"art numérique",budget:{serré:"3200 ¥",moyen:"3200 ¥",riche:"3200 ¥"},duration:"2h",coords:[35.6470,139.7955]},
      {name:"Akihabara",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[35.7021,139.7749]},
    ],
    restaurants:[
      {name:"Ichiran Ramen",type:"Ramen",budget:{serré:"1000-1500 ¥",moyen:"1500 ¥",riche:null},coords:[35.6595,139.7004]},
      {name:"Sukiyabashi Jiro",type:"Sushi gastronomique",budget:{serré:null,moyen:null,riche:"30000-40000 ¥"},coords:[35.6717,139.7642]},
      {name:"Tsukiji Market",type:"Street food",budget:{serré:"500-2000 ¥",moyen:"2000 ¥",riche:"2000 ¥"},coords:[35.6654,139.7707]},
    ],
    hotels:{serré:{name:"Capsule Hotel Shinjuku",price:"3000-5000 ¥/nuit",stars:1},moyen:{name:"Dormy Inn Akihabara",price:"9000-15000 ¥/nuit",stars:3},riche:{name:"The Peninsula Tokyo",price:"60000-120000 ¥/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Long-courrier ~12h depuis Europe",budgetNote:"Dès 450€ (économie)"}],
  },
  marrakech:{
    attractions:[
      {name:"Djemaa el-Fna",type:"place",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[31.6258,-7.9891]},
      {name:"Jardins Majorelle",type:"jardin",budget:{serré:"70 MAD",moyen:"70 MAD",riche:"VIP 300 MAD"},duration:"1h30",coords:[31.6422,-8.0035]},
      {name:"Palais de la Bahia",type:"monument",budget:{serré:"10 MAD",moyen:"10 MAD",riche:"Guidé 150 MAD"},duration:"1h30",coords:[31.6226,-7.9827]},
      {name:"Médina & Souks",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide 500 MAD"},duration:"3h",coords:[31.6315,-7.9868]},
      {name:"Excursion Atlas",type:"nature",budget:{serré:"200 MAD",moyen:"400 MAD",riche:"800 MAD"},duration:"Journée",coords:[31.5500,-7.7000]},
    ],
    restaurants:[
      {name:"Café des Épices",type:"Cuisine marocaine",budget:{serré:"40-80 MAD",moyen:"80-150 MAD",riche:"150+ MAD"},coords:[31.6318,-7.9853]},
      {name:"Nomad",type:"Fusion contemporaine",budget:{serré:null,moyen:"150-250 MAD",riche:"300+ MAD"},coords:[31.6314,-7.9847]},
      {name:"La Mamounia",type:"Gastronomique",budget:{serré:null,moyen:null,riche:"600-1200 MAD"},coords:[31.6260,-7.9997]},
    ],
    hotels:{serré:{name:"Riad Dar Zitoun",price:"250-400 MAD/nuit",stars:2},moyen:{name:"Riad Yasmine",price:"600-900 MAD/nuit",stars:3},riche:{name:"La Mamounia",price:"4500-15000 MAD/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vols directs depuis Alger, Tunis, Paris",budgetNote:"Dès 60€"}],
  },
  rome:{
    attractions:[
      {name:"Colisée",type:"monument",budget:{serré:"16€",moyen:"22€",riche:"Privé 80€"},duration:"2h",coords:[41.8902,12.4922]},
      {name:"Vatican & Chapelle Sixtine",type:"musée",budget:{serré:"17€",moyen:"25€",riche:"VIP 100€"},duration:"3h",coords:[41.9029,12.4534]},
      {name:"Fontaine de Trevi",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"30min",coords:[41.9009,12.4833]},
      {name:"Forum Romain",type:"monument",budget:{serré:"16€",moyen:"16€",riche:"Guide 30€"},duration:"2h",coords:[41.8925,12.4853]},
    ],
    restaurants:[
      {name:"Tonnarello",type:"Trattoria romaine",budget:{serré:"15-25€",moyen:"25-40€",riche:"40-60€"},coords:[41.8896,12.4720]},
      {name:"Suppli Roma",type:"Street food",budget:{serré:"3-8€",moyen:"5-10€",riche:null},coords:[41.8957,12.4680]},
      {name:"La Pergola",type:"Gastronomique 3 étoiles",budget:{serré:null,moyen:null,riche:"150-250€"},coords:[41.9161,12.4403]},
    ],
    hotels:{serré:{name:"Hotel Panda",price:"60-90€/nuit",stars:2},moyen:{name:"Mercure Roma",price:"130-200€/nuit",stars:4},riche:{name:"Hotel de Russie",price:"700-2000€/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vols directs",budgetNote:"Dès 50€"},{mode:"🚉 Train",info:"Frecciarossa",budgetNote:"Dès 60€"}],
  },
  dubai:{
    attractions:[
      {name:"Burj Khalifa",type:"monument",budget:{serré:"149 AED",moyen:"200 AED",riche:"500 AED (Top)"},duration:"2h",coords:[25.1972,55.2744]},
      {name:"Dubai Mall",type:"loisir",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"3h",coords:[25.1980,55.2796]},
      {name:"Desert Safari",type:"nature",budget:{serré:"150 AED",moyen:"300 AED",riche:"800 AED (privé)"},duration:"Soirée",coords:[24.9896,55.5019]},
      {name:"Palm Jumeirah",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Croisière 300 AED"},duration:"2h",coords:[25.1124,55.1390]},
    ],
    restaurants:[
      {name:"Ravi Restaurant",type:"Pakistanais économique",budget:{serré:"20-40 AED",moyen:"40 AED",riche:null},coords:[25.2615,55.3008]},
      {name:"Al Fanar",type:"Cuisine émiratie",budget:{serré:null,moyen:"80-150 AED",riche:"150-200 AED"},coords:[25.1905,55.2630]},
      {name:"Pierchic",type:"Gastronomique sur l'eau",budget:{serré:null,moyen:null,riche:"400-700 AED"},coords:[25.1430,55.1820]},
    ],
    hotels:{serré:{name:"ibis Dubai",price:"180-250 AED/nuit",stars:2},moyen:{name:"Marriott Al Jaddaf",price:"400-600 AED/nuit",stars:4},riche:{name:"Burj Al Arab",price:"5000-30000 AED/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vols directs depuis la plupart des capitales",budgetNote:"Dès 200€"}],
  },
  istanbul:{
    attractions:[
      {name:"Sainte-Sophie",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide 500 TRY"},duration:"2h",coords:[41.0086,28.9802]},
      {name:"Mosquée Bleue",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[41.0054,28.9768]},
      {name:"Grand Bazar",type:"marché",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[41.0108,28.9680]},
      {name:"Palais Topkapi",type:"musée",budget:{serré:"350 TRY",moyen:"350 TRY",riche:"Visite privée 2000 TRY"},duration:"3h",coords:[41.0136,28.9833]},
      {name:"Croisière Bosphore",type:"loisir",budget:{serré:"200 TRY",moyen:"400 TRY",riche:"1500 TRY"},duration:"2h",coords:[41.0443,28.9900]},
    ],
    restaurants:[
      {name:"Hafiz Mustafa",type:"Pâtisserie ottomane",budget:{serré:"50-150 TRY",moyen:"100-200 TRY",riche:"200+ TRY"},coords:[41.0099,28.9742]},
      {name:"Karaköy Güllüoglu",type:"Baklava & street food",budget:{serré:"30-80 TRY",moyen:"50-100 TRY",riche:null},coords:[41.0234,28.9768]},
      {name:"Nusr-Et (Salt Bae)",type:"Steakhouse premium",budget:{serré:null,moyen:null,riche:"2000-5000 TRY"},coords:[41.0596,29.0006]},
    ],
    hotels:{serré:{name:"Istanbul Hostel",price:"150-300 TRY/nuit",stars:1},moyen:{name:"Sura Hotels",price:"800-1500 TRY/nuit",stars:4},riche:{name:"Four Seasons Istanbul",price:"5000-15000 TRY/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Nombreux vols directs depuis Maghreb & Europe",budgetNote:"Dès 80€"}],
  },
  london:{
    attractions:[
      {name:"Big Ben & Westminster",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Visite 28£"},duration:"1h30",coords:[51.5007,-0.1246]},
      {name:"British Museum",type:"musée",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Privé 200£"},duration:"3h",coords:[51.5194,-0.1270]},
      {name:"Tour de Londres",type:"monument",budget:{serré:"29£",moyen:"29£",riche:"VIP 60£"},duration:"2h",coords:[51.5081,-0.0759]},
      {name:"London Eye",type:"loisir",budget:{serré:"20£",moyen:"27£",riche:"Cabine 75£"},duration:"1h",coords:[51.5033,-0.1196]},
    ],
    restaurants:[
      {name:"Dishoom",type:"Cuisine indienne",budget:{serré:"15-25£",moyen:"25-40£",riche:null},coords:[51.5116,-0.1236]},
      {name:"Borough Market",type:"Street food",budget:{serré:"5-15£",moyen:"10-20£",riche:null},coords:[51.5054,-0.0905]},
      {name:"The Fat Duck",type:"Gastronomique 3 étoiles",budget:{serré:null,moyen:null,riche:"325£"},coords:[51.5069,-0.7180]},
    ],
    hotels:{serré:{name:"Generator London",price:"25-60£/nuit",stars:2},moyen:{name:"Marriott County Hall",price:"200-400£/nuit",stars:4},riche:{name:"The Ritz London",price:"800-3000£/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Nombreux vols",budgetNote:"Dès 40€"},{mode:"🚉 Eurostar",info:"Paris-Londres 2h15",budgetNote:"Dès 50£"}],
  },
  newyork:{
    attractions:[
      {name:"Statue de la Liberté",type:"monument",budget:{serré:"24$",moyen:"24$",riche:"Accès couronne"},duration:"3h",coords:[40.6892,-74.0445]},
      {name:"Central Park",type:"parc",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Carriage 150$"},duration:"2h",coords:[40.7851,-73.9683]},
      {name:"Metropolitan Museum",type:"musée",budget:{serré:"30$",moyen:"30$",riche:"Privé 200$"},duration:"3h",coords:[40.7794,-73.9632]},
      {name:"Times Square",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[40.7580,-73.9855]},
      {name:"Brooklyn Bridge",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[40.7061,-73.9969]},
    ],
    restaurants:[
      {name:"Katz's Deli",type:"Deli new-yorkais",budget:{serré:"20-30$",moyen:"25-35$",riche:null},coords:[40.7223,-73.9874]},
      {name:"Joe's Pizza",type:"Pizza slice",budget:{serré:"3-8$",moyen:"5-10$",riche:null},coords:[40.7306,-74.0022]},
      {name:"Le Bernardin",type:"Gastronomique",budget:{serré:null,moyen:null,riche:"180-300$"},coords:[40.7614,-73.9828]},
    ],
    hotels:{serré:{name:"HI NYC Hostel",price:"50-90$/nuit",stars:1},moyen:{name:"The Pod Hotel",price:"150-250$/nuit",stars:3},riche:{name:"The Plaza Hotel",price:"800-3000$/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Transatlantique ~8h",budgetNote:"Dès 350€ (économie)"}],
  },
  bali:{
    attractions:[
      {name:"Temple Tanah Lot",type:"temple",budget:{serré:"60k IDR",moyen:"60k IDR",riche:"Guide 300k IDR"},duration:"2h",coords:[-8.6215,115.0868]},
      {name:"Ubud Rice Terraces",type:"nature",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Tour 500k IDR"},duration:"2h",coords:[-8.4317,115.2765]},
      {name:"Monkey Forest",type:"nature",budget:{serré:"80k IDR",moyen:"80k IDR",riche:"80k IDR"},duration:"1h30",coords:[-8.5188,115.2590]},
      {name:"Kuta Beach",type:"plage",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Club 300k IDR"},duration:"3h",coords:[-8.7177,115.1686]},
    ],
    restaurants:[
      {name:"Warung Babi Guling",type:"Cuisine balinaise",budget:{serré:"30-60k IDR",moyen:"50-80k IDR",riche:null},coords:[-8.5067,115.2625]},
      {name:"Locavore",type:"Gastronomique local",budget:{serré:null,moyen:"500k IDR",riche:"900k+ IDR"},coords:[-8.5064,115.2591]},
    ],
    hotels:{serré:{name:"Capsule Bali Hostel",price:"80-150k IDR/nuit",stars:1},moyen:{name:"Bali Garden Resort",price:"600-900k IDR/nuit",stars:3},riche:{name:"Four Seasons Bali",price:"5M-20M IDR/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Via Singapour ou Kuala Lumpur",budgetNote:"Dès 500€"}],
  },
  barcelona:{
    attractions:[
      {name:"Sagrada Família",type:"monument",budget:{serré:"26€",moyen:"36€",riche:"Privé 150€"},duration:"2h",coords:[41.4036,2.1744]},
      {name:"Parc Güell",type:"parc",budget:{serré:"10€",moyen:"10€",riche:"Guide 60€"},duration:"1h30",coords:[41.4145,2.1527]},
      {name:"La Boqueria",type:"marché",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[41.3817,2.1719]},
      {name:"Barceloneta Beach",type:"plage",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Club 100€"},duration:"3h",coords:[41.3796,2.1923]},
    ],
    restaurants:[
      {name:"Bar del Pla",type:"Tapas catalanes",budget:{serré:"15-25€",moyen:"25-40€",riche:"40-60€"},coords:[41.3845,2.1802]},
      {name:"Cervecería Catalana",type:"Tapas & pintxos",budget:{serré:"15-25€",moyen:"20-35€",riche:null},coords:[41.3927,2.1616]},
      {name:"Disfrutar",type:"Gastronomique 2 étoiles",budget:{serré:null,moyen:null,riche:"200-300€"},coords:[41.3922,2.1540]},
    ],
    hotels:{serré:{name:"Sant Jordi Hostels",price:"25-50€/nuit",stars:1},moyen:{name:"Hotel Arts",price:"200-400€/nuit",stars:4},riche:{name:"W Barcelona",price:"400-1500€/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Low cost",budgetNote:"Dès 40€"},{mode:"🚉 TGV",info:"6h30 depuis Paris",budgetNote:"Dès 60€"}],
  },
  athens:{
    attractions:[
      {name:"Acropole & Parthénon",type:"monument",budget:{serré:"20€",moyen:"20€",riche:"Guide privé 100€"},duration:"2h30",coords:[37.9715,23.7267]},
      {name:"Musée de l'Acropole",type:"musée",budget:{serré:"10€",moyen:"10€",riche:"Privé 80€"},duration:"2h",coords:[37.9683,23.7289]},
      {name:"Plaka (vieille ville)",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[37.9745,23.7302]},
    ],
    restaurants:[
      {name:"Thanasis",type:"Souvlaki & gyros",budget:{serré:"5-10€",moyen:"8-15€",riche:null},coords:[37.9757,23.7268]},
      {name:"Strofi",type:"Cuisine grecque vue Acropole",budget:{serré:null,moyen:"30-50€",riche:"50-80€"},coords:[37.9693,23.7247]},
      {name:"Spondi",type:"Gastronomique 2 étoiles",budget:{serré:null,moyen:null,riche:"100-180€"},coords:[37.9789,23.7484]},
    ],
    hotels:{serré:{name:"Athens Backpackers",price:"15-40€/nuit",stars:1},moyen:{name:"Hotel Electra Palace",price:"120-250€/nuit",stars:4},riche:{name:"Hotel Grande Bretagne",price:"400-1200€/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vols directs Europe & Maghreb",budgetNote:"Dès 60€"}],
  },
  singapore:{
    attractions:[
      {name:"Gardens by the Bay",type:"parc",budget:{serré:"Gratuit (ext.)",moyen:"28 SGD",riche:"28 SGD"},duration:"2h",coords:[1.2816,103.8636]},
      {name:"Marina Bay Sands SkyPark",type:"monument",budget:{serré:"26 SGD",moyen:"26 SGD",riche:"Infinity Pool"},duration:"1h30",coords:[1.2839,103.8607]},
      {name:"Sentosa Island",type:"loisir",budget:{serré:"Gratuit (entrée)",moyen:"100+ SGD",riche:"300+ SGD"},duration:"Journée",coords:[1.2494,103.8303]},
    ],
    restaurants:[
      {name:"Hawker Chan",type:"Poulet soja 1 étoile Michelin",budget:{serré:"6-10 SGD",moyen:"10 SGD",riche:null},coords:[1.2839,103.8449]},
      {name:"Odette",type:"Gastronomique 3 étoiles",budget:{serré:null,moyen:null,riche:"350-500 SGD"},coords:[1.2898,103.8480]},
    ],
    hotels:{serré:{name:"Wink Hostel",price:"30-60 SGD/nuit",stars:1},moyen:{name:"Copthorne King's",price:"150-250 SGD/nuit",stars:4},riche:{name:"Marina Bay Sands",price:"600-2000 SGD/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Hub mondial Changi",budgetNote:"Dès 350€ depuis Europe"}],
  },
  cairo:{
    attractions:[
      {name:"Pyramides de Gizeh",type:"monument",budget:{serré:"200 EGP",moyen:"200 EGP",riche:"Tour privé 2000 EGP"},duration:"4h",coords:[29.9792,31.1342]},
      {name:"Musée Égyptien",type:"musée",budget:{serré:"200 EGP",moyen:"300 EGP",riche:"Guide privé 1500 EGP"},duration:"2h30",coords:[30.0478,31.2336]},
      {name:"Bazar Khan el-Khalili",type:"marché",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[30.0478,31.2623]},
    ],
    restaurants:[
      {name:"Koshary Abou Tarek",type:"Koshary (plat national)",budget:{serré:"20-50 EGP",moyen:"30-60 EGP",riche:null},coords:[30.0612,31.2480]},
      {name:"Sequoia",type:"Restaurant vue Nil",budget:{serré:null,moyen:"400-700 EGP",riche:"700-1200 EGP"},coords:[30.0625,31.2100]},
    ],
    hotels:{serré:{name:"Dahab Hostel Cairo",price:"100-250 EGP/nuit",stars:1},moyen:{name:"Kempinski Nile Hotel",price:"1500-2500 EGP/nuit",stars:4},riche:{name:"Four Seasons Cairo",price:"6000-20000 EGP/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vols directs depuis Maghreb, Europe & Golfe",budgetNote:"Dès 80€"}],
  },
  tunis:{
    attractions:[
      {name:"Médina de Tunis (UNESCO)",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide 30 TND"},duration:"3h",coords:[36.7980,10.1708]},
      {name:"Carthage (ruines antiques)",type:"monument",budget:{serré:"12 TND",moyen:"12 TND",riche:"Guide privé 60 TND"},duration:"2h30",coords:[36.8524,10.3233]},
      {name:"Musée du Bardo",type:"musée",budget:{serré:"10 TND",moyen:"10 TND",riche:"Guidé 30 TND"},duration:"2h",coords:[36.8178,10.1339]},
      {name:"Sidi Bou Saïd",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[36.8696,10.3467]},
    ],
    restaurants:[
      {name:"Dar El Jeld",type:"Cuisine tunisienne raffinée",budget:{serré:null,moyen:"40-80 TND",riche:"80-150 TND"},coords:[36.7975,10.1710]},
      {name:"Café des Nattes",type:"Café maure iconique",budget:{serré:"3-8 TND",moyen:"5-12 TND",riche:null},coords:[36.8700,10.3470]},
    ],
    hotels:{serré:{name:"Hôtel de la Médina",price:"50-90 TND/nuit",stars:2},moyen:{name:"Novotel Tunis",price:"200-350 TND/nuit",stars:4},riche:{name:"Four Seasons Tunis",price:"800-2500 TND/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Vols directs Europe & Maghreb",budgetNote:"Dès 60€"}],
  },
  alger:{
    attractions:[
      {name:"La Casbah d'Alger (UNESCO)",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide 1500 DZD"},duration:"3h",coords:[36.7877,3.0599]},
      {name:"Grande Mosquée d'Alger",type:"monument",budget:{serré:"Gratuit (ext.)",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[36.7553,3.0481]},
      {name:"Musée National des Beaux-Arts",type:"musée",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h30",coords:[36.7681,3.0523]},
    ],
    restaurants:[
      {name:"Le Grand Café",type:"Cuisine algérienne",budget:{serré:"500-1500 DZD",moyen:"1000-2500 DZD",riche:"2000-4000 DZD"},coords:[36.7681,3.0590]},
      {name:"Restaurant El Djazair",type:"Cuisine algérienne",budget:{serré:"800-1500 DZD",moyen:"1500-3000 DZD",riche:"3000+ DZD"},coords:[36.7664,3.0537]},
    ],
    hotels:{serré:{name:"Hôtel El Djazaïr",price:"5000-8000 DZD/nuit",stars:2},moyen:{name:"Sheraton Club des Pins",price:"15000-25000 DZD/nuit",stars:4},riche:{name:"Sofitel Algiers",price:"30000-70000 DZD/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Connexions directes Europe, Maghreb & Golfe",budgetNote:"Dès 80€"}],
  },
  casablanca:{
    attractions:[
      {name:"Mosquée Hassan II",type:"monument",budget:{serré:"Gratuit (ext.)",moyen:"120 MAD",riche:"120 MAD"},duration:"1h30",coords:[33.6082,-7.6326]},
      {name:"Quartier des Habous",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h30",coords:[33.5906,-7.5996]},
      {name:"La Corniche",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:[33.5992,-7.6658]},
    ],
    restaurants:[
      {name:"Rick's Café",type:"Cuisine internationale",budget:{serré:null,moyen:"200-400 MAD",riche:"400-700 MAD"},coords:[33.6058,-7.6349]},
      {name:"La Sqala",type:"Cuisine marocaine",budget:{serré:"80-150 MAD",moyen:"150-250 MAD",riche:"250+ MAD"},coords:[33.6045,-7.6187]},
    ],
    hotels:{serré:{name:"Hotel Guynemer",price:"250-450 MAD/nuit",stars:2},moyen:{name:"Kenzi Tower Hotel",price:"900-1500 MAD/nuit",stars:4},riche:{name:"Sofitel Casablanca",price:"2500-6000 MAD/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Connexions directes Europe & Moyen-Orient",budgetNote:"Dès 50€"}],
  },
  abudhabi:{
    attractions:[
      {name:"Mosquée Sheikh Zayed",type:"monument",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[24.4128,54.4752]},
      {name:"Louvre Abu Dhabi",type:"musée",budget:{serré:"63 AED",moyen:"63 AED",riche:"Privé 300 AED"},duration:"3h",coords:[24.5337,54.3988]},
      {name:"Yas Island (Ferrari World)",type:"loisir",budget:{serré:"295 AED",moyen:"295 AED",riche:"VIP 595 AED"},duration:"Journée",coords:[24.4834,54.6025]},
    ],
    restaurants:[
      {name:"Zuma Abu Dhabi",type:"Japonais contemporain",budget:{serré:null,moyen:null,riche:"300-600 AED"},coords:[24.4884,54.3249]},
      {name:"Shake Shack Yas",type:"Burgers",budget:{serré:"30-60 AED",moyen:"40-80 AED",riche:null},coords:[24.4830,54.6030]},
    ],
    hotels:{serré:{name:"Centro Capital Centre",price:"250-400 AED/nuit",stars:3},moyen:{name:"Yas Hotel",price:"600-1000 AED/nuit",stars:4},riche:{name:"Emirates Palace",price:"3000-15000 AED/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Etihad — hub Abu Dhabi",budgetNote:"Dès 200€ depuis Europe"}],
  },
  doha:{
    attractions:[
      {name:"Musée d'Art Islamique",type:"musée",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[25.2951,51.5363]},
      {name:"Souq Waqif",type:"marché",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"2h",coords:[25.2880,51.5337]},
      {name:"The Pearl-Qatar",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Yacht 1500 QAR"},duration:"2h",coords:[25.3700,51.5500]},
    ],
    restaurants:[
      {name:"Parisa Souq Waqif",type:"Cuisine iranienne",budget:{serré:null,moyen:"100-200 QAR",riche:"200-400 QAR"},coords:[25.2883,51.5340]},
      {name:"Nobu Doha",type:"Gastronomique japonais",budget:{serré:null,moyen:null,riche:"400-800 QAR"},coords:[25.3633,51.5267]},
    ],
    hotels:{serré:{name:"Centro Salwa",price:"200-350 QAR/nuit",stars:3},moyen:{name:"Marriott Marquis Doha",price:"600-1000 QAR/nuit",stars:4},riche:{name:"St. Regis Doha",price:"2000-8000 QAR/nuit",stars:5}},
    transport:[{mode:"✈️ Avion",info:"Qatar Airways — hub mondial Hamad",budgetNote:"Dès 200€"}],
  },
  kyoto:{
    attractions:[
      {name:"Fushimi Inari",type:"temple",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide privé 5000¥"},duration:"2h",coords:[34.9671,135.7727]},
      {name:"Arashiyama (bambouseraie)",type:"nature",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Rickshaw 4000¥"},duration:"2h",coords:[35.0094,135.6717]},
      {name:"Kinkaku-ji (Pavillon d'Or)",type:"temple",budget:{serré:"500¥",moyen:"500¥",riche:"500¥"},duration:"1h30",coords:[35.0394,135.7292]},
      {name:"Gion (quartier des geishas)",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Expérience geisha 15000¥"},duration:"2h",coords:[35.0037,135.7752]},
    ],
    restaurants:[
      {name:"Nishiki Market",type:"Street food japonais",budget:{serré:"500-2000¥",moyen:"1000-3000¥",riche:null},coords:[35.0053,135.7651]},
      {name:"Kikunoi",type:"Kaiseki traditionnel",budget:{serré:null,moyen:null,riche:"20000-40000¥"},coords:[35.0058,135.7865]},
    ],
    hotels:{serré:{name:"Guesthouse Soi",price:"3000-6000¥/nuit",stars:1},moyen:{name:"Kyoto Brighton Hotel",price:"15000-25000¥/nuit",stars:4},riche:{name:"Aman Kyoto",price:"100000-250000¥/nuit",stars:5}},
    transport:[{mode:"✈️ Avion + Shinkansen",info:"Vol vers Osaka, puis Shinkansen",budgetNote:"Pass JR 50000¥"}],
  },
};

// Generic fallback for cities without rich data
function genericData(dest) {
  const mc = dest.mapCenter || [48.8566,2.3522];
  const c = dest.currency;
  return {
    attractions:[
      {name:"Centre historique & monuments",type:"quartier",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Guide privé"},duration:"2h30",coords:mc},
      {name:"Musée national",type:"musée",budget:{serré:"10-15 "+c,moyen:"15-20 "+c,riche:"VIP 80 "+c},duration:"2h",coords:mc},
      {name:"Marché local",type:"marché",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Tour gastronomique"},duration:"1h30",coords:mc},
      {name:"Parc & jardins",type:"parc",budget:{serré:"Gratuit",moyen:"Gratuit",riche:"Gratuit"},duration:"1h",coords:mc},
    ],
    restaurants:[
      {name:"Restaurant local populaire",type:"Cuisine locale",budget:{serré:"15-25 "+c,moyen:"25-50 "+c,riche:"60-120 "+c},coords:mc},
      {name:"Street food & marchés",type:"Street food",budget:{serré:"5-10 "+c,moyen:"8-15 "+c,riche:null},coords:mc},
      {name:"Restaurant gastronomique",type:"Haute cuisine",budget:{serré:null,moyen:null,riche:"150-300 "+c},coords:mc},
    ],
    hotels:{
      serré:[{name:"Auberge de jeunesse",price:"20-60 "+c+"/nuit",stars:1,type:"Hostel"},{name:"Hôtel économique",price:"30-80 "+c+"/nuit",stars:2,type:"Hôtel éco"}],
      moyen:[{name:"Hôtel 3-4 étoiles",price:"80-200 "+c+"/nuit",stars:3,type:"Hôtel 3★"},{name:"Hôtel confort",price:"100-220 "+c+"/nuit",stars:4,type:"Hôtel 4★"}],
      riche:[{name:"Hôtel de luxe 5 étoiles",price:"300-1500 "+c+"/nuit",stars:5,type:"Palace"},{name:"Resort premium",price:"400-2000 "+c+"/nuit",stars:5,type:"Resort 5★"}],
    },
    transport:[{mode:"✈️ Avion",info:"Vol depuis votre ville de départ vers "+dest.name,budgetNote:"Prix variable selon compagnie"}],
  };
}

const EXTRA_HOTELS = {
  paris:{
    serré:[{name:"Generator Paris",price:"45-80€/nuit",stars:2,type:"Hostel"},{name:"ibis Paris Gare du Nord",price:"65-105€/nuit",stars:2,type:"Hôtel éco"},{name:"MIJE Marais",price:"35-55€/nuit",stars:2,type:"Auberge"}],
    moyen:[{name:"Mercure Paris Centre",price:"120-180€/nuit",stars:3,type:"Hôtel 3★"},{name:"Hotel du Louvre",price:"150-220€/nuit",stars:4,type:"Hôtel 4★"},{name:"Hôtel Grands Boulevards",price:"130-200€/nuit",stars:3,type:"Boutique"}],
    riche:[{name:"Hôtel de Crillon",price:"900-2500€/nuit",stars:5,type:"Palace"},{name:"Le Bristol Paris",price:"1200-3500€/nuit",stars:5,type:"Palace"},{name:"The Peninsula Paris",price:"1000-3000€/nuit",stars:5,type:"Palace"}],
  },
  tokyo:{
    serré:[{name:"Capsule Hotel Shinjuku",price:"3000-5000¥/nuit",stars:1,type:"Capsule"},{name:"Khaosan Tokyo",price:"2500-4000¥/nuit",stars:2,type:"Hostel"},{name:"Nui Hostel",price:"3500-5500¥/nuit",stars:2,type:"Hostel"}],
    moyen:[{name:"Dormy Inn Akihabara",price:"9000-15000¥/nuit",stars:3,type:"Hôtel 3★"},{name:"APA Hotel Shinjuku",price:"10000-18000¥/nuit",stars:3,type:"Hôtel 3★"},{name:"Citadines Shinjuku",price:"12000-20000¥/nuit",stars:3,type:"Appart-hôtel"}],
    riche:[{name:"The Peninsula Tokyo",price:"60000-120000¥/nuit",stars:5,type:"Palace"},{name:"Park Hyatt Tokyo",price:"55000-100000¥/nuit",stars:5,type:"Hôtel 5★"},{name:"Aman Tokyo",price:"80000-200000¥/nuit",stars:5,type:"Resort"}],
  },
  dubai:{
    serré:[{name:"ibis Dubai Al Barsha",price:"180-260 AED/nuit",stars:2,type:"Hôtel éco"},{name:"Rove Downtown",price:"200-300 AED/nuit",stars:3,type:"Lifestyle hotel"},{name:"Dubai Youth Hostel",price:"90-150 AED/nuit",stars:1,type:"Hostel"}],
    moyen:[{name:"Marriott Al Jaddaf",price:"400-600 AED/nuit",stars:4,type:"Hôtel 4★"},{name:"Wyndham Dubai Marina",price:"350-550 AED/nuit",stars:4,type:"Hôtel 4★"},{name:"Millennium Airport Hotel",price:"380-580 AED/nuit",stars:4,type:"Hôtel 4★"}],
    riche:[{name:"Burj Al Arab",price:"5000-30000 AED/nuit",stars:5,type:"7★ Iconique"},{name:"Atlantis The Palm",price:"3000-15000 AED/nuit",stars:5,type:"Resort 5★"},{name:"One&Only Royal Mirage",price:"2500-8000 AED/nuit",stars:5,type:"Palace"}],
  },
  marrakech:{
    serré:[{name:"Riad Dar Zitoun",price:"250-400 MAD/nuit",stars:2,type:"Riad"},{name:"Equity Point Hostel",price:"80-150 MAD/nuit",stars:1,type:"Hostel"},{name:"Dar Assiya",price:"200-350 MAD/nuit",stars:2,type:"Riad éco"}],
    moyen:[{name:"Riad Yasmine",price:"600-900 MAD/nuit",stars:3,type:"Riad 3★"},{name:"Riad Les Orangers",price:"700-1000 MAD/nuit",stars:3,type:"Riad"},{name:"Hotel Ivoire Marrakech",price:"650-950 MAD/nuit",stars:4,type:"Hôtel 4★"}],
    riche:[{name:"La Mamounia",price:"4500-15000 MAD/nuit",stars:5,type:"Palace légendaire"},{name:"Royal Mansour",price:"6000-20000 MAD/nuit",stars:5,type:"Palace Royal"},{name:"Amanjena",price:"5000-18000 MAD/nuit",stars:5,type:"Resort Aman"}],
  },
  london:{
    serré:[{name:"Generator London",price:"25-60£/nuit",stars:2,type:"Hostel"},{name:"YHA London Oxford Street",price:"20-50£/nuit",stars:1,type:"Auberge"},{name:"Clink261 Hostel",price:"22-55£/nuit",stars:2,type:"Hostel"}],
    moyen:[{name:"Marriott County Hall",price:"200-400£/nuit",stars:4,type:"Hôtel 4★"},{name:"Premier Inn Waterloo",price:"130-220£/nuit",stars:3,type:"Hôtel 3★"},{name:"Hotel Indigo London",price:"180-320£/nuit",stars:4,type:"Boutique"}],
    riche:[{name:"The Ritz London",price:"800-3000£/nuit",stars:5,type:"Palace"},{name:"Claridge's",price:"700-2500£/nuit",stars:5,type:"Palace"},{name:"The Savoy",price:"600-2200£/nuit",stars:5,type:"Palace"}],
  },
  rome:{
    serré:[{name:"Hotel Panda",price:"60-90€/nuit",stars:2,type:"Hôtel éco"},{name:"The Yellow Hostel",price:"20-45€/nuit",stars:2,type:"Hostel"},{name:"Campo de' Fiori Hostel",price:"25-50€/nuit",stars:1,type:"Hostel"}],
    moyen:[{name:"Mercure Roma",price:"130-200€/nuit",stars:4,type:"Hôtel 4★"},{name:"Hotel Nazionale",price:"140-210€/nuit",stars:4,type:"Hôtel 4★"},{name:"NH Collection Giustiniano",price:"120-190€/nuit",stars:4,type:"Hôtel 4★"}],
    riche:[{name:"Hotel de Russie",price:"700-2000€/nuit",stars:5,type:"Hôtel 5★"},{name:"Hotel Eden",price:"600-1800€/nuit",stars:5,type:"Hôtel 5★"},{name:"Grand Hotel Via Veneto",price:"500-1500€/nuit",stars:5,type:"Hôtel 5★"}],
  },
  newyork:{
    serré:[{name:"HI NYC Hostel",price:"50-90$/nuit",stars:1,type:"Auberge"},{name:"The Local NYC",price:"60-100$/nuit",stars:2,type:"Hostel"},{name:"Pod 51",price:"80-130$/nuit",stars:2,type:"Micro-hôtel"}],
    moyen:[{name:"The Pod Hotel",price:"150-250$/nuit",stars:3,type:"Hôtel 3★"},{name:"Marriott Times Square",price:"200-380$/nuit",stars:4,type:"Hôtel 4★"},{name:"Citizenm New York",price:"180-320$/nuit",stars:3,type:"Boutique"}],
    riche:[{name:"The Plaza Hotel",price:"800-3000$/nuit",stars:5,type:"Palace"},{name:"The St. Regis New York",price:"900-3500$/nuit",stars:5,type:"Palace"},{name:"Mandarin Oriental NYC",price:"700-2500$/nuit",stars:5,type:"Palace"}],
  },
};

function getDestData(dest) {
  const raw = CITY_DATA[dest.id] || genericData(dest);
  const extraH = EXTRA_HOTELS[dest.id];
  const hotels = {};
  for (const tier of ["serré","moyen","riche"]) {
    const h = raw.hotels[tier];
    hotels[tier] = extraH ? extraH[tier] : (Array.isArray(h) ? h : [h]);
  }
  return { ...raw, hotels };
}

// ── MAP COMPONENT ──
function MapView({ destination, budget }) {
  const mapRef = useRef(null), mapInst = useRef(null);
  const [ready, setReady] = useState(false);
  const data = destination ? getDestData(destination) : null;

  useEffect(() => {
    if (!destination) return;
    if (window.L) { setReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, [destination]);

  useEffect(() => {
    if (!ready || !mapRef.current || !data || !window.L) return;
    if (mapInst.current) { mapInst.current.remove(); }
    const mc = destination.mapCenter || [48.8566, 2.3522];
    const map = window.L.map(mapRef.current).setView(mc, 13);
    mapInst.current = map;
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
    const mkIcon = (bg, em) => window.L.divIcon({ html: `<div style="background:${bg};color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${em}</div>`, className: "", iconSize: [32,32], iconAnchor: [16,16] });
    const h0 = data.hotels[budget]?.[0];
    window.L.marker(mc, { icon: mkIcon("#1E3A5F","🏨") }).addTo(map).bindPopup(`<strong>🏨 ${h0?.name}</strong><br>${h0?.price}`);
    data.attractions.forEach(a => {
      window.L.marker(a.coords, { icon: mkIcon("#EF4444","📍") }).addTo(map).bindPopup(`<strong>${a.name}</strong><br>⏱ ${a.duration}<br>💰 ${a.budget[budget]}`);
    });
    data.restaurants.filter(r => r.budget[budget]).forEach(r => {
      window.L.marker(r.coords, { icon: mkIcon("#F97316","🍽") }).addTo(map).bindPopup(`<strong>${r.name}</strong><br>${r.type}<br>💰 ${r.budget[budget]}`);
    });
  }, [ready, destination, budget, data]);

  if (!destination || !data) return null;
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", height: 420, position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div style={{ position:"absolute", top:12, left:12, zIndex:1000, background:"rgba(15,23,42,0.9)", borderRadius:10, padding:"8px 12px", fontSize:12, color:"white", backdropFilter:"blur(8px)" }}>
        <div style={{ fontWeight:700, marginBottom:4, fontSize:13 }}>Légende</div>
        {[["📍","Attraction"],["🍽","Restaurant"],["🏨","Hôtel"]].map(([e,l]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}><span>{e}</span><span style={{ opacity:.8 }}>{l}</span></div>
        ))}
      </div>
    </div>
  );
}

// ── ITINERARY GENERATOR ──
function generateItinerary(destination, budget, startDate, endDate, adults, children) {
  const data = getDestData(destination);
  const start = new Date(startDate), end = new Date(endDate);
  const days = Math.max(1, Math.round((end - start) / 86400000));
  const attractions = [...data.attractions];
  const restaurants = data.restaurants.filter(r => r.budget[budget]);
  const dayNames = ["Dim.","Lun.","Mar.","Mer.","Jeu.","Ven.","Sam."];
  const months = ["jan.","fév.","mar.","avr.","mai","juin","juil.","aoû.","sep.","oct.","nov.","déc."];
  return Array.from({ length: days }, (_, d) => {
    const date = new Date(start); date.setDate(start.getDate() + d);
    const dateLabel = `${dayNames[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
    const ai = (d * 2) % attractions.length;
    const ri = d % Math.max(restaurants.length, 1);
    const morning = d === 0
      ? [{ time:"10h00", activity:`🛬 Arrivée & check-in — ${data.hotels[budget]?.[0]?.name}`, note:"Installation, première exploration" }]
      : [{ time:"09h00", activity:"☀️ Petit-déjeuner", note:`Pour ${adults} adulte${adults>1?"s":""}${children>0?` + ${children} enfant${children>1?"s":""}`:""}`}];
    const afternoon = [];
    if (attractions[ai]) afternoon.push({ time:"14h00", activity:`📍 ${attractions[ai].name}`, note:`${attractions[ai].duration} · ${attractions[ai].budget[budget]}` });
    if (attractions[(ai+1)%attractions.length]) afternoon.push({ time:"17h00", activity:`📍 ${attractions[(ai+1)%attractions.length].name}`, note:`${attractions[(ai+1)%attractions.length].duration} · ${attractions[(ai+1)%attractions.length].budget[budget]}` });
    const evening = restaurants[ri] ? [{ time:"19h30", activity:`🍽 Dîner — ${restaurants[ri].name}`, note:`${restaurants[ri].type} · ${restaurants[ri].budget[budget]}` }] : [];
    if (d === days - 1) evening.push({ time:"Matin", activity:"🛫 Check-out & départ", note:"Bon retour !" });
    const toItems = arr => arr.map(item => ({
      time: item.time,
      icon: item.activity.match(/^\S+/)?.[0] || "📌",
      activity: item.activity.replace(/^\S+\s/, ""),
      desc: item.note,
    }));
    return { day: d+1, date: dateLabel, items: [...toItems(morning), ...toItems(afternoon), ...toItems(evening)] };
  });
}

// ── PDF EXPORT via print window ──
async function exportToPDF({ destination, origin, budget, startDate, endDate, adults, children, itinerary }) {
  const data = getDestData(destination);
  const nights = Math.max(0, Math.round((new Date(endDate)-new Date(startDate))/86400000));
  const bColor = { serré:"#2DD4BF", moyen:"#F59E0B", riche:"#8B5CF6" }[budget];
  const fmtDate = ds => { const d=new Date(ds); const m=["jan","fév","mar","avr","mai","juin","juil","août","sep","oct","nov","déc"]; return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`; };
  const hotelList = data.hotels[budget] || [];
  const hotel = hotelList[0];

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>VoyagePro - ${destination.name}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:Arial,sans-serif;color:#1e293b;background:white;font-size:12px;}
  @media print{
    @page{margin:15mm 12mm;size:A4;}
    .noprint{display:none!important;}
    .pagebreak{page-break-before:always;}
  }
  .cover{background:linear-gradient(160deg,#080f2a,#0f2952);color:white;padding:60px 40px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;}
  .cover h1{font-size:52px;margin-bottom:10px;}
  .cover h2{font-size:22px;color:#7dd3fc;margin-bottom:8px;font-weight:400;}
  .cover .dest{font-size:36px;font-weight:700;margin:20px 0 6px;color:white;}
  .pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:24px 0;}
  .pill{background:rgba(14,165,233,.2);border:1px solid rgba(14,165,233,.4);border-radius:20px;padding:8px 18px;color:#7dd3fc;font-size:12px;}
  .pill strong{display:block;color:white;font-size:14px;}
  .hotel-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:16px 22px;margin-top:20px;max-width:460px;text-align:left;}
  .hotel-box .label{font-size:10px;color:#7dd3fc;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
  .hotel-box .name{font-size:18px;font-weight:700;margin-bottom:4px;}
  .hotel-box .stars{color:#f59e0b;font-size:16px;margin-right:8px;}
  .hotel-box .price{color:#94a3b8;font-size:13px;}
  .page{padding:24px 30px;}
  .header{background:#0a1e3d;color:#7dd3fc;padding:8px 16px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;font-size:11px;}
  .header strong{font-size:13px;color:white;}
  h3{font-size:18px;color:#0f2952;margin-bottom:14px;border-bottom:2px solid #0ea5e9;padding-bottom:6px;}
  .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 16px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-start;}
  .card-left .name{font-weight:700;font-size:13px;margin-bottom:3px;color:#0f172a;}
  .card-left .sub{font-size:11px;color:#64748b;}
  .card-right{text-align:right;flex-shrink:0;margin-left:12px;}
  .price-tag{background:${bColor}20;color:${bColor};border:1px solid ${bColor}40;border-radius:6px;padding:4px 10px;font-weight:700;font-size:12px;white-space:nowrap;}
  .unavail{color:#ef4444;font-size:11px;font-style:italic;}
  .day-header{background:#0f2952;color:white;border-radius:8px;padding:10px 14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;}
  .day-header .day-num{font-size:16px;font-weight:700;color:#7dd3fc;}
  .day-header .day-date{font-size:12px;color:#94a3b8;}
  .timeline{padding:0 4px;}
  .timeline-item{display:flex;gap:12px;margin-bottom:8px;align-items:flex-start;}
  .timeline-time{font-size:11px;font-weight:700;color:#0ea5e9;min-width:44px;padding-top:1px;}
  .timeline-content .act{font-size:12px;font-weight:600;color:#0f172a;}
  .timeline-content .note{font-size:10px;color:#64748b;margin-top:2px;}
  .transport-card{background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:12px 16px;margin-bottom:10px;}
  .transport-card .mode{font-size:14px;font-weight:700;color:#0f2952;margin-bottom:4px;}
  .transport-card .info{font-size:11px;color:#475569;margin-bottom:6px;}
  .tips{background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:14px 16px;margin-top:14px;}
  .tips h4{color:#92400e;margin-bottom:10px;font-size:13px;}
  .tip-item{font-size:11px;color:#78350f;margin-bottom:5px;}
  .footer{text-align:center;color:#94a3b8;font-size:10px;margin-top:20px;padding-top:10px;border-top:1px solid #e2e8f0;}
  .print-btn{position:fixed;bottom:24px;right:24px;background:#0ea5e9;color:white;border:none;padding:14px 28px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(14,165,233,.4);z-index:999;}
  .print-btn:hover{background:#0284c7;}
</style></head><body>

<button class="noprint print-btn" onclick="window.print()">📥 Enregistrer en PDF</button>

<!-- COVER -->
<div class="cover">
  <div style="font-size:11px;letter-spacing:3px;color:#7dd3fc;text-transform:uppercase;margin-bottom:8px;">✈ VoyagePro — Planificateur de voyage</div>
  <div class="dest">${destination.emoji} ${destination.name}</div>
  <div style="font-size:16px;color:#7dd3fc;margin-bottom:4px;">${destination.flag} ${destination.country}</div>
  <div class="pills">
    <div class="pill"><span>Départ</span><strong>${origin}</strong></div>
    <div class="pill"><span>Séjour</span><strong>${nights} nuit${nights>1?"s":""}</strong></div>
    <div class="pill"><span>Budget</span><strong>${BUDGET_LABELS[budget].icon} ${BUDGET_LABELS[budget].label}</strong></div>
    <div class="pill"><span>Voyageurs</span><strong>${adults} adulte${adults>1?"s":""}${children>0?` + ${children} enfant${children>1?"s":""}`:""}</strong></div>
    <div class="pill"><span>Dates</span><strong>${fmtDate(startDate)} → ${fmtDate(endDate)}</strong></div>
  </div>
  ${hotel ? `<div class="hotel-box">
    <div class="label">🏨 Hébergements ${BUDGET_LABELS[budget].label}</div>
    ${hotelList.map((h,i)=>`<div style="margin-bottom:${i<hotelList.length-1?'10px':'0'};padding-bottom:${i<hotelList.length-1?'10px':'0'};border-bottom:${i<hotelList.length-1?'1px solid rgba(255,255,255,.1)':'none'}">
      <div class="name">${h.name} <span style="font-size:12px;color:#7dd3fc;font-weight:400">${h.type||''}</span></div>
      <span class="stars">${"★".repeat(h.stars)}</span><span class="price">${h.price}</span>
    </div>`).join('')}
  </div>` : ""}
  <div style="margin-top:30px;font-size:11px;color:#475569;">Généré le ${new Date().toLocaleDateString("fr-FR")} par VoyagePro</div>
</div>

<!-- ATTRACTIONS -->
<div class="page pagebreak">
  <div class="header"><strong>🗺 Attractions — ${destination.name}</strong><span>${BUDGET_LABELS[budget].icon} ${BUDGET_LABELS[budget].label} · ${startDate} → ${endDate}</span></div>
  <h3>🗺 Attractions à visiter</h3>
  ${data.attractions.map(a => `
  <div class="card">
    <div class="card-left">
      <div class="name">${a.name}</div>
      <div class="sub">${a.type} · ⏱ ${a.duration}</div>
    </div>
    <div class="card-right"><span class="price-tag">${a.budget[budget] || "—"}</span></div>
  </div>`).join("")}

  <h3 style="margin-top:22px;">🍽 Restaurants &amp; Cafés</h3>
  ${data.restaurants.map(r => {
    const price = r.budget[budget];
    return `<div class="card">
      <div class="card-left">
        <div class="name">${r.name}</div>
        <div class="sub">${r.type}</div>
      </div>
      <div class="card-right">${price ? `<span class="price-tag">${price}</span>` : `<span class="unavail">Non disponible pour ce budget</span>`}</div>
    </div>`;
  }).join("")}
</div>

<!-- HEBERGEMENTS -->
<div class="page pagebreak">
  <div class="header"><strong>🏨 Hébergements — ${destination.name}</strong><span>${BUDGET_LABELS[budget].icon} ${BUDGET_LABELS[budget].label}</span></div>
  <h3>🏨 Options d'hébergement par budget</h3>
  ${["serré","moyen","riche"].map(tier=>{
    const list = data.hotels[tier];
    return `<div style="margin-bottom:18px;">
      <div style="background:${tier==="serré"?"#0a2a2a":tier==="moyen"?"#2a1a00":"#1a0a2a"};color:${tier==="serré"?"#2DD4BF":tier==="moyen"?"#F59E0B":"#8B5CF6"};padding:8px 14px;border-radius:8px;font-weight:700;font-size:13px;margin-bottom:10px;">${BUDGET_LABELS[tier].icon} ${BUDGET_LABELS[tier].label}</div>
      ${list.map(h=>`<div class="card" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div class="card-left">
          <div class="name">${h.name} <span style="color:#64748b;font-weight:400;font-size:11px">${h.type||""}</span></div>
          <div class="sub">${"★".repeat(h.stars)}${"☆".repeat(Math.max(0,5-h.stars))}</div>
        </div>
        <div class="card-right"><span class="price-tag">${h.price}</span></div>
      </div>`).join("")}
    </div>`;
  }).join("")}
</div>

<!-- ITINERAIRE -->
<div class="page pagebreak">
  <div class="header"><strong>📅 Itinéraire — ${destination.name}</strong><span>${nights} nuits · ${adults} adulte${adults>1?"s":""}</span></div>
  <h3>📅 Programme jour par jour</h3>
  ${itinerary.map(day => `
  <div style="margin-bottom:18px;">
    <div class="day-header">
      <span class="day-num">Jour ${day.day}</span>
      <span class="day-date">${day.date}</span>
    </div>
    <div class="timeline">
      ${day.items.map(item => `
      <div class="timeline-item">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-content">
          <div class="act">${item.icon} ${item.activity}</div>
          ${item.desc ? `<div class="note">${item.desc}</div>` : ""}
        </div>
      </div>`).join("")}
    </div>
  </div>`).join("")}
</div>

<!-- TRANSPORT -->
<div class="page pagebreak">
  <div class="header"><strong>✈ Transport &amp; Conseils — ${destination.name}</strong><span>${BUDGET_LABELS[budget].icon} ${BUDGET_LABELS[budget].label}</span></div>
  <h3>✈ Transport</h3>
  ${data.transport.map(t => `
  <div class="transport-card">
    <div class="mode">${t.mode}</div>
    <div class="info">${t.info}</div>
    <span class="price-tag">${t.budgetNote}</span>
  </div>`).join("")}

  <div class="tips">
    <h4>💡 Conseils pratiques pour ${destination.name}</h4>
    <div class="tip-item">💱 Monnaie locale : <strong>${destination.currency}</strong></div>
    <div class="tip-item">🌡 Température moyenne : <strong>${destination.temp}</strong></div>
    <div class="tip-item">📱 Téléchargez les cartes hors ligne (Google Maps) avant de partir</div>
    <div class="tip-item">📸 Gardez des copies numériques de vos documents importants</div>
    <div class="tip-item">🛡 Souscrivez une assurance voyage couvrant les soins et le rapatriement</div>
    <div class="tip-item">🗣 Apprenez quelques mots de la langue locale — toujours apprécié !</div>
  </div>
  <div class="footer">VoyagePro · ${destination.name} ${destination.flag} · Généré le ${new Date().toLocaleDateString("fr-FR")}</div>
</div>

</body></html>`;

  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) { alert("Veuillez autoriser les popups pour télécharger le PDF."); return; }
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 800);
}

// ── MAIN APP ──
function CitySelect({ value, onChange, options, placeholder, TH }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const filtered = q ? options.filter(o => o.toLowerCase().includes(q.toLowerCase())) : options;
  return (
    <div ref={ref} style={{ position:"relative", maxWidth:340 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width:"100%", padding:"11px 14px", background:TH.inputBg, border:`1px solid ${open?"#8B5CF6":TH.inputBorder}`, borderRadius:10, color:value ? TH.text : TH.text3, fontSize:14, fontFamily:"'DM Sans',sans-serif", textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"border-color .2s" }}>
        <span>{value || placeholder}</span>
        <span style={{ fontSize:10, opacity:.6, transform:open?"rotate(180deg)":"none", transition:"transform .2s" }}>▼</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 4px)", left:0, right:0, background:TH.bg||"#0D0A28", border:`1px solid #8B5CF6`, borderRadius:12, zIndex:999, boxShadow:"0 20px 60px rgba(0,0,0,.5)", overflow:"hidden" }}>
          <div style={{ padding:"8px 8px 4px" }}>
            <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher..." style={{ width:"100%", padding:"8px 12px", background:"rgba(139,92,246,.12)", border:"1px solid rgba(139,92,246,.2)", borderRadius:8, color:TH.text, fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none" }} />
          </div>
          <div style={{ maxHeight:240, overflowY:"auto", padding:"4px 4px 8px" }}>
            {filtered.map(o => (
              <div key={o} onClick={() => { onChange(o); setOpen(false); setQ(""); }} style={{ padding:"9px 14px", borderRadius:8, cursor:"pointer", fontSize:13, color:value===o?"#C4B5FD":TH.text, background:value===o?"rgba(139,92,246,.2)":"transparent", fontWeight:value===o?600:400, transition:"background .12s" }}
                onMouseEnter={e => { if(value!==o) e.currentTarget.style.background="rgba(139,92,246,.1)"; }}
                onMouseLeave={e => { if(value!==o) e.currentTarget.style.background="transparent"; }}>
                {o}
              </div>
            ))}
            {filtered.length === 0 && <div style={{ padding:"12px 14px", fontSize:13, color:TH.text3, textAlign:"center" }}>Aucun résultat</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function AdBanner({ slot = "1234567890", format = "auto" }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  }, []);
  return (
    <div style={{ margin:"16px 0", textAlign:"center", minHeight:90, background:"rgba(0,0,0,.04)", borderRadius:10, overflow:"hidden" }}>
      <ins className="adsbygoogle"
        style={{ display:"block" }}
        data-ad-client="ca-pub-4784252483646348"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true" />
    </div>
  );
}

function PrivacyModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0F1A2E", border:"1px solid #1E3A5F", borderRadius:18, padding:"32px 28px", maxWidth:560, width:"100%", maxHeight:"80vh", overflowY:"auto", color:"#CBD5E1" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#F1F5F9" }}>🔒 Politique de confidentialité</h2>
          <button onClick={onClose} style={{ background:"transparent", border:"none", color:"#C4B5FD", fontSize:22, cursor:"pointer", lineHeight:1 }}>×</button>
        </div>
        <p style={{ fontSize:12, color:"#64748B", marginBottom:20 }}>Dernière mise à jour : 7 juin 2026</p>
        {[
          ["Collecte de données", "VoyagePro ne collecte aucune donnée personnelle. L'application fonctionne entièrement dans votre navigateur. Aucun compte ni inscription n'est requis."],
          ["Cookies publicitaires", "Ce site utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour personnaliser les annonces selon vos centres d'intérêt. Vous pouvez gérer vos préférences sur g.co/adsettings."],
          ["Services tiers", "Nous utilisons des liens vers Booking.com, Airbnb, GetYourGuide, Skyscanner et d'autres services de voyage. Ces sites ont leurs propres politiques de confidentialité."],
          ["Données de navigation", "Google Analytics n'est pas utilisé. Aucune donnée de session n'est transmise à des serveurs."],
          ["Vos droits", "Vous pouvez désactiver les cookies publicitaires dans les paramètres de votre navigateur. Pour toute question : mouad.ouhaddou@gmail.com"],
        ].map(([title, text]) => (
          <div key={title} style={{ marginBottom:18 }}>
            <div style={{ fontWeight:700, fontSize:14, color:"#C4B5FD", marginBottom:6 }}>{title}</div>
            <p style={{ fontSize:13, lineHeight:1.7 }}>{text}</p>
          </div>
        ))}
        <button onClick={onClose} style={{ marginTop:10, width:"100%", padding:"11px 0", borderRadius:10, background:"linear-gradient(135deg,#6D28D9,#8B5CF6)", color:"white", border:"none", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>J'ai compris</button>
      </div>
    </div>
  );
}

const DEST_GUIDES = [
  { id:"paris", flag:"🇫🇷", name:"Paris", title:"Paris, la Ville Lumière",
    text:"Capitale mondiale de l'art de vivre, Paris séduit par ses musées d'exception comme le Louvre et le musée d'Orsay, ses avenues haussmanniennes et la silhouette intemporelle de la tour Eiffel. Flânez le long de la Seine, explorez Montmartre et ses ruelles d'artistes, puis savourez la gastronomie française dans un bistrot du Marais. La meilleure période s'étend d'avril à juin et de septembre à octobre, lorsque la ville révèle toute sa douceur." },
  { id:"tokyo", flag:"🇯🇵", name:"Tokyo", title:"Tokyo, entre tradition et futur",
    text:"Mégapole fascinante où temples millénaires côtoient gratte-ciel ultramodernes, Tokyo ne dort jamais. Perdez-vous dans l'effervescence de Shibuya, recueillez-vous au sanctuaire Meiji, dégustez les meilleurs sushis du marché de Toyosu et plongez dans la culture pop d'Akihabara. Au printemps, les cerisiers en fleurs transforment la ville en tableau poétique. Un voyage à Tokyo est une immersion sensorielle inoubliable." },
  { id:"marrakech", flag:"🇲🇦", name:"Marrakech", title:"Marrakech, la perle du Sud",
    text:"Ville impériale aux mille couleurs, Marrakech enchante par sa médina classée à l'UNESCO, la place Jemaa el-Fna animée jour et nuit, et ses jardins luxuriants comme le jardin Majorelle. Perdez-vous dans les souks parfumés d'épices, séjournez dans un riad traditionnel et offrez-vous une escapade dans le désert ou l'Atlas. Le printemps et l'automne offrent un climat idéal pour découvrir la ville ocre." },
  { id:"dubai", flag:"🇦🇪", name:"Dubaï", title:"Dubaï, le luxe à l'état pur",
    text:"Symbole de démesure et d'innovation, Dubaï impressionne avec Burj Khalifa, la plus haute tour du monde, ses îles artificielles et ses centres commerciaux gigantesques. Entre safari dans les dunes dorées, plages paradisiaques et restaurants étoilés, la ville mêle modernité futuriste et traditions bédouines. La saison idéale court de novembre à mars, loin des chaleurs estivales extrêmes." },
  { id:"bali", flag:"🇮🇩", name:"Bali", title:"Bali, l'île des dieux",
    text:"Véritable paradis tropical, Bali conjugue rizières en terrasses, temples sacrés et plages de rêve. Méditez à Ubud au cœur de la jungle, surfez sur les vagues de Canggu, admirez les couchers de soleil sur le temple de Tanah Lot et ressourcez-vous dans un spa balinais. Île de spiritualité et de douceur de vivre, Bali se visite idéalement entre avril et octobre, durant la saison sèche." },
  { id:"newyork", flag:"🇺🇸", name:"New York", title:"New York, la ville qui ne dort jamais",
    text:"Capitale culturelle et financière, New York est une énergie à elle seule. Contemplez la skyline depuis l'Empire State Building, promenez-vous dans Central Park, traversez le pont de Brooklyn et laissez-vous happer par l'effervescence de Times Square. Entre comédies musicales à Broadway, musées de renommée mondiale et quartiers cosmopolites, la Grosse Pomme se découvre toute l'année, avec une magie particulière à l'automne et pendant les fêtes." },
];

const FAQ_ITEMS = [
  ["VoyagesPro est-il vraiment gratuit ?", "Oui, VoyagesPro est 100 % gratuit et le restera. Vous pouvez planifier autant de voyages que vous le souhaitez, consulter les itinéraires et exporter votre programme en PDF sans aucun frais ni abonnement."],
  ["Dois-je créer un compte pour utiliser le site ?", "Non, aucune inscription n'est requise. VoyagesPro fonctionne directement dans votre navigateur : choisissez votre destination, vos dates et votre budget, et obtenez instantanément votre programme personnalisé."],
  ["Comment VoyagesPro crée-t-il mon itinéraire ?", "Notre outil génère un programme jour par jour adapté à votre destination, à la durée de votre séjour et à votre budget. Chaque journée comprend des attractions incontournables, des suggestions de restaurants et des recommandations d'hébergements."],
  ["Combien de destinations sont disponibles ?", "VoyagesPro propose 50 destinations parmi les plus prisées au monde, réparties sur tous les continents : Europe, Asie, Afrique, Amériques et Océanie, de Paris à Tokyo en passant par Marrakech, Dubaï et Bali."],
  ["Puis-je exporter mon programme de voyage ?", "Absolument. Une fois votre itinéraire généré, vous pouvez l'exporter en PDF en un clic pour le consulter hors ligne, l'imprimer ou le partager avec vos compagnons de voyage."],
  ["VoyagesPro réserve-t-il les hôtels et les vols ?", "VoyagesPro est un outil de planification : il vous oriente vers les meilleures attractions, restaurants et hôtels, et vous propose des liens vers des partenaires de confiance pour effectuer vos réservations en toute sérénité."],
  ["Sur quels appareils puis-je utiliser VoyagesPro ?", "VoyagesPro est accessible depuis n'importe quel appareil disposant d'un navigateur web : ordinateur, tablette ou smartphone. L'interface s'adapte automatiquement à votre écran."],
  ["Les informations sont-elles à jour ?", "Nous sélectionnons des lieux et attractions reconnus et durables. Nous vous recommandons toutefois de vérifier les horaires et conditions d'accès directement auprès des établissements avant votre départ."],
];

function LegalModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0F1A2E", border:"1px solid #1E3A5F", borderRadius:18, padding:"32px 28px", maxWidth:600, width:"100%", maxHeight:"82vh", overflowY:"auto", color:"#CBD5E1" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#F1F5F9" }}>📋 Mentions légales & CGU</h2>
          <button onClick={onClose} style={{ background:"transparent", border:"none", color:"#D4A574", fontSize:22, cursor:"pointer", lineHeight:1 }}>×</button>
        </div>
        <p style={{ fontSize:12, color:"#64748B", marginBottom:20 }}>Dernière mise à jour : 7 juin 2026</p>
        {[
          ["Éditeur du site", "Le site VoyagesPro (voyagespro.fr) est édité par un éditeur indépendant. Contact : mouad.ouhaddou@gmail.com"],
          ["Hébergement", "Le site est hébergé par GitHub Pages (GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis)."],
          ["Objet du service", "VoyagesPro est un outil gratuit de planification de voyage. Il génère des suggestions d'itinéraires, d'attractions, de restaurants et d'hébergements à titre informatif. VoyagesPro n'est pas une agence de voyage et ne procède à aucune réservation."],
          ["Propriété intellectuelle", "Les contenus, textes et éléments graphiques du site sont protégés. Les photographies des destinations proviennent de sources libres (Wikimedia Commons, Unsplash) et restent la propriété de leurs auteurs respectifs."],
          ["Responsabilité", "Les informations fournies (horaires, tarifs, disponibilités) sont données à titre indicatif et peuvent évoluer. VoyagesPro ne saurait être tenu responsable d'éventuelles inexactitudes. Vérifiez toujours les informations auprès des établissements avant votre voyage."],
          ["Liens partenaires", "Le site peut contenir des liens vers des services tiers (réservation d'hôtels, vols, activités). VoyagesPro n'est pas responsable du contenu ni des pratiques de ces sites externes."],
          ["Publicité", "Ce site affiche des publicités via Google AdSense afin de financer son fonctionnement gratuit. Consultez notre politique de confidentialité pour en savoir plus sur la gestion des cookies."],
          ["Droit applicable", "Les présentes conditions sont régies par le droit français. Pour toute question, contactez-nous à mouad.ouhaddou@gmail.com."],
        ].map(([title, text]) => (
          <div key={title} style={{ marginBottom:18 }}>
            <div style={{ fontWeight:700, fontSize:14, color:"#D4A574", marginBottom:6 }}>{title}</div>
            <p style={{ fontSize:13, lineHeight:1.7 }}>{text}</p>
          </div>
        ))}
        <button onClick={onClose} style={{ marginTop:10, width:"100%", padding:"11px 0", borderRadius:10, background:"linear-gradient(135deg,#D4A574,#C49160)", color:"white", border:"none", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>J'ai compris</button>
      </div>
    </div>
  );
}

export default function TravelPlanner() {
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState(null);
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("fr");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState("attractions");
  const [itinerary, setItinerary] = useState([]);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("tous");
  const [hoveredId, setHoveredId] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroImgs, setHeroImgs] = useState(()=>{
    // Initialise from localStorage cache so images are instant on repeat visits
    const cache = _imgCache;
    const out = {};
    DESTINATIONS.forEach(d=>{ if(cache[`${d.id}_600`]) out[d.id] = cache[`${d.id}_600`]; });
    return out;
  });
  const [extraImgs, setExtraImgs] = useState({});
  const [foodTypeImgs, setFoodTypeImgs] = useState(()=>{
    const out = {};
    Object.keys(_imgCache).forEach(k=>{ if(k.startsWith("food_")) { const t=k.replace(/^food_/,"").replace(/_\d+$/,""); if(_imgCache[k]) out[t]=_imgCache[k]; } });
    return out;
  });
  const [showTravelers, setShowTravelers] = useState(false);
  const destRef = useRef(null);
  const aboutRef = useRef(null);
  const guidesRef = useRef(null);
  const faqRef = useRef(null);
  const heroDests = ['santorini','bali','kyoto','paris'].map(id=>DESTINATIONS.find(d=>d.id===id)).filter(Boolean);
  useEffect(()=>{
    if(step!==1) return;
    const t = setInterval(()=>setHeroIdx(i=>(i+1)%heroDests.length), 5500);
    return ()=>clearInterval(t);
  },[step]);
  // Fetch Wikipedia images for all destinations (cached in localStorage after first visit)
  useEffect(()=>{
    DESTINATIONS.forEach((d,i)=>{
      if(heroImgs[d.id]) return; // already have it (from cache or earlier fetch)
      setTimeout(()=>{
        fetchWikiImage(d.id, d.name, 600).then(src=>{
          if(src) setHeroImgs(p=>({...p,[d.id]:src}));
        });
      }, i * 80); // stagger to avoid simultaneous requests
    });
  // eslint-disable-next-line
  },[]);

  // Fetch food photos via Wikipedia API when step 3 is reached (cached in localStorage)
  useEffect(()=>{
    if (step !== 3 || !destination) return;
    const d = getDestData(destination);
    if (!d?.restaurants) return;
    const seen = new Set();
    d.restaurants.forEach((r, i) => {
      const title = getFoodWikiTitle(r.type);
      if (seen.has(title) || foodTypeImgs[title]) return;
      seen.add(title);
      setTimeout(()=>{
        fetchWikiImage(`food_${title}`, title.replace(/_/g,' '), 400)
          .then(src => { if (src) setFoodTypeImgs(p => ({...p, [title]: src})); });
      }, i * 250);
    });
  // eslint-disable-next-line
  },[step, destination]);

  const T = LANG[lang];
  const TH = THEMES[theme];
  const ST = STEP1[theme];
  const isRTL = lang === "ar";
  const isLight = theme === "light";

  // Theme tokens for steps 2 & 3
  const S2 = {
    sectBg:   isLight ? "rgba(255,255,255,.92)"              : "rgba(15,27,45,.65)",
    sectBg3:  isLight ? "rgba(255,255,255,.85)"              : "rgba(15,27,45,.45)",
    sectBdr:  isLight ? "rgba(109,40,217,.15)"               : "rgba(255,255,255,.07)",
    bodyText: isLight ? "#1A0B35"                            : "#F8FAFC",
    muted:    isLight ? "#4B5563"                            : "#94A3B8",
    muted70:  isLight ? "rgba(75,85,99,.75)"                 : "rgba(148,163,184,.7)",
    cardBg:   isLight ? "rgba(109,40,217,.04)"               : "rgba(255,255,255,.04)",
    cardBdr:  isLight ? "rgba(109,40,217,.12)"               : "rgba(255,255,255,.07)",
    btnBg:    isLight ? "rgba(109,40,217,.07)"               : "rgba(255,255,255,.05)",
    btnBg2:   isLight ? "rgba(109,40,217,.05)"               : "rgba(255,255,255,.06)",
    btnBdr:   isLight ? "rgba(109,40,217,.14)"               : "rgba(255,255,255,.12)",
    tabBg:    isLight ? "rgba(109,40,217,.04)"               : "rgba(255,255,255,.04)",
    tabBdr:   isLight ? "rgba(109,40,217,.12)"               : "rgba(255,255,255,.1)",
    sep:      isLight ? "rgba(109,40,217,.15)"               : "rgba(255,255,255,.2)",
    dimText:  isLight ? "rgba(91,33,182,.38)"                : "rgba(148,163,184,.5)",
    sumBg:    isLight
      ? "linear-gradient(135deg,rgba(255,255,255,.96),rgba(245,240,255,.96))"
      : "linear-gradient(135deg,rgba(15,27,45,.9),rgba(9,18,32,.9))",
    borderL:  isLight ? "3px solid rgba(109,40,217,.3)"      : "3px solid #8B5CF6",
  };

  const nights = startDate && endDate ? Math.max(0, Math.round((new Date(endDate)-new Date(startDate))/86400000)) : 0;
  const data = destination ? getDestData(destination) : null;
  const filtered = DESTINATIONS.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q);
    const matchContinent = continent === "tous" || d.continent === continent;
    return matchSearch && matchContinent;
  });

  const handlePlan = () => {
    setItinerary(generateItinerary(destination, budget, startDate, endDate, adults, children));
    setStep(3); setActiveTab("attractions");
  };

  const handlePDF = async () => {
    setPdfLoading(true);
    try { await exportToPDF({ destination, origin, budget, startDate, endDate, adults, children, itinerary }); }
    catch(e) { console.error(e); alert("Erreur PDF. Vérifiez votre connexion."); }
    setPdfLoading(false);
  };

  const reset = () => { setStep(1); setOrigin(""); setDestination(null); setBudget(""); setStartDate(""); setEndDate(""); setAdults(2); setChildren(0); setSearch(""); setContinent("tous"); };


  const inputText = isLight ? "#1A1208" : "#F8FAFC";
  const inputBg = isLight ? "rgba(26,18,8,.04)" : "rgba(255,255,255,.06)";
  const inputBorder = isLight ? "rgba(26,18,8,.16)" : "rgba(255,255,255,.1)";
  const inputPlaceholder = isLight ? "rgba(26,18,8,.42)" : "rgba(248,250,252,.38)";
  const dateIcon = isLight ? "opacity(.6)" : "invert(1) opacity(.4)";
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${isLight ? "#FAF6F0" : "#07111F"};font-family:'Inter','DM Sans',sans-serif;color:${inputText};}
    ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-thumb{background:rgba(212,165,116,.25);border-radius:3px;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
    @keyframes heroFade{from{opacity:0}to{opacity:1}}
    .fade-in{animation:fadeIn .7s ease forwards;}
    .bp{background:linear-gradient(135deg,#6D28D9,#8B5CF6);color:white;border:none;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .25s;font-family:'Inter',sans-serif;letter-spacing:.3px;}
    .bp:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(139,92,246,.4);}
    .bp:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none;}
    .bpdf{background:linear-gradient(135deg,#D4A574,#C49160);color:white;border:none;padding:11px 22px;border-radius:11px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:8px;}
    .bpdf:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(212,165,116,.4);}
    .bpdf:disabled{opacity:.5;cursor:not-allowed;transform:none;}
    .sp{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;display:inline-block;animation:spin 0.8s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg)}}
    input{background:${inputBg};border:1px solid ${inputBorder};border-radius:12px;color:${inputText};padding:12px 14px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s;width:100%;color-scheme:${isLight ? "light" : "dark"};}
    input:focus{border-color:#D4A574;}
    input::placeholder{color:${inputPlaceholder};}
    input[type=date]{color:${inputText};}
    input[type=date]::-webkit-datetime-edit{color:${inputText};}
    input[type=date]::-webkit-datetime-edit-text,input[type=date]::-webkit-datetime-edit-month-field,input[type=date]::-webkit-datetime-edit-day-field,input[type=date]::-webkit-datetime-edit-year-field{color:${inputText};}
    input[type=date]::-webkit-calendar-picker-indicator{filter:${dateIcon};cursor:pointer;}
    ::-webkit-scrollbar-track{background:transparent;}
  `;

  return (
    <>
      <style>{css}</style>
      {showPrivacy && <PrivacyModal onClose={()=>setShowPrivacy(false)} />}
      {showLegal && <LegalModal onClose={()=>setShowLegal(false)} />}

      {/* Floating sticky CTA when origin + destination selected */}
      {step===1 && origin && destination && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:300, background:"rgba(7,17,31,.96)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(212,165,116,.2)", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 -8px 40px rgba(0,0,0,.5)", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:28 }}>{destination.emoji}</span>
            <div>
              <div style={{ fontSize:11, color:"#94A3B8", marginBottom:2 }}>{origin} → {destination.name}</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#F8FAFC" }}>{destination.name} {destination.flag} · {destination.country}</div>
            </div>
          </div>
          <button onClick={()=>setStep(2)} style={{ background:"linear-gradient(135deg,#D4A574,#C49160)", color:"white", border:"none", padding:"13px 32px", borderRadius:14, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif", boxShadow:"0 6px 24px rgba(212,165,116,.4)", transition:"all .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
            Continuer →
          </button>
        </div>
      )}

      <div dir={isRTL?"rtl":"ltr"} style={{ background:"#07111F", color:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter','DM Sans',sans-serif" }}>

        {/* ════════ FIXED HEADER ════════ */}
        <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, transition:"background .4s,border .4s", background:step===1?"rgba(7,17,31,0)":"rgba(7,17,31,.96)", backdropFilter:step===1?"none":"blur(20px)", borderBottom:step===1?"none":"1px solid rgba(255,255,255,.07)", padding:"0 32px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={step>1?reset:undefined}>
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
              <defs>
                <linearGradient id="hl1" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E9D5FF"/><stop offset="100%" stopColor="#8B5CF6"/>
                </linearGradient>
                <linearGradient id="hl2" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FCD34D"/><stop offset="100%" stopColor="#D4A574"/>
                </linearGradient>
              </defs>
              <circle cx="22" cy="22" r="19" stroke="url(#hl1)" strokeWidth="2" fill="none"/>
              <ellipse cx="22" cy="22" rx="10" ry="19" stroke="url(#hl1)" strokeWidth="1.5" fill="none"/>
              <line x1="3" y1="22" x2="41" y2="22" stroke="url(#hl1)" strokeWidth="1.5"/>
              <line x1="3" y1="15" x2="41" y2="15" stroke="url(#hl1)" strokeWidth="1" opacity="0.5"/>
              <line x1="3" y1="29" x2="41" y2="29" stroke="url(#hl1)" strokeWidth="1" opacity="0.5"/>
              <path d="M30 12l-12 9 2 1-3 6 5-2 2 4 1-6 5-1z" fill="url(#hl2)"/>
            </svg>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, background:"linear-gradient(135deg,#E9D5FF,#C4B5FD)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-0.5px" }}>VoyagesPro</div>
              <div style={{ fontSize:9, color:"rgba(148,163,184,.55)", letterSpacing:"2.5px", textTransform:"uppercase" }}>50 destinations · Export PDF</div>
            </div>
          </div>

          {/* Nav links — step 1 only */}
          {step===1 && (
            <nav style={{ display:"flex", gap:28 }}>
              {["Destinations","Hôtels","Itinéraires","À propos"].map(link=>(
                <span key={link} style={{ fontSize:13, color:"rgba(248,250,252,.65)", cursor:"pointer", fontWeight:500 }}
                  onMouseEnter={e=>e.target.style.color="#F8FAFC"} onMouseLeave={e=>e.target.style.color="rgba(248,250,252,.65)"}>{link}</span>
              ))}
            </nav>
          )}

          {/* Controls */}
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {step>=2 && (
              <button onClick={step===3?reset:()=>setStep(1)} style={{ background:"transparent", border:"1px solid rgba(255,255,255,.1)", color:"#94A3B8", padding:"7px 16px", borderRadius:9, fontSize:12, cursor:"pointer", fontFamily:"'Inter',sans-serif", marginRight:4 }}>
                ← {step===3?"Accueil":"Retour"}
              </button>
            )}
            {["fr","en","ar"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{ padding:"5px 9px", borderRadius:7, border:`1px solid ${lang===l?"#D4A574":"rgba(255,255,255,.1)"}`, background:lang===l?"rgba(212,165,116,.1)":"transparent", color:lang===l?"#D4A574":"rgba(148,163,184,.7)", fontSize:10, fontWeight:lang===l?700:500, cursor:"pointer", fontFamily:"'Inter',sans-serif", textTransform:"uppercase", letterSpacing:"1px" }}>{l}</button>
            ))}
            <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{ padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.04)", color:"#94A3B8", fontSize:15, cursor:"pointer" }}>
              {theme==="dark"?"☀️":"🌙"}
            </button>
          </div>
        </header>

        {/* ════════════════════════════════════ */}
        {/* STEP 1 — LANDING PAGE               */}
        {/* ════════════════════════════════════ */}
        {step===1 && (
          <>
            {/* ── HERO ── */}
            <section style={{ position:"relative", height:"100vh", minHeight:600, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {heroDests.map((d,i)=>(
                <div key={d.id} style={{ position:"absolute", inset:0, backgroundColor:"#0A1426", backgroundImage:`url(${heroImgs[d.id]||d.photo})`, backgroundSize:"cover", backgroundPosition:"center", opacity:heroIdx===i?1:0, transform:heroIdx===i?"scale(1.06)":"scale(1)", transition:"opacity 1.8s ease, transform 7s ease", zIndex:0 }}/>
              ))}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(5,10,20,.18) 0%,rgba(5,10,20,.55) 50%,rgba(7,17,31,.97) 100%)", zIndex:1 }}/>
              <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:800, padding:"0 28px", marginTop:68, direction:isRTL?"rtl":"ltr" }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(212,165,116,.1)", border:"1px solid rgba(212,165,116,.22)", borderRadius:30, padding:"7px 20px", fontSize:11, color:"#D4A574", fontWeight:600, letterSpacing:"1.8px", textTransform:"uppercase", marginBottom:30 }}>
                  ✦ {T.hero_badge}
                </div>
                <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(44px,7.5vw,82px)", fontWeight:900, lineHeight:1.05, marginBottom:22, color:"#F8FAFC" }}>
                  {T.hero_h1[0]}<br/>{T.hero_h1[1]} <span style={{ background:"linear-gradient(135deg,#D4A574,#F0C896)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{T.hero_h1[2]}</span>
                </h1>
                <p style={{ fontSize:"clamp(15px,2vw,18px)", color:ST.heroMuted, lineHeight:1.7, marginBottom:38, maxWidth:560, margin:"0 auto 38px" }}>
                  {T.hero_desc}
                </p>
                <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                  <button onClick={()=>destRef.current?.scrollIntoView({behavior:"smooth",block:"start"})} style={{ background:"linear-gradient(135deg,#D4A574,#B8834A)", color:"white", border:"none", padding:"15px 34px", borderRadius:14, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif", boxShadow:"0 8px 30px rgba(212,165,116,.35)", transition:"all .25s" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                    {T.hero_cta1}
                  </button>
                  <button onClick={()=>destRef.current?.scrollIntoView({behavior:"smooth",block:"start"})} style={{ background:"rgba(255,255,255,.07)", color:"#F8FAFC", border:"1px solid rgba(255,255,255,.16)", padding:"15px 28px", borderRadius:14, fontSize:15, fontWeight:500, cursor:"pointer", fontFamily:"'Inter',sans-serif", backdropFilter:"blur(8px)", transition:"all .25s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.13)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.07)"}>
                    {T.hero_cta2}
                  </button>
                </div>
              </div>
              {/* Image dots */}
              <div style={{ position:"absolute", bottom:30, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:2 }}>
                {heroDests.map((_,i)=>(
                  <div key={i} onClick={()=>setHeroIdx(i)} style={{ width:heroIdx===i?28:8, height:8, borderRadius:4, background:heroIdx===i?"#D4A574":"rgba(255,255,255,.3)", cursor:"pointer", transition:"all .35s" }}/>
                ))}
              </div>
            </section>

            {/* ── GLASSMORPHISM SEARCH BAR ── */}
            <div style={{ position:"relative", zIndex:50, padding:"0 28px", marginTop:-50 }}>
              <div style={{ maxWidth:1120, margin:"0 auto", background:ST.searchBg, backdropFilter:"blur(28px)", border:`1px solid ${ST.searchBorder}`, borderRadius:24, padding:"20px 24px", boxShadow:"0 24px 72px rgba(0,0,0,.55)" }}>
                <div style={{ display:"flex", gap:0, alignItems:"stretch", flexWrap:"wrap", direction:isRTL?"rtl":"ltr" }}>
                  {/* Départ */}
                  <div style={{ flex:"1.4 1 170px", borderRight:`1px solid ${ST.searchDivider}`, paddingRight:18, marginRight:18 }}>
                    <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:6 }}>{T.lbl_depart}</div>
                    <CitySelect value={origin} onChange={setOrigin} options={ORIGINS} placeholder={T.depart+"…"} TH={{ inputBg:"transparent", inputBorder:"transparent", text:ST.searchText, text3:"rgba(128,100,64,.5)", bg:theme==="light"?"#FFF8F0":"#0A1426" }} />
                  </div>
                  {/* Destination */}
                  <div style={{ flex:"1.4 1 170px", borderRight:`1px solid ${ST.searchDivider}`, paddingRight:18, marginRight:18 }}>
                    <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:6 }}>{T.lbl_dest}</div>
                    <CitySelect value={destination?.name||""} onChange={name=>setDestination(DESTINATIONS.find(d=>d.name===name)||null)} options={DESTINATIONS.map(d=>d.name)} placeholder={T.dest_ph} TH={{ inputBg:"transparent", inputBorder:"transparent", text:ST.searchText, text3:"rgba(128,100,64,.5)", bg:theme==="light"?"#FFF8F0":"#0A1426" }} />
                  </div>
                  {/* Dates */}
                  <div style={{ flex:"1.2 1 160px", borderRight:`1px solid ${ST.searchDivider}`, paddingRight:16, marginRight:16 }}>
                    <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:6 }}>{T.lbl_dates}</div>
                    <div style={{ display:"flex", gap:6 }}>
                      <input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={e=>setStartDate(e.target.value)} style={{ padding:"7px 8px", fontSize:12, borderRadius:9 }}/>
                      <input type="date" value={endDate} min={startDate||new Date().toISOString().split("T")[0]} onChange={e=>setEndDate(e.target.value)} style={{ padding:"7px 8px", fontSize:12, borderRadius:9 }}/>
                    </div>
                  </div>
                  {/* Voyageurs */}
                  <div style={{ position:"relative", flex:"1 1 130px", borderRight:`1px solid ${ST.searchDivider}`, paddingRight:16, marginRight:16 }}>
                    <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:6 }}>{T.lbl_travelers}</div>
                    <button onClick={()=>setShowTravelers(s=>!s)} style={{ background:"transparent", border:"none", color:ST.searchText, fontSize:13, cursor:"pointer", padding:"6px 0", fontFamily:"'Inter',sans-serif", textAlign:"left", width:"100%" }}>
                      {T.travelers_fn(adults+children)} ▾
                    </button>
                    {showTravelers && (
                      <div style={{ position:"absolute", top:"calc(100% + 8px)", left:0, background:isLight?"#FFF8F0":"#0A1426", border:"1px solid rgba(212,165,116,.25)", borderRadius:14, padding:16, zIndex:80, width:220, boxShadow:"0 20px 60px rgba(0,0,0,.25)" }}>
                        {[[`👤 ${T.adults}`,adults,setAdults,1],[`👶 ${T.children}`,children,setChildren,0]].map(([lbl,val,set,min])=>(
                          <div key={lbl} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                            <span style={{ fontSize:13, color:ST.text }}>{lbl}</span>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <button onClick={()=>set(Math.max(min,val-1))} style={{ width:30, height:30, borderRadius:9, border:`1px solid ${ST.cardBorder}`, background:ST.cardBg, color:ST.text, cursor:"pointer", fontSize:16 }}>−</button>
                              <span style={{ fontSize:15, fontWeight:700, color:ST.text, minWidth:18, textAlign:"center" }}>{val}</span>
                              <button onClick={()=>set(val+1)} style={{ width:30, height:30, borderRadius:9, border:`1px solid ${ST.cardBorder}`, background:ST.cardBg, color:ST.text, cursor:"pointer", fontSize:16 }}>+</button>
                            </div>
                          </div>
                        ))}
                        <button onClick={()=>setShowTravelers(false)} style={{ width:"100%", marginTop:4, padding:"8px 0", borderRadius:9, background:"rgba(212,165,116,.15)", border:"1px solid rgba(212,165,116,.25)", color:"#D4A574", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>OK</button>
                      </div>
                    )}
                  </div>
                  {/* Budget */}
                  <div style={{ flex:"1 1 120px", paddingRight:14 }}>
                    <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:6 }}>{T.lbl_budget}</div>
                    <div style={{ display:"flex", gap:5 }}>
                      {Object.entries(BUDGET_LABELS).map(([key,val])=>(
                        <button key={key} onClick={()=>setBudget(budget===key?"":key)} title={val.label} style={{ flex:1, padding:"7px 0", borderRadius:9, border:`1px solid ${budget===key?val.color:"rgba(255,255,255,.12)"}`, background:budget===key?`${val.color}22`:"transparent", color:budget===key?val.color:"rgba(248,250,252,.5)", fontSize:15, cursor:"pointer" }}>{val.icon}</button>
                      ))}
                    </div>
                  </div>
                  {/* Rechercher */}
                  <div style={{ display:"flex", alignItems:"center", paddingTop:14 }}>
                    <button onClick={()=>{
                      if(origin && destination){ setStep(2); window.scrollTo({top:0,behavior:"smooth"}); }
                      else { destRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); }
                    }} style={{ background:"linear-gradient(135deg,#0EA5E9,#0284C7)", color:"white", border:"none", padding:"13px 24px", borderRadius:14, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif", whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(14,165,233,.3)", transition:"box-shadow .2s" }}
                      onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 28px rgba(14,165,233,.5)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(14,165,233,.3)"}>
                      {T.search_btn}
                    </button>
                  </div>
                </div>
                {origin && destination && (
                  <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${ST.searchDivider}`, fontSize:13, color:"#D4A574", display:"flex", alignItems:"center", gap:8 }}>
                    {T.search_confirm(origin, destination.name, destination.flag)}
                  </div>
                )}
              </div>
            </div>

            {/* ── FEATURED DESTINATIONS horizontal ── */}
            <section style={{ padding:"76px 0 48px", background:ST.bg }}>
              <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:34, direction:isRTL?"rtl":"ltr" }}>
                  <div>
                    <div style={{ fontSize:11, color:"#D4A574", textTransform:"uppercase", letterSpacing:"2px", fontWeight:600, marginBottom:10 }}>{T.featured_badge}</div>
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, color:ST.text, lineHeight:1.12 }}>{T.featured_title[0]}<br/>{T.featured_title[1]}</h2>
                  </div>
                  <button onClick={()=>destRef.current?.scrollIntoView({behavior:"smooth"})} style={{ background:"transparent", border:`1px solid ${ST.btnOutline}`, color:ST.btnOutlineText, padding:"10px 20px", borderRadius:12, fontSize:13, cursor:"pointer", fontFamily:"'Inter',sans-serif", whiteSpace:"nowrap", transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(212,165,116,.3)";e.currentTarget.style.color="#D4A574";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=ST.btnOutline;e.currentTarget.style.color=ST.btnOutlineText;}}>
                    {T.featured_see_all}
                  </button>
                </div>
                <div style={{ display:"flex", gap:16, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none", WebkitScrollSnapType:"x mandatory" }}>
                  {['paris','tokyo','bali','santorini','marrakech','kyoto'].map(id=>{
                    const d=DESTINATIONS.find(dest=>dest.id===id);
                    if(!d) return null;
                    const sel=destination?.id===id;
                    return (
                      <div key={id} onClick={()=>setDestination(sel?null:d)} style={{ flex:"0 0 195px", position:"relative", borderRadius:24, overflow:"hidden", cursor:"pointer", aspectRatio:"4/5", border:sel?"2px solid #D4A574":"2px solid transparent", boxShadow:sel?"0 0 0 1px rgba(212,165,116,.35),0 20px 56px rgba(0,0,0,.55)":"0 8px 32px rgba(0,0,0,.35)", transition:"all .35s", transform:sel?"translateY(-6px)":"none" }}
                        onMouseEnter={e=>{if(!sel){e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(0,0,0,.55)";}}}
                        onMouseLeave={e=>{if(!sel){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.35)";}}}
                      >
                        <img src={heroImgs[d.id]||d.photo} alt={d.name} data-id={d.id} onError={wikiError} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .55s" }}
                          onMouseEnter={e=>e.target.style.transform="scale(1.08)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.1) 55%,transparent 100%)" }}/>
                        {sel&&<div style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", background:"#D4A574", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"white", fontWeight:800 }}>✓</div>}
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 16px 16px" }}>
                          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:18, color:"#F8FAFC", marginBottom:4 }}>{d.name}</div>
                          <div style={{ fontSize:12, color:"rgba(255,255,255,.6)", marginBottom:8, display:"flex", alignItems:"center", gap:4 }}>📍 {d.country}</div>
                          <div style={{ fontSize:11, color:"#D4A574", fontWeight:600 }}>120+ {T.featured_hotels}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── FULL DESTINATION SEARCH GRID ── */}
            <section ref={destRef} style={{ padding:"0 32px 80px", maxWidth:1200, margin:"0 auto", background:ST.bg }}>
              <div style={{ background:ST.gridBg, border:`1px solid ${ST.gridBorder}`, borderRadius:28, padding:"32px 28px", backdropFilter:"blur(12px)", direction:isRTL?"rtl":"ltr" }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:ST.text, marginBottom:22 }}>{T.grid_title}</h3>
                <div style={{ marginBottom:18 }}>
                  <label style={{ display:"block", marginBottom:8, fontSize:11, fontWeight:600, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px" }}>🛫 {T.depart}</label>
                  <CitySelect value={origin} onChange={setOrigin} options={ORIGINS} placeholder={`— ${T.depart} —`} TH={TH} />
                </div>
                <div style={{ marginBottom:18 }}>
                  <label style={{ display:"block", marginBottom:8, fontSize:11, fontWeight:600, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px" }}>{T.grid_search_lbl}</label>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ position:"relative", flex:1, maxWidth:440 }}>
                      <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:14, opacity:.4 }}>🔍</span>
                      <input value={search} onChange={e=>{setSearch(e.target.value);setContinent("tous");}} placeholder={T.search_ph} style={{ paddingLeft:42 }}/>
                      {search&&<button onClick={()=>setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#94A3B8", cursor:"pointer", fontSize:20 }}>×</button>}
                    </div>
                    <span style={{ fontSize:12, color:"#94A3B8", whiteSpace:"nowrap" }}>{filtered.length} {T.results}{filtered.length!==1?"s":""}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                  {CONTINENTS.map(c=>(
                    <button key={c.id} onClick={()=>setContinent(c.id)} style={{ padding:"7px 16px", borderRadius:20, border:`1px solid ${continent===c.id?"#D4A574":ST.btnOutline}`, background:continent===c.id?ST.continentActive:ST.continentBg, color:continent===c.id?"#D4A574":ST.textMuted, fontSize:12, fontWeight:continent===c.id?700:500, cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"all .18s" }}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:12, maxHeight:520, overflowY:"auto", paddingRight:4 }}>
                  {filtered.map(dest=>{
                    const sel=destination?.id===dest.id;
                    return (
                      <div key={dest.id} onClick={()=>setDestination(sel?null:dest)} style={{ position:"relative", borderRadius:16, overflow:"hidden", cursor:"pointer", aspectRatio:"4/3", backgroundColor:CONTINENT_BG[dest.continent]||"#0D0A28", border:sel?"2px solid #D4A574":"2px solid transparent", boxShadow:sel?"0 0 0 1px rgba(212,165,116,.3)":"none", transition:"all .2s" }}
                        onMouseEnter={e=>{if(!sel){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(0,0,0,.45)";}}}
                        onMouseLeave={e=>{if(!sel){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}}>
                        <img src={heroImgs[dest.id]||dest.photo} alt={dest.name} data-id={dest.id} loading="lazy" onError={wikiError} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.88) 0%,transparent 60%)" }}/>
                        {sel&&<div style={{ position:"absolute", top:8, right:8, width:24, height:24, borderRadius:"50%", background:"#D4A574", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"white", zIndex:2 }}>✓</div>}
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"10px 10px 9px" }}>
                          <div style={{ fontWeight:700, fontSize:13, color:"white", lineHeight:1.2, marginBottom:2 }}>{dest.name} {dest.flag}</div>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,.6)" }}>{dest.country} · 🌡 {dest.temp}</div>
                        </div>
                      </div>
                    );
                  })}
                  {filtered.length===0&&(
                    <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"40px", color:"#94A3B8" }}>
                      <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
                      <div>{T.no_dest} « {search} »</div>
                    </div>
                  )}
                </div>
                {destination&&(
                  <div style={{ marginTop:18, padding:"12px 20px", borderRadius:14, background:"rgba(212,165,116,.08)", border:"1px solid rgba(212,165,116,.22)", fontSize:13, color:"#D4A574", display:"inline-flex", alignItems:"center", gap:10 }}>
                    {destination.emoji} <strong>{destination.name}</strong> {destination.flag} {T.selected}{!origin?` ${T.dest_no_origin}`:""}
                  </div>
                )}
              </div>
            </section>

            {/* ── PASSION THEMES ── */}
            <section style={{ background:ST.bg2, padding:"88px 32px" }}>
              <div style={{ maxWidth:1200, margin:"0 auto", direction:isRTL?"rtl":"ltr" }}>
                <div style={{ textAlign:"center", marginBottom:56 }}>
                  <div style={{ fontSize:11, color:"#D4A574", textTransform:"uppercase", letterSpacing:"2px", fontWeight:600, marginBottom:12 }}>{T.passion_badge}</div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,3.5vw,38px)", fontWeight:900, color:ST.text }}>{T.passion_title}</h2>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:16 }}>
                  {T.passion_items.map(t=>(
                    <div key={t.label} style={{ background:ST.passionBg, border:`1px solid ${ST.passionBorder}`, borderRadius:22, padding:"30px 20px", textAlign:"center", cursor:"pointer", transition:"all .28s" }}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(212,165,116,.1)";e.currentTarget.style.borderColor="rgba(212,165,116,.28)";e.currentTarget.style.transform="translateY(-5px)";}}
                      onMouseLeave={e=>{e.currentTarget.style.background=ST.passionBg;e.currentTarget.style.borderColor=ST.passionBorder;e.currentTarget.style.transform="none";}}>
                      <div style={{ fontSize:36, marginBottom:14 }}>{t.emoji}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:16, color:ST.text, marginBottom:7 }}>{t.label}</div>
                      <div style={{ fontSize:12, color:ST.textMuted, lineHeight:1.6 }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ padding:"88px 32px", background:ST.bg, maxWidth:"100%" }}>
              <div style={{ maxWidth:1200, margin:"0 auto", direction:isRTL?"rtl":"ltr" }}>
                <div style={{ textAlign:"center", marginBottom:52 }}>
                  <div style={{ fontSize:11, color:"#D4A574", textTransform:"uppercase", letterSpacing:"2px", fontWeight:600, marginBottom:12 }}>{T.features_badge}</div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,3.5vw,38px)", fontWeight:900, color:ST.text }}>{T.features_title}</h2>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:22 }}>
                  {T.features_items.map(f=>(
                    <div key={f.title} style={{ background:ST.cardBg, border:`1px solid ${ST.cardBorder}`, borderRadius:26, padding:"36px 32px", backdropFilter:"blur(8px)", transition:"all .3s", boxShadow:"0 8px 32px rgba(0,0,0,.12)" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(212,165,116,.25)";e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 24px 64px rgba(0,0,0,.2)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=ST.cardBorder;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.12)";}}>
                      <div style={{ width:54, height:54, borderRadius:18, background:"rgba(212,165,116,.1)", border:"1px solid rgba(212,165,116,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:22 }}>{f.icon}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:20, color:ST.text, marginBottom:12 }}>{f.title}</div>
                      <div style={{ fontSize:14, color:ST.textMuted, lineHeight:1.75 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section style={{ background:ST.bg2, padding:"88px 32px" }}>
              <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center", direction:isRTL?"rtl":"ltr" }}>
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginBottom:28 }}>
                  <div style={{ display:"flex" }}>
                    {["👩","👨","👩‍🦱"].map((a,i)=>(
                      <div key={i} style={{ width:42, height:42, borderRadius:"50%", background:`hsl(${220+i*30},60%,${30+i*5}%)`, border:`3px solid ${ST.bg2}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginLeft:i?-12:0, position:"relative", zIndex:3-i }}>{a}</div>
                    ))}
                  </div>
                  <div style={{ textAlign:isRTL?"right":"left" }}>
                    <div style={{ fontSize:24, fontWeight:800, color:"#D4A574" }}>{T.testimonial_rating}</div>
                    <div style={{ fontSize:12, color:ST.textMuted }}>{T.testimonial_count}</div>
                  </div>
                </div>
                <blockquote style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,2.5vw,23px)", fontStyle:"italic", color:ST.text, lineHeight:1.7, marginBottom:20 }}>
                  "{T.testimonial_quote.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}"
                </blockquote>
                <div style={{ fontSize:14, color:ST.textMuted }}>{T.testimonial_author}</div>
              </div>
            </section>

            {/* ── À PROPOS ── */}
            <section ref={aboutRef} style={{ background:ST.bg, padding:"88px 32px" }}>
              <div style={{ maxWidth:880, margin:"0 auto", textAlign:"center", direction:isRTL?"rtl":"ltr" }}>
                <div style={{ fontSize:13, fontWeight:700, letterSpacing:"2px", color:"#D4A574", textTransform:"uppercase", marginBottom:14 }}>{T.about_badge}</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:ST.text, marginBottom:24 }}>{T.about_title}</h2>
                <p style={{ fontSize:16, color:ST.textMuted, lineHeight:1.85, marginBottom:18 }}>{T.about_p1}</p>
                <p style={{ fontSize:16, color:ST.textMuted, lineHeight:1.85 }}>{T.about_p2}</p>
              </div>
            </section>

            {/* ── GUIDES DE DESTINATIONS ── */}
            <section ref={guidesRef} style={{ background:ST.bg2, padding:"88px 32px" }}>
              <div style={{ maxWidth:1100, margin:"0 auto", direction:isRTL?"rtl":"ltr" }}>
                <div style={{ textAlign:"center", marginBottom:54 }}>
                  <div style={{ fontSize:13, fontWeight:700, letterSpacing:"2px", color:"#D4A574", textTransform:"uppercase", marginBottom:14 }}>{T.guides_badge}</div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:ST.text, marginBottom:16 }}>{T.guides_title}</h2>
                  <p style={{ fontSize:16, color:ST.textMuted, lineHeight:1.8, maxWidth:640, margin:"0 auto" }}>{T.guides_desc}</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:24 }}>
                  {DEST_GUIDES.map((g,i) => (
                    <article key={g.id} style={{ background:ST.cardBg, border:`1px solid ${ST.cardBorder}`, borderRadius:18, overflow:"hidden", display:"flex", flexDirection:"column" }}>
                      <div style={{ height:160, backgroundColor:isLight?ST.cardBg:"#0A1426", overflow:"hidden" }}>
                        <img src={heroImgs[g.id]||DESTINATIONS.find(dd=>dd.id===g.id)?.photo} alt={g.name} data-id={g.id} onError={wikiError} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                      </div>
                      <div style={{ padding:"24px 22px" }}>
                        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:21, fontWeight:700, color:ST.text, marginBottom:12 }}>{g.flag} {T.guides_items[i].title}</h3>
                        <p style={{ fontSize:14, color:ST.textMuted, lineHeight:1.75, marginBottom:18 }}>{T.guides_items[i].text}</p>
                        <button onClick={()=>{ setDestination(DESTINATIONS.find(d=>d.id===g.id)||null); setStep(2); window.scrollTo({top:0,behavior:"smooth"}); }}
                          style={{ background:"transparent", border:"1px solid rgba(212,165,116,.35)", color:"#D4A574", padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"all .2s" }}
                          onMouseEnter={e=>{e.currentTarget.style.background="rgba(212,165,116,.1)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                          {T.guides_btn}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section ref={faqRef} style={{ background:ST.bg, padding:"88px 32px" }}>
              <div style={{ maxWidth:780, margin:"0 auto", direction:isRTL?"rtl":"ltr" }}>
                <div style={{ textAlign:"center", marginBottom:48 }}>
                  <div style={{ fontSize:13, fontWeight:700, letterSpacing:"2px", color:"#D4A574", textTransform:"uppercase", marginBottom:14 }}>{T.faq_badge}</div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:ST.text }}>{T.faq_title}</h2>
                </div>
                <div>
                  {T.faq_items.map(([q,a],i)=>(
                    <div key={i} style={{ borderBottom:`1px solid ${ST.cardBorder}` }}>
                      <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", background:"transparent", border:"none", padding:"22px 4px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", textAlign:isRTL?"right":"left", gap:16 }}>
                        <span style={{ fontSize:16, fontWeight:600, color:ST.text, fontFamily:"'Inter',sans-serif" }}>{q}</span>
                        <span style={{ fontSize:22, color:"#D4A574", flexShrink:0, transition:"transform .2s", transform:openFaq===i?"rotate(45deg)":"none" }}>+</span>
                      </button>
                      {openFaq===i && (
                        <p style={{ fontSize:15, color:ST.textMuted, lineHeight:1.8, padding:"0 4px 24px" }}>{a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section style={{ position:"relative", height:330, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute", inset:0, backgroundColor:"#0A1426", backgroundImage:`url(${heroImgs["bali"]||DESTINATIONS.find(d=>d.id==="bali")?.photo})`, backgroundSize:"cover", backgroundPosition:"center" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(7,17,31,.88),rgba(15,27,45,.75))" }}/>
              <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 24px" }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:"#F8FAFC", marginBottom:14 }}>{T.cta_title}</h2>
                <p style={{ fontSize:16, color:"rgba(248,250,252,.68)", marginBottom:30 }}>{T.cta_desc}</p>
                <button onClick={()=>destRef.current?.scrollIntoView({behavior:"smooth"})} style={{ background:"linear-gradient(135deg,#D4A574,#B8834A)", color:"white", border:"none", padding:"16px 40px", borderRadius:14, fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif", boxShadow:"0 8px 32px rgba(212,165,116,.4)", transition:"all .25s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                  {T.cta_btn}
                </button>
              </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background:ST.footerBg, borderTop:`1px solid ${ST.divider}`, padding:"68px 32px 32px", direction:isRTL?"rtl":"ltr" }}>
              <div style={{ maxWidth:1200, margin:"0 auto" }}>
                <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.2fr", gap:44, marginBottom:52 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                      <svg width="26" height="26" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="19" stroke="#C4B5FD" strokeWidth="2" fill="none"/><ellipse cx="22" cy="22" rx="10" ry="19" stroke="#C4B5FD" strokeWidth="1.5" fill="none"/><line x1="3" y1="22" x2="41" y2="22" stroke="#C4B5FD" strokeWidth="1.5"/><path d="M30 12l-12 9 2 1-3 6 5-2 2 4 1-6 5-1z" fill="#D4A574"/></svg>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:900, color:"#F8FAFC" }}>VoyagesPro</div>
                    </div>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,.55)", lineHeight:1.75, maxWidth:240, marginBottom:22 }}>{T.footer_tagline}</p>
                    <div style={{ display:"flex", gap:10 }}>
                      {["📷","📘","🐦"].map((ic,i)=>(
                        <div key={i} style={{ width:36, height:36, borderRadius:10, background:ST.socialBg, border:`1px solid ${ST.socialBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, cursor:"pointer", transition:"all .2s" }}
                          onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(212,165,116,.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor=ST.socialBorder}>{ic}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:"#F8FAFC", marginBottom:20, letterSpacing:".5px" }}>{T.footer_dest}</div>
                    {T.footer_continents.map(l=>(
                      <div key={l} style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:11, cursor:"pointer", transition:"color .15s" }} onMouseEnter={e=>e.target.style.color="#D4A574"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>{l}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:"#F8FAFC", marginBottom:20, letterSpacing:".5px" }}>{T.footer_info}</div>
                    {T.footer_links_labels.map((l,idx)=>{
                      const fns=[
                        ()=>aboutRef.current?.scrollIntoView({behavior:"smooth"}),
                        ()=>guidesRef.current?.scrollIntoView({behavior:"smooth"}),
                        ()=>faqRef.current?.scrollIntoView({behavior:"smooth"}),
                        ()=>{window.location.href="mailto:mouad.ouhaddou@gmail.com";},
                        ()=>setShowLegal(true),
                      ];
                      return <div key={l} onClick={fns[idx]} style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:11, cursor:"pointer", transition:"color .15s" }} onMouseEnter={e=>e.target.style.color="#D4A574"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>{l}</div>;
                    })}
                    <div style={{ fontSize:13, color:"rgba(255,255,255,.5)", cursor:"pointer", transition:"color .15s" }} onClick={()=>setShowPrivacy(true)} onMouseEnter={e=>e.target.style.color="#D4A574"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>{T.footer_privacy}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:"#F8FAFC", marginBottom:10, letterSpacing:".5px" }}>{T.footer_newsletter}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:16, lineHeight:1.65 }}>{T.footer_newsletter_desc}</div>
                    <div style={{ display:"flex" }}>
                      <input placeholder={T.footer_newsletter_ph} style={{ flex:1, borderRadius:"12px 0 0 12px", borderRight:"none", width:"auto" }}/>
                      <button style={{ background:"linear-gradient(135deg,#D4A574,#C49160)", color:"white", border:"none", padding:"12px 18px", borderRadius:"0 12px 12px 0", cursor:"pointer", fontSize:16 }}>{isRTL?"←":"→"}</button>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop:`1px solid ${ST.divider}`, paddingTop:26, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                  <div style={{ fontSize:12, color:ST.copyright }}>{T.footer_copyright}</div>
                  <AdBanner slot="2222222222" />
                </div>
              </div>
            </footer>
          </>
        )}

        {/* ════════════════════════════════════ */}
        {/* STEP 2 — CONFIGURE                  */}
        {/* ════════════════════════════════════ */}
        {step===2 && (
          <div style={{ paddingTop:88, minHeight:"100vh" }}>
            <div style={{ maxWidth:820, margin:"0 auto", padding:"40px 28px 80px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36, fontSize:13 }}>
                <span onClick={()=>setStep(1)} style={{ color:"#D4A574", cursor:"pointer", fontWeight:500 }}>{T.step_dest}</span>
                <span style={{ color:S2.sep }}>›</span>
                <span style={{ color:S2.bodyText, fontWeight:700 }}>{T.step_settings}</span>
                <span style={{ color:S2.sep }}>›</span>
                <span style={{ color:S2.dimText }}>{T.step_program}</span>
              </div>

              <div style={{ background:"rgba(212,165,116,.05)", border:"1px solid rgba(212,165,116,.16)", borderRadius:22, padding:"22px 26px", marginBottom:32, display:"flex", alignItems:"center", gap:18 }}>
                <span style={{ fontSize:40 }}>{destination?.emoji}</span>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:S2.bodyText, marginBottom:4 }}>{destination?.name} {destination?.flag}</div>
                  <div style={{ fontSize:13, color:S2.muted }}>{origin} → {destination?.name} · {destination?.country} · 🌡 {destination?.temp}</div>
                </div>
              </div>

              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, marginBottom:28, color:S2.bodyText }}>{T.configure}</h2>

              <div style={{ background:S2.sectBg, border:`1px solid ${S2.sectBdr}`, borderRadius:22, padding:"26px", marginBottom:16, backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:11, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:18 }}>{T.lbl_dates}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div><label style={{ display:"block", marginBottom:7, fontSize:12, color:S2.muted }}>{T.dep_date}</label><input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={e=>setStartDate(e.target.value)}/></div>
                  <div><label style={{ display:"block", marginBottom:7, fontSize:12, color:S2.muted }}>{T.ret_date}</label><input type="date" value={endDate} min={startDate||new Date().toISOString().split("T")[0]} onChange={e=>setEndDate(e.target.value)}/></div>
                </div>
                {nights>0&&<div style={{ marginTop:14, fontSize:13, color:"#D4A574", background:"rgba(212,165,116,.08)", borderRadius:10, padding:"8px 16px", display:"inline-block" }}>✨ <strong>{T.nights(nights)}</strong> à {destination?.name}</div>}
              </div>

              <div style={{ background:S2.sectBg, border:`1px solid ${S2.sectBdr}`, borderRadius:22, padding:"26px", marginBottom:16, backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:11, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:18 }}>{T.lbl_travelers}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                  {[[`👤 ${T.adults}`,adults,setAdults,1],[`👶 ${T.children}`,children,setChildren,0]].map(([lbl,val,set,min])=>(
                    <div key={lbl}>
                      <label style={{ display:"block", marginBottom:12, fontSize:12, color:S2.muted }}>{lbl}</label>
                      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <button onClick={()=>set(Math.max(min,val-1))} style={{ width:38, height:38, borderRadius:12, border:`1px solid ${S2.btnBdr}`, background:S2.btnBg, color:S2.bodyText, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}>−</button>
                        <span style={{ fontSize:20, fontWeight:700, color:S2.bodyText, minWidth:28, textAlign:"center" }}>{val}</span>
                        <button onClick={()=>set(val+1)} style={{ width:38, height:38, borderRadius:12, border:`1px solid ${S2.btnBdr}`, background:S2.btnBg, color:S2.bodyText, cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background:S2.sectBg, border:`1px solid ${S2.sectBdr}`, borderRadius:22, padding:"26px", marginBottom:32, backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:11, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1.5px", fontWeight:600, marginBottom:18 }}>💰 {T.budget_type}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                  {Object.entries(BUDGET_LABELS).map(([key,val])=>(
                    <div key={key} onClick={()=>setBudget(key)} style={{ cursor:"pointer", borderRadius:18, padding:"20px 14px", textAlign:"center", border:`2px solid ${budget===key?val.color:S2.cardBdr}`, background:budget===key?`rgba(${key==="serré"?"45,212,191":key==="moyen"?"245,158,11":"139,92,246"},.1)`:S2.cardBg, transition:"all .22s" }}>
                      <div style={{ fontSize:30, marginBottom:10 }}>{val.icon}</div>
                      <div style={{ fontWeight:700, fontSize:14, color:budget===key?val.color:S2.bodyText, marginBottom:5 }}>{val.label}</div>
                      <div style={{ fontSize:11, color:S2.muted, lineHeight:1.5 }}>{val.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bp" style={{ width:"100%", padding:"16px", fontSize:16, borderRadius:16, letterSpacing:".5px" }} disabled={!startDate||!endDate||!budget} onClick={handlePlan}>
                {T.generate} ✨
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════ */}
        {/* STEP 3 — RESULTS                    */}
        {/* ════════════════════════════════════ */}
        {step===3 && data && (
          <div style={{ paddingTop:88 }}>
            <div style={{ maxWidth:1140, margin:"0 auto", padding:"32px 28px 60px" }}>

              {/* Summary bar */}
              <div style={{ background:S2.sumBg, border:"1px solid rgba(212,165,116,.14)", borderRadius:22, padding:"18px 24px", marginBottom:20, backdropFilter:"blur(8px)", display:"flex", flexWrap:"wrap", gap:14, alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                  {[[T.journey,`${origin} → ${destination.name} ${destination.flag}`],[T.stay,T.nights(nights)],[T.travelers,`${adults} adulte${adults>1?"s":""}${children>0?` + ${children} enfant${children>1?"s":""}`:""}`],[T.budget_label,`${BUDGET_LABELS[budget].icon} ${BUDGET_LABELS[budget].label}`]].map(([k,v])=>(
                    <div key={k}><div style={{ fontSize:10, color:S2.muted, textTransform:"uppercase", letterSpacing:"1px", marginBottom:3 }}>{k}</div><div style={{ fontSize:14, fontWeight:700, color:k===T.budget_label?BUDGET_LABELS[budget].color:S2.bodyText }}>{v}</div></div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button className="bpdf" onClick={handlePDF} disabled={pdfLoading}>{pdfLoading?<span className="sp"/>:"📥"} {pdfLoading?T.generating:T.dl_pdf}</button>
                  <button onClick={()=>setStep(2)} style={{ background:S2.btnBg2, border:`1px solid ${S2.tabBdr}`, color:S2.muted, padding:"9px 16px", borderRadius:10, cursor:"pointer", fontSize:13, fontFamily:"'Inter',sans-serif" }}>{T.modify}</button>
                  <button onClick={reset} style={{ background:"linear-gradient(135deg,#D4A574,#C49160)", border:"none", color:"white", padding:"9px 18px", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Inter',sans-serif", display:"flex", alignItems:"center", gap:6 }}>🏠 {T.home_btn}</button>
                </div>
              </div>

              {/* Quick booking */}
              <div style={{ background:"rgba(14,165,233,.06)", border:"1px solid rgba(14,165,233,.14)", borderRadius:16, padding:"14px 20px", marginBottom:18 }}>
                <div style={{ fontSize:11, color:"#C4B5FD", textTransform:"uppercase", letterSpacing:"1px", fontWeight:600, marginBottom:11 }}>🔗 {T.book_section} — {destination.name}</div>
                <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
                  {[{label:"✈️ Google Flights",color:"#0EA5E9",url:BOOK.flights(origin,destination.name)},{label:"🔍 Skyscanner",color:"#00A3BE",url:BOOK.skyscanner(origin,destination.name)},{label:"💺 Kayak",color:"#FF690F",url:BOOK.kayak(origin,destination.name)},{label:"🏨 Booking.com",color:"#003580",url:BOOK.booking(destination.name)},{label:"🏠 Airbnb",color:"#FF5A5F",url:BOOK.airbnb(destination.name)}].map(({label,color,url})=>(
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:20, background:color, color:"white", fontSize:12, fontWeight:600, textDecoration:"none", transition:"opacity .15s" }}
                      onMouseEnter={e=>e.currentTarget.style.opacity=".82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{label}</a>
                  ))}
                </div>
              </div>

              <AdBanner slot="1111111111" />

              {/* Hotel banner */}
              <div style={{ background:"rgba(212,165,116,.05)", border:"1px solid rgba(212,165,116,.15)", borderRadius:18, padding:"16px 22px", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontSize:34 }}>🏨</span>
                  <div>
                    <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1px", marginBottom:3 }}>{T.recommended}</div>
                    <div style={{ fontSize:18, fontWeight:700, marginBottom:4, color:S2.bodyText }}>{data.hotels[budget]?.[0]?.name}</div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ color:"#F59E0B" }}>{"★".repeat(data.hotels[budget]?.[0]?.stars||0)}</span>
                      <span style={{ fontSize:12, color:S2.muted }}>· {data.hotels[budget]?.[0]?.price}</span>
                    </div>
                  </div>
                </div>
                <a href={BOOK.booking(destination.name,data.hotels[budget]?.[0]?.name)} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 22px", borderRadius:12, background:"#003580", color:"white", fontSize:13, fontWeight:700, textDecoration:"none" }}>🏨 Réserver sur Booking</a>
              </div>

              {/* Tabs */}
              <div style={{ display:"flex", gap:6, marginBottom:22, flexWrap:"wrap" }}>
                {T.tabs.map((label,i)=>{
                  const key=T.tab_keys[i];const active=activeTab===key;
                  return <button key={key} onClick={()=>setActiveTab(key)} style={{ padding:"10px 22px", borderRadius:12, border:`1px solid ${active?"transparent":S2.tabBdr}`, cursor:"pointer", fontSize:13, fontWeight:active?700:500, fontFamily:"'Inter',sans-serif", background:active?"linear-gradient(135deg,#6D28D9,#8B5CF6)":S2.tabBg, color:active?"white":S2.muted, transition:"all .2s" }}>{label}</button>;
                })}
              </div>

              {/* Tab content */}
              <div style={{ background:S2.sectBg3, border:`1px solid ${S2.sectBdr}`, borderRadius:22, padding:"28px" }}>

                {activeTab==="attractions" && (
                  <div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, marginBottom:18, color:S2.bodyText }}>Attractions à {destination.name}</h3>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:14 }}>
                      {data.attractions.map(a=>(
                        <div key={a.name} style={{ background:S2.cardBg, border:`1px solid ${S2.cardBdr}`, borderRadius:18, overflow:"hidden" }}>
                          <div style={{ height:150, overflow:"hidden", position:"relative" }}>
                            <img
                              src={heroImgs[destination.id] || destination.photo}
                              alt={destination.name}
                              style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.5) saturate(1.2)" }}
                              onError={e=>{ e.target.onerror=null; e.target.src=`https://picsum.photos/seed/${encodeURIComponent(a.name)}/600/400`; }}
                            />
                            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,.05),rgba(0,0,0,.55))", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"10px 14px" }}>
                              <div style={{ fontWeight:700, fontSize:14, color:"white", marginBottom:2 }}>{a.name}</div>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <span style={{ padding:"2px 8px", borderRadius:20, fontSize:9, fontWeight:600, background:"rgba(139,92,246,.75)", color:"white" }}>{a.type}</span>
                                <span style={{ fontSize:10, color:"rgba(255,255,255,.8)" }}>⏱ {a.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div style={{ padding:14 }}>
                            <div style={{ background:S2.cardBg, borderRadius:10, padding:"8px 12px", marginBottom:12, border:`1px solid ${S2.cardBdr}` }}>
                              <div style={{ fontSize:10, color:BUDGET_LABELS[budget].color, fontWeight:600, textTransform:"uppercase", letterSpacing:"1px", marginBottom:2 }}>{BUDGET_LABELS[budget].icon} Prix</div>
                              <div style={{ fontSize:13, fontWeight:600, color:S2.bodyText }}>{a.budget[budget]}</div>
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                              <a href={BOOK.getyourguide(a.name,destination.name)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"8px 0", borderRadius:10, background:"#FF6B35", color:"white", fontSize:11, fontWeight:600, textDecoration:"none" }}>🎟 GetYourGuide</a>
                              <a href={BOOK.maps(a.name,destination.name)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"8px 0", borderRadius:10, background:"rgba(139,92,246,.15)", color:"#C4B5FD", fontSize:11, fontWeight:600, textDecoration:"none", border:"1px solid rgba(139,92,246,.25)" }}>📍 Maps</a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab==="restaurants" && (
                  <div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, marginBottom:18, color:S2.bodyText }}>Restaurants à {destination.name}</h3>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                      {data.restaurants.map(r=>{
                        const foodTitle = getFoodWikiTitle(r.type);
                        const foodImg = foodTypeImgs[foodTitle];
                        return (
                        <div key={r.name} style={{ background:S2.cardBg, border:`1px solid ${S2.cardBdr}`, borderRadius:18, overflow:"hidden" }}>
                          <div style={{ height:160, overflow:"hidden", position:"relative" }}>
                            <img
                              src={foodImg || `https://picsum.photos/seed/${encodeURIComponent(foodTitle)}/600/400`}
                              alt={r.type}
                              style={{ width:"100%", height:"100%", objectFit:"cover" }}
                              onError={e=>{ e.target.onerror=null; e.target.src=`https://picsum.photos/seed/${encodeURIComponent(r.name)}/600/400`; }}
                            />
                            <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(0,0,0,.55))", padding:"18px 12px 8px" }}>
                              <div style={{ fontSize:11, color:"rgba(255,255,255,.9)", fontWeight:600 }}>{r.type}</div>
                            </div>
                            {(r.stars||0)>0 && <div style={{ position:"absolute", top:8, right:8, background:"rgba(0,0,0,.55)", backdropFilter:"blur(4px)", borderRadius:20, padding:"3px 8px", fontSize:10, color:"#F59E0B", fontWeight:700 }}>{"★".repeat(r.stars)}</div>}
                          </div>
                          <div style={{ padding:16 }}>
                            <div style={{ fontWeight:700, fontSize:14, color:S2.bodyText, marginBottom:4 }}>{r.name}</div>
                            <div style={{ fontSize:12, color:S2.muted70, marginBottom:6 }}>{r.type}</div>
                            {r.budget&&r.budget[budget]&&<div style={{ fontSize:13, fontWeight:600, color:"#D4A574", marginBottom:10 }}>💰 {r.budget[budget]}</div>}
                            <div style={{ display:"flex", gap:7 }}>
                              <a href={BOOK.maps(r.name,destination.name)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"7px 0", borderRadius:10, background:"#4285F4", color:"white", fontSize:11, fontWeight:600, textDecoration:"none" }}>🗺 Google Maps</a>
                              <a href={BOOK.thefork(r.name,destination.name)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"7px 0", borderRadius:10, background:"#00B551", color:"white", fontSize:11, fontWeight:600, textDecoration:"none" }}>🍴 TheFork</a>
                              <a href={BOOK.tripadvisor(r.name,destination.name)} target="_blank" rel="noopener noreferrer" style={{ padding:"7px 10px", borderRadius:10, background:"rgba(52,224,161,.1)", color:"#34E0A1", fontSize:12, textDecoration:"none", display:"flex", alignItems:"center", border:"1px solid rgba(52,224,161,.2)" }}>⭐</a>
                            </div>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab==="itinerary" && (
                  <div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, marginBottom:18, color:S2.bodyText }}>📅 {T.daily_plan} — {destination.name}</h3>
                    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                      {itinerary.map(day=>(
                        <div key={day.day} style={{ background:S2.cardBg, border:`1px solid ${S2.cardBdr}`, borderRadius:18, overflow:"hidden" }}>
                          <div style={{ background:"rgba(212,165,116,.07)", borderBottom:`1px solid ${S2.cardBdr}`, padding:"14px 22px", display:"flex", alignItems:"center", gap:14 }}>
                            <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#D4A574,#C49160)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"white", flexShrink:0 }}>{day.day}</div>
                            <div>
                              <div style={{ fontSize:10, color:"#D4A574", textTransform:"uppercase", letterSpacing:"1px" }}>Jour {day.day}</div>
                              <div style={{ fontWeight:700, fontSize:14, color:S2.bodyText }}>{day.date}</div>
                            </div>
                          </div>
                          <div style={{ padding:"10px 0" }}>
                            {day.items.map((item,i)=>(
                              <div key={i} style={{ display:"flex", gap:14, padding:"10px 22px", borderBottom:i<day.items.length-1?`1px solid ${S2.cardBdr}`:"none" }}>
                                <div style={{ fontSize:11, color:"#D4A574", fontWeight:600, minWidth:42, paddingTop:2 }}>{item.time}</div>
                                <div style={{ fontSize:22, flexShrink:0 }}>{item.icon}</div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontWeight:600, fontSize:13, color:S2.bodyText, marginBottom:3 }}>{item.activity}</div>
                                  <div style={{ fontSize:12, color:S2.muted70, lineHeight:1.5 }}>{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab==="map" && (
                  <div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, marginBottom:18, color:S2.bodyText }}>🗺 Carte — {destination.name}</h3>
                    <MapView destination={destination} budget={budget} />
                  </div>
                )}

                {activeTab==="transport" && (
                  <div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, marginBottom:16, color:S2.bodyText }}>✈️ {T.transport_info} — {origin} → {destination.name}</h3>
                    <div style={{ background:"rgba(14,165,233,.06)", border:"1px solid rgba(14,165,233,.14)", borderRadius:14, padding:"14px 18px", marginBottom:20 }}>
                      <div style={{ fontSize:11, color:"#C4B5FD", textTransform:"uppercase", letterSpacing:"1px", fontWeight:600, marginBottom:10 }}>✈️ Réserver votre vol</div>
                      <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
                        {[{label:"✈️ Google Flights",color:"#0EA5E9",url:BOOK.flights(origin,destination.name)},{label:"🔍 Skyscanner",color:"#00A3BE",url:BOOK.skyscanner(origin,destination.name)},{label:"🛫 Kayak",color:"#FF690F",url:BOOK.kayak(origin,destination.name)}].map(({label,color,url})=>(
                          <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:20, background:color, color:"white", fontSize:12, fontWeight:600, textDecoration:"none" }}>{label}</a>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
                      {data.transport.map((t,i)=>(
                        <div key={i} style={{ background:S2.cardBg, border:`1px solid ${S2.cardBdr}`, borderRadius:14, padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start", borderLeft:S2.borderL }}>
                          <span style={{ fontSize:28, flexShrink:0 }}>{t.mode.split(" ")[0]}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:700, fontSize:14, marginBottom:4, color:S2.bodyText }}>{t.mode}</div>
                            <div style={{ fontSize:13, color:S2.muted, marginBottom:8 }}>{t.info}</div>
                            <div style={{ background:`rgba(${budget==="serré"?"45,212,191":budget==="moyen"?"245,158,11":"139,92,246"},.1)`, border:`1px solid rgba(${budget==="serré"?"45,212,191":budget==="moyen"?"245,158,11":"139,92,246"},.2)`, borderRadius:8, padding:"5px 12px", display:"inline-block", fontSize:12, fontWeight:600, color:BUDGET_LABELS[budget].color }}>{BUDGET_LABELS[budget].icon} {t.budgetNote}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
                      {TRANSPORT_MODES.map(tm=>(
                        <div key={tm.label} style={{ background:S2.cardBg, border:`1px solid ${S2.cardBdr}`, borderRadius:14, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start", borderTop:`2px solid ${tm.color}` }}>
                          <span style={{ fontSize:24, flexShrink:0 }}>{tm.icon}</span>
                          <div><div style={{ fontWeight:700, fontSize:13, marginBottom:4, color:S2.bodyText }}>{tm.label}</div><div style={{ fontSize:11, color:S2.muted, lineHeight:1.5 }}>{tm.desc}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab==="hotels" && (
                  <div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, marginBottom:8, color:S2.bodyText }}>🏨 {T.hotel_options} — {destination.name}</h3>
                    <p style={{ fontSize:13, color:S2.muted, marginBottom:16 }}>Tous les hébergements disponibles par catégorie de budget</p>
                    <div style={{ display:"flex", gap:9, flexWrap:"wrap", marginBottom:22 }}>
                      {[{label:"Booking.com",color:"#003580",url:BOOK.booking(destination.name)},{label:"Airbnb",color:"#FF5A5F",url:BOOK.airbnb(destination.name)},{label:"Hotels.com",color:"#D9000D",url:`https://fr.hotels.com/search.do?q-destination=${encodeURIComponent(destination.name)}`}].map(({label,color,url})=>(
                        <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 18px", borderRadius:20, background:color, color:"white", fontSize:12, fontWeight:600, textDecoration:"none" }}>🏨 {label}</a>
                      ))}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
                      {["serré","moyen","riche"].map(tier=>{
                        const list=data.hotels[tier]||[];const bl=BUDGET_LABELS[tier];
                        return (
                          <div key={tier}>
                            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:14, paddingBottom:10, borderBottom:`1px solid ${S2.cardBdr}` }}>
                              <span style={{ fontSize:22 }}>{bl.icon}</span>
                              <div style={{ fontWeight:700, fontSize:15, color:bl.color }}>{bl.label}</div>
                              <span style={{ fontSize:12, color:S2.muted }}>— {bl.desc}</span>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:12 }}>
                              {list.map((h,i)=>{
                                const destPhoto = heroImgs[destination.id] || destination.photo;
                                return (
                                <div key={i} style={{ background:S2.cardBg, border:`${tier===budget?"2px solid "+bl.color:`1px solid ${S2.cardBdr}`}`, borderRadius:16, overflow:"hidden", position:"relative" }}>
                                  <div style={{ height:150, overflow:"hidden", position:"relative" }}>
                                    <img src={destPhoto} alt={destination.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.55) saturate(1.2)" }} onError={e=>{ e.target.onerror=null; e.target.src=`https://picsum.photos/seed/hotel-${encodeURIComponent(h.name)}/600/400`; }} />
                                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(0,0,0,.1),rgba(0,0,0,.65))", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"12px 14px" }}>
                                      <div style={{ fontSize:18, marginBottom:2 }}>🏨</div>
                                      <div style={{ fontSize:11, color:"rgba(255,255,255,.9)", fontWeight:700, lineHeight:1.3 }}>{h.type||"Hébergement"}</div>
                                      <div style={{ color:"#F59E0B", fontSize:11, marginTop:2 }}>{"★".repeat(h.stars||0)}{"☆".repeat(Math.max(0,5-(h.stars||0)))}</div>
                                    </div>
                                  </div>
                                  <div style={{ padding:16, position:"relative" }}>
                                    {tier===budget&&i===0&&<div style={{ position:"absolute", top:-8, right:10, background:bl.color, color:"white", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:10, textTransform:"uppercase" }}>✓ {T.selected}</div>}
                                    <div style={{ fontWeight:700, fontSize:14, marginBottom:4, color:S2.bodyText }}>{h.name}</div>
                                    {h.type&&<div style={{ fontSize:11, color:S2.muted, marginBottom:6 }}>{h.type}</div>}
                                    <div style={{ color:"#F59E0B", fontSize:13, marginBottom:8 }}>{"★".repeat(h.stars)}{"☆".repeat(Math.max(0,5-h.stars))}</div>
                                    <div style={{ background:`rgba(${tier==="serré"?"45,212,191":tier==="moyen"?"245,158,11":"139,92,246"},.1)`, border:`1px solid rgba(${tier==="serré"?"45,212,191":tier==="moyen"?"245,158,11":"139,92,246"},.2)`, borderRadius:8, padding:"6px 10px", fontSize:13, fontWeight:600, color:bl.color, marginBottom:12 }}>💰 {h.price}</div>
                                    <div style={{ display:"flex", gap:7 }}>
                                      <a href={BOOK.booking(destination.name,h.name)} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"8px 0", borderRadius:10, background:"#003580", color:"white", fontSize:11, fontWeight:600, textDecoration:"none" }}>🏨 Booking</a>
                                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name+" "+destination.name)}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"8px 0", borderRadius:10, background:"#4285F4", color:"white", fontSize:11, fontWeight:600, textDecoration:"none" }}>📍 Maps</a>
                                    </div>
                                  </div>
                                </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ textAlign:"center", padding:"32px 0 8px", color:S2.muted70, fontSize:11, display:"flex", flexWrap:"wrap", justifyContent:"center", gap:12, alignItems:"center" }}>
                <span>VoyagesPro · 65+ destinations mondiales ✈️</span>
                <span>·</span>
                <button onClick={()=>setShowPrivacy(true)} style={{ background:"none", border:"none", color:"rgba(148,163,184,.4)", fontSize:11, cursor:"pointer", textDecoration:"underline", padding:0 }}>Politique de confidentialité</button>
                <span>·</span>
                <span>© 2026 VoyagesPro</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
