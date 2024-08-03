import './App.scss';
import Main from '../Main/Main';
import '../ComponentsReset.scss';
import '../Components.scss';
import GeneralHeader from '../GeneralHeader/Header';
import GeneralFooter from '../GeneralFooter/Footer';

function App() {
  return (
    <>
      <GeneralHeader />
      <Main />
      <GeneralFooter />
    </>
  );
}

export default App;
