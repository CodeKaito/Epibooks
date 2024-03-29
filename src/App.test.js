import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('test semplice', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
})

//TODO 1.Test per verificare la resa corretta del componente Welcome in Homepage
test('renders Welcome component in Homepage', () => {
  const { getByTestId } = render(<Homepage />);
  const welcomeElement = getByTestId('welcome-component');
  expect(welcomeElement).toBeInTheDocument();
});

//TODO 2. Verifica che vengano effettivamente renderizzte tante bootstap card quanti sono i libri nel file json utilizzato

//TODO 3. Verifica che il componente CommentArea venga renderizzato correttamente

//TODO 4. Verifica che il filtraggio dei libri tramite navbar si comporti come previsto

//TODO 5. Verifica che cliccando sul libro il suo bordo cambi colore

//TODO 6. Verifica che cliccando su di un secondo libro dopo il primo il bordo del primo ritorni normale

//TODO 7. Verifica che all'avvio della pagina senza aver ancora cliccato su nessun libro non ci siano istanze del componente SingleComment all'interno del DOM

//TODO 8. Verifica che cliccando su di un libro con recensioni esse vengano caricate correttamente all'interno del DOM