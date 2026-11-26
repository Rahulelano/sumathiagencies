import type { GalleryItem } from '../types';

import waterHeaterInstallImg from '../assets/gallery/solar-water-heater-installation.jpg';
import floodlightKitImg from '../assets/gallery/solar-floodlight-kit.jpg';
import rooftopPlantImg from '../assets/gallery/rooftop-solar-plant.jpg';
import terraceArrayImg from '../assets/gallery/terrace-solar-array.jpg';
import securityCctvImg from '../assets/gallery/solar-security-cctv.jpg';
import streetLightPoleImg from '../assets/gallery/solar-street-light-pole.jpg';
import solarPowerPlantImg from '../assets/solar-power-plant.jpg';
import solarPumpSystemImg from '../assets/solar-pump-system.jpg';
import solarFencingDryerImg from '../assets/solar-fencing-dryer.jpg';
import waterSoftenerImg from '../assets/water-softeners-ro.jpg';

export const galleryItems: GalleryItem[] = [
  {
    id: 'rooftop-solar-plant',
    title: 'On-Grid Rooftop Solar Power Plant',
    category: 'solar-rooftop',
    categoryLabel: 'Rooftop Solar PV',
    location: 'Kanuvai, Coimbatore',
    tag: 'High-Yield Solar Array',
    description:
      'Engineered elevated solar mounting structure with high-output photovoltaic modules providing clean, zero-emission electricity.',
    image: rooftopPlantImg,
  },
  {
    id: 'solar-water-heater-installation',
    title: 'Commercial Solar Water Heating Plant',
    category: 'water-heating',
    categoryLabel: 'Solar Water Heating',
    location: 'Coimbatore, Tamil Nadu',
    tag: 'Hospitality & Commercial',
    description:
      'High-capacity multi-collector solar water heating system equipped with heavy-duty insulated cylinder for continuous hot water delivery.',
    image: waterHeaterInstallImg,
  },
  {
    id: 'terrace-solar-array',
    title: 'Residential Terrace Solar PV Array',
    category: 'solar-rooftop',
    categoryLabel: 'Rooftop Solar PV',
    location: 'Urban Coimbatore',
    tag: 'Grid-Tied Residential',
    description:
      'Precision elevated aluminum solar racking designed to maximize terrace usability while harvesting peak solar energy throughout the day.',
    image: terraceArrayImg,
  },
  {
    id: 'solar-security-cctv',
    title: 'Autonomous Solar CCTV Security Tower',
    category: 'security-cctv',
    categoryLabel: 'Smart Security & IoT',
    location: 'Farm & Estate Boundary',
    tag: 'Remote 4G Surveillance',
    description:
      '100% wire-free outdoor solar camera with dedicated panel, 360-degree PTZ dome, night vision, and smartphone live streaming.',
    image: securityCctvImg,
  },
  {
    id: 'solar-floodlight-kit',
    title: '60W Smart Solar Floodlight System',
    category: 'solar-lighting',
    categoryLabel: 'Solar Lighting',
    location: 'Courtyard & Commercial Yards',
    tag: 'Autonomous Outdoor Light',
    description:
      'Heavy-duty LED outdoor floodlight with independent photovoltaic collector, remote control settings, and dusk-to-dawn automatic illumination.',
    image: floodlightKitImg,
  },
  {
    id: 'solar-street-light-pole',
    title: 'All-In-One Integrated Solar Street Light',
    category: 'solar-lighting',
    categoryLabel: 'Solar Lighting',
    location: 'Gated Layouts & Campuses',
    tag: 'Campus Street Lighting',
    description:
      'Modern aerodynamic solar street light pole fixture featuring monocrystalline panel, long-life battery, and smart motion sensing.',
    image: streetLightPoleImg,
  },
  {
    id: 'utility-scale-solar',
    title: 'Utility & Farm Scale Solar PV Array',
    category: 'solar-rooftop',
    categoryLabel: 'Rooftop Solar PV',
    location: 'Western Tamil Nadu',
    tag: 'Commercial Scale',
    description:
      'Extensive ground and rooftop photovoltaic system capturing maximum solar irradiance with industrial-grade inverters.',
    image: solarPowerPlantImg,
  },
  {
    id: 'agricultural-solar-pump',
    title: 'Agricultural Solar Water Pumping System',
    category: 'solar-rooftop',
    categoryLabel: 'Rooftop Solar PV',
    location: 'Farmland, Pollachi Region',
    tag: 'Irrigation & Borewell',
    description:
      'Continuous daytime water delivery direct from sunlight, eliminating diesel costs and power cut disruptions for farmers.',
    image: solarPumpSystemImg,
  },
  {
    id: 'solar-tunnel-dryer',
    title: 'Solar Polyhouse Agricultural Tunnel Dryer',
    category: 'solar-rooftop',
    categoryLabel: 'Rooftop Solar PV',
    location: 'Agro Processing Unit',
    tag: 'Post-Harvest Drying',
    description:
      'Controlled greenhouse solar drying facility ensuring rapid, hygienic, and weather-protected drying of harvests and crops.',
    image: solarFencingDryerImg,
  },
  {
    id: 'rooftop-water-softener',
    title: 'Rooftop Water Softener & Treatment Plant',
    category: 'water-heating',
    categoryLabel: 'Water Treatment',
    location: 'Coimbatore Residence',
    tag: 'Water Treatment',
    description:
      'Automated ion-exchange water softening plant with brine tank protecting overhead plumbing, geysers, and appliances from hard water.',
    image: waterSoftenerImg,
  },
];
