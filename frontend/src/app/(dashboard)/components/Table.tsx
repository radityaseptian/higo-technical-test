import { DataTable } from './table'
import { columns } from './table/columns'

async function getInitialData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary?count=true&page=1&limit=10`)

  if (!response.ok) {
    return { data: [] }
  }

  return response.json()
}

const HomeTable = async () => {
  const result = await getInitialData()

  return (
    <div>
      <DataTable columns={columns} data={result.data} count={result.count} />
    </div>
  )
}

export default HomeTable
