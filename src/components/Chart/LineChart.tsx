import { useEffect, useRef } from 'react';
import {
  axisBottom,
  axisLeft,
  scaleLinear,
  scaleTime,
  select,
  line,
  curveLinear,
  timeParse,
  extent,
  max,
  timeFormat,
} from 'd3';
import { useResize } from '@/hooks/useResize';

interface Props {
  campaign: {
    date: string;
    count: number;
  }[];
}

const LineChart = ({ campaign }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const PADDING = 50;

  useEffect(() => {
    if (!size || !campaign.length) {
      return;
    }
    const { width, height } = size;

    const svg = select(svgRef.current);
    const parseDate = timeParse('%Y-%m-%d');
    const data = campaign.map((d) => ({ date: parseDate(d.date) as Date, count: d.count }));

    // scaleTime에는 패딩을 못줘서 따로 계산
    const xDomain = extent(data, (d) => d.date) as [Date, Date];
    const xDomainPadded = [
      new Date(xDomain[0].getTime() - (xDomain[1].getTime() - xDomain[0].getTime()) * 0.05),
      new Date(xDomain[1].getTime() + (xDomain[1].getTime() - xDomain[0].getTime()) * 0.05),
    ];

    const xScale = scaleTime()
      .domain(xDomainPadded)
      .range([PADDING, width - PADDING]);

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d.count) as number])
      .range([height - PADDING, PADDING]);

    const xAxis = axisBottom<Date>(xScale).tickFormat(timeFormat('%y.%m.%d'));
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translateY(${height - PADDING}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale).ticks(7);
    svg.select<SVGGElement>('.y-axis').style('transform', `translateX(${PADDING}px)`).call(yAxis);

    const lineGenerator = line<{ date: Date; count: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.count))
      .curve(curveLinear);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#f99')
      .attr('stroke-width', 2);

    svg
      .selectAll('.dot')
      .data(data)
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', (d) => yScale(d.count))
      .attr('r', 6)
      .attr('fill', '#f99');

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - PADDING - 100}, ${PADDING})`);

    legend.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 6).style('fill', '#f99');

    legend
      .append('text')
      .attr('x', 10)
      .attr('y', 0)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text('게시물 등록수');
  }, [campaign, size]);

  return (
    <div ref={rootRef} className="w-full h-64">
      <h2 className="font-bold">날짜별 게시글 등록 수</h2>
      <svg ref={svgRef} width={size.width} height={size.height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default LineChart;
