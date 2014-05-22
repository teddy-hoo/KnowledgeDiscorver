var Draw = function(){
	var that = this;
	this.data = null;
	this.margin = {
		top: 20,
		right: 80,
		bottom: 30,
		left: 50
	},
	this.width = 960 - this.margin.left - this.margin.right,
	this.height = 500 - this.margin.top - this.margin.bottom;

	this.parseDate = d3.time.format("%Y%m%d").parse;

	this.x = d3.time.scale()
		.range([0, this.width]);

	this.y = d3.scale.linear()
		.range([this.height, 0]);

	this.color = d3.scale.category10();

	this.xAxis = d3.svg.axis()
		.scale(this.x)
		.orient("bottom");

	this.yAxis = d3.svg.axis()
		.scale(this.y)
		.orient("left");

	this.line = d3.svg.line()
		.interpolate("basis")
		.x(function(d) {
			return that.x(d.time);
		})
		.y(function(d) {
			return that.y(d.temperature);
		});
	this.svg = null;
	this.cities = [];
};

Draw.prototype.setData = function(data){
	this.data = data;
};

Draw.prototype._createSVG = function(){
	if(this.svg === null){
		this.svg = d3.select("#canvas").append("svg")
		.attr("id", "chart")
		.attr("width", this.width + this.margin.left + this.margin.right)
		.attr("height", this.height + this.margin.top + this.margin.bottom)
		.append("g")
		.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
	}
};

Draw.prototype._prepareData = function(){
	var that = this;

	this.color.domain(d3.keys(this.data[0]).filter(function(key) {
		return key !== "time";
	}));

	this.data.forEach(function(d) {
		d.time = that.parseDate(d.time);
	});

	this.cities = this.color.domain().map(function(name) {
		return {
			name: name,
			values: that.data.map(function(d) {
				return {
					time: d.time,
					temperature: +d[name]
				};
			})
		};
	});

	this.x.domain(d3.extent(this.data, function(d) {
		return d.time;
	}));

	this.y.domain([
		d3.min(this.cities, function(c) {
			return d3.min(c.values, function(v) {
				return v.temperature;
			});
		}),
		d3.max(this.cities, function(c) {
			return d3.max(c.values, function(v) {
				return v.temperature;
			});
		})
	]);
};

Draw.prototype.render = function(){
	var that = this;
	this._createSVG();
	this._prepareData();
	this.svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + this.height + ")")
		.call(this.xAxis);

	this.svg.append("g")
		.attr("class", "y axis")
		.call(this.yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Temperature (ºF)");

	var city = this.svg.selectAll(".city")
		.data(this.cities)
		.enter().append("g")
		.attr("class", "city");

	city.append("path")
		.attr("class", "line")
		.attr("d", function(d) {
			return that.line(d.values);
		})
		.style("stroke", function(d) {
			return that.color(d.name);
		});

	city.append("text")
		.datum(function(d) {
			return {
				name: d.name,
				value: d.values[d.values.length - 1]
			};
		})
		.attr("transform", function(d) {
			return "translate(" + that.x(d.value.time) + "," + that.y(d.value.temperature) + ")";
		})
		.attr("x", 3)
		.attr("dy", ".35em")
		.text(function(d) {
			return d.name;
		});
};

Draw.prototype.change = function(){
	that = this;
	this._prepareData();
	var city = this.svg.selectAll(".city")
		.data(this.cities)
		.enter().append("g")
		.attr("class", "city").append("path")
		.attr("d", function(d) {
			return that.line(d.values);
		});

	// city.append("path")
		// .transition().duration(500)
		// .attr("class", "line")
		// .attr("d", function(d) {
		// 	return that.line(d.values);
		// });
		// .style("stroke", function(d) {
		// 	return that.color(d.name);
		// });

	city.append("text")
		.datum(function(d) {
			return {
				name: d.name,
				value: d.values[d.values.length - 1]
			};
		})
		.attr("transform", function(d) {
			return "translate(" + that.x(d.value.time) + "," + that.y(d.value.temperature) + ")";
		})
		.attr("x", 3)
		.attr("dy", ".35em")
		.text(function(d) {
			return d.name;
		});
	city.exit().remove();
};