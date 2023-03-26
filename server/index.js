app = require('./src/app');
PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(` real${PORT}`)
})