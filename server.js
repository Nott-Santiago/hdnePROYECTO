const express = require('express');
const mongoose = require('mongoose');
const user = require('./user.controller')
const rol = require('./rol.controlller')
const archivo = require('./file.controller')
const File = require('./File')
const path = require('path');
const fs = require('fs')
const multer = require('multer');
const R = require('r-script');
const { json } = require('body-parser');
const app = express();
const upload = multer()
const port = 3000;
const privilegio = require('./privilegios.controller') //


app.use(express.json())

// MongoDB Atlas connection string
const connectionString = 'mongodb+srv://edgar:edgar_28@clustencuestas.njxk4gd.mongodb.net/?retryWrites=true&w=majority';
const connectLocal = 'mongodb://127.0.0.1:27017/invest2?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2';

// Connect to MongoDB Atlas
function conexion() {
  mongoose.connect(connectLocal, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Rutas para la creacion de cuentas
app.post('/users',user.create)
app.get('/users',user.list)
app.delete('/users/:id',user.destroy)
app.put('/users/:id',user.update)

app.post('/roles',rol.create)
app.get('/roles',rol.list)
app.delete('/roles/:id',rol.destroy)
app.put('/roles/:id',rol.update)

app.get('/archivos',archivo.list)

//
app.get('/privilegios', privilegio.list);


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

app.post('/files', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).send('No file provided.');
    }

    // Create a new file using the Mongoose model
    const newFile = new File({
      name: uploadedFile.originalname,
      contentType: uploadedFile.mimetype,
      data: uploadedFile.buffer,
    });

    // Save the file to the database
    await newFile.save();
    const filePath = path.join(__dirname, '/index.html')
    res.sendFile(filePath)
    res.status(201).send('File uploaded successfully.')
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

app.post('/graphs', (req, res) => {
  const data = req.body;
  console.log(data);
  //Aqui vamos a modificar o crear el nuevo excel para las graficas
  const objetoPro = JSON.parse(JSON.stringify(data))

  const datos = objetoPro.map(item => ({
    puntaje: item.puntaje,
    nombre: item.nombre,
    materia: item.materia

  }));

  const convertirACSV = (objeto) => {
    const columnas = Object.keys(objeto[0]);
    const filas = objeto.map(item => Object.values(item).join(','));
    const contenidoCSV = [columnas.join(','), ...filas].join('\n');
    return contenidoCSV;
  };

  const csvData = convertirACSV(datos);
  const nombreArchivo = 'dataCSV.csv'

  fs.writeFile(nombreArchivo, csvData, (err) => {
    if (err) {
      console.error('Error al escribir el archivo CSV:', err);
      return;
    }
    console.log(`Los datos se han guardado en el archivo ${nombreArchivo}`);
  });



  console.log(datos);
  ejecutarScriptR()

  //----------------------------------------------------------
  const newData = {
    message: 'Hello',
    doubledAge: 'Hey'
  };
 
  res.json(newData.message)
});

function ejecutarScriptR() {
  const scriptPath = './datosReti.R';

  // Ejecuta el script R
  R(scriptPath).call((err, result) => {
    if (err) {
      console.error(`Error al ejecutar el script de R: ${err.message}`);
      return;
    }
    console.log('Se ejecuto todo correcto');
  });
}

//ejecutarScriptR()
conexion()



