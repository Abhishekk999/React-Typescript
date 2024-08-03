import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../state/counter/counter-slice";
import { RootState } from "../state/store";

// Define a custom hook for counter actions and state
const useCounter = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.counter.value);

  const incrementCounter = () => dispatch(increment());
  const decrementCounter = () => dispatch(decrement());

  return {
    value,
    increment: incrementCounter,
    decrement: decrementCounter,
  };
};

export default useCounter;
