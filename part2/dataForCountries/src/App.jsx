import { useState, useEffect } from "react";
import Countries from "./components/Countries"
import CountryDetail from "./components/CountryDetail"
import countryServices from "./services/countryServices"

function App() {
  const [searchWord, setSearchWord] = useState("")
  const [countriesAll, setCountriesAll] = useState([])
  const [countryDetail, setCountryDetail] = useState(null)
  const [countryName, setCountryName] = useState(null)

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => setCountriesAll(initialCountries))
  }, [])

  let countries = searchWord && !countryName && countriesAll
      .filter(c => c.name.common.toLowerCase().indexOf(searchWord.toLowerCase()) > -1)
      .map(c => c.name.common) 

  if (countryName) {
    countries = [countryName]
  }


  useEffect(() => {
    if ((countries.length === 1) && !countryDetail) {
      const name = countries[0]
      countryServices.getCountry(name).then(countryDetails => setCountryDetail(countryDetails))
    } else if (countries.length !== 1 && countryDetail) {
      setCountryDetail(null)
    }
  }, [countries, countryDetail])
  

  const handleWordChange = event => {
    setSearchWord(event.target.value)
    setCountryName(null)
  }
  const showCountry = (val) => setCountryName(val)

  return (
    <>
      <div>find countries <input value={searchWord} onChange={handleWordChange}/></div>
      {countryDetail ? <CountryDetail countryDetail={countryDetail}/> : <Countries word={searchWord} countries={countries} showCountry={showCountry}/> }
    </>
  )
}

export default App
