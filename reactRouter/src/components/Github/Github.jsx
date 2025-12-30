import React from 'react'
import { useLoaderData } from 'react-router-dom';




export default function Github() {
    const data =useLoaderData()
   /* const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users/Aditya-Bhandari-tech')
        .then(res => res.json())
        .then(data =>{
            setData(data);
        })
    },[])*/

  return (
    <div className='text-3xl bg-gray-600 text-center text-white m-4 p-4'>
      GitHub followers: {data.followers}
      <img src={data.avatar_url} alt='github avatar' width={300}/>
    </div>
  );
}


