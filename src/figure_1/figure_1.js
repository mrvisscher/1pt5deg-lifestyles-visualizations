import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { figure_1 } from "./data/figure_1";
import { region_codes } from "./data/region_codes";


const years = ["2015", "2020", "2025", "2030", "2035", "2040", "2045", "2050"]

const year_colors = {
  2015: "#0ab1b1",
  2020: "#336464",
  2025: "#00428B",
  2030: "#f7941d",
  2035: "#676BFB",
  2040: "#8641FA",
  2045: "#2FAB64",
  2050: "#f15a22",
}

const regions = [];

for (let i = 0; i < figure_1.length; i++){
  regions.push(figure_1[i].region)
}


class Graph { 
  marginTop = 40;
  marginRight = 30;
  marginBottom = 35;
  marginLeft = 40;

  width_factor = 0.7;

  bar_height = 5;
  bar_padding = 2;
  bucket_padding = 3;

  constructor(years, regions){
    this.years = years
    this.regions = regions

    this.v_scale = this.vertical_scale(this.regions)
    this.h_scale = this.horizontal_scale(20)

    this.clear()
    this.draw()

    window.addEventListener("resize", (event) => {this.set_width(window.innerWidth * 0.7)})

  }

  clear(){
    // clear the old graph (if present)
    this.svg = d3.select("#graph")
    this.svg.selectAll('*').remove()
    d3.select(".fixed-bottom").selectAll('*').remove()
  }

  draw(){
    this.svg.attr("width", "100%")
    this.svg.attr("height", this.height())

    // adding the y axis
    this.svg.append("g")
      .attr("transform", `translate(${this.marginLeft},0)`)
      .call(d3.axisLeft(this.v_scale));

    // adding the x-axis
    d3.select(".fixed-bottom")
      .append("g")
      .attr("transform", "translate(0, 10)")
      .call(d3.axisBottom(this.h_scale));
    
    // adding the title for the axis
    d3.select(".fixed-bottom")
      .append("text")
      .attr("class", "x-axis-title")
      .attr("text-anchor", "end")
      .attr("x", this.h_scale(20))
      .attr("y", 42)
      .text("Emissions (tCO₂e yr⁻¹ per capita)");
    
    this.svg.append("line")
      .attr("id", "2030-target")
      .attr("x1", this.h_scale(2.38))
      .attr("x2", this.h_scale(2.38))
      .attr("y1", 0)
      .attr("y2", this.height() - this.marginBottom)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
    
    this.svg.append("line")
      .attr("id", "2050-target")
      .attr("x1", this.h_scale(0.61))
      .attr("x2", this.h_scale(0.61))
      .attr("y1", 15)
      .attr("y2", this.height() - this.marginBottom)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
  
    // setup the bars for each year
    this.years.forEach(year => this.draw_year(year))

    d3.select("#target-title-2030")
      .attr("style", `left:${this.h_scale(2.38)}px;`);
    
    d3.select("#target-title-2050")
      .attr("style", `left:${this.h_scale(0.61)}px;`);

    // setup the seeker line
    this.draw_seeker_line()
  }

  height(){
    return this.regions.length * this.years.length * (this.bar_height + this.bar_padding * 2) + 
    this.regions.length * this.bucket_padding * 2 +
    this.marginBottom + 
    this.marginTop 
  }

  width(){
    let width = document.body.clientWidth
    if (width > 800){width = width * this.width_factor}

    return width
  }

  horizontal_scale(maximum){
    const scale = d3.scaleLinear()
    scale.domain([0, maximum])
    scale.range([this.marginLeft, this.width() - this.marginRight]);

    return scale
  }

  vertical_scale(regions){
    const scale = d3.scaleBand()
    scale.domain(regions)
    scale.range([this.height() - this.marginBottom, this.marginTop])

    return scale
  }

  draw_year(year){
    this.svg.selectAll(".bar.bar" + year)
      .data(figure_1)
      .enter()
      .append("rect")
      .attr("class", "bar bar" + year)
      .attr("x", this.marginLeft)
      .attr("y", this.get_bar_y.bind(this, year))
      .attr("width", d => this.h_scale(d[year]) - this.marginLeft)
      .attr("height", this.bar_height)
      .attr("fill", year_colors[year])
      .on("mouseover", this.cb_bar_mouseover.bind(this, year))
      .on("mouseout", this.cb_bar_mouseout.bind(this));
  }

  draw_seeker_line(){
    this.svg.append("line")
      .attr("id", "seeker_line")
      .attr("x1", -500)
      .attr("x2", -500)
      .attr("y1", this.marginTop)
      .attr("y2", this.height() - this.marginBottom)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
  }

  move_seeker_line(x){
    d3.select("#seeker_line")
    .attr("x1", x)
    .attr("x2", x)
  }

  get_bar_y(year, data){
    const index = this.years.findIndex(el => el == year)
    const y = this.v_scale(data.region) + this.bucket_padding + this.bar_padding + (index * (this.bar_height + 2 * this.bar_padding))
    if(isNaN(y)){return -100}
    return y
  }

  set_width(width){
    this.h_scale = this.horizontal_scale(20)

    this.clear()
    this.draw()

  }

  cb_bar_mouseover(year, event, data){
    const tooltip = d3.select("#tooltip");
    const bar_edge = this.marginLeft + this.h_scale(data[year]) - this.marginLeft

    const html = "Region: " + region_codes[data["region"]] + "<br>Year: " + year + "<br>Value: " + data[year] + " tCO₂e/cap"

    if (window.innerWidth < 800){
      tooltip.html(html)
        .style("right", this.marginRight + "px")
        .style("bottom", this.marginBottom + 10 + "px")
        .style("top", "unset")
        .style("left", "unset")
        .style("opacity", "1")
        .style("position", "fixed")
    }
    else {
      tooltip.html(html)
      .style("left", bar_edge + 20 + "px")
      .style("top", this.get_bar_y(year, data) + "px")
      .style("right", "unset")
      .style("bottom", "unset")
      .style("opacity", 1)
      .style("position", "absolute")
    }

    this.move_seeker_line(bar_edge)
  }

  cb_bar_mouseout(){
    const tooltip = d3.select("#tooltip");
    tooltip.style("top", "-500px").style("opacity", 0)

    this.move_seeker_line(-100)
  }

}

class Menu {
  constructor(){
    this.menu = document.getElementById("menu")
    this.countries_el = document.getElementById("countries")
    this.years_el = document.getElementById("years")

    this.select_all_el = document.getElementById("select_all")
    this.deselect_all_el = document.getElementById("deselect_all")

    this.select_all_el.onclick = this.select_countries.bind(this)
    this.deselect_all_el.onclick = this.deselect_countries.bind(this)

    this.setup_countries(regions)
    this.setup_years(["2015", "2030", "2050"])
  }

  build_graph(){
    let sorted_countries = []

    for(const child of this.countries_el.getElementsByClassName("countrybutton")){
      if(child.active){
        sorted_countries.push(child.region)
      }
    }

    let countries = regions.filter((region) => sorted_countries.includes(region))

    let years = []

    this.years_el.childNodes.forEach(function(child){
      if(child.active){
        years.push(child.innerHTML)
      }
    })
    new Graph(years, countries)
  }

  setup_countries(enabled_countries){
    for (let i = 0; i < regions.length; i++){
      const button = document.createElement("button")
      button.region = Object.keys(region_codes)[i]
      button.innerHTML = region_codes[button.region]
      button.className = "countrybutton"

      if (enabled_countries.includes(button.region)){
        button.style["background-color"] = "#f7941d"
        button.active = true
      }
      else {
        button.style["background-color"] = "beige"
        button.active = false
      }

      button.onclick = this.cb_country_onclick.bind(this)
      this.countries_el.insertBefore(button, document.getElementById("country_divider"))
    }
  }

  cb_country_onclick(event){
    if(event.target.active){
      event.target.active = false
      event.target.style["background-color"] = "beige"
    }
    else{
      event.target.active = true
      event.target.style["background-color"] = "#f7941d"
    }
  
    this.build_graph()
  }

  setup_years(enabled_years){
    for (let i = 0; i < years.length; i++){
      const button = document.createElement("button")
      button.innerHTML = years[i]

      if (enabled_years.includes(button.innerHTML)){
        button.style["background-color"] = year_colors[years[i]]
        button.active = true
      }
      else {
        button.style["background-color"] = "beige"
        button.active = false
      }

      button.onclick = this.cb_year_onclick.bind(this)
      this.years_el.appendChild(button)
    }
  }

  cb_year_onclick(event){
    if(event.target.active){
      event.target.active = false
      event.target.style["background-color"] = "beige"
    }
    else{
      event.target.active = true
      event.target.style["background-color"] = year_colors[event.target.innerHTML]
    }
  
    this.build_graph()
  }

  select_countries(){
    for(const child of this.countries_el.getElementsByClassName("countrybutton")){
      child.active = true
      child.style["background-color"] = "#EEAC20"
    }
    this.build_graph()
  }

  deselect_countries(){
    for(const child of this.countries_el.getElementsByClassName("countrybutton")){
      child.active = false
      child.style["background-color"] = "beige"
    }
    this.build_graph()
  }
}

const menu = new Menu()
menu.build_graph()

