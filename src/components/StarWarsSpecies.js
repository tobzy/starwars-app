import React from 'react';
import {Table, message} from 'antd';
import {axiosClient} from '../tools/axiosClient.js'
import {getSpecies} from '../tools/urls';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'

class StarWarsSpecies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starWarsSpecies: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          // fixed: 'left',
          width: 200,
        }, {
          title: 'Language',
          dataIndex: 'language'
        }, {
          title: 'Classification',
          dataIndex: 'classification'
        }, {
          title: 'Designation',
          dataIndex: 'designation',
        }, {
          title: 'Skin Colors',
          dataIndex: 'skin_colors',
        }],
      currentPage: 1,
      total: 0,
    }
  }

  onPageChange = (page) => {
    this.getStarWarsSpecies(page);
  }

  getStarWarsSpecies = (page) => {
    this.props.showLoading();
    message.info(`Retrieving Star Wars Species, page ${page || 1}`, .5)

    axiosClient.get(getSpecies, {
      params: {
        page: page
      }
    }).then((response) => {
      this.setState({
        total: response.data.count,
        starWarsSpecies: response.data.results,
        currentPage: page
      })
      this.props.hideLoading();
    }).catch((error) => {
      this.props.hideLoading();
    })

  }

  componentDidMount() {
    this.getStarWarsSpecies();
  }

  render() {
    return (
      <div>
        {this.state.starWarsSpecies.length > 0 && (
          <Table
            dataSource={this.state.starWarsSpecies}
            columns={this.state.columns}
            bordered={true}
            scroll={{x: 700}}
            rowKey={record => record.url}
            expandedRowRender={species => {
              return <div>
                <h4>Average Height</h4>
                <p>{species.average_height}</p>
                <h4>Average Lifespan</h4>
                <p>{species.average_lifespan}</p>
              </div>
            }}
            pagination={{
              total: this.state.total,
              defaultCurrent: 1,
              current: this.state.currentPage,
              onChange: this.onPageChange,
              pageSize: 10
            }}
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

export default connect(null, mapDispatchToProps)(StarWarsSpecies)