import React from 'react';
import {Table, message} from 'antd';
import {axiosClient} from '../tools/axiosClient.js'
import {getFilms} from '../tools/urls';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'

class StarWarsFilms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starWarsFilms: [],
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          width: 200,
        }, {
          title: 'Director',
          dataIndex: 'director'
        }, {
          title: 'Producer',
          dataIndex: 'producer'
        }, {
          title: 'Episode Id',
          dataIndex: 'episode_id',
        }, {
          title: 'Release Date',
          dataIndex: 'release_date',
        }],
      total: 0,
    }
  }


  getStarWarsFilms = () => {
    this.props.showLoading();
    message.info(`Retrieving Star Wars Films`, .5)
    axiosClient.get(getFilms).then((response) => {
      this.setState({
        total: response.data.count,
        starWarsFilms: response.data.results,
      })
      this.props.hideLoading();
    }).catch((error) => {
      this.props.hideLoading();
    })

  }

  componentDidMount() {
    this.getStarWarsFilms();
  }

  render() {
    return (
      <div>
        {this.state.starWarsFilms.length > 0 && (
          <Table
            dataSource={this.state.starWarsFilms}
            columns={this.state.columns}
            bordered={true}
            scroll={{x: 700}}
            expandedRowRender={film => {
              return <div>
                <h3>Opening Crawl</h3>
                <p style={{margin: 0}}>{film.opening_crawl}</p>
              </div>
            }}
            pagination={false}
            rowKey={record => record.url}
          />
        )}

      </div>

    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading()),
  }
}

export default connect(null, mapDispatchToProps)(StarWarsFilms)