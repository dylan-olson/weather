const apiKey="80701dba075f06003a038ffda4045d08",inputZip="38133";$(document).ready((function(){fetch(`https://api.openweathermap.org/data/2.5/weather?zip=38133,us&appid=${apiKey}&units=imperial`).then((e=>e.json())).then((e=>{const{main:t,name:a,sys:i,weather:n}=e;var s=n[0].description;s=s.split(" ");for(let e=0;e<s.length;e++)s[e]=s[e].charAt(0).toUpperCase()+s[e].slice(1);s=s.join(" ");var r=t.temp;r=Math.round(r);function d(e){var t=e.getHours(),a=e.getMinutes(),i=t>=12?"PM":"AM";return(t=(t%=12)||12)+":"+(a=a<10?"0"+a:a)+" "+i}function o(){var e=d(new Date);$(".time").text(e);var t=1e3*i.sunrise,a=1e3*i.sunset-864e5;Date.now()<t&&Date.now()>a?$(".weather-widget").hasClass("nighttime")||$(".weather-widget").addClass("nighttime"):$(".weather-widget").hasClass("nighttime")&&$(".weather-widget").removeClass("nighttime")}o(),setInterval((function(){d(new Date)!=$(".time").text()&&o()}),1e3);var h=a;$(".condition").text(s),$(".temp").text(r),$(".location").text(h+", US");var u="default";switch(n[0].main){case"Clear":u="sunny";break;case"Clouds":if(t.humidity<50){u="cloudsLight";break}u="cloudsDark";break;default:u=n[0].main.charAt(0).toLowerCase()+n[0].main.slice(1)}$(".weather-widget").addClass(u),$(".weather-widget").addClass("ready")}))}));