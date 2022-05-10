import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const servicesAdapter = createEntityAdapter();

const initialState = servicesAdapter.getInitialState({
  status: "idle",
});

export const getServicesAsync = createAsyncThunk(
  "services/getServicesAsync",
  async () => {
    const response = await fetch("http://localhost:3000/services");
    if (response.ok) {
      const services = await response.json();
      return services;
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "services/toggleCompleteAsync",
  async (payload) => {
    const response = await fetch(
      `http://localhost:3000/services/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isWorkingOn: payload.isWorkingOn,
          isFinished: payload.isFinished,
        }),
      }
    );
    if (response.ok) {
      const service = await response.json();
      return {
        id: service.id,
        isWorkingOn: service.isWorkingOn,
        isFinished: service.isFinished,
      };
    }
  }
);

export const deleteServiceAsync = createAsyncThunk(
  "services/deleteServiceAsync",
  async (payload) => {
    console.log(payload);
    const response = await fetch(
      `http://localhost:3000/services/${payload.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      return { id: payload.id };
    }
  }
);

export const serviceSlice = createSlice({
  name: "services",
  initialState,

  extraReducers: {
    [getServicesAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [getServicesAsync.fulfilled]: (state, action) => {
      servicesAdapter.upsertMany(state, action.payload);
      console.log("ACTION PAYLOAD => ", action.payload);
      state.status = "succeeded";
      console.log("STATE1", state);
    },
    [toggleCompleteAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      console.log("ACTION PAYLOAD 2 => ", action.payload);
      servicesAdapter.updateOne(state, action.payload);
      console.log("STATE2", state);
      state.status = "succeeded";
    },
    [deleteServiceAsync.fulfilled]: (state, action) => {
      state.services = state.services.filter(
        (service) => service.id !== action.payload.id
      );
    },
  },
});

export const { toggleComplete, deleteService } =
  serviceSlice.actions;

export const {
  selectAll: selectAllServices,
  selectIds: selectServiceIds,
  selectById: selectServiceById,
} = servicesAdapter.getSelectors((state) => state.services);

// export const selectAllServices = (state) => state.services.services;
// export const getServiceById = (state) => state.services.service;

export default serviceSlice.reducer;

// reducers: {
//   addservice: (state, action) => {
//     const service = {
//       // id: nanoid(),
//       title: action.payload.title,
//       completed: false
//     };
//     state.push(service);
//   },
//   toggleComplete: (state, action) => {
//     const index = state.findIndex((service) => service.id === action.payload.id);
//     state[index].completed = action.payload.completed;
//   },
//   deleteservice: (state, action) => {
//     return state.filter((service) => service.id !== action.payload.id);
//   }
// }
