import MapPage from "pages/MapPage";
import DetailsPage from "pages/DetailsPage";

const routes = [
  { name: "Map", path: "/", exact: true, component: MapPage },
  { name: "Details", path: "/details", component: DetailsPage },
  { name: "Settings", path: "/settings", icon: "setting" },
  { name: "404" }
];

export default routes;
