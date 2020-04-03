const Axios = require('axios')

class Controller {

    static GetData(req, res) {
        let Province = req.body.Province
        Axios({
            url: 'https://api.kawalcorona.com/indonesia/provinsi/',
            method:"GET"
        })
            .then(function(result) {   
                for(let i = 0; i < result; i++) {
                    if(result[i].Provinsi == Province) {
                        data = result[i]
                    }
                }
                return res.status(200).json(result.data)
            })
            .catch(function(err) {
                return res.status(400).json({
                    error: "Bad Request"
                })
            })
    }

    static GetDataByCountry(req, res) {
        Axios({
            url: 'https://api.kawalcorona.com/',
            method:"GET"
        })
            .then(function(result) {  
                
                Axios({
                    url:'https://restcountries.eu/rest/v2/all',
                    method: 'GET'
                })
                .then(function(countryCode) {
                    for (let i = 0; i < result.data.length; i++ ){
                        for ( let j = 0; j < countryCode.data.length; j++){
                            
                           if ( result.data[i].attributes.Country_Region == countryCode.data[j].name){
                                    result.data[i].attributes['code'] = countryCode.data[j].altSpellings[0]
                                     break;
                           } else if (result.data[i].attributes.Country_Region == 'US'){
                                    result.data[i].attributes['code'] = 'US'
                                    break;
                            } 
                        }
                    }
                    return res.status(200).json(result.data)
                })
            })
            .catch(function(err) {
                return res.status(400).json({
                    error: "Bad Request"
                })
            })
    }

    static weather(req, res)
    {
        Axios({
            url: `https://rest.farzain.com/api/cuaca.php?id=jakarta&apikey=${process.env.WeatherApiKey}`,
            method:"GET"
        })
            .then(function(result) {   
                return res.status(200).json(result.data.respon)
            })
            .catch(function(err) {
                return res.status(400).json({
                    error: "Bad Request"
                })
            })
    }
}

module.exports = Controller