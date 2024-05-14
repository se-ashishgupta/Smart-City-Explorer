import { createMongoAbility } from "@casl/ability";
import { useSelector } from "react-redux";

export const getItemFromStore = (key, store = localStorage) =>
  JSON.parse(store.getItem(key));

export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, JSON.stringify(payload));

export const removeItemFromStore = (key, store = localStorage) => {
  return store.removeItem(key);
};

export const useAbility = () => {
  const { ability } = useSelector((state) => state.auth);
  return createMongoAbility(ability);
};

export const incrementCalculation = (currData, prevData) => {
  const current = Number(currData);
  const previous = Number(prevData);

  if (isNaN(current) || isNaN(previous)) {
    return 0;
  }

  if (previous === 0) {
    if (current === 0) {
      return 0;
    }
    // Considered an infinite increase, but representing as 9999.99% for practicality
    return current * 100;
  }

  let difference = current - previous;
  let percentage = (difference / previous) * 100;
  return percentage ? percentage.toFixed(2) : "";
};
