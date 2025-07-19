import {
    AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilter } from '../../redux/slice/searchSlice';


const FeaturedPost = () => {
  const {filteredData} = useSelector((state)=>state.search)
  // console.log(filteredData)
  const [searchData,setSearchData] = useState([])
  

  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(searchFilter(searchData))
  }



  return (
      <Card sx={{bgcolor: 'primary.main', borderRadius: 2, boxShadow: 3 ,backgroundImage:'url(https://wallup.net/wp-content/uploads/2015/12/12663-trees-sunset-landscape.jpg)'}} >
        <CardContent>
            <form className='bg-white text-black flex  px-2 py-1 rounded-md mb-4 md:w-[30vw] ' onSubmit={handleSubmit}>
                <input type="text" placeholder='Search Blogs' className='w-full outline-none' 
                onChange={(e)=>{
                  setSearchData(e.target.value)
                }}
                value={searchData}
                />
                <Button variant="contained" type='submit'>Search</Button>
            </form>
          <Typography
            variant="h4"
            sx={{ textAlign: 'start', fontWeight: 100, mb: 2, color: 'white', letterSpacing: '2px' ,}}
            gutterBottom
          >
            Discover which component libraries are dominating the React ecosystem this year.
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>
            With so many options available, choosing the right UI library can feel overwhelming.
            This post breaks down the pros and cons of each major player.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          
         
          <div className={`${filteredData.length > 0 ? "block" : "hidden"}`}>
              <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main' }} onClick={()=>{
              window.location.reload();
          }} >
            Remove search
          </Button>
          </div>
          
        </CardActions>
      </Card>
  );
};

export default FeaturedPost;
