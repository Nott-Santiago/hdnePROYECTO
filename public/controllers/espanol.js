Survey
    .StylesManager
    .applyTheme("defaultV2");

const surveyJson = {
    "title": "Español",
    "logoPosition": "right",
    "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "dropdown",
     "name": "question1",
     "title": "Ha venido _______ estudiante ?",
     isRequired: true,
     "choices": [
      {
       "value": "10",
       "text": "alguien"
      },
      {
       "value": "20",
       "text": "algun"
      },
      {
       "value": "5",
       "text": "alguna"
      }
     ]
    },
    {
     "type": "dropdown",
     "name": "question2",
     "title": "A que hora sales de casa para ir a trabajar? Normalmente ________ a las 9:00",
     "choices": [
      {
       "value": "10",
       "text": "salio"
      },
      {
       "value": "20",
       "text": "salgo"
      },
      {
       "value": "5",
       "text": "salto"
      }
     ]
    },
    {
        "type": "dropdown",
        "name": "question3",
        "title": "Que hora es?",
        "choices": [
         {
          "value": "10",
          "text": "Son la una y media"
         },
         {
          "value": "5",
          "text": "Es una media"
         },
         {
          "value": "20",
          "text": "Es la una y media"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question4",
        "title": "Que van a tomar ? _______ Uvas",
        "choices": [
         {
          "value": "10",
          "text": "Para primero"
         },
         {
          "value": "20",
          "text": "De primero"
         },
         {
          "value": "5",
          "text": "De inicio"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question5",
        "title": "A mis amigas ________ las compras",
        "choices": [
         {
          "value": "5",
          "text": "gusta"
         },
         {
          "value": "10",
          "text": "las gusta"
         },
         {
          "value": "20",
          "text": "les gustan"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question6",
        "title": "No me gusta nada de la opera",
        "choices": [
         {
          "value": "10",
          "text": "A mi si"
         },
         {
          "value": "20",
          "text": "A mi tampoco"
         },
         {
          "value": "5",
          "text": "Aqui no"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question7",
        "title": "Los hijos de mi tio son: ",
        "choices": [
         {
          "value": "20",
          "text": "Mis primos"
         },
         {
          "value": "10",
          "text": "Mis amigos"
         },
         {
          "value": "5",
          "text": "Mis sobrinos"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question8",
        "title": "________ significa sobrino ?",
        "choices": [
         {
          "value": "10",
          "text": "Que"
         },
         {
          "value": "5",
          "text": "Como"
         },
         {
          "value": "20",
          "text": "Cuando"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question9",
        "title": "_____ una farmacia por aqui cerca ?",
        "choices": [
         {
          "value": "15",
          "text": "Esta"
         },
         {
          "value": "5",
          "text": "Donde"
         },
         {
          "value": "20",
          "text": "Hay"
         }
        ]
       },
       {
        "type": "dropdown",
        "name": "question10",
        "title": "Voy a cerrar la ventana por que tengo ______________",
        "choices": [
         {
          "value": "20",
          "text": "Frio"
         },
         {
          "value": "10",
          "text": "Calor"
         },
         {
          "value": "5",
          "text": "Caloron"
         }
        ]
       },

   ],
   "title": "Preguntas-1"
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "dropdown",
     "name": "question11",
     "title": "Ha venido _________ estudiante?",
     "choices": [
      {
       "value": "20",
       "text": "algún"
      },
      {
       "value": "10",
       "text": "alguien"
      },
      {
       "value": "15",
       "text": "alguno"
      }
     ]
    },
    {
        "type": "dropdown",
        "name": "question12",
        "title": "Ayer Andres no _________ sus libros",
        "choices": [
         {
          "value": "5",
          "text": "Traho"
         },
         {
          "value": "15",
          "text": "trajo"
         },
         {
          "value": "10",
          "text": "escucho"
         }
        ]
       }
   ],
   "title": "Preguntas-2"
  }
 ]

};



const survey = new Survey.Model(surveyJson);
survey.focusFirstQuestionAutomatic = false ;

function alertResults (sender) {
    const results = JSON.stringify(sender.data);
    const myObject = JSON.parse(results);
    const arrValores = Object.values(myObject);

    const intArray = arrValores.map(str => parseInt(str));
    
    const sum = intArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    const materia = 'Español'
    resultado(sum,materia);
}

function resultado(puntaje,materia){
    const content = document.getElementById('dispResults');
    content.innerHTML = `
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Revisar resultados
    </button>
    
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Resultados de encuesta</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"> 
            `+
            "Su puntaje obtenido es: "+ puntaje +" pts" 
          +`</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="btnResultado" onClick="displayDA(${puntaje},'${materia}')">Graficas</button>
          </div>
        </div>
      </div>
    </div> `;
}
function displayDA(puntaje,materia){

  localStorage.setItem('puntaje', puntaje);
  localStorage.setItem('materia', materia);
  window.open('../pagination/resultados.html', '_blank');
}


survey.onComplete.add(alertResults);

$(function() {
    $("#surveyContainer").Survey({ model: survey });
});

