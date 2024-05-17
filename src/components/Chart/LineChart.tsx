import { useEffect, useRef } from 'react';
import {
  axisBottom,
  axisLeft,
  scaleLinear,
  scalePoint,
  select,
  line,
  curveLinear,
  range,
} from 'd3';
import { useResize } from '@/hooks/useResize';

interface Props {
  campaign: {
    date: string;
    people: number;
  }[];
}

const LineChart = ({ campaign }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const margin = { top: 20, right: 30, bottom: 50, left: 50 };

  useEffect(() => {
    if (!size || !campaign.length) {
      return;
    }
    const { width, height } = size;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const peopleData = campaign.map((d) => d.people);

    const xScale = scalePoint()
      .domain(campaign.map((_, i) => i.toString()))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, Math.max(...peopleData)])
      .range([innerHeight, 0]);

    const xAxis = axisBottom(xScale).tickFormat((_, i) => campaign[i].date);
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${margin.top + innerHeight})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale).tickValues(range(0, Math.max(...yScale.domain()) + 1, 50));
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    const lineGenerator = line<{ index: number; people: number }>()
      .x((d) => xScale(d.index.toString()) ?? 0)
      .y((d) => yScale(d.people))
      .curve(curveLinear); // Straight lines

    svg
      .append('path')
      .datum(campaign.map((d, i) => ({ index: i, people: d.people })))
      .attr('class', 'line')
      .attr('d', lineGenerator as any)
      .attr('fill', 'none')
      .attr('stroke', '#f99') // Color of the line
      .attr('stroke-width', 2)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .selectAll('.dot')
      .data(campaign.map((d, i) => ({ index: i, people: d.people })))
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.index.toString()) ?? 0)
      .attr('cy', (d) => yScale(d.people))
      .attr('r', 6)
      .attr('fill', '#f99') // Color of the dots
      .attr('transform', `translate(${margin.left},${margin.top})`);
  }, [campaign, size]);

  return (
    <div ref={rootRef} className="w-full h-64">
      <svg ref={svgRef} width={size.width} height={size.height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default LineChart;
