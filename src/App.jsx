import { useState, useEffect, useRef } from "react";

const IMG = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

const DESTINATIONS = [
  { id:"paris",      name:"Paris",          country:"France",         flag:"🇫🇷", emoji:"🗼", temp:"18°C", currency:"EUR", mapCenter:[48.8566,2.3522],    continent:"europe",    photo:IMG("1502602898657-3e91760cbb34") },
  { id:"tokyo",      name:"Tokyo",          country:"Japon",          flag:"🇯🇵", emoji:"🗾", temp:"22°C", currency:"JPY", mapCenter:[35.6762,139.6503],  continent:"asie",      photo:IMG("1540959733332-eab4deabeeaf") },
  { id:"marrakech",  name:"Marrakech",      country:"Maroc",          flag:"🇲🇦", emoji:"🕌", temp:"28°C", currency:"MAD", mapCenter:[31.6295,-7.9811],   continent:"maghreb",   photo:IMG("1570168007204-ec17f8b76a88") },
  { id:"rome",       name:"Rome",           country:"Italie",         flag:"🇮🇹", emoji:"🏛️", temp:"24°C", currency:"EUR", mapCenter:[41.9028,12.4964],   continent:"europe",    photo:IMG("1552832230-c0197dd311b5") },
  { id:"dubai",      name:"Dubaï",          country:"Émirats",        flag:"🇦🇪", emoji:"🏙️", temp:"35°C", currency:"AED", mapCenter:[25.2048,55.2708],   continent:"maghreb",   photo:IMG("1512453979798-5ea266f8880c") },
  { id:"barcelona",  name:"Barcelone",      country:"Espagne",        flag:"🇪🇸", emoji:"🎭", temp:"21°C", currency:"EUR", mapCenter:[41.3851,2.1734],    continent:"europe",    photo:IMG("1583422409516-2895a77efded") },
  { id:"newyork",    name:"New York",       country:"USA",            flag:"🇺🇸", emoji:"🗽", temp:"15°C", currency:"USD", mapCenter:[40.7128,-74.0060],   continent:"ameriques", photo:IMG("1496442226666-8d4d0e62e6e9") },
  { id:"bali",       name:"Bali",           country:"Indonésie",      flag:"🇮🇩", emoji:"🌴", temp:"30°C", currency:"IDR", mapCenter:[-8.3405,115.0920],  continent:"asie",      photo:IMG("1537996194471-e657df975ab4") },
  { id:"istanbul",   name:"Istanbul",       country:"Türkiye",        flag:"🇹🇷", emoji:"🕍", temp:"20°C", currency:"TRY", mapCenter:[41.0082,28.9784],   continent:"maghreb",   photo:IMG("1524231757912-21f4fe3a7200") },
  { id:"london",     name:"Londres",        country:"Royaume-Uni",    flag:"🇬🇧", emoji:"🎡", temp:"14°C", currency:"GBP", mapCenter:[51.5074,-0.1278],   continent:"europe",    photo:IMG("1513635269975-59663e0ac1ad") },
  { id:"singapore",  name:"Singapour",      country:"Singapour",      flag:"🇸🇬", emoji:"🦁", temp:"31°C", currency:"SGD", mapCenter:[1.3521,103.8198],   continent:"asie",      photo:IMG("1525625293386-3f8f99389edd") },
  { id:"bangkok",    name:"Bangkok",        country:"Thaïlande",      flag:"🇹🇭", emoji:"🛕", temp:"33°C", currency:"THB", mapCenter:[13.7563,100.5018],  continent:"asie",      photo:IMG("1508009603885-50cf7c579365") },
  { id:"amsterdam",  name:"Amsterdam",      country:"Pays-Bas",       flag:"🇳🇱", emoji:"🌷", temp:"16°C", currency:"EUR", mapCenter:[52.3676,4.9041],    continent:"europe",    photo:IMG("1534351590666-13e3e96b5017") },
  { id:"prague",     name:"Prague",         country:"Tchéquie",       flag:"🇨🇿", emoji:"🏰", temp:"15°C", currency:"CZK", mapCenter:[50.0755,14.4378],   continent:"europe",    photo:IMG("1541849546-216549ae216d") },
  { id:"vienna",     name:"Vienne",         country:"Autriche",       flag:"🇦🇹", emoji:"🎶", temp:"16°C", currency:"EUR", mapCenter:[48.2082,16.3738],   continent:"europe",    photo:IMG("1516550135099-2fede5e0e7b8") },
  { id:"sydney",     name:"Sydney",         country:"Australie",      flag:"🇦🇺", emoji:"🦘", temp:"22°C", currency:"AUD", mapCenter:[-33.8688,151.2093], continent:"oceanie",   photo:IMG("1524820801166-404e5e0d5253") },
  { id:"kyoto",      name:"Kyoto",          country:"Japon",          flag:"🇯🇵", emoji:"⛩️", temp:"20°C", currency:"JPY", mapCenter:[35.0116,135.7681],  continent:"asie",      photo:IMG("1492571350019-22de08371fd3") },
  { id:"losangeles", name:"Los Angeles",    country:"USA",            flag:"🇺🇸", emoji:"🎬", temp:"24°C", currency:"USD", mapCenter:[34.0522,-118.2437],  continent:"ameriques", photo:IMG("1534190760961-74e8c701a2f3") },
  { id:"miami",      name:"Miami",          country:"USA",            flag:"🇺🇸", emoji:"🌊", temp:"29°C", currency:"USD", mapCenter:[25.7617,-80.1918],   continent:"ameriques", photo:IMG("1533106497176-028a3b62b521") },
  { id:"lisbon",     name:"Lisbonne",       country:"Portugal",       flag:"🇵🇹", emoji:"🚋", temp:"19°C", currency:"EUR", mapCenter:[38.7223,-9.1393],   continent:"europe",    photo:IMG("1555881400-74d7acaacd8b") },
  { id:"athens",     name:"Athènes",        country:"Grèce",          flag:"🇬🇷", emoji:"🏺", temp:"25°C", currency:"EUR", mapCenter:[37.9838,23.7275],   continent:"europe",    photo:IMG("1603565816030-6b389edb65fb") },
  { id:"cairo",      name:"Le Caire",       country:"Égypte",         flag:"🇪🇬", emoji:"🐪", temp:"32°C", currency:"EGP", mapCenter:[30.0444,31.2357],   continent:"maghreb",   photo:IMG("1539650116574-75c0c6d73bd0") },
  { id:"capetown",   name:"Le Cap",         country:"Afrique du Sud", flag:"🇿🇦", emoji:"🦁", temp:"20°C", currency:"ZAR", mapCenter:[-33.9249,18.4241],  continent:"afrique",   photo:IMG("1580060839134-75a5edca2e99") },
  { id:"maldives",   name:"Maldives",       country:"Maldives",       flag:"🇲🇻", emoji:"🏝️", temp:"30°C", currency:"MVR", mapCenter:[4.1755,73.5093],    continent:"asie",      photo:IMG("1514282401047-d79a71a590e8") },
  { id:"santorini",  name:"Santorin",       country:"Grèce",          flag:"🇬🇷", emoji:"🌅", temp:"25°C", currency:"EUR", mapCenter:[36.3932,25.4615],   continent:"europe",    photo:IMG("1570077188670-e3baeaae9be3") },
  { id:"rio",        name:"Rio de Janeiro", country:"Brésil",         flag:"🇧🇷", emoji:"🎉", temp:"28°C", currency:"BRL", mapCenter:[-22.9068,-43.1729],  continent:"ameriques", photo:IMG("1483729600741-365d66cd6f1e") },
  { id:"buenosaires",name:"Buenos Aires",   country:"Argentine",      flag:"🇦🇷", emoji:"💃", temp:"20°C", currency:"ARS", mapCenter:[-34.6037,-58.3816],  continent:"ameriques", photo:IMG("1589909202802-8f4aab6d18d4") },
  { id:"mexico",     name:"Mexico",         country:"Mexique",        flag:"🇲🇽", emoji:"🌮", temp:"22°C", currency:"MXN", mapCenter:[19.4326,-99.1332],   continent:"ameriques", photo:IMG("1588702547923-7093a6c3ba33") },
  { id:"havana",     name:"La Havane",      country:"Cuba",           flag:"🇨🇺", emoji:"🎺", temp:"28°C", currency:"CUP", mapCenter:[23.1136,-82.3666],   continent:"ameriques", photo:IMG("1551962966-3ac80b8ac05b") },
  { id:"beijing",    name:"Pékin",          country:"Chine",          flag:"🇨🇳", emoji:"🏯", temp:"18°C", currency:"CNY", mapCenter:[39.9042,116.4074],   continent:"asie",      photo:IMG("1508804185872-3e26c63d5440") },
  { id:"hongkong",   name:"Hong Kong",      country:"Chine (RAE)",    flag:"🇭🇰", emoji:"🌃", temp:"26°C", currency:"HKD", mapCenter:[22.3193,114.1694],   continent:"asie",      photo:IMG("1518599807935-37016df1b49d") },
  { id:"seoul",      name:"Séoul",          country:"Corée du Sud",   flag:"🇰🇷", emoji:"🎎", temp:"16°C", currency:"KRW", mapCenter:[37.5665,126.9780],   continent:"asie",      photo:IMG("1517154421773-0855c1e7f01b") },
  { id:"berlin",     name:"Berlin",         country:"Allemagne",      flag:"🇩🇪", emoji:"🌉", temp:"15°C", currency:"EUR", mapCenter:[52.5200,13.4050],    continent:"europe",    photo:IMG("1560979549-c3f7f9bd2ab9") },
  { id:"munich",     name:"Munich",         country:"Allemagne",      flag:"🇩🇪", emoji:"🍺", temp:"14°C", currency:"EUR", mapCenter:[48.1351,11.5820],    continent:"europe",    photo:IMG("1544412795-f0e3f76f3cd4") },
  { id:"zurich",     name:"Zurich",         country:"Suisse",         flag:"🇨🇭", emoji:"⛰️", temp:"13°C", currency:"CHF", mapCenter:[47.3769,8.5417],    continent:"europe",    photo:IMG("1515488964-00216a4c5f1e") },
  { id:"toronto",    name:"Toronto",        country:"Canada",         flag:"🇨🇦", emoji:"🍁", temp:"12°C", currency:"CAD", mapCenter:[43.6532,-79.3832],   continent:"ameriques", photo:IMG("1517935706615-2717063c2225") },
  { id:"montreal",   name:"Montréal",       country:"Canada",         flag:"🇨🇦", emoji:"🥐", temp:"10°C", currency:"CAD", mapCenter:[45.5017,-73.5673],   continent:"ameriques", photo:IMG("1519121785383-4f5ab07c6e52") },
  { id:"mumbai",     name:"Mumbai",         country:"Inde",           flag:"🇮🇳", emoji:"🎥", temp:"30°C", currency:"INR", mapCenter:[19.0760,72.8777],    continent:"asie",      photo:IMG("1529253355930-ddbe423a2ac7") },
  { id:"delhi",      name:"New Delhi",      country:"Inde",           flag:"🇮🇳", emoji:"🕌", temp:"29°C", currency:"INR", mapCenter:[28.6139,77.2090],    continent:"asie",      photo:IMG("1548013146-8a5a5b7bef36") },
  { id:"nairobi",    name:"Nairobi",        country:"Kenya",          flag:"🇰🇪", emoji:"🦒", temp:"24°C", currency:"KES", mapCenter:[-1.2921,36.8219],    continent:"afrique",   photo:IMG("1547949003-9792a18a2c97") },
  { id:"casablanca", name:"Casablanca",     country:"Maroc",          flag:"🇲🇦", emoji:"🕌", temp:"22°C", currency:"MAD", mapCenter:[33.5731,-7.5898],    continent:"maghreb",   photo:IMG("1542367592-8849eb83bf6f") },
  { id:"tunis",      name:"Tunis",          country:"Tunisie",        flag:"🇹🇳", emoji:"🏛️", temp:"23°C", currency:"TND", mapCenter:[36.8191,10.1658],    continent:"maghreb",   photo:IMG("1490845406768-96ef7b3e8413") },
  { id:"alger",      name:"Alger",          country:"Algérie",        flag:"🇩🇿", emoji:"🏛️", temp:"20°C", currency:"DZD", mapCenter:[36.7538,3.0588],     continent:"maghreb",   photo:IMG("1570168007204-ec17f8b76a88") },
  { id:"abudhabi",   name:"Abu Dhabi",      country:"Émirats",        flag:"🇦🇪", emoji:"🕌", temp:"34°C", currency:"AED", mapCenter:[24.4539,54.3773],    continent:"maghreb",   photo:IMG("1558618666-fcd25c85cd64") },
  { id:"doha",       name:"Doha",           country:"Qatar",          flag:"🇶🇦", emoji:"🏟️", temp:"33°C", currency:"QAR", mapCenter:[25.2854,51.5310],    continent:"maghreb",   photo:IMG("1565876062826-3fde2e4555ab") },
  { id:"phuket",     name:"Phuket",         country:"Thaïlande",      flag:"🇹🇭", emoji:"🏖️", temp:"30°C", currency:"THB", mapCenter:[7.8804,98.3923],     continent:"asie",      photo:IMG("1537953773345-d172ccf13cf4") },
  { id:"florence",   name:"Florence",       country:"Italie",         flag:"🇮🇹", emoji:"🎨", temp:"22°C", currency:"EUR", mapCenter:[43.7696,11.2558],    continent:"europe",    photo:IMG("1541726260-14a2f77a5e12") },
  { id:"venice",     name:"Venise",         country:"Italie",         flag:"🇮🇹", emoji:"🚤", temp:"19°C", currency:"EUR", mapCenter:[45.4408,12.3155],    continent:"europe",    photo:IMG("1523906834658-6fe1e6e1e4ba") },
  { id:"seville",    name:"Séville",        country:"Espagne",        flag:"🇪🇸", emoji:"💃", temp:"25°C", currency:"EUR", mapCenter:[37.3891,-5.9845],    continent:"europe",    photo:IMG("1556679908-a4bde52f8a88") },
  { id:"shanghai",   name:"Shanghai",       country:"Chine",          flag:"🇨🇳", emoji:"🌆", temp:"20°C", currency:"CNY", mapCenter:[31.2304,121.4737],   continent:"asie",      photo:IMG("1547981609-4b6bfe67ca0b") },
  // ── European capitals ──
  { id:"dublin",     name:"Dublin",         country:"Irlande",        flag:"🇮🇪", emoji:"🍺", temp:"12°C", currency:"EUR", mapCenter:[53.3498,-6.2603],    continent:"europe",    photo:IMG("1558618666-fcd25c85cd64") },
  { id:"copenhagen", name:"Copenhague",     country:"Danemark",       flag:"🇩🇰", emoji:"🧜", temp:"13°C", currency:"DKK", mapCenter:[55.6761,12.5683],    continent:"europe",    photo:IMG("1513622470-c6e7e3e3c0b7") },
  { id:"stockholm",  name:"Stockholm",      country:"Suède",          flag:"🇸🇪", emoji:"👑", temp:"10°C", currency:"SEK", mapCenter:[59.3293,18.0686],    continent:"europe",    photo:IMG("1508193638397-1cc6e7b6da6f") },
  { id:"helsinki",   name:"Helsinki",       country:"Finlande",       flag:"🇫🇮", emoji:"🌲", temp:"7°C",  currency:"EUR", mapCenter:[60.1699,24.9384],    continent:"europe",    photo:IMG("1570984891966-b8afe7e61ba9") },
  { id:"oslo",       name:"Oslo",           country:"Norvège",        flag:"🇳🇴", emoji:"⛵", temp:"8°C",  currency:"NOK", mapCenter:[59.9139,10.7522],    continent:"europe",    photo:IMG("1586661897040-7c98f517e09c") },
  { id:"warsaw",     name:"Varsovie",       country:"Pologne",        flag:"🇵🇱", emoji:"🏰", temp:"13°C", currency:"PLN", mapCenter:[52.2297,21.0122],    continent:"europe",    photo:IMG("1599946347371-68eb71b457c3") },
  { id:"budapest",   name:"Budapest",       country:"Hongrie",        flag:"🇭🇺", emoji:"🌊", temp:"17°C", currency:"HUF", mapCenter:[47.4979,19.0402],    continent:"europe",    photo:IMG("1549993538-ec6bd5c0bc74") },
  { id:"bucharest",  name:"Bucarest",       country:"Roumanie",       flag:"🇷🇴", emoji:"🏛️", temp:"16°C", currency:"RON", mapCenter:[44.4268,26.1025],    continent:"europe",    photo:IMG("1555400038-63f5ba517994") },
  { id:"brussels",   name:"Bruxelles",      country:"Belgique",       flag:"🇧🇪", emoji:"🧇", temp:"14°C", currency:"EUR", mapCenter:[50.8503,4.3517],     continent:"europe",    photo:IMG("1566804801-15e97ce60d7e") },
  { id:"edinburgh",  name:"Édimbourg",      country:"Écosse",         flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", emoji:"🏯", temp:"11°C", currency:"GBP", mapCenter:[55.9533,-3.1883],    continent:"europe",    photo:IMG("1504736139-35d9a2d4bcec") },
  { id:"belgrade",   name:"Belgrade",       country:"Serbie",         flag:"🇷🇸", emoji:"🎸", temp:"16°C", currency:"RSD", mapCenter:[44.7866,20.4489],    continent:"europe",    photo:IMG("1558025137-c7bc3af35fc3") },
  { id:"reykjavik",  name:"Reykjavik",      country:"Islande",        flag:"🇮🇸", emoji:"🌌", temp:"5°C",  currency:"ISK", mapCenter:[64.1265,-21.8174],   continent:"europe",    photo:IMG("1520769878-ef2536be3ffd") },
  { id:"sofia",      name:"Sofia",          country:"Bulgarie",       flag:"🇧🇬", emoji:"🕍", temp:"15°C", currency:"BGN", mapCenter:[42.6977,23.3219],    continent:"europe",    photo:IMG("1557483160-8cae8e1c5c4f") },
  { id:"zagreb",     name:"Zagreb",         country:"Croatie",        flag:"🇭🇷", emoji:"🏰", temp:"17°C", currency:"EUR", mapCenter:[45.8150,15.9819],    continent:"europe",    photo:IMG("1502602898657-3e91760cbb34") },
  { id:"valletta",   name:"La Valette",     country:"Malte",          flag:"🇲🇹", emoji:"⚓", temp:"22°C", currency:"EUR", mapCenter:[35.8997,14.5147],    continent:"europe",    photo:IMG("1523906834658-6fe1e6e1e4ba") },
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
  { icon:"✈️", label:"Avion",         desc:"Liaisons directes & low-cost partout dans le monde", color:"#0EA5E9" },
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
    tabs:["🗺 Attractions","🍽 Restaurants","📅 Itinéraire","🗾 Carte","✈️ Transport","🏨 Hébergements"],
    tab_keys:["attractions","restaurants","itinerary","map","transport","hotels"],
    recommended:"Hébergement recommandé", transport_title:"Transport & Conseils",
    transport_general:"Moyens de transport généraux", tips:"💡 Conseils pratiques",
    no_dest:"Aucune destination trouvée pour",
    selected:"sélectionné", also_choose:"— choisissez aussi votre ville de départ",
    nights:n=>`${n} nuit${n>1?"s":""}`, budget_label:"Budget",
    journey:"Trajet", stay:"Séjour", travelers:"Voyageurs",
    hotel_options:"Options d\'hébergement",
    stars:"étoile",
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
    tabs:["🗺 Attractions","🍽 Restaurants","📅 Itinerary","🗾 Map","✈️ Transport","🏨 Accommodation"],
    tab_keys:["attractions","restaurants","itinerary","map","transport","hotels"],
    recommended:"Recommended accommodation", transport_title:"Transport & Tips",
    transport_general:"General transport options", tips:"💡 Practical tips",
    no_dest:"No destination found for",
    selected:"selected", also_choose:"— also choose your departure city",
    nights:n=>`${n} night${n>1?"s":""}`, budget_label:"Budget",
    journey:"Route", stay:"Stay", travelers:"Travelers",
    hotel_options:"Accommodation options",
    stars:"star",
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
    tabs:["🗺 المعالم","🍽 المطاعم","📅 البرنامج","🗾 الخريطة","✈️ النقل","🏨 الإقامة"],
    tab_keys:["attractions","restaurants","itinerary","map","transport","hotels"],
    recommended:"الإقامة الموصى بها", transport_title:"النقل والنصائح",
    transport_general:"خيارات النقل العامة", tips:"💡 نصائح عملية",
    no_dest:"لم يتم العثور على وجهة لـ",
    selected:"محدد", also_choose:"— اختر أيضاً مدينة انطلاقك",
    nights:n=>`${n} ليلة`, budget_label:"الميزانية",
    journey:"المسار", stay:"المدة", travelers:"المسافرون",
    hotel_options:"خيارات الإقامة",
    stars:"نجمة",
  },
};

const THEMES = {
  dark:{
    bg:"#080F1E", bg2:"linear-gradient(160deg,#050D1F 0%,#0A1628 50%,#060E1A 100%)",
    card:"rgba(255,255,255,.04)", cardBorder:"rgba(255,255,255,.08)",
    cardHover:"rgba(255,255,255,.12)",
    text:"#E2E8F0", text2:"rgba(148,163,184,.75)", text3:"rgba(148,163,184,.45)",
    inputBg:"rgba(255,255,255,.06)", inputBorder:"rgba(255,255,255,.12)",
    headerBg:"linear-gradient(135deg,#0A1E3D,#0F2952,#0A1628)",
    headerBorder:"rgba(14,165,233,.15)",
    heroBg:"linear-gradient(135deg,#061226,#0A1E3D,#0D1530)",
    summaryBg:"linear-gradient(135deg,#0A1E3D,#0F2952)",
    summaryBorder:"rgba(14,165,233,.2)",
    tabActive:"linear-gradient(135deg,#1E6FA8,#0EA5E9)",
    tabInactive:"rgba(255,255,255,.06)",
    tabInactiveBorder:"rgba(255,255,255,.1)",
    tabInactiveColor:"rgba(148,163,184,.8)",
    btnSecBg:"rgba(255,255,255,.06)", btnSecBorder:"rgba(255,255,255,.1)", btnSecColor:"#94A3B8",
    hotelBg:"linear-gradient(135deg,rgba(14,165,233,.08),rgba(14,165,233,.03))",
    hotelBorder:"rgba(14,165,233,.2)",
  },
  light:{
    bg:"#F0F6FF", bg2:"linear-gradient(160deg,#EFF6FF 0%,#DBEAFE 50%,#EFF6FF 100%)",
    card:"#FFFFFF", cardBorder:"rgba(30,64,175,.12)",
    cardHover:"rgba(30,64,175,.06)",
    text:"#0F172A", text2:"#475569", text3:"#94A3B8",
    inputBg:"#FFFFFF", inputBorder:"rgba(30,64,175,.25)",
    headerBg:"linear-gradient(135deg,#1E3A8A,#2563EB,#1D4ED8)",
    headerBorder:"rgba(37,99,235,.3)",
    heroBg:"linear-gradient(135deg,#1E3A8A,#2563EB,#3B82F6)",
    summaryBg:"linear-gradient(135deg,#DBEAFE,#EFF6FF)",
    summaryBorder:"rgba(30,64,175,.2)",
    tabActive:"linear-gradient(135deg,#1D4ED8,#2563EB)",
    tabInactive:"rgba(30,64,175,.06)",
    tabInactiveBorder:"rgba(30,64,175,.15)",
    tabInactiveColor:"#1E40AF",
    btnSecBg:"rgba(30,64,175,.06)", btnSecBorder:"rgba(30,64,175,.15)", btnSecColor:"#1E40AF",
    hotelBg:"linear-gradient(135deg,rgba(37,99,235,.08),rgba(37,99,235,.03))",
    hotelBorder:"rgba(37,99,235,.2)",
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
    return { day: d+1, date: dateLabel, morning, afternoon, evening };
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
      ${[...day.morning,...day.afternoon,...day.evening].map(item => `
      <div class="timeline-item">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-content">
          <div class="act">${item.activity}</div>
          ${item.note ? `<div class="note">${item.note}</div>` : ""}
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

  const T = LANG[lang];
  const TH = THEMES[theme];
  const isRTL = lang === "ar";

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

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${TH.bg};font-family:'DM Sans',sans-serif;color:${TH.text};}
    ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-thumb{background:rgba(128,128,128,.3);border-radius:3px;}
    .bp{background:linear-gradient(135deg,#1E6FA8,#0EA5E9);color:white;border:none;padding:13px 30px;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;}
    .bp:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(14,165,233,.35);}
    .bp:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none;}
    .bpdf{background:linear-gradient(135deg,#7C3AED,#8B5CF6);color:white;border:none;padding:11px 22px;border-radius:11px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px;}
    .bpdf:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(139,92,246,.4);}
    .bpdf:disabled{opacity:.5;cursor:not-allowed;transform:none;}
    .card{background:${TH.card};border:1px solid ${TH.cardBorder};border-radius:16px;padding:20px;transition:border-color .2s,background .2s;color:${TH.text};}
    .card:hover{border-color:${TH.cardHover};}
    input,select{background:${TH.inputBg};border:1px solid ${TH.inputBorder};border-radius:10px;color:${TH.text};padding:11px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;width:100%;}
    input:focus,select:focus{border-color:#0EA5E9;}
    input[type=date]::-webkit-calendar-picker-indicator{filter:${theme==='dark'?'invert(1) opacity(.5)':'opacity(.5)'};cursor:pointer;}
    select option{background:${TH.inputBg};color:${TH.text};}
    .tab{padding:10px 18px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;transition:all .2s;}
    .dc{cursor:pointer;padding:13px;border-radius:12px;border:1px solid ${TH.cardBorder};background:${TH.card};transition:all .15s;}
    .dc:hover{border-color:rgba(14,165,233,.4);background:rgba(14,165,233,.07);}
    .dc.sel{border:2px solid #0EA5E9;background:rgba(14,165,233,.12);}
    @keyframes spin{to{transform:rotate(360deg)}}
    .sp{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;display:inline-block;animation:spin 0.8s linear infinite;}
    .pcard{position:relative;border-radius:14px;overflow:hidden;cursor:pointer;aspect-ratio:4/3;transition:box-shadow .2s,transform .2s;}
    .pcard:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.4);}
    .pcard img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .45s ease;}
    .pcard:hover img{transform:scale(1.08);}
    .pcard-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.15) 55%,transparent 100%);}
    .pcard-text{position:absolute;bottom:0;left:0;right:0;padding:10px 10px 9px;}
    .cfbtn{padding:8px 16px;border-radius:20px;border:1px solid ${TH.cardBorder};background:${TH.card};color:${TH.text2};font-size:12px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .18s;white-space:nowrap;}
    .cfbtn:hover{border-color:rgba(14,165,233,.5);background:rgba(14,165,233,.1);color:#0EA5E9;}
    .cfbtn.act{border-color:#0EA5E9;background:rgba(14,165,233,.18);color:#0EA5E9;font-weight:700;}
    .feat-strip{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .feat-strip::-webkit-scrollbar{display:none;}
    .feat-card{position:relative;border-radius:12px;overflow:hidden;cursor:pointer;flex-shrink:0;width:130px;height:90px;transition:transform .2s;}
    .feat-card:hover{transform:translateY(-2px);}
    .feat-card img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
    .feat-card:hover img{transform:scale(1.1);}
    .feat-card-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7),transparent);}
    .feat-card-lbl{position:absolute;bottom:6px;left:8px;font-size:11px;font-weight:700;color:white;}
    label{color:${TH.text2};}
  `;

  return (
    <>
      <style>{css}</style>
      <div dir={isRTL ? "rtl" : "ltr"} style={{ minHeight:"100vh", background:TH.bg2, color:TH.text }}>

        {/* HEADER */}
        <div style={{ background:TH.headerBg, borderBottom:`1px solid ${TH.headerBorder}`, padding:"18px 0 14px" }}>
          <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:32 }}>✈️</span>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:900, background:"linear-gradient(135deg,#7DD3FC,#38BDF8,#0EA5E9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>VoyagePro</div>
                  <div style={{ fontSize:11, color:TH.text3, letterSpacing:"2px", textTransform:"uppercase" }}>50 destinations mondiales · Export PDF</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                {/* Language switcher */}
                <div style={{ display:"flex", gap:4 }}>
                  {["fr","en","ar"].map(l=>(
                    <button key={l} onClick={()=>setLang(l)} style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${lang===l?"#0EA5E9":TH.cardBorder}`, background:lang===l?"rgba(14,165,233,.18)":TH.card, color:lang===l?"#7DD3FC":TH.text2, fontSize:11, fontWeight:lang===l?700:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:"1px" }}>{l}</button>
                  ))}
                </div>
                {/* Theme toggle */}
                <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{ padding:"6px 12px", borderRadius:8, border:`1px solid ${TH.cardBorder}`, background:TH.card, color:TH.text2, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'DM Sans',sans-serif" }}>
                  {theme==="dark"?"☀️":"🌙"}<span style={{ fontSize:11, fontWeight:500 }}>{theme==="dark"?"Clair":"Sombre"}</span>
                </button>
              </div>
            </div>
            <div style={{ display:"flex", gap:6, marginTop:12, flexWrap:"wrap" }}>
              {[[T.tabs?.[0]?.replace(/[^\w\s]/g,"").trim()||"Destination","Destination"],[T.configure||"Paramètres","Paramètres"],["Programme","Programme"]].map(([,l],i) => {
                const labels = [T.tabs?.[0]?.split(" ").slice(1).join(" ")||"Destination", T.configure?.split(" ")[0]||"Paramètres", "Programme"];
                const label = ["Destination","Paramètres","Programme"][i];
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:step>=i+1?"linear-gradient(135deg,#0EA5E9,#38BDF8)":TH.card, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:step>=i+1?"white":TH.text3, border:step===i+1?"2px solid #38BDF8":"2px solid transparent" }}>{i+1}</div>
                    <span style={{ fontSize:12, color:step>=i+1?"#7DD3FC":TH.text3, fontWeight:step===i+1?600:400 }}>{label}</span>
                    {i<2 && <div style={{ width:14, height:1, background:TH.cardBorder, margin:"0 4px" }}/>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ maxWidth:1140, margin:"0 auto", padding:"26px 24px" }}>

          {/* ── STEP 1 ── */}
          {step===1 && (
            <div>
              {/* HERO BANNER */}
              <div style={{ borderRadius:20, overflow:"hidden", marginBottom:26, position:"relative", background:TH.heroBg, padding:"36px 32px 32px" }}>
                <div style={{ position:"absolute", top:0, [isRTL?"left":"right"]:0, bottom:0, width:"48%", display:"flex", gap:2, overflow:"hidden" }}>
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
                    {[DESTINATIONS[0],DESTINATIONS[7],DESTINATIONS[24]].map(d=>(
                      <div key={d.id} style={{ flex:1, backgroundImage:`url(${d.photo})`, backgroundSize:"cover", backgroundPosition:"center", opacity:.45 }}/>
                    ))}
                  </div>
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
                    {[DESTINATIONS[4],DESTINATIONS[6]].map(d=>(
                      <div key={d.id} style={{ flex:1, backgroundImage:`url(${d.photo})`, backgroundSize:"cover", backgroundPosition:"center", opacity:.45 }}/>
                    ))}
                  </div>
                  <div style={{ position:"absolute", top:0, left:0, bottom:0, right:0, background:`linear-gradient(to ${isRTL?"left":"right"},${theme==="dark"?"#0A1E3D":"#1E3A8A"} 10%,rgba(10,30,61,.4) 60%,transparent 100%)` }}/>
                </div>
                <div style={{ position:"relative", zIndex:1, maxWidth:500 }}>
                  <div style={{ fontSize:10, letterSpacing:"3px", color:"#7DD3FC", textTransform:"uppercase", marginBottom:10 }}>✈ Planificateur de voyage intelligent</div>
                  <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:34, fontWeight:900, lineHeight:1.18, marginBottom:12, background:"linear-gradient(135deg,#fff 40%,#7DD3FC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    {T.hero_title}
                  </h1>
                  <p style={{ fontSize:14, color:"rgba(148,163,184,.8)", marginBottom:20, lineHeight:1.65 }}>{T.hero_sub}</p>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                    {[["🗺️","50 destinations"],["🏨","Hôtels inclus"],["📅","Itinéraire auto"],["📥","Export PDF"]].map(([ic,txt])=>(
                      <div key={txt} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#7DD3FC" }}><span>{ic}</span><span>{txt}</span></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ORIGIN */}
              <div style={{ marginBottom:18 }}>
                <label style={{ display:"block", marginBottom:7, fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>🛫 {T.depart}</label>
                <select value={origin} onChange={e=>setOrigin(e.target.value)} style={{ maxWidth:340 }}>
                  <option value="">— Choisir une ville —</option>
                  {ORIGINS.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {/* SEARCH */}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", marginBottom:7, fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>🔍 {T.search_ph.split(",")[0]}…</label>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ position:"relative", flex:1, maxWidth:380 }}>
                    <span style={{ position:"absolute", [isRTL?"right":"left"]:12, top:"50%", transform:"translateY(-50%)", fontSize:15, opacity:.5 }}>🔍</span>
                    <input value={search} onChange={e=>{setSearch(e.target.value);setContinent("tous");}} placeholder={T.search_ph} style={{ [isRTL?"paddingRight":"paddingLeft"]:36, width:"100%" }}/>
                    {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", [isRTL?"left":"right"]:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:TH.text3, cursor:"pointer", fontSize:16, lineHeight:1 }}>×</button>}
                  </div>
                  <span style={{ fontSize:12, color:TH.text3, whiteSpace:"nowrap" }}>{filtered.length} {T.results}{filtered.length!==1?"s":""}</span>
                </div>
              </div>

              {/* FEATURED QUICK-PICKS (shown when search is empty) */}
              {!search && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:11, color:TH.text3, textTransform:"uppercase", letterSpacing:"1px", marginBottom:8 }}>{T.trending}</div>
                  <div className="feat-strip">
                    {FEATURED_IDS.map(id=>{
                      const d = DESTINATIONS.find(x=>x.id===id);
                      return (
                        <div key={id} className="feat-card" onClick={()=>setDestination(d)} style={{ outline:destination?.id===id?"2px solid #0EA5E9":"none", outlineOffset:2 }}>
                          <img src={d.photo} alt={d.name}/>
                          <div className="feat-card-ov"/>
                          <div className="feat-card-lbl">{d.emoji} {d.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CONTINENT FILTERS */}
              <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
                {CONTINENTS.map(c=>(
                  <button key={c.id} onClick={()=>setContinent(c.id)} className={`cfbtn${continent===c.id?" act":""}`}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>

              {/* DESTINATION PHOTO GRID */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))", gap:10, marginBottom:26, maxHeight:540, overflowY:"auto", paddingRight:4 }}>
                {filtered.map(dest=>(
                  <div
                    key={dest.id}
                    className="pcard"
                    onClick={()=>setDestination(dest)}
                    onMouseEnter={()=>setHoveredId(dest.id)}
                    onMouseLeave={()=>setHoveredId(null)}
                    style={{
                      backgroundColor: CONTINENT_BG[dest.continent] || "#0A1628",
                      boxShadow: destination?.id===dest.id ? "0 0 0 2.5px #0EA5E9" : hoveredId===dest.id ? "0 0 0 1.5px rgba(14,165,233,.35)" : "none",
                    }}
                  >
                    <img src={dest.photo} alt={dest.name} loading="lazy"/>
                    <div className="pcard-overlay"/>
                    {destination?.id===dest.id && (
                      <div style={{ position:"absolute", top:8, right:8, width:22, height:22, borderRadius:"50%", background:"#0EA5E9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"white", zIndex:2 }}>✓</div>
                    )}
                    <div className="pcard-text">
                      <div style={{ fontSize:11, marginBottom:1, opacity:.9 }}>{dest.emoji}</div>
                      <div style={{ fontWeight:700, fontSize:13, color:"white", lineHeight:1.2, marginBottom:2 }}>{dest.name} {dest.flag}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.65)" }}>{dest.country} · 🌡 {dest.temp}</div>
                    </div>
                  </div>
                ))}
                {filtered.length===0 && (
                  <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"40px 20px", color:TH.text3 }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
                    <div>{T.no_dest} « {search} »</div>
                  </div>
                )}
              </div>

              {destination && (
                <div style={{ marginBottom:16, padding:"10px 16px", borderRadius:10, background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.25)", fontSize:13, color:"#7DD3FC", display:"inline-flex", alignItems:"center", gap:8 }}>
                  {destination.emoji} <strong>{destination.name}</strong> {destination.flag} {T.selected}{origin ? "" : ` ${T.also_choose}`}
                </div>
              )}

              <button className="bp" disabled={!origin||!destination} onClick={()=>setStep(2)}>{T.continue}</button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step===2 && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <button onClick={()=>setStep(1)} style={{ background:"transparent", border:"none", color:"#7DD3FC", cursor:"pointer", fontSize:13, padding:0 }}>{T.back}</button>
                <div style={{ width:1, height:13, background:TH.cardBorder }}/>
                <span style={{ color:TH.text2, fontSize:13 }}>{origin} → {destination.name} {destination.flag}</span>
              </div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, marginBottom:20, color:TH.text }}>{T.configure}</h2>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:13, marginBottom:20 }}>
                <div><label style={{ display:"block", marginBottom:6, fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>📅 {T.dep_date}</label><input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={e=>setStartDate(e.target.value)}/></div>
                <div><label style={{ display:"block", marginBottom:6, fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>📅 {T.ret_date}</label><input type="date" value={endDate} min={startDate||new Date().toISOString().split("T")[0]} onChange={e=>setEndDate(e.target.value)}/></div>
              </div>
              {nights>0 && <div style={{ background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.25)", borderRadius:9, padding:"8px 14px", marginBottom:18, fontSize:13, color:"#7DD3FC", display:"inline-block" }}>✨ <strong>{T.nights(nights)}</strong> à {destination.name}</div>}

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:13, marginBottom:20 }}>
                {[[`👤 ${T.adults}`,adults,setAdults,1],[`👶 ${T.children}`,children,setChildren,0]].map(([lbl,val,set,min]) => (
                  <div key={lbl}><label style={{ display:"block", marginBottom:6, fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>{lbl}</label>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <button onClick={()=>set(Math.max(min,val-1))} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${TH.cardBorder}`, background:TH.card, color:TH.text, cursor:"pointer", fontSize:18 }}>−</button>
                      <span style={{ fontSize:18, fontWeight:700, minWidth:28, textAlign:"center", color:TH.text }}>{val}</span>
                      <button onClick={()=>set(val+1)} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${TH.cardBorder}`, background:TH.card, color:TH.text, cursor:"pointer", fontSize:18 }}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <label style={{ display:"block", marginBottom:11, fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>💰 {T.budget_type}</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:26 }}>
                {Object.entries(BUDGET_LABELS).map(([key,val]) => (
                  <div key={key} onClick={()=>setBudget(key)} className="card" style={{ cursor:"pointer", textAlign:"center", padding:"16px 10px", border:budget===key?`2px solid ${val.color}`:`1px solid ${TH.cardBorder}`, background:budget===key?`rgba(${key==="serré"?"45,212,191":key==="moyen"?"245,158,11":"139,92,246"},.08)`:TH.card }}>
                    <div style={{ fontSize:26, marginBottom:5 }}>{val.icon}</div>
                    <div style={{ fontWeight:700, fontSize:14, marginBottom:3, color:budget===key?val.color:TH.text }}>{val.label}</div>
                    <div style={{ fontSize:11, color:TH.text2 }}>{val.desc}</div>
                  </div>
                ))}
              </div>
              <button className="bp" disabled={!startDate||!endDate||!budget} onClick={handlePlan}>{T.generate}</button>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step===3 && data && (
            <div>
              {/* Summary bar */}
              <div style={{ background:TH.summaryBg, border:`1px solid ${TH.summaryBorder}`, borderRadius:13, padding:"13px 18px", marginBottom:18, display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                  {[[T.journey,`${origin} → ${destination.name} ${destination.flag}`],[T.stay,T.nights(nights)],[T.travelers,`${adults} adulte${adults>1?"s":""}${children>0?` + ${children} enfant${children>1?"s":""}`:""}`],[T.budget_label,`${BUDGET_LABELS[budget].icon} ${BUDGET_LABELS[budget].label}`]].map(([k,v]) => (
                    <div key={k}><div style={{ fontSize:10, color:TH.text2, textTransform:"uppercase", letterSpacing:"1px" }}>{k}</div><div style={{ fontSize:14, fontWeight:700, color:k===T.budget_label?BUDGET_LABELS[budget].color:TH.text }}>{v}</div></div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="bpdf" onClick={handlePDF} disabled={pdfLoading}>
                    {pdfLoading ? <span className="sp"/> : "📥"} {pdfLoading ? "Génération…" : T.dl_pdf}
                  </button>
                  <button onClick={reset} style={{ background:TH.btnSecBg, border:`1px solid ${TH.btnSecBorder}`, color:TH.btnSecColor, padding:"8px 13px", borderRadius:8, cursor:"pointer", fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>{T.modify}</button>
                </div>
              </div>

              {/* Hotel banner */}
              <div style={{ background:TH.hotelBg, border:`1px solid ${TH.hotelBorder}`, borderRadius:13, padding:"13px 18px", marginBottom:18, display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:32 }}>🏨</span>
                <div>
                  <div style={{ fontSize:10, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px", marginBottom:3 }}>{T.recommended}</div>
                  <div style={{ fontSize:17, fontWeight:700, marginBottom:3, color:TH.text }}>{data.hotels[budget]?.[0]?.name}</div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span>{Array.from({length:data.hotels[budget]?.[0]?.stars||0},(_,i)=><span key={i} style={{color:"#F59E0B"}}>★</span>)}</span>
                    <span style={{ fontSize:12, color:TH.text2 }}>· {data.hotels[budget]?.[0]?.price}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display:"flex", gap:7, marginBottom:20, flexWrap:"wrap" }}>
                {T.tabs.map((label,i) => {
                  const key = T.tab_keys[i];
                  return (
                    <button key={key} onClick={()=>setActiveTab(key)} className="tab" style={{ background:activeTab===key?TH.tabActive:TH.tabInactive, color:activeTab===key?"white":TH.tabInactiveColor, border:activeTab===key?"none":`1px solid ${TH.tabInactiveBorder}` }}>{label}</button>
                  );
                })}
              </div>

              {/* ATTRACTIONS */}
              {activeTab==="attractions" && (
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, marginBottom:13, color:TH.text }}>Attractions à {destination.name}</h3>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:11 }}>
                    {data.attractions.map(a => (
                      <div key={a.name} className="card" style={{ padding:15 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
                          <div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div>
                          <span style={{ padding:"3px 8px", borderRadius:20, fontSize:10, fontWeight:600, background:"rgba(14,165,233,.15)", color:"#7DD3FC", flexShrink:0, marginLeft:6 }}>{a.type}</span>
                        </div>
                        <div style={{ fontSize:12, color:"rgba(148,163,184,.7)", marginBottom:8 }}>⏱ {a.duration}</div>
                        <div style={{ background:TH.inputBg, borderRadius:8, padding:"7px 10px" }}>
                          <div style={{ fontSize:10, color:BUDGET_LABELS[budget].color, fontWeight:600, textTransform:"uppercase", letterSpacing:"1px", marginBottom:2 }}>{BUDGET_LABELS[budget].icon} Prix</div>
                          <div style={{ fontSize:13, fontWeight:600 }}>{a.budget[budget]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESTAURANTS */}
              {activeTab==="restaurants" && (
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, marginBottom:13, color:TH.text }}>Restaurants & Cafés à {destination.name}</h3>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:11 }}>
                    {data.restaurants.map(r => {
                      const price = r.budget[budget];
                      return (
                        <div key={r.name} className="card" style={{ padding:15, opacity:price?1:0.45 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                            <div style={{ fontWeight:700, fontSize:14 }}>{r.name}</div>
                            <span style={{ fontSize:18 }}>🍽</span>
                          </div>
                          <div style={{ fontSize:12, color:"rgba(148,163,184,.7)", marginBottom:8 }}>{r.type}</div>
                          {price ? (
                            <div style={{ background:"rgba(249,115,22,.1)", border:"1px solid rgba(249,115,22,.2)", borderRadius:8, padding:"7px 10px" }}>
                              <span style={{ fontSize:12, color:"#FB923C", fontWeight:600 }}>💰 </span>
                              <span style={{ fontSize:13, fontWeight:600 }}>{price}</span>
                            </div>
                          ) : (
                            <div style={{ fontSize:11, color:"rgba(239,68,68,.6)" }}>Non disponible pour ce budget</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ITINERARY */}
              {activeTab==="itinerary" && (
                <div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:13, flexWrap:"wrap", gap:10 }}>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:TH.text }}>Programme — {destination.name}</h3>
                    <button className="bpdf" onClick={handlePDF} disabled={pdfLoading} style={{ fontSize:12, padding:"9px 18px" }}>
                      {pdfLoading ? <><span className="sp"/> Génération…</> : "📥 PDF complet"}
                    </button>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                    {itinerary.map(day => (
                      <div key={day.day} className="card" style={{ padding:"17px 20px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:13, paddingBottom:11, borderBottom:`1px solid ${TH.cardBorder}` }}>
                          <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#1E6FA8,#0EA5E9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"white", flexShrink:0 }}>{day.day}</div>
                          <div><div style={{ fontSize:10, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px" }}>Jour {day.day}</div><div style={{ fontWeight:700, fontSize:14 }}>{day.date}</div></div>
                        </div>
                        {[...day.morning,...day.afternoon,...day.evening].map((item,i) => (
                          <div key={i} style={{ display:"flex", gap:11, marginBottom:9 }}>
                            <div style={{ fontSize:11, color:"#7DD3FC", fontWeight:600, minWidth:42, paddingTop:2 }}>{item.time}</div>
                            <div>
                              <div style={{ fontSize:13, fontWeight:600, marginBottom:1 }}>{item.activity}</div>
                              {item.note && <div style={{ fontSize:11, color:"rgba(148,163,184,.65)" }}>{item.note}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MAP */}
              {activeTab==="map" && (
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, marginBottom:13, color:TH.text }}>Carte — {destination.name}</h3>
                  <MapView destination={destination} budget={budget}/>
                  <p style={{ marginTop:10, fontSize:12, color:TH.text2, textAlign:"center" }}>Cliquez sur les marqueurs pour voir les détails et les prix</p>
                </div>
              )}

              {/* TRANSPORT */}
              {activeTab==="transport" && (
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, marginBottom:6, color:TH.text }}>{T.transport_title} — {destination.name}</h3>
                  <p style={{ fontSize:13, color:TH.text2, marginBottom:16 }}>Options de transport depuis {origin} vers {destination.name}</p>

                  {/* City-specific transport */}
                  <div style={{ display:"flex", flexDirection:"column", gap:11, marginBottom:22 }}>
                    {data.transport.map((t,i) => (
                      <div key={i} className="card" style={{ padding:"17px 20px", display:"flex", gap:13, alignItems:"flex-start", borderLeft:"3px solid #0EA5E9" }}>
                        <span style={{ fontSize:30, flexShrink:0 }}>{t.mode.split(" ")[0]}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:700, fontSize:14, marginBottom:4, color:TH.text }}>{t.mode}</div>
                          <div style={{ fontSize:13, color:TH.text2, marginBottom:8 }}>{t.info}</div>
                          <div style={{ background:`rgba(${budget==="serré"?"45,212,191":budget==="moyen"?"245,158,11":"139,92,246"},.1)`, border:`1px solid rgba(${budget==="serré"?"45,212,191":budget==="moyen"?"245,158,11":"139,92,246"},.2)`, borderRadius:8, padding:"6px 12px", display:"inline-block", fontSize:12, fontWeight:600, color:BUDGET_LABELS[budget].color }}>{BUDGET_LABELS[budget].icon} {t.budgetNote}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* General transport modes visual grid */}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:"#7DD3FC", textTransform:"uppercase", letterSpacing:"1px", marginBottom:12 }}>🌐 {T.transport_general}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
                      {TRANSPORT_MODES.map(tm=>(
                        <div key={tm.label} className="card" style={{ padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start", borderTop:`2px solid ${tm.color}` }}>
                          <span style={{ fontSize:26, flexShrink:0 }}>{tm.icon}</span>
                          <div>
                            <div style={{ fontWeight:700, fontSize:13, marginBottom:4, color:TH.text }}>{tm.label}</div>
                            <div style={{ fontSize:11, color:TH.text2, lineHeight:1.5 }}>{tm.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background:TH.card, border:`1px solid ${TH.cardBorder}`, borderRadius:13, padding:"17px 20px" }}>
                    <h4 style={{ fontWeight:700, marginBottom:11, fontSize:14, color:"#7DD3FC" }}>{T.tips}</h4>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
                      {[["📱","Téléchargez les cartes offline"],["💱",`Monnaie locale : ${destination.currency}`],["🌡",`Température : ${destination.temp}`],["🗣","Apprenez quelques mots locaux"],["🛡","Assurance voyage recommandée"],["📸","Copies numériques des documents"]].map(([e,t]) => (
                        <div key={t} style={{ display:"flex", gap:7, alignItems:"flex-start", fontSize:12, color:TH.text2 }}><span style={{ flexShrink:0 }}>{e}</span><span>{t}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* HOTELS */}
              {activeTab==="hotels" && (
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, marginBottom:6, color:TH.text }}>🏨 {T.hotel_options} — {destination.name}</h3>
                  <p style={{ fontSize:13, color:TH.text2, marginBottom:18 }}>Tous les hébergements disponibles par catégorie de budget</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                    {["serré","moyen","riche"].map(tier=>{
                      const list = data.hotels[tier] || [];
                      const bl = BUDGET_LABELS[tier];
                      return (
                        <div key={tier}>
                          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12, paddingBottom:9, borderBottom:`1px solid ${TH.cardBorder}` }}>
                            <span style={{ fontSize:22 }}>{bl.icon}</span>
                            <div style={{ fontWeight:700, fontSize:15, color:bl.color }}>{bl.label}</div>
                            <span style={{ fontSize:12, color:TH.text2 }}>— {bl.desc}</span>
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:11 }}>
                            {list.map((h,i)=>(
                              <div key={i} className="card" style={{ padding:16, border:tier===budget?`2px solid ${bl.color}`:`1px solid ${TH.cardBorder}`, position:"relative" }}>
                                {tier===budget && i===0 && (
                                  <div style={{ position:"absolute", top:10, right:10, background:bl.color, color:"white", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:10, textTransform:"uppercase", letterSpacing:"1px" }}>✓ {T.selected}</div>
                                )}
                                <div style={{ fontWeight:700, fontSize:14, marginBottom:4, color:TH.text, paddingRight:tier===budget&&i===0?70:0 }}>{h.name}</div>
                                {h.type && <div style={{ fontSize:11, color:TH.text2, marginBottom:6 }}>{h.type}</div>}
                                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                                  <span style={{ color:"#F59E0B", fontSize:14 }}>{"★".repeat(h.stars)}{"☆".repeat(Math.max(0,5-h.stars))}</span>
                                  <span style={{ fontSize:11, color:TH.text2 }}>{h.stars} {T.stars}{h.stars>1?"s":""}</span>
                                </div>
                                <div style={{ background:`rgba(${tier==="serré"?"45,212,191":tier==="moyen"?"245,158,11":"139,92,246"},.1)`, border:`1px solid rgba(${tier==="serré"?"45,212,191":tier==="moyen"?"245,158,11":"139,92,246"},.2)`, borderRadius:8, padding:"6px 10px", fontSize:13, fontWeight:600, color:bl.color }}>💰 {h.price}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign:"center", padding:"18px", borderTop:`1px solid ${TH.cardBorder}`, color:TH.text3, fontSize:11 }}>
          VoyagePro — 50+ destinations mondiales · Planificateur de voyage intelligent ✈️
        </div>
      </div>
    </>
  );
}
