Title
Register

URL

/register

Method:

POST

URL Params

-

Required:

-

Optional:

-

Data Params

email: "String",
password: "String"

Success Response:

Code: 201
Content: 
{msg : "Thank you for your participation"}
Error Response:
Code:400
{error : "Bad Request"}
_____________________________________________________________________
Title
Login

URL

/login

Method:

POST

URL Params

-

Required:

-

Optional:

-

Data Params

email: "String",
password: "String"

Success Response:

Code: 201
Content: 
{
    Access_Token:String
    Email: String,
    geolocation: Object
Error Response:
Code:400
{error : error messages(string)}
_____________________________________________________________________
Title
Google Login

URL

/googleSignIn

Method:

POST

URL Params

-

Required:

-

Optional:

-

Data Params

id_token:string

Success Response:

Code: 201
Content: 
{
    Access_Token:String
    Email: String,
    geolocation: Object
Error Response:
Code:400
{error : error messages(string)}
_____________________________________________________________________
Title
Get Data

URL

/data

Method:

POST

URL Params

-

Required:

-

Optional:

-

Data Params

-

Success Response:

Code: 201
Content: 
[
    {
    "attributes": {
      "FID": INTEGER,
      "Kode_Provi": INTEGER,
      "Provinsi": "STRING",
      "Kasus_Posi": INTEGER,
      "Kasus_Semb": INTEGER,
      "Kasus_Meni": INTEGER
    }
]
Error Response:
Code:400
{error : error messages(string)}
_____________________________________________________________________