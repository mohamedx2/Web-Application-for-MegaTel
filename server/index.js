app = require('./src/app');
PORT=process.env.PORT

app.listen(3001,()=>{
    console.log(` real${PORT}`)
})