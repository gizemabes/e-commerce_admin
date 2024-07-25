// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'


const OrdersTable = (props: {orders: any}) => {
    const {orders} = props

    console.log(orders)



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Müşteri Adı</TableCell>
            <TableCell align='right'>Ürün Adı</TableCell>
            <TableCell align='right'>Fiyatı</TableCell>
            <TableCell align='right'>Stok</TableCell>
            <TableCell align='right'>Adet</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell component='th' scope='row'>
                {row.productName}
              </TableCell>
              <TableCell align='right'>{row.price}</TableCell>
              <TableCell align='right'>{row.stock}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrdersTable
