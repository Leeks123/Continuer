/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PreviewImg, TextInput, Toast, ToastInput } from './styles'

import { BiUpArrowAlt, BiCamera } from 'react-icons/bi';

import { useAppDispatch } from '../../../hooks/redux';
import { addCard } from '../../../redux/reducers/cardListSlice';

import { fbFileUpload } from '../../../firebase';
import { useWindowWidth } from '../../../hooks/layout';
import FAB from '../FAB';
import mediaQuery from '../../../utils/mediaQuery';


const Input = () => {
    const dispatch = useAppDispatch();

    const [isActive,setActive] = useState<boolean>(false);
    const [typedText, setText] = useState<string>('');
    const [uploadImgs, setUploadImgs] = useState<FileList>();

    const textArea = useRef<HTMLTextAreaElement>(null);
    const fileuploader = useRef<HTMLInputElement>(null);
    const imgPreviewRef = useRef<HTMLDivElement>(null);
    const windowWidth = useWindowWidth();

    const activeToggle = () => {
        console.log(isActive);
        setActive(!isActive);
        setText('');
        setUploadImgs(undefined);
    };
    useEffect(() => {
        isActive && textArea.current?.focus();
    }, [isActive]);

    const onTyped = useCallback((e:any) => {
        setText(e.target.value);
        console.log(e.target.value);
    },[]);

    const onUploadBtnClick = () => {
        fileuploader.current?.click();
    };
    const onUploadFilePreview = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = fileuploader.current?.files as FileList;

        for(let i=0;i<files.length;i++) {
            if(i === 3){
                break;
            }
            const reader = new FileReader();
            reader.onload = e => {
                const image = new Image();
                image.className = "img-preview"; // 스타일 적용을 위해
                image.id = `ima-preview-${i}`
                image.src = e.target?.result as string;
                imgPreviewRef.current?.querySelector('.preview-container')?.appendChild(image);
            };
            reader.readAsDataURL(files[i]);
          };

        setUploadImgs(files);
    };
    async function getImgUrls() {
        let imgUrls:string[] = [];
        if(uploadImgs !== undefined){
            for(let i=0;i<uploadImgs.length;i++) {
                if(i === 3){
                    break;
                }
                await fbFileUpload(uploadImgs[i]).then((url:string) => {
                    console.log(url, typeof url)
                    imgUrls = [...imgUrls, url];
                })
            }
        }
        if (imgUrls.length === 0){
            return null;
        }
        return imgUrls;
    }
    const onSubmit = async () => {
        // const date = new Date();
        // console.log(format(date,'Y LLLL d HH mm ss'));
        const imgUrls = await getImgUrls();
        
        dispatch(addCard({
            text : typedText,
            imgUrls,
        }));
        setText('');
        activeToggle();
    }

    useEffect(() => {
        function elemCheck(e:any) {
            console.log(e.target.tagName, e.target.dataset.value);
            if (isActive && e.target.dataset.value !== 'textinput' ) {
                if (e.target.tagName !== 'path') {
                    activeToggle();
                }
            }
        }
        window.addEventListener('click', elemCheck);
        return () => {
            window.removeEventListener('click', elemCheck);
        }
    }, [isActive])

    return (
        <>
        {windowWidth < mediaQuery.tablet ? 
            <div>
                <FAB pos="right" toBox toggle={activeToggle} active={isActive}>
                    {uploadImgs && uploadImgs.length>0 && (
                        <PreviewImg ref={imgPreviewRef}>
                            <div className="preview-container"></div>
                        </PreviewImg>
                    )}
                    <TextInput data-value="textinput">
                        <textarea 
                            data-value="textinput" 
                            id="textInput"
                            ref={textArea} 
                            value={typedText}
                            onChange={onTyped} 
                            placeholder="Input your moment"
                        />
                        <BiCamera className="upBtn" data-value="textinput" style={{ marginRight: 0, cursor: "pointer" }} onClick={onUploadBtnClick}/>
                        <input 
                            type="file" 
                            data-value="textinput" 
                            ref={fileuploader} 
                            onChange={onUploadFilePreview}
                            accept="image/png, image/jpeg, image/jpg"
                            hidden multiple/>
                        <BiUpArrowAlt className="upBtn" data-value="textinput" style={{ cursor: "pointer" }} onClick={onSubmit}/>
                    </TextInput>
                </FAB>
            </div> :
            <>
                <FAB pos="center" moveTo="down" toggle={activeToggle} active={isActive}></FAB>
                <Toast active={isActive} imgAdded={uploadImgs ? true : false} data-value="textinput">
                    {uploadImgs && uploadImgs.length>0 && (
                        <PreviewImg ref={imgPreviewRef}>
                            <div className="preview-container"></div>
                        </PreviewImg>
                    )}
                    <ToastInput data-value="textinput">
                        <textarea 
                            data-value="textinput" 
                            id="textInput"
                            ref={textArea} 
                            value={typedText}
                            onChange={onTyped} 
                            placeholder="Input your moment"
                        />
                        <div data-value="textinput">
                            <BiCamera className="upBtn" data-value="textinput" style={{ marginRight: 0, cursor: "pointer" }} onClick={onUploadBtnClick}/>
                            <input 
                                type="file" 
                                data-value="textinput" 
                                ref={fileuploader}
                                onChange={onUploadFilePreview} 
                                accept="image/png, image/jpeg, image/jpg"
                                hidden multiple/>
                            <BiUpArrowAlt className="upBtn" data-value="textinput" style={{ cursor: "pointer" }} onClick={onSubmit}/>
                        </div>
                    </ToastInput>
                </Toast>
            </>
        }
        </>
    );
};

export default Input;