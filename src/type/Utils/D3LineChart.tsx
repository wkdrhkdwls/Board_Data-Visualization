import { useEffect, useRef } from 'react';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import { useResize } from '@/hooks/useResize';

interface TagData {
  tag: string;
  count: number;
}

interface Props {
  data: TagData[];
}

const BarChart = ({ data }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const PADDING = 30;

  const groupDataByTag = (data: TagData[]) => {
    const groupedData: Record<string, number> = {};

    data.forEach((item) => {
      if (groupedData[item.tag]) {
        groupedData[item.tag] += item.count;
      } else {
        groupedData[item.tag] = item.count;
      }
    });

    return Object.keys(groupedData).map((tag) => ({
      tag,
      count: groupedData[tag],
    }));
  };

  useEffect(() => {
    if (!size || !data.length) {
      return;
    }

    const groupedData = groupDataByTag(data);

    const { width, height } = size;

    const svg = select(svgRef.current);
    const maxCount = Math.max(...groupedData.map((d) => d.count));

    const xScale = scaleBand()
      .domain(groupedData.map((d) => d.tag))
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
      .data(groupedData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.tag) ?? 0)
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - PADDING - yScale(d.count))
      .attr('fill', '#f99'); // Color of the bars
  }, [data, size]);

  return (
    <div ref={rootRef} className="w-full h-64">
      <svg ref={svgRef} width={size.width} height={size.height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;
