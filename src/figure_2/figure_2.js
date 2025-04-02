import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { figure_2 } from "./data/figure_2";

const countries = {
  SE: "Sweden",
  LV: "Latvia",
  HU: "Hungary",
  ES: "Spain",
  DE: "Germany",
}

let colors = ["#0ab1b1", "#f7941d", "#f15a22", "#0082c9"]


class Graph { 
  marginTop = 40;
  marginRight = 30;
  marginBottom = 35;
  marginLeft = 55;

  width_factor = 0.7;

  bar_height = 20;
  bar_padding = 2;
  bucket_padding = 10;

  constructor(year, practices){
    this.year = year
    this.practices = practices

    this.v_scale = this.vertical_scale(["Germany", "Spain", "Hungary", "Latvia", "Sweden"])
    this.h_scale = this.horizontal_scale(this.max_x())

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
    this.svg.attr("height", "100%")

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
      .text("Avoided emissions (tCO₂e yr⁻¹ per capita)");
  
    // setup the bars for each year
    this.practices.forEach(practice => this.draw_practice(practice))

    this.draw_seeker_line()

  }

  max_x(){
    let values = []
    for (const [practice, data] of Object.entries(figure_2) ){
      if (!this.practices.includes(practice)){continue}
      for (const val of Object.values(data[this.year])){values.push(val)}
    }
    const max = Math.max(...values)
    return max + max * 0.2
  }

  height(){
    return 5 * this.practices.length * (this.bar_height + this.bar_padding * 2) + 
    5 * this.bucket_padding * 2 +
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

  draw_practice(practice){
    this.svg.selectAll(".bar.bar" + practice)
      .data(["SE", "LV", "HU", "ES", "DE"])
      .enter()
      .append("rect")
      .attr("class", "bar bar" + practice)
      .attr("x", this.marginLeft + 1)
      .attr("y", this.get_bar_y.bind(this, practice))
      .attr("width", country => this.h_scale(figure_2[practice][this.year][country]) - this.marginLeft)
      .attr("height", this.bar_height)
      .attr("fill", colors[this.practices.findIndex(el => el == practice)])
      .on("mouseover", this.cb_bar_mouseover.bind(this, practice))
      .on("mouseout", this.cb_bar_mouseout.bind(this));
  }

  draw_seeker_line(){
    console.log(this.svg)
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


  get_bar_y(practice, country){
    const index = this.practices.findIndex(el => el == practice)
    const y = this.v_scale(countries[country]) + this.bucket_padding + this.bar_padding + (index * (this.bar_height + 2 * this.bar_padding))
    if(isNaN(y)){return -100}
    return y
  }

  set_width(width){
    this.h_scale = this.horizontal_scale(2)

    this.clear()
    this.draw()

  }

  cb_bar_mouseover(practice, event, country){
    const tooltip = d3.select("#tooltip");
    const bar_edge = this.h_scale(figure_2[practice][this.year][country])

    const html = `${figure_2[practice].formatted}: ${figure_2[practice][this.year][country]} tCO₂e yr⁻¹ per capita`

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
      .style("top", this.get_bar_y(practice, country) + "px")
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
    this.practices_el = document.getElementById("practices")
    this.years_el = document.getElementById("years")

    this.year = 2015
    this.practices = []


    this.setup_practices()
    this.setup_years()
  }

  build_graph(){
    new Graph(this.year, this.practices)
    this.setup_practices()
    this.setup_years()
  }

  setup_practices(){
    this.practices_el.innerHTML = ""
    for (const [practice, data] of Object.entries(figure_2) ){
      const button = document.createElement("div")
      button.practice = practice
      button.innerHTML = data.formatted
      button.className = "practicebutton"
      button.draggable = true

      if (this.practices.includes(practice)){
        button.style["background-color"] = colors[this.practices.findIndex(el => el == practice)]
        button.active = true
      }
      else if (this.practices.length == 4) {
        continue
      }
      else {
        button.style["background-color"] = "beige"
        button.active = false
      }

      button.onclick = this.cb_practice_onclick.bind(this)
      this.practices_el.appendChild(button)
    }
  }

  cb_practice_onclick(event){
    if(event.target.active){
      event.target.active = false
      const index = this.practices.indexOf(event.target.practice)
      this.practices.splice(index, 1)
      colors.push(colors.splice(index, 1)[0])
      event.target.style["background-color"] = "beige"
    }
    else if (this.practices.length == 4){return}
    else{
      event.target.active = true
      this.practices.push(event.target.practice)
      event.target.style["background-color"] = colors[this.practices.length - 1]
    }
  
    this.build_graph()
  }

  setup_years(){
    this.years_el.childNodes.forEach(node => {
      if (node.nodeName != "DIV"){return}
      if (node.innerHTML == this.year){
        node.style["background-color"] = "goldenrod"
      }
      else {
        node.style["background-color"] = "white"
        node.onclick = this.cb_year_onclick.bind(this)
      }
    })
  }

  cb_year_onclick(event){
    this.year = event.target.innerHTML  
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

