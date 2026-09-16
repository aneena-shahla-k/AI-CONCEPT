import React from 'react'
import Hero from '../components/Home/Hero'
import GlobalRoute from '../components/Home/GlobalRoute'
import ServicesEcosystem from '../components/Home/ServicesEcosystem'
import GPSPhilosophy from '../components/Home/GPSPhilosophy'
import TimeBasedService from '../components/Home/TimeBasedService'

export default function Home() {
  return (
    <div>
        <Hero/>
        <GlobalRoute/>
        <ServicesEcosystem/>
        <GPSPhilosophy/>
        <TimeBasedService/>
    </div>
  )
}