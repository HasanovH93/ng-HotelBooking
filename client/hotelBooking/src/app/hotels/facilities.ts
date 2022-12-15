import {
    faTv,
    faWifi,
    faElevator,
    faSpa,
    faUtensils,
    faSquareParking,
    faMartiniGlass,
    faPaw,
    faKitchenSet,
    faMugSaucer,
    faPersonSwimming,
    faVault,
    faBath,
    faDumbbell,
  } from '@fortawesome/free-solid-svg-icons';





export const facilities = () => { 
    return  [
        { name: 'TV', value: 'TV', icon: faTv },
        { name: 'Spa', value: 'Spa', icon: faSpa },
        { name: 'Wi-Fi', value: 'Wi-Fi', icon: faWifi },
        { name: 'Elevator', value: 'Elevator', icon: faElevator },
        { name: 'Restaurant', value: 'Restaurant', icon: faUtensils },
        { name: 'Parking', value: 'Parking', icon: faSquareParking },
        { name: 'Bar', value: 'Bar', icon: faMartiniGlass },
        { name: 'Pets', value: 'Pets', icon: faPaw },
        { name: 'Kitchen', value: 'Kitchen', icon: faKitchenSet },
        { name: 'Breakfast', value: 'Breakfast', icon: faMugSaucer },
        { name: 'Pool', value: 'Pool', icon: faPersonSwimming },
        { name: 'Bath', value: 'Bath', icon: faBath },
        { name: 'Fitness', value: 'Fitness', icon: faDumbbell },
        { name: 'Safe', value: 'Safe', icon: faVault },
      ];
  };
  