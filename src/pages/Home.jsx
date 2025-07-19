import FeaturedPost from '../components/FeaturedPost'
import BlogList from '../components/BlogList'
import { useEffect } from 'react';

const Home = () => {
  //   useEffect(() => {
  //   window.location.reload();
  // }, []);
  return (
    <div>
        <FeaturedPost />
        <BlogList/>
    </div>
  )
}

export default Home