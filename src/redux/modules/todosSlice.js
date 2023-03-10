import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    isLoading:false,
    isError:false,
    error:null
}
  
export const __getTodos = createAsyncThunk(
    "getTodos",
    // async 붙이는거 잊지마
    async (payload, thunkAPI)=>{
        // 오류가 날 수도 있기 때문에 try, catch문으로 묶어줄 것
        try{
            // 시도하는 부분
            const response = await axios.get(`http://localhost:4000/todos`)
            console.log(response);

            // toolkit에서 제공하는 api
            // Promise -> resolve(=네트워크 요청이 성공한 경우) -> dispatch해주는 기능을 가진 API
            return thunkAPI.fulfillWithValue(response.data)
            //return 해주는 것 잊지말자 !
        }catch(error){
            //오류가 날 수 있는 부분
            console.log('error!');

            // toolkit에서 제공하는 api
            // Promise -> reject(=네트워크 요청이 실패한 경우) -> dispatch해주는 기능을 가진 API
            return thunkAPI.rejectWithValue(error)
        }
        


        // thunkAPI.fulfillWithValue()
        // thunkAPI.rejectWithValue()
        // 를 이용하여 extraReducer로 보내줄것임.

    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
     
    },
    extraReducers:{
        // 통신이 아직 진행중일 때
        [__getTodos.pending]:(state, action)=>{
            state.isLoading = true
            state.isError = false
        },
        [__getTodos.fulfilled]: (state, action)=>{
            console.log("fulfilled",action);
            state.isLoading = false
            state.isError = false
            state.todos = action.payload
        }, 

        [__getTodos.rejected]:(state, action)=>{
            state.isLoading = false;
            state.isError = true
            state.error = action.payload
        },
    }
  })
  

  export const {addTodo, removeTodo, switchTodo} = todosSlice.actions
  export default todosSlice.reducer