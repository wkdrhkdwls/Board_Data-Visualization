import { useEffect, useRef } from 'react';
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select,
  stack,
  stackOrderNone,
  stackOffsetNone,
  range,
} from 'd3';
import { useResize } from '@/hooks/useResize';

interface StackedData {
  date: string;
  자유게시판: number;
  질문게시판: number;
  기타게시판: number;
}

interface Props {
  data: StackedData[];
}

const StackedBarChart = ({ data }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const PADDING = 30;

  useEffect(() => {
    if (!size || !data.length) {
      return;
    }
    const { width, height } = size;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const keys = Object.keys(data[0]).slice(1);
    const colors = ['#f99', '#99f', '#9f9'];

    const xScale = scaleBand()
      .domain(data.map((d) => d.date))
      .range([PADDING, width - PADDING])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([
        0,
        Math.ceil(
          Math.max(
            ...data.map((d) =>
              Object.values(d)
                .slice(1)
                .reduce((a, b) => a + (b as number), 0),
            ),
          ) / 50,
        ) * 50,
      ])
      .range([height - PADDING, PADDING]);

    const xAxis = axisBottom(xScale).tickFormat((d) => (d as string).slice(5));
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - PADDING})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale).tickValues(range(0, Math.max(...yScale.domain()) + 1, 50));
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${PADDING},0)`)
      .call(yAxis);

    const stackedData = stack<StackedData>()
      .keys(keys)
      .order(stackOrderNone)
      .offset(stackOffsetNone)(data);

    svg
      .selectAll('.layer')
      .data(stackedData)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (_, i) => colors[i])
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => xScale(d.data.date) ?? 0)
      .attr('y', (d) => yScale(d[1]))
      .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
      .attr('width', xScale.bandwidth());

    // 범례 추가
    const legend = svg
      .selectAll('.legend')
      .data(keys)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => `translate(${width - PADDING - 300 + i * 100}, ${PADDING / 2})`);

    legend
      .append('circle')
      .attr('cx', 9)
      .attr('cy', 9)
      .attr('r', 9)
      .style('fill', (_, i) => colors[i]);

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d) => d);
  }, [data, size]);

  return (
    <div ref={rootRef} className="w-full min-h-64 border border-[#eee] p-4">
      <h2 className="font-bold">게시판별 게시글 등록 수</h2>
      <svg ref={svgRef} width={size.width} height={size.height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default StackedBarChart;
