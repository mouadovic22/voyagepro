import { useState, useEffect, useRef } from "react";

const IMG = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

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

const wikiError = e => {
  if (e.target.dataset.tried) { e.target.style.opacity=0; return; }
  e.target.dataset.tried = '1';
  const title = WIKI_TITLES[e.target.dataset.id] || e.target.alt.replace(/ /g,'_');
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
    .then(r=>r.json())
    .then(d=>{ if(d.thumbnail?.source){e.target.src=d.thumbnail.source;e.target.style.opacity=1;}else e.target.style.opacity=0;})
    .catch(()=>{e.target.style.opacity=0;});
};

// ... (full App.jsx content identical to main branch)
export { wikiError };
