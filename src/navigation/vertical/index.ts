// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Ürünler',
      icon: AccountCogOutline,
      path: '/product'
    },
    {
      title: 'Ürün Ekle',
      icon: AccountCogOutline,
      path: '/product/add'
    },
    {
      title: 'Siparişler',
      icon: AccountCogOutline,
      path: '/orders'
    },
  ]
}

export default navigation
