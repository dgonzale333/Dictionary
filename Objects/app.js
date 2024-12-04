import { dictionary } from '../dictionary.js';

// Referencias a los elementos del DOM
const searchInput = document.getElementById('search-word');
const translationSpan = document.getElementById('translation');
const exampleSpan = document.getElementById('example');
const categoriesContainer = document.getElementById('categories-container');

// Función para buscar una palabra específica
function translateWord() {
  const query = searchInput.value.trim().toLowerCase();
  let found = false;

  // Itera por todas las categorías y palabras
  for (const items of Object.values(dictionary.categories)) {
    for (const word of items) {
      if (
        word.english.toLowerCase() === query || 
        word.spanish.toLowerCase() === query
      ) {
        translationSpan.textContent = 
          query === word.english.toLowerCase() ? word.spanish : word.english;
        exampleSpan.textContent = word.example;
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    translationSpan.textContent = 'No encontrado';
    exampleSpan.textContent = '---';
  }
}

// Función para agregar una nueva palabra al diccionario
function addNewWord(event) {
  event.preventDefault(); // Evita que el formulario recargue la página

  const newEnglish = newEnglishInput.value.trim();
  const newSpanish = newSpanishInput.value.trim();
  const newExample = newExampleInput.value.trim();
  const newCategory = newCategoryInput.value.trim();

  if (!newEnglish || !newSpanish || !newExample || !newCategory) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Verificar si la categoría ya existe, si no, se crea
  if (!dictionary.categories[newCategory]) {
    dictionary.categories[newCategory] = [];
  }

  // Agregar la nueva palabra a la categoría
  dictionary.categories[newCategory].push({
    english: newEnglish,
    spanish: newSpanish,
    example: newExample,
  });

  // Actualizar la vista
  renderCategories();

  // Limpiar el formulario
  addWordForm.reset();
  alert('Palabra agregada exitosamente.');
}


// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {;
  searchInput.addEventListener('input', translateWord);
  addWordForm.addEventListener('submit', addNewWord);
});



