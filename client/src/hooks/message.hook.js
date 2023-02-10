import {useCallback} from 'react'

export const useMessage=()=>{
    return useCallback((text)=> {
        if(window.M && text) {
            window.M.toast({html: text})     // объект М из библиотеки материалайз имеет объект М с методом toast который выводит ообщение
        }
    }, [])
}