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
import { StackProps, StackedDataDTO } from '@/type/Chart/Chart';

const StackedBarChart = ({ data }: StackProps) => {
  // svg 엘리먼트와 root 엘리먼트의 ref
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 창 크기 변경 감지 후 차트 그리기
  const size = useResize(rootRef);

  // 차트의 패딩
  const PADDING = 30;

  useEffect(() => {
    // 창 크기가 없거나 데이터가 없으면 그리지 않음
    if (!size || !data.length) {
      return;
    }
    // 차트의 너비와 높이
    const { width, height } = size;

    // svg 엘리먼트 선택
    const svg = select(svgRef.current);
    // svg 초기화
    svg.selectAll('*').remove();

    // 데이터의 키값 설정
    const keys = ['자유게시판', '질문게시판', '기타게시판'];
    const colors = ['#f99', '#99f', '#9f9'];

    // x 스케일 정의
    const xScale = scaleBand()
      .domain(data.map((d) => d.date))
      .range([PADDING, width - PADDING])
      .padding(0.1);

    // y 스케일 정의
    const yScale = scaleLinear()
      .domain([
        0,
        Math.ceil(
          Math.max(
            ...data.map((d) => keys.reduce((acc, key) => acc + ((d[key] as number) || 0), 0)),
          ) / 50,
        ) * 50,
      ])
      .range([height - PADDING, PADDING]);

    // x축 생성
    const xAxis = axisBottom(xScale).tickFormat((d) => (typeof d === 'string' ? d.slice(5) : ''));
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - PADDING})`)
      .call(xAxis);

    // y축 생성
    const yAxis = axisLeft(yScale).tickValues(range(0, Math.max(...yScale.domain()) + 1, 50));
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${PADDING},0)`)
      .call(yAxis);

    // 데이터 스택
    const stackedData = stack<StackedDataDTO>()
      .keys(keys)
      .order(stackOrderNone)
      .offset(stackOffsetNone)(data);

    // 레이어 생성
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
