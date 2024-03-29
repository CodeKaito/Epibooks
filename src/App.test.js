//TODO 1.Test per verificare la resa corretta del componente Welcome in Homepage
import React from "react";
import { render } from "@testing-library/react";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import { ThemeContext } from "./context/ThemeContext";
import "@testing-library/jest-dom";
import { SelectedProvider } from "./context/SelectedContext";
import { OnCartContext } from "./context/OnCartContext";
import { OffCanvassProvider } from "./context/OffCanvassContext";

import { SelectCategoryContext } from "./context/SelectCategoryContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function WelcomeRender() {
  return render(
    <ThemeContext.Provider value={{ theme: "light" }}>
      <SelectCategoryContext.Provider value={{ selectedCategory: "History" }}>
        <SelectedProvider>
          <OnCartContext.Provider value={{ onCart: [] }}>
            <OffCanvassProvider>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Homepage />} />
                </Routes>
              </BrowserRouter>
            </OffCanvassProvider>
          </OnCartContext.Provider>
        </SelectedProvider>
      </SelectCategoryContext.Provider>
    </ThemeContext.Provider>
  );
}

test("renders Welcome component in Homepage", () => {
  const { getByTestId } = WelcomeRender();
  const welcomeElement = getByTestId("welcome-component");
  expect(welcomeElement).toBeInTheDocument();
});

//TODO 1.Test per verificare la resa corretta del componente Cart in Homepage
function CartRender() {
  return render(
    <ThemeContext.Provider value={{ theme: "light" }}>
      <SelectCategoryContext.Provider value={{ selectedCategory: "History" }}>
        <SelectedProvider>
          <OnCartContext.Provider value={{ onCart: [] }}>
            <OffCanvassProvider>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Cart />} />
                </Routes>
              </BrowserRouter>
            </OffCanvassProvider>
          </OnCartContext.Provider>
        </SelectedProvider>
      </SelectCategoryContext.Provider>
    </ThemeContext.Provider>
  );
}

test("renders Cart component in Homepage", () => {
  const { getByTestId } = CartRender();
  const cartElement = getByTestId("cart-component");
  expect(cartElement).toBeInTheDocument();
});

//TODO 2. Verifica che vengano effettivamente renderizzate tante bootstap card quanti sono i libri nel file json utilizzato




//TODO 3. Verifica che il componente CommentArea venga renderizzato correttamente
function CommentAreaRender() {
  return render(
    <ThemeContext.Provider value={{ theme: "light" }}>
      <SelectCategoryContext.Provider value={{ selectedCategory: "History" }}>
        <SelectedProvider>
          <OnCartContext.Provider value={{ onCart: [] }}>
            <OffCanvassProvider>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Homepage />} />
                  Homepage -> AllBooks -> CommentArea
                </Routes>
              </BrowserRouter>
            </OffCanvassProvider>
          </OnCartContext.Provider>
        </SelectedProvider>
      </SelectCategoryContext.Provider>
    </ThemeContext.Provider>
  );
}

test("renders CommentArea component in Homepage", () => {
  const { getByTestId } = CommentAreaRender();
  const commentArea = getByTestId("commentArea-component");
  expect(commentArea).toBeInTheDocument();
});


//TODO 4. Verifica che il filtraggio dei libri tramite navbar si comporti come previsto

//TODO 5. Verifica che cliccando sul libro il suo bordo cambi colore

//TODO 6. Verifica che cliccando su di un secondo libro dopo il primo il bordo del primo ritorni normale

//TODO 7. Verifica che all'avvio della pagina senza aver ancora cliccato su nessun libro non ci siano istanze del componente SingleComment all'interno del DOM

//TODO 8. Verifica che cliccando su di un libro con recensioni esse vengano caricate correttamente all'interno del DOM
