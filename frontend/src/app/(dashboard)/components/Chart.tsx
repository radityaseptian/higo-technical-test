'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { PieSectorDataItem } from 'recharts/types/polar/Pie'

import { LabelList, Pie, PieChart, Label, Sector } from 'recharts'

const chartConfigDevice = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

const chartConfig = {
  summary: {
    label: 'Customers',
  },
  data: {
    label: 'Data',
  },
} satisfies ChartConfig

const femaleFillColor = '#e625d5'
const maleFillColor = '#1d4cdb'

const deviceFillColors = [
  '#61ab0c',
  '#aba60c',
  '#ab290c',
  '#0ac6c9',
  '#330ac9',
  '#140e0f',
  '#0a2873',
  '#73686c',
  '#081c4a',
  '#31e0c0',
]

const HomeCart = () => {
  const [dateData, setDateData] = React.useState<{ [key: string]: any }[]>([])
  const [brandDeviceData, setBrandDeviceData] = React.useState<{ string: number }>()
  const [genderData, setGenderData] = React.useState({ female: 0, male: 0 })

  const getSummaryCountByName = async (name: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary/count?name=${name}`)

      const data = await response.json()

      console.log(data)
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const handleUpdateDate = ({ data }: { data: any[] }) => {
    const newData = data.sort((a, b) => new Date(a.label).getTime() - new Date(b.label).getTime())
    setDateData(newData)
  }

  const handleUpdateGender = ({ data }: { data: any[] }) => {
    const [female, male] = data.reduce(
      (value, current) => {
        let gender = current.label.toLowerCase()
        let currentCount = current.count

        if (gender === 'female') {
          value[0] += currentCount
        } else {
          value[1] += currentCount
        }

        return value
      },
      [0, 0]
    )
    setGenderData({ female, male })
  }

  const handleUpdateBrandDevice = ({ data }: { data: any[] }) => {
    const groupingData = data.reduce((value, current) => {
      let device = current.label
      let currentCount = current.count

      if (!value[device]) {
        value[device] = 0
      }

      value[device] += currentCount

      return value
    }, {})

    setBrandDeviceData(groupingData)
  }

  React.useEffect(() => {
    getSummaryCountByName('Date').then(handleUpdateDate)

    getSummaryCountByName('Gender').then(handleUpdateGender)

    getSummaryCountByName('Brand Device').then(handleUpdateBrandDevice)
  }, [])

  const renderDataGender = [
    { gender: 'Female', total: genderData.female, fill: femaleFillColor },
    { gender: 'Male', total: genderData.male, fill: maleFillColor },
  ]

  const renderDataDevice = brandDeviceData
    ? Object.entries(brandDeviceData).map(([device, count], index) => {
        return { device, total: count, fill: deviceFillColors[index] }
      })
    : []

  return (
    <div className='flex gap-4'>
      <Card className='flex-1 flex flex-col py-0'>
        <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row !my-0 !py-0'>
          <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Showing total customers for the last 3 months</CardDescription>
          </div>
          <div className='flex'>
            {/* {['desktop', 'mobile'].map((key) => {
              const chart = key as keyof typeof chartConfig
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                  onClick={() => setActiveChart(chart)}
                >
                  <span className='text-xs text-muted-foreground'>{chartConfig[chart].label}</span>
                  <span className='text-lg font-bold leading-none sm:text-3xl'>
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              )
            })} */}
          </div>
        </CardHeader>
        <CardContent className='px-2 sm:p-6 !pt-0 flex-1'>
          <ChartContainer config={chartConfig} className='aspect-auto h-full w-full'>
            <BarChart accessibilityLayer data={dateData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='label'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className='w-[150px]'
                    nameKey='views'
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    }}
                  />
                }
              />
              <Bar dataKey={'count'} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className='flex flex-col gap-4 w-64'>
        <Card className='p-0'>
          <div className='border-b p-4 space-y-1'>
            <CardTitle>Brand Device</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
          </div>

          <CardContent className='!p-0 -mt-6'>
            <ChartContainer
              config={chartConfigDevice}
              className='mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background !p-0'
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey='device' cursor={false} hideLabel />} />
                <Pie data={renderDataDevice} dataKey='total' nameKey='device'>
                  <LabelList
                    dataKey='device'
                    className='fill-background'
                    stroke='none'
                    fontSize={12}
                    formatter={() => ''}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className='p-0'>
          <CardContent className='!p-0'>
            <ChartContainer
              config={chartConfigDevice}
              className='mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background'
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent cursor={false} hideLabel />} />
                <Pie
                  data={renderDataGender}
                  dataKey='total'
                  nameKey='gender'
                  innerRadius={55}
                  strokeWidth={5}
                  activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 5} />
                  )}
                >
                  <LabelList dataKey='gender' className='fill-background' stroke='none' fontSize={12} />

                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                            <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-2xl font-bold'>
                              Gender
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomeCart
