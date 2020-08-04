import { useContext } from "react";
import TourContext from "./tourContext";

export default function useTour() {
  const { isTourOpen, setIsTourOpen } = useContext(TourContext);

  const openTour = () => {
    setIsTourOpen(true);
  };
  const closeTour = () => setIsTourOpen(false);

  return { isTourOpen, openTour, closeTour };
}
