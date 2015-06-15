var dataset = [];
var numPoints = 100;
var numWaves = 4;
var i, o, p;
var q = 0;

for (i = 0; i < numPoints; i += 1) {
	p = i / (numPoints - 1) * 100;
	o = Math.PI * p * numWaves * 2;
	dataset.push({ percent: p, offset: o });
}

var svg = d3.select("#circles")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "700px");


var circles = svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d) {
		return d.percent + "%";
	})
	.attr("cy", "50%")
	.attr("r", "1%");

wave = function(d) {
if (q === 99) {q=0} else{q += 1;};

// q = q / 100;
console.log(q)
// console.log(d.percent)
  //Move to bottom
  d3.select(this)
    .transition()
    .duration(900)
    .attr("cy", "40%")
    .attr("fill", "hsl(" + (d.percent * 360) + ",100%,50%)")
    .attr("r", function(d) {
		return ((Math.sin(d.percent / 5) + 1.1) * 3) + "%";
	})
    .each("end", function() {

      //Move to top
      d3.select(this)
        .transition()
        .duration(900)
        .attr("cy", "70%")
        .attr("fill", function(d) {
        	console.log(q)
        	var color = "hsl(" + (360-(d.percent * 360)) + ",100%,50%)"
        	return color;
        })
        .attr("r", function(d) {
			return ((Math.sin(d.percent / 5) + 10.1) * 2) + "%";
		})
        .each("end", wave);

    });

};

d3.selectAll("circle")
  .transition()
  .delay(function(d, i) {
    return i * 50;
  })
  .duration(900)
  .attr("cy", "60%")
  .each("end", wave)