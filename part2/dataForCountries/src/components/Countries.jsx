const Country = ({name, showCountry}) => {
    return <div>{name} {" "} <button onClick={() => showCountry(name)}>Show</button></div>
}

const Countries = (props) => {
    const searchWord = props.word
    const countries = props.countries

    if (!searchWord) {
        return
    } else if (searchWord && countries.length > 10) {
        return <div>Too many matches, specify another file</div>
    } else if (searchWord && countries.length <= 10 && countries.length > 1) {
        return countries.map((country,i) => <Country name={country} showCountry={props.showCountry} key={i}/>)
    }
}

export default Countries