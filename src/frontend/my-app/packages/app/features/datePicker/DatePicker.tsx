import {
  useDatePickerContext,
  type DatePickerProviderProps,
  type DPDay,
} from '@rehookify/datepicker'

import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, Button, H3, View } from 'tamagui'

import {
  DatePicker,
  DatePickerInput,
  HeaderTypeProvider,
  MonthPicker,
  YearPicker,
  YearRangeSlider,
  swapOnClick,
  useHeaderType,
  CalendarHeader,
  type HeaderType,
  WeekView,
} from './dateParts'
import { useDateAnimation } from './useDateAnimation'

function DateHeader() {
  const {
    data: { calendars },
    propGetters: { subtractOffset },
  } = useDatePickerContext()
  const { type: header, setHeader } = useHeaderType()
  const { year, month } = calendars[0]

  if (header === 'year') {
    return <YearRangeSlider />
  }

  if (header === 'month') {
    return (
      <H3 size="$7" alignSelf="center">
        Select a month
      </H3>
    )
  }
  return (
    <View flexDirection="row" w="100%" alignItems="center" justifyContent="space-between">
      <Button circular size="$4" {...swapOnClick(subtractOffset({ months: 1 }))}>
        <Button.Icon scaleIcon={1.5}>
          <ChevronLeft />
        </Button.Icon>
      </Button>

      <CalendarHeader year={year} month={month} setHeader={setHeader} />

      <Button circular size="$4" {...swapOnClick(subtractOffset({ months: -1 }))}>
        <Button.Icon scaleIcon={1.5}>
          <ChevronRight />
        </Button.Icon>
      </Button>
    </View>
  )
}

function DayPicker() {
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton },
  } = useDatePickerContext()

  const { days } = calendars[0]

  const { prevNextAnimation, prevNextAnimationKey } = useDateAnimation({
    listenTo: 'month',
  })

  // divide days array into sub arrays that each has 7 days, for better stylings
  const subDays = useMemo(
    () =>
      days.reduce((acc, day, i) => {
        if (i % 7 === 0) {
          acc.push([])
        }
        acc[acc.length - 1].push(day)
        return acc
      }, [] as DPDay[][]),
    [days]
  )

  return (
    <AnimatePresence key={prevNextAnimationKey}>
      <View w="100%" gap="$4" animation="medium" {...prevNextAnimation()}>
        <WeekView weekDays={weekDays} />

        <View flexDirection="column" gap="$2" ai="center" jc="center" w="100%">
          {subDays.map((days) => {
            return (
              <View
                jc="space-between"
                ai="center"
                flexDirection="row"
                key={days[0].$date.toString()}
                gap="$1"
                flex={1}
                w="100%"
              >
                {days.map((d) => (
                  <Button
                    key={d.$date.toString()}
                    chromeless
                    circular
                    padding={0}
                    {...swapOnClick(dayButton(d))}
                    backgroundColor={d.selected ? '$background' : 'transparent'}
                    themeInverse={d.selected}
                    disabled={!d.inCurrentMonth}
                  >
                    <Button.Text
                      fontWeight="500"
                      fontSize="$4"
                      color={
                        d.selected ? '$blue10' : d.inCurrentMonth ? '$blue10' : '$blue10'
                      }
                    >
                      {d.day}
                    </Button.Text>
                  </Button>
                ))}
              </View>
            )
          })}
        </View>
      </View>
    </AnimatePresence>
  )
}

function DatePickerBody({ config }: { config: DatePickerProviderProps['config'] }) {
  const [header, setHeader] = useState<HeaderType>('day')

  return (
    <HeaderTypeProvider config={config} type={header} setHeader={setHeader}>
      <View
        flexDirection="column"
        alignItems="center"
        gap="$4"
        w="100%"
        p="$4"
        $gtMd={{ p: '$2' }}
      >
        <DateHeader />
        {header === 'month' && <MonthPicker onChange={() => setHeader('day')} />}
        {header === 'year' && <YearPicker onChange={() => setHeader('day')} />}
        {header === 'day' && <DayPicker />}
      </View>
    </HeaderTypeProvider>
  )
}

/** ------ EXAMPLE ------ */
export function DatePickerExample({
  value,
  onChange,
}: {
  value: Date[]
  onChange: (dates: Date[]) => void
}) {
  const [selectedDates, onDatesChange] = useState<Date[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [value])

  const config: DatePickerProviderProps['config'] = {
    selectedDates: value,
    onDatesChange: onChange,
    calendar: {
      startDay: 1,
    },
  }


  return (
    <DatePicker keepChildrenMounted open={open} onOpenChange={setOpen} config={config}>
      <DatePicker.Trigger asChild>
        <DatePickerInput
          placeholder="Select Date"
          value={value[0]?.toDateString() || ''}
          onReset={() => onChange([])}
          onButtonPress={() => setOpen(true)}
        />
      </DatePicker.Trigger>

      <DatePicker.Content>
        <DatePicker.Content.Arrow />
        <DatePickerBody config={config} />
      </DatePicker.Content>
    </DatePicker>

  )
}


