import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import WorkGallery from "../components/WorkGallery/WorkGallery";

import { servicesAPI } from "../services/api";

export default function Home() {

const [services,setServices] = useState([]);

useEffect(() => {


async function loadServices() {

  try {

    const response =
      await servicesAPI.getAll();

    setServices(
      response.data.services || []
    );

  } catch(error) {

    console.error(error);
  }
}

loadServices();


}, []);

return (
<>
  <Header />

  <Hero />

  <WorkGallery />

  <Services
    services={services}
  />
</>


);
}
