
const cheerio = require("cheerio");
const request = require("request");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) =>{
  //get request data
  const url = "https://github.com/SimisoMT/"; //req.query.text;
  //make request
  request(
    url,
    (error, response, html)=>{
      if(!error){
        //cheerio scrapping
        const images = cheerio.load(html)('img')
        .toArray()
        .map(image => image.attribs.src);
        console.dir(images);
        //res.status(200);

        //response
        res.setHeader('Content-Type','application/json');
        res.json({images: images,length: images.length,source:url});  
      }else{
        //error response
        res.setHeader('Content-Type','application/json');
        res.json({message:"Ops sorry, error on server side."});
      }
    }
  );//end make request 
});//end route

app.listen(port, () => console.log(`Example app listening on port ${port}!`));