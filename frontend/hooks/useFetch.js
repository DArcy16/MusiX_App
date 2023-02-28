import React, { useEffect, useState } from 'react'
import makeRequest from './MakeRequest';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {{
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await makeRequest.get(url);
                setData(res.data.data)
            } catch(e) {
                console.log(e);
                setError(true);
            }
            setLoading(false);
        }
        
        fetchData();
    }
},[url])
   return {data, loading, error};
}

export default useFetch