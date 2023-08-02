import Image from 'next/image'
import Navbar from './components/navbar'
import Connect from './components/connect'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <title>Mint NFT - Ethlas</title>
      <Navbar/>
      <Connect/>
      <Footer/>
    </>
  )
}
