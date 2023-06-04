import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCameraStatus, getScreenshot, setCameraStatus, setScreenshot, setIsFlashing, getActiveTab, setAuthError, getActiveSource, setActiveSource, setScreenshotFromURL, getURL, setURL } from "../features/auth/authSlice"
import { setFacenetError, setFacenetMessage, setOutline } from "../features/auth/facenetSlice"

export const PictureControls = () => {

    const dispatch = useDispatch()
    const fileInputRef = useRef()
    
    const cameraStatus = useSelector(getCameraStatus)
    const screenshot = useSelector(getScreenshot)
    const activeTab = useSelector(getActiveTab)
    const activeSource = useSelector(getActiveSource)
    const imageURL = useSelector(getURL) 


    const handleActiveSource = (source) => {
        dispatch(setActiveSource(source))
        if (source === 'file') {
            dispatch(setCameraStatus('closed'))
        }
        dispatch(setScreenshot(null))
        dispatch(setURL(null))
        dispatch(setAuthError({login:{serverErr:null}}))
        dispatch(setAuthError({register:{serverErr:null}}))
    }

    const handleCameraClosing = () => {
        dispatch(setCameraStatus('closed'))
        dispatch(setScreenshot(null))
        dispatch(setOutline('#ddd'))
        dispatch(setFacenetMessage('Đặt khuôn mặt vào khung hình.'))
    }

    const handleCameraOpening = () => {
        dispatch(setCameraStatus('opened'))
        dispatch(setScreenshot(null))
        dispatch(setOutline('#ddd'))
        dispatch(setFacenetMessage('Đặt khuôn mặt vào khung hình.'))
    }

    const handleFileInputClick = () => {
        dispatch(setCameraStatus('closed'))
        dispatch(setScreenshot(null))
        dispatch(setFacenetError(null))
        fileInputRef.current.value = ''
        fileInputRef.current.click()
    }

    const handleFileUpload = () => {
        const input = fileInputRef.current
        const err = {}
        if (input.files && input.files[0] && input.files[0].size < 1500000) {
            const reader = new FileReader()
            reader.onload = (r) => {
                dispatch(setScreenshot(r.target.result))
                dispatch(setIsFlashing(true))
                err[activeTab] = {screenshot: null}
                dispatch(setAuthError(err))
            }
            reader.readAsDataURL(input.files[0])
        } else if (input.files && input.files[0] && input.files[0].size > 1500000) {
            err[activeTab] = {screenshot: 'Tệp hình ảnh quá lớn (max 1.5 MB).'}
            dispatch(setAuthError(err))
        } else {
            err[activeTab] = {screenshot: 'Không có hình ảnh được chọn.'}
            dispatch(setAuthError(err))
        }
    }

    const handleSendURL = async () => {
        dispatch(setScreenshot(null))
        dispatch(setScreenshotFromURL({url: imageURL}))
    }

    return(
        <>
        <span className="wrap-image-label">Chụp ảnh khuôn mặt</span>
        <div className="wrap-input100-image">
            <div className="form-check source-box">
                <ul className="source-nav">
                    <li>
                        <span
                            className={'nav-link '+ (activeSource === 'webcam' ? 'active' : '')}
                            onClick={() => handleActiveSource('webcam')}
                        >Webcam</span>
                    </li>
                    <li>
                        <span
                            className={'nav-link '+ (activeSource === 'file' ? 'active' : '')}
                            onClick={() => handleActiveSource('file')}
                        >File</span>
                    </li>
                    <li>
                        <span
                            className={'nav-link '+ (activeSource === 'url' ? 'active' : '')}
                            onClick={() => handleActiveSource('url')}
                        >URL</span>
                    </li>
                </ul>
            </div>
            {
                activeSource === 'webcam' &&
                <button
                    type="button"
                    className="zoom-out"
                    onClick={() => cameraStatus === 'closed' ? handleCameraOpening() : handleCameraClosing()}
                >{screenshot != null ? 'Chụp ảnh mới' : (cameraStatus === 'opened' ? 'Đóng Camera' : 'Mở Camera')}</button>
            }
            {
                activeSource === 'file' &&
                <><button
                    type="button"
                    className="zoom-out"
                    onClick={() => handleFileInputClick()}
                >{screenshot == null ? 'Chọn hình ảnh' : 'Chọn hình ảnh mới'}</button>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={() => handleFileUpload()}
                /></>
            }
            {
                activeSource === 'url' &&
                <div className="url-container" >
                    <input
                        type="text"
                        className="form-control"
                        value={imageURL || ''}
                        placeholder="Enter URL..."
                        onChange={(e) => dispatch(setURL(e.target.value))} />
                    <button
                        type="button"
                        className="zoom-out"
                        onClick={() => handleSendURL()}
                    >Xác nhận</button>
                </div>
            }
        </div>
        </>
    )
}