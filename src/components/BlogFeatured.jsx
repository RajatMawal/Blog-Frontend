import Moment from 'moment'
import { useSelector } from 'react-redux'


const BlogFeatured = ({ data }) => {

  const {user} = useSelector((state)=>state.auth)

  return (
    <div className="flex flex-col items-center pt-10 px-4 sm:px-6 lg:px-12 w-full max-w-4xl mx-auto text-white ">

      <p className="text-[#1de9b6] text-sm sm:text-base mb-2">
        Published on {Moment(data.CreatedAt).format('MMMM Do YYYY')}
      </p>


      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold py-4">
        {data.title}
      </h1>


      <p className="text-center text-base sm:text-lg max-w-2xl mb-4">
        {data.subtitle}
      </p>
    </div>
  )
}

export default BlogFeatured
