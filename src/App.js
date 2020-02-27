import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      response: [],
      people: [],
      previous: null,
      error: ''
    }

    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentDidMount() {
    const query = `https://swapi.co/api/people`

    fetch(query)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            people: result.results
          })
        }
      )
  }

  nextPage(newQuery) {
    console.log(newQuery)

    fetch(newQuery)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            people: result.results,
            previous: result.previous
          })
        }
      )
  }

  previousPage(newQuery) {
    console.log(newQuery)

    fetch(newQuery)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            people: result.results,
            previous: result.previous
          })
        }
      )
  }

  render() {
    const { response, people, previous } = this.state

    return (
      <div className="container">
        <div className="row">
          <section className="header col-12 text-center">
            <h1>Welcome to the SWAPI People Finder®</h1>
          </section>

          <section className="body col-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Birthyear</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
              { people.map((person, index) => (
                <tr key={index}>
                  <td>{person.name}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.gender}</td>
                </tr>
              ))}
              </tbody>
            </table>

            { previous &&
              <button
                className="btn-previous"
                onClick={() => this.previousPage(response.previous)}
              >&#x2190; Previous People</button>
            }

            <button
              className="btn-next"
              onClick={() => this.nextPage(response.next)}
            >More People &#x2192;</button>
          </section>
        </div>
      </div>
    )
  }
}

export default App
