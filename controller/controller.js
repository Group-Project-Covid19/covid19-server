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
                res.status(200).json(data)
            })
    }
}

module.exports = Controller