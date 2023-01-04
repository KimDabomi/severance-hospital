/**
 * @ File Name: CooperationHospitalSlice.js
 * @ Author: 박다윗 (davidpark.0098@gmail.com)
 * @ Last Update: 2023-01-05 00:33:33
 * @ Description: 협력병원 슬라이스
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from "lodash";

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getList = createAsyncThunk("CooperationHospitalSlice/getList", async (payload, { rejectWithValue }) => {
  let result = null;
  const URL = process.env.REACT_APP_API_COOPERATIONHOSPITAL_LIST;

  try {
    const response = await axios.get(URL);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getItem = createAsyncThunk("CooperationHospitalSlice/getitem", async (payload, { rejectWithValue }) => {
  let result = null;

  //환경설정 파일에 정의된 URL에서 ':id' 부분을 찾아 payload를 통해 전달된 일련번호로 치환
  //어떤 항목을 수정할지 판별할 id가 필요
  const URL = process.env.REACT_APP_API_COOPERATIONHOSPITAL_ID.replace(":id", payload.id);

  try {
    const response = await axios.get(URL);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 데이터 저장을 위한 비동기 함수 */
export const postItem = createAsyncThunk("CooperationHospitalSlice/postItem", async (payload, { rejectWithValue }) => {
  let result = null;

  const URL = process.env.REACT_APP_API_COOPERATIONHOSPITAL_LIST;

  try {
    const response = await axios.post(URL, {
      CHospitalArea: payload.CHospitalArea,
      CHospitalIntroduction: payload.CHospitalIntroduction,
      CHospitalAddress: payload.CHospitalAddress,
      CHospitalTel: payload.CHospitalTel,
      CHospitalName: payload.CHospitalName,
      CMedicalDepartment: payload.CMedicalDepartment,
      regDate: payload.regDate,
      editDate: payload.editDate
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 데이터 수정을 위한 비동기 함수 */
export const putItem = createAsyncThunk("CooperationHospitalSlice/putItem", async (payload, { rejectWithValue }) => {
  let result = null;

  //어떤 항목을 수정할지 판별할 id가 필요
  const URL = process.env.REACT_APP_API_COOPERATIONHOSPITAL_ID.replace(":id", payload.id);

  try {
    const response = await axios.put(URL, {
      CHospitalArea: payload.CHospitalArea,
      CHospitalIntroduction: payload.CHospitalIntroduction,
      CHospitalAddress: payload.CHospitalAddress,
      CHospitalTel: payload.CHospitalTel,
      CHospitalName: payload.CHospitalName,
      CMedicalDepartment: payload.CMedicalDepartment,
      regDate: payload.regDate,
      editDate: payload.editDate
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const deleteItem = createAsyncThunk("CooperationHospitalSlice/deleteItem", async (payload, { rejectWithValue }) => {
  let result = null;

  //어떤 항목을 수정할지 판별할 id가 필요
  const URL = process.env.REACT_APP_API_COOPERATIONHOSPITAL_ID.replace(":id", payload.id);

  try {
    const response = await axios.delete(URL);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

const CooperationHospitalSlice = createSlice({
  name: "CooperationHospitalSlice",
  // 이 모듈이 관리하고자하는 상태값들을 명시
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    getCurrentData: (state, action) => {
      return state;
    }
  },
  extraReducers: {
    /** 다중행 데이터 조회를 위한 액션 함수 */
    [getList.pending]: pending,
    [getList.fulfilled]: fulfilled,
    [getList.rejected]: rejected,

    /** 단일행 데이터 조회를 위한 액션 함수 */
    [getItem.pending]: pending,
    [getItem.fulfilled]: (state, { meta, payload }) => {
      return {
        data: [payload],
        loading: false,
        error: null
      };
    },
    [getItem.rejected]: rejected,

    /** 데이터 저장을 위한 액션 함수 */
    [postItem.pending]: pending,
    [postItem.fulfilled]: (state, { meta, payload }) => {
      //기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야한다.)
      const data = cloneDeep(state.data);
      console.log(data);

      //새로 저장된 결과를 기존 상태값 배열의 맨 뒤에 추가한다.
      data.push(payload);

      return {
        data: data,
        loading: false,
        error: null
      };
    },
    [postItem.rejected]: rejected,

    /** 데이터 수정을 위한 액션 함수 */
    [putItem.pending]: pending,
    [putItem.fulfilled]: (state, { meta, payload }) => {
      //기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야한다.)
      const data = cloneDeep(state.data);

      //id값이 일치하는 항목의 배열 인덱스를 찾는다.
      const targetId = data.findIndex((v, i) => v.id === meta.arg.id);

      //해당 인덱스의 원소를 백엔드의 응답 결과로 교체
      data.splice(targetId, 1, payload);

      return {
        data: data,
        loading: false,
        error: null
      };
    },
    [putItem.rejected]: rejected,

    /** 데이터 삭제를 위한 액션 함수 */
    [deleteItem.pending]: pending,
    [deleteItem.fulfilled]: (state, { meta, payload }) => {
      //기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야한다.)
      const data = cloneDeep(state.data);

      //id값이 일치하는 항목의 배열 인덱스를 찾는다.
      const targetId = data.findIndex((v, i) => v.id === meta.arg.id);

      //해당 인덱스 원소 삭제
      data.splice(targetId, 1);

      return {
        data: data,
        loading: false,
        error: null
      };
    },
    [deleteItem.rejected]: rejected
  }
});

// 액션함수들 내보내기
export const { getCurrentData } = CooperationHospitalSlice.actions;

// 리듀서 객체 내보내기
export default CooperationHospitalSlice.reducer;