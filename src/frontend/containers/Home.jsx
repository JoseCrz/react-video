import React from 'react'
import { connect } from 'react-redux'

import Search from '../components/Search'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'

import '../assets/sass/App.scss'


const Home = ({ myList, trends, originals, filter }) => {
  const filteredTrends = trends.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
  const filteredOriginals = originals.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
  const filteredMyList = myList.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <React.Fragment>
      <Search />
      {filteredMyList.length > 0 &&
        <Carousel title="myList">
          {filteredMyList.map(item => 
            <CarouselItem  key={item.id} {...item} isMyList/>
          )}
        </Carousel>
      }

      <Carousel title="trends">
        {filteredTrends.map(item => 
          <CarouselItem  key={item._id} {...item}/>
        )}
      </Carousel>

      <Carousel title="originals">
        {filteredOriginals.map(item => 
          <CarouselItem  key={item.id} {...item}/>
        )}
      </Carousel>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
    filter: state.filter
  }
}

export default connect(mapStateToProps, null)(Home)