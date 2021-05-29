import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 5,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment
    incremented(state) {
      // this is not mutating the state
      // redux toolkit uses immer to translate this operation to
      // immutable state update
      state.value++;
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    // decrement
    // reset
  },
});

export const { incremented, amountAdded } = counterSlice.actions;

export default counterSlice.reducer;
