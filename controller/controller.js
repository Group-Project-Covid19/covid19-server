const Axios = require('axios')

class Controller {

    static GetData(req, res) {
        let Province = req.body.Province
        let data;
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
                return res.status(200).json(data)
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
                return res.status(200).json(result.respon)
            })
            .catch(function(err) {
                return res.status(400).json({
                    error: "Bad Request"
                })
            })
    }
}

module.exports = Controller