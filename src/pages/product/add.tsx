import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import baseApi from '../../configs/baseApi';

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    file: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setProduct({ ...product, file: files ? files[0] : null });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(product);

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      if (product.file) {
        formData.append('file', product.file);
      }

      const response = await baseApi.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product submitted:', response.data);
      setMessage('Ürün başarılı bir şekilde eklenmiştir!');
      setError('');

      setProduct({
        name: '',
        price: '',
        stock: '',
        file: null
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('');
      setError('Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <Card>
      <CardHeader title='YENİ ÜRÜN EKLEME' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='name'
                label='ürün ismi'
                placeholder='Product Name'
                value={product.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='price'
                label='ürünün fiyatı'
                placeholder='Product Price'
                value={product.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='stock'
                label='stok durumu'
                placeholder='Product Stock'
                value={product.stock}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='file'
                name='file'
                label='File'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary'>
                Ürünü ekle
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && (
          <Typography variant='body2' color='success.main' sx={{ mt: 2 }}>
            {message}
          </Typography>
       )}
       {error && (
         <Typography variant='body2' color='error.main' sx={{ mt: 2 }}>
           {error}
         </Typography>
       )}
      </CardContent>
    </Card>
  );
}

export const getServerSideProps = async (context: any) => {
  // Kullanıcı girişi kontrolü
  if (!context.req.headers.cookie || !context.req.headers.cookie.includes('token')) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ProductAdd;
