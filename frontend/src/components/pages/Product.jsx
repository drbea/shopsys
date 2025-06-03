// import Menugauche from "./components/dashbord/Menugauche"
import DashboardLayout from "../dashbord/DashboardLayout"
// import Register from "./components/Authentification/Register"
// import Login from "./components/Authentification/Login"
import ProductPage from "../products/ProductPage"


function Product() {

  return (
   // <div className="container mx-auto flex flex-col md:flex-row p-6 gap-6">
   <div className="container mx-auto">
      {/*<Login/>*/}
    <DashboardLayout>
      <ProductPage/>
    </DashboardLayout>
   </div>
  )
}

export default Product;