import "../styles/countrycard.css"

export default function CountryCard ({name, img_flag, continent, population}) {
    return (
        <div className="country_card_container">
            <div className="header_card">
                <img className="card_image" src={img_flag} alt="flag"/>
                <h5 className="country_card_name_country">{name}</h5>
            </div>
            <h5>Continent: {continent}</h5>
            <h5>Poblacion: {population} habitantes</h5>
            <button className="button_card">
                <a className="text_button_card" href={`/country/${name}`}>
                    See more
                </a>
            </button>
        </div>
    )
}