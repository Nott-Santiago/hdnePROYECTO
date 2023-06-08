# Importa la biblioteca 'r2d3'
library(r2d3)

# Define la función de dibujo que ejecutará el código R
draw <- function(data, options) {
  # Llama a la función 'r2d3' para crear la visualización de barras
  r2d3(data, options, code = "
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = width - margin.left - margin.right;
    const height = height - margin.top - margin.bottom;

    const svg = d3.select(container).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.category));

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, d => d.value)]);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'steelblue');
  ")
}

# Llama a la función 'draw' pasando los datos y opciones necesarios
draw(r2d3.data(), r2d3.options())
