import { useEffect, useRef } from 'react';
import { axisBottom, axisRight, scaleLinear, scalePoint, select, line, curveMonotoneX } from 'd3';
import { useResize } from '@/hooks/useResize';

interface Props {
  campaign: {
    date: string;
    people: number;
  }[];
}

const BlockChart = ({ campaign }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const PADDING = 30;

  useEffect(() => {
    if (!size || !campaign.length) {
      return;
    }
    const { width, height } = size;

    const svg = select(svgRef.current);
    const peopleData = campaign.map((d) => d.people);

    const xScale = scalePoint()
      .domain(campaign.map((_, i) => i.toString()))
      .range([PADDING, width - PADDING]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...peopleData)])
      .range([height - PADDING, PADDING]);

    const xAxis = axisBottom(xScale).tickFormat((_, i) => campaign[i].date);
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translateY(${height - PADDING}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale).ticks(7);
    svg
      .select<SVGGElement>('.y-axis')
      .style('transform', `translateX(${width - PADDING}px)`)
      .call(yAxis);

    const lineGenerator = line<{ index: number; people: number }>()
      .x((d) => xScale(d.index.toString()) ?? 0)
      .y((d) => yScale(d.people))
      .curve(curveMonotoneX); // Smooth the line

    svg
      .selectAll('.line')
      .data([campaign.map((d, i) => ({ index: i, people: d.people }))])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator as any)
      .attr('fill', 'none')
      .attr('stroke', '#f99') // Color of the line
      .attr('stroke-width', 2);

    svg
      .selectAll('.dot')
      .data(campaign.map((d, i) => ({ index: i, people: d.people })))
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.index.toString()) ?? 0)
      .attr('cy', (d) => yScale(d.people))
      .attr('r', 6) // Radius of the dots
      .attr('fill', '#f99'); // Color of the dots
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

export default BlockChart;
