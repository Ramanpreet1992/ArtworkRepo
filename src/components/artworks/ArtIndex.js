/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ArtShow from './ArtShow'

// import bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Pagination from 'react-bootstrap/Pagination'


const ArtIndex = () => {


  // Main art list
  const [artList, setArtList] = useState([])

  // Dropdown filter artists
  
  const [departments, setDepartments] = useState([])

  const [filteredArt, setFilteredArt] = useState([])

  const [filters, setFilters] = useState({
    searchTerm: '',
    department: 'all',
  })

  // Page number state
  

  const [pageNumber, setPageNumber] = useState(1 || window.localStorage.getItem('pnum', JSON.stringify(pageNumber)))
  window.localStorage.setItem('pnum',JSON.stringify(pageNumber))

  // effects
  useEffect(() => {
    const getArtList = async () => {
      try {
        const { data } = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=10`)
        setArtList(data.data)
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }

    }
    getArtList()
  }, [pageNumber])

  // pagination button function
  const handleClickNext = () => {
    setPageNumber(pageNumber + 1)
    console.log('page number-->', pageNumber)
  }

  const handleClickPrev = () => {
    pageNumber <= 1 ? 0 : setPageNumber(pageNumber - 1)

    console.log('page number-->', pageNumber)
  }

  // handle change for search and filter
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFilters({ ...filters, [e.target.name]: e.target.value })
    console.log('filters list ->', filters)
  }

  // useEffect to filter art & add to
  useEffect(() => {
    if (artList.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      console.log(regexSearch)
      const filtered = artList.filter(art => {
        return (regexSearch.test(art.artist_title) || regexSearch.test(art.title)) 
          && (art.department_title === filters.department || filters.department === 'all')
      })
      setFilteredArt(filtered)
      console.log('filtered art ->', filteredArt)
    }
  }, [filters, artList])

  // populate dropdowns
  useEffect(() => {

    // To populate Category dropdown
    if (artList.length) {

      const departmentList = []
      artList.forEach(art => departmentList.includes(art.department_title) ? '' : departmentList.push(art.department_title))
      setDepartments(departmentList)

    }

  }, [artList])

  return (
    <Container className="mt-4">
      <Row>
        <Col md="3">
          {/* Filter dropdown and Searchbar */}
          <Form className="border p-3 shadow-sm">
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <FormControl type="search" name="searchTerm" value={filters.searchTerm} placeholder="Search..." onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="department" value={filters.department} aria-label="department select" onChange={handleChange}>
                <option value="all">All</option>
                {departments.map((artist) => {
                  // console.log('test', artist)
                  return <option value={artist} key={artist}>{artist}</option>
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        {/* The Art Index */}
        <Col md="9">
          <Row>
            {filteredArt.map((art) => {
              const { id, title, artist_title, image_id } = art
              return (
                <Col key={id} md="10" lg="5" className="art mb-5 container-fluid">
                  <Link to={`/artworks/${id}`}>
                    <Card className="art-card">
                      <Card.Img  className="art-card-img" src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`} />
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <hr />
                        <Card.Text>{artist_title}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
      <Pagination size="sm" className="justify-content-center">
        <Pagination.Prev onClick={handleClickPrev} />
        <Pagination.Item onClick={handleClickPrev}> {pageNumber <= 0 ? '0' : pageNumber - 1}</Pagination.Item>
        <Pagination.Item active>{pageNumber}</Pagination.Item>
        <Pagination.Item onClick={handleClickNext} >{pageNumber + 1}</Pagination.Item>
        <Pagination.Next onClick={handleClickNext} />
        <ArtShow pageNumber={pageNumber} />
      </Pagination>

    </Container >
  )
}

export default ArtIndex