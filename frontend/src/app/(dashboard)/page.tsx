import Table from '@/app/(dashboard)/components/Table'
import Chart from '@/app/(dashboard)/components/Chart'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className='p-4 max-w-7xl mx-auto min-h-screen flex flex-col gap-8'>
      <div className=''>
        <Chart />
      </div>

      <Card className='flex'>
        <CardContent>
          <Table />
        </CardContent>
      </Card>
    </main>
  )
}
