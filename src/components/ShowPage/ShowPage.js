// Реализуйте страницу шоу.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле show вашего стейта
// и экшн showRequest.

// В методе componentDidMount вам нужно будет диспатчить showRequest action
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {showRequest, showSuccess, showFailure} from '../../actions/show';
import {getResultShowId, getShowInfo, getErrorShow, getIsLoading} from '../../reducers/shows';
import classes from './ShowPage.module.css';

function Person(props) {
  const data = props.personInfo;
  const { name, image } = data;

  return (
    <div className="t-person">
      <p>{name}</p>
      {image && <img src={image.medium} alt={name} />}
    </div>
  );
}

class ShowPage extends Component {
  componentDidMount() {
    this.id = this.props.match.params.id;
    this.props.showRequest(this.id);
  }

  render() {
    const { showInfo, error, isLoading } = this.props;

    if (error) return <p>Произошла сетевая ошибка</p>;
    if (isLoading) return <div>Загрузка</div>;
    if (!this.props.showInfo) return null;

    const { name, image, summary, cast } = this.props.showInfo;

    return (
      showInfo && (
        <div>
          <p>{name}</p>
          <img src={image} alt={name} />

          <div dangerouslySetInnerHTML={{ __html: summary }} />

          <div className={classes.cast}>
            {cast.map((elem, index) => (
              <Person
                key={`${elem.person.id}_${index}`}
                personInfo={elem.person}
              />
            ))}
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  showId: getResultShowId(state),
  showInfo: getShowInfo(state),
  error: getErrorShow(state),
  isLoading: getIsLoading(state)
});
const mapDispatchToProps = {
  showRequest,
  showSuccess,
  showFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)
