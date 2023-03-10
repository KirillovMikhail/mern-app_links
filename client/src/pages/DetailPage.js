import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/Authcontext'
import { useHttp } from '../hooks/http.hook'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] =useState(null)
    const linkId = useParams().id // id береться как прописано в роутах из адресснйо строки

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        }
        catch (e) {}
    }, [token, linkId, request])
   
    useEffect(()=>{
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && link && < LinkCard link={ link }/>}
        </>
    )
}