import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
    onYearBtnClick(e) {
        this.props.getPhotos(+e.target.innerText)
    }

    render() {
        const { year, photos, fetching, error } = this.props,
            years = [2016, 2015, 2014, 2013, 2012, 2011, 2010];

        return <div>
            <p>
                { years.map((item, index) =>  <button className='btn' key={index} onClick={::this.onYearBtnClick}>{item}</button> ) }
            </p>

            <h3>{year} год [{photos.length}]</h3>
            { error ? <p> Во время загрузки фото произошла ошибка</p> : '' }
            {
                fetching ?
                    <p>Загрузка...</p> :
                    photos.map((entry, index) =>
                        <div key={index}>
                            <p><img src={entry.images[3].source} /></p>
                            <p>{entry.likes ? entry.likes.data.length : 0} ❤</p>
                        </div>
                    )
            }
        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};