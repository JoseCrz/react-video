import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { saveFavorite, removeFavorite } from '../actions'

import '../assets/sass/components/CarouselItem.scss'
import playIcon from '../assets/static/play.svg'
import addIcon from '../assets/static/add.svg'
import deleteIcon from '../assets/static/delete-icon.svg'

const CarouselItem = props => {
  const { _id, id, title, year, contentRating, duration, cover, isMyList } = props

  const handleSetFavorite = () => {
    props.saveFavorite({
      _id,
      id,
      title,
      year,
      contentRating,
      duration,
      cover
    })
  }

  const handleDeleteFavorite = itemId => {
    props.removeFavorite(itemId)
  }

  return (
    <div className="Carousel-item">
      <img className="Carousel-item__img" src={cover} alt={title} />
      <div className="Carousel-item__details">
          <div>
              <Link to={`/player/${id}`}>
                <img className="Carousel-item__button" src={playIcon} alt="Play Button" width="30px" />
              </Link>
              {isMyList 
              ? <img className="Carousel-item__button" onClick={() => handleDeleteFavorite(_id)}  src={deleteIcon} alt="Delete from list Button" width="30px" />
              : <img className="Carousel-item__button" onClick={handleSetFavorite}  src={addIcon} alt="Add to list Button" width="30px" /> }
          </div>
          <p className="Carousel-item__title">{title}</p>
          <p className="Carousel-item__subtitle">{`${year} | ${contentRating} ${duration} mins`}</p>
      </div>
    </div>
  )
}

CarouselItem.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  cover: PropTypes.string
}

const mapDispatchToProps = {
  saveFavorite,
  removeFavorite,
}

export default connect(null, mapDispatchToProps)(CarouselItem)