'use client';

import * as React from 'react';
import { addDays, addMonths, format, setMonth, setYear } from 'date-fns';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import '@/styles/customDatePicker.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CalendarIcon from '@/assets/CalendarIcon.svg';

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date(2024, 4, 9));

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth(setYear(currentMonth, newYear));
  };

  const handleMonthSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentMonth(setMonth(currentMonth, newMonth));
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const modifiers = {
    today: today,
    selected: date?.from && date?.to ? [date.from, date.to] : [],
    range_middle:
      date?.from && date?.to ? { from: date.from, to: date.to } : { from: today, to: today },
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] flex justify-between items-center text-left font-normal border-[#eee] rounded-lg',
              !date && 'text-muted-foreground',
            )}
          >
            <div className="flex items-center">
              {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
              <img src={CalendarIcon} alt="calendar" className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'yyyy/MM/dd')} - {format(date.to, 'yyyy/MM/dd')}
                  </>
                ) : (
                  format(date.from, 'yyyy/MM/dd')
                )
              ) : (
                <span>날짜 선택</span>
              )}
            </div>
            <ChevronDown className="ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 flex justify-between items-center">
            <select value={currentMonth.getFullYear()} onChange={handleYearChange} className="mr-2">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select value={currentMonth.getMonth()} onChange={handleMonthSelectChange}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month + 1}월
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleMonthChange(addMonths(currentMonth, -1))}>
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => handleMonthChange(addMonths(currentMonth, 1))}>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <Calendar
            key={currentMonth.toString()}
            initialFocus
            mode="range"
            defaultMonth={currentMonth}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1} // 한 달만 표시
            onMonthChange={handleMonthChange}
            locale={ko}
            captionLayout="dropdown-buttons"
            components={{
              Caption: () => null,
            }}
            className="day-picker"
            modifiers={modifiers}
            modifiersClassNames={{
              today: 'custom-today',
              selected: 'custom-selected',
              range_middle: 'custom-range-middle',
            }}
          />
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-2">빠른 선택</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setDate({ from: new Date(), to: new Date() })}
                className="text-sm border border-[#eee] rounded-xl px-2 py-0.5 bg-white"
              >
                오늘
              </button>
              <button
                onClick={() =>
                  setDate({ from: addDays(new Date(), 1), to: addDays(new Date(), 1) })
                }
                className="text-sm border border-[#eee] rounded-xl px-2 py-0.5 bg-white"
              >
                내일
              </button>
              <button
                onClick={() => setDate({ from: addDays(new Date(), -7), to: new Date() })}
                className="text-sm border border-[#eee] rounded-xl px-2 py-0.5 bg-white"
              >
                최근 1주일
              </button>
              <button
                onClick={() => setDate({ from: addDays(new Date(), -30), to: new Date() })}
                className="text-sm border border-[#eee] rounded-xl px-2 py-0.5 bg-white"
              >
                최근 30일
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
