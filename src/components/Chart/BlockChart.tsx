import { useEffect, useRef } from 'react';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import { useResize } from '@/hooks/useResize';
import { BlockChartDTO } from '@/type/Chart/Chart';

const TagPostsBlockChart = ({ data }: BlockChartDTO) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const PADDING = 50;

  useEffect(() => {
    if (!size || !data.length) {
      return;
    }
    const { width, height } = size;

    const svg = select(svgRef.current);
    const maxCount = Math.max(...data.map((d) => d.count));

    const xScale = scaleBand()
      .domain(data.map((d) => `#${d.tag}`))
      .range([PADDING, width - PADDING])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([0, maxCount])
      .range([height - PADDING, PADDING]);

    const xAxis = axisBottom(xScale);
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translateY(${height - PADDING}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale).ticks(7);
    svg.select<SVGGElement>('.y-axis').style('transform', `translateX(${PADDING}px)`).call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(`#${d.tag}`) ?? 0)
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - PADDING - yScale(d.count))
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
  }, [data, size]);

  return (
    <div ref={rootRef} className="w-full min-h-64 border border-[#eee] p-4">
      <h2 className="font-bold">해시태그별 게시글 등록 수</h2>
      <svg ref={svgRef} width={size.width} height={size.height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default TagPostsBlockChart;
