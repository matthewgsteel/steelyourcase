import { registerAstroComponent } from '@cloudcannon/editable-regions/astro';
import CTA from '../components/CTA.astro';
import Hero from '../components/Hero.astro';
import PracticeCard from '../components/PracticeCard.astro';
import ServicePage from '../components/ServicePage.astro';

registerAstroComponent('cta', CTA);
registerAstroComponent('hero', Hero);
registerAstroComponent('practice-card', PracticeCard);
registerAstroComponent('service-page', ServicePage);
