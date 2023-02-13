import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import * as d3 from 'd3'

const ChartOverall = (props) => {
  var  values  = props.values
  var titles = props.titles
  //console.log(values)
  const svgRef = useRef();
  values =  values?.map(function(str) {
    return parseInt(str); });

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      drawChart(svg);
    }
  }, [svgRef, values]);

  const drawChart = (svg) => {
    var margin = { top: 50, right: 70, bottom: 80, left: 70 },
      width =
        450,
      height = 450;

    ////////////////////////// Data //////////////////////////////

    var chart_data = [
      [
        //Tsircon
        { axis: "Resistenz", value: 65 },
        { axis: "Globalität / Lokalität", value: 39 },
        { axis: "Agilität und Flexibilität", value: 43 },
        { axis: "Technologie, Medien und", value: 50 },
        { axis: "Wissen, lernen, verstehen", value: 60 },
        { axis: "Globale Lage", value: 52 },
        
      ],
      [
        //Tsircon
        { axis: "Resistenz", value: 65 },
        { axis: "Globalität / Lokalität", value: 39 },
        { axis: "Agilität und Flexibilität", value: 43 },
        { axis: "Technologie, Medien und", value: 50 },
        { axis: "Wissen, lernen, verstehen", value: 60 },
        { axis: "Globale Lage", value: 52 },
        
      ]     
    ];
    //////////////////// Draw the Chart //////////////////////////
    const values = props.values || [];
    const values_benchmark = props.values_benchmark || [];
    for (var i = 0; i < chart_data[0].length; i++) {
      if(titles[i]){
          chart_data[0][i].axis = titles[i];
      }
    }
  for (var i = 0; i < chart_data[0].length; i++) {
    if(values[i]){
       chart_data[0][i].value = values[i] * 10;
    }
  }
  for (var i = 0; i < chart_data[1].length; i++) {
    if(values_benchmark[i]){
       chart_data[1][i].value = values_benchmark[i] * 100;
    }
  }
    //console.log(chart_data)
    var color = d3.scaleBand().range(["#0072C6", "#CC333F", "#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      levels: 5,
      roundStrokes: false,
      color: d3.scaleOrdinal(d3.schemeCategory10),
      color_circle: d3.scaleOrdinal(d3.schemeCategory10)
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", chart_data, radarChartOptions);

    function RadarChart(id, chart_data, options) {
      var cfg = {
        w: 600, //Width of the circle
        h: 600, //Height of the circle
        margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
        levels: 3, //How many levels or inner circles should there be drawn
        maxValue: 100, //What is the value that the biggest circle will represent
        labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, //The opacity of the area of the blob
        dotRadius: 4, //The size of the colored circles of each blog
        opacityCircles: 0.1, //The opacity of the circles of each blob
        strokeWidth: 2, //The width of the stroke around each blob
        roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleBand(d3.schemeCategory10) //Color function
      };

      //Put all of the options into a variable called cfg
      if ("undefined" !== typeof options) {
        for (var i in options) {
          if ("undefined" !== typeof options[i]) {
            cfg[i] = options[i];
          }
        } //for i
      } //if

      //If the supplied maxValue is smaller than the actual one, replace by the max in the chart_data
      //console.log(cfg.maxValue)
      //var maxValue = Math.max(cfg.maxValue, d3.max(chart_data, function (i) { return d3.max(i.map(function (o) {console.log(o) return o.value;}));}));
      //console.log(maxValue)
      var maxValue =100
      var allAxis = chart_data[0].map(function (i, j) {
          return i.axis;
        }), //Names of each axis
        total = allAxis.length, //The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
        Format = d3.format(".0%"), //Percentage formatting
        angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

      //Scale for the radius
      var rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

      //////////// Create the container SVG and g /////////////

      //Remove whatever chart with the same id/class was present before

      svg.selectAll("*").remove();

      //Initiate the radar chart SVG
      svg
        .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
        .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
        .attr("class", "radar" + id);

      //Append a g element
      var g = svg
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (cfg.w / 2 + cfg.margin.left) +
            "," +
            (cfg.h / 2 + cfg.margin.top) +
            ")"
        );

      ////////// Glow filter ///////////

      //Filter for the outside glow
      var filter = g.append("defs").append("filter").attr("id", "glow"),
        feGaussianBlur = filter
          .append("feGaussianBlur")
          .attr("stdDeviation", "2.5")
          .attr("result", "coloredBlur"),
        feMerge = filter.append("feMerge"),
        feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
        feMergeNode_2 = feMerge
          .append("feMergeNode")
          .attr("in", "SourceGraphic");

      /////////////// Draw the Circular grid //////////////////

      //Wrapper for the grid & axes
      var axisGrid = g.append("g").attr("class", "axisWrapper");

      //Draw the background circles
      axisGrid
        .selectAll(".levels")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", function (d, i) {
          return (radius / cfg.levels) * d;
        })
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles)
        .style("filter", "url(#glow)");

      //Text indicating at what % each level is
      axisGrid
        .selectAll(".axisLabel")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", function (d) {
          return (-d * radius) / cfg.levels;
        })
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#0072C6")
        .text(function (d, i) {
          return Format((maxValue * d/100) / cfg.levels);
        });

      //////////////////// Draw the axes //////////////////////

      //Create the straight lines radiating outward from the center
      var axis = axisGrid
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");
      //Append the lines
      axis
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d, i) {
          return (
            rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
          );
        })
        .attr("y2", function (d, i) {
          return (
            rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
          );
        })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

      //Append the labels at each axis
      axis
        .append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", function (d, i) {
          return (
            rScale(maxValue * cfg.labelFactor) *
            Math.cos(angleSlice * i - Math.PI / 2)
          );
        })
        .attr("y", function (d, i) {
          return (
            rScale(maxValue * cfg.labelFactor) *
            Math.sin(angleSlice * i - Math.PI / 2)
          );
        })
        .text(function (d) {
          return d;
        })
        .call(wrap, cfg.wrapWidth);

      

      

      
      /////////////////////////////////////////////////////////
      ///////////// Draw the radar chart blobs ////////////////
      /////////////////////////////////////////////////////////
      //The radial line function
      var radarLine = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(function (d, i) { return rScale(d.value); })
      .angle(function (d, i) { return i * angleSlice; });
      if (cfg.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed);
      }

    
      //Create a wrapper for the blobs
      var blobWrapper = g
        .selectAll(".radarWrapper")
        .data(chart_data)
        .enter()
        .append("g")
        .attr("class", "radarWrapper");

      //Append the backgrounds
      blobWrapper
        .append("path")
        .attr("class", "radarArea")
        .attr("d", function (d, i) {
          return radarLine(d);
        })
        .style("fill", function (d, i) {
          return cfg.color(i);
        })
        .style("fill-opacity", cfg.opacityArea)
        .on("mouseover", function (d, i) {
          //Dim all blobs
          d3.selectAll(".radarArea")
            .transition()
            .duration(200)
            .style("fill-opacity", 0.1);
          //Bring back the hovered over blob
          d3.select(this).transition().duration(200).style("fill-opacity", 0.7);
        })
        .on("mouseout", function () {
          //Bring back all blobs
          d3.selectAll(".radarArea")
            .transition()
            .duration(200)
            .style("fill-opacity", cfg.opacityArea);
        });

      //Create the outlines
      blobWrapper
        .append("path")
        .attr("class", "radarStroke")
        .attr("d", function (d, i) {
          return radarLine(d);
        })
        .style("stroke-width", cfg.strokeWidth + "px")
        .style("stroke", function (d, i) {
          return cfg.color(i);
        })
        .style("fill", "none")
        .style("filter", "url(#glow)");

      //Append the circles
      blobWrapper
        .selectAll(".radarCircle")
        .data(function (d, i) {
          return d;
        })
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", cfg.dotRadius)
        .attr("cx", function (d, i) {
          return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
          return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", function (d, i, j) {
          return cfg.color_circle(j);
        })
        .style("fill-opacity", 0.8);

      //////// Append invisible circles for tooltip ///////////

      //Wrapper for the invisible circles on top
      var blobCircleWrapper = g
        .selectAll(".radarCircleWrapper")
        .data(chart_data)
        .enter()
        .append("g")
        .attr("class", "radarCircleWrapper");

      //Append a set of invisible circles on top for the mouseover pop-up
      blobCircleWrapper
        .selectAll(".radarInvisibleCircle")
        .data(function (d, i) {
          return d;
        })
        .enter()
        .append("circle")
        .attr("class", "radarInvisibleCircle")
        .attr("r", cfg.dotRadius * 1.5)
        .attr("cx", function (d, i) {
          return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
          return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function (d, i) {
          let newX = parseFloat(d3.select(this).attr("cx")) - 10;
          let newY = parseFloat(d3.select(this).attr("cy")) - 10;

          tooltip
            .attr("x", newX)
            .attr("y", newY)
            .text(Format(i.value/100))
            .transition()
            .duration(200)
            .style("opacity", 1);
            
        })
        .on("mouseout", function () {
          tooltip.transition().duration(200).style("opacity", 0);
        });

      //Set up the small tooltip for when you hover over a circle
      var tooltip = g
        .append("text")
        .attr("class", "tooltip")
        .style("opacity", 0);

      /////////////////// Helper Function /////////////////////

      //Taken from http://bl.ocks.org/mbostock/7555321
      //Wraps SVG text
      function wrap(text, width) {
        text.each(function () {
          var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.4, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text
              .text(null)
              .append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", dy + "em");

          while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                .text(word);
            }
          }
        });
      } //wrap
    } //RadarChart
  };

  return (
    <svg width={600} height={600} ref={svgRef}>
    </svg>
  );
};

export default ChartOverall;