import { useState,useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import baseApi from 'src/configs/baseApi'


const ProductTable = (props: { products: any }) => {
  const { products } = props
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [open, setOpen] = useState(false)
 

  const handleOpenEditModal = (row: any) => {
    setSelectedProduct(row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSelectedProduct({ ...selectedProduct, [name]: value })
  }

  const handleSave = async () => {

    // Save the updated product details

    const body = {
      name: selectedProduct.name,
      stock : selectedProduct.stock,
      price: selectedProduct.price
    }

    try{
      const response = await baseApi.put(`/product/${selectedProduct.id}`, body)
      console.log('Product saved:', response)
      window.location.reload();
      handleClose()
    }catch(e: any){
      alert(e.response.data.messsage)
    }

  }
  const handleDelete = async (product: any) => {
    try {
      const response = await baseApi.delete(`/product/${product.id}`);
      console.log('Product deleted:', response);
      window.location.reload();
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };




   
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Stock</TableCell>
              <TableCell align='right'>File</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row: any) => (
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
                <TableCell align='right'>{row.price}</TableCell>
                <TableCell align='right'>{row.stock}</TableCell>
                <TableCell align='right'>
                  {
                    row.file_path ? <img width={100} height={100} alt="resim" src={`http://localhost:3000${row.file_path}`}/> : 
                    'Resim Yok'
                  }
                  
                </TableCell>
                <TableCell align='right'>
                  <EditIcon
                    color='primary'
                    onClick={() => handleOpenEditModal(row)}
                    style={{ cursor: 'pointer' }}
                  />
                  <DeleteIcon
                    color='error'
                    onClick={() => handleDelete(row)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ÜRÜN DÜZENLEME</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            value={selectedProduct?.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='price'
            label='Price'
            type='number'
            fullWidth
            variant='standard'
            value={selectedProduct?.price || ''}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='stock'
            label='Stock'
            type='number'
            fullWidth
            variant='standard'
            value={selectedProduct?.stock || ''}
            onChange={handleChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProductTable
