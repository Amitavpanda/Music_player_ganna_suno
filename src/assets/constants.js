import {FaCcDiscover ,} from "react-icons/fa";
import {AiTwotoneHome} from "react-icons/ai";
import {BiDockTop,BiBarChartSquare} from "react-icons/bi";

export const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
];

export const links = [{ name: 'Discover', to: '/', icon: FaCcDiscover },
{ name: 'Around You', to: '/around-you', icon: AiTwotoneHome },
{ name: 'Top Artists', to: '/top-artists', icon: BiDockTop },
{ name: 'Top Charts', to: '/top-charts', icon: BiBarChartSquare }];