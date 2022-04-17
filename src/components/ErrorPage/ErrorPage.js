import cogwheel from './cogwheel.svg'
import arrow from './arrow.svg';

const ErrorPage = ({navigate}) => {
  return (
    <div className="Error-container">
      <img src={cogwheel} className="Error-container__cogwheel"/>
      <div className="Error-container-text">
        <span className="Error-container-text__404">404</span>
        <span className="Error-container-text__title">Something’s missing.</span>
        <span
          className="Error-container-text__subtitle">This page is missing or your assembled the link incorrectly.</span>
        <div className="Error-container-text-back" onClick={() => navigate('/')}>
          <img src={arrow}/>
          <span>Go back</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;