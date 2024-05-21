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
import { LineChartDTO } from '@/type/Chart/Chart';

const DatePostsLineChart = ({ dateData }: LineChartDTO) => {
  // svg 엘리먼트와 root 엘리먼트의 ref
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 창 크기 변경 감지 후 차트 그리기
  const size = useResize(rootRef);

  // 차트의 패딩
  const PADDING = 50;

  useEffect(() => {
    // 창 크기가 없거나 데이터가 없으면 그리지 않음
    if (!size || !dateData.length) {
      return;
    }

    // 차트의 너비와 높이
    const { width, height } = size;

    // svg 엘리먼트 선택
    const svg = select(svgRef.current);

    // 날짜 데이터를 Date 객체로 변환
    const parseDate = timeParse('%Y-%m-%d');
    const data = dateData.map((d) => ({ date: parseDate(d.date) as Date, count: d.count }));

    // 전체 날짜 범위를 계산
    const [minDate, maxDate] = extent(data, (d) => d.date) as [Date, Date];

    // 모든 날짜를 포함한 새로운 데이터 생성
    const fullData = [];
    for (let dt = new Date(minDate); dt <= maxDate; dt.setDate(dt.getDate() + 1)) {
      const currentDate = new Date(dt);
      const currentDateString = currentDate.toISOString().split('T')[0];
      const existingData = data.find(
        (d) => d.date.toISOString().split('T')[0] === currentDateString,
      );
      fullData.push(existingData || { date: new Date(currentDate), count: 0 });
    }

    // scaleTime에는 패딩을 못줘서 따로 계산
    const xDomain = extent(fullData, (d) => d.date) as [Date, Date];
    const xDomainPadded = [
      new Date(xDomain[0].getTime() - (xDomain[1].getTime() - xDomain[0].getTime()) * 0.05),
      new Date(xDomain[1].getTime() + (xDomain[1].getTime() - xDomain[0].getTime()) * 0.05),
    ];

    // x 스케일 정의
    const xScale = scaleTime()
      .domain(xDomainPadded)
      .range([PADDING, width - PADDING]);

    // y 스케일 정의
    const yScale = scaleLinear()
      .domain([0, max(fullData, (d) => d.count) as number])
      .range([height - PADDING, PADDING]);

    // x축 생성
    const xAxis = axisBottom<Date>(xScale).tickFormat(timeFormat('%y.%m.%d'));
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translateY(${height - PADDING}px)`)
      .call(xAxis);

    // y축 생성
    const yAxis = axisLeft(yScale).ticks(7);
    svg.select<SVGGElement>('.y-axis').style('transform', `translateX(${PADDING}px)`).call(yAxis);

    // 라인 생성
    const lineGenerator = line<{ date: Date; count: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.count))
      .curve(curveLinear); // 직선으로 연결

    // 라인 그리기
    svg
      .selectAll('.line')
      .data([fullData])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#f99')
      .attr('stroke-width', 2);

    // 라인 위에 점 그리기
    svg
      .selectAll('.dot')
      .data(fullData)
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', (d) => yScale(d.count))
      .attr('r', 6)
      .attr('fill', '#f99');

    // 범례 추가
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
  }, [dateData, size]);

  return (
    <div ref={rootRef} className="w-full min-h-64 border border-[#eee] p-4">
      <h2 className="font-bold">날짜별 게시글 등록 수</h2>
      <svg ref={svgRef} width={size.width} height={size.height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default DatePostsLineChart;
