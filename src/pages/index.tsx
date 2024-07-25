

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports


const Dashboard = () => {
  return (
    <ApexChartWrapper>
      YÖNETİCİ PANELİNİZE HOŞGELDİNİZ.
    </ApexChartWrapper>
  )
}

export const getServerSideProps = async (context: any) => {
  // Kullanıcı girişi kontrolü

  if (!context?.req?.cookies?.token) {
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

export default Dashboard
