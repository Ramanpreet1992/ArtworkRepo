import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import Loading from '../../utilities/Loading'

import { Link } from 'react-router-dom'


const ArtShow = () => {

  const { id } = useParams()
  const [singleArt, setSingleArt] = useState('')
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getSingleArt = async () => {
      try {
        const { data } = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`)
        setSingleArt(data.data)
        console.log(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getSingleArt()
  }, [id])


  return (
  
    <Container className="mt-4">
      <Row>
        {singleArt ?
          <>
            <Col>
              <h2>{singleArt.title}</h2>
            </Col>
            <hr />
            <Col md="6">
              <Image rounded="false" fluid="true" className="mb-5" src={`https://www.artic.edu/iiif/2/${singleArt.image_id}/full/843,/0/default.jpg`} alt={singleArt.name} />
            </Col>
            <Col md="6" className="shadow-sm p-3 border">
              {/* Artist Name */}
              <span className="title-span">Artist</span> <span className="desc">{singleArt.artist_title}</span>
              <hr />
              {/* Artist Info */}
              <div className="bio-boxes">
                <span className="title-span">Bio</span><br /> <p className="desc-bio">{singleArt.artist_display}</p>
              </div>
              <hr />
              {/* Date Display */}
              <span className="title-span">Display Date</span> <span className="desc">{singleArt.date_display}</span>
              <hr />
              {/* Dimension */}
              <span className="title-span">Dimensions</span> <span className="desc">{singleArt.dimensions}</span>
              <hr />
              {/* Reference Number */}
              <span className="title-span">Reference Number</span> <span className="desc">{singleArt.main_reference_number}</span>
              <hr />
              <Link to="/artworks" className="btn btn-secondary">Back to Collection</Link>
            </Col>
          </>
          :
          <h2 className="text-center">
            {errors ? 'Having trouble Loading' : <Loading />}
          </h2>
        }
      </Row>
    </Container>
  )
}

export default ArtShow