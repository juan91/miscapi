const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const model = require('./app/crud');
const cors = require("cors")
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())

/**
 * registro resultados rasgos de personalidad 
 * */
app.get("/v1/datos", async (req, res) => {
  try {
    const resp = await model.consultaDatos();
    console.log(resp);
    res.status(200).json({status: true, data: resp});
  } catch (error) {
    console.log(error);
  } 
});

app.post("/v1/rasgos", async (req, res) => {
    let demo = {};
    let datos = req.body;
    if(datos != null && datos.data && datos.email) {
      try {
        const result = await model.crearUser(datos.email);       
        datos = datos.data;
        console.log(datos);
       datos.forEach(async (element) => {
         if(element.hasOwnProperty("p") && element.p) {
          demo[element.p] = {r: element.r}     
         } else {
          await model.crearRasgos(result.insertId, element.r); 
         }         
      });
      await model.crearDemo(result.insertId, demo); 
      res.status(200).json({status: true});
      } catch (error) {
        console.log(error);
      }      
    } else {
      res.status(400).json({status: false});
    }          
})


// app.listen(5000, "172.31.88.162", () => {
//     console.log("sadasd", process.env.PORT)
// });

app.listen(5000, () => {
    console.log("run port")
});
