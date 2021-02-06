import * as d3 from 'd3';
import { useEffect } from 'react';

import { TransactionResponse, Transaction } from 'api';

type BalanceChartPropTypes = {
  data: TransactionResponse;
};

const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 900 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

export default ({ data }: BalanceChartPropTypes): JSX.Element => {
  useEffect(() => {

    d3.selectAll('#chartContainer > svg').remove();

    const svg = d3
      .select('#chartContainer')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.time) as number[])
      .range([0, width]);
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.result) as number[])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Add the scatter dots
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.time))
      .attr('cy', (d) => y(d.result))
      .attr('r', 5)
      .attr('fill', '#69b3a2');

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line<Transaction>()
          .x((d) => x(d.time))
          .y((d) => y(d.result)),
      );
  }, [data]);

  return <div id="chartContainer" />;
};
