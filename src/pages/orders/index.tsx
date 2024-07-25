import OrdersTable from "./partial/OrdersTable"
import baseApi from '../../configs/baseApi'
import { useState } from "react"


const Orders = ({ordersData}) => {

    const [orders, setOrders] = useState<[]>(ordersData)


    return(
        <div>
            <OrdersTable orders={orders} />
        </div>
    )

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
  
    // Ürünleri getir ve props olarak gönder
    const response = await baseApi.get('order');
    const ordersData = response.data;
  
    return {
      props: { ordersData },
    };
  };

export default Orders