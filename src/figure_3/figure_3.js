import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { figure_3 } from "./data/figure_3";

const countries = {
  SE: "Sweden",
  LV: "Latvia",
  HU: "Hungary",
  ES: "Spain",
  DE: "Germany",
}

const countries_inv = {
  "Sweden": "SE",
  "Latvia": "LV",
  "Hungary": "HU",
  "Spain": "ES", 
  "Germany": "DE"
}

const formatted_options = []

for (const opt of Object.values(figure_3)){
  formatted_options.push(opt.formatted)
}

let colors = ["#0ab1b1", "#f7941d", "#f15a22", "#0082c9"]


class Graph { 
  marginTop = 40
  marginRight = 30;
  marginBottom = 35;
  marginLeft = 200;

  width_factor = 0.7;

  bar_height = 20;
  bar_padding = 2;
  bucket_padding = 10;

  constructor(data, year, country, show_base){
    this.data = data
    this.year = year
    this.country = country
    this.country_code = countries_inv[this.country]
    this.show_base = show_base

    this.v_scale = this.vertical_scale(this.sorted_options())
    this.h_scale = this.horizontal_scale(this.max_x())

    this.clear()
    this.draw()

    window.addEventListener("resize", (event) => {this.set_width(window.innerWidth * 0.7)})

  }

  sorted_options(){
    let sortable = []
    for (const option in this.data) {
      if (option.startsWith("base")){continue}

      sortable.push([option, this.data[option][this.country_code][this.year]]);
    }
    sortable.sort(function(a, b) {
      return a[1] - b[1];
    });

    let sorted = []

    for (const option of sortable) {
      sorted.push(this.data[option[0]].formatted)
    }

    if (this.show_base){sorted = [this.data["base_2"].formatted, ...sorted, this.data["base_1"].formatted]}

    return sorted
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
      .attr("x", this.h_scale(this.max_x()))
      .attr("y", 42)
      .text("Emissions (tCO₂e yr⁻¹ per capita)");
  
    // setup the bars for each year
    this.draw_practices()
    this.draw_seeker_line()

  }

  max_x(){
    let values = []
    for (const [practice, data] of Object.entries(this.data) ){
      if(!this.show_base && practice.startsWith("base")){continue}
      const country_data = data[this.country_code]
      values.push(country_data[this.year])
    }
    const max = Math.max(...values)
    return max + max * 0.2
  }

  height(){
    return formatted_options.length * (this.bar_height + this.bar_padding * 2) + 
    this.bucket_padding * 2 +
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

  draw_practices(){
    this.svg.selectAll(".yearbar.year" + this.year)
        .data(Object.keys(this.data))
        .enter()
        .append("rect")
        .attr("class", ".yearbar.year" + this.year)
        .attr("x", this.marginLeft + 1)
        .attr("y", this.get_bar_y.bind(this))
        .attr("width", practice => this.h_scale(this.data[practice][this.country_code][this.year]) - this.marginLeft)
        .attr("height", this.bar_height)
        .attr("fill", practice => {if(practice.startsWith("base")){return colors[3]} else{return colors[0]}})
        .on("mouseover", (ev, practice) => this.cb_bar_mouseover(practice))
        .on("mouseout", this.cb_bar_mouseout.bind(this));
    return
  }

  draw_seeker_line(){
    this.svg.append("line")
      .attr("id", "seeker_line")
      .attr("x1", -500)
      .attr("x2", -500)
      .attr("y1", this.marginTop)
      .attr("y2", this.svg.node().getBoundingClientRect().height - this.marginBottom)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
  }

  move_seeker_line(x){
    d3.select("#seeker_line")
    .attr("x1", x)
    .attr("x2", x)
  }


  get_bar_y(practice){
    const name = this.data[practice]["formatted"]

    const y = this.v_scale(name) + 
      this.bucket_padding + 
      this.bar_padding -
      this.bar_height / 2

    if(isNaN(y)){return -100}
    return y
  }

  set_width(width){
    this.h_scale = this.horizontal_scale(this.max_x())

    this.clear()
    this.draw()

  }

  cb_bar_mouseover(practice){
    const tooltip = d3.select("#tooltip");
    const bar_edge = this.h_scale(this.data[practice][this.country_code][this.year])

    const html = `
    ${this.data[practice].formatted}: </br>
    <b>${this.data[practice][this.country_code][this.year]} tCO\u2082e yr\u207b\u00b9 per capita</b> </br>
    ${this.year}
    `

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
      .style("top", this.get_bar_y(practice, this.year, this.country) + "px")
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
    this.base_el = document.getElementById("base")

    this.country = "Sweden"
    this.practices = []
    this.year = "2030"
    this.label = "Avoided emissions (tCO₂e yr⁻¹ per capita)"
    this.base = true


    this.setup_countries()
  }

  build_graph(){
    new Graph(figure_3, this.year, this.country, this.base)
    this.setup_countries()
    this.setup_years()
    this.setup_baseline()
  }

  setup_countries(){
    this.countries_el.innerHTML = ""

    for (let country of Object.values(countries)){
      const button = document.createElement("button")
      button.innerHTML = country
      button.className = "countrybutton"

      if (this.country == country){
        button.style["background-color"] = "#f7941d"
        button.active = true
      }
      else {
        button.style["background-color"] = "white"
        button.active = false
      }

      button.onclick = this.cb_country_onclick.bind(this)
      this.countries_el.appendChild(button)
    }
  }

  cb_country_onclick(event){
    if(event.target.innerHTML != this.country){
      this.country = event.target.innerHTML
    }
 
    this.build_graph()
  }

  setup_years(){
    this.years_el.childNodes.forEach(node => {
      if (node.nodeName != "DIV"){return}
      if (this.year == node.innerHTML){
        node.style["background-color"] = "#f15a22"
      }
      else {
        node.style["background-color"] = "white"
      }
      node.onclick = this.cb_year_onclick.bind(this)
    })
  }

  cb_year_onclick(event){
    const node = event.target
    if (this.year == node.innerHTML){
      return
    }
    this.year = node.innerHTML

    this.build_graph()
  }

  setup_baseline(){
    if (this.base){
      this.base_el.setAttribute("class", "black")
    }
    else {
      this.base_el.setAttribute("class", "")
    }

    this.base_el.onclick = this.cb_baseline_onclick.bind(this)
  }

  cb_baseline_onclick(event){
    if (this.base){
      this.base = false
    }
    else {
      this.base = true
    }
    this.build_graph()
  }


}

const menu = new Menu()
menu.build_graph()

