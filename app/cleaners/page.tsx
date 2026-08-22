import type {Metadata} from "next";
import DentalSite from "./dental-site";
import {DemoScrollIsland} from "../components/demo-ui";

const image="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2200&q=90";
export const metadata:Metadata={
 title:"Northstar Dental — Modern Dental Care in Dehradun",
 description:"A fictional premium dental clinic experience with clear treatments, dentist availability, transparent pricing and online appointment booking.",
 openGraph:{title:"Northstar Dental — Modern Dental Care in Dehradun",description:"Dentistry that makes the next step clear.",images:[{url:image,alt:"Northstar Dental consultation"}]},
 twitter:{card:"summary_large_image",title:"Northstar Dental — Modern Dental Care in Dehradun",description:"Dentistry that makes the next step clear.",images:[image]}
};
export default function Cleaners(){return <><DemoScrollIsland label="NORTHSTAR" links={[{name:"Treatments",href:"#treatments"},{name:"Dentists",href:"#dentists"},{name:"Visit",href:"#visit"}]}/><DentalSite/></>}
