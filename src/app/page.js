

import Header from "./components/Header";
import Loader from "./components/Loader";
import Product from "./components/Product";
import Footer from "./components/Footer"
import admin from "./admin/page"


export default function Home() {
  return (
    <main>
      
      <Header />
      <Product/>
      <Loader/>
      <Footer/>
    </main>
  );
}
