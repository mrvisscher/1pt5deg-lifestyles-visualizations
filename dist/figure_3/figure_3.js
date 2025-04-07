var d=Object.defineProperty;var u=(a,t,e)=>t in a?d(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var o=(a,t,e)=>u(a,typeof t!="symbol"?t+"":t,e);import"../modulepreload-polyfill.js";import*as s from"https://cdn.jsdelivr.net/npm/d3@7/+esm";const h={base_1:{description:"Undefined",formatted:"Partially-decarbonized baseline",SE:{2030:4.33,2050:3.66},LV:{2030:3.2,2050:2.22},HU:{2030:3.58,2050:3.18},ES:{2030:3.44,2050:2.55},DE:{2030:4.8,2050:3.65}},base_2:{description:"Undefined",formatted:"Highest impact lifestyle change portfolio",SE:{2030:2.11,2050:1.42},LV:{2030:1.77,2050:1.08},HU:{2030:1.03,2050:.53},ES:{2030:1.18,2050:.61},DE:{2030:1.82,2050:.99}},housing_1:{description:"I will repair my ICT products and use them for longer",formatted:"Repair ICT devices",SE:{2030:.011,2050:.003},LV:{2030:-0,2050:-.001},HU:{2030:-.002,2050:-.001},ES:{2030:.003,2050:.001},DE:{2030:.009,2050:.004}},housing_2:{description:"I will use second-hand ICT devices and pass old ones on",formatted:"Use secondhand ICT devices",SE:{2030:.003,2050:.001},LV:{2030:.006,2050:.003},HU:{2030:-0,2050:-0},ES:{2030:.001,2050:-0},DE:{2030:.008,2050:.004}},housing_3:{description:"I will buy environmentally certified ICT products",formatted:"Use certified ICT products",SE:{2030:.001,2050:-0},LV:{2030:.004,2050:.004},HU:{2030:.006,2050:.003},ES:{2030:.007,2050:.001},DE:{2030:.009,2050:.003}},housing_4:{description:"I will lower the room temperature of my home",formatted:"Lower the room temperature",SE:{2030:.083,2050:.092},LV:{2030:.036,2050:.027},HU:{2030:.276,2050:.304},ES:{2030:.074,2050:.069},DE:{2030:.256,2050:.252}},housing_5:{description:"I will save hot water",formatted:"Reduce hot water use",SE:{2030:.004,2050:.005},LV:{2030:.004,2050:.004},HU:{2030:.02,2050:.016},ES:{2030:.01,2050:.008},DE:{2030:.014,2050:.012}},housing_6:{description:"I will install efficient lighting",formatted:"Switch to LED lighting",SE:{2030:.002,2050:.001},LV:{2030:.016,2050:.016},HU:{2030:.018,2050:.009},ES:{2030:.019,2050:.004},DE:{2030:.026,2050:.009}},housing_7:{description:"I will switch to using energy efficient household devices",formatted:"Switch to efficient devices",SE:{2030:.004,2050:.002},LV:{2030:.032,2050:.033},HU:{2030:.03,2050:.015},ES:{2030:.035,2050:.007},DE:{2030:.055,2050:.019}},housing_8:{description:"I will give up one big household device, such as a dryer",formatted:"Give up a big appliance",SE:{2030:.004,2050:.002},LV:{2030:.041,2050:.038},HU:{2030:.028,2050:.014},ES:{2030:.02,2050:.004},DE:{2030:.028,2050:.01}},housing_9:{description:"I will share a household device with my neighbours",formatted:"Share a big appliance",SE:{2030:.001,2050:-0},LV:{2030:-0,2050:-0},HU:{2030:-0,2050:-0},ES:{2030:-0,2050:-0},DE:{2030:.001,2050:-0}},housing_11:{description:"I will give up excess square meters",formatted:"Reduce excess living space",SE:{2030:.155,2050:.174},LV:{2030:.063,2050:.095},HU:{2030:.297,2050:.443},ES:{2030:.122,2050:.101},DE:{2030:.458,2050:.436}},housing_12:{description:"I will insulate my house",formatted:"Insulate the house",SE:{2030:.07,2050:.077},LV:{2030:.036,2050:.027},HU:{2030:.176,2050:.195},ES:{2030:.092,2050:.088},DE:{2030:.185,2050:.183}},housing_13:{description:"I will reduce energy use with the help of smart devices",formatted:"Use smart devices",SE:{2030:.031,2050:.034},LV:{2030:.023,2050:.02},HU:{2030:.109,2050:.113},ES:{2030:.04,2050:.031},DE:{2030:.105,2050:.095}},housing_14:{description:"I will replace my heating system with a heat pump",formatted:"Switch to a heat pump",SE:{2030:.105,2050:.114},LV:{2030:.161,2050:.17},HU:{2030:.813,2050:.97},ES:{2030:.497,2050:.39},DE:{2030:.978,2050:.982}},housing_18:{description:"I will install my own solar panels",formatted:"Install own solar panels",SE:{2030:-.009,2050:-.005},LV:{2030:.141,2050:.153},HU:{2030:.266,2050:.141},ES:{2030:.125,2050:.017},DE:{2030:.21,2050:.073}},leisure_5:{description:"I will fly less",formatted:"Avoid flying",SE:{2030:.157,2050:.064},LV:{2030:.136,2050:.06},HU:{2030:.054,2050:.024},ES:{2030:.082,2050:.035},DE:{2030:.225,2050:.088}},leisure_9:{description:"I will go on vacation by train and bus instead of plane",formatted:"Replace flights with train and bus",SE:{2030:.074,2050:.025},LV:{2030:.052,2050:.032},HU:{2030:.021,2050:.009},ES:{2030:.053,2050:.026},DE:{2030:.116,2050:.032}},leisure_6:{description:"I will buy fewer clothes and shoes",formatted:"Buy fewer clothes and shoes",SE:{2030:.025,2050:.008},LV:{2030:.026,2050:.007},HU:{2030:.044,2050:.016},ES:{2030:.036,2050:.013},DE:{2030:.026,2050:.008}},mobility_3:{description:"I will switch from using a conventional car to an electric car",formatted:"Switch to an electric vehicle",SE:{2030:1.162,2050:1.434},LV:{2030:.388,2050:.26},HU:{2030:.828,2050:1.041},ES:{2030:1.146,2050:1.197},DE:{2030:1.107,2050:1.197}},mobility_4:{description:"I will give up my car and walk or cycle instead",formatted:"Replace car with cycling and walking",SE:{2030:1.221,2050:1.459},LV:{2030:.534,2050:.349},HU:{2030:.914,2050:1.081},ES:{2030:1.253,2050:1.229},DE:{2030:1.228,2050:1.228}},mobility_5:{description:"I will replace my car with the use of  public transport",formatted:"Replace car with public transit",SE:{2030:1.016,2050:1.357},LV:{2030:-0,2050:-0},HU:{2030:.838,2050:1.043},ES:{2030:1.128,2050:1.181},DE:{2030:.902,2050:1.054}},nutrition_1:{description:"I will avoid food waste at home",formatted:"Avoid food waste at home",SE:{2030:.115,2050:.088},LV:{2030:.13,2050:.121},HU:{2030:.095,2050:.066},ES:{2030:.073,2050:.055},DE:{2030:.085,2050:.067}},nutrition_2:{description:"I will drink tap water in place of bottled water",formatted:"Replace bottled water with tap",SE:{2030:.001,2050:-0},LV:{2030:.009,2050:.005},HU:{2030:.007,2050:.004},ES:{2030:.009,2050:.004},DE:{2030:.016,2050:.008}},nutrition_3:{description:"I will drink tap water instead of manufactured drinks",formatted:"Replace other drinks with tap",SE:{2030:.034,2050:.011},LV:{2030:.061,2050:.035},HU:{2030:.023,2050:.013},ES:{2030:.024,2050:.013},DE:{2030:.057,2050:.031}},nutrition_4:{description:"I will reduce animal-based products in my diet",formatted:"Reduce animal-based foods",SE:{2030:.349,2050:.231},LV:{2030:.204,2050:.149},HU:{2030:.241,2050:.187},ES:{2030:.199,2050:.129},DE:{2030:.339,2050:.228}},nutrition_5:{description:"I will switch to a vegan diet",formatted:"Switch to a vegan diet",SE:{2030:.437,2050:.289},LV:{2030:.255,2050:.187},HU:{2030:.302,2050:.234},ES:{2030:.248,2050:.162},DE:{2030:.424,2050:.285}},nutrition_7:{description:"I will eat only organic vegetables and fruits",formatted:"Switch to organic vegetables",SE:{2030:.006,2050:.005},LV:{2030:.002,2050:.001},HU:{2030:.001,2050:.001},ES:{2030:.006,2050:.004},DE:{2030:.004,2050:.003}},nutrition_8:{description:"I will eat only seasonal vegetables and fruits",formatted:"Switch to seasonal vegetables",SE:{2030:.004,2050:.003},LV:{2030:.002,2050:.001},HU:{2030:.001,2050:.001},ES:{2030:.004,2050:.003},DE:{2030:.002,2050:.002}},nutrition_9:{description:"I will eat only as much food as I need to stay healthy",formatted:"Avoid excess food consumption",SE:{2030:.148,2050:.103},LV:{2030:.1,2050:.09},HU:{2030:.091,2050:.064},ES:{2030:.14,2050:.097},DE:{2030:.154,2050:.111}},leisure_1:{description:"I will get a small(er) pet, if I get a new one",formatted:"Choose a smaller pet",SE:{2030:.016,2050:.01},LV:{2030:.012,2050:.008},HU:{2030:.012,2050:.007},ES:{2030:.007,2050:.004},DE:{2030:.019,2050:.011}},leisure_2:{description:"I will buy pet food with a smaller carbon footprint",formatted:"Choose sustainable pet food",SE:{2030:.001,2050:-0},LV:{2030:.001,2050:-0},HU:{2030:.001,2050:.001},ES:{2030:-0,2050:-0},DE:{2030:.002,2050:.001}}},p={SE:"Sweden",LV:"Latvia",HU:"Hungary",ES:"Spain",DE:"Germany"},m={Sweden:"SE",Latvia:"LV",Hungary:"HU",Spain:"ES",Germany:"DE"},c=[];for(const a of Object.values(h))c.push(a.formatted);let l=["#0ab1b1","#f7941d","#f15a22","#0082c9"];class _{constructor(t,e,i,r){o(this,"marginTop",40);o(this,"marginRight",30);o(this,"marginBottom",35);o(this,"marginLeft",200);o(this,"width_factor",.7);o(this,"bar_height",20);o(this,"bar_padding",2);o(this,"bucket_padding",10);this.data=t,this.year=e,this.country=i,this.country_code=m[this.country],this.show_base=r,this.v_scale=this.vertical_scale(this.sorted_options()),this.h_scale=this.horizontal_scale(this.max_x()),this.clear(),this.draw(),window.addEventListener("resize",n=>{this.set_width(window.innerWidth*.7)})}sorted_options(){let t=[];for(const i in this.data)i.startsWith("base")||t.push([i,this.data[i][this.country_code][this.year]]);t.sort(function(i,r){return i[1]-r[1]});let e=[];for(const i of t)e.push(this.data[i[0]].formatted);return this.show_base&&(e=[this.data.base_2.formatted,...e,this.data.base_1.formatted]),e}clear(){this.svg=s.select("#graph"),this.svg.selectAll("*").remove(),s.select(".fixed-bottom").selectAll("*").remove()}draw(){this.svg.attr("width","100%"),this.svg.attr("height",this.height()),this.svg.append("g").attr("transform",`translate(${this.marginLeft},0)`).call(s.axisLeft(this.v_scale)),s.select(".fixed-bottom").append("g").attr("transform","translate(0, 10)").call(s.axisBottom(this.h_scale)),s.select(".fixed-bottom").append("text").attr("class","x-axis-title").attr("text-anchor","end").attr("x",this.h_scale(this.max_x())).attr("y",42).text("Emissions (tCO₂e yr⁻¹ per capita)"),this.draw_practices(),this.draw_seeker_line()}max_x(){let t=[];for(const[i,r]of Object.entries(this.data)){if(!this.show_base&&i.startsWith("base"))continue;const n=r[this.country_code];t.push(n[this.year])}const e=Math.max(...t);return e+e*.2}height(){return c.length*(this.bar_height+this.bar_padding*2)+this.bucket_padding*2+this.marginBottom+this.marginTop}width(){let t=document.body.clientWidth;return t>800&&(t=t*this.width_factor),t}horizontal_scale(t){const e=s.scaleLinear();return e.domain([0,t]),e.range([this.marginLeft,this.width()-this.marginRight]),e}vertical_scale(t){const e=s.scaleBand();return e.domain(t),e.range([this.height()-this.marginBottom,this.marginTop]),e}draw_practices(){this.svg.selectAll(".yearbar.year"+this.year).data(Object.keys(this.data)).enter().append("rect").attr("class",".yearbar.year"+this.year).attr("x",this.marginLeft+1).attr("y",this.get_bar_y.bind(this)).attr("width",t=>this.h_scale(this.data[t][this.country_code][this.year])-this.marginLeft).attr("height",this.bar_height).attr("fill",t=>t.startsWith("base")?l[3]:l[0]).on("mouseover",(t,e)=>this.cb_bar_mouseover(e)).on("mouseout",this.cb_bar_mouseout.bind(this))}draw_seeker_line(){this.svg.append("line").attr("id","seeker_line").attr("x1",-500).attr("x2",-500).attr("y1",this.marginTop).attr("y2",this.svg.node().getBoundingClientRect().height-this.marginBottom).attr("stroke","black").attr("stroke-width",1)}move_seeker_line(t){s.select("#seeker_line").attr("x1",t).attr("x2",t)}get_bar_y(t){const e=this.data[t].formatted,i=this.v_scale(e)+this.bucket_padding+this.bar_padding-this.bar_height/2;return isNaN(i)?-100:i}set_width(t){this.h_scale=this.horizontal_scale(this.max_x()),this.clear(),this.draw()}cb_bar_mouseover(t){const e=s.select("#tooltip"),i=this.h_scale(this.data[t][this.country_code][this.year]),r=`
    ${this.data[t].formatted}: </br>
    <b>${this.data[t][this.country_code][this.year]} tCO₂e yr⁻¹ per capita</b> </br>
    ${this.year}
    `;window.innerWidth<800?e.html(r).style("right",this.marginRight+"px").style("bottom",this.marginBottom+10+"px").style("top","unset").style("left","unset").style("opacity","1").style("position","fixed"):e.html(r).style("left",i+20+"px").style("top",this.get_bar_y(t,this.year,this.country)+"px").style("right","unset").style("bottom","unset").style("opacity",1).style("position","absolute"),this.move_seeker_line(i)}cb_bar_mouseout(){s.select("#tooltip").style("top","-500px").style("opacity",0),this.move_seeker_line(-100)}}class f{constructor(){this.menu=document.getElementById("menu"),this.countries_el=document.getElementById("countries"),this.years_el=document.getElementById("years"),this.base_el=document.getElementById("base"),this.country="Sweden",this.practices=[],this.year="2030",this.label="Avoided emissions (tCO₂e yr⁻¹ per capita)",this.base=!0,this.setup_countries()}build_graph(){new _(h,this.year,this.country,this.base),this.setup_countries(),this.setup_years(),this.setup_baseline()}setup_countries(){this.countries_el.innerHTML="";for(let t of Object.values(p)){const e=document.createElement("button");e.innerHTML=t,e.className="countrybutton",this.country==t?(e.style["background-color"]="#f7941d",e.active=!0):(e.style["background-color"]="white",e.active=!1),e.onclick=this.cb_country_onclick.bind(this),this.countries_el.appendChild(e)}}cb_country_onclick(t){t.target.innerHTML!=this.country&&(this.country=t.target.innerHTML),this.build_graph()}setup_years(){this.years_el.childNodes.forEach(t=>{t.nodeName=="DIV"&&(this.year==t.innerHTML?t.style["background-color"]="#f15a22":t.style["background-color"]="white",t.onclick=this.cb_year_onclick.bind(this))})}cb_year_onclick(t){const e=t.target;this.year!=e.innerHTML&&(this.year=e.innerHTML,this.build_graph())}setup_baseline(){this.base?this.base_el.setAttribute("class","black"):this.base_el.setAttribute("class",""),this.base_el.onclick=this.cb_baseline_onclick.bind(this)}cb_baseline_onclick(t){this.base?this.base=!1:this.base=!0,this.build_graph()}}const g=new f;g.build_graph();
