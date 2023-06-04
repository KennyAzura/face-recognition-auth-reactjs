import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as faceapi from 'face-api.js'


const initialState = {
    status: null,
    message: null,
    outline: null,
    styles: {
        canvas: {},
        preview: {}    
    },
    faces: [],
    error: null
}


export const detectFaces = createAsyncThunk(
    'facenet/detectFaces',
    async (refs) => {
        // Hiển thị hình ảnh gốc và vẽ kết quả nhận diện khuôn mặt
        const { previewRef, canvasRef } = refs
        console.log(previewRef.current)
        // Nhận diện khuôn mặt
        await faceapi.nets.ssdMobilenetv1.loadFromUri('facenet/models/ssd_mobilenetv1')
        // Định vị các đặc điểm trên khuôn mặt
        await faceapi.nets.faceLandmark68Net.loadFromUri('facenet/models/face_landmark_68')
        // Tạo các vectors mô tả khuôn mặt
        await faceapi.nets.faceRecognitionNet.loadFromUri('facenet/models/face_recognition')
        // Trích xuất các đặc trưng trên khuôn mặt thành một vector
        const faces = await faceapi.detectAllFaces(previewRef.current).withFaceLandmarks().withFaceDescriptors()
        // Lưu kích thước hiển thị của hình ảnh gốc
        const displaySize = { width: previewRef.current.width, height: previewRef.current.height }
        // Đảm bảo trùng kích thước
        faceapi.matchDimensions(canvasRef.current, displaySize)    
        // Điều chỉnh kết quả nhận diện khuôn mặt sao cho phù hợp với kích thược hiển thị
        const resizedDetections = faceapi.resizeResults(faces, displaySize)
        console.log(resizedDetections)
        return resizedDetections
    }
)


export const facenetSlice = createSlice({
    name: 'facenet',
    initialState,
    reducers: {
        setStyles: (state,action) => {
            Object.keys(action.payload).map(s => {
                return Object.keys(action.payload[s]).map(v => {
                    return state.styles[s][v] = action.payload[s][v]
                })
            })
        },
        setFacenetError: (state, action) => {
            state.error = action.payload == null ? action.payload : [action.payload]
        },
        setFacenetMessage: (state, action) => {
            state.message = action.payload
        },
        setOutline: (state, action) => {
            state.outline = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(detectFaces.pending, (state) => {
            state.status = 'pending'
            state.styles.preview = {...state.styles.preview, borderColor:'#ddd' }
        })
        .addCase(detectFaces.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            let msg = null
            if (action.payload.length === 0) {
                msg = ['The face could not be identified. Insert an IMAGE where the face is clear.']
            } else if (action.payload.length === 1 && action.payload[0].detection.score <= 0.75) {
                msg = ['You got a score of '+(Math.round(action.payload[0].detection.score * 100) / 100)+' which is below the minimum threshold of 0.75. Insert an IMAGE where the face is more visible.']
            } else if (action.payload.length > 1) {
                msg = ['More than one face has been detected. Insert an IMAGE where there is only you.']
            }
            state.error = msg
            state.faces = msg == null ? action.payload : []
            state.styles.preview = msg != null ? {...state.styles.preview, borderColor:'#f00000'} : {...state.styles.preview, borderColor:'#00ff00'}
        })
        .addCase(detectFaces.rejected, (state) => {
            state.status = 'rejected'
            state.error = ['A general error occurred with face detection. Please, try again.']
            state.styles.preview = {...state.styles.preview, borderColor:'#f00000' }
        })
    }
})

export const getStyles = state => state.facenet.styles
export const getFacenetStatus = state => state.facenet.status
export const getFacenetError = state => state.facenet.error
export const getFacenetMessage = state => state.facenet.message
export const getOutline = state => state.facenet.outline
export const getFaces = state => state.facenet.faces

export const { setStyles, setFacenetError, setFacenetMessage, setOutline } = facenetSlice.actions
export default facenetSlice.reducer