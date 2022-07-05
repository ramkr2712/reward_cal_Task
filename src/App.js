import './App.css';
import RewardCalComponent from './components/reward-cal';

function App() {
  return (
    <>
      <header id="header"><p >Customer Rewards App</p></header>

      <div id="container">
        <main id="center" class="column">
          <article>
            <h1 className="subHeader">Reward Calculator</h1>
          </article>
          <RewardCalComponent />
        </main>
      </div>

      <div id="footer-wrapper">
        <footer id="footer"><p>Footer Space.......</p></footer>
      </div>
    </>
  );
}

export default App;
