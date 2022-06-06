import error from '../../img/error.png'

const ErrorPage = ({navigate}) => {
  return (
    <div className="Error-container">
      <img src={error} className="Error-container__cogwheel"/>
    </div>
  );
};

export default ErrorPage;